# Visual Explainer — YouTube-Style Video Platform

## Ingest vs playback
```mermaid
flowchart LR
 U[Creator] --> UP[Resumable Upload API]
 UP --> OBJ[(Original Object)]
 OBJ --> EV[Upload Event]
 EV --> Q[Queue]
 Q --> W[Transcode Workers]
 W --> R[(Renditions + Manifest)]
 R --> DB[(Video Metadata)]
 V[Viewer] --> P[Playback API]
 P --> AUTH[Visibility / Entitlement]
 AUTH --> CDN[CDN]
 CDN --> R
```

## State transition
```mermaid
stateDiagram-v2
 [*] --> UPLOADING
 UPLOADING --> PROCESSING: checksum verified
 PROCESSING --> READY: required outputs complete
 PROCESSING --> FAILED: terminal error
 FAILED --> PROCESSING: retry
 READY --> DELETED: deletion request
```

Playback never points to an incomplete manifest. CDN serves immutable segments; control-plane metadata governs authorization and publication.
