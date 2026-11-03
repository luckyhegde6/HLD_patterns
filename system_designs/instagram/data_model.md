# Data Model — Instagram-Style Media Network

| Entity | Fields | Notes |
|---|---|---|
| User | id, privacy_mode, status | Canonical account |
| MediaAsset | id, owner_id, original_key, state, checksum | Blob metadata |
| MediaVariant | asset_id, type, dimensions, object_key | Derived output |
| Post | id, owner_id, caption, visibility, created_at | Canonical post |
| Story | id, owner_id, asset_id, expires_at, visibility | TTL lifecycle |
| Follow | follower_id, followee_id, status | Relationship edge |
| Interaction | user_id, post_id, type, created_at | Unique per action |
| FeedItem | user_id, post_id, inserted_at, score | Derived candidate |
| Comment | id, post_id, author_id, body, created_at | Moderated content |

Enforce unique active follow and interaction keys. Feed items are rebuildable; visibility is canonical and checked at read time.
