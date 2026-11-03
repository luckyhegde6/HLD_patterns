# Visual Explainer — Distributed Logging

## End-to-end data path

```mermaid
flowchart LR
 AG[Agents] --> ING[Authenticated Ingest]
 ING --> Q[(Durable Buffer)]
 Q --> P[Parse and Redact]
 P --> HOT[(Hot Search Index)]
 P --> COLD[(Cold Archive)]
 CLIENT[Query Client] --> QUERY[Query API]
 QUERY --> HOT
 QUERY --> COLD
 HOT --> RESULT[Results]
 COLD --> RESULT
```

## Network and trust boundary

```mermaid
flowchart TB
 subgraph EXTERNAL[External tenant environment]
  AGENT[Agent]
 end
 subgraph EDGE[Public edge]
  TLS[TLS]
  AUTH[Identity and tenant validation]
  QUOTA[Quota and schema checks]
 end
 subgraph PRIVATE[Private service network]
  INGEST[Ingest]
  Q[(Queue)]
  WORKER[Worker]
  STORE[(Tenant-scoped storage)]
 end
 AGENT --> TLS
 TLS --> AUTH
 AUTH --> QUOTA
 QUOTA --> INGEST
 INGEST --> Q
 Q --> WORKER
 WORKER --> STORE
```

Authenticate before accepting events, derive tenant identity from credentials, and keep storage private. Apply tenant authorization to query and archive access as well as ingestion.

## Scale progressively

```mermaid
flowchart TD
 A[Single ingest and durable store] --> B[Async workers and separate query path]
 B --> C[Partition queue and indexes]
 C --> D[Hot and cold retention tiers]
 D --> E[Regional ingest cells and disaster recovery]
```

Add complexity only when a measured bottleneck requires it: queue age, indexing lag, query p99, hot-shard skew or storage cost. See [architecture](architecture.md) for the detailed rationale.
