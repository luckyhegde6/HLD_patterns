# Requirements and Workload

Functional: evaluate request identity/key, enforce quota, return remaining budget/retry guidance, support policy updates and overrides.

| Input | Value | Derivation |
|---|---:|---|
| Peak RPS | TBD | Gateway telemetry |
| Key cardinality | TBD | Tenant/user inventory |
| Window/burst | TBD | Product policy |
| Accuracy tolerance | TBD | Abuse/cost risk |
| Latency overhead | TBD | SLO budget |

Clarify fairness, burst semantics, regional consistency and outage policy.