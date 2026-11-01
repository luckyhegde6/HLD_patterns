# Patterns, Trade-offs and Alternatives — API Gateway

| Decision | Option A | Option B | Choose based on |
|---|---|---|---|
| Synchronous vs asynchronous | Immediate result, simpler flow | Decoupling and burst absorption | User latency and delivery guarantees |
| Strong vs eventual consistency | Immediate invariant visibility | Better availability/scale for derived reads | Correctness and staleness tolerance |
| Shared vs partitioned storage | Simpler operations | Isolation and horizontal scale | Tenant size, hot keys, cost |
| Cache vs direct reads | Lower latency and origin load | Simpler freshness | Read volume and invalidation cost |
| Build vs managed service | Control and customization | Faster delivery and lower operations | Differentiation, compliance, total cost |

## Pattern-specific considerations

Routing, authn/authz, quotas, TLS, transformations, aggregation, versioning

## Decision record template

For each major decision record context, options, chosen option, rejected alternatives, consequences, reversal trigger and owner.