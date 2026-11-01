# Trade-offs — Circuit Breaker

| Choice | Trade-off |
|---|---|
| Local vs distributed state | Fast local decisions vs fleet-wide coordination complexity |
| Count vs rate thresholds | Simple count windows vs traffic-normalized rate |
| Fail fast vs fallback | Protects dependency vs fallback correctness/cost |
| Retry with breaker vs breaker only | Recovery from transient faults vs amplification risk |

Pair with timeouts, bulkheads and bounded jittered retries. Tune thresholds from dependency SLOs and observed traffic, not guesses.
