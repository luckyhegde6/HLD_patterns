# Failure Modes — Google Maps

- Graph update mismatch: route against pinned graph version and return version metadata.
- Traffic stale: fallback to historical/time-of-day weights and label ETA confidence.
- GPS drift: map matching with accuracy and road constraints.
- Road closure lag: closure override layer and priority invalidation.
- Routing overload: cache popular routes, admission control and bounded search.
- Reroute storm: hysteresis/minimum improvement threshold and client backoff.
- Tile CDN miss surge: origin shield, prewarm popular regions and stale-safe tiles.
