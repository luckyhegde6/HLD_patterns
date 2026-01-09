# Deep Interview Questions and Answers

---

## Why Not Use Hashing?

Hashing risks collisions and requires collision resolution.
Base62 encoding avoids this entirely.

---

## Why Not Strong Consistency?

Strong consistency increases latency and reduces availability.
Redirect systems prioritize availability.

---

## How Would You Support Analytics?

- Async event stream
- Separate analytics pipeline
- Avoid polluting hot path

# Final 10-Minute Senior Interview Walkthrough

## 0–1 min: Clarify Requirements
"This is a read-heavy redirect system prioritizing low latency and availability."

## 1–2 min: Estimate Scale
"Millions of writes per day, hundreds of millions of reads."

## 2–4 min: Core Architecture
"Stateless services, Redis cache, NoSQL DB, CDN in front."

## 4–6 min: Data & Short Code
"Key-value schema with Base62 encoding."

## 6–7 min: Scaling
"Cache aggressively, shard DB, auto-scale services."

## 7–8 min: Failures
"Design for cache failure, replication lag, region outages."

## 8–9 min: Trade-offs
"Eventual consistency, availability-first design."

## 9–10 min: Extensions
"Analytics via async pipelines, security via rate limiting."

Closing: "This design keeps the hot path fast and failure-tolerant."
