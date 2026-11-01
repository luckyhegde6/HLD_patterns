# Trade-offs

| Choice | Trade-off |
|---|---|
| Strongly consistent inventory vs cache | Correctness vs read scale |
| Hold TTL short vs long | Inventory turnover vs checkout UX |
| Waiting room vs direct access | Fairness/load protection vs friction |
| Synchronous booking vs saga | Immediate flow vs resilience to partial failures |

Inventory allocation must be transactional; search results may be stale but holds must be authoritative.