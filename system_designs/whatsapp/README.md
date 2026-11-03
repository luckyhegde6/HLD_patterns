# WhatsApp-Style Messaging Platform

Design private and group messaging with durable delivery, per-conversation ordering, presence, receipts, multi-device sync, media and end-to-end encryption boundaries.

## Architecture
```mermaid
flowchart LR
 C[Clients] --> GW[WebSocket Gateway]
 GW --> AUTH[Auth / Rate Limit]
 AUTH --> CR[Conversation Router]
 CR --> MSG[Message Service]
 MSG --> DB[(Durable Message Log)]
 MSG --> OB[Outbox / Event Bus]
 OB --> FAN[Fanout Workers]
 FAN --> GW
 FAN --> PUSH[Offline Push]
 GW --> PRES[Presence Service]
 C --> MEDIA[Media Upload API]
 MEDIA --> OBJ[(Encrypted Object Storage)]
```

## Critical flows
Send: authenticate device → validate membership → dedupe clientMessageId → assign conversation sequence → durably append → acknowledge → fan out to online devices or enqueue offline push. Reconnect: client supplies last sync cursor; server returns missed messages/receipts and device-state updates.

## Data model
User, Device, Conversation, Membership, Message(conversationId, sequence, senderDevice, ciphertext, clientMessageId), Receipt, PresenceLease, Attachment. Partition message log by conversationId; use sequence numbers per conversation, not a global order.

## Failure modes
Duplicate sends, reconnect gaps, offline queue growth, hot groups, stale presence, device key changes and push-provider failures. Use idempotency, durable cursors, bounded offline retention, backpressure and push as a wake-up hint—not the source of truth.

## Trade-offs
Fanout-on-write vs read for large groups; durable receipts vs write amplification; presence freshness vs battery/traffic; server-side search vs E2E privacy constraints.

## Interview walkthrough
Clarify group size, device count, ordering guarantee, offline retention and encryption assumptions. Estimate messages/sec and fanout. Deep dive durable acceptance, sequence allocation, reconnect sync, group fanout, hot conversations and key management.

## Visual explainer
```mermaid
sequenceDiagram
 participant A as Sender
 participant G as Gateway
 participant S as Message Service
 participant D as Durable Log
 participant F as Fanout
 participant B as Recipient
 A->>G: encrypted message + client ID
 G->>S: authenticated command
 S->>D: append + sequence
 D-->>S: committed
 S-->>A: accepted
 S->>F: event
 F-->>B: deliver / queue offline
```

## AI/FDE implementation
Use AI only for optional user-controlled features such as local summaries or support triage. Prompt defines the task; Context is strictly user-authorized; Harness enforces privacy and tool scope; Loop is bounded; Graph supports opt-in review workflows. Do not send E2E plaintext to server-side models without explicit product design and consent.
