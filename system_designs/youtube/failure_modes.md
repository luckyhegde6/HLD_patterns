# Failure Modes — YouTube-Style Video Platform

| Failure | Detection | Mitigation |
|---|---|---|
| Part upload interrupted | Missing part/checksum | Resume; expire abandoned sessions |
| Duplicate finalize | Idempotency key/state | Return existing finalized result |
| Worker crash | Lease expiry/queue age | Retry idempotently; DLQ poison jobs |
| Partial renditions | Manifest readiness check | Publish only complete required set |
| CDN/origin outage | Error/rebuffer metrics | Multi-origin failover, shielding, stale safe content |
| Private video URL leak | Audit/access tests | Short-lived signed tokens; reauthorize manifest |
| Deletion lag | Tombstone propagation metric | Purge CDN, indexes and object versions |

Bound retries by deadline and use backoff+jitter. Preserve source media until required derived outputs and retention policy permit lifecycle transition.
