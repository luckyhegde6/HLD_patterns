# Elevator Control System — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Riders / panels"]
  n1["Dispatcher"]
  n2["Assignment optimizer"]
  n3["Car controller"]
  n4["Safety controller"]
  n5["Building state"]
  n0 -->|hall call| n1
  n1 -->|eligible cars| n2
  n2 -->|assign stop| n3
  n3 -->|motion permit| n4
  n1 -->|persist state| n5
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Riderspanels as Riders / panels
  participant Dispatcher as Dispatcher
  participant Assignmentoptimizer as Assignment optimizer
  participant Carcontroller as Car controller
  participant Safetycontroller as Safety controller
  Riderspanels->>Dispatcher: hall call floor + direction
  Dispatcher->>Assignmentoptimizer: score eligible cars
  Assignmentoptimizer->>Carcontroller: assign stop
  Carcontroller->>Safetycontroller: request motion / door action
  Safetycontroller->>Carcontroller: permit / inhibit
  Carcontroller->>Dispatcher: position + state update
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

- Safety interlocks override scheduling decisions.
- A car is assigned only when eligible and not in maintenance/emergency state.
- Commands and sensor updates are state-checked and auditable.

## 5. Architecture decisions to defend

- Clarify building floors, car count, capacity, destination dispatch, accessibility, peak traffic and safety constraints.
- Model hall calls, car calls, car state, door state, maintenance and emergency modes.
- Explain assignment scoring using direction, distance, load, stops and fairness; safety controller remains independent of optimization.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Clarify building floors, car count, capacity, destination dispatch, accessibility, peak traffic and safety constraints.

### 1:00–2:00 — Requirements and invariants
Model hall calls, car calls, car state, door state, maintenance and emergency modes.

### 2:00–4:00 — Draw and narrate the architecture
Explain assignment scoring using direction, distance, load, stops and fairness; safety controller remains independent of optimization.

### 4:00–6:00 — Walk the critical path
Walk call → eligible-car scoring → assignment → controller movement → safe door operation → state/ETA update.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: sensor disagreement, controller/network loss, stuck door, fire/emergency mode and stale building state.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: simple collective control vs predictive optimization; responsiveness vs fairness; central dispatcher vs local autonomy.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you prevent starvation?
- How do you handle peak up/down traffic?
- What happens on dispatcher outage?
- How do safety constraints interact with optimization?

## Archify source

Editable Archify diagram IR: archify/elevator-system.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
