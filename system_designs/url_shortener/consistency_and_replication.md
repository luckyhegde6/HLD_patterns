# Consistency and Replication

---

## Consistency Model

Eventual consistency is acceptable.

Why?
- URL creation is rare
- Redirects tolerate slight delays

---

## Replication Strategy

- Async replication for reads
- Sync writes not required

---

## What Can Go Wrong?

### Replication Lag
- Redirect may miss newly created URL
- Acceptable trade-off

### Mitigation
- Route first redirect to primary
- Short TTL on negative cache
