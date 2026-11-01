# Logging Framework — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Applications"]
  n1["Logger SDK"]
  n2["Local buffer / sampling"]
  n3["Collector"]
  n4["Durable buffer"]
  n5["Redact / enrich"]
  n6["Search + object store"]
  n0 -->|emit event| n1
  n1 -->|validate / sample| n2
  n2 -->|batch| n3
  n3 -->|durable append| n4
  n4 -->|consume| n5
  n5 -->|route by retention| n6
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Applications as Applications
  participant LoggerSDK as Logger SDK
  participant Localbuffersampling as Local buffer / sampling
  participant Collector as Collector
  participant Durablebuffer as Durable buffer
  participant Redactenrich as Redact / enrich
  participant Searchobjectstore as Search + object store
  Applications->>LoggerSDK: structured event
  LoggerSDK->>Localbuffersampling: schema + sampling
  Localbuffersampling->>Collector: batch with deadline
  Collector->>Durablebuffer: append + acknowledge
  Durablebuffer->>Redactenrich: process
  Redactenrich->>Searchobjectstore: index / archive
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

- Sensitive fields are redacted before broad downstream storage.
- Buffer pressure has an explicit priority/loss policy.
- Event schema and retention are versioned and governed.

## 5. Architecture decisions to defend

- Estimate events/sec, bytes/event, retention, query patterns and cardinality; define loss tolerance by severity.
- Design SDK, local buffer, collector, durable ingestion, redaction/enrichment and hot/cold sinks.
- Walk structured event emission → batching/sampling → durable append → processing → search/archive.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Estimate events/sec, bytes/event, retention, query patterns and cardinality; define loss tolerance by severity.

### 1:00–2:00 — Requirements and invariants
Design SDK, local buffer, collector, durable ingestion, redaction/enrichment and hot/cold sinks.

### 2:00–4:00 — Draw and narrate the architecture
Walk structured event emission → batching/sampling → durable append → processing → search/archive.

### 4:00–6:00 — Walk the critical path
Explain backpressure, sampling priorities, tenant quotas, schema evolution and deletion/retention policies.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: collector outage, buffer full, poison schema, high-cardinality labels, PII leak and sink outage.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: synchronous durability vs application latency; indexing cost vs query speed; sampling vs forensic completeness.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you prevent logging from slowing requests?
- What is your loss policy under overload?
- How do you control cardinality and cost?
- How do you honor deletion requirements?

## Archify source

Editable Archify diagram IR: archify/logger-framework.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
