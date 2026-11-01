# AI / FDE Implementation

AI can forecast traffic, simulate dispatch policies and explain maintenance patterns using authorized telemetry.

```mermaid
flowchart LR
 DATA[Historical telemetry] --> MODEL[Forecast / simulation]
 MODEL --> REC[Dispatch policy proposal]
 REC --> SIM[Offline safety and fairness tests]
 SIM --> REVIEW[Engineer review]
 REVIEW --> PILOT[Non-safety-critical pilot]
```

Do not connect an LLM to motion, door or emergency control. Dispatch recommendations must remain constrained by deterministic eligibility and safety rules. Evaluate wait time, fairness, energy and constraint violations (zero tolerance).
