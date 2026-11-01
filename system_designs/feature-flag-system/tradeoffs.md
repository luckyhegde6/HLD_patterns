# Trade-offs

| Choice | Trade-off |
|---|---|
| Local vs remote evaluation | Low latency/offline vs centralized freshness |
| Polling vs streaming | Simplicity vs faster propagation |
| Boolean vs multivariate flags | Simpler model vs richer experiments |
| Stable hash bucketing vs random | Consistent cohort vs per-evaluation randomness |
| Flags vs general config service | Feature rollout semantics vs broader config scope |

Keep evaluation deterministic and stable for a subject/flag key.
