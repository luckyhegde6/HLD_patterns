# Data Model

```mermaid
erDiagram
 LOG_EVENT ||--o{ LOG_FIELD : contains
 LOG_EVENT { string event_id PK; datetime timestamp; string service; string severity; string trace_id }
 LOG_FIELD { string event_id FK; string key; string value_type; string value }
```

Use a versioned schema, event timestamp plus ingestion timestamp, trace/span IDs, service/environment and tenant labels. Avoid indexing high-cardinality or sensitive fields without explicit need.
