# Trade-offs

| Choice | Trade-off |
|---|---|
| Push vs pull | Low event latency vs collector control |
| Local vs centralized sampling | Reduced network cost vs global visibility |
| Hot index vs cold object store | Fast queries vs cheap retention |
| At-least-once vs best-effort | Durability vs duplicate/cost overhead |
| Full text vs structured fields | Flexible search vs schema discipline/index cost |

Separate audit-grade events from best-effort diagnostics.
