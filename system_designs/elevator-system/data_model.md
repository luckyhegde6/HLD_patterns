# Data Model

```mermaid
erDiagram
 ELEVATOR ||--o{ STOP_REQUEST : serves
 ELEVATOR { string car_id PK; int current_floor; string direction; string state }
 STOP_REQUEST { string request_id PK; int floor; string direction; datetime created_at; string status }
 SENSOR_EVENT { string event_id PK; string car_id FK; string event_type; datetime event_time }
```

Persist operational snapshots and append sensor/audit events. Safety interlocks remain in certified controller hardware/software, not the cloud datastore.