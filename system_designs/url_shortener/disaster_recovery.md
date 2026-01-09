# Disaster Recovery

---

## Failure Scenarios

### Region Failure
- DNS routes traffic to healthy region
- CDN absorbs short-term load

### Redis Cluster Failure
- Fall back to DB
- Increase TTL temporarily

### Database Failure
- Promote replica
- Accept brief write downtime

---

## Backup Strategy

- Daily snapshots
- Point-in-time recovery

Disaster recovery is about minimizing **data loss** and **downtime**, not eliminating failure.
