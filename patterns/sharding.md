# Sharding

Sharding is a database scaling technique where data is split across multiple
independent databases (shards), each holding a subset of the data.

The primary goal of sharding is to scale **writes and storage** beyond the limits
of a single database instance.

---

## Why Sharding Exists

Databases hit limits in:
- Disk capacity
- Write throughput
- Index size
- Query latency

Vertical scaling delays the problem.
Sharding solves it by distributing data.

---

## Common Sharding Strategies

### 1. Hash-Based Sharding
Shard = hash(key) % N

**Pros**
- Uniform data distribution
- Simple lookup

**Cons**
- Resharding is expensive
- Adding/removing shards causes massive data movement

---

### 2. Range-Based Sharding
Shard by key ranges (e.g., user_id 1–1M)

**Pros**
- Range queries are efficient
- Easy to reason about

**Cons**
- Hot shards
- Uneven load distribution

---

### 3. Directory-Based Sharding
Central service maps keys to shards.

**Pros**
- Flexible
- Easy resharding

**Cons**
- Directory becomes a dependency
- Additional lookup latency

---

## Challenges Introduced by Sharding

- Cross-shard joins
- Distributed transactions
- Hot partitions
- Operational complexity

Sharding solves scale by trading simplicity for control.

---

## Interview Insight

If sharding is proposed, interviewers will ask:
- How do you reshard?
- What happens to hot shards?
- How do you handle cross-shard queries?
