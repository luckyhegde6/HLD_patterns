# Requirements and Workload

Functional: publish, durable store, consume, acknowledge, retry, route, replay and dead-letter.

| Input | Value | Derivation |
|---|---:|---|
| Messages/sec average/peak | TBD | Telemetry |
| Message size | TBD | p50/p95 |
| Retention | TBD | Replay/business needs |
| Consumer groups | TBD | Service inventory |
| Ordering scope | TBD | Domain invariant |

Define delivery guarantee, durability, latency, backlog recovery and tenant isolation.