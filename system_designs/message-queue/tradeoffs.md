# Trade-offs

| Choice | Trade-off |
|---|---|
| Queue vs log stream | Work distribution vs replay/retention semantics |
| At-most-once vs at-least-once | No duplicates vs no loss under failure |
| Ordering per key vs global | Scalability vs coordination cost |
| Push vs pull | Low latency vs consumer backpressure control |
| Managed vs self-hosted | Lower ops vs control/portability |

Exactly-once broker semantics do not automatically guarantee exactly-once external business effects.