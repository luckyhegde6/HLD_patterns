# Interview Walkthrough — Distributed Cache

## 10-minute structure

1. State the problem, actors, use cases and non-goals.
2. Clarify requirements and domain invariants.
3. Estimate traffic, storage, concurrency and latency.
4. Draw context and component boundaries.
5. Walk through the critical read/write sequence.
6. Explain schema, consistency, transactions and idempotency.
7. Model outage, retry, duplicate and recovery paths.
8. Cover security, observability, deployment and cost.
9. Compare alternatives and identify redesign triggers.

## Follow-up questions

- What is the first bottleneck at 10x traffic?
- Which invariant must never be violated?
- What if a dependency times out after committing?
- How do you isolate a noisy tenant?
- How do you roll out schema/API changes safely?
- What would you simplify for an MVP?
- Where is AI useful and where must behavior remain deterministic?
- What evidence justifies another service or datastore?

## Enhanced walkthrough

Use the [system-specific 10-minute visual walkthrough](visual_explainer.md) alongside this checklist. It includes the architecture narration, critical request sequence, invariants, failure paths, trade-offs and follow-up questions. Practice drawing the diagram from memory before reading the notes.
