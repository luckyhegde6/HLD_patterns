# Requirements and Workload — Customer Support AI Agent

## Functional
- Accept issues across channels and preserve conversation/case history.
- Authenticate customer and resolve tenant, account and entitlement scope.
- Retrieve authorized customer, order, subscription and product knowledge.
- Classify intent, urgency, sentiment and risk with confidence/evidence.
- Propose resolution and cite internal evidence sources.
- Use allowlisted CRM/ticket tools with typed schemas and idempotency.
- Require human approval for sensitive actions; support reject, edit and expiry.
- Escalate when evidence is insufficient, policy denies or outcome is uncertain.
- Record outcome, feedback, tool traces and evaluation metrics.

## Non-functional
Define availability, first-response latency, end-to-end handling time, retrieval freshness, privacy/retention, audit completeness, regional residency and cost per case.

## Workload worksheet
| Input | Value | Source |
|---|---:|---|
| Cases/day and peak cases/min | TBD | Support telemetry |
| Channel mix | TBD | CRM analytics |
| Average context size | TBD | Retrieval measurements |
| Tool calls/case | TBD | Pilot traces |
| Human approval SLA | TBD | Operations |
| Resolution accuracy baseline | TBD | Adjudicated historical cases |

## Open questions
Which actions are sensitive? What counts as resolved? Which systems are sources of truth? What are tenant and data residency boundaries? Who adjudicates evaluation labels?