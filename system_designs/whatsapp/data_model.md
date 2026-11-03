# Data Model — WhatsApp-Style Messaging

| Entity | Key fields | Notes |
|---|---|---|
| Conversation | id, type, created_at, version | Partition key |
| Membership | conversation_id, user_id, role, joined_at, status | Unique active membership |
| Device | id, user_id, key_bundle_ref, status, last_seen | Device identity |
| Message | conversation_id, sequence, message_id, sender_device, client_message_id, ciphertext, created_at | Unique sequence and idempotency scope |
| Receipt | message_id, device_id, status, updated_at | Aggregate or compact receipts |
| PresenceLease | user_id/device_id, status, expires_at | TTL/ephemeral |
| Attachment | id, object_key, ciphertext_hash, size, expires_at | Encrypted blob metadata |
| SyncCursor | device_id, conversation_id, last_sequence | Replay checkpoint |

## Access patterns
Append/read conversation history by sequence; sync messages after cursor; list memberships; update receipts; resolve active device endpoints. Keep presence in TTL storage and message history in durable storage.

## Consistency
Strong ordering within each conversation; eventual delivery/receipts/presence. Membership changes must gate future fanout and sync access.
