# Failure Modes and Recovery — API Gateway

| Failure | Detection | Mitigation | Recovery invariant |
|---|---|---|---|
| Duplicate command | Repeated idempotency key | Return prior outcome | No duplicate side effect |
| Dependency timeout | Deadline exceeded | Retry only if safe | Reconcile ambiguous result |
| Database outage | Connection/health alarms | Shed load; queue only if semantics allow | Restore from tested backups |
| Queue backlog | Oldest message age | Scale consumers; backpressure | Preserve delivery contract |
| Poison message | Repeated processing failure | Quarantine to DLQ | Audited replay after fix |
| Partial deployment | Error/latency regression | Canary and rollback | Compatible schema/versioning |
| Policy/credential failure | Authorization denials | Fail closed for protected operations | Investigate audit and rotate credentials |

## Retry rules

- Retry transient failures only when idempotent or deduplicated.
- Use bounded exponential backoff with jitter and an overall deadline.
- Do not retry validation, authorization or business-rule failures.
- Avoid layered retries that multiply traffic.
- Preserve an explicit unknown outcome when a downstream side effect may have committed but its response was lost.