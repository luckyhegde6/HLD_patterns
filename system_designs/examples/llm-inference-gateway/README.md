# LLM Inference Gateway — HLD Case Study

Build a shared gateway for multiple applications and model providers. Central concerns are policy, routing, token budgets, latency, fallback, evaluation and cost attribution.

## Architecture

```mermaid
flowchart TB
  APP[Apps / agents] --> GW[LLM gateway API]
  GW --> AUTH[Auth / tenant policy]
  AUTH --> QUOTA[Token + concurrency quota]
  QUOTA --> REDACT[PII / secret redaction]
  REDACT --> ROUTER[Model router]
  ROUTER --> CACHE[(Prompt cache)]
  CACHE -->|Miss| P1[Provider A]
  CACHE -->|Miss| P2[Provider B]
  CACHE -->|Miss| LOCAL[Self-hosted model]
  P1 --> NORMALIZE[Response normalizer]
  P2 --> NORMALIZE
  LOCAL --> NORMALIZE
  NORMALIZE --> SAFETY[Output policy / schema validation]
  SAFETY --> GW
  GW -.-> COST[Usage ledger / cost attribution]
  GW -.-> OBS[Latency / quality / error telemetry]
```

## Request sequence

```mermaid
sequenceDiagram
  autonumber
  participant A as Application
  participant G as Gateway
  participant Q as Quota manager
  participant R as Router
  participant M as Model provider
  participant L as Usage ledger
  A->>G: Completion request + tenant
  G->>Q: Check request/token/concurrency budget
  Q-->>G: Allowed
  G->>G: Validate schema, redact and resolve prompt version
  G->>R: Select model by policy
  R->>M: Request with timeout / retry budget
  M-->>R: Completion + usage
  R-->>G: Normalized response
  G->>L: Record tokens, model, latency and tenant
  G-->>A: Response
```

## Routing policy dimensions

- Task type and quality target.
- Model capability and context window.
- Per-tenant price ceiling and token budget.
- Data residency/privacy and provider allowlist.
- Latency target, concurrency and current provider health.
- Fallback model compatibility and output schema.

## Reliability and cost controls

- Distinguish retryable transport errors from non-retryable content/model errors.
- Apply bounded retries with jitter; avoid retry amplification across app and gateway.
- Stream responses where supported; propagate cancellation.
- Track prompt/completion tokens, cache savings, cost/task and provider throttles.
- Semantic cache must be tenant-scoped and respect prompt/model/data versions.
- Protect provider keys; callers authenticate to the gateway, not to providers.
- Model fallback is not semantically identical; record fallback and evaluate quality drift.

## Evaluation

Use a versioned request set to measure schema validity, task success, refusal correctness, grounding where relevant, latency, cost and safety. Compare provider/model versions with canary traffic before changing default routing.