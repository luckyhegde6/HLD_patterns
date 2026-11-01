# System Designs

This directory contains interview-ready HLDs using a consistent format: requirements/workload, architecture and Mermaid diagrams, data model, failure handling, trade-offs, AI/FDE implementation guidance and interview walkthrough.

| Design | Primary focus |
|---|---|
| [API Gateway](api-gateway/README.md) | Routing, auth, quotas and policy enforcement |
| [Cache System](cache-system/README.md) | Cache strategies, freshness and stampede protection |
| [Circuit Breaker](circuit-breaker/README.md) | Dependency resilience and recovery |
| [Distributed ID Generator](distributed-id-generator/README.md) | Unique sortable IDs across nodes |
| [Elevator System](elevator-system/README.md) | Dispatching, state and safety |
| [Feature Flag System](feature-flag-system/README.md) | Targeting, rollout and kill switches |
| [Logger Framework](logger-framework/README.md) | Structured logs, ingestion and retention |
| [Message Queue](message-queue/README.md) | Durable delivery, ordering and consumers |
| [Notification System](notification-system/README.md) | Multi-channel fanout and preferences |
| [Parking Lot](parking-lot/README.md) | Allocation, tickets and payment |
| [Payment Processing](payment-processing/README.md) | Idempotent financial workflows and reconciliation |
| [Rate Limiter](rate-limiter/README.md) | Distributed quotas and algorithms |
| [Splitwise System](splitwise-system/README.md) | Expense ledger, balances and settlement |
| [Task Scheduler](task-scheduler/README.md) | Durable delayed jobs and workers |
| [Ticket Booking](ticket-booking/README.md) | Scarce inventory and oversell prevention |
| [Customer Support AI Agent](customer-support-ai-agent/README.md) | Enterprise agent workflow, governed tools and human approvals |

**Suggested study order:** API Gateway → Rate Limiter → Cache → Circuit Breaker → Message Queue → Notification → Task Scheduler → Distributed ID → Payment → Ticket Booking → remaining domain systems → Customer Support AI Agent.

Capacity/latency numbers must be labeled as measured or illustrative. See [diagram standards](../docs/DIAGRAM_STANDARDS.md) and [AI/agentic implementation guidelines](../docs/AI_AGENTIC_IMPLEMENTATION_GUIDELINES.md).
