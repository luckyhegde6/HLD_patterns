# Trade-offs

| Choice | Trade-off |
|---|---|
| One queue vs per-channel queues | Simpler ops vs isolation and channel-specific scaling |
| Immediate vs scheduled delivery | Lower latency vs quiet hours/batching |
| Provider failover | Higher delivery resilience vs duplicate risk and cost |
| At-least-once vs dedupe | Reliability vs state complexity |
| Template service vs embedded templates | Central governance vs runtime dependency |

Re-check consent at execution time and distinguish provider acceptance from actual delivery.