# AI / FDE Implementation

AI may summarize payment support cases or explain reconciliation anomalies from authorized data. It must not initiate payment, capture, refund or change beneficiary details autonomously.

```mermaid
flowchart LR
 Case[Support case] --> Agent[AI assistant]
 Agent --> Read[Scoped read-only tools]
 Read --> Proposal[Evidence-backed proposal]
 Proposal --> Policy[Deterministic risk policy]
 Policy --> Approval[Authorized human approval]
 Approval --> Runtime[Typed workflow]
 Runtime --> Audit[Ledger and audit]
```

Sensitive actions require exact-action approval, strong identity, limits, idempotency, audit and reconciliation. Evaluate correctness and unauthorized action rate (zero tolerance).
