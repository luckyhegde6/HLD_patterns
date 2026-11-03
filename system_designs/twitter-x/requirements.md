# Requirements — Twitter / X-Style Platform

## Functional
Create/edit/delete posts, follow/unfollow, replies, likes/reposts, home timeline, search/trends, media and notifications.

## Non-functional
Low-latency feed reads, durable post writes, scalable fanout, privacy enforcement, abuse prevention and eventual timeline consistency.

## Invariants
- Post creation is idempotent per client request key.
- A user has at most one active follow edge per target.
- Deleted/private posts are filtered at read time even if timeline projections lag.
- Timeline entries are derived and rebuildable.

## APIs
POST /posts; DELETE /posts/{id}; POST /users/{id}/follow; GET /timeline?cursor=; POST /posts/{id}/likes; GET /search?q=.

## Workload assumptions
DAU, posts/user/day, follower distribution, feed reads/user/day, media bytes, celebrity fraction and freshness target. Distinguish post QPS from fanout delivery QPS.
