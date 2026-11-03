# Architecture — Twitter / X-Style Platform

## Components
Post service owns canonical posts; relationship service owns follow edges; outbox publishes committed mutations; fanout workers populate timeline projections; feed service fetches candidates and hydrates canonical visibility; ranking service is bounded with fallback; search/trends are derived pipelines.

## Feed sequence
```mermaid
sequenceDiagram
 participant C as Client
 participant F as Feed API
 participant T as Timeline Store
 participant P as Post Store
 participant R as Ranker
 C->>F: timeline(cursor)
 F->>T: candidate post IDs
 F->>P: hydrate + privacy/deletion check
 F->>R: rank bounded candidates
 R-->>F: ordered IDs (or fallback)
 F-->>C: page + cursor
```

## Scaling
Partition posts by postId/authorId; relationship edges by follower/followee access patterns; timeline by userId. Hybrid fanout avoids exploding writes for celebrity accounts. Use cursor pagination, cache hot profiles/posts and isolate ranking latency.

## Operations
Track post-write latency, fanout lag, feed p99, cache hit ratio, stale/deleted content leakage, ranking timeout and hot-key skew. Rebuild timeline projections from canonical posts and relationship snapshots.
