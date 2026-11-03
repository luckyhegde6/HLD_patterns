# Trade-offs — Google Drive

- Larger chunks reduce metadata overhead but increase retry waste; smaller chunks improve resumability at request cost.
- Global dedup saves storage but can leak cross-tenant equality and complicate deletion; scope dedup by security boundary.
- Relational metadata simplifies transactions/ACL; distributed KV may scale reads but raises consistency complexity.
- Frequent sync improves freshness but costs battery/network; cursor-based batching balances load.
- Immutable versions aid recovery/audit but require lifecycle and retention policy.
