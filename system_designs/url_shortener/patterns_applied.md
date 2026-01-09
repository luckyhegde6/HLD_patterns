# URL Shortener — Explicit Pattern Application (Senior-Level HLD)

This document explicitly maps system design patterns to the URL Shortener
architecture. Each pattern is explained in terms of **where it is used**, **why
it is needed**, **what trade-offs it introduces**, and **how to explain it in an interview**.

The goal is not to use many patterns, but to use **the right patterns deliberately**.

---

## 1. Sharding

### Where Sharding Is Applied
Sharding is applied at the **database layer** storing URL mappings.

Each shard stores a subset of:
shortCode → longUrl records.

---

### Shard Key Choice
**Shard Key:** hash(shortCode)

**Why**
- Uniform distribution
- Avoids time-based hot shards
- Predictable lookup pattern

---

### Why Sharding Is Needed
Without sharding:
- Write throughput becomes a bottleneck
- Storage capacity is limited
- Index size grows unbounded

Sharding enables **horizontal write and storage scaling**.

---

### Trade-offs
**Pros**
- Near-unlimited scalability
- Parallel writes

**Cons**
- Cross-shard joins impossible
- Operational complexity
- Resharding requires planning

---

### Interview Framing
“I shard only when writes or storage exceed single-node limits, because sharding
permanently increases system complexity.”

---

## 2. Consistent Hashing

### Where It Is Used
Consistent hashing is used for:
- Redis cache sharding
- Database shard routing

---

### Why Consistent Hashing Is Required
Naive hashing (hash % N) causes massive key reshuffling when nodes change.
This leads to cache invalidation storms and downtime.

---

### How It Works Here
- Hash space modeled as a ring
- Redis nodes placed on the ring
- shortCode maps to the nearest node
- Virtual nodes improve distribution

---

### Benefits
- Minimal key movement during scaling
- Faster cache warm-up
- Better load balance

---

### Trade-offs
- Additional metadata
- Slightly more complex routing logic

---

### Interview Framing
“Consistent hashing lets us scale caches and shards without operational disruption.”

---

## 3. Caching (Cache-Aside Pattern)

### Where Caching Is Applied
- Redis sits between API service and database
- CDN caches ultra-hot redirects globally

---

### Why Cache-Aside
- Simple mental model
- Cache failure does not break correctness
- Application controls invalidation

---

### Read Flow
1. Check Redis
2. On miss, query DB
3. Populate cache
4. Return response

---

### Failure Handling
- Cache failure → DB fallback
- Cache treated as optimization, not dependency

---

### Interview Framing
“I assume the cache will fail and design graceful fallbacks.”

---

## 4. Message Queues

### Where Queues Are Used
Queues are used for **non-critical asynchronous workflows**:
- Click analytics
- Abuse detection
- Monitoring
- Expired URL cleanup

---

### Why Queues Are Needed
Redirects are latency-sensitive.
Analytics must never block the hot path.

Queues decouple:
- User-facing latency
- Background processing

---

### Delivery Semantics
- At-least-once delivery
- Idempotent consumers
- Dead-letter queue for failures

---

### Trade-offs
**Pros**
- Failure isolation
- Burst absorption
- Lower latency

**Cons**
- Eventual consistency
- Duplicate handling required

---

### Interview Framing
“I keep the redirect path synchronous and push everything else to async queues.”

---

## 5. Event-Driven Architecture (EDA)

### Where EDA Is Applied
The system emits events for:
- URL creation
- URL redirection
- URL expiration

---

### Why Event-Driven Fits
- Loose coupling
- Independent scaling
- Easy feature extension

Events represent **facts**, not commands.

---

### Example Events
- UrlCreated
- UrlRedirected
- UrlExpired

---

### Benefits
- New consumers added without touching core service
- Replayable history for analytics
- Failure isolation

---

### Challenges
- Event schema versioning
- Debugging async flows

---

### Interview Framing
“EDA lets us extend functionality without slowing down the hot path.”

---

## 6. Saga Pattern (Partial Application)

### Is Full Saga Required?
No.

The URL Shortener domain is simple:
- Single-entity operations
- Minimal cross-service transactions

---

### Where Saga Concepts Apply
Lightweight saga-style compensation is used for:
- Custom alias reservation
- Metadata updates

---

### Example Flow
1. Reserve short code
2. Persist mapping
3. Emit UrlCreated event

If persistence fails → release reserved code.

---

### Why Not Full Saga?
- Overkill for simple flows
- Increases cognitive and operational complexity

---

### Interview Framing
“I avoid Saga unless multiple services must remain eventually consistent.”

---

## 7. Load Balancing & Proxies

### Where Used
- Load balancer distributes traffic to stateless API servers
- Reverse proxy handles TLS, routing, and rate limiting

---

### Why This Matters
- Enables horizontal scaling
- Removes single points of failure
- Centralizes cross-cutting concerns

---

### Interview Framing
“Stateless services plus load balancing is the foundation of horizontal scale.”

---

## 8. Cloud Architecture Patterns

### Deployment Philosophy
- Stateless compute
- Managed services
- Auto-scaling by default

---

### AWS Mapping
- Route53 → DNS
- ALB → Load Balancer
- ECS/EKS → API services
- ElastiCache → Redis
- DynamoDB → URL storage
- CloudFront → CDN

---

### GCP Mapping
- Cloud Load Balancer
- GKE
- Memorystore
- Firestore / Spanner

---

### Multi-Cloud Position
Active-passive preferred.
Active-active increases complexity without strong justification.

---

### Interview Framing
“I optimize for operational simplicity, not theoretical perfection.”

---

## 9. Failure Philosophy

### Designed-for Failures
- Cache outages
- Replication lag
- Hot keys
- Traffic spikes
- Region failures

---

### Key Principle
Fail **open** for redirects.
Availability is prioritized over strict consistency.

---

## 10. Pattern Summary Table

| Pattern               | Applied | Purpose |
|----------------------|--------|---------|
| Sharding             | Yes    | Scale writes & storage |
| Consistent Hashing   | Yes    | Minimize rebalancing |
| Cache-Aside          | Yes    | Low latency |
| Message Queues       | Yes    | Async processing |
| Event-Driven Arch    | Yes    | Extensibility |
| Saga Pattern         | Partial| Controlled rollback |
| Load Balancing       | Yes    | Horizontal scaling |
| CDN                  | Yes    | Global performance |

---

## Final Interview Narrative (2–3 Minutes)

“When designing this URL Shortener, I deliberately applied a small number of
well-understood patterns rather than over-engineering.

Caching and CDN keep redirects fast.
Sharding and consistent hashing allow horizontal growth.
Queues and events keep non-critical work off the hot path.
I avoid full Saga orchestration because the domain is simple.

Every pattern is applied only where it adds clear value.”

This demonstrates judgment, not memorization.
