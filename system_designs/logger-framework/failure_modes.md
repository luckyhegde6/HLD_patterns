# Failure Modes

- Collector unavailable: bounded local spool and backpressure.
- Queue full: prioritize audit/security events; sample low-value diagnostics per policy.
- Malformed event: quarantine with schema version and reason.
- Index outage: durable buffer and delayed indexing.
- Sensitive field detected: redact before persistence and alert on schema violation.
- Clock skew: preserve ingestion timestamp and monitor skew.

Track dropped/sampled events, queue age, ingest lag, parse failures, storage cost and query latency.
