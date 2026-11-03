# Failure Modes — Netflix-Style Streaming

- CDN POP failure: multi-CDN/region steering and client retry.
- Origin overload: shielding, cache warming, admission control.
- License service outage: regional failover and bounded retries; fail closed for protected content.
- Token expiry mid-playback: refresh path with session validation.
- Unsupported codec/DRM: capability negotiation and fallback rendition.
- Hot premiere: pre-position segments, request coalescing and capacity reservation.
- Entitlement cache stale: short TTL/version invalidation; recheck on session start.
