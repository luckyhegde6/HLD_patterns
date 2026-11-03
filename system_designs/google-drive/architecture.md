# Architecture — Google Drive-Style Storage

Drive API handles identity, metadata and ACL; upload service issues resumable sessions; object storage holds immutable chunks/versions; finalize commits manifest + FileVersion; workers scan, preview and index; change feed drives sync; download API checks ACL and issues short-lived ranged URLs.

```mermaid
flowchart LR
 C[Client] --> API[Drive API]
 API --> DB[(Metadata + ACL)]
 API --> UP[Upload Session]
 UP --> OBJ[(Object Storage)]
 OBJ --> Q[Finalize Event]
 Q --> W[Scan / Preview / Index]
 W --> DB
 C --> SY[Sync Cursor API]
 SY --> DB
 C --> DL[Download API]
 DL --> DB
 DL --> CDN[Signed Ranged Read]
```

Use metadata sharding by drive/file ID; keep large bytes out of relational rows. Change log/outbox ensures sync and derived indexes can replay. Version blobs are immutable; ACL remains authoritative.
