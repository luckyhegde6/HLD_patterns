# Failure Modes — Search Autocomplete

- Index build fails: keep previous valid version.
- Index lag: expose version/freshness and schedule rebuild.
- Hot prefix/cache stampede: request coalescing, stale-while-revalidate and quotas.
- Malformed Unicode/input: normalization and length bounds.
- Scraping/abuse: rate limits, anomaly detection and response caps.
- Ranker timeout: deterministic popularity fallback.
- Policy change: canonical status filter and cache invalidation.
