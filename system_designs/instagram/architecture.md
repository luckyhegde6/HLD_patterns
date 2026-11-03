# Architecture — Instagram-Style Media Network

Upload service creates resumable sessions; object storage holds originals/variants; media workers produce thumbnails and encodings; metadata service owns publication/visibility; outbox drives feed and notification projections; feed service combines candidates, canonical visibility checks and ranking; CDN serves immutable media.

## Upload sequence
```mermaid
sequenceDiagram
 participant C as Client
 participant U as Upload API
 participant O as Object Storage
 participant Q as Queue
 participant W as Media Worker
 participant D as Metadata DB
 C->>U: create upload session
 U-->>C: signed part URLs
 C->>O: upload parts
 C->>U: finalize
 U->>Q: processing event
 Q->>W: job
 W->>O: write variants
 W->>D: publish READY metadata
 D-->>C: post becomes visible
```

Scale media delivery with CDN; scale feed fanout by follower skew; partition relationship/feed data by user. Keep canonical ACL checks on feed hydration and direct media token issuance.

Observe upload completion, processing age, feed p99, CDN hit ratio, story expiry lag, privacy-filter rejects and fanout lag.
