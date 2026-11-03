# Trade-offs — Netflix-Style Streaming

- Multi-CDN improves resilience and reach but adds steering, telemetry and contract complexity.
- More codec/resolution variants improve QoE but increase encoding/storage.
- Pre-positioning reduces premiere misses but consumes cache capacity.
- Shorter signed-token TTL tightens security but adds refresh calls.
- Online recommendations improve freshness but can threaten playback API tail latency; isolate and fallback.
