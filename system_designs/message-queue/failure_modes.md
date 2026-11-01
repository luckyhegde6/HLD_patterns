# Failure Modes

- Broker node loss: replicated log and leader election.
- Consumer crash: redelivery from last committed offset.
- Poison message: bounded retry then DLQ.
- Slow consumer: lag alerts, scaling and backpressure.
- Duplicate delivery: idempotent handler/inbox dedupe.
- Partition hot spot: key strategy review and repartition plan.
- Broker outage: producer backpressure and bounded local buffering.

Monitor publish/consume latency, oldest message age, lag, redelivery, DLQ rate and partition skew.