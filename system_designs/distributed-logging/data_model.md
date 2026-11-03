# Data Model — Distributed Logging

| Entity | Fields | Notes |
|---|---|---|
| LogEvent | timestamp, tenant_id, service, severity, trace_id, body, attributes | Normalized event |
| IngestBatch | batch_id, tenant_id, checksum, received_at | Idempotent batch |
| TenantPolicy | tenant_id, quota, retention, redaction_rules | Control plane |
| IndexSegment | tenant_id, time_range, schema_version, location | Hot tier |
| ArchiveObject | tenant_id, time_range, compression, object_key | Cold tier |
| Query | id, tenant_id, range, filters, budget, status | Bounded execution |
| QueryCursor | query_id, partition, offset | Pagination |
| AlertRule | tenant_id, query, threshold, window | Evaluation |
