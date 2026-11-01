# RAG Knowledge Assistant — HLD Case Study

Build an assistant that answers questions from a private enterprise corpus with citations and document-level access controls.

## Architecture

```mermaid
flowchart TB
  SRC[Docs / wikis / object storage] --> ING[Ingestion pipeline]
  ING --> PARSE[Parse / normalize / chunk]
  PARSE --> EMB[Embedding service]
  EMB --> IDX[(Vector + lexical indexes)]
  ING --> META[(Document metadata + ACL)]
  U[User] --> API[Chat API]
  API --> AUTH[Identity / tenant claims]
  AUTH --> RET[Hybrid retriever]
  IDX --> RET
  META --> RET
  RET --> RANK[Reranker + token budget]
  RANK --> LLM[LLM gateway]
  LLM --> GUARD[Grounding / policy / citation validation]
  GUARD --> RESP[Answer + citations]
  GUARD -->|Unsafe / unsupported| HUM[Escalation / refusal]
  API -.-> OBS[Evaluation + telemetry]
```

## Retrieval sequence

```mermaid
sequenceDiagram
  autonumber
  participant U as User
  participant API as Chat API
  participant ACL as Authorization
  participant R as Retriever
  participant L as LLM
  participant V as Validator
  U->>API: Ask question
  API->>ACL: Resolve tenant and document scope
  ACL-->>API: Allowed scope
  API->>R: Hybrid query with ACL filter
  R-->>API: Ranked snippets + source ids
  API->>L: Prompt + bounded context
  L-->>API: Candidate answer
  API->>V: Validate citations, output schema and policy
  alt Supported and allowed
    V-->>API: Approved answer
    API-->>U: Answer + citations
  else Unsupported / unsafe
    V-->>API: Reject
    API-->>U: Refusal or human escalation
  end
```

## Critical invariants

- Tenant/document ACL is enforced by trusted backend logic, never inferred by the model.
- Deleted or permission-changed documents are removed from retrieval promptly.
- Retrieved text is untrusted input; prompt injection cannot authorize tools.
- Answers cite retrieved source ids; unsupported answers abstain or escalate.
- Embedding/index versions are tracked so reindex/rebuild can complete safely.

## Evaluation and operations

Measure retrieval recall@k, citation correctness, faithfulness, answer relevance, refusal correctness, latency, tokens/request, cost/task and ACL violation rate. Maintain a versioned golden set and human review. A single LLM-as-judge score is not a complete quality gate.

## Failure modes

| Failure | Mitigation |
|---|---|
| Low retrieval recall | Hybrid retrieval, query rewrite, rerank and recall evaluation |
| Stale index | Versioned events, tombstones and deletion propagation |
| Cross-tenant leakage | Authorization filter before prompt context |
| Prompt injection | Treat retrieved text as untrusted; tool policy remains independent |
| Hallucinated citation | Citation-to-span validation and abstention |
| Provider outage | Bounded retries, fallback and clear degraded mode |
| Token explosion | Context cap, dedupe, summarization and tenant budget |