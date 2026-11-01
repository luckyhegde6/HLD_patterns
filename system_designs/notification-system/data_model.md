# Data Model

```mermaid
erDiagram
 NOTIFICATION ||--o{ DELIVERY : fans_out
 TEMPLATE ||--o{ NOTIFICATION : renders
 RECIPIENT ||--o{ PREFERENCE : configures
 NOTIFICATION { string notification_id PK; string event_key; string status }
 DELIVERY { string delivery_id PK; string notification_id FK; string channel; string provider_id; string status }
 TEMPLATE { string template_id PK; string version; string locale }
 RECIPIENT { string recipient_id PK }
 PREFERENCE { string recipient_id FK; string channel; boolean enabled; string consent_state }
```

Store consent evidence, template version, idempotency key and provider message ID; minimize PII and define retention.