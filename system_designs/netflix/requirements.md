# Requirements — Streaming Platform

## Functional
Catalog and search; profiles; subscription/entitlement; playback session; adaptive bitrate; DRM/license; resume progress; recommendations; device concurrency.

## Invariants
- Playback requires current entitlement and supported content region/window.
- Manifest/license tokens are short-lived and scoped to profile/device/title.
- Progress updates are monotonic or versioned.
- Catalog publication follows successful packaging and validation.

## APIs
GET /catalog; POST /playback-sessions; GET /titles/{id}/manifest; POST /licenses; PATCH /playback-sessions/{id}/progress.

## Workload assumptions
Concurrent streams, average bitrate, session startup rate, segment duration/size, region distribution, catalog size and content update frequency.
