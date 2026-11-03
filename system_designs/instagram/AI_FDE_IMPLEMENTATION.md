# AI / FDE Implementation — Instagram

AI assists caption drafts, alt-text, semantic discovery and moderation triage. Keep visibility, block rules, publication and enforcement in deterministic services.

Prompt: task/schema. Context: permission-filtered media metadata/transcript and policy provenance. Harness: tool scopes, privacy, quotas, audit. Loop: bounded propose/verify. Graph: human review, appeals and reprocessing checkpoints.

```mermaid
flowchart TD
 A[Media / Report] --> C[Authorized Context]
 C --> H[Harness Policy]
 H --> L[Bounded Model]
 L --> V[Validate + evidence]
 V --> D{Impact}
 D -->|suggestion| S[Creator suggestion]
 D -->|enforcement| R[Human review]
 R --> P[Policy service action]
```

Treat captions/comments as untrusted input. Model outputs cannot bypass access control or independently remove accounts/content.
