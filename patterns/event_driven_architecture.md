# Event-Driven Architecture (EDA)

Event-driven architecture is a design paradigm where services communicate
by emitting and reacting to events.

---

## Why Event-Driven Systems Exist

- Loose coupling
- Independent scaling
- Better extensibility

Events represent facts, not commands.

---

## Core Components

- Event producers
- Event consumers
- Event broker / stream

---

## Event Streams vs Message Queues

- Streams retain events
- Consumers can replay history
- Multiple consumers read same events

EDA is often implemented using streams.

---

## Benefits

- Scalability
- Fault isolation
- Auditability

---

## Challenges

- Event versioning
- Debugging
- Eventual consistency

---

## Interview Insight

EDA shifts complexity from control flow to data flow.
Explain how you handle schema evolution.
