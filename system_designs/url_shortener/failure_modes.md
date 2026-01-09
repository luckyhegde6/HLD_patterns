# Failure Modes and Mitigations

## Cache Failure
- Fall back to database
- Slight latency increase acceptable

## Cache Stampede
- Use TTL jitter
- Warm cache for popular URLs

## Database Failure
- Use replicas
- Failover mechanisms

## Hot Keys
- Redis sharding
- Request throttling
