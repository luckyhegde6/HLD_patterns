# AI / FDE Implementation

AI can forecast occupancy, explain anomalies and assist operators. Allocation, pricing rules and payment execution remain deterministic.

```mermaid
flowchart LR
 Events[Occupancy and demand] --> Model[Forecast / anomaly analysis]
 Model --> Suggest[Capacity or staffing suggestion]
 Suggest --> Sim[Constraint and fairness checks]
 Sim --> Review[Operator approval]
 Review --> Ops[Operational plan]
```

Do not let an agent assign physical spots or collect payment directly. Evaluate forecast error, occupancy mismatch and operational outcomes.
