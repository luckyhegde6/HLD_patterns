# Distributed ID Generator — HLD

Generate unique, optionally time-sortable IDs across many nodes without a central per-request bottleneck.

## Requirements
- Unique IDs across workers and regions.
- Define ordering, bit length, throughput and collision guarantees.
- Handle worker identity allocation, clock rollback and sequence exhaustion.
- Provide SDK/service interfaces and operational diagnostics.

## Design focus
Time + worker/node + per-time-unit sequence (Snowflake-style), worker lease/identity, clock drift policy and migration strategy.

See requirements, architecture, data model, failure modes, trade-offs, AI/FDE implementation and interview walkthrough.

**Security:** IDs are identifiers, not secrets or authorization tokens.