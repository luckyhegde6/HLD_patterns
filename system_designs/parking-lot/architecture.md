# Architecture and Diagrams

```mermaid
flowchart LR
 G[Entry gate] --> API[Parking API]
 API --> ALLOC[Allocation service]
 ALLOC --> INV[(Spot inventory)]
 API --> TKT[Ticket service]
 EXIT[Exit gate] --> PAY[Fee/payment service]
 PAY --> TKT
 PAY --> PROVIDER[Payment provider]
 ALLOC --> DISP[Availability display]
```

```mermaid
sequenceDiagram
 Driver->>Entry: Request entry
 Entry->>Allocator: Vehicle type + request key
 Allocator->>Inventory: Atomic reserve compatible spot
 Inventory-->>Allocator: Spot / no capacity
 Allocator-->>Entry: Ticket ID and spot
 Driver->>Exit: Present ticket
 Exit->>Payment: Calculate fee
 Payment->>Provider: Collect payment
 Provider-->>Payment: Result
 Payment-->>Exit: Permit exit
 Exit->>Inventory: Release spot
```

```mermaid
flowchart TD
 Req[Entry request] --> FIND[Find compatible available spot]
 FIND --> RES{Atomic reservation succeeds?}
 RES -->|No| FULL[Reject / waitlist]
 RES -->|Yes| TICKET[Create ticket]
 TICKET --> OCC[Mark occupied]
```


## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/parking-lot.architecture.json](archify/parking-lot.architecture.json).
