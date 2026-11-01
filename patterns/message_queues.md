# Message Queues

Message queues enable asynchronous communication between services. They decouple producers from consumers and absorb bursts, but they introduce delivery, ordering, retry and operational semantics that must be designed explicitly.

## 1. Core architecture

```mermaid
flowchart LR
    P[Producer] -->|Publish event/message| B[(Broker)]
    B -->|Deliver / poll| C1[Consumer A]
    B -->|Deliver / poll| C2[Consumer B]
    C1 -->|Success / ack| B
    C2 -->|Retry exhausted| DLQ[(Dead-letter Queue)]
    C1 -.-> OBS[Lag / throughput / error metrics]
    C2 -.-> OBS
```

## 2. Message lifecycle

```mermaid
sequenceDiagram
    participant Producer
    participant Broker
    participant Consumer
    participant Store as Consumer DB
    Producer->>Broker: Publish(messageId, payload)
    Broker-->>Producer: Accepted / confirmation
    Consumer->>Broker: Receive message
    Consumer->>Store: Apply idempotent effect
    Store-->>Consumer: Commit
    Consumer->>Broker: Ack
    Note over Broker,Consumer: If ack is lost, message may be delivered again
```

Ack after the business effect commits. If the process crashes after commit but before ack, redelivery can happen; idempotency is mandatory.

## 3. Retry and DLQ flow

```mermaid
flowchart TD
    A[Receive message] --> B[Validate schema]
    B --> C{Valid?}
    C -->|No| D[Quarantine / DLQ]
    C -->|Yes| E[Execute idempotent handler]
    E --> F{Succeeded?}
    F -->|Yes| G[Commit effect then ACK]
    F -->|No| H{Retryable and budget remains?}
    H -->|Yes| I[Backoff + jitter]
    I --> A
    H -->|No| D
```

## 4. Delivery semantics

- At-most-once: message may be lost, but is not redelivered.
- At-least-once: redelivery is possible; idempotent consumers required.
- “Exactly once” is generally scoped to a broker/transaction boundary and does not automatically guarantee exactly-once external side effects.

## 5. Backpressure and scaling

- Monitor queue depth, oldest-message age and consumer lag.
- Scale workers against backlog while respecting downstream quotas.
- Bound concurrency and batch size.
- Use partition keys only when ordering is required; a hot partition limits parallelism.
- Apply producer backpressure or load shedding during sustained overload.

## 6. AI / agentic implementation guidance

Queues are useful for long-running AI workflows, batch inference, tool jobs and human approval tasks. Avoid keeping a model request open while a workflow waits hours for user approval.

Require:
- durable workflow/task ID and correlation ID
- payload schema and version
- idempotency key and deduplication window
- retry budget by error class
- poison-message handling and manual replay
- visibility timeout / lease renewal design
- tenant fairness and per-provider quotas
- prompt, model and tool versions captured in audit metadata (without storing secrets)
- safe cancellation and compensation semantics

**Prompt:** “Design an at-least-once queue workflow for AI task execution. Define message schema/version, dedupe key, state machine, retryable errors, DLQ replay, tenant fairness and observability. Test crash after side effect before ack, duplicate delivery, poison payload and downstream throttling.”

## Interview insight

Know who owns the message, when it is acknowledged, what happens after a crash, how duplicates are handled, and how a lagging consumer recovers.
