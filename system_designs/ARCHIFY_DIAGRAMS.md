# Archify Visual Explainers

Each of the 17 worked system designs has:
- `visual_explainer.md`: GitHub-rendered architecture, critical sequence, failure/recovery flow, invariants, AWS/GCP starter mapping, and a timed interview walkthrough.
- `archify/<slug>.architecture.json`: editable Archify architecture source.
- A generated standalone interactive HTML export produced by the repository's Archify CI workflow.

## Generate interactive Archify HTML

The **System design docs and Archify exports** GitHub Actions workflow runs on pull requests that change system-design content, on relevant pushes to `main`, and manually via workflow dispatch.

It pins Archify to release `v3.2.0`, runs the repository structural checks, then executes the Archify `finalize architecture` quality gate for every source. A successful run produces 17 standalone HTML files plus machine-readable finalize receipts, uploaded as the workflow artifact:

`archify-interactive-html-and-receipts`

Download it from the workflow run's **Artifacts** section. The exports are CI artifacts rather than checked-in generated files, keeping the repository diff focused on editable JSON and Markdown sources. Artifacts are retained for 30 days.

For one design locally, install the Archify skill/runtime and run from the repository root:

```bash
node <path-to-archify>/bin/archify.mjs finalize architecture system_designs/<slug>/archify/<slug>.architecture.json system_designs/<slug>/archify/<slug>.architecture.html --quality showcase --json
```

A successful finalize receipt is the validation evidence. Non-zero exits fail the workflow; HTML is not uploaded as a successful deliverable unless the gate completes.

## Evidence boundary

These are conceptual interview HLDs derived from the design notes, not reverse-engineered runtime architecture. Review component ownership, topology, data semantics, provider services and assumptions before treating a diagram as production design. The cloud table in each explainer is a starter mapping, not a claim that AWS and GCP products are exact equivalents. Automated browser checks are evidence of bounded runtime behavior, not a substitute for a human visual review.
