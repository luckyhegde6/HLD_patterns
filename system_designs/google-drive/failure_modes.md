# Failure Modes — Google Drive

- Interrupted upload: resume by part list and checksum.
- Duplicate finalize: idempotency key + session state.
- Concurrent edit: optimistic version conflict and create new version.
- Permission revoked after URL issued: short TTL, token scope and revocation checks.
- Malware scan failure: quarantine; don't publish downloadable status.
- Sync cursor expired: return reset/resync instruction with snapshot boundary.
- Delete propagation lag: tombstone + purge indexes/caches; retain recoverable trash policy.
- Object missing/corrupt: checksum verification, replica repair and version restore.
