# Data Model

```mermaid
erDiagram
 WORKER_LEASE ||--o{ GENERATOR_INSTANCE : assigns
 WORKER_LEASE { int worker_id PK; string owner; datetime lease_until; int epoch }
 GENERATOR_INSTANCE { string instance_id PK; int worker_id FK; string region; string status }
```

Worker IDs must be uniquely leased with fencing/epoch semantics. Generator state (last timestamp and sequence) is typically local memory; persist only if restart semantics require it. Define lease expiry and clock-health telemetry.
