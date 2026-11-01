# Architecture and Diagrams — API Gateway

## Component architecture

clients, API gateway, identity provider, service registry, backend services

```mermaid
flowchart LR
  C[Clients / operators] --> API[API Gateway API]
  API --> CORE[Core domain service]
  CORE --> DB[(Authoritative store)]
  CORE --> CACHE[(Cache / fast state)]
  CORE --> Q[Queue / event stream]
  Q --> W[Workers / consumers]
  W --> EXT[External dependencies]
  CORE --> OBS[Metrics, logs and traces]
  W --> OBS
```

## Critical request sequence

```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant A as API
  participant S as Domain service
  participant D as Data store
  participant Q as Queue
  C->>A: Submit command
  A->>S: Validate identity, input and policy
  S->>D: Read / conditional write
  D-->>S: Result
  opt Asynchronous work
    S->>Q: Publish event (outbox if needed)
    Q-->>S: Durable enqueue acknowledgement
  end
  S-->>A: Domain result
  A-->>C: Response
```

## Failure and recovery decision

```mermaid
flowchart TD
  R[Request] --> V{Valid and authorized?}
  V -->|No| REJ[Reject safely]
  V -->|Yes| D[Execute with deadline]
  D --> OK{Dependency success?}
  OK -->|Yes| DONE[Return result]
  OK -->|Transient / timeout| RETRY{Safe retry and budget remains?}
  RETRY -->|Yes| BACK[Backoff with jitter]
  BACK --> D
  RETRY -->|No| FALL[Fallback or controlled failure]
```

## Deployment boundary

```mermaid
flowchart TB
  subgraph Public["Public boundary"]
    CLIENT[Clients]
  end
  subgraph App["Trusted application boundary"]
    EDGE[Gateway]
    SVC[Domain services]
    POL[Identity and policy]
  end
  subgraph Restricted["Restricted data boundary"]
    STORE[(Authoritative data)]
    QUEUE[(Durable messaging)]
    AUDIT[(Audit store)]
  end
  CLIENT --> EDGE
  EDGE --> POL
  EDGE --> SVC
  SVC --> STORE
  SVC --> QUEUE
  SVC --> AUDIT
```

## Operational signals

| Signal | Why it matters |
|---|---|
| Request rate, errors, p95/p99 | User-visible performance |
| Dependency latency/error rate | Downstream degradation |
| Queue age / consumer lag | Async capacity mismatch |
| Retry / timeout / duplicate rate | Amplification and idempotency defects |
| CPU, memory and connection saturation | Capacity exhaustion |
| Business success/failure | Actual system outcomes |

## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/api-gateway.architecture.json](archify/api-gateway.architecture.json).
