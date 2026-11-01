# Consistent Hashing

Consistent hashing distributes keys across nodes while limiting key remapping when nodes are added or removed. It is used in distributed caches, partition routing and some load-balancing designs.

## 1. Problem with modulo hashing

With `hash(key) % N`, changing the node count changes many key assignments. A cache cluster scale-out can therefore trigger a large cache miss wave.

## 2. Ring model

```mermaid
flowchart TB
    subgraph Ring["Conceptual hash ring — clockwise ownership"]
        direction LR
        N1["Node A
vnodes A1,A2"] --> K1["Key K
first clockwise vnode"]
        K1 --> N2["Node B
vnodes B1,B2"]
        N2 --> N3["Node C
vnodes C1,C2"]
        N3 --> N1
    end
```

A key is mapped to a position on the same hash space as the node tokens. Ownership is the first node token clockwise from the key position. Virtual nodes give each physical node multiple positions to improve distribution.

## 3. Lookup sequence

```mermaid
sequenceDiagram
    participant Client
    participant Router as Ring Router
    participant Ring as Token Metadata
    participant Node as Selected Node

    Client->>Router: get(key)
    Router->>Ring: hash(key), find clockwise successor
    Ring-->>Router: physical node + vnode
    Router->>Node: read(key)
    Node-->>Router: value / miss
    Router-->>Client: result
```

## 4. Node membership change

```mermaid
flowchart TD
    A[Node membership changes] --> B[Publish new ring version]
    B --> C[Calculate affected key ranges]
    C --> D[Move / warm affected data]
    D --> E[Validate ownership and replicas]
    E --> F[Switch routing version]
    F --> G[Retire old ranges after safety window]
```

The exact migration protocol is implementation-specific. A routing change without data movement or replica availability can produce misses or data loss for stores that are not disposable caches.

## 5. Trade-offs

| Benefit | Cost / risk |
|---|---|
| Less remapping than modulo hashing | Ring metadata and routing logic |
| Incremental node changes | Rebalancing and migration process |
| Vnodes improve distribution | Token count and operational tuning |
| Useful for cache partitioning | Hot keys are not automatically solved |

## 6. AI / agentic implementation guidance

AI is useful for generating a simulator, visualizing token movement and producing migration test cases. It should not control production ring membership directly.

Require:
- deterministic hash function and versioned ring metadata
- property tests for stable ownership when no topology change occurs
- distribution tests over representative keys (statistical, not exact balance guarantees)
- migration / rollback simulation
- explicit handling for node unavailable and stale ring versions
- a human-approved topology change workflow

**Prompt:** “Implement a consistent-hash ring simulator. First define hash stability, vnode ownership and ring-version contracts. Add tests that measure key movement when adding/removing a node, validate deterministic lookup and exercise stale metadata. Do not implement production data migration or automatic cluster changes.”

## Interview insight

Consistent hashing reduces remapping; it does not guarantee uniform request load, solve hot keys or remove the need for replication and migration planning. Ask: how many nodes, how often does topology change, how skewed are keys, and is this a cache or durable data store?
