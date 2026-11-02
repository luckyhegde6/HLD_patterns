# Architecture — Gmail Smart Compose

## Scope
Low-latency email continuation; contextual completion with privacy-sensitive user text.

## Logical architecture

```mermaid
flowchart LR
  U[Client / Product UI] --> API[API Gateway + Auth]
  API --> VAL[Request validation + policy]
  VAL --> ORCH[Orchestrator / Job service]
  ORCH --> CACHE[(Scoped cache)]
  CACHE -->|miss| Q[Queue / Scheduler]
  Q --> MODEL[Model adapter / inference pool]
  MODEL --> POST[Postprocessing + output validation]
  POST --> STORE[(Result / metadata store)]
  STORE --> API --> U
  ORCH --> DATA[(Context / source data)]
  ORCH -.-> OBS[Metrics, traces, audit]
  FB[Feedback] --> EVAL[Evaluation / improvement pipeline]
  EVAL --> REG[Versioned model / prompt registry]
  REG --> MODEL
```

## Online request sequence

```mermaid
sequenceDiagram
  autonumber
  participant U as User
  participant A as API
  participant O as Orchestrator
  participant P as Policy
  participant M as Model service
  participant D as Data store
  U->>A: Submit request
  A->>P: Validate identity, input and policy
  P-->>A: Allow / reject / require approval
  A->>O: Create idempotent request/job
  O->>D: Load authorized context and state
  D-->>O: Context
  O->>M: Inference request with deadline/version
  M-->>O: Candidate output
  O->>P: Validate output / safety / grounding
  P-->>O: Accepted result or safe failure
  O->>D: Persist state and result reference
  O-->>A: Result/status
  A-->>U: Response or job status
```

## Deployment boundaries
- Stateless API/orchestrator replicas behind a load balancer.
- Durable database separated from cache and queue.
- Model workers scale on queue age, GPU/CPU utilization and request class.
- Private object storage for media; short-lived signed URLs for authorized access.
- Separate offline ingestion/training/evaluation from online serving.

## SLOs and observability
Track availability, p50/p95/p99 latency, queue age, model error rate, quality/evaluation scores, policy outcomes, cost per successful request and data freshness. Establish numeric targets after workload and product requirements are agreed.