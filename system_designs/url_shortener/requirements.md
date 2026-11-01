# URL Shortener — Requirements and Capacity Assumptions

## Functional requirements

- Generate a short URL for a given long URL.
- Redirect users from a short URL to its original URL.
- Optional custom aliases.
- Optional URL expiration.

## Non-functional requirements

- Low-latency redirects: the stated target is under 50 ms on a cache hit.
- High availability: the stated target is 99.99%.
- Horizontal scalability.
- Durable storage; URLs should not be lost.
- Read-heavy access pattern.

## Supplied traffic assumptions

| Input | Assumption |
|---|---:|
| New URLs per day | 1,000,000 |
| Redirects per day | 100,000,000 |
| Read/write ratio | 100:1 |
| Average long URL | 100 bytes |
| Short code | 7 bytes |
| Additional metadata | 50 bytes |
| Approx. mapping record | 160 bytes |

## Derived throughput

- Writes: 1,000,000 / 86,400 ≈ 11.6 requests/s (rounded to ~12).
- Reads: 100,000,000 / 86,400 ≈ 1,157 requests/s (rounded to ~1,200).

These are daily averages. Peak QPS requires a peak-to-average multiplier and traffic distribution, neither of which is specified in the original assumptions.

## Storage estimate

1,000,000 URLs/day × 365 days × 160 bytes ≈ 58.4 GB/year.

This is raw record payload only. Indexes, replicas, backups, tombstones, analytics events and database overhead increase actual provisioned storage. URL expiry and deletion can reduce retained data; no retention assumption is supplied.

## Capacity and latency diagrams

See [illustrative charts](architecture.md#9-latency-and-capacity-visuals). The latency breakdown is a design budget, not measured performance. Use production traces to validate p50/p95/p99.

## Open questions for an interview

- What peak-to-average traffic ratio should be planned for?
- Are redirects permanent (301) or temporary (302)?
- Is custom alias uniqueness global or tenant-scoped?
- Can a just-created URL be redirected immediately (read-after-write)?
- How quickly must a revoked URL stop redirecting globally?
- What is the expected retention and expiry behavior?
- Are analytics required, and at what granularity?
- What are the RTO and RPO targets for regional failure?