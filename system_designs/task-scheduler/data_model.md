# Data Model

```mermaid
erDiagram
 JOB ||--o{ JOB_ATTEMPT : has
 JOB { string job_id PK; string tenant_id; datetime run_at; string status; int version; string idempotency_key }
 JOB_ATTEMPT { string attempt_id PK; string job_id FK; int attempt_no; datetime started_at; string outcome }
```

Index by status/run_at and tenant. Use leases with expiry/fencing, versioned state transitions and durable retry metadata. Keep payload schema/version explicit.
