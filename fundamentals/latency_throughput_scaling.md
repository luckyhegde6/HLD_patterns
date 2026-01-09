# Latency, Throughput, and Scaling

---

## Latency

Latency is the time taken for a single request to complete.

Sources of latency include:
- Network hops
- Disk I/O
- Serialization and deserialization
- Lock contention
- Cache misses

Users directly perceive latency, making it critical for user-facing systems.

---

## Throughput

Throughput measures how much work a system can handle per unit time.
Examples include:
- Requests per second
- Messages per second
- Transactions per second

A system may have low latency but poor throughput, or high throughput but unacceptable latency.

---

## Vertical Scaling

Vertical scaling increases the resources of a single machine.

### Advantages
- Simple to implement
- No architectural changes
- Immediate performance gains

### Limitations
- Hardware limits
- Single point of failure
- High cost at scale

Vertical scaling is a temporary optimization, not a long-term strategy.

---

## Horizontal Scaling

Horizontal scaling adds more machines to distribute load.

### Benefits
- Fault tolerance
- Elastic scalability
- Cost efficiency

### Challenges
- Distributed state
- Network failures
- Data consistency

Horizontal scaling introduces complexity but is essential for large systems.
