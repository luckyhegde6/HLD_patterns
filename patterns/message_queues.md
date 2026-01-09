# Message Queues

Message queues enable asynchronous communication between services.

They decouple producers from consumers and absorb traffic spikes.

---

## Why Queues Exist

Synchronous systems:
- Block callers
- Cascade failures
- Scale poorly under spikes

Queues isolate failures and smooth load.

---

## Core Concepts

- Producer: sends messages
- Consumer: processes messages
- Broker: stores and delivers messages

---

## Delivery Semantics

- At-most-once
- At-least-once (most common)
- Exactly-once (expensive and rare)

Reliable systems are built assuming **at-least-once** delivery.

---

## Common Use Cases

- Background jobs
- Email and notifications
- Payment processing
- Log ingestion

---

## Failure Handling

- Retries
- Dead-letter queues
- Idempotent consumers

---

## Interview Insight

Expect questions on:
- Message ordering
- Duplicate handling
- Backpressure
