# Failure Modes

- Provider outage: retry within budget, circuit break and route to approved fallback.
- Duplicate event: idempotency key and delivery dedupe.
- Invalid destination: permanent failure; do not retry.
- Webhook delayed/duplicated: idempotent status updates.
- Queue backlog: scale workers and prioritize time-sensitive messages.
- Consent changed after enqueue: re-check immediately before send.

Monitor delivery latency, accepted/delivered/bounced rates, retries, queue age, suppression and provider error codes.