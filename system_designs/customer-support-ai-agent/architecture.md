# Architecture and Diagrams — Customer Support AI Agent

## Component architecture
```mermaid
flowchart LR
 C[Customer channels] --> GW[Support API / gateway]
 GW --> AUTH[Identity, tenant and entitlement]
 GW --> ORCH[Case orchestration]
 AUTH --> RET[Authorized retrieval]
 RET --> KB[(Product knowledge)]
 RET --> CRMREAD[Scoped CRM / order reads]
 RET --> LLM[Agent classifier and planner]
 ORCH --> LLM
 LLM --> POL[Policy and tool gateway]
 POL --> TOOLS[Typed CRM / ticket tools]
 POL --> APPR{Sensitive action?}
 APPR -->|Yes| HUMAN[Human approval console]
 HUMAN -->|Approved| TOOLS
 APPR -->|No| TOOLS
 TOOLS --> CRM[(CRM / ticketing)]
 TOOLS --> ORCH
 ORCH --> RESP[Response composer]
 RESP --> C
 ORCH --> EVAL[Evaluation pipeline]
 EVAL --> OBS[Metrics, traces and audit]
```

## Customer issue sequence
```mermaid
sequenceDiagram
 autonumber
 participant U as Customer
 participant S as Support API
 participant A as AuthZ
 participant R as Retrieval
 participant L as Agent
 participant P as Policy/Tool Runtime
 participant H as Human Approver
 participant CRM as CRM/Ticketing
 U->>S: Submit issue
 S->>A: Resolve identity, tenant and entitlements
 A-->>S: Scoped claims
 S->>R: Retrieve permitted context
 R-->>S: Evidence with source/access labels
 S->>L: Issue + authorized context
 L-->>S: Classification + proposal + tool request
 S->>P: Validate schema, scope, policy and risk
 alt Sensitive action
  P-->>H: Approval request bound to action hash
  H-->>P: Approve / reject / edit
 else Routine action
  P-->>P: Apply deterministic policy
 end
 P->>CRM: Execute idempotent action
 CRM-->>P: Result / ticket ID
 P-->>S: Structured tool result
 S-->>U: Response or escalation
 S->>S: Emit outcome/evaluation events
```

## Approval state machine
```mermaid
stateDiagram-v2
 [*] --> Drafted
 Drafted --> Validated
 Validated --> AwaitingApproval: sensitive
 Validated --> Executing: policy allows
 AwaitingApproval --> Executing: approved before expiry
 AwaitingApproval --> Rejected: denied
 AwaitingApproval --> Expired: approval TTL elapsed
 Executing --> Completed
 Executing --> RetryableFailure
 RetryableFailure --> Executing: bounded retry + idempotency
 Executing --> Escalated: uncertain / non-retryable
 Completed --> [*]
 Rejected --> [*]
 Expired --> [*]
 Escalated --> [*]
```

## Safe fallback flow
```mermaid
flowchart TD
 I[Issue] --> AUTH{Identity and scope valid?}
 AUTH -->|No| SAFE[Authenticate / route to human]
 AUTH -->|Yes| CTX[Retrieve authorized evidence]
 CTX --> EVID{Evidence sufficient and current?}
 EVID -->|No| HUMAN[Escalate with context gaps]
 EVID -->|Yes| CLS[Classify intent and risk]
 CLS --> TOOL{Allowed action available?}
 TOOL -->|No| RESP[Explain supported next step]
 TOOL -->|Yes| SENS{Sensitive?}
 SENS -->|Yes| APPR{Approval granted?}
 APPR -->|No| HUMAN
 APPR -->|Yes| EXEC[Execute governed tool]
 SENS -->|No| EXEC
 EXEC --> RESULT{Confirmed result?}
 RESULT -->|Yes| RESP
 RESULT -->|No| HUMAN
```

## Trust boundaries
- Identity and tenant scope come from verified server-side claims, never model arguments.
- Retrieval enforces authorization before prompt assembly and labels evidence provenance.
- Retrieved text and attachments are untrusted prompt-injection input.
- Tool runtime validates permissions, schema, scope, risk, quotas and idempotency on every call.
- Audit records capture actor, action, approval, policy version and outcome without unnecessary sensitive prompt data.