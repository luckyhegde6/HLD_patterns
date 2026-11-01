# AI / FDE Implementation

AI can help operators inspect lag, summarize DLQ patterns and propose consumer scaling. It must not replay messages or alter retention without guarded approval.

```mermaid
flowchart LR
 Metrics[Broker metrics] --> Assistant[Ops assistant]
 Assistant --> Proposal[Scaling / replay proposal]
 Proposal --> Validate[Dry run and policy checks]
 Validate --> Approve[Operator approval]
 Approve --> Tool[Typed admin tool]
 Tool --> Audit[Audit and post-checks]
```

Tools must scope topic/group/partition, cap replay volume, preserve idempotency and log actions. Evaluate diagnostic accuracy and safe recovery outcomes.