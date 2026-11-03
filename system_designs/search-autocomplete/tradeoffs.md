# Trade-offs — Search Autocomplete

- Trie/FST offers compact prefix traversal; search-engine prefix fields simplify integration but may add overhead.
- Precomputed top-K minimizes latency but can be stale; online ranking improves freshness at tail-latency cost.
- Personalization improves relevance but adds privacy, cache fragmentation and timeout paths.
- Longer cache TTL boosts hit ratio but delays policy/popularity changes; index version in cache key eases invalidation.
