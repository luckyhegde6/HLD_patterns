# Trade-offs — Twitter / X-Style Platform

- Fanout-on-write gives fast reads but amplifies writes; fanout-on-read handles celebrities but increases feed latency.
- Hybrid threshold depends on follower skew and activity, not a fixed universal number.
- Precomputed ranking lowers p99 but can be stale; online ranking improves freshness at compute/latency cost.
- Timeline caches accelerate reads but require deletion/privacy filtering and rebuild strategy.
- Approximate counters scale better than synchronous exact counts; reconcile when business requirements demand accuracy.
