# Elevator System — HLD

Coordinate elevator cars to serve hall and cabin requests while preserving safety constraints.

Core components: hall/cabin panels, dispatcher, car controllers, sensors, safety controller and telemetry.

Design focus: request assignment, direction-aware scheduling, door/motion state machine, emergency override and fairness.

**Safety principle:** deterministic safety controller overrides dispatch optimization. AI may assist simulation or demand forecasting, never control safety-critical motion.