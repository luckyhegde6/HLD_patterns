# AI / FDE Implementation — Circuit Breaker

AI can summarize incident telemetry and propose threshold changes. It must not autonomously disable protection or mutate production policy.

```mermaid
flowchart LR
 M[Metrics and traces] --> A[Incident assistant]
 A --> P[Proposed tuning + rationale]
 P --> T[Replay / simulation tests]
 T --> H[Human approval]
 H --> C[Canary config]
 C --> O[Health monitor]
 O -->|Regression| R[Rollback]
```

Use typed read-only observability tools; require approval, bounded rollout and rollback for writes. Evaluate false opens, missed failures, rejected calls and recovery time.
