# Visual Explainer — Retrieval-Augmented Generation

## Mental model
RAG separates knowledge ingestion from question answering. The query path retrieves authorized evidence, ranks it, gives a bounded context to the model, then validates citations and grounding.

## Architecture
```mermaid
flowchart TB
 S[Sources / connectors] --> I[Ingestion + parsing]
 I --> C[Chunk + ACL metadata]
 C --> E[Embedding workers]
 E --> X[(Vector + lexical index)]
 U[User question] --> A[Query API + identity]
 A --> R[Hybrid retrieval with ACL filters]
 X --> R
 R --> RR[Rerank + deduplicate]
 RR --> CTX[Context budget]
 CTX --> L[LLM]
 L --> V[Citation + grounding validator]
 V --> O[Answer + citations / abstain]
 O --> U
 I --> DEL[Version / deletion propagation]
 DEL --> X
```

## Query sequence
```mermaid
sequenceDiagram
 participant U as User
 participant A as API
 participant I as Identity
 participant R as Retriever
 participant L as LLM
 participant V as Validator
 U->>A: Question
 A->>I: Resolve tenant and claims
 I-->>A: Authorized scope
 A->>R: Query + ACL/freshness filters
 R-->>A: Ranked evidence chunks
 A->>L: Question + bounded evidence
 L-->>A: Answer with source ids
 A->>V: Validate citations and grounding
 V-->>A: Answer or abstain
 A-->>U: Response + citations
```

## Explain the key boundaries
- Ingestion is asynchronous and versioned; query serving is latency-sensitive.
- ACL filtering happens server-side before evidence enters model context.
- Retrieved text is untrusted data, not instructions.
- Deletions propagate to vector/lexical indexes, caches and derived stores.
- The model proposes an answer; the validator checks source references and grounding.

## Interview drawing checklist
Show source connectors, parser/chunker, embedding pipeline, vector + lexical index, identity/ACL, reranker, context budget, LLM, citation validator, deletion propagation and recall/latency/cost metrics.

## References
- [ByteByteGo GenAI system design overview](https://bytebytego.com/courses/genai-system-design-interview/introduction-and-overview)
- [Retrieval-Augmented Generation paper](https://arxiv.org/abs/2005.11401)

Original explainer and diagrams.