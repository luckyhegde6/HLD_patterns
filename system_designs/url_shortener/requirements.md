# Requirements

## Functional Requirements

- Generate a short URL for a given long URL
- Redirect users from short URL to original URL
- Support custom aliases (optional)
- Support URL expiration (optional)

---

## Non-Functional Requirements

- Low latency redirects (< 50 ms)
- High availability (99.99%)
- Horizontally scalable
- Durable storage (URLs should not be lost)
- Read-heavy system

# Capacity Estimation

## Traffic Assumptions

- New URLs created per day: 1 million
- Redirects per day: 100 million
- Read-to-write ratio: 100:1

---

## Storage Estimation

Assume:
- Average long URL length: 100 bytes
- Short code: 7 bytes
- Metadata: 50 bytes

Total per record ≈ 160 bytes

Yearly storage:
1M URLs/day × 365 × 160 bytes ≈ 58 GB/year

---

## Throughput Estimation

- Writes: ~12 requests/sec
- Reads: ~1,200 requests/sec

Conclusion: System is **read-heavy**, making caching mandatory.

# High Level Architecture

The system is composed of stateless services backed by a cache and a persistent database.

## Core Components

- Client (Browser / Mobile App)
- Load Balancer
- API Gateway
- URL Service
- Cache (Redis)
- Database (NoSQL)

# Core Components

## Load Balancer
- Distributes traffic across API servers
- Improves availability and scalability

## API Gateway
- Handles authentication, validation, and routing
- Shields backend services

## URL Service
- Generates short codes
- Handles redirects
- Stateless to allow horizontal scaling

## Cache (Redis)
- Stores hot URL mappings
- Reduces database load
- Improves latency

## Database
- Persistent storage for URL mappings
- Optimized for key-value access
