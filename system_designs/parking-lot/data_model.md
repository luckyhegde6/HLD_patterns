# Data Model

```mermaid
erDiagram
 PARKING_FLOOR ||--o{ PARKING_SPOT : contains
 PARKING_SPOT ||--o| PARKING_TICKET : assigned_to
 PARKING_TICKET ||--o| PAYMENT : settled_by
 PARKING_SPOT { string spot_id PK; int floor; string type; string status; int version }
 PARKING_TICKET { string ticket_id PK; string vehicle_id; string spot_id FK; datetime entry_time; datetime exit_time }
 PAYMENT { string payment_id PK; string ticket_id FK; decimal amount; string status; string idempotency_key }
```

Use atomic compare-and-set/transaction for spot assignment. Keep payment and occupancy states separately reconcilable.