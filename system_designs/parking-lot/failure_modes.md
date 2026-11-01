# Failure Modes

- Concurrent allocation: atomic reservation/version check prevents double assignment.
- Gate network outage: local safe mode and reconciliation after reconnect.
- Payment timeout: preserve pending/unknown state; reconcile provider before charging again.
- Lost ticket: policy-based recovery with audit.
- Sensor mismatch: mark spot uncertain and exclude from allocation.
- Inventory cache stale: authoritative reservation check at write time.

Monitor occupancy mismatch, allocation conflicts, gate latency, payment reconciliation and capacity.