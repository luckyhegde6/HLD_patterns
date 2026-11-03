# Failure Modes — Distributed Logging

- Ingest burst: durable queue, adaptive backpressure and agent-side sampling.
- Queue saturation: admission control, oldest-age alerts and tiered buffering.
- Poison event: schema validation, DLQ and replay tooling.
- High-cardinality labels: limits, normalization and cardinality dashboards.
- Hot tenant: per-tenant quotas, partition isolation and fairness.
- Index outage: queue backlog and delayed search while preserving accepted logs.
- Clock skew: ingestion timestamp plus observed timestamp and correction bounds.
- Sensitive data leak: redact before indexing, audit rules and purge/reindex procedure.
- Retention miss: lifecycle audits and deletion verification across hot/cold tiers.
