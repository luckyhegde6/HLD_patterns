# Data Model — Ride-Hailing

| Entity | Fields | Notes |
|---|---|---|
| RideRequest | id, rider_id, pickup, dropoff, status, created_at | Request lifecycle |
| FareQuote | id, request_id, amount, currency, pricing_version, expires_at | Immutable quote |
| Driver | id, status, vehicle_id | Canonical availability |
| LocationPing | driver_id, lat, lon, accuracy, observed_at | TTL/stream |
| DispatchOffer | id, trip_id, driver_id, expires_at, status | Unique offer |
| Trip | id, rider_id, driver_id, state, version, timestamps | CAS state machine |
| Payment | id, trip_id, status, amount, provider_ref | Reconciled saga |
| SafetyIncident | id, trip_id, category, status, audit_ref | Restricted access |

Indexes: geo cell + freshness for driver candidates; trip by rider/driver active state; offer by driver/expiry; payment by trip/provider reference.
