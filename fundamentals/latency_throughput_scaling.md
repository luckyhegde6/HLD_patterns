# Latency, Throughput and Scaling

Latency is how long one operation takes. Throughput is how many operations finish per unit time. Capacity is the sustainable workload a system can handle while meeting its SLOs.

## End-to-end latency budget

```mermaid
flowchart LR
  C[Client / DNS] --> N[Network + TLS]
  N --> E[Edge / WAF]
  E --> L[Load balancer]
  L --> A[Application]
  A --> R[Cache]
  R -->|miss| D[(Database)]
  A --> X[External dependency]
  A --> RESP[Response]
```

For serial work, latency adds. For parallel fan-out, completion often waits for the slowest branch. Queue wait can dominate service time near saturation.

## Metrics

| Metric | Definition | Why it matters |
|---|---|---|
| p50 | Median latency | Typical experience |
| p95 / p99 | Tail percentiles | Long-tail delays |
| Throughput | Completed operations / second | Useful work |
| Offered load | Incoming operations / second | Demand, including rejects |
| Goodput | Successful operations / second | Successful work |
| Concurrency | Operations in progress | Resource occupancy |
| Queue wait | Time waiting for capacity | Early overload signal |
| Utilization | Busy capacity / total capacity | Saturation risk |

## Little's Law

For a stable system:

`L = λ × W`

L is average work in system; λ is throughput; W is average time in system. Example: 200 requests/s × 0.25s implies about 50 concurrent requests. Little's Law describes a stable average, not capacity or tail latency.

## Why latency collapses near saturation

```mermaid
flowchart TD
  A[Arrival rate rises] --> B[Service capacity approaches full]
  B --> C[Queue wait increases]
  C --> D[Caller deadlines expire]
  D --> E[Retries add arrivals]
  E --> B
```

The system may remain busy doing work for callers that already abandoned it. Use timeouts, retry budgets, backoff/jitter, admission control and bulkheads.

## Throughput vs latency

```mermaid
xychart-beta
  title "Illustrative throughput and tail-latency trend"
  x-axis ["Low", "Moderate", "High", "Near saturation"]
  y-axis "Relative level" 0 --> 100
  line [10, 35, 70, 88]
  line [8, 14, 42, 96]
```

Conceptual illustration only: one curve represents throughput and another tail latency. Real curves must come from measurement.

## Scaling choices

| Tactic | Best when | Trade-off |
|---|---|---|
| Optimize code/query | Inefficient work | Profile first |
| Vertical scale | One node resource bound | Ceiling and blast radius |
| Horizontal scale | Work can be distributed | Coordination and state |
| Cache | Repeated reads with acceptable freshness | Invalidation and memory |
| Queue | Slow/non-interactive work | Eventual completion/backlog |
| Partition/shard | Data/write throughput constrained | Rebalancing/cross-shard complexity |
| CDN | Public/cacheable content | Invalidation/geography |

## Practical performance loop

1. Define user-facing SLO and percentile.
2. Trace across service boundaries.
3. Load-test representative and peak/burst shapes.
4. Find first saturated resource.
5. Change one variable and rerun.
6. Test failure/overload, not only steady throughput.
7. Report hardware, topology, data size, concurrency and duration.

## References

- [ByteByteGo — Scale from Zero to Millions of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [Google SRE — Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Little's Law](https://en.wikipedia.org/wiki/Little%27s_law)
