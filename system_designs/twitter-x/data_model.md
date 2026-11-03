# Data Model — Twitter / X-Style Platform

| Entity | Fields | Notes |
|---|---|---|
| User | id, profile, status | Canonical account |
| Post | id, author_id, body_ref, visibility, created_at, version | Canonical post |
| Follow | follower_id, followee_id, created_at, status | Unique active pair |
| Interaction | user_id, post_id, type, created_at | Unique like/repost by type |
| TimelineEntry | user_id, post_id, inserted_at, source, score | Derived projection |
| OutboxEvent | event_id, aggregate_id, type, sequence, payload | Durable event |
| FeedCursor | user_id, last_sort_key | Stable pagination |

Access paths: author posts by time, follower lists, following lists, timeline by user/time, interaction counts and search index. Canonical visibility is checked during hydration; timeline entries are not authorization truth.
