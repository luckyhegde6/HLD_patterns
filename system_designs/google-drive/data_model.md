# Data Model — Google Drive

| Entity | Fields | Notes |
|---|---|---|
| Drive | id, owner_id, quota | Namespace |
| Folder | id, drive_id, parent_id, name, version | Tree metadata |
| File | id, drive_id, parent_id, name, current_version_id, version | Canonical metadata |
| FileVersion | id, file_id, manifest_key, checksum, size, created_at | Immutable |
| UploadSession | id, file_id, parts_expected, expires_at, status | Resumable |
| Chunk | session_id, part_no, object_key, checksum | Unique part |
| Permission | resource_id, principal_id, role, inherited_from | ACL |
| ShareLink | id, resource_id, scope, expiry, revoked_at | Revocable |
| SyncCursor | client_id, sequence | Change feed checkpoint |
| ChangeEvent | sequence, resource_id, type, timestamp | Tombstones included |
