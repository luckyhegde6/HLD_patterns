# Caching Strategies

---

## Why Caching Exists

Caching reduces latency and load by storing frequently accessed data closer to the application.
Memory access is significantly faster than disk or network calls.

---

## Cache Placement

Common cache layers include:
- Client-side cache
- CDN
- Application cache (e.g., Redis)
- Database cache

Closer caches reduce latency but increase invalidation complexity.

---

## Cache Invalidation

Cache invalidation is the hardest part of caching.

Common strategies:
- Time-to-live (TTL)
- Cache-aside (lazy loading)
- Write-through
- Write-back

Cache-aside is the most widely used due to simplicity and flexibility.

---

## Failure Modes

- Cache stampede
- Hot keys
- Stale data

Well-designed systems treat caches as optional optimizations, not dependencies.
