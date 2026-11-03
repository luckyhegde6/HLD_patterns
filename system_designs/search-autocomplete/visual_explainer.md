# Visual Explainer — Search Autocomplete

## Index build and query path

```mermaid
flowchart TD
 E[Events and Catalog] --> N[Normalize and Aggregate]
 N --> B[Build Prefix Index]
 B --> V[Validate]
 V --> S[Atomic Swap]
 QRY[Query] --> C[Normalize]
 C --> K[Cache]
 K --> IDX[Active Index]
 IDX --> R[Top K Rank and Filter]
 R --> O[Suggestions]
```

## Network and trust boundary

```mermaid
flowchart LR
 CLIENT[Browser or App] --> EDGE[Public API Gateway]
 EDGE --> AUTH[Auth and Rate Limits]
 AUTH --> QUERY[Private Query Service]
 QUERY --> CACHE[(Prefix Cache)]
 CACHE --> INDEX[(Read-only Index)]
 QUERY --> PERSONAL[Optional Personalization]
```

## Scale progressively

```mermaid
flowchart TD
 A[Single service and small index] --> B[Versioned offline index builds]
 B --> C[Hot prefix cache]
 C --> D[Locale or tenant index partitions]
 D --> E[Bounded ranking and regional replicas]
```

Index publication is a control-plane operation. User queries access only the active read-only index. Keep ranking bounded and preserve a deterministic fallback.
