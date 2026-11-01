# High-Level Design Patterns & AI Systems Architecture

A visual, interview-focused High-Level Design (HLD) learning repository. The goal is to move beyond memorized architecture diagrams: understand workload shape, derive constraints, choose patterns deliberately, model failure, and communicate trade-offs.

## Learning paths

| Path | Start here | Outcome |
|---|---|---|
| HLD interview foundations | [Approach an HLD](fundamentals/how_to_approach_system_design.md) · [Interview playbook](playbook/how_to_approach_hld.md) | Structured 45–60 minute system-design discussion |
| Architecture fundamentals | [Fundamentals](fundamentals/) | Explain latency, consistency, caching, queues, data stores and scaling |
| Distributed patterns | [Patterns](patterns/) | Select sharding, consistent hashing, EDA, queues and sagas with clear trade-offs |
| Cloud architecture | [Cloud architecture](cloud_architecture/) | Map logical designs to AWS, GCP and multi-cloud deployments |
| Worked systems | [System designs](system_designs/README.md) | Trace requirements, architecture, APIs, data, failure and scale |
| AI Architect / FDE | [AI & FDE playbook](playbook/ai_architect_fde_playbook.md) | Discover a workflow, evaluate AI fit, integrate models/tools and ship safely |

## Repository map

- `fundamentals/` — core distributed-systems concepts
- `patterns/` — reusable architecture patterns
- `cloud_architecture/` — provider reference architectures
- `system_designs/` — 15 requested worked HLDs plus URL Shortener and Customer Support AI Agent
- `playbook/` — interview methods and implementation playbooks
- `docs/` — shared diagram conventions, AI implementation checklists and visual explainers

## The universal HLD method

1. Clarify actors, functional requirements and explicit non-goals.
2. Quantify traffic, storage, payload sizes, growth and latency budgets.
3. State availability, consistency, durability, security and compliance targets.
4. Draw context and container diagrams; define APIs and ownership boundaries.
5. Model data, access patterns, partition keys, indexes and lifecycle.
6. Walk through write, read, asynchronous and failure sequences.
7. Scale bottlenecks only when workload estimates justify the complexity.
8. Threat-model the system; define observability, deployment and recovery.
9. Explain alternatives, costs, risks and what would trigger a redesign.

## Visual standard

Every worked system should aim to include:
- Context diagram and container/component architecture (Mermaid)
- At least one sequence diagram for its critical path
- Flowchart for a decision, retry, or failure-handling path
- Data model / entity relationship view where useful
- Workload/capacity charts with assumptions and units
- Deployment or cloud mapping and observability view
- AI/agentic extension view only when the domain benefits from it

All diagrams should be editable text sources (Mermaid or SVG). Diagrams are explanatory models, not proof of production readiness.

## Agentic implementation standard

Use the [AI / Agentic HLD checklist](docs/AI_AGENTIC_IMPLEMENTATION_GUIDELINES.md) with every system. Agents must inspect the repository, propose a design before broad edits, implement thin vertical slices, add failure-path tests, and report exact verification results. Never let a model grant itself permissions or treat generated tool arguments as trusted.

## Worked systems

See the [System Designs catalog](system_designs/README.md) for the full index and study order. The catalog includes API Gateway, Cache System, Circuit Breaker, Distributed ID Generator, Elevator System, Feature Flag System, Logger Framework, Message Queue, Notification System, Parking Lot, Payment Processing, Rate Limiter, Splitwise, Task Scheduler, Ticket Booking and Customer Support AI Agent.

## Worked example: URL Shortener

- [System overview](system_designs/url_shortener/README.md)
- [Architecture and diagrams](system_designs/url_shortener/architecture.md)
- [Requirements and estimates](system_designs/url_shortener/requirements.md)
- [Patterns and trade-offs](system_designs/url_shortener/patterns_applied.md)
- [AI Architect / FDE implementation guide](system_designs/url_shortener/AI_FDE_IMPLEMENTATION.md)

## Diagram rendering

GitHub renders Mermaid blocks in Markdown. SVGs in `docs/diagrams/` provide stable standalone visuals. Mermaid sources remain canonical so reviewers can diff changes. Do not add screenshots of diagrams when an editable source provides the same information.

## Learning principle

**A strong HLD is a set of explicit, testable decisions—not a collection of boxes.** Every box needs an owner, every arrow a contract, every store a data model, every async flow a recovery strategy, and every scaling decision a workload-based reason.
