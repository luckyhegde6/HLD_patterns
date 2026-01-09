# Edge Cases and Tricky Questions

---

## What if Two Users Create Same URL?

- Allow duplicates
- Different short codes point to same long URL

---

## What if Custom Alias Is Taken?

- Reject request
- Suggest alternatives

---

## What if URL Expires?

- Return 404 or redirect to landing page
- Remove from cache eagerly

---

## What if Traffic Spikes Suddenly?

- CDN absorbs load
- Auto-scale API servers
