# Trade-offs — Distributed Logging

- Hot index offers fast search but costs more; cold object storage is cheaper with slower query.
- Push ingestion is low-latency but needs backpressure; pull can simplify flow control but adds delay.
- Schema-on-write improves query quality but risks rejecting new fields; query-time parsing is flexible but expensive.
- Shared multi-tenant infrastructure improves utilization but needs quotas, isolation and noisy-neighbor controls.
- Sampling reduces cost but can hide rare incidents; preserve error/high-severity events and make sampling visible.
