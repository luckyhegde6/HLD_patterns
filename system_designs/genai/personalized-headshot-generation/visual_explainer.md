# Visual Explainer — Personalized Headshot Generation

## Mental model
A consent-gated workflow adapts a base model to the user's photos, generates requested styles in a private session, then supports verified deletion of all user-specific artifacts.

## Architecture
```mermaid
flowchart TB
 U[User + consent] --> API[Session API]
 API --> UP[Secure upload + validation]
 UP --> S[(Private photo store)]
 S --> TQ[Adaptation queue]
 TQ --> T[User-scoped adapter training]
 T --> REG[(Private adapter registry)]
 U --> GQ[Generation request]
 REG --> GQ
 GQ --> M[Base model + adapter]
 M --> V[Identity / quality / safety checks]
 V --> OUT[(Private result store)]
 OUT --> U
 U --> DEL[Delete session]
 DEL --> PURGE[Purge photos, adapter, outputs, cache]
```

## Lifecycle
```mermaid
sequenceDiagram
 participant U as User
 participant A as API
 participant T as Trainer
 participant G as Generator
 participant D as Deletion service
 U->>A: Photos + consent
 A->>T: Validate and adapt in user scope
 T-->>A: Adapter ready
 A->>G: Prompt + scoped adapter
 G-->>A: Candidate headshots
 A-->>U: Private gallery
 U->>D: Delete session
 D->>D: Purge all derived artifacts
 D-->>U: Deletion status / verified completion
```

## Boundaries to call out
- Consent and ownership are checked before processing.
- User adapters are isolated and never shared across tenants.
- Source photos, checkpoints, adapters, outputs and caches have explicit retention.
- Deletion is an orchestrated, auditable workflow—not a single database delete.

## Interview drawing checklist
Show secure upload, consent record, adaptation queue, per-user adapter registry, generation queue, private output store, deletion orchestrator, purge reconciliation and GPU cost/quality metrics.

## References
- [ByteByteGo GenAI system design overview](https://bytebytego.com/courses/genai-system-design-interview/introduction-and-overview)
- [DreamBooth](https://arxiv.org/abs/2208.12242)
- [LoRA](https://arxiv.org/abs/2106.09685)

Original explainer; only use consenting users' images.