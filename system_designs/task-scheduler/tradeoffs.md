# Trade-offs

| Choice | Trade-off |
|---|---|
| Polling vs timer wheel | Simpler durable scan vs efficient high-cardinality timing |
| DB claim vs queue-first | Strong schedule state vs throughput/duplicate complexity |
| At-least-once vs exactly-once | Practical reliability vs end-to-end side-effect limitation |
| Fixed vs adaptive retry | Predictable policy vs load-sensitive recovery |

Design for at-least-once execution and idempotent effects.
