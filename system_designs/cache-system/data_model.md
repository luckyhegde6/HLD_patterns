# Data Model — Distributed Cache

This is a starter logical model; refine entities and constraints against domain requirements and access patterns.

```mermaid
erDiagram
  TENANT ||--o{ ACTOR : contains
  ACTOR ||--o{ REQUEST : submits
  REQUEST ||--o{ EVENT : emits
  REQUEST ||--o{ OPERATION : causes
  OPERATION ||--o| RESULT : records
  TENANT { string tenant_id PK }
  ACTOR { string actor_id PK; string tenant_id FK }
  REQUEST { string request_id PK; string tenant_id FK; string status }
  EVENT { string event_id PK; string request_id FK; datetime created_at }
  OPERATION { string operation_id PK; string request_id FK; string idempotency_key }
  RESULT { string result_id PK; string operation_id FK; string outcome }
```

## Modeling rules

- Use stable primary keys and explicit tenant ownership where multi-tenancy applies.
- Enforce uniqueness and invariants in the database where possible.
- Store timestamps in UTC; distinguish event time from processing time.
- Use optimistic concurrency/version columns for contested updates.
- Separate operational state from immutable audit history.
- Define PII classification, retention, deletion and legal-hold behavior.