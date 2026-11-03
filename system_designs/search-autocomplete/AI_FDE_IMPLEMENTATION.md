# AI / FDE Implementation — Search Autocomplete

AI can help offline synonym expansion, semantic candidate enrichment and query intent classification. Keep the online prefix lookup deterministic and latency-bounded.

Prompt produces typed candidate/intent output; Context uses privacy-safe aggregates and canonical catalog; Harness controls model/tool budgets; Loop is bounded; Graph manages offline evaluation and index rollout.

```mermaid
flowchart LR
 E[Offline query aggregates] --> P[Prompt + task]
 P --> C[Context / catalog]
 C --> H[Harness]
 H --> M[Model enrichment]
 M --> V[Policy + quality validation]
 V --> I[Offline index build]
 I --> S[Canary / atomic swap]
```

Never place raw sensitive queries in model context without policy/consent. Validate candidate IDs and content policy before indexing.
