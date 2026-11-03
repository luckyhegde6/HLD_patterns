# Architecture — WhatsApp-Style Messaging

## Components
WebSocket gateways hold transient connections; conversation service owns membership and sequence allocation; durable message log stores ciphertext and metadata; fanout workers deliver to devices; sync service replays by cursor; presence service maintains expiring leases; push adapter wakes offline clients.

## Send sequence
```mermaid
sequenceDiagram
 participant C as Client
 participant G as Gateway
 participant S as Conversation Service
 participant D as Durable Log
 participant E as Event Bus
 participant F as Fanout
 C->>G: send(clientMessageId, ciphertext)
 G->>S: authenticated command
 S->>S: membership + dedupe + sequence
 S->>D: append message
 D-->>S: committed
 S-->>C: accepted(sequence)
 S->>E: publish via outbox
 E->>F: message event
 F->>G: online delivery
 F->>F: enqueue offline sync/push
```

## Scaling
Shard by conversationId; allocate sequence within the partition/aggregate. Large groups use fanout-on-read or hybrid strategy. Gateways are horizontally scaled with connection-aware routing; offline state is durable and independent of gateway memory.

## Security / operations
Authenticate devices, validate membership at send and sync, minimize server-visible content under E2E design, protect metadata, rate-limit abuse and audit account/device changes. Monitor accepted-message latency, fanout lag, reconnect backlog, socket churn, push errors and hot partitions.
