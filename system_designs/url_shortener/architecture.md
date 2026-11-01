# URL Shortener — High-Level Architecture

The current design targets a read-heavy workload: the supplied estimate is approximately 1,200 redirect reads/s and 12 creates/s. The baseline is stateless application services, a cache-first redirect path, and durable URL mapping storage.

## 1. System context

```mermaid
flowchart LR
    Visitor[Browser / Mobile Client] -->|Create / Redirect| Shortener[URL Shortener]
    Operator[Operations / Support] -->|Admin / Investigation| Console[Operations Console]
    Shortener --> DNS[DNS / CDN]
    Shortener --> Abuse[Abuse / Risk Controls]
    Shortener --> Analytics[Optional Analytics Pipeline]
    Operator --> Console
```

The core shortener owns URL creation and redirects. CDN, abuse controls and analytics are supporting capabilities, not part of the minimum redirect path.

## 2. Core container architecture

```mermaid
flowchart TB
    C[Browser / Mobile Client] --> DNS[DNS]
    DNS --> CDN[CDN / Edge Cache]
    CDN --> LB[Load Balancer]
    LB --> GW[API Gateway]
    GW --> S[Stateless URL Service]
    S -->|GET mapping| R[(Redis Cache)]
    R -->|Miss| DB[(Persistent URL Store)]
    DB -->|Mapping| S
    S -->|Populate cache| R
    S -->|Create mapping| DB
    S -->|Redirect / short URL| C
    S -.-> MET[Metrics / Logs / Traces]
    CDN -.-> MET
    DB -.-> MET
```

**Read path:** cache first, persistent store on miss.  
**Write path:** validate and allocate a unique code, persist the mapping, then optionally warm the cache. A write is successful only after durable persistence succeeds.

## 3. Redirect sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Edge as CDN / Edge
    participant API as Gateway + URL Service
    participant Cache as Redis
    participant DB as URL Store

    User->>Edge: GET /:shortCode
    Edge->>API: Cache miss / forward request
    API->>Cache: GET shortCode
    alt Cache hit
        Cache-->>API: longUrl + expiry metadata
    else Cache miss
        Cache-->>API: Not found
        API->>DB: Lookup shortCode
        alt Mapping exists and is active
            DB-->>API: URL mapping
            API->>Cache: SET mapping with TTL
        else Missing / expired
            DB-->>API: Not found / expired
            API->>Cache: Optional short negative-cache TTL
        end
    end
    alt Active mapping
        API-->>User: 301 / 302 redirect
    else Missing / expired
        API-->>User: 404 / 410
    end
```

The choice between permanent and temporary redirects affects browser and CDN caching behavior. It must be a product decision; the existing requirements do not settle it.

## 4. URL creation sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant API as Gateway / URL Service
    participant ID as Code Allocator
    participant DB as URL Store
    participant Cache as Redis
    participant Q as Analytics Queue

    User->>API: POST /shorten (longUrl, options)
    API->>API: Validate URL, policy, rate limit
    API->>ID: Allocate unique ID / short code
    ID-->>API: shortCode
    API->>DB: Persist mapping (unique shortCode)
    DB-->>API: Commit success
    opt Cache warm-up
        API->>Cache: SET shortCode → mapping
        Cache-->>API: OK (best-effort)
    end
    opt Creation event
        API->>Q: Publish UrlCreated (outbox / reliable publish)
    end
    API-->>User: 201 Created + short URL
```

For reliable event publication, use a transactional outbox or another explicit durability strategy. A direct database commit followed by best-effort publish can lose events if the process crashes between steps.

## 5. Cache-aside flow and failure handling

```mermaid
flowchart TD
    A[Redirect request] --> B{Redis available?}
    B -->|Yes| C{Cache hit?}
    B -->|No| D[Read persistent store]
    C -->|Hit| E[Validate expiry / status]
    C -->|Miss| D
    D --> F{Store available?}
    F -->|No| G[Return controlled 503 / failover policy]
    F -->|Yes| H{Mapping active?}
    H -->|Yes| I[Populate cache best effort]
    H -->|No| J[Optional negative cache with short TTL]
    I --> K[Issue redirect]
    E -->|Active| K
    E -->|Expired / revoked| L[Return 410 or policy response]
    J --> M[Return 404 / 410]
```

Do not claim that the system can always “fail open” during a database outage: without a cached mapping, the service cannot resolve the destination. Behavior depends on cache availability and freshness.

## 6. Data model

```mermaid
erDiagram
    SHORT_URL {
        string short_code PK
        string long_url
        datetime created_at
        datetime expires_at
        string owner_id
        string status
        string redirect_type
    }
    URL_EVENT {
        string event_id PK
        string short_code FK
        string event_type
        datetime occurred_at
        string region
    }
    SHORT_URL ||--o{ URL_EVENT : emits
```

The event table is an optional analytics representation. At high volume, click events may belong in an append-oriented analytics store rather than the operational URL mapping database.

## 7. Analytics event flow

```mermaid
flowchart LR
    Redirect[Redirect Service] --> Outbox[(Outbox / Event Publisher)]
    Outbox --> Broker[Queue / Stream]
    Broker --> Consumer[Analytics Consumers]
    Consumer --> OLAP[(Analytics Store)]
    OLAP --> Dashboard[Reporting / BI]
    Consumer --> DLQ[(Dead-letter Queue)]
    Consumer -.-> OBS[Consumer lag / error metrics]
```

At-least-once delivery implies duplicate events are possible. Give events stable IDs and make consumers idempotent. Analytics failure must not block the redirect response.

## 8. Deployment view (conceptual)

```mermaid
flowchart TB
    subgraph Edge["Edge"]
        DNS[DNS]
        CDN[CDN]
    end
    subgraph Region["Primary Region"]
        LB[Load Balancer]
        API1[URL Service A]
        API2[URL Service B]
        Redis[(Redis Cluster)]
        Primary[(Primary URL Store)]
        Replica[(Read Replica)]
        Queue[Event Broker]
        Worker[Analytics Workers]
        OLAP[(Analytics Store)]
    end
    DNS --> CDN --> LB
    LB --> API1
    LB --> API2
    API1 --> Redis
    API2 --> Redis
    Redis --> Primary
    API1 --> Queue
    Queue --> Worker --> OLAP
    Primary --> Replica
```

This is a logical deployment sketch, not a prescribed AWS/GCP topology. Multi-region active-active requires separate write-ownership and conflict-resolution design; the existing notes prefer active-passive unless requirements justify the added complexity.

## 9. Latency and capacity visuals

The original requirements state a cache-hit redirect target under 50 ms. The following is an **illustrative budget**, not a benchmark or claim about actual service latency.

```mermaid
xychart-beta
    title "Illustrative cache-hit latency budget (not measured)"
    x-axis ["Edge", "Gateway", "Service", "Cache", "Network margin"]
    y-axis "Budget (ms)" 0 --> 20
    bar [8, 5, 5, 4, 8]
```

An illustrative 30 ms subtotal leaves 20 ms of margin against the stated 50 ms target. Validate the real budget with regional p50/p95/p99 traces.

From the existing requirements assumptions:
- 1,000,000 creates/day ≈ 11.6 writes/s (rounded to ~12)
- 100,000,000 redirects/day ≈ 1,157 reads/s (rounded to ~1,200)
- 160 bytes/record × 1M new records/day × 365 days ≈ 58.4 GB/year before indexes, replication, backups and overhead

```mermaid
xychart-beta
    title "Illustrative URL mapping storage growth"
    x-axis ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
    y-axis "Raw mapping data (GB)" 0 --> 300
    line [58, 117, 175, 234, 292]
```

This assumes 1M newly created URLs each day, 160 bytes per record and no deletion/expiry reduction. It excludes indexes, replicas, backups and analytics. It is a planning estimate, not observed capacity.

## 10. Operational signals

- Redirect request rate and status code distribution
- p50 / p95 / p99 redirect latency by region and cache outcome
- Cache hit ratio, evictions, connection errors and stampede indicators
- Primary database read/write latency, throttling, replication lag and failover state
- Short-code allocation collision/retry count
- Queue publish failures, consumer lag, retry count and DLQ depth
- Abuse/rate-limit decisions and administrative changes
- Cost per million redirects and storage per active URL

## 11. Design decisions to defend

| Decision | Current baseline | Revisit when |
|---|---|---|
| Cache strategy | Cache-aside | Cache invalidation or stampede becomes dominant |
| Code strategy | Monotonic ID + Base62 in supplied master prompt | ID service contention, allocation gaps or multi-region ownership matter |
| Consistency | Eventual consistency acceptable for reads | Product requires immediate revocation or global read-after-write |
| Sharding | Add only after single-store limits | Sustained write/storage/index bottleneck |
| Queue | Analytics and non-critical work only | Background events need replay or independent scaling |
| Multi-region | Prefer active-passive absent a strong need | RTO/RPO or geography requirements justify active-active |

See [requirements](requirements.md), [failure modes](failure_modes.md), [consistency and replication](consistency_and_replication.md), [patterns applied](patterns_applied.md), and the [AI / FDE extension](AI_FDE_IMPLEMENTATION.md).
