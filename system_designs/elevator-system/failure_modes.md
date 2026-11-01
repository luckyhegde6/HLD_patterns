# Failure Modes

| Failure | Response |
|---|---|
| Sensor disagreement | Safety controller inhibits unsafe motion; alert maintenance |
| Dispatcher unavailable | Car controllers retain safe local behavior; degraded service |
| Network partition | No unsafe remote command; local safety remains authoritative |
| Car out of service | Reassign eligible stops and inform riders |
| Door obstruction | Reopen and retry per certified policy |
| Fire/emergency mode | Follow building/equipment emergency control logic |

Monitor controller health, sensor faults, wait time distribution, car utilization and emergency transitions.