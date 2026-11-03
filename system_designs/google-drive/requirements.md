# Requirements — Google Drive-Style Storage

## Functional
Upload/download large files, folders, version history, sharing, permissions, sync, search, previews, trash/restore and deletion.

## Invariants
- File bytes are immutable per version; metadata points to committed version.
- Every read/download checks current ACL.
- Upload finalize is idempotent and checksum-verified.
- Sync cursor gaps trigger safe resync; tombstones represent deletes.
- Permission revocation invalidates future access and derived shares.

## APIs
POST /uploads; PUT /uploads/{id}/chunks/{n}; POST /uploads/{id}/complete; GET /files/{id}/download; GET /changes?cursor=; PATCH /files/{id}/permissions.

## Workload assumptions
File count, size distribution, daily upload bytes, sync clients, sharing fanout, version retention and read/write ratio.
