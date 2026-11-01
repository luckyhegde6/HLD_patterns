# Failure Modes

- Limiter store outage: per-route fail-open/closed decision and local emergency limits.
- Hot key: shard or hierarchical quotas; avoid unbounded cardinality.
- Clock skew: server-side time source and bounded drift.
- Policy propagation delay: versioned config and safe defaults.
- Retry storm: return retry metadata and use jittered client backoff.

Monitor reject rate, store latency, key cardinality, hot partitions and policy age.