# Data Model

```mermaid
erDiagram
 POLICY ||--o{ BUCKET : configures
 POLICY { string policy_id PK; string scope; int capacity; int refill_rate; int window }
 BUCKET { string bucket_key PK; string policy_id FK; decimal tokens; datetime updated_at; int version }
```

Bucket key must derive from trusted identity and include policy/version scope. Use atomic scripts/transactions for consume and refill.