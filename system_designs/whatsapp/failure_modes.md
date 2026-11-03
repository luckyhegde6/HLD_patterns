# Failure Modes — WhatsApp-Style Messaging

| Failure | Handling |
|---|---|
| Client retries send | Idempotency key returns original message/sequence |
| Gateway disconnect | Reconnect with cursor and replay missed events |
| Fanout event duplicated | Consumer dedupe by event ID/message sequence |
| Offline queue grows | Retention, compaction, quota and backpressure |
| Hot group | Hybrid fanout, batching, partition-aware limits |
| Stale presence | Lease expiry; treat as advisory |
| Device key changes | Explicit device trust/key-change UX and audit |
| Push provider outage | Retry boundedly; sync remains source of truth |

Never acknowledge before durable append. Ensure membership authorization is checked on both send and replay; avoid treating push delivery as proof of message delivery.
