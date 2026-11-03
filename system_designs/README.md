# System Designs — HLD, OOD and GenAI Case Studies

This repository is a practical interview workbook. Each design should answer: what is being built, what invariants matter, how requests/data move, what breaks first and why the trade-offs fit the workload.

## Learning tracks

| Track | Goal | Start here |
|---|---|---|
| HLD | Service boundaries, scale, consistency and recovery | [Scale from zero to millions](scale-from-zero-to-millions/README.md) |
| LLD / OOD | Domain objects, state machines, interfaces, SOLID and tests | [OOD interview guide](../object_oriented_design/README.md) |
| GenAI system design | Data, retrieval, evaluation, inference, guardrails and cost | [GenAI system design](../genai_system_design/README.md) |
| Workload experiments | Deterministic capacity, queueing and failure simulations | [Breakscale guide](BREAKSCALE_TESTING.md) |
| Architecture visuals | Editable Archify diagrams and rendered HTML | [Archify exports](ARCHIFY_DIAGRAMS.md) |

## Full Archify design catalog

The following 17 designs have editable Archify architecture sources, visual explainers and interview walkthroughs. The [System design docs and Archify exports workflow](../.github/workflows/system-designs.yml) validates and exports these designs.

| Design | Primary topic |
|---|---|
| [API Gateway](api-gateway/README.md) | Routing, auth, quotas and policy |
| [Cache System](cache-system/README.md) | Cache-aside, invalidation and stampede protection |
| [Circuit Breaker](circuit-breaker/README.md) | Failure windows and recovery |
| [Distributed ID Generator](distributed-id-generator/README.md) | Unique IDs, clock skew and coordination |
| [Elevator System](elevator-system/README.md) | Scheduling, state machine and safety override |
| [Feature Flag System](feature-flag-system/README.md) | Control plane, evaluation and kill switch |
| [Logger Framework](logger-framework/README.md) | Ingestion, backpressure, sampling and retention |
| [Message Queue](message-queue/README.md) | Delivery, ordering, retries, DLQ and replay |
| [Notification System](notification-system/README.md) | Channel fanout, preferences and provider quotas |
| [Parking Lot](parking-lot/README.md) | Allocation, ticket lifecycle and concurrency |
| [Payment Processing](payment-processing/README.md) | Idempotency, ledger and reconciliation |
| [Rate Limiter](rate-limiter/README.md) | Admission control and distributed quotas |
| [Splitwise](splitwise-system/README.md) | Ledger and settlement |
| [Task Scheduler](task-scheduler/README.md) | Leases, retries and duplicate execution |
| [Ticket Booking](ticket-booking/README.md) | Scarce inventory and oversell prevention |
| [Customer Support AI Agent](customer-support-ai-agent/README.md) | Retrieval ACL, governed tools and human approvals |
| [URL Shortener](url_shortener/README.md) | Read-heavy path, cache and redirects |

## Additional worked examples

| [Event-Driven Order Platform](examples/event-driven-order-platform/README.md) | Order saga, inventory reservation, payment idempotency and outbox/inbox |
| [Observability Platform](examples/observability-platform/README.md) | Metrics/logs/traces ingestion, cardinality, query federation and tenant quotas |
| [Multi-Tenant SaaS Control Plane](examples/multi-tenant-saas-control-plane/README.md) | Tenant lifecycle, isolation, cells, metering and control/data-plane split |


These are original focused case studies. They add architecture and sequence examples but are not yet part of the 17-design Archify export set.

| Example | Focus |
|---|---|
| [Chat / Messaging](examples/chat-messaging/README.md) | Durable messaging, ordering, WebSockets, offline delivery and fanout |
| [Social Feed / Timeline](examples/social-feed-timeline/README.md) | Fanout-on-write/read, ranking and freshness |
| [Search / Autocomplete](examples/search-autocomplete/README.md) | Indexing, prefix search, ranking and query cache |
| [Object Storage / File Sharing](examples/object-storage-file-sharing/README.md) | Signed uploads, metadata, ACL, async processing and deletion |
| [LLM Inference Gateway](examples/llm-inference-gateway/README.md) | Model routing, quotas, fallbacks, token budgets and cost |
| [RAG Knowledge Assistant](examples/rag-knowledge-assistant/README.md) | ACL-aware retrieval, citations, evaluation and prompt-injection boundaries |
| [Scale from Zero to Millions](scale-from-zero-to-millions/README.md) | Progressive architecture evolution |

## GenAI product case studies

Ten original GenAI HLD walkthroughs are available in the [GenAI case-study catalog](genai/README.md): Gmail Smart Compose, Google Translate, personal assistant chatbot, image captioning, RAG, realistic face generation, high-resolution image synthesis, text-to-image, personalized headshots and text-to-video. These are focused Markdown case studies, separate from the Archify export set.

## Suggested study order

API Gateway → Rate Limiter → Cache → Circuit Breaker → Message Queue → Notification → Task Scheduler → Distributed ID → Payment → Ticket Booking → Chat → Feed → Search → Object Storage → LLM Gateway → RAG Assistant.

## Definition of done for a system

- Functional and non-functional requirements; assumptions labeled.
- Workload estimates with units and provenance.
- Component architecture, data model and API contracts.
- One read and one write sequence.
- Failure/recovery flow and core invariants.
- Consistency, idempotency, retries and backpressure.
- Security, tenant boundaries, audit and privacy.
- Capacity/cost discussion and observability signals.
- HLD walkthrough and relevant LLD/OOD implementation prompts.
- Breakscale scenario where it models real behavior; explicitly document omissions.
- Editable diagram source and references/credits.

See [diagram standards](../docs/DIAGRAM_STANDARDS.md), [AI/agentic implementation guidelines](../docs/AI_AGENTIC_IMPLEMENTATION_GUIDELINES.md) and [cloud architecture guide](../cloud_architecture/README.md).

## Expanded modern platform catalog

See [EXPANDED_CATALOG.md](EXPANDED_CATALOG.md) for YouTube, WhatsApp, Twitter/X, Instagram, rideshare, food delivery, Netflix, Google Drive, Maps, autocomplete, notifications and distributed logging. The designs include requirements, architecture, data models, failure modes, trade-offs, interview walkthroughs, visual explainers and AI/FDE implementation notes.

## Five-layer AI runtime

See [AI Runtime Layers](../genai_system_design/ai_runtime_layers/README.md) for Prompt, Context, Harness, Loop and Graph responsibilities, sequence diagrams, MCP example and safety checklist.
