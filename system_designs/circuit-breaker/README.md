# Circuit Breaker — High-Level Design

## Problem

A resilience mechanism that stops repeated calls to unhealthy dependencies.

## System boundaries

caller, breaker state machine, dependency, metrics

## Design focus

closed/open/half-open, rolling failure window, slow-call thresholds, probes

## Requirements to clarify

- Actors, primary use cases and explicit non-goals.
- Peak and average traffic, burst patterns, payload sizes, retention and growth.
- Availability, latency, durability, consistency and recovery objectives.
- Tenant isolation, authentication, authorization, privacy and audit requirements.
- Cost envelope, deployment geography and operational ownership.

## Architecture and walkthrough

See [architecture and diagrams](architecture.md), [requirements and workload](requirements.md), [failure modes](failure_modes.md), [data model](data_model.md), [trade-offs](tradeoffs.md), and [AI / FDE implementation](AI_FDE_IMPLEMENTATION.md).

## Interview sequence

1. Clarify the business workflow, scope and invariants.
2. Estimate workload and define SLOs.
3. Draw context and component boundaries.
4. Walk through the critical sequence and data model.
5. Explain concurrency, consistency and idempotency.
6. Model failures, retries, recovery and operations.
7. Compare alternatives, cost and complexity.
8. Explain whether AI adds value and where deterministic guardrails remain mandatory.

Numeric assumptions not supplied by measured workload are illustrative only.