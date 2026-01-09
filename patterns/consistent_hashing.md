# Consistent Hashing

Consistent hashing is a technique used to distribute keys across nodes such that
minimal keys are remapped when nodes are added or removed.

It is widely used in:
- Distributed caches
- Load balancers
- Sharded databases

---

## Problem with Naive Hashing

hash(key) % N causes massive remapping when N changes.

This makes scaling disruptive.

---

## How Consistent Hashing Works

- Hash space is treated as a ring
- Nodes are placed on the ring
- Keys map to the nearest node clockwise

Only a fraction of keys move when nodes change.

---

## Virtual Nodes (VNodes)

Each physical node owns multiple positions on the ring.

**Benefits**
- Better load distribution
- Smoother scaling
- Reduced hotspots

---

## Trade-offs

**Pros**
- Minimal rebalancing
- Predictable scaling

**Cons**
- More complex implementation
- Metadata overhead

---

## Interview Insight

Consistent hashing is not a silver bullet.
Ask:
- How many nodes?
- How often do nodes change?
- Is load evenly distributed?
