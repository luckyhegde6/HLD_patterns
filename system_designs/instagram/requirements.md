# Requirements — Instagram-Style Media Network

## Functional
Publish photo/video posts and stories; follow/unfollow; feed; likes/comments; profile; notifications; privacy/block/report; media processing and deletion.

## Non-functional
Fast feed reads, durable media, scalable CDN delivery, eventual feed consistency, privacy correctness and reliable story expiry.

## Invariants
- Publish only after media variants required by product policy are ready.
- Visibility and block rules are checked during hydration.
- Like/comment commands are idempotent.
- Story expiry is enforced at read time, not only by cleanup jobs.

## APIs
POST /media/uploads; POST /posts; GET /feed?cursor=; POST /posts/{id}/likes; GET /stories/{userId}; DELETE /media/{id}.

## Workload assumptions
Media uploads/day, bytes/media, feed reads/user/day, follower skew, story views, CDN hit ratio and retention. Keep derived feed QPS separate from post writes.
