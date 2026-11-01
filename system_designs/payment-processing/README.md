# Payment Processing — HLD

Orchestrate payment authorization, capture, refund, provider webhooks and reconciliation with correctness under retries and ambiguous outcomes.

Core components: merchant API, payment orchestrator, provider adapters, ledger, webhook processor and reconciliation jobs.

Critical invariants: idempotency, immutable ledger entries, authenticated webhooks, no double capture/refund and explicit pending/unknown states.