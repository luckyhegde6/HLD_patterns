# Requirements and Workload — Distributed Cache

## Functional requirements

- Support the primary workflow described in the system overview.
- Validate requests and enforce domain invariants at the service boundary.
- Persist authoritative state and expose status/results.
- Handle duplicates and partial failures safely.
- Provide operational visibility and controlled recovery.

## Non-functional requirements

Agree targets for availability, durability, p50/p95/p99 latency, throughput, concurrency, burst tolerance, RPO/RTO, security, privacy, audit and cost.

## Capacity worksheet

Replace TBD values with production telemetry or explicit interview assumptions.

| Input | Value | Derivation |
|---|---:|---|
| Average requests/sec | TBD | Daily requests / 86,400 |
| Peak-to-average factor | TBD | Peak telemetry / average |
| Payload size | TBD | p50/p95 request and response |
| Retention | TBD | Product, audit and legal policy |
| Annual growth | TBD | Historical trend / forecast |
| Availability target | TBD | Business criticality |
| Latency target | TBD | User journey budget |

## Open questions

- Which invariants must never be violated?
- Which operations must be synchronous?
- What can be eventually consistent?
- What is the behavior after an ambiguous timeout?
- What is the acceptable degradation mode?