# Requirements and Workload

| Input | Value | Derivation |
|---|---:|---|
| IDs/sec average and peak | TBD | Application telemetry |
| Number of workers/regions | TBD | Deployment plan |
| ID length / encoding | TBD | API and storage constraints |
| Ordering requirement | TBD | Consumer semantics |
| Clock drift tolerance | TBD | Infrastructure guarantees |

Functional: generate unique IDs, expose SDK/API, manage worker IDs, report health. Non-functional: bounded latency, no collisions under stated assumptions, resilience to worker restart and clock anomalies.

Clarify whether global ordering is required or only per-worker monotonicity.