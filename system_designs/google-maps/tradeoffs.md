# Trade-offs — Google Maps

- Hierarchical/precomputed routing accelerates long-distance queries but complicates dynamic traffic updates.
- Smaller traffic windows improve responsiveness but amplify noise; smoothing improves stability but lags incidents.
- CDN tile TTL improves hit ratio but requires versioned styles/road changes.
- Shortest path is not always fastest/safest; cost weights depend on mode and user preferences.
- More precise probe data improves ETA but raises privacy and retention risks.
