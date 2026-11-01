# Data Model — Customer Support AI Agent

```mermaid
erDiagram
 TENANT ||--o{ CUSTOMER : owns
 CUSTOMER ||--o{ SUPPORT_CASE : opens
 SUPPORT_CASE ||--o{ CASE_MESSAGE : contains
 SUPPORT_CASE ||--o{ AGENT_RUN : processed_by
 AGENT_RUN ||--o{ RETRIEVAL_EVIDENCE : references
 AGENT_RUN ||--o{ TOOL_INVOCATION : proposes
 TOOL_INVOCATION ||--o| APPROVAL : requires
 TOOL_INVOCATION ||--o| TOOL_RESULT : produces
 SUPPORT_CASE ||--o{ CASE_OUTCOME : measured_by
 TENANT { string tenant_id PK }
 CUSTOMER { string customer_id PK; string tenant_id FK }
 SUPPORT_CASE { string case_id PK; string customer_id FK; string status; string priority }
 CASE_MESSAGE { string message_id PK; string case_id FK; string channel; datetime created_at }
 AGENT_RUN { string run_id PK; string case_id FK; string model_version; string policy_version }
 RETRIEVAL_EVIDENCE { string evidence_id PK; string run_id FK; string source_ref; string access_scope }
 TOOL_INVOCATION { string invocation_id PK; string run_id FK; string tool_name; string idempotency_key; string status }
 APPROVAL { string approval_id PK; string invocation_id FK; string approver_id; string decision; datetime expires_at }
 TOOL_RESULT { string result_id PK; string invocation_id FK; string external_ref; string status }
 CASE_OUTCOME { string outcome_id PK; string case_id FK; boolean resolved; boolean escalated; int handling_seconds }
```

Use tenant-scoped keys/indexes, append-only audit events, versioned policy/model metadata and retention/deletion rules. Store evidence references and access labels, not unrestricted copies of source records.
