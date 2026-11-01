# Data Model

```mermaid
erDiagram
 FLAG ||--o{ FLAG_RULE : contains
 FLAG ||--o{ FLAG_VERSION : versions
 SEGMENT ||--o{ FLAG_RULE : referenced_by
 FLAG { string flag_key PK; string owner; string status }
 FLAG_RULE { string rule_id PK; string flag_key FK; int priority; string condition }
 FLAG_VERSION { string version_id PK; string flag_key FK; datetime published_at }
 SEGMENT { string segment_id PK; string name }
```

Use immutable versions, deterministic rule priority, typed attributes, environment scope and audit actor. Minimize personal data in targeting definitions.
