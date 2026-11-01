# Failure Modes

- Seat contention: atomic conditional allocation and waitlist.
- Payment timeout: reconcile provider; keep booking pending/unknown.
- Hold expires during checkout: define policy and verify hold before confirmation.
- Duplicate checkout: idempotency key.
- Ticket issuance failure: durable saga step and retry.
- Traffic surge: waiting room, admission control and fairness.

Monitor hold conversion, oversell invariant (zero), checkout latency, payment unknowns and ticket issuance lag.