# Trade-offs — Gmail Smart Compose

## Decision log
| Decision | Default choice | Alternative | Trade-off / revisit trigger |
|---|---|---|---|
| Sync vs async | Sync for bounded low-latency path; async for expensive work | Fully synchronous | Async adds state/queue complexity but protects request deadlines; revisit for tiny workloads |
| Model strategy | Adapter + versioned routing | Single hard-coded provider | Abstraction improves portability but adds testing/operational cost; keep adapter surface narrow |
| Cache | Scoped cache only where privacy-safe and repeatable | No cache / shared cache | Saves compute vs stale results and leakage risk; disable for sensitive payloads by default |
| Data store | Relational metadata + object storage for large artifacts | Blob-in-DB / NoSQL-only | Strong lifecycle/query support vs extra components |
| Retrieval/context | Explicit authorized retrieval | Large prompt stuffing | Better freshness/ACL and token efficiency vs retrieval complexity |
| Quality vs latency | Model tiers, bounded decoding/steps | Always largest/highest-quality model | Tiering controls latency/cost but requires routing and slice evaluation |
| Retry policy | Bounded, idempotent retry | At-least-once blind retries | Resilience vs duplicate spend and side effects |
| Personalization | Opt-in, scoped and deletable | Global personalization | Better relevance vs privacy, leakage and lifecycle burden |
| Safety | Independent policy gates before/after model | Prompt-only instruction | More robust control vs added latency and false positives |

## Explicit choices for this design
Document the product-specific decisions here: model family, online/offline boundary, caching, data retention, consistency, evaluation, rollout and fallback. For each, state the reason and the condition that would make you revisit it.

## MVP → scale evolution
MVP: one region, one model adapter, modest queue, relational metadata, basic dashboards.
Scale: regional routing, model pools, workload tiers, partitioning, autoscaling, stronger evaluation gates and dedicated privacy/quality operations.