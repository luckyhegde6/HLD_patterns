# Trade-offs

| Decision | Trade-off |
|---|---|
| RAG vs direct APIs | Docs grounding vs fresh account/order facts |
| Single agent vs workflow | Simplicity vs explicit stages and policy gates |
| Auto-resolution vs human review | Faster handling vs control for sensitive actions |
| Model tool calls vs trusted runtime | Flexibility vs centralized authorization |
| Sync vs async cases | Immediate response vs durable approval workflows |

## Invariants
- Authorize tenant/customer before retrieval and every tool action.
- Model output cannot grant permissions.
- Sensitive side effects require exact-action approval.
- Unknown outcomes must be reconciled or escalated, never reported as complete.
