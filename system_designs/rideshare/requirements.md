# Requirements — Ride-Hailing

## Functional
Request ride, estimate fare/ETA, discover and offer to drivers, accept/assign, track trip/location, cancel, complete, pay/refund and report safety issues.

## Invariants
- At most one active driver assignment per trip.
- Accept is atomic and offer-scoped; expired offers cannot win.
- Trip transitions follow an explicit state machine.
- Fare quote is versioned and final settlement is auditable.
- Location data is time-stamped and treated as stale after TTL.

## APIs
POST /ride-requests; GET /quotes/{id}; POST /offers/{id}/accept; POST /trips/{id}/transitions; GET /trips/{id}/location; POST /trips/{id}/cancel.

## Workload assumptions
Requests/minute/city, active drivers, GPS update rate, candidate radius, trip duration, peak concurrency and payment latency. Distinguish telemetry ingestion from trip command QPS.
