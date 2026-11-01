# Interview Walkthrough — Circuit Breaker

1. Explain dependency failure modes and caller impact.
2. Define timeout, rolling window and thresholds.
3. Walk closed/open/half-open transitions.
4. Explain concurrency, probe limits and fleet behavior.
5. Discuss fallback correctness, retry budgets and bulkheads.
6. Cover metrics, tuning, testing and rollout.

Follow-ups: What if traffic is low? What if one tenant causes failures? How do you prevent synchronized half-open probes? What if fallback is stale?
