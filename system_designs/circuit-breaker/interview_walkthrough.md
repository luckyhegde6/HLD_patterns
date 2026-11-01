# Interview Walkthrough — Circuit Breaker

1. Explain dependency failure modes and caller impact.
2. Define timeout, rolling window and thresholds.
3. Walk closed/open/half-open transitions.
4. Explain concurrency, probe limits and fleet behavior.
5. Discuss fallback correctness, retry budgets and bulkheads.
6. Cover metrics, tuning, testing and rollout.

Follow-ups: What if traffic is low? What if one tenant causes failures? How do you prevent synchronized half-open probes? What if fallback is stale?


## Enhanced walkthrough

Use the [system-specific 10-minute visual walkthrough](visual_explainer.md) alongside this checklist. It includes the architecture narration, critical request sequence, invariants, failure paths, trade-offs and follow-up questions. Practice drawing the diagram from memory before reading the notes.
