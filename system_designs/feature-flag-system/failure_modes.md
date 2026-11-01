# Failure Modes

- Control plane outage: SDK uses bounded last-known config.
- Stale config: TTL, version/age metric and safe default.
- Bad targeting rule: validate, preview, canary and rollback.
- SDK cache miss: deterministic default; avoid synchronous remote dependency per evaluation.
- Attribute leakage: minimize and restrict targeting data.
- Flag proliferation: owners, expiry and cleanup workflow.

Monitor propagation lag, stale SDKs, evaluation errors, flag count and rollout outcomes.
