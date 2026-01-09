# System Design Overview

System design is the discipline of defining how a software system is structured,
how its components interact, and how it behaves under scale, failure, and growth.

System design is not about frameworks or APIs.
It is about building systems that survive real-world conditions.

---

## Why System Design Exists

Most systems fail for predictable reasons:
- Traffic increases beyond expectations
- Hardware fails
- Networks become unreliable
- Data grows faster than planned
- Teams and requirements change

System design exists to anticipate these realities and reduce their impact.

---

## Functional vs Non-Functional Requirements

### Functional Requirements
Define what the system does.
Examples:
- Create a short URL
- Send a message
- Process a payment

### Non-Functional Requirements
Define how well the system must perform.
Examples:
- Latency
- Availability
- Scalability
- Durability
- Cost

Senior engineers prioritize non-functional requirements because they shape architecture decisions.

---

## Core Principle

Every system design is a set of trade-offs.
There is no perfect design, only designs optimized for specific constraints.
