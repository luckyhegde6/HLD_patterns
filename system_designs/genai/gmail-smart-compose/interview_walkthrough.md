# Interview Walkthrough — Gmail Smart Compose

## 45-minute structure

### 1. Clarify (5 min)
- Low-latency email continuation; contextual completion with privacy-sensitive user text.
- Who are users and what is the core happy path?
- Inputs/outputs, supported modes, latency and availability expectations?
- Privacy, safety, quality and cost constraints?

### 2. Requirements and scale (5 min)
State functional and non-functional requirements. Estimate DAU, requests/user/day, peak QPS, payload size, retention and compute cost. Label assumptions and calculate peak = average × peak factor.

### 3. High-level design (10 min)
Draw client → API/auth → validation/policy → orchestrator → data/context → queue/model service → postprocessing → result. Separate interactive and asynchronous paths. Explain trust boundaries.

### 4. Deep dives (15 min)
1. Model choice and serving strategy.
2. Data preparation, versioning and evaluation.
3. Latency/cost bottleneck and scaling strategy.
4. Consistency, idempotency, retries and cancellation.
5. Privacy, safety, access control and deletion.

### 5. Failure/reliability (5 min)
Walk through model outage, queue backlog, duplicate submission, invalid output and data-store failure. Explain degradation and recovery.

### 6. Trade-offs and wrap-up (5 min)
Summarize chosen options, alternatives rejected, measurable signals and next evolution phase.

## Senior-level signals
- Quantifies assumptions instead of asserting scale.
- Separates model quality from system availability.
- Uses async processing for expensive work and bounded budgets.
- Makes authorization and safety independent of model compliance.
- Defines evaluation/rollout gates and operational ownership.
- Identifies one simplification for MVP and the trigger to evolve it.

## Practice prompts
- What changes at 10× traffic or 10× payload size?
- Which component is the first bottleneck and how do you prove it?
- What must be strongly consistent, and what can be eventually consistent?
- How do you prevent duplicate cost and cross-tenant data leakage?
- What metric would cause rollback?