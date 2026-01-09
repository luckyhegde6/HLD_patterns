# Scaling Strategy

## Read Scaling

- Cache frequently accessed URLs
- Replicate database for read-heavy traffic

## Write Scaling

- Writes are low compared to reads
- Can shard database by short_code

## Service Scaling

- Stateless services
- Horizontal scaling using load balancer



## Hot Key Problem

Some URLs become extremely popular.

### Why This Is Dangerous
- Single Redis key gets millions of requests
- Causes CPU and network bottlenecks

### Mitigations
- Replicate hot keys
- Client-side caching
- CDN caching
- Rate limiting abusive clients

---

## Database Sharding Strategy

Shard by:
- short_code hash

Avoid sharding by:
- creation time (causes hot shards)

---

## Read Replicas

- Redirect traffic mostly hits replicas
- Writes go to primary
- Replication lag acceptable

---

## Auto Scaling

- Scale API servers on:
  - CPU
  - QPS
  - Latency percentiles