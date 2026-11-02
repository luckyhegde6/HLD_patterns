# Scale from Zero to Millions — Progressive System Design

This original case study evolves an application one bottleneck at a time. Each additional tier must solve a concrete workload or reliability constraint.

## Evolution map

```mermaid
flowchart LR
  S1[1. Single server] --> S2[2. Separate DB]
  S2 --> S3[3. Load-balanced stateless API]
  S3 --> S4[4. Cache + CDN]
  S4 --> S5[5. Replicas + session store]
  S5 --> S6[6. Queue + workers]
  S6 --> S7[7. Sharding / partitioning]
  S7 --> S8[8. Multi-region + DR]
  S8 --> S9[9. Service boundaries + observability]
```

## Stage 1 — One deployable unit

```mermaid
flowchart LR
  U[User] --> APP[Web app + API + business logic]
  APP --> DB[(Single database)]
  APP --> FS[(Local file storage)]
```

Good for a prototype or low traffic. Risks: shared resource contention, single host failure, local-disk coupling and difficult independent scaling.

## Stage 2 — Split application and data tiers

```mermaid
flowchart LR
  U[Users] --> APP[App server]
  APP --> DB[(Managed database)]
```

Scale and patch app and database independently. Secure the data tier behind private network controls. Watch connection pools, query plans and restore time.

## Stage 3 — Load-balanced stateless application

```mermaid
flowchart LR
  U[Users] --> LB[Load balancer]
  LB --> A1[App replica A]
  LB --> A2[App replica B]
  LB --> A3[App replica C]
  A1 --> DB[(Shared database)]
  A2 --> DB
  A3 --> DB
```

Move sessions and authoritative state out of application memory. Add health checks, readiness probes and graceful shutdown.

## Stage 4 — Cache and CDN

```mermaid
flowchart LR
  U[Users] --> CDN[CDN]
  CDN --> LB[Load balancer]
  LB --> API[API]
  API --> CACHE[(Redis / cache)]
  CACHE -->|Miss| DB[(Database)]
```

Serve static content at the edge. Add cache-aside for read-heavy data with an explicit freshness/invalidation model.

## Stage 5 — Database read scaling

```mermaid
flowchart LR
  API[API] -->|Writes| P[(Primary)]
  API -->|Eligible reads| RR[Read router]
  RR --> R1[(Replica A)]
  RR --> R2[(Replica B)]
  P -->|Replication| R1
  P -->|Replication| R2
```

Do not route read-after-write or strong reads to lagging replicas without session/version logic.

## Stage 6 — Async work and independent workers

```mermaid
flowchart LR
  API[API] --> Q[(Durable queue)]
  Q --> W1[Worker pool A]
  Q --> W2[Worker pool B]
  W1 --> DB[(Database)]
  W2 --> OBJ[(Object storage)]
  Q -.-> MET[Queue age / lag]
```

Move email, media processing, webhook fanout and analytics out of the interactive path. Add idempotency, bounded retries, DLQs and backlog alarms.

## Stage 7 — Data partitioning

```mermaid
flowchart TB
  API[API] --> ROUTER[Partition router]
  ROUTER --> SH0[(Shard 0)]
  ROUTER --> SH1[(Shard 1)]
  ROUTER --> SH2[(Shard 2)]
  ROUTER --> SH3[(Shard 3)]
```

Choose partition keys based on query locality and cardinality. Plan hot-key mitigation, resharding and cross-shard workflows before rollout.

## Stage 8 — Multi-region resilience

```mermaid
flowchart TB
  U[Global users] --> G[Global traffic manager]
  G --> R1[Region A]
  G --> R2[Region B]
  R1 --> D1[(Regional data)]
  R2 --> D2[(Regional data)]
  D1 <-->|Replication / change stream| D2
  H[Health + failover controller] -.-> G
```

Define region ownership, write conflict policy, replication lag tolerance, failover RTO/RPO and tested recovery. DNS failover alone does not solve data consistency.

## Stage 9 — Operations and service boundaries

Split services around ownership, independent scaling, failure isolation or team autonomy—not fashion. Add golden signals, business metrics, tracing, runbooks, automated deploy/rollback and capacity tests. Track cost per successful action.

## Interview exercise

Take a URL shortener, chat app or photo-processing service. For every stage name: the observed constraint, minimum change, new failure modes, metric proving improvement and added cost/complexity.

Use [Breakscale workload testing](../BREAKSCALE_TESTING.md) to explore simulated capacity, queueing, retries and injected failures. It is not a production load test.

## Attribution / further reading

- [ByteByteGo — Scale from Zero to Millions of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)

This is an independently authored exercise, not a reproduction of course illustrations or prose.
