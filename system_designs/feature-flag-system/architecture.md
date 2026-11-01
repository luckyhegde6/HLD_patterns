# Architecture

```mermaid
flowchart LR
 ADM[Admin UI] --> CP[Control plane]
 CP --> DB[(Versioned flag store)]
 CP --> DIST[Config distribution]
 DIST --> SDK[SDK local cache]
 APP[Application] --> SDK
 SDK --> EVAL[Deterministic evaluator]
 EVAL --> APP
 CP --> AUD[Audit log]
```

```mermaid
sequenceDiagram
 Operator->>Control: Publish flag version
 Control->>Store: Validate and persist
 Control->>Distribution: Broadcast version
 Distribution-->>SDK: Config update
 SDK->>SDK: Evaluate rules locally
 SDK-->>App: Variant
```

SDK evaluation should remain local and deterministic; define bounded stale-config behavior and safe defaults.


## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/feature-flag-system.architecture.json](archify/feature-flag-system.architecture.json).
