# Requirements — Search Autocomplete

## Functional
Return prefix suggestions; normalize Unicode/case/locale; rank by popularity, freshness and optional personalization; support typo tolerance, filtering and index updates.

## Non-functional
Very low p95/p99 latency, high read availability, controlled index freshness, privacy-safe query analytics and abuse resistance.

## Invariants
- Suggestions pass policy/status filtering.
- Index version is atomically published.
- Query path has bounded candidate count and response size.
- Personalization is opt-in and access-controlled.

## APIs
GET /autocomplete?q=&locale=&limit=; POST /suggestions (admin); POST /index/rebuild; GET /index/status.

## Workload assumptions
QPS, prefix length distribution, locale count, candidate cardinality, index size, freshness target and cache hit ratio.
