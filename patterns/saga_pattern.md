# Saga Pattern

The Saga pattern manages distributed transactions without locking resources
across services.

It replaces ACID transactions with a sequence of local transactions.

---

## Why Saga Exists

Microservices cannot use traditional distributed transactions reliably.

Sagas provide eventual consistency with explicit failure handling.

---

## Types of Sagas

### 1. Choreography
- Services emit events
- Other services react

**Pros**
- Decoupled
- Scalable

**Cons**
- Harder to trace flow

---

### 2. Orchestration
- Central coordinator manages steps

**Pros**
- Easier reasoning
- Clear flow

**Cons**
- Central dependency

---

## Compensation Actions

Each step has a compensating action to undo changes.

Example:
- Payment failed → cancel order

---

## Interview Insight

Interviewers test:
- Failure recovery
- Idempotency
- Partial rollback handling
