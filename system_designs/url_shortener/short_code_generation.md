# Short Code Generation

## Approach

- Use Base62 encoding (a–z, A–Z, 0–9)
- Convert an auto-incrementing ID to Base62

---

## Why Base62?

- URL safe
- Compact
- Predictable length
- Avoids hash collisions

---

## Alternative (Trade-off)

- Hashing long URLs
- Requires collision handling
