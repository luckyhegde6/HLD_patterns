# AI / FDE Implementation — Netflix

AI assists natural-language catalog search, synopsis generation, discovery explanations and support triage. Entitlement, region availability, DRM and playback control remain deterministic.

Prompt defines output contract; Context retrieves authorized catalog/profile signals with consent; Harness scopes tools and budget; Loop bounds ranking/explanation; Graph handles editorial review and experiments.

```mermaid
flowchart TD
 Q[User discovery query] --> P[Prompt]
 P --> C[Authorized catalog/profile context]
 C --> H[Harness policy]
 H --> L[Bounded retrieval/rank loop]
 L --> V[Validate IDs + availability]
 V --> R[Results / explanation]
```

Model output must reference canonical title IDs and pass region/entitlement filters before presentation.
