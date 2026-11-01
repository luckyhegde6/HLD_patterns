# Parking Lot System — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Entry gate"]
  n1["Parking API"]
  n2["Spot allocator"]
  n3["Spot inventory"]
  n4["Ticket service"]
  n5["Fee / payment"]
  n6["Exit gate"]
  n0 -->|entry request| n1
  n1 -->|vehicle + key| n2
  n2 -->|atomic reserve| n3
  n2 -->|issue ticket| n4
  n6 -->|calculate + collect| n5
  n5 -->|release spot| n3
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Entrygate as Entry gate
  participant ParkingAPI as Parking API
  participant Spotallocator as Spot allocator
  participant Spotinventory as Spot inventory
  participant Ticketservice as Ticket service
  participant Exitgate as Exit gate
  participant Feepayment as Fee / payment
  Entrygate->>ParkingAPI: vehicle type + request key
  ParkingAPI->>Spotallocator: find compatible spot
  Spotallocator->>Spotinventory: atomic reserve
  Spotallocator->>Ticketservice: create ticket
  Exitgate->>Feepayment: ticket + exit time
  Feepayment->>Spotinventory: release on confirmed exit
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

- One spot cannot be reserved/occupied by two active tickets.
- Ticket and spot state transitions are idempotent.
- Spot release occurs only after exit/payment policy is satisfied.

## 5. Architecture decisions to defend

- Clarify vehicle types, spot compatibility, levels, reservations, pricing, lost tickets and offline gates.
- Model spot states (available/reserved/occupied/maintenance), ticket lifecycle and payment state.
- Walk entry request → compatible spot search → atomic reservation → ticket issue → exit fee → release spot.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Clarify vehicle types, spot compatibility, levels, reservations, pricing, lost tickets and offline gates.

### 1:00–2:00 — Requirements and invariants
Model spot states (available/reserved/occupied/maintenance), ticket lifecycle and payment state.

### 2:00–4:00 — Draw and narrate the architecture
Walk entry request → compatible spot search → atomic reservation → ticket issue → exit fee → release spot.

### 4:00–6:00 — Walk the critical path
Explain concurrency using conditional updates/locks and idempotency at physical gate boundaries.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: sensor mismatch, network partition, duplicate gate event, payment timeout and offline mode.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: centralized inventory vs local gate autonomy; reservation fairness vs utilization; exact pricing vs simple rules.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you prevent double allocation?
- What happens when the network is down?
- How are lost tickets handled?
- How do you reconcile sensor state?

## Archify source

Editable Archify diagram IR: archify/parking-lot.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
