# Failure Modes — Instagram-Style Media Network

- Upload incomplete: resumable session and checksum validation.
- Worker crash/duplicate: leases, retries and idempotent variant keys.
- Partial variants: publication readiness gate.
- Privacy/block change lag: read-time canonical ACL check and cache purge.
- Story cleanup delayed: enforce expires_at during reads.
- Duplicate likes/comments: idempotency/unique constraints.
- CDN stale deletion: tombstone, purge and signed URL expiry.
- Feed fanout backlog: queue-age alerts, backpressure and on-demand fallback.
