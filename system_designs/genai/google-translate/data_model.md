# Data Model — Google Translate

## Design goals
Support multilingual text translation with language-pair routing, quality evaluation and optional async document jobs. with tenant/user boundaries, versioning, traceability, idempotency and retention/deletion.

## Core entities

```mermaid
erDiagram
  PRINCIPAL ||--o{ REQUEST : submits
  REQUEST ||--o| RESULT : produces
  REQUEST ||--o{ EXECUTION : records
  MODEL_VERSION ||--o{ EXECUTION : serves
  PRINCIPAL ||--o{ FEEDBACK : provides
  REQUEST ||--o{ FEEDBACK : receives
  PRINCIPAL {
    uuid id PK
    string tenant_id
    string status
  }
  REQUEST {
    uuid id PK
    uuid principal_id FK
    string idempotency_key
    string state
    json input_metadata
    datetime created_at
  }
  EXECUTION {
    uuid id PK
    uuid request_id FK
    string model_version
    string status
    int attempt
    datetime started_at
  }
  RESULT {
    uuid id PK
    uuid request_id FK
    string artifact_ref
    json output_metadata
    datetime expires_at
  }
  MODEL_VERSION {
    string id PK
    string provider
    string config_hash
  }
  FEEDBACK {
    uuid id PK
    uuid principal_id FK
    uuid request_id FK
    string label
    datetime created_at
  }
```

## Storage notes
- Keep large text/media payloads in encrypted object storage when appropriate; relational DB stores metadata and references.
- Add indexes on tenant/principal, state, created_at and idempotency key.
- Unique constraint: (tenant_id, idempotency_key) for request creation.
- Store model/prompt/config versions to reproduce evaluation and investigate regressions.
- Avoid logging raw sensitive inputs by default; define retention and deletion propagation across cache, indexes, artifacts and backups.

## State lifecycle
```mermaid
stateDiagram-v2
  [*] --> accepted
  accepted --> queued
  queued --> running
  running --> succeeded
  running --> retryable_failure
  retryable_failure --> queued
  running --> terminal_failure
  accepted --> rejected
  queued --> cancelled
  succeeded --> expired
```

Adapt entities and fields to the product-specific requirements; do not persist model internals that are not needed for audit or reproducibility.