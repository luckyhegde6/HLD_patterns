# Data Model — Google Maps

| Entity | Fields | Notes |
|---|---|---|
| TileKey | z, x, y, style_version | CDN cache key |
| Place | id, name, category, location, address | Search/geocode |
| RoadNode | id, coordinate, graph_version | Graph vertex |
| RoadSegment | id, from_node, to_node, geometry, attributes | Directed edge |
| RoadGraphVersion | id, region, created_at | Snapshot |
| TrafficObservation | segment_id, observed_at, speed, confidence | Windowed input |
| TrafficWeight | segment_id, time_bucket, travel_time, version | Derived edge cost |
| Route | id, graph_version, mode, legs, eta, created_at | Response snapshot |
