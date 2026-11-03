# Failure Modes — Twitter / X-Style Platform

| Failure | Mitigation |
|---|---|
| Outbox publication lag | Monitor oldest event; replay safely |
| Duplicate fanout | Idempotent (userId, postId) timeline key |
| Celebrity hot key | Hybrid fanout/read-time merge |
| Follow edge changes lag | Recheck current relationship/privacy |
| Ranking timeout | Serve chronological fallback |
| Deleted post remains cached | Tombstone + read-time filter + purge |
| Abuse burst | Rate limits, trust tiers, moderation queue |

Keep canonical post writes independent from downstream ranking/search. Derived systems must be rebuildable.
