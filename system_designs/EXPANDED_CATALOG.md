# Expanded System Design Catalog

| System | Study path | Interview focus |
|---|---|---|
| YouTube | [youtube](youtube/README.md) | Upload, transcoding, adaptive bitrate, CDN |
| WhatsApp | [whatsapp](whatsapp/README.md) | Ordered messaging, presence, fanout, E2E boundaries |
| Twitter / X | [twitter-x](twitter-x/README.md) | Timeline fanout, ranking, hot keys |
| Instagram | [instagram](instagram/README.md) | Media pipeline, feed ranking, stories |
| Uber / Rapido | [rideshare](rideshare/README.md) | Geospatial dispatch, trip state, GPS concurrency |
| Food delivery | [food-delivery](food-delivery/README.md) | Order saga, restaurant/courier orchestration |
| Netflix | [netflix](netflix/README.md) | Encoding, entitlement, DRM, CDN |
| Google Drive | [google-drive](google-drive/README.md) | Chunked upload, ACL, versions, sync |
| Google Maps | [google-maps](google-maps/README.md) | Tiles, routing, traffic, geospatial indexes |
| Search autocomplete | [search-autocomplete](search-autocomplete/README.md) | Prefix index, top-K, ranking, latency |
| Notification system | [existing design](notification-system/README.md) | Preferences, retries, provider quotas |
| Distributed logging | [distributed logging](distributed-logging/README.md) | Ingestion, cardinality, hot/cold storage |

## Reuse existing foundations
- [Chat / Messaging](examples/chat-messaging/README.md) supports WhatsApp.
- [Social Feed / Timeline](examples/social-feed-timeline/README.md) supports Twitter/X and Instagram.
- [Search / Autocomplete](examples/search-autocomplete/README.md) is the canonical search overview.
- [Object Storage / File Sharing](examples/object-storage-file-sharing/README.md) supports Drive.
- [Observability Platform](examples/observability-platform/README.md) supports distributed logging.
- [Notification System](notification-system/README.md) remains the channel fanout design.

## Study order
Autocomplete and notifications → WhatsApp and Twitter/X → Instagram and YouTube → Netflix and Drive → rideshare and food delivery → Maps and distributed logging.

Capacity estimates must state assumptions and units.
