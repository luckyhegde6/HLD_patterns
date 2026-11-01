# AI Architect / Forward Deployed Engineer (FDE) Playbook

This playbook adds an applied AI and customer-workflow lens to HLD interviews and project delivery. An AI Architect designs the reusable platform and its quality/security boundaries. An FDE works close to users to discover a real workflow, integrate with existing systems, deliver a reliable solution and measure adoption. Many roles combine both.

## 1. Start from the workflow, not the model

A strong discovery conversation establishes:
- User persona and job-to-be-done
- Current workflow, tools, handoffs and pain points
- Frequency, volume, cycle time and error/rework rate
- Source systems and data permissions
- What can be automated, assisted or must remain human-owned
- Cost of a false positive, false negative or delayed response
- Success metric and baseline

Deliverable: a one-page workflow map and a measurable problem statement. “Use an LLM to automate support” is not a requirement.

## 2. AI solution fit decision

```mermaid
flowchart TD
    A[Workflow problem] --> B{Deterministic rules sufficient?}
    B -->|Yes| C[Rules / conventional service]
    B -->|No| D{Needs language or unstructured context?}
    D -->|No| E[Search, analytics or classical ML]
    D -->|Yes| F{Can retrieval ground the answer?}
    F -->|Yes| G[RAG + deterministic workflow]
    F -->|No| H{Needs bounded tool use?}
    H -->|Yes| I[Agent with governed tools]
    H -->|No| J[Model-assisted interface]
    G --> K[Evaluate quality, risk, latency and cost]
    I --> K
    J --> K
    C --> K
    E --> K
```

Prefer deterministic software for calculations, permissions, state transitions and money movement. Use models where language, ambiguity or synthesis creates material value. Use agents only when the task genuinely needs dynamic selection among bounded tools.

## 3. Reference enterprise AI architecture

```mermaid
flowchart TB
    U[User / Business Application] --> G[API Gateway + Identity]
    G --> O[Workflow Orchestrator]
    O --> P[Policy & Approval Service]
    O --> R[Retrieval Service]
    R --> V[(Vector / Search Index)]
    R --> D[(Authoritative Data Sources)]
    O --> M[Model Gateway]
    M --> L[LLM / Embedding Providers]
    O --> T[Tool Runtime]
    T --> X[CRM / ERP / Ticketing / Internal APIs]
    O --> H[Human Review Queue]
    H --> O
    O --> A[(State, Audit & Evaluation Store)]
    G --> OBS[Telemetry: traces, metrics, logs]
    O --> OBS
    T --> OBS
    M --> OBS
```

Important boundaries:
- API gateway authenticates the caller; policy service authorizes actions.
- Retrieval filters by user/tenant permissions before context reaches a model.
- Model gateway centralizes provider selection, quotas, timeouts and data handling.
- Tool runtime validates schemas and authorization, then executes bounded operations.
- Workflow state and audit records are durable and separate from model context.
- Human review is a first-class state, not a chat message that the model can ignore.

## 4. Agent execution sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant API as API / Identity
    participant WF as Workflow Orchestrator
    participant Policy as Policy Engine
    participant RAG as Retrieval
    participant Model as Model Gateway
    participant Tools as Tool Runtime
    participant Human as Human Reviewer
    participant Store as State / Audit

    User->>API: Submit task
    API->>WF: Authenticated request + actor context
    WF->>Store: Create workflow record
    WF->>Policy: Check task and data scope
    Policy-->>WF: Allowed capabilities
    WF->>RAG: Retrieve authorized context
    RAG-->>WF: Grounded evidence
    WF->>Model: Prompt + evidence + tool catalog
    Model-->>WF: Proposed answer or tool call
    WF->>Policy: Authorize exact action
    alt Approval required
        WF->>Human: Request approval with exact arguments
        Human-->>WF: Approve / reject / edit
    end
    WF->>Tools: Execute validated tool call
    Tools-->>WF: Structured result
    WF->>Store: Append audit and state transition
    WF->>Model: Synthesize result if needed
    Model-->>WF: Draft response
    WF->>Store: Persist final response + evidence refs
    WF-->>API: Result and status
    API-->>User: Response
```

## 5. Architecture patterns for AI workloads

| Need | Preferred design | Guardrail |
|---|---|---|
| Ground responses in company knowledge | RAG with ACL-aware retrieval | Enforce ACL before context enters model |
| Long-running work | Durable workflow / state machine | Persist checkpoints; resume idempotently |
| External actions | Governed tool runtime | Server-side policy and approval |
| Multi-agent collaboration | Start with one orchestrator and bounded specialist tools | Add agents only when independent context/ownership justifies it |
| Model/provider resilience | Model gateway + fallback policy | Evaluate quality parity; don't silently downgrade for critical tasks |
| High-volume inference | Async queue + bounded workers | Backpressure, quotas, dead-letter handling |
| Repeated outputs | Cache only with tenant-aware keys and freshness policy | Never cross-contaminate tenants |
| Quality improvement | Evaluation harness + curated feedback | Separate evaluation data from training data |

## 6. FDE delivery lifecycle

```mermaid
flowchart LR
    A[Discover workflow] --> B[Map current state]
    B --> C[Define success metric]
    C --> D[Prototype with real users]
    D --> E[Shadow mode]
    E --> F[Limited pilot]
    F --> G{Quality and adoption meet gate?}
    G -->|No| H[Root-cause: data / UX / prompt / model / policy]
    H --> D
    G -->|Yes| I[Production rollout]
    I --> J[Monitor, train users, iterate]
    J --> K[Measure business impact]
```

FDE quality bar:
- Integrate with actual identity, data and operational workflows.
- Make failure and escalation understandable to the end user.
- Keep humans in control where business risk is high.
- Provide an operational owner, runbook and rollback.
- Track adoption and business outcome, not just model benchmark scores.

## 7. Evaluation pyramid

1. Unit tests for schemas, policies, transformations and deterministic functions.
2. Contract tests for model gateway and tools.
3. Golden datasets for retrieval and answer quality.
4. Scenario tests for end-to-end workflows, including adversarial and failure cases.
5. Shadow evaluation on production-like traffic with no side effects.
6. Human review and business outcome measurement after a limited rollout.

A demo that works once is not an evaluation strategy.

## 8. Interview narrative (2 minutes)

“I start with the workflow and measurable business problem, not the model choice. I determine which parts are deterministic and which benefit from language understanding or synthesis. I build a secure architecture with identity-aware retrieval, a model gateway, durable orchestration, and a governed tool runtime. Risky actions require explicit human approval. Before rollout I define golden evaluations, shadow mode and pilot gates. As an FDE I work with users to integrate into their real workflow and measure cycle-time, quality and adoption. As an AI Architect I make those controls reusable, observable and scalable.”

## 9. FDE / AI Architect system design questions

- What is the actual business workflow and who owns each step?
- Why is an LLM needed instead of rules, search or a conventional service?
- What data can this user retrieve? How do ACLs propagate?
- How are tool permissions derived and enforced?
- Which side effects require human approval?
- How do you recover after the model times out after a tool has succeeded?
- How do you prevent duplicate actions on retry?
- How do you measure hallucinations, retrieval misses and task completion?
- How do you estimate inference, storage, retrieval and operational costs?
- What is the fallback when the provider, vector store or downstream API fails?
- How do you deploy to one customer without leaking their data or building an unmaintainable fork?
- What evidence justifies moving from pilot to production?

## Principle

**FDE is not “prompt engineering at the customer.” It is disciplined product engineering at the workflow boundary: discovery, integration, evaluation, adoption and operational ownership.**
