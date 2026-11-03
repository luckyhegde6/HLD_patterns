# Trade-offs — Instagram-Style Media Network

- Feed fanout-on-write lowers read latency but costs more for high-follower accounts; hybrid candidate generation handles skew.
- More media variants improve device/network adaptation but increase storage and processing.
- Longer CDN TTL improves hit ratio; privacy/deletion requires versioned assets and purge controls.
- Story TTL cleanup is asynchronous; read-time expiry is the correctness boundary.
- Ranking personalization improves relevance but adds feature freshness, privacy and tail-latency complexity.
