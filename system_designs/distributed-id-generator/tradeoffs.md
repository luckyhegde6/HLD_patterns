# Trade-offs

| Approach | Benefits | Costs |
|---|---|---|
| UUIDv4 | Simple, decentralized | Random; larger indexes, weak locality |
| UUIDv7 | Time-sortable and decentralized | Clock/order assumptions; adoption constraints |
| Snowflake-style | Compact, sortable, high throughput | Worker allocation and clock handling |
| Database sequence | Strong central ordering | Central bottleneck and availability dependency |

Choose based on ordering, storage/index locality, decentralization, interoperability and operational complexity.
