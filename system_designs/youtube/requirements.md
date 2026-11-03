# Requirements — YouTube-Style Video Platform

## Functional
- Creator uploads large videos with resumable parts and checksum verification.
- Process media into codec/resolution renditions and publish a manifest.
- Viewers browse/search, check visibility and stream adaptive segments.
- Support playback progress, likes/comments, creator analytics and takedown.

## Non-functional
- Global low-latency playback; durable source media; independent scaling of ingest and playback.
- Explicit p95/p99 targets, availability, retention, RPO/RTO and cost budgets.
- Privacy enforcement for private/unlisted content and deletion propagation.

## Invariants
- A video is playable only when metadata is READY and required renditions exist.
- Upload finalize and processing events are idempotent.
- Every playback request enforces visibility/entitlement before token issuance.

## Out of scope
Live streaming, full recommendation ML and DRM implementation details unless interviewer expands scope.

## Workload assumptions to quantify
Upload size distribution, daily uploads, average watch time, peak concurrent viewers, segment size, geographic distribution and retention. Label assumptions and units; do not invent fixed capacity numbers.

## APIs
- POST /videos/upload-sessions
- PUT /upload-sessions/{id}/parts/{partNo}
- POST /upload-sessions/{id}/complete (idempotency key)
- GET /videos/{id}/manifest
- POST /playback-sessions
- PATCH /playback-sessions/{id}/progress

## SLOs
Define upload completion durability, processing freshness, playback startup latency, rebuffer ratio and metadata API availability before selecting infrastructure.
