# Requirements — Distributed Logging

## Functional
Ingest logs, validate/normalize, redact, enrich, index recent data, archive older data, query by tenant/time/filters, alert and export.

## Non-functional
High ingest throughput, durable acceptance, tenant isolation, query latency targets, retention compliance and graceful overload behavior.

## Invariants
- Tenant identity comes from authenticated credentials, not event payload.
- Redaction happens before broad indexing/retention.
- Accepted batches are durably buffered.
- Query always enforces tenant scope and bounded time/range.
- Retention deletes hot and cold copies according to policy.

## APIs
POST /ingest/batches; POST /query; GET /query/{id}; GET /tenants/{id}/retention; POST /alerts.

## Workload assumptions
Events/sec, average event bytes, burst multiplier, hot retention, query concurrency, cardinality and tenant skew.
