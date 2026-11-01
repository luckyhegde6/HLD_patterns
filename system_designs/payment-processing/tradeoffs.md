# Trade-offs

| Choice | Trade-off |
|---|---|
| Direct provider call vs async orchestration | Immediate checkout vs durable workflow/pending state |
| Single vs multiple providers | Simplicity vs resilience and routing complexity |
| Provider ledger vs internal ledger | Lower build effort vs independent accounting control |
| Synchronous webhook vs queue | Fast response vs resilient processing |

Provider API success is not equivalent to final settlement. Reconcile external state with internal ledger.
