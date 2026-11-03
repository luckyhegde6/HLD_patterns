# Data Model — YouTube-Style Video Platform

| Entity | Fields | Notes |
|---|---|---|
| Video | id, owner_id, title, visibility, state, created_at, version | Canonical metadata |
| UploadSession | id, video_id, part_count, checksum, expires_at, status | Resumable upload lifecycle |
| UploadPart | session_id, part_no, etag, size, checksum | Unique(session_id, part_no) |
| Rendition | video_id, codec, resolution, bitrate, object_key, status | Derived media output |
| Manifest | video_id, version, object_key, ready_at | Published only after required outputs |
| PlaybackSession | id, viewer_id, video_id, progress_ms, expires_at | Resume and session control |
| MediaEvent | event_id, video_id, type, occurred_at | Analytics/outbox; dedupe by event_id |

## Access patterns
Fetch video by ID; list creator uploads by owner/time; fetch ready renditions by video/version; resume playback by viewer/video; aggregate engagement by time bucket.

## Consistency
Video state and manifest publication are transactional metadata changes. Analytics counters and recommendation features are derived and eventually consistent. Keep object storage keys immutable/versioned.
