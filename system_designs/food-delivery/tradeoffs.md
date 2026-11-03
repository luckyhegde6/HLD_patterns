# Trade-offs — Food Delivery

- Payment authorization then capture at completion reduces cancellation disputes but holds funds; capture timing depends on provider and policy.
- Central saga is easier to inspect/replay; choreography reduces central coupling but complicates global state and debugging.
- Courier batching improves utilization but worsens delivery ETA and food quality.
- Menu cache improves discovery latency; versioned checkout validation protects price correctness.
- Strong order-state transitions; eventual courier location and ETA are acceptable with freshness metadata.
