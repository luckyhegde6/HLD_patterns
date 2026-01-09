# Data Model

## Key-Value Schema

Short URL → Long URL

Example:

{
  "short_code": "aZ3kLm9",
  "long_url": "https://example.com/very/long/url",
  "created_at": "timestamp",
  "expires_at": "timestamp"
}

---

## Why Key-Value?

- Access pattern is simple and predictable
- Enables fast lookups
- Scales horizontally
