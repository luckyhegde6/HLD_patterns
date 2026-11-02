# Failure Modes — Gmail Smart Compose

## Failure matrix
| Failure | Detection | Mitigation / recovery | User-visible behavior |
|---|---|---|---|
| Model/provider timeout | Deadline and timeout metrics | Bounded retry, alternate provider where compatible, circuit breaker | Retry/status or clear temporary error |
| Queue overload | Queue age, backlog, saturation | Admission control, quotas, autoscaling, priority classes | Accepted async job or capacity response |
| Duplicate request | Idempotency conflict | Unique key, dedupe, execution ledger | Return original job/result |
| Invalid or oversized input | Validation/decoder errors | Schema, size and format limits; sandbox parsing | Explain supported input |
| Low-quality / ungrounded output | Evaluation/validator signal | Retry with bounded budget, retrieve more evidence, abstain | Label uncertainty or ask clarification |
| Unsafe or unauthorized request | Policy decision/audit | Deny, redact, require approval; least-privilege tools | Safe refusal or approval prompt |
| Data/cache leakage | ACL tests, audit anomalies | Tenant-scoped keys, server-side authorization, purge | Fail closed; incident process |
| Model/version regression | Canary metrics and eval gate | Rollback to pinned version | Degraded mode if necessary |
| Partial persistence / worker crash | Job state reconciliation | Durable state machine, retry from checkpoint | Resume/status preserved |
| Deletion incomplete | Purge reconciliation | Tombstones, retryable deletion workflow, audit | Show deletion status until verified |

## Resilience patterns
- Dead-letter queue with redrive tooling and bounded retries.
- Circuit breakers and bulkheads by provider/model class.
- Deadline propagation and cancellation across API, queue and inference.
- Idempotent writes and reconciliation jobs.
- Fail closed on authorization; degrade only when quality and policy remain valid.

## Product-specific failure cases
Add domain-specific cases such as hallucinated translation, unsafe image output, stale retrieval chunks, identity drift or temporal video artifacts as applicable. Define detection and acceptance criteria in the evaluation plan.