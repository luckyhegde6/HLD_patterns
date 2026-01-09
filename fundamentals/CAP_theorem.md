# CAP Theorem

The CAP theorem states that a distributed system can guarantee only two of the following three properties during a network partition:

- Consistency
- Availability
- Partition Tolerance

Partition tolerance is mandatory in real distributed systems, making the true trade-off between consistency and availability.

---

## Consistency

All clients see the same data at the same time.
Strong consistency prioritizes correctness over availability.

Used in:
- Banking systems
- Inventory management

---

## Availability

The system always responds to requests, even during failures.
Availability may return stale or inconsistent data.

Used in:
- Social media feeds
- Analytics systems

---

## Practical Insight

CAP is about failure behavior, not databases.
Understanding CAP helps explain why systems behave differently under failure.
