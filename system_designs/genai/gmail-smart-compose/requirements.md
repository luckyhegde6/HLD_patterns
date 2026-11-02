# Requirements — Gmail Smart Compose

## Product statement
Low-latency email continuation; contextual completion with privacy-sensitive user text.

## Functional requirements
1. Accept validated user requests with explicit options and supported formats.
2. Produce a result or a durable asynchronous job/status for expensive work.
3. Support authorized context/data access where required by the product.
4. Return output metadata including request/job ID and model/version provenance.
5. Capture user feedback through a privacy-controlled path.
6. Support cancellation, retries, and deletion/retention according to policy.

## Non-functional requirements
| Dimension | Requirement / target to define |
|---|---|
| Availability | Define API and async completion SLO separately |
| Latency | Set interactive p95 and async completion targets by workload tier |
| Quality | Golden-set and human-evaluation floor; slice by use case/language/content |
| Scalability | Horizontal API/worker scaling; queue protects inference capacity |
| Security | AuthN/AuthZ, tenant isolation, encryption, least privilege |
| Privacy | Data minimization, retention, deletion, redacted telemetry |
| Reliability | Idempotency, bounded retries, durable state, recovery |
| Cost | Budget per successful output and per tenant/request |
| Observability | Traces, metrics, audit and model-quality monitoring |

## Out of scope for MVP
- Unbounded autonomous actions or unreviewed consequential writes.
- Training a foundation model from scratch.
- Unlimited payloads, duration, resolution or context windows.
- Guarantees of perfect model output; define abstention/review behavior.

## Assumptions to validate
- Traffic shape, region and user mix.
- Supported model/provider and license constraints.
- Data rights, retention and consent model.
- Quality benchmark and acceptance thresholds.
- Interactive versus asynchronous product boundary.