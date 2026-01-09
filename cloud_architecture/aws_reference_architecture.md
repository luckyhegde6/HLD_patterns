# AWS Reference Architecture

This document outlines a standard scalable architecture on AWS.

---

## Core Components

- Route53 (DNS)
- ALB / NLB (Load Balancing)
- EC2 / ECS / EKS (Compute)
- RDS / DynamoDB (Database)
- ElastiCache (Redis)
- S3 + CloudFront (Static + CDN)

---

## Design Principles

- Stateless services
- Auto scaling
- Managed services preferred
- Least privilege IAM

---

## High Availability

- Multi-AZ deployments
- Health checks
- Auto recovery

---

## Interview Insight

Focus on *why* managed services reduce operational burden.
