# Trade-offs

| Strategy | Strength | Limitation |
|---|---|---|
| Collective control | Simple and robust | Less optimal under complex traffic |
| Direction-aware scoring | Better average wait | Needs tuning and fairness constraints |
| Destination dispatch | Efficient grouping | Requires passenger interaction and clear UX |
| Central dispatcher | Global optimization | Must degrade safely during outage |
| Local dispatch | Resilient | Reduced fleet-wide coordination |

Never trade safety invariants for throughput or lower wait time.