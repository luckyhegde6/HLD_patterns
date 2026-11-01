# Data Model

```mermaid
erDiagram
 TOPIC ||--o{ PARTITION : contains
 PARTITION ||--o{ MESSAGE : stores
 CONSUMER_GROUP ||--o{ OFFSET : tracks
 TOPIC { string topic_id PK; string name; int retention }
 PARTITION { string partition_id PK; string topic_id FK; int partition_no }
 MESSAGE { string message_id PK; string partition_id FK; int offset; string key; datetime created_at }
 CONSUMER_GROUP { string group_id PK; string name }
 OFFSET { string group_id FK; string partition_id FK; int committed_offset }
```

Schema registry/versioning and idempotency keys belong in message headers or envelope as appropriate.