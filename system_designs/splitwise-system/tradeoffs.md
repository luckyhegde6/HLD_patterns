# Trade-offs

| Choice | Trade-off |
|---|---|
| Ledger-derived vs mutable balances | Audit/rebuildability vs query complexity |
| Simplified debts vs original obligations | Fewer transfers vs preserving pairwise history |
| Sync vs async projections | Immediate reads vs scalability |
| Single currency vs FX support | Simplicity vs conversion complexity |

Financial arithmetic must be deterministic; never rely on model-generated calculations.
