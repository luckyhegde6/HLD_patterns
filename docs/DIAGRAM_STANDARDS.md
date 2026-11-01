# HLD Diagram and Visual Explainer Standards

Use this standard for every future system design and architecture pattern in this repository.

## Diagram set

| Diagram | Question answered | Mermaid choice |
|---|---|---|
| System context | Who uses the system and which external systems does it depend on? | `flowchart` |
| Container/component | What deployable units exist and who owns each responsibility? | `flowchart` |
| Critical sequence | What happens across services for the important request? | `sequenceDiagram` |
| State / workflow | How does a task, transaction or request move through states? | `stateDiagram-v2` or `flowchart` |
| Data model | What are the entities, keys and relationships? | `erDiagram` |
| Deployment | Where do components run and what are the trust boundaries? | `flowchart` with subgraphs |
| Decision / recovery | What happens on timeout, retry, duplicate, outage or poison data? | `flowchart` |
| Capacity / performance | How does load or latency change under stated assumptions? | Mermaid `xychart-beta` or a small sourced table |

## Quality rules

1. Give every diagram a title and a short paragraph explaining what to notice.
2. Label sync calls, async events, storage reads/writes and trust boundaries differently.
3. Show ownership: service, database, queue and cache responsibilities must be clear.
4. Show failure paths, not only the happy path.
5. Avoid implying exactly-once delivery unless the end-to-end protocol truly provides it.
6. Keep a diagram at one level of abstraction. Do not mix process internals with regional infrastructure.
7. Make assumptions visible. Put measured values and estimates in separate labels.
8. A chart must include axes, units, time horizon and source/assumptions. Never invent benchmark measurements.
9. Prefer Mermaid source committed in Markdown. SVG exports are supplemental and must remain consistent with the Mermaid source.
10. Keep diagrams readable on GitHub: short node labels, direction that suits the flow, and a small number of components per view.

## Recommended per-pattern document

- Problem and forces
- When to use / when not to use
- Context and component view
- Sequence or lifecycle diagram
- Flowchart for failure/recovery decisions
- Operational consequences
- Security / tenancy considerations
- Cost and complexity
- AI/agentic augmentation: where useful and where it is unsafe
- Interview explanation and likely follow-up questions

## Charts

Use charts to teach trade-offs rather than decorate:
- Latency budget breakdown: distinguish target budget from measured latency.
- Capacity growth: state assumed traffic growth and record sizes.
- Cache hit-rate sensitivity: show an illustrative model and label it as such.
- Queue backlog: describe producer and consumer assumptions.
- Cost comparisons: state region, provider, SKU, time window and data transfer assumptions; otherwise present qualitative comparisons only.

## SVG assets

Standalone SVGs should:
- use a viewBox, responsive width and height, accessible title/description
- use readable text and high contrast
- avoid remote fonts and embedded external images
- include a small footer such as “Conceptual architecture — validate against requirements”
- be generated from the same source specification as the Mermaid diagram where feasible
