# Architecture — Ride-Hailing

Request API persists trip request and quote; geo service indexes fresh driver locations by cell; dispatch offers to candidates; driver gateway delivers offer; assignment uses conditional update on trip version/status; location stream updates ETA; trip events drive payment, notifications and analytics.

```mermaid
sequenceDiagram
 participant R as Rider
 participant S as Ride Service
 participant G as Geo Index
 participant D as Dispatch
 participant DR as Driver
 participant DB as Trip DB
 R->>S: request + quote
 S->>DB: create REQUESTED trip
 S->>G: nearby available drivers
 S->>D: candidate list
 D->>DR: expiring offer
 DR->>D: accept
 D->>DB: CAS assign if MATCHING + offer valid
 DB-->>R: assigned trip
```

Partition by city/geo cell for discovery; trip ownership by tripId. Keep GPS ingestion separate from canonical trip state. Use regional dispatch cells and backpressure during demand spikes.
