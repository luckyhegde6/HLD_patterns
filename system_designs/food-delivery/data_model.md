# Data Model — Food Delivery

| Entity | Fields | Notes |
|---|---|---|
| Restaurant | id, region_id, status | Merchant |
| MenuItem | id, restaurant_id, version, price, availability | Versioned catalog |
| Order | id, customer_id, state, version, region_id | Canonical lifecycle |
| OrderLine | order_id, item_id, name_snapshot, price_snapshot, qty | Checkout snapshot |
| Payment | id, order_id, status, provider_ref, amount | Idempotent provider ops |
| Delivery | id, order_id, courier_id, state, pickup/dropoff | Courier lifecycle |
| SagaStep | order_id, step, status, idempotency_key, attempts | Orchestration record |
| Refund | id, payment_id, amount, reason, status | Auditable compensation |

Use unique provider event IDs, order version checks and immutable checkout snapshots.
