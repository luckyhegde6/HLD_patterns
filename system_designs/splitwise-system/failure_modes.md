# Failure Modes

- Duplicate expense: idempotency key.
- Rounding mismatch: deterministic remainder allocation and sum invariant.
- Concurrent edit: version check and compensating ledger entry.
- Projection lag: rebuild from ledger.
- Settlement timeout: reconcile before retry.
- Unauthorized group access: verify membership on each operation.
