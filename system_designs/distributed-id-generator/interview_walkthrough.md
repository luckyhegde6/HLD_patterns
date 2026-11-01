# Interview Walkthrough

1. Clarify uniqueness and ordering guarantees.
2. Estimate peak IDs/sec and number of workers.
3. Explain ID bit layout and encoding.
4. Detail worker identity assignment and fencing.
5. Walk through clock rollback and sequence overflow.
6. Compare UUID, Snowflake and database sequence.
7. Cover rollout, monitoring and migration.

Follow-ups: multi-region uniqueness? clock skew? worker ID reuse? index locality? format changes?
