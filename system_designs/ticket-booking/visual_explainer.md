# Ticket Booking System — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Users"]
  n1["Waiting room"]
  n2["Booking API"]
  n3["Inventory service"]
  n4["Inventory store"]
  n5["Hold service"]
  n6["Payment orchestrator"]
  n7["Ticket issuance"]
  n0 -->|join sale| n1
  n1 -->|admit request| n2
  n2 -->|check availability| n3
  n3 -->|atomic hold| n4
  n2 -->|hold token| n5
  n5 -->|checkout| n6
  n6 -->|confirm + issue| n7
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Users as Users
  participant Waitingroom as Waiting room
  participant BookingAPI as Booking API
  participant Inventoryservice as Inventory service
  participant Inventorystore as Inventory store
  participant Paymentorchestrator as Payment orchestrator
  participant Ticketissuance as Ticket issuance
  Users->>Waitingroom: join queue
  Waitingroom->>BookingAPI: admit with token
  BookingAPI->>Inventoryservice: request seat hold
  Inventoryservice->>Inventorystore: conditional hold with expiry
  BookingAPI->>Paymentorchestrator: checkout idempotently
  Paymentorchestrator->>Inventorystore: confirm booking
  Inventorystore->>Ticketissuance: issue ticket
  Ticketissuance->>Users: confirmation
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

- A seat has at most one active hold/booking at a time.
- Hold expiry and payment confirmation are serialized/conditional.
- Ticket issuance is idempotent and tied to confirmed booking.

## 5. Architecture decisions to defend

- Clarify assigned seats vs general admission, sale spikes, fairness, hold TTL, payment model and cancellation rules.
- Make inventory store authoritative; explain conditional updates/transactions and waiting-room admission control.
- Walk admission → seat hold with expiry → payment → booking confirmation → ticket issuance.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Clarify assigned seats vs general admission, sale spikes, fairness, hold TTL, payment model and cancellation rules.

### 1:00–2:00 — Requirements and invariants
Make inventory store authoritative; explain conditional updates/transactions and waiting-room admission control.

### 2:00–4:00 — Draw and narrate the architecture
Walk admission → seat hold with expiry → payment → booking confirmation → ticket issuance.

### 4:00–6:00 — Walk the critical path
Handle payment success with lost response, hold expiry race, inventory contention and ticket issuance retry.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: oversell, hot event partition, payment timeout, duplicate checkout and partial regional failure.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: strong consistency on inventory vs throughput; fairness vs utilization; synchronous vs async confirmation.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you prevent overselling?
- What if payment completes after hold expiry?
- How do you handle flash crowds?
- How do you recover ticket issuance failures?

## Archify source

Editable Archify diagram IR: archify/ticket-booking.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
