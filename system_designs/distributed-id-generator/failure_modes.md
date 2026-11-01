# Failure Modes

- Worker ID collision: use leases and fencing; refuse startup if identity is uncertain.
- Clock rollback: bounded wait or fail closed.
- Sequence overflow: wait for next time unit; never wrap silently.
- Worker restart: reacquire identity.
- Region partition: ensure worker namespaces remain disjoint.
- Format migration: version format and dual-read as needed.

Monitor clock drift, sequence exhaustion, lease renewals and generation latency.
