# Architecture and Diagrams

```mermaid
flowchart LR
 C[Client] --> GW[Gateway / middleware]
 GW --> KEY[Trusted identity + policy key]
 KEY --> RL[Limiter algorithm]
 RL --> STORE[(Atomic counter / token state)]
 RL --> DEC{Allowed?}
 DEC -->|Yes| SVC[Backend service]
 DEC -->|No| RESP[429 / retry metadata]
 CP[Policy control plane] --> RL
 RL --> MET[Metrics]
```

```mermaid
sequenceDiagram
 Client->>Gateway: Request
 Gateway->>Limiter: Check key, cost, policy
 Limiter->>Store: Atomic consume/refill
 Store-->>Limiter: Remaining tokens / decision
 alt allowed
  Limiter-->>Gateway: Allow
  Gateway->>Service: Forward
 else denied
  Limiter-->>Gateway: Reject with retry info
 end
```

```mermaid
flowchart TD
 R[Request] --> ID{Trusted key available?}
 ID -->|No| DENY[Reject or conservative bucket]
 ID -->|Yes| CHECK[Atomic quota check]
 CHECK --> OK{Budget available?}
 OK -->|Yes| ALLOW[Consume and allow]
 OK -->|No| THROTTLE[Throttle]
```


## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/rate-limiter.architecture.json](archify/rate-limiter.architecture.json).
