# Message Queues and Streams

Queues decouple producers and consumers and buffer bursts. Streams retain ordered event logs for independent consumers, replay and derived projections. Neither automatically guarantees exactly-once business effects.

## Queue vs stream

| Dimension | Work queue | Event stream |
|---|---|---|
| Consumer model | Competing workers | Consumer groups / independent subscribers |
| Intent | Complete a task | Retain facts for multiple readers |
| Retention | Until ack/expiry | Configured time/size |
| Replay | Retry / DLQ | Offset reset / replay |
| Ordering | Depends on product/partition | Often per partition/key |
| Examples | SQS, RabbitMQ queue | Kafka, Kinesis, Pub/Sub semantics |

Check each provider's exact guarantees; product labels are not interchangeable.

## Async job flow

```mermaid
flowchart LR
  API[API / Producer] -->|Publish job| Q[(Durable queue)]
  Q -->|Lease / deliver| W[Worker pool]
  W -->|Commit idempotent effect| DB[(Domain database)]
  W -->|ACK after commit| Q
  W -->|Retries exhausted| DLQ[(Dead-letter queue)]
  Q -.-> MET[Queue depth + oldest age]
  W -.-> MET
```

### Delivery sequence and duplicate window

```mermaid
sequenceDiagram
  autonumber
  participant P as Producer
  participant Q as Queue
  participant W as Worker
  participant DB as Database
  P->>Q: Publish job_id
  Q-->>P: Accepted
  Q->>W: Deliver job_id
  W->>DB: Apply effect with unique job_id
  DB-->>W: Commit
  W->>Q: ACK
  Note over W,Q: If worker crashes after commit but before ACK, job may be redelivered
  Q->>W: Redeliver same job_id
  W->>DB: Check idempotency key
  DB-->>W: Already applied
  W->>Q: ACK
```

## Reliability patterns

- At-least-once delivery + idempotent consumer.
- Transactional outbox for DB write + event publication.
- Inbox/dedupe table at consumer.
- Retry with exponential backoff and jitter.
- DLQ after bounded attempts; alert and provide replay tooling.
- Visibility/ack deadline should exceed normal processing or be extended.
- Poison messages need quarantine; do not hot-loop.
- Schema versioning and compatibility.

## Backpressure and sizing

Watch oldest message age, arrival rate vs completion rate, retry/DLQ rate, concurrency/saturation, per-tenant fairness and backlog drain time. Queue depth alone is not enough.

If backlog B remains after arrivals fall below worker capacity, and excess drain capacity is D messages/s, idealized drain time is B/D. This is a planning approximation, not a full queueing model.

## Queue or stream decision

```mermaid
flowchart TD
  A[Async requirement] --> B{Task to complete?}
  B -->|Yes| Q[Work queue]
  B -->|No: facts for multiple readers| C{Need retention and replay?}
  C -->|Yes| S[Event stream]
  C -->|No| P[Pub/sub or event router]
  Q --> R[Idempotency + retries + DLQ]
  S --> O[Partition key + offsets + consumer groups]
  P --> V[Delivery policy + subscriber isolation]
```

## References

- [ByteByteGo — Scale from Zero to Millions of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [Kafka documentation](https://kafka.apache.org/documentation/)
- [Amazon SQS developer guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Google Cloud Pub/Sub docs](https://cloud.google.com/pubsub/docs)
