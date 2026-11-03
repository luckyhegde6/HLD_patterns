# Trade-offs — WhatsApp-Style Messaging

- **Fanout-on-write vs read:** fast inbox reads vs write amplification for huge groups; hybridize by group size/activity.
- **Ordering:** per-conversation sequence is practical; global ordering is expensive and unnecessary.
- **Receipts:** detailed per-device receipts improve UX but multiply writes; aggregate where acceptable.
- **Presence:** short leases improve freshness but increase heartbeats and battery/network cost.
- **E2E encryption:** stronger privacy limits server-side search/moderation and recovery; design client-side key and abuse-report flows deliberately.
- **Push:** push is a notification hint, not durable delivery; authoritative sync comes from message log.
