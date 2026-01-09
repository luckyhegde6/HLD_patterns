# Message Queues and Streams

---

## Why Asynchronous Systems Exist

Synchronous systems block callers and propagate failures.
Asynchronous systems decouple components and absorb traffic spikes.

---

## Message Queues

- Messages processed once
- Used for background tasks
- Ensures decoupling

Examples:
- Email delivery
- Order processing

---

## Message Streams

- Messages retained and replayable
- Multiple consumers
- Used for analytics and event sourcing

---

## Reliability Considerations

- At-least-once delivery
- Idempotent consumers
- Dead-letter queues

Reliability is achieved through careful design, not guarantees.
