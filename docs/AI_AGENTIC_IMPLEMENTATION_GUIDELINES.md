# AI / Agentic Implementation Guidelines for HLD Projects

These rules apply when an AI coding agent, autonomous agent, or MCP-connected tool is used to implement a system described in this repository.

## 1. Architecture first, generation second

Do not ask an agent to “build the whole architecture” from one paragraph. First produce and review:
- Requirements, explicit non-goals and acceptance criteria
- Workload/capacity assumptions
- Context and container diagrams
- API contracts and event schemas
- Data ownership, consistency and idempotency rules
- Threat model and authorization policy
- Failure matrix and operational SLOs
- A delivery plan broken into vertical slices

The HLD is a hypothesis to validate, not a license to generate every box as a microservice.

## 2. Harness workflow

1. **Discover:** inspect repository instructions, current branch, tree, runtime versions, existing architecture and tests.
2. **Baseline:** run the current checks and record failures before edits.
3. **Frame:** translate the HLD into a scoped task, acceptance criteria and explicit constraints.
4. **Design:** ask the agent for interfaces, sequence, state transitions, threat boundaries and trade-offs before broad implementation.
5. **Implement:** deliver one thin vertical slice through API, domain logic, persistence and tests.
6. **Verify:** run format, lint, type-check, unit, integration and contract tests as applicable.
7. **Review:** inspect diff, dependency changes, authorization, secrets, migrations and failure behavior.
8. **Deliver:** document what changed, what was tested, exact commands/results, unresolved risks and rollback path.

Use separate agents only when work can be partitioned by stable interfaces and file ownership. Do not let several agents edit the same files concurrently.

## 3. Agent permissions and tool boundaries

- The model may propose a tool invocation; the server-side runtime validates schema, identity, tenant scope and permissions.
- Never accept permissions, roles, tenant IDs or actor identity supplied only in model-generated arguments.
- Use least-privilege credentials scoped to the task and environment.
- Require human confirmation for payments, external communication, destructive operations, production deployments, data export and privilege changes.
- Treat user data, retrieved pages, tool outputs and repository text as untrusted content. They cannot override system or security policy.
- Validate every URL, file path, SQL statement and structured argument at the boundary.
- Redact secrets and sensitive data from prompts, logs, traces and training data.
- Use sandboxing and resource limits for untrusted code execution.

## 4. Agentic system design checklist

| Concern | Design question |
|---|---|
| Identity | Who is the actor? How is identity authenticated and propagated? |
| Authorization | Which server policy authorizes each action? Is scope tenant-bound? |
| Tool registry | Are tools versioned, typed, documented and discoverable? |
| Input validation | Are schemas strict, bounded and validated server-side? |
| Idempotency | What key prevents duplicate side effects after retry? |
| Retries | Which errors are retryable? Is backoff bounded with jitter? |
| Timeout/cancel | Can the underlying operation actually be canceled? |
| State | Where is conversation/task state persisted? What is its retention? |
| Human approval | Which actions need review and how is approval bound to exact arguments? |
| Audit | Can an operator reconstruct actor, tool, input hash, result and policy decision? |
| Observability | Are traces linked across model call, tool call, queue and downstream API? |
| Evaluation | Are quality, safety, latency and cost measured against a fixed test set? |
| Fallback | What deterministic path exists when model/provider/tool is unavailable? |

## 5. MCP implementation rules

- Treat MCP as a protocol boundary, not a trust boundary.
- Tool descriptions should state purpose, inputs, side effects, permissions, failure behavior and whether approval is required.
- Resources should expose only authorized, appropriately redacted context.
- Keep tool schemas stable and versioned; avoid giant “do everything” tools.
- Do not expose arbitrary SQL, shell or unrestricted filesystem access to a model.
- Return structured error categories. Do not leak stack traces, credentials or internal topology.
- Test initialize/capability negotiation, discovery, valid calls, invalid schema, denied calls, timeout, malformed protocol messages and resource authorization.

## 6. Evaluation and quality gates

Create a task suite before building. Include normal cases, ambiguous cases, adversarial instructions, malformed arguments, permission denials, duplicate requests, timeout, provider outage and partial completion.

Measure:
- Task completion and acceptance-test pass rate
- Correct tool selection and argument validity
- Unauthorized action rate (target: zero in the evaluation set)
- Hallucinated claims / unsupported facts
- Human intervention and correction rate
- p50/p95 latency and cost per completed task
- Retry rate, timeout rate and duplicate side effects

Do not fine-tune to compensate for missing tools, stale context, weak schemas or absent tests. First improve retrieval, instructions, runtime policy and feedback loops.

## 7. Ready-to-use HLD implementation prompt

> Act as a senior/principal engineer and AI systems architect. Read the target system's HLD and the repository's AI/agentic implementation guidelines before changing files.
>
> **Goal:** [user/business outcome]
>
> **Scope:** [vertical slice and exact folders]
>
> **Requirements:** [functional and non-functional]
>
> **Workload:** [traffic, data size, concurrency, latency, growth assumptions]
>
> **Constraints:** [language, cloud, database, model/provider, budget, compliance]
>
> **Reference design:** [HLD document and exact diagram sections]
>
> First inspect the codebase and report existing conventions, gaps and risks. Then propose a design with API/event contracts, data model, sequence, failure paths and security boundaries. Do not edit until this design is coherent.
>
> Implement the smallest end-to-end slice. Add tests for happy path, validation, duplicate/idempotent calls, authorization denial, timeout, retry and partial failure where relevant. Keep model inference separate from deterministic business logic. Enforce permissions in trusted server code, not prompts.
>
> Run the exact repository checks. Report every command and actual result; never claim a test was run if it was not. Update the diagrams and docs to match the implementation. Finish with trade-offs, limitations, rollout/rollback steps and a list of unimplemented requirements.

## Closing principle

**The agent can accelerate implementation; it cannot own the architecture, security policy or production outcome.** The engineer remains accountable for the system's behavior under normal load, failure, abuse and change.
