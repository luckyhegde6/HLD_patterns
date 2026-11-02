# Social Feed / Timeline — HLD Case Study

Design a personalized feed with post creation, follower graph, ranking, pagination and freshness. The central choice is fanout-on-write, fanout-on-read or a hybrid.

## Requirements and workload questions

Clarify read/write ratio, follower distribution, celebrity accounts, feed freshness, ranking personalization, deletion guarantees and pagination semantics. Peak traffic and growth are assumptions until measured.

## Architecture

```mermaid
flowchart TB
  C[Clients] --> API[Feed API]
  API --> POST[Post service]
  POST --> DB[(Post store)]
  POST --> OUT[(Outbox)]
  OUT --> EVT[(Event stream)]
  EVT --> FAN[Fanout workers]
  FAN --> FOLLOW[(Follower graph)]
  FAN --> INBOX[(Precomputed user timelines)]
  API --> RANK[Feed assembler / ranker]
  RANK --> INBOX
  RANK --> POSTCACHE[(Post cache)]
  RANK --> REC[(Recommendation features)]
  API --> RESP[Ranked feed page]
  API -.-> OBS[Metrics / experiments]
```

## Create-post sequence

```mermaid
sequenceDiagram
  autonumber
  participant U as Author
  participant API as Post API
  participant DB as Post store
  participant E as Event stream
  participant F as Fanout workers
  participant G as Follower graph
  participant T as Timeline store
  U->>API: Create post
  API->>API: Validate account, content and policy
  API->>DB: Persist post
  DB-->>API: Committed post_id
  API-->>U: Post accepted
  API->>E: Publish PostCreated via outbox
  E->>F: Deliver event
  F->>G: Get eligible followers
  G-->>F: Follower batches
  F->>T: Insert timeline references
```

## Feed read sequence

```mermaid
sequenceDiagram
  participant C as Client
  participant API as Feed API
  participant T as Timeline store
  participant R as Ranker
  participant P as Post store
  C->>API: GET /feed with cursor
  API->>T: Fetch candidate post IDs
  T-->>API: Candidate IDs + features
  API->>P: Batch hydrate post bodies
  P-->>API: Post content
  API->>R: Rank and filter candidates
  R-->>API: Ordered page + next cursor
  API-->>C: Feed response
```

## Fanout strategies

| Strategy | Strength | Weakness |
|---|---|---|
| Fanout-on-write | Fast feed reads | Write amplification for high-follower accounts |
| Fanout-on-read | Cheap post creation | Expensive read-time graph merge |
| Hybrid | Isolates celebrity/hot users | More complex read assembly and caching |

## Key decisions

- Store post content once; timeline rows usually store references.
- Use stable cursor pagination, not offset pagination at high volume.
- Apply block/privacy/deletion filters during candidate generation and final response.
- Make fanout idempotent with a unique (user_id, post_id) key.
- Re-rank a bounded candidate pool; do not scan the entire graph per request.
- Monitor feed freshness, fanout lag, cache hit rate and ranking latency.