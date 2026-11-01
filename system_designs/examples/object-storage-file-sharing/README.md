# Object Storage and File Sharing — HLD Case Study

Build a service for uploading, downloading, sharing and deleting large files. Separate metadata/permissions from file bytes.

## Core architecture

```mermaid
flowchart TB
  U[Client] --> API[File API]
  API --> AUTH[Identity + ACL]
  API --> META[(Metadata database)]
  API --> SIGN[Upload / download URL signer]
  SIGN --> OBJ[(Object storage)]
  OBJ --> EVT[Object-created event]
  EVT --> W[Scan / thumbnail / metadata workers]
  W --> META
  W --> CDN[CDN / preview delivery]
  API --> SHARE[Share-link service]
  SHARE --> META
  API -.-> OBS[Audit / metrics]
```

## Upload sequence

```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant API as File API
  participant DB as Metadata DB
  participant OBJ as Object store
  participant W as Processing worker
  C->>API: Request upload (name, size, checksum)
  API->>API: Authenticate, authorize and check quota
  API->>DB: Create PENDING metadata
  API-->>C: Short-lived signed multipart URL
  C->>OBJ: Upload parts directly
  C->>API: Complete upload + checksum
  API->>OBJ: Verify object / checksum
  API->>DB: Mark uploaded
  OBJ->>W: Object-created event
  W->>W: Scan, extract metadata and thumbnail
  W->>DB: Store processing status / derivatives
  API-->>C: Upload status
```

## Data model

- File(id, owner_id, object_key, size, checksum, content_type, state, created_at, deleted_at)
- ShareLink(id, file_id, token_hash, expires_at, permissions)
- Derivative(id, file_id, kind, object_key, version)

## Important design choices

- Clients upload directly to object storage via short-lived signed URLs; API does not proxy large bytes.
- Use multipart upload, checksum validation, maximum object size and abandoned-upload cleanup.
- Metadata DB is source of truth for ownership and authorization.
- Never expose raw object keys as authorization. Signed URLs must be short-lived and scoped.
- Processing workers are async, idempotent and safe to retry.
- Deletion must consider originals, derivatives, CDN caches, share links, retention and legal holds.
- Use malware scanning and content-type validation before public sharing.

## Failure modes

| Failure | Handling |
|---|---|
| Incomplete multipart upload | Lifecycle cleanup |
| Duplicate object event | Idempotent processing key |
| Processing failure | Retry + DLQ; preserve original upload |
| Leaked share URL | Expiry, revocation, token hash and audit |
| Metadata/object mismatch | Reconciliation job |