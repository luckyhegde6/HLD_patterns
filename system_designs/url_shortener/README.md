# URL Shortener – High Level Design

## 1. Problem Statement
Shorten long URLs and redirect users reliably at scale.

## 2. Requirements
### Functional
- Generate short URL
- Redirect to original URL

### Non-Functional
- Low latency (<50ms)
- High availability (99.99%)
- Horizontal scalability
- Analytics support (optional)

## 3. Capacity Estimation
- Read QPS
- Write QPS
- Storage growth per year

## 4. High-Level Architecture
(Insert diagram)

## 5. Data Model
- Key → Value mapping
- Indexing strategy

## 6. Core Components
- API Gateway
- URL Service
- Cache
- Database

## 7. Scaling Strategy
- Caching (Redis)
- Sharding
- Read replicas

## 8. Failure Scenarios
- Cache miss storm
- DB outage
- Hot keys

## 9. Trade-offs
- SQL vs NoSQL
- Base62 vs hash
- Strong vs eventual consistency

## 🔥 MASTER PROMPT — URL Shortener (TypeScript, Deployable)
```
You are a senior backend engineer and system architect.

Build a fully deployable URL Shortener application in **TypeScript**, strictly following
a production-grade High Level Design inspired by ByteByteGo and senior system design interviews.

========================
ARCHITECTURAL CONSTRAINTS
========================

1. Architecture
- Stateless backend services
- Cache-first read path
- Eventual consistency
- Availability prioritized over strong consistency

2. Core Components
- Backend: Node.js + TypeScript
- Framework: Express OR Fastify (choose one and justify briefly in comments)
- Cache: Redis
- Database: NoSQL (MongoDB or DynamoDB-style abstraction)
- Frontend: Minimal UI (HTML + CSS or minimal React) ONLY for:
  - Input long URL
  - Display shortened URL
- Deployment: Docker + docker-compose

3. Short Code Strategy
- Use Base62 encoding
- Generate short codes from a monotonically increasing ID
- Avoid hashing collisions

4. Data Model
ShortUrl {
  shortCode: string (primary key)
  longUrl: string
  createdAt: Date
  expiresAt?: Date
}

========================
FUNCTIONAL REQUIREMENTS
========================

- POST /shorten
  - Accepts a long URL
  - Returns a short URL
- GET /:shortCode
  - Redirects to the original URL
- Optional:
  - URL expiration
  - Custom alias

========================
NON-FUNCTIONAL REQUIREMENTS
========================

- Redirect latency < 50ms (cache hit)
- Horizontal scalability
- Cache-aside strategy
- Graceful degradation on cache failure

========================
SYSTEM DESIGN REQUIREMENTS
========================

Implement:
- Cache-aside strategy (Redis → DB fallback)
- TTL-based cache expiration
- Negative caching for missing keys
- Rate limiting on URL creation
- Basic input validation
- Structured logging
- Health check endpoint

========================
CODE QUALITY REQUIREMENTS
========================

- Strict TypeScript
- Clear folder structure
- SOLID principles where applicable
- Comments explaining WHY decisions were made
- No unnecessary abstractions
- Environment-based configuration

========================
PROJECT STRUCTURE
========================

Generate the full project with:
- /backend
  - /src
    - routes
    - services
    - repositories
    - cache
    - utils
    - config
  - Dockerfile
- /frontend
  - Minimal UI (no heavy styling)
- docker-compose.yml
- README.md with:
  - Architecture explanation
  - How to run locally
  - Design trade-offs
  - Scaling & failure discussion

========================
ADVANCED CONSIDERATIONS
========================

- Add Mermaid diagram in README.md
- Include a 10-minute interview walkthrough section
- Add notes on:
  - Scaling
  - Failure modes
  - Security considerations
  - Cost optimizations

========================
OUTPUT INSTRUCTIONS
========================

- Generate all necessary files
- Provide complete, runnable code
- Do NOT skip implementations
- Do NOT over-engineer
- Assume this will be reviewed by a senior interviewer

This is a production system, not a demo.

```