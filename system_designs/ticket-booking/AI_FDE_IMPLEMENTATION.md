# AI / FDE Implementation

AI can assist event discovery, accessibility and support. It must not bypass inventory holds, queue fairness, payment or ticket ownership rules.

```mermaid
flowchart LR
 User --> Assistant[Discovery assistant]
 Assistant --> Search[Authorized event search]
 Search --> Recs[Ranked options with evidence]
 Recs --> UserConfirm[User selects]
 UserConfirm --> Booking[Deterministic booking flow]
 Booking --> Hold[Atomic hold]
 Hold --> Payment[Payment workflow]
```

Keep tools read-only for discovery. Booking side effects require explicit user confirmation, idempotency and policy checks. Evaluate recommendation relevance and booking integrity.