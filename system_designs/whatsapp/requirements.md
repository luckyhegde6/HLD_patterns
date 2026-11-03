# Requirements — WhatsApp-Style Messaging

## Functional
1:1/group conversations, multi-device sessions, durable messages, offline delivery, delivery/read receipts, presence, encrypted media, sync and block/report controls.

## Non-functional
Low message-send latency, durable accepted messages, per-conversation ordering, high availability, privacy, bounded offline storage and graceful reconnect.

## Invariants
- Only current members/devices may send or receive conversation events.
- A clientMessageId is processed at most once per sender/device scope.
- Sequence order is monotonic within a conversation.
- Server acknowledges only after durable acceptance.
- Presence is ephemeral and never substitutes for durable message state.

## API sketch
POST /conversations/{id}/messages; GET /conversations/{id}/sync?cursor=; POST /messages/{id}/receipts; POST /devices/register; WebSocket subscribe/send.

## Workload assumptions
Messages/user/day, average recipients, group-size distribution, active socket count, attachment size, online ratio and retention. Separate write QPS from fanout deliveries/sec.

## Out of scope
Full cryptographic protocol specification; state clearly where client-side E2E encryption/key management begins and server visibility ends.
