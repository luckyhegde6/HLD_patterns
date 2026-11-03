# Trade-offs — YouTube-Style Video Platform

- **Transcode ladder:** more codecs/resolutions improve device coverage and quality but increase encode/storage cost.
- **CDN TTL:** longer TTL raises hit ratio but complicates privacy changes and takedowns; use versioned immutable segments and purge policy.
- **Processing:** synchronous is simpler for tiny files; asynchronous workers are required for large, variable-duration media.
- **Recommendations:** precomputed candidates reduce request latency; online ranking improves freshness at added compute and tail latency.
- **Analytics:** exact synchronous counters are costly; event aggregation is scalable but delayed and approximate.
- **Multi-CDN:** improves resilience and reach but adds routing, observability and contract complexity.

Choose based on workload, measured SLOs and operational maturity—not product-name assumptions.
