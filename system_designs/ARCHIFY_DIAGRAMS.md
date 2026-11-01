# Archify Visual Explainers

Each system design has:
- `visual_explainer.md`: GitHub-rendered architecture, critical sequence, failure/recovery diagram, invariants, AWS/GCP starter mapping, and a timed interview walkthrough.
- `archify/<slug>.architecture.json`: editable Archify architecture IR source.

## Generate interactive Archify HTML

The source candidates were authored to the Archify Architecture schema. This repository-editing environment does not have the Archify CLI/runtime installed, so interactive HTML exports are intentionally not committed as if they had been validated. Generate and validate them locally with the Archify skill installed:

```bash
node <path-to-archify>/bin/archify.mjs finalize architecture system_designs/<slug>/archify/<slug>.architecture.json system_designs/<slug>/archify/<slug>.architecture.html --quality showcase --json
```

Run from the repository root, replacing `<slug>` with a design folder name. Use the finalize receipt as the validation evidence; repair any schema/layout diagnostics before sharing the HTML.

## Evidence boundary

These are conceptual interview HLDs derived from the design notes, not reverse-engineered runtime architecture. Review component ownership, topology, data semantics, provider services and assumptions before treating a diagram as production design. The cloud table in each explainer is a starter mapping, not a claim that AWS and GCP products are exact equivalents.
