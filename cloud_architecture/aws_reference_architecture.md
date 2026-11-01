# AWS Reference Architecture

Use current official AWS architecture icons in diagrams. The service logos are in the [AWS Architecture Icons library](https://aws.amazon.com/architecture/icons/). Keep the artwork unchanged and show the full service label beside every logo.

## Component logo map

| Stage | Service icon / logo lookup | Role |
|---|---|---|
| DNS | [Route 53](https://awsfundamentals.com/aws-icons/route-53) | Resolve public/private names |
| CDN | [CloudFront](https://awsfundamentals.com/aws-icons/cloudfront) | Edge caching and static delivery |
| WAF | [AWS WAF](https://aws.amazon.com/waf/) | HTTP filtering and protection |
| Ingress | [Elastic Load Balancing](https://awsfundamentals.com/aws-icons/elastic-load-balancing) | Health checks and L7 routing |
| API | [API Gateway](https://awsfundamentals.com/aws-icons/api-gateway) | API front door, policies and quotas |
| Compute | [EC2](https://awsfundamentals.com/aws-icons/ec2), [ECS](https://awsfundamentals.com/aws-icons/ecs), [EKS](https://awsfundamentals.com/aws-icons/eks) | VM and container workloads |
| Relational data | [RDS](https://awsfundamentals.com/aws-icons/rds), [Aurora](https://awsfundamentals.com/aws-icons/aurora) | Transactions and SQL |
| Key-value | [DynamoDB](https://awsfundamentals.com/aws-icons/dynamodb) | Key-oriented NoSQL access |
| Cache | [ElastiCache](https://awsfundamentals.com/aws-icons/elasticache) | Cache, session and rate-limit state |
| Object storage | [S3](https://awsfundamentals.com/aws-icons/amazon-simple-storage-service) | Durable objects/blobs |
| Queue / pub-sub | [SQS](https://awsfundamentals.com/aws-icons/amazon-simple-queue-service), [SNS](https://awsfundamentals.com/aws-icons/amazon-simple-notification-service) | Async work and fanout |
| Events | [EventBridge](https://awsfundamentals.com/aws-icons/eventbridge) | Event routing |
| Observability | [CloudWatch](https://awsfundamentals.com/aws-icons/cloudwatch), [X-Ray](https://awsfundamentals.com/aws-icons/aws-x-ray) | Metrics, logs and traces |
| Identity / secrets | [IAM](https://aws.amazon.com/iam/), [Secrets Manager](https://awsfundamentals.com/aws-icons/secrets-manager) | Workload identity and secret lifecycle |

## 1. Connected reference architecture

```mermaid
flowchart TB
  U[Browser / Mobile] --> R53[Route 53 DNS]
  R53 --> CF[CloudFront CDN]
  CF --> WAF[AWS WAF]
  WAF --> ALB[Application Load Balancer]
  subgraph VPC[AWS VPC - Multi-AZ]
    subgraph APP[Private application subnets]
      API[ECS / EKS API]
      CACHE[(ElastiCache)]
      Q[(SQS)]
      WORKER[Worker service]
      API --> CACHE
      API --> Q
      Q --> WORKER
    end
    subgraph DATA[Private data subnets]
      DB[(RDS / Aurora)]
    end
    API --> DB
    WORKER --> DB
  end
  ALB --> API
  API -.-> OBS[CloudWatch / X-Ray]
  WORKER -.-> OBS
  IAM[IAM role] -.-> API
  SM[Secrets Manager] -.-> API
```

## 2. Read request sequence

```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant DNS as Route 53
  participant CF as CloudFront
  participant WAF as AWS WAF
  participant ALB as ALB
  participant APP as ECS/EKS API
  participant R as ElastiCache
  participant DB as RDS/Aurora
  C->>DNS: Resolve API hostname
  DNS-->>C: Edge endpoint
  C->>CF: HTTPS request
  CF->>WAF: Evaluate web ACL
  WAF->>ALB: Forward allowed request
  ALB->>APP: Route to healthy target
  APP->>R: GET cache key
  alt Cache hit
    R-->>APP: Value
  else Cache miss
    R-->>APP: null
    APP->>DB: SELECT source row
    DB-->>APP: Row
    APP->>R: SET with TTL
  end
  APP-->>C: Response
```

## 3. Network and trust boundary

```mermaid
flowchart TB
  INTERNET[Public internet] --> EDGE[Route 53 + CloudFront + WAF]
  EDGE --> ING[ALB / API Gateway]
  subgraph VPC[AWS VPC]
    PUB[Public ingress / controlled egress]
    APP[Private application subnets]
    DATA[Isolated data subnets]
    ING --> PUB
    PUB --> APP
    APP --> DATA
  end
  APP -.-> IAM[IAM role / STS]
  IAM -.-> SM[Secrets Manager]
  APP -.-> LOG[CloudTrail / CloudWatch]
```

Keep databases and caches private by default. Use security groups, subnet routing, scoped IAM roles, secret rotation, audit trails and controlled egress.

## 4. Scale progressively

```mermaid
flowchart LR
  A[Single EC2 + local DB] --> B[Separate app and DB]
  B --> C[ALB + stateless replicas]
  C --> D[CloudFront + ElastiCache]
  D --> E[SQS + independent workers]
  E --> F[Read replicas / partitioning when justified]
  F --> G[Multi-AZ + cross-region recovery]
```

Add a tier only when it addresses a measured constraint. Multi-region active-active adds data ownership, conflict, failover and cost decisions.

## References

- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Prescriptive Guidance](https://docs.aws.amazon.com/prescriptive-guidance/)