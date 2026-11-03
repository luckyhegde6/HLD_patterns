# Data Model — Search Autocomplete

| Entity | Fields | Notes |
|---|---|---|
| Suggestion | id, text, normalized, locale, category, status | Canonical candidate |
| PrefixEntry | index_version, prefix, candidate_ids | Derived index |
| QueryAggregate | normalized_prefix, locale, count, window | Privacy-safe aggregation |
| RankingFeature | suggestion_id, popularity, freshness, quality | Derived |
| CacheEntry | prefix, locale, top_k, index_version, expires_at | Bounded TTL |
| IndexManifest | version, created_at, checksum, status | Atomic publish metadata |

Access paths: prefix→top candidates; suggestion ID→canonical policy; locale/version→index; aggregated popularity by time window.
