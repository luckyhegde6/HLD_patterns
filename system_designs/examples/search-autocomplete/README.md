# Search and Autocomplete — HLD Case Study

Design typeahead suggestions and full-text search for a large catalog or content corpus.

## Requirements

- Prefix suggestions, typo tolerance, ranking and filtering.
- Full-text search with pagination and facets.
- Index freshness and deletion propagation.
- Low keystroke-to-suggestion latency, high availability and abuse protection.

Clarify languages, corpus size, update frequency, personalization, query privacy and relevance goals.

## Architecture

```mermaid
flowchart TB
  UI[Web / Mobile] --> API[Search API]
  API --> RATE[Rate limiter / query validation]
  RATE --> CACHE[(Query cache)]
  CACHE -->|Miss| SUG[Autocomplete service]
  SUG --> TRIE[(Prefix / FST index)]
  API --> SEARCH[Search service]
  SEARCH --> IDX[(Inverted search index)]
  SEARCH --> FILTER[ACL / tenant / facet filters]
  FILTER --> RANK[Ranking / personalization]
  RANK --> DOC[(Document store / source of truth)]
  SRC[Catalog / content changes] --> EVT[(Change stream)]
  EVT --> INDEXER[Indexing workers]
  INDEXER --> TRIE
  INDEXER --> IDX
  SEARCH -.-> OBS[Query latency / relevance metrics]
```

## Indexing sequence

```mermaid
sequenceDiagram
  autonumber
  participant S as Source database
  participant E as Change stream
  participant I as Indexer
  participant N as Normalizer
  participant X as Search index
  S->>E: Emit entity change
  E->>I: Deliver versioned event
  I->>N: Normalize, tokenize, extract fields
  N-->>I: Search document + version
  I->>X: Upsert document and suggestion terms
  X-->>I: Indexed version
  I-->>E: Acknowledge event
```

## Typeahead sequence

```mermaid
sequenceDiagram
  participant U as User
  participant API as Autocomplete API
  participant C as Cache
  participant T as Prefix index
  U->>API: Query prefix
  API->>API: Validate and rate-limit
  API->>C: GET normalized prefix + locale
  alt Cache hit
    C-->>API: Suggestions
  else Miss
    API->>T: Prefix lookup
    T-->>API: Candidate terms
    API->>C: SET short TTL
  end
  API-->>U: Top suggestions
```

## Trade-offs and failure modes

- Trie/FST for prefix lookup; inverted index for full-text relevance.
- Cache normalized prefix + locale + tenant + filters.
- Debounce client input, bound prefix length and rate-limit per user/IP.
- Indexing is asynchronous; expose indexing lag and version checkpoints.
- Tombstones/deletion events must remove stale suggestions/results.
- Apply authorization and tenant filters before returning documents.
- Track zero-result rate, click-through, abandonment, p95/p99 and freshness.