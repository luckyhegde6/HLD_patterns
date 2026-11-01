# Data Model

```mermaid
erDiagram
 GROUP ||--o{ MEMBERSHIP : has
 GROUP ||--o{ EXPENSE : records
 EXPENSE ||--o{ SPLIT : allocates
 GROUP ||--o{ SETTLEMENT : tracks
 GROUP { string group_id PK; string name }
 MEMBERSHIP { string group_id FK; string user_id FK; string role }
 EXPENSE { string expense_id PK; string group_id FK; int total_minor; string currency; string payer_id }
 SPLIT { string expense_id FK; string user_id FK; int amount_minor }
 SETTLEMENT { string settlement_id PK; string group_id FK; string from_user; string to_user; int amount_minor; string status }
```

Use immutable expense entries and compensating records for edits. Store amounts in minor units and define deterministic rounding allocation.
