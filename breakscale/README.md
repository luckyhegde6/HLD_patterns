# Breakscale test harness

This harness integrates Breakscale as a repeatable architecture experiment workflow for the system designs in this repository.

## 1. Install Breakscale locally

Follow upstream prerequisites and commands. The upstream repository currently documents Bun:

```bash
git clone https://github.com/workersio/breakscale.git
cd breakscale
bun install
bun dev
```

Open `http://localhost:5173`, choose a built-in example, and raise offered traffic to explore it interactively.

For this HLD repository, clone the simulator beside this repository or check it out as a pinned submodule. Do not copy the engine into this repository: keeping upstream as the source of truth avoids maintaining a forked simulation engine.

## 2. Use the hosted MCP server

Breakscale documents a hosted MCP endpoint at `https://mcp.breakscale.tech/mcp`. It exposes:
- `read_me` — design format, component types/settings, and mapping guidance.
- `create_view` — validate a design, simulate 30 seconds, and render it.
- `export_design` — return a `.breakscale` design file.
- `open_design` — load a Breakscale share link back into a design.

For Codex CLI, the upstream MCP guide documents:

```bash
codex mcp add breakscale --url https://mcp.breakscale.tech/mcp
```

For a local stdio server, upstream documents `npx -y breakscale-mcp --stdio` (Node 20+).

See the [upstream MCP guide](https://github.com/workersio/breakscale/blob/main/mcp/README.md) for client-specific setup. Connecting the MCP server is a user-side action; this repository does not store tokens or credentials.

## 3. Scenario workflow

Use one manifest from `scenarios/` per system. Inspect all provenance labels before running:
- `requirement-derived`: directly copied or derived from the system's documented requirements.
- `interview-assumption`: deliberately selected for an interview experiment; not a source fact.
- `illustrative`: used only to demonstrate qualitative behaviour.
- `measured`: backed by a dated test/telemetry source and its measurement method.
- `TBD`: unknown; do not silently replace it with a made-up number.

Run the same scenario and seed for baseline and each change. Compare successful goodput, percentiles, failures, queues, and utilisation. Change one variable at a time unless the scenario explicitly tests a combined mitigation.

## 4. First scenarios

| Scenario | Breakscale teaching preset / pattern | What to investigate |
|---|---|---|
| URL shortener | Cache Aside | Origin load as cache hit rate falls; origin saturation |
| Rate-limited API | Rate Limited API | Goodput versus tail latency as offered RPS exceeds quota |
| Retry storm | Retry Storm | Retry amplification and abandoned downstream work |
| Circuit breaker | Circuit Breaker | Failure containment, trip state and recovery |
| Message queue / async workers | Async Workers | Backlog growth and worker drain rate |

The names above are upstream preset identifiers, not custom manifests. Confirm their actual topology and defaults in the pinned Breakscale revision before claiming that a local scenario uses them. For custom designs use the `read_me` tool to confirm the current `.breakscale` schema, then construct and validate the design through `create_view`.

## 5. Evidence quality

A scenario is not complete until its design is accepted by Breakscale and the report includes the returned measured simulation metrics. A diagram existing is not evidence that its metrics or topology are valid. If a Breakscale component cannot represent an HLD behaviour, record that omission.

See [Breakscale testing standard](../system_designs/BREAKSCALE_TESTING.md).
