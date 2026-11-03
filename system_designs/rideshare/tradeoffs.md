# Trade-offs — Ride-Hailing

- Sequential offers reduce driver spam but increase match latency; batch offers improve speed but create contention.
- Smaller geo cells improve locality but require neighboring-cell expansion; larger cells return more candidates.
- Higher GPS frequency improves ETA but costs battery, bandwidth and ingestion capacity.
- Dynamic pricing reacts to demand but needs versioned, explainable quotes and abuse controls.
- Strong trip-state consistency is worth the coordination; location and ETA can be eventually consistent.
