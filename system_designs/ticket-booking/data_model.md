# Data Model

```mermaid
erDiagram
 EVENT ||--o{ SEAT : contains
 SEAT ||--o| HOLD : held_by
 HOLD ||--o| BOOKING : confirms
 BOOKING ||--o{ TICKET : issues
 EVENT { string event_id PK; datetime starts_at }
 SEAT { string seat_id PK; string event_id FK; string status; int version }
 HOLD { string hold_id PK; string seat_id FK; datetime expires_at; string user_id }
 BOOKING { string booking_id PK; string hold_id FK; string payment_ref; string status }
 TICKET { string ticket_id PK; string booking_id FK; string barcode_hash }
```

Use conditional writes/transactions to enforce seat uniqueness. Keep hold expiry and payment status independently reconcilable.