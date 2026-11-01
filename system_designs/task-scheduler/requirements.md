# Requirements and Workload

Functional: create/update/cancel jobs, schedule once/recurring, claim due work, execute, retry, inspect status and dead-letter.

| Input | Value | Derivation |
|---|---:|---|
| Jobs created/sec | TBD | Product telemetry |
| Due jobs/sec peak | TBD | Schedule distribution |
| Delay horizon | TBD | Product needs |
| Retry policy | TBD | Failure classes |
| Worker concurrency | TBD | Task duration/capacity |

Clarify precision, misfires, fairness, tenant quotas and execution guarantees.
