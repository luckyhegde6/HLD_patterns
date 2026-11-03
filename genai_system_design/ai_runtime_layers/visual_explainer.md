# AI Runtime Layers — Visual Explainer

Prompt defines intent; Context supplies authorized evidence; Harness controls capabilities; Loop bounds iterative action; Graph coordinates durable branches and human handoffs.

## Layer flow
```mermaid
flowchart LR
 P[Prompt: intent + schema] --> C[Context: retrieval + memory]
 C --> H[Harness: policy + tools + budgets]
 H --> L[Loop: observe / decide / act / verify]
 L -->|bounded iteration| H
 L -->|finish| R[Validated result]
 L -->|durable branch| G[Graph: state + checkpoint]
 G --> H
 H <--> M[Model Gateway]
 H <--> T[MCP / APIs]
```

## Responsibility boundaries
| Layer | Owns | Does not own |
|---|---|---|
| Prompt | Task wording, constraints, output schema | Permissions, secrets, durable state |
| Context | Authorized evidence, memory, provenance | Tool execution |
| Harness | Policy, tool schemas, auth, budgets, telemetry | Business workflow state |
| Loop | Iteration, verification, stop conditions | Unbounded retries |
| Graph | Nodes, branching, checkpoints, approvals | Bypassing harness policy |

## Safety boundary
```mermaid
flowchart TD
 A[Model proposes action] --> B[Harness validates schema]
 B --> C[Authorize caller + scope]
 C --> D[Check policy / budget / approval]
 D -->|allowed| E[Execute tool]
 D -->|denied| F[Reject + audit]
 E --> G[Tool result is untrusted]
 G --> H[Context refresh + verify]
```

Do not add an agent to deterministic work without measurable benefit. Treat retrieved text and tool output as untrusted input. See [README](README.md) for the full architecture, sequence and checklist.
