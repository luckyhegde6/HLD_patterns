# AI / FDE Implementation

An agent may propose a job. Trusted scheduler code validates tenant, permissions, quotas, deadlines and approval before execution.

```mermaid
flowchart LR
 Agent --> Proposal[Typed proposal]
 Proposal --> Policy[Schema and scope checks]
 Policy --> Approval{Sensitive?}
 Approval -->|Yes| Human[Human approval]
 Approval -->|No| API[Scheduler API]
 Human -->|Approved| API
 API --> Worker[Worker runtime]
 Worker --> Audit[Execution audit]
```

MCP is a protocol, not an authorization boundary. Evaluate task success, duplicate effects, retries, latency and cost.
