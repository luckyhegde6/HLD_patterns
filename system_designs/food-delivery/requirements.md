# Requirements — Food Delivery

## Functional
Discover restaurants/menus, cart, quote, checkout, restaurant accept/reject, payment, courier assignment, live tracking, delivery completion, cancellation and refund.

## Invariants
- OrderLine stores checkout-time item/price snapshot.
- Checkout and payment commands are idempotent.
- Order state transitions are validated.
- Every saga step has timeout, retry and compensation/reconciliation.
- Provider webhooks are deduplicated and signature-verified.

## APIs
GET /restaurants; GET /menus/{id}; POST /quotes; POST /orders; POST /orders/{id}/cancel; POST /provider/webhooks; GET /orders/{id}/tracking.

## Workload assumptions
Orders/minute/region, menu reads, restaurant acceptance latency, courier density, GPS cadence and payment-provider SLA.
