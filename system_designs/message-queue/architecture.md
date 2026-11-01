# Architecture and Diagrams

```mermaid
flowchart LR
 P[Producers] --> PUB[Publish API]
 PUB --> PART[Partitioner]
 PART --> BR[(Durable broker log)]
 BR --> CG[Consumer groups]
 CG --> C1[Consumers]
 C1 --> ACK[Ack / offset commit]
 C1 --> DLQ[(Dead-letter queue)]
```

```mermaid
sequenceDiagram
 Producer->>Broker: Publish(key, payload)
 Broker->>Broker: Append to partition
 Broker-->>Producer: Durable ack
 Consumer->>Broker: Poll / fetch
 Broker-->>Consumer: Message + offset
 Consumer->>Consumer: Process idempotently
 Consumer->>Broker: Commit ack/offset
```

```mermaid
flowchart TD
 MSG[Message] --> PROC[Consumer processing]
 PROC --> OK{Success?}
 OK -->|Yes| ACK[Acknowledge]
 OK -->|No| RETRY{Retry budget remains?}
 RETRY -->|Yes| WAIT[Backoff / retry topic]
 WAIT --> PROC
 RETRY -->|No| DLQ[Dead-letter + alert]
```


## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/message-queue.architecture.json](archify/message-queue.architecture.json).
