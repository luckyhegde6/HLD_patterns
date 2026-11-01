# Data Model

```mermaid
erDiagram
 PAYMENT ||--o{ PAYMENT_ATTEMPT : has
 PAYMENT ||--o{ LEDGER_ENTRY : records
 PAYMENT ||--o{ REFUND : may_have
 PAYMENT { string payment_id PK; string merchant_id; int amount_minor; string currency; string status; string idempotency_key }
 PAYMENT_ATTEMPT { string attempt_id PK; string payment_id FK; string provider_ref; string status }
 LEDGER_ENTRY { string entry_id PK; string payment_id FK; string account; int amount_minor; string currency; datetime created_at }
 REFUND { string refund_id PK; string payment_id FK; int amount_minor; string status; string idempotency_key }
```

Use minor currency units, immutable ledger entries, unique idempotency constraints and explicit state transitions.
