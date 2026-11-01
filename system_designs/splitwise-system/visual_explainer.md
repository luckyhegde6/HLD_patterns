# Expense Sharing System — Visual Architecture Explainer

> Conceptual HLD based on this repository's design notes. Confirm workload assumptions, service semantics and deployment choices before implementation.

## 1. System architecture

```mermaid
flowchart LR
  n0["Users"]
  n1["Expense API"]
  n2["Split calculator"]
  n3["Expense ledger"]
  n4["Expense events"]
  n5["Balance projection"]
  n6["Balance store"]
  n0 -->|add expense| n1
  n1 -->|validate split| n2
  n2 -->|append entries| n3
  n3 -->|publish expense| n4
  n4 -->|update balances| n5
  n5 -->|persist net balances| n6
```

Follow the primary request path first. Storage, policy, queue and telemetry are supporting boundaries; they are not interchangeable.

## 2. Critical interaction

```mermaid
sequenceDiagram
  autonumber
  participant Users as Users
  participant ExpenseAPI as Expense API
  participant Splitcalculator as Split calculator
  participant Expenseledger as Expense ledger
  participant Expenseevents as Expense events
  participant Balanceprojection as Balance projection
  participant Balancestore as Balance store
  Users->>ExpenseAPI: expense + participants
  ExpenseAPI->>Splitcalculator: validate split + currency
  Splitcalculator->>Expenseledger: append exact allocations
  Expenseledger->>Expenseevents: publish committed event
  Expenseevents->>Balanceprojection: apply idempotently
  Balanceprojection->>Balancestore: update net balances
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

- Split allocations sum exactly to the expense total in minor units.
- Ledger is authoritative; balance projection can be rebuilt.
- Edits/deletes preserve audit history through compensating changes.

## 5. Architecture decisions to defend

- Clarify equal/percentage/shares/exact splits, group membership, currencies, edits/deletes and settlement semantics.
- Use an append-only expense ledger as source of truth; balances are a rebuildable projection.
- Walk deterministic split calculation in minor units → validation that allocations sum exactly → ledger append → event → projection.

| Concern | AWS starting point | GCP starting point |
|---|---|---|
| Compute / API | API Gateway + ECS/Lambda as appropriate | API Gateway / Cloud Load Balancing + Cloud Run/GKE |
| Durable state | RDS/Aurora or DynamoDB based on access pattern | Cloud SQL/Spanner/Firestore based on access pattern |
| Async work | SQS/SNS/EventBridge/Kinesis as needed | Pub/Sub/Eventarc as needed |
| Operations | CloudWatch, X-Ray, IAM, Secrets Manager | Cloud Logging/Monitoring/Trace, Cloud IAM, Secret Manager |

These are starter mappings, not exact equivalents. Choose services from required consistency, ordering, retention, latency, regional scope and operational constraints.

## 6. Senior interview walkthrough (10 minutes)

### 0:00–1:00 — Frame the problem
Clarify equal/percentage/shares/exact splits, group membership, currencies, edits/deletes and settlement semantics.

### 1:00–2:00 — Requirements and invariants
Use an append-only expense ledger as source of truth; balances are a rebuildable projection.

### 2:00–4:00 — Draw and narrate the architecture
Walk deterministic split calculation in minor units → validation that allocations sum exactly → ledger append → event → projection.

### 4:00–6:00 — Walk the critical path
Explain rounding remainder distribution, idempotency, edits as compensating entries and projection rebuild.

### 6:00–8:00 — Failure, recovery and operations
Failure cases: duplicate expense, projection lag, concurrent edits, member removal and multi-currency ambiguity.

### 8:00–9:00 — Trade-offs and alternatives
Trade-offs: simplified debt graph vs preserving original obligations; synchronous balance update vs eventual projection.

### 9:00–10:00 — Close with measurable signals
Name the SLOs and operational signals that demonstrate correctness and capacity: user-visible latency/error rate, saturation, queue age/lag where applicable, retry/duplicate rate, and domain success metrics. State what would trigger a redesign rather than claiming unlimited scale.

## 7. Follow-up questions to rehearse

- How do you handle rounding?
- How do you rebuild balances?
- What does debt simplification preserve?
- How do you model multiple currencies?

## Archify source

Editable Archify diagram IR: archify/splitwise-system.architecture.json. Generate the interactive HTML with the Archify skill/CLI from the repository root. The Mermaid diagrams above render directly on GitHub.
