# Failure Modes — Ride-Hailing

- Two drivers accept: conditional assignment/CAS; only one wins.
- Offer arrives late: expiry checked at accept time.
- GPS stale/out of order: timestamp/accuracy validation and TTL.
- Driver/rider disconnect: trip state persists; reconnect reads canonical state.
- Cancellation races with pickup: state transition guard and compensation.
- Payment timeout: pending state plus provider reconciliation/idempotency.
- Geo index outage: fallback cell/region query or controlled admission.
- Safety event: priority escalation, restricted audit and human response.
