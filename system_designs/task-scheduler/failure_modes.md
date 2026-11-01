# Failure Modes

- Scanner crash: durable due jobs are rediscovered.
- Duplicate queue delivery: execution idempotency key and lease/state check.
- Worker crash: lease expiry and bounded retry.
- Poison task: retry classification and DLQ.
- Queue outage: persist due state and apply backpressure.
- Clock skew: trusted time source and schedule tolerance.
- Long-running task: heartbeat/lease renewal and cancellation semantics.

Monitor schedule lag, queue age, attempts, lease expiry, success rate and DLQ volume.
