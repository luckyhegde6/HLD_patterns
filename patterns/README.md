# Distributed Systems Patterns — Visual Learning Path

Patterns solve recurring distributed-systems problems. They are not goals by themselves: choose one only when its benefit addresses a measured requirement or failure mode.

## Pattern selection map

```mermaid
flowchart TD
  A[What constraint are we addressing?] --> B{Data exceeds one DB node?}
  B -->|Yes| SH[Sharding]
  B -->|No| C{Node membership changes frequently?}
  C -->|Yes| CH[Consistent hashing]
  C -->|No| D{Services need independent async work?}
  D -->|Yes| E{Need retained replayable event history?}
  E -->|Yes| STREAM[Event-driven architecture / stream]
  E -->|No| Q[Work queue]
  D -->|No| F{Business transaction spans services?}
  F -->|Yes| S[Saga]
  F -->|No| G[Keep simpler synchronous boundary]
```

## 1. Sharding — split a large logical dataset

```mermaid
flowchart LR
  APP[Application] --> ROUTER[Shard router]
  ROUTER --> MAP[(Shard map)]
  ROUTER --> S1[(Shard 1)]
  ROUTER --> S2[(Shard 2)]
  ROUTER --> S3[(Shard 3)]
```

Use when one database's capacity or write throughput is a demonstrated limit. Choose a shard key from access patterns and distribution, then plan hot-key handling and safe migration. [Deep dive: sharding](sharding.md).

## 2. Consistent hashing — reduce remapping on membership changes

```mermaid
flowchart LR
  subgraph Before[Before node joins]
    A1[Key K] --> N1[Node A]
    B1[Key M] --> N2[Node B]
  end
  subgraph After[After node C joins]
    A2[Key K] --> N3[Node A]
    B2[Key M] --> N4[Node C]
    C2[Unaffected keys] --> N5[Node B]
  end
```

The diagram is illustrative: only keys in affected token ranges move, unlike naive modulo hashing where changing N can remap most keys. Consistent hashing does not eliminate hot keys or data migration. [Deep dive: consistent hashing](consistent_hashing.md).

## 3. Event-driven architecture — publish facts, let consumers react

```mermaid
flowchart LR
  S[Order service] -->|OrderPlaced| B[(Event broker)]
  B --> I[Inventory projection]
  B --> E[Email consumer]
  B --> A[Analytics consumer]
  I --> IDB[(Inventory DB)]
  E --> EDB[(Delivery status)]
  A --> ADB[(Analytics store)]
```

Use events to decouple independent reactions. Use an outbox to bridge database commit and event publication; expect duplicate delivery and make consumers idempotent. [Deep dive: EDA](event_driven_architecture.md).

## 4. Queue vs stream

```mermaid
flowchart TB
  P[Producer] --> Q[(Work queue)]
  Q --> W1[Worker A]
  Q --> W2[Worker B]
  P --> S[(Retained event stream)]
  S --> C1[Consumer group A]
  S --> C2[Consumer group B]
  C1 --> REPLAY[Replay from offset]
```

A work queue dispatches tasks to workers. A stream retains ordered records for independent consumer groups and replay. Real products differ; compare delivery, ordering, retention, replay and scaling semantics. [Deep dive: queues](message_queues.md).

## 5. Saga — coordinate local transactions

```mermaid
flowchart LR
  O[Order saga] --> I[Reserve inventory]
  I --> P[Authorize payment]
  P --> S[Create shipment]
  S --> OK[Complete]
  P -.->|Failure| CI[Release inventory]
  S -.->|Failure| CP[Void / refund payment]
  CP --> CI
  CI --> X[Compensated / manual recovery]
```

Use when a business workflow spans services and partial completion must be managed. A compensation is a new action and can fail; persist saga state and support manual recovery. [Deep dive: saga](saga_pattern.md).

## AWS and GCP building blocks

| Pattern capability | AWS services commonly considered | GCP services commonly considered |
|---|---|---|
| Sharded relational data | Multiple RDS/Aurora clusters; DynamoDB partitioning for key-value workloads | Multiple Cloud SQL/AlloyDB instances; Spanner or Bigtable for suitable access patterns |
| Partition / key routing | Application router; DynamoDB partition key; ElastiCache cluster mode | Application router; Bigtable row keys; Memorystore cluster options |
| Event bus / pub-sub | EventBridge; SNS | Eventarc; Pub/Sub |
| Work queue | SQS | Pub/Sub push/pull subscription (not identical queue semantics) |
| Event stream | Kinesis Data Streams; MSK | Pub/Sub; Dataflow for stream processing |
| Workflow / saga orchestration | Step Functions | Workflows; Cloud Composer for orchestration use cases |
| Retry / dead-letter handling | SQS redrive policy; EventBridge DLQ; Step Functions retry/catch | Pub/Sub dead-letter topics; Workflows retry; service-specific retry policies |

**Important:** These are starting points, not one-to-one equivalents. Validate ordering, retention, throughput, delivery guarantees, transaction boundary, retry model and regional scope against current product documentation before committing to a design.

## Interview checklist

For any selected pattern, explain: the triggering requirement, simpler alternative, data ownership, failure path, operational cost, migration/rollback, and the signal that would justify removing or replacing the pattern.
