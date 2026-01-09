# Databases and Storage

---

## Choosing a Database

Database choice depends on:
- Access patterns
- Consistency requirements
- Query complexity
- Scalability needs

There is no universally correct database.

---

## SQL Databases

### Strengths
- ACID guarantees
- Strong consistency
- Complex queries and joins

### Weaknesses
- Harder to scale writes
- Vertical scaling limitations

---

## NoSQL Databases

### Strengths
- Horizontal scalability
- Flexible schemas
- High availability

### Weaknesses
- Limited transactions
- Application-level joins

---

## Sharding

Sharding splits data across multiple databases.

### Benefits
- Storage scalability
- Increased write throughput

### Challenges
- Hot shards
- Rebalancing complexity
- Cross-shard queries

Sharding trades simplicity for scalability.
