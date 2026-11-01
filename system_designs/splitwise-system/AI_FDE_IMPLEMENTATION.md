# AI / FDE Implementation

AI can parse receipt text into a proposed expense and explain balances. Users confirm extracted values; ledger writes use deterministic validation.

```mermaid
flowchart LR
 Receipt[Receipt / text] --> AI[Extraction assistant]
 AI --> Draft[Proposed expense]
 Draft --> Review[User review + split validation]
 Review --> API[Expense API]
 API --> Ledger[(Immutable ledger)]
```

Tools are scoped to group membership and typed fields. Never let a model calculate final balances or initiate settlement without explicit user action. Evaluate extraction accuracy and correction rate.
