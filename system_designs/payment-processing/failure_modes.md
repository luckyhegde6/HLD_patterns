# Failure Modes

- Provider timeout after authorization: mark unknown and reconcile; do not blindly retry.
- Duplicate request: return stored result for idempotency key.
- Duplicate/out-of-order webhook: verify signature, dedupe event ID and validate state transition.
- Provider outage: circuit break and avoid duplicate authorization.
- Ledger write failure: durable event/outbox and reconciliation; never claim settlement without ledger evidence.
- Refund race: enforce remaining refundable amount transactionally.

Monitor unknown-state age, webhook lag, reconciliation variance, duplicate attempts and provider latency.
