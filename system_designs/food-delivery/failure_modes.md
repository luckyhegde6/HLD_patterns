# Failure Modes — Food Delivery

- Menu changed after cart: revalidate quote/version before checkout.
- Restaurant timeout/reject: cancel saga and void/refund payment.
- Duplicate webhook: signature check + event dedupe.
- Payment response lost: reconcile by provider reference before retry.
- Courier unavailable: bounded rematch; notify customer and restaurant.
- Cancellation race after pickup: state guard and policy-driven partial refund.
- ETA/location stale: mark freshness and fallback to status-only view.
- Saga worker crash: persisted step state, lease/retry and reconciliation.
