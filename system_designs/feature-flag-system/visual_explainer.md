# Feature Flag System — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Operator"]
  n1["Control plane"]
  n2["Versioned flag store"]
  n3["Config distribution"]
  n4["SDK local cache"]
  n5["Application"]
  n0 -->|publish flag| n1
  n1 -->|validate + persist| n2
  n1 -->|version update| n3
  n3 -->|config snapshot| n4
  n5 -->|evaluate locally| n4
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Operator as Operator
  participant Controlplane as Control plane
  participant Versionedflagstore as Versioned flag store
  participant Configdistribution as Config distribution
  participant SDKlocalcache as SDK local cache
  participant Application as Application
  Operator->>Controlplane: publish flag version
  Controlplane->>Versionedflagstore: validate + persist
  Controlplane->>Configdistribution: broadcast version
  Configdistribution->>SDKlocalcache: deliver snapshot
  Application->>SDKlocalcache: evaluate context locally
  SDKlocalcache->>Application: variant / safe default
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

- Evaluation is deterministic for the same config version and context.
- Flags default safely when config is missing or invalid.
- Targeting uses approved context and avoids unnecessary PII.

## 5. Architecture decisions to defend

- Separate control plane (authoring, targeting, audit) from data plane (low-latency local evaluation).
- Define boolean, multivariate, experiment and kill-switch semantics; stable bucketing and context fields.
- Walk versioned publish → distribution → SDK cache → deterministic evaluation at request time.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Separate control plane (authoring, targeting, audit) from data plane (low-latency local evaluation).

### 1:00–2:00 — Requirements and invariants
Define boolean, multivariate, experiment and kill-switch semantics; stable bucketing and context fields.

### 2:00–4:00 — Draw and narrate the architecture
Walk versioned publish → distribution → SDK cache → deterministic evaluation at request time.

### 4:00–6:00 — Walk the critical path
Explain stale-config policy, safe defaults, SDK compatibility, privacy and propagation SLO.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: control-plane outage, stale SDK, malformed config, targeting data unavailable and emergency kill switch lag.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: local evaluation speed vs propagation delay; dynamic rules vs SDK complexity; flag debt vs rollout safety.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you guarantee stable cohorts?
- What is the kill-switch propagation SLO?
- How do you handle stale config?
- How do you retire old flags?

## Archify source

Editable Archify diagram IR: archify/feature-flag-system.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
