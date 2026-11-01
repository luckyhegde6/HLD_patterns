# URL Shortener — AI Architect / FDE Extension Guide

This is an optional extension to the repository's existing URL Shortener design. The core system remains a deterministic URL creation and redirect service. AI is not required for shortening or redirecting URLs. AI can add value around abuse operations, support, analytics exploration and operator workflows—but must stay outside the latency-critical redirect path.

## 1. Use cases and boundaries

| Use case | AI fit | Safer architecture |
|---|---|---|
| URL validation and redirect | Poor | Deterministic validation and key-value lookup |
| Abuse / phishing investigation assistance | Possible | Risk signals + classifier or LLM explanation; human decision |
| Natural-language analytics questions | Good | Semantic layer over approved aggregate metrics; read-only tools |
| Support assistant | Good | RAG over authorized documentation and audit events |
| Automatically disable suspicious URLs | High risk | Risk score proposes action; policy + human approval |
| Generate marketing descriptions for links | Good | Draft only; user reviews text |

Do not insert an LLM into `GET /:shortCode`. Keep the redirect path short, deterministic and cache-first.

## 2. Extension architecture

```mermaid
flowchart TB
    OP[Operations / Support User] --> ID[SSO + API Gateway]
    ID --> WF[AI Workflow Orchestrator]
    WF --> RET[ACL-aware Retrieval]
    RET --> DOC[(Runbooks / URL metadata / approved analytics)]
    WF --> MG[Model Gateway]
    MG --> LLM[Approved LLM Provider]
    WF --> POL[Policy + Approval]
    POL -->|Read-only| Q[Analytics Query Service]
    POL -->|Approved action| ACT[URL Admin Service]
    Q --> DB[(Read Replica / Analytics Store)]
    ACT --> CORE[URL Service Admin API]
    CORE --> DBW[(URL Primary Store)]
    WF --> AUD[(Durable Audit / Workflow State)]
    WF --> HUMAN[Human Review Queue]
    HUMAN --> POL
    WF --> OBS[Tracing / Evaluation / Cost Metrics]
```

The analytics assistant reads aggregated and authorized data. The admin service remains the only component capable of changing URL state. The model itself has no direct database or unrestricted shell access.

## 3. Abuse-review sequence

```mermaid
sequenceDiagram
    actor Analyst
    participant UI as Operations UI
    participant WF as AI Workflow
    participant Risk as Risk Signals
    participant Model as Model Gateway
    participant Policy as Policy / Approval
    participant Admin as URL Admin API
    participant Audit as Audit Store

    Analyst->>UI: Investigate short code
    UI->>WF: Authenticated investigation request
    WF->>Risk: Fetch deterministic risk signals
    Risk-->>WF: Signals + evidence references
    WF->>Model: Summarize evidence and explain uncertainty
    Model-->>WF: Recommendation, not an action
    WF->>Policy: Request action authorization
    Policy-->>WF: Approval required
    WF-->>UI: Evidence, confidence caveats, proposed action
    Analyst->>UI: Approve exact disable request
    UI->>Policy: Approval bound to URL, actor and action
    Policy->>Admin: Authorized disable command + idempotency key
    Admin-->>Policy: Result
    Policy->>Audit: Record approval and execution
    Audit-->>WF: Audit reference
    WF-->>UI: Final status and audit reference
```

## 4. Natural-language analytics flow

```mermaid
flowchart TD
    A[Analyst asks a question] --> B[Authenticate and resolve tenant]
    B --> C[Retrieve allowed metric definitions]
    C --> D[LLM maps question to approved metric/query plan]
    D --> E{Query plan passes schema and policy?}
    E -->|No| F[Explain limitation / request clarification]
    E -->|Yes| G[Read-only analytics tool]
    G --> H[Aggregate result + provenance]
    H --> I[Model explains result and caveats]
    I --> J[Display chart with units and time range]
    J --> K[Audit question, plan, tool and evidence]
```

Never execute raw model-generated SQL. Use parameterized, read-only metric APIs with allowlisted dimensions and bounded date ranges.

## 5. FDE deployment plan

1. Shadow mode: classify and summarize only; no side effects.
2. Analyst pilot: show evidence and recommendations, require human decision.
3. Measure usefulness: review time, agreement rate, false positives, false negatives and escalation rate.
4. Controlled tool pilot: enable one narrow admin action behind explicit approvals and idempotency.
5. Production rollout: tenant-aware authorization, durable audit, runbooks, alerting, rollback and clear ownership.

## 6. Evaluation set

Include:
- Known benign links and known abuse examples with verified evidence
- Ambiguous or conflicting signals
- Missing metadata and stale analytics
- Cross-tenant access attempts
- Prompt injection in user-controlled URL metadata or page content
- Tool schema violations and permission denial
- Model/provider timeout and analytics API outage
- Duplicate approval or retried disable request

Track precision/recall for risk classification, analyst acceptance, action reversal rate, time-to-investigation, evidence completeness, p95 latency and cost per completed investigation. Establish thresholds with the actual operations team; do not invent universal thresholds.

## 7. Prompt for an agentic implementation slice

> Implement the read-only natural-language URL analytics assistant described in this document. Inspect the existing URL Shortener service, data model and repository conventions first. Do not modify the redirect path or introduce an LLM dependency into `GET /:shortCode`.
>
> Start by proposing: authorized metric catalog, API contract, tenant scope propagation, query limits, result provenance, prompt-injection boundaries, tests and rollout plan. Do not write code until the design is internally consistent.
>
> Implement one vertical slice: authenticated question → approved metric plan → schema-validated read-only analytics tool → result with provenance → concise explanation. Do not permit arbitrary SQL, shell, database writes or unrestricted URL fetching.
>
> Add tests for allowed query, invalid dimension, oversized date range, tenant isolation, prompt injection, tool timeout and provider failure. The model cannot grant permissions. The trusted server must enforce authorization.
>
> Run all relevant tests, type-check and lint. Report exact commands/results, limitations and rollback instructions. Update diagrams only when the implementation changes the design.

## 8. Interview message

“The core shortener remains deterministic and optimized for redirects. I add AI only to support workflows where language and evidence synthesis matter, such as abuse investigation and analytics exploration. The assistant has read-only capabilities by default. Any state-changing action goes through an authenticated admin API, policy check, human approval and an idempotency key. I would pilot this in shadow mode, measure analyst outcomes and only expand permissions when the evaluation supports it.”
