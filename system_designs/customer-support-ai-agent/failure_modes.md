# Failure Modes and Recovery — Customer Support AI Agent

| Failure | Detection | Mitigation | Safe outcome |
|---|---|---|---|
| Identity/tenant context missing | AuthZ failure | Fail closed | Authenticate or human route |
| Retrieval returns unauthorized data | Access filter/test alarm | Enforce ACL before prompt; stop run | No disclosure; audit incident |
| Prompt injection in retrieved content | Input/source risk signals | Treat content as data; tool policy independent | Ignore instruction; continue safely or escalate |
| Model unavailable/timeout | Provider error/deadline | Bounded retry or deterministic fallback | Human queue / safe response |
| Tool timeout after write | Unknown outcome | Idempotency key and read-after-write reconciliation | Do not repeat side effect blindly |
| Approval expired/arguments changed | Hash/TTL mismatch | Invalidate approval | Request fresh approval |
| CRM outage | Dependency health | Queue only safe work; circuit breaker | Explain delay / escalate |
| Low evidence/confidence | Evaluation gate | No unsupported answer | Escalate with evidence gaps |

## Retry and approval rules
- Retry only transient failures within deadline and budget.
- Every write uses idempotency and a structured result state.
- Approval binds canonical action arguments, actor, tenant, policy version and expiry.
- Any changed argument invalidates approval.
- Preserve `unknown` when external outcome is ambiguous; reconcile before retry.

Monitor unauthorized retrieval/action (zero tolerance), tool error/unknown rate, approval wait, escalation reason, reopen rate and model/provider failures.
