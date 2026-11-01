# Trade-offs

| Algorithm | Strength | Limitation |
|---|---|---|
| Fixed window | Simple, low state | Boundary bursts |
| Sliding log | Accurate | High memory/write cost |
| Sliding counter | Approximate smoothness | Estimation error |
| Token bucket | Burst + average rate | Token state per key |
| Leaky bucket | Smooth output | Less burst flexibility |

Distributed exactness costs coordination; define acceptable approximation per use case.