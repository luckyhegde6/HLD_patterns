# Interview Walkthrough — YouTube-Style Video Platform

1. Clarify upload formats/size, public/private content, playback geography, concurrency and whether live streaming is in scope.
2. Quantify upload bytes/day, stored bytes, peak segment QPS and egress using explicit assumptions.
3. Define upload-session, finalize, manifest and playback APIs; state READY invariant.
4. Draw ingest/transcode pipeline and playback/CDN path.
5. Deep dive resumability, worker retries, adaptive bitrate, CDN cache and access control.
6. Explore hot videos, regional outage, partial transcodes, deletion and analytics lag.
7. Summarize cost drivers: encoding, storage, CDN egress and recommendation compute.

Senior signal: distinguish metadata control plane from media data plane, explain idempotency and articulate how readiness prevents broken playback.
