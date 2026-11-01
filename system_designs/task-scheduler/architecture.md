# Architecture and Diagrams

```mermaid
flowchart LR
 API[Scheduler API] --> DB[(Job store)]
 DB --> SCAN[Due-job scanner / timer wheel]
 SCAN --> Q[Durable queue]
 Q --> W[Worker fleet]
 W --> HANDLER[Task handler / tool runtime]
 W --> DB
 W --> DLQ[(Dead-letter queue)]
```

```mermaid
sequenceDiagram
 Client->>API: Create job
 API->>DB: Persist schedule
 Scanner->>DB: Claim due job with lease
 Scanner->>Queue: Enqueue execution token
 Worker->>Queue: Receive token
 Worker->>DB: Verify lease / state
 Worker->>Handler: Execute with deadline
 Handler-->>Worker: Result
 Worker->>DB: Complete or schedule retry
```

```mermaid
stateDiagram-v2
 [*] --> Scheduled
 Scheduled --> Queued: due
 Queued --> Running: lease acquired
 Running --> Succeeded
 Running --> RetryWait: retryable failure
 RetryWait --> Queued: retry due
 Running --> DeadLetter: exhausted / permanent
 Scheduled --> Cancelled
 Queued --> Cancelled
```


## Visual explainer

See [the enhanced visual architecture, critical sequence, failure/recovery flow, AWS/GCP starter mapping and interview walkthrough](visual_explainer.md). Editable Archify source: [archify/task-scheduler.architecture.json](archify/task-scheduler.architecture.json).
