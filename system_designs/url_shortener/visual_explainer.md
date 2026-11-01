# URL Shortener — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Browser / mobile"]
  n1["CDN / gateway"]
  n2["URL service"]
  n3["Redis cache"]
  n4["URL mapping store"]
  n5["Analytics queue"]
  n6["Analytics consumers"]
  n0 -->|GET short code| n1
  n1 -->|forward| n2
  n2 -->|lookup mapping| n3
  n3 -->|miss → lookup| n4
  n2 -->|301 / 302 redirect| n0
  n2 -->|emit event| n5
  n5 -->|aggregate| n6
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Browsermobile as Browser / mobile
  participant CDNgateway as CDN / gateway
  participant URLservice as URL service
  participant Rediscache as Redis cache
  participant URLmappingstore as URL mapping store
  participant Analyticsqueue as Analytics queue
  Browsermobile->>CDNgateway: GET /:code
  CDNgateway->>URLservice: cache miss / forward
  URLservice->>Rediscache: lookup code
  Rediscache->>URLmappingstore: read on miss
  URLmappingstore->>URLservice: active mapping
  URLservice->>Rediscache: populate TTL
  URLservice->>Browsermobile: 301 / 302
  URLservice->>Analyticsqueue: publish redirect event
```

## 3. Failure and recovery

```mermaid
flowchart TD
  A[Request / event arrives] --> B{Validate identity, input and state?}
  B -->|No| R[Reject safely and audit]
  B -->|Yes| C[Execute bounded operation]
  C --> D{Outcome confirmed?}
  D -->|Yes| S[Persist result / acknowledge]
  D -->|Transient| E{Retry safe and budget remains?}
  E -->|Yes| F[Backoff with jitter; preserve idempotency key]
  F --> C
  E -->|No| H[Controlled failure / DLQ / reconciliation]
  D -->|Ambiguous external effect| H
  H --> M[Alert and reconcile before replay]
```

## 4. Core invariants

- Short code uniqueness is enforced by durable storage.
- Redirect only active mappings and honor expiry/revocation policy.
- Creation succeeds only after mapping persistence commits.

## 5. Architecture decisions to defend

- Frame as read-heavy redirect service; clarify custom aliases, expiry, abuse controls, analytics and redirect type.
- Estimate reads/writes and storage with assumptions; keep creation and redirect paths separate.
- Walk redirect cache hit/miss, active/expired/revoked mapping, and best-effort cache fill.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Frame as read-heavy redirect service; clarify custom aliases, expiry, abuse controls, analytics and redirect type.

### 1:00–2:00 — Requirements and invariants
Estimate reads/writes and storage with assumptions; keep creation and redirect paths separate.

### 2:00–4:00 — Draw and narrate the architecture
Walk redirect cache hit/miss, active/expired/revoked mapping, and best-effort cache fill.

### 4:00–6:00 — Walk the critical path
Explain unique code generation, persistence before success, cache invalidation, reliable analytics publication and abuse checks.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: cache outage, mapping-store outage, collision, revoked URL, hot key and analytics lag.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: 301 vs 302; random vs sequential code; CDN caching vs revocation freshness; synchronous vs async analytics.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you generate unique codes?
- How do you revoke a heavily cached URL?
- What consistency is needed for redirects?
- How do you scale analytics without hurting redirects?

## Archify source

Editable Archify diagram IR: archify/url_shortener.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
