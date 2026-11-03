# Architecture — Food Delivery

Order service owns state and writes an outbox event. Saga orchestrator coordinates payment authorization, restaurant acceptance, courier assignment and settlement. Each adapter uses idempotency keys and signed webhook verification. Location and ETA are separate streaming projections.

```mermaid
sequenceDiagram
 participant C as Customer
 participant O as Order Service
 participant S as Saga
 participant P as Payment
 participant R as Restaurant
 participant D as Dispatch
 C->>O: checkout(menu snapshot, key)
 O->>S: start saga
 S->>P: authorize payment
 P-->>S: authorized
 S->>R: request acceptance
 R-->>S: accepted
 S->>D: assign courier
 D-->>S: assigned
 S->>O: update canonical order state
 O-->>C: order status
```

Scale menu reads with cache/versioning; partition orders by region/orderId; use event-driven status updates and reconciliation jobs for provider drift.
