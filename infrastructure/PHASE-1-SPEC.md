# Phase 1 Terraform Spec — MysterMyself AWS Automation Backbone

**Status:** SPEC ONLY — No infrastructure created  
**Date:** 2026-06-20  
**Region:** us-east-1  
**Runtime:** Python 3.12  
**Budget:** $50/month (current usage: $0, credits: $200 remaining)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Terraform Folder Structure](#2-terraform-folder-structure)
3. [Resource Specifications](#3-resource-specifications)
4. [IAM & Security Design](#4-iam--security-design)
5. [Tagging Standard](#5-tagging-standard)
6. [Module Specifications](#6-module-specifications)
7. [Bootstrap Procedure](#7-bootstrap-procedure)
8. [Cost Estimate](#8-cost-estimate)
9. [Constraints & Exclusions](#9-constraints--exclusions)
10. [Rollback & Destroy Plan](#10-rollback--destroy-plan)
11. [Approval Gate](#11-approval-gate)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        EXISTING STACK                            │
│  Vercel (frontend) │ Supabase (DB) │ Stripe │ Beehiiv │ GitHub  │
└────────────┬───────────────┬────────────────┬───────────────────┘
             │               │                │
             ▼               ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AWS AUTOMATION BACKBONE                        │
│                                                                 │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐  │
│  │ API Gateway  │───▶│  Lambda Functions │───▶│  SQS Queues  │  │
│  │  (HTTP API)  │    │  (Python 3.12)   │    │  + DLQs      │  │
│  └──────────────┘    └────────┬─────────┘    └──────┬───────┘  │
│                               │                      │          │
│                               ▼                      ▼          │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐  │
│  │   Secrets    │    │   CloudWatch     │    │  SNS Alerts  │  │
│  │   Manager    │    │   Log Groups     │    │  (→ Email)   │  │
│  └──────────────┘    └──────────────────┘    └──────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Terraform State: S3 + DynamoDB Lock                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Design Principles:**
- Fully serverless — no EC2, EKS, VPC, or NAT Gateway
- Event-driven — SQS decouples producers from consumers
- Observable — CloudWatch logs with 30-day retention + DLQ alerting
- Secure — no hardcoded secrets, least-privilege IAM, encrypted at rest
- Cost-minimal — free tier eligible for nearly all resources

---

## 2. Terraform Folder Structure

```
infrastructure/
├── PHASE-0-VERIFICATION.md
├── PHASE-1-SPEC.md                    ← This file
├── scripts/
│   ├── aws-cleanup-audit.sh           ← Pre-flight audit (already created)
│   ├── bootstrap-backend.sh           ← One-time S3/DynamoDB creation
│   └── destroy-all.sh                 ← Emergency teardown
├── terraform/
│   ├── environments/
│   │   └── dev/
│   │       ├── main.tf                ← Root module, composes all modules
│   │       ├── variables.tf           ← Input variables
│   │       ├── outputs.tf             ← Exported values
│   │       ├── terraform.tfvars       ← Variable values (git-ignored if sensitive)
│   │       ├── backend.tf             ← S3 backend config
│   │       └── providers.tf           ← AWS provider + version constraints
│   ├── modules/
│   │   ├── state-backend/
│   │   │   ├── main.tf               ← S3 bucket + DynamoDB table
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── messaging/
│   │   │   ├── main.tf               ← SQS queues + DLQs
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── notifications/
│   │   │   ├── main.tf               ← SNS topic + subscriptions
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── compute/
│   │   │   ├── main.tf               ← Lambda functions + IAM roles
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── api/
│   │   │   ├── main.tf               ← API Gateway HTTP API
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── secrets/
│   │   │   ├── main.tf               ← Secrets Manager placeholders
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── observability/
│   │       ├── main.tf               ← CloudWatch log groups + alarms
│   │       ├── variables.tf
│   │       └── outputs.tf
│   └── shared/
│       └── tags.tf                    ← Common tags local block
└── .gitignore                         ← Terraform state, .terraform/, *.tfvars
```

---

## 3. Resource Specifications

### 3.1 State Backend

| Resource | Configuration |
|----------|--------------|
| **S3 Bucket** | Name: `mystermyself-tfstate-{account_id}` |
| | Versioning: Enabled |
| | Encryption: AES-256 (SSE-S3) |
| | Public access: Blocked (all 4 settings) |
| | Lifecycle: Keep all versions (state recovery) |
| **DynamoDB Table** | Name: `mystermyself-tfstate-lock` |
| | Partition key: `LockID` (String) |
| | Billing: PAY_PER_REQUEST (on-demand) |
| | Encryption: AWS-managed |

### 3.2 SQS Queues

| Queue | DLQ | Visibility Timeout | Max Receive | Retention |
|-------|-----|--------------------|-------------|-----------|
| `mystermyself-order-processing` | `mystermyself-order-processing-dlq` | 60s | 3 | 14 days |
| `mystermyself-notification-dispatch` | `mystermyself-notification-dispatch-dlq` | 30s | 3 | 7 days |
| `mystermyself-webhook-ingest` | `mystermyself-webhook-ingest-dlq` | 30s | 5 | 7 days |

All queues:
- Encryption: SSE-SQS (server-side)
- Delay: 0 seconds
- Max message size: 256 KB

### 3.3 SNS Topic

| Resource | Configuration |
|----------|--------------|
| **Topic** | Name: `mystermyself-ops-alerts` |
| | Encryption: AWS-managed KMS |
| **Subscription** | Protocol: Email |
| | Endpoint: `{founder_email}` (variable) |
| | Filter: None (all alerts) |

### 3.4 Lambda Functions (Placeholders)

| Function | Runtime | Memory | Timeout | Description |
|----------|---------|--------|---------|-------------|
| `mystermyself-order-processor` | Python 3.12 | 128 MB | 30s | Processes order events from SQS |
| `mystermyself-notification-sender` | Python 3.12 | 128 MB | 30s | Dispatches notifications |
| `mystermyself-webhook-handler` | Python 3.12 | 128 MB | 15s | Ingests external webhooks |

All Lambdas:
- Handler: `handler.lambda_handler`
- Code: Placeholder zip with "Hello" response
- Reserved concurrency: None (use account default)
- Tracing: PassThrough (X-Ray disabled to save cost)
- Environment variables: Reference Secrets Manager ARNs (not values)

### 3.5 API Gateway

| Resource | Configuration |
|----------|--------------|
| **HTTP API** | Name: `mystermyself-api` |
| | Protocol: HTTP (not REST — cheaper) |
| | Stage: `$default` (auto-deploy) |
| | CORS: Disabled (Vercel handles frontend) |
| **Routes (placeholders)** | `POST /webhooks/stripe` → webhook-handler |
| | `POST /webhooks/beehiiv` → webhook-handler |
| | `GET /health` → order-processor (health check) |

### 3.6 Secrets Manager

| Secret Path | Purpose | Initial Value |
|-------------|---------|---------------|
| `mystermyself/stripe-api-key` | Stripe secret key | `PLACEHOLDER` |
| `mystermyself/stripe-webhook-secret` | Stripe webhook signing | `PLACEHOLDER` |
| `mystermyself/supabase-service-key` | Supabase service role key | `PLACEHOLDER` |
| `mystermyself/beehiiv-api-key` | Beehiiv API key | `PLACEHOLDER` |

All secrets:
- Encryption: AWS-managed KMS
- Rotation: Manual (Phase 2 for auto-rotation)
- Recovery window: 7 days

### 3.7 CloudWatch Observability

| Log Group | Retention | Purpose |
|-----------|-----------|---------|
| `/aws/lambda/mystermyself-order-processor` | 30 days | Lambda execution logs |
| `/aws/lambda/mystermyself-notification-sender` | 30 days | Lambda execution logs |
| `/aws/lambda/mystermyself-webhook-handler` | 30 days | Lambda execution logs |
| `/aws/apigateway/mystermyself-api` | 30 days | API access logs |

| Alarm | Condition | Action |
|-------|-----------|--------|
| `mystermyself-dlq-order-alarm` | ApproximateNumberOfMessagesVisible > 0 | SNS → ops-alerts |
| `mystermyself-dlq-notification-alarm` | ApproximateNumberOfMessagesVisible > 0 | SNS → ops-alerts |
| `mystermyself-dlq-webhook-alarm` | ApproximateNumberOfMessagesVisible > 0 | SNS → ops-alerts |

---

## 4. IAM & Security Design

### 4.1 Lambda Execution Roles

Each Lambda gets a **dedicated IAM role** with minimal permissions:

**`mystermyself-order-processor-role`**
```
- logs:CreateLogGroup, logs:CreateLogStream, logs:PutLogEvents (own log group)
- sqs:ReceiveMessage, sqs:DeleteMessage, sqs:GetQueueAttributes (order-processing queue)
- secretsmanager:GetSecretValue (mystermyself/stripe-*, mystermyself/supabase-*)
```

**`mystermyself-notification-sender-role`**
```
- logs:CreateLogGroup, logs:CreateLogStream, logs:PutLogEvents (own log group)
- sqs:ReceiveMessage, sqs:DeleteMessage, sqs:GetQueueAttributes (notification-dispatch queue)
- secretsmanager:GetSecretValue (mystermyself/beehiiv-*)
```

**`mystermyself-webhook-handler-role`**
```
- logs:CreateLogGroup, logs:CreateLogStream, logs:PutLogEvents (own log group)
- sqs:SendMessage (order-processing, notification-dispatch queues)
- secretsmanager:GetSecretValue (mystermyself/stripe-webhook-secret)
```

### 4.2 Security Controls

| Control | Implementation |
|---------|---------------|
| No wildcards in IAM | Resource ARNs explicitly scoped |
| No `*` actions | Only specific API actions listed |
| Encryption at rest | All services use SSE or KMS |
| No public endpoints (except API GW) | S3 blocked, SQS private, SNS private |
| API Gateway throttling | 100 req/s burst, 50 req/s sustained |
| Secrets never in code | All via Secrets Manager + IAM |
| Terraform state encrypted | S3 SSE + versioning |
| State lock | DynamoDB prevents race conditions |

---

## 5. Tagging Standard

All resources receive these tags:

```hcl
locals {
  common_tags = {
    Project     = "MysterMyself"
    Environment = "dev"
    ManagedBy   = "terraform"
    Owner       = "founder"
    CostCenter  = "phase-1"
    CreatedDate = "2026-06-20"
  }
}
```

---

## 6. Module Specifications

### 6.1 `state-backend` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `account_id` | string | — | AWS account ID |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `state_bucket_arn` | S3 bucket ARN |
| `state_bucket_name` | S3 bucket name |
| `lock_table_arn` | DynamoDB table ARN |
| `lock_table_name` | DynamoDB table name |

### 6.2 `messaging` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `queues` | list(object) | — | Queue definitions (name, visibility_timeout, max_receive, retention) |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `queue_arns` | Map of queue name → ARN |
| `queue_urls` | Map of queue name → URL |
| `dlq_arns` | Map of DLQ name → ARN |

### 6.3 `notifications` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `alert_email` | string | — | Email for alerts |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `topic_arn` | SNS topic ARN |

### 6.4 `compute` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `functions` | list(object) | — | Lambda definitions |
| `queue_arns` | map(string) | — | SQS queue ARNs for event sources |
| `secret_arns` | list(string) | — | Secrets Manager ARNs for access |
| `log_group_arns` | map(string) | — | CloudWatch log group ARNs |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `function_arns` | Map of function name → ARN |
| `function_invoke_arns` | Map of function name → invoke ARN |
| `role_arns` | Map of function name → IAM role ARN |

### 6.5 `api` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `lambda_invoke_arns` | map(string) | — | Lambda invoke ARNs for integrations |
| `lambda_function_arns` | map(string) | — | Lambda ARNs for permissions |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `api_endpoint` | API Gateway invoke URL |
| `api_id` | API Gateway ID |

### 6.6 `secrets` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `secret_paths` | list(string) | — | Secret names to create |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `secret_arns` | Map of secret name → ARN |

### 6.7 `observability` Module

**Inputs:**
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | — | Project identifier |
| `log_groups` | list(object) | — | Log group definitions (name, retention_days) |
| `dlq_arns` | map(string) | — | DLQ ARNs for alarms |
| `alert_topic_arn` | string | — | SNS topic for alarm actions |
| `tags` | map(string) | `{}` | Resource tags |

**Outputs:**
| Output | Description |
|--------|-------------|
| `log_group_arns` | Map of log group name → ARN |
| `alarm_arns` | Map of alarm name → ARN |

---

## 7. Bootstrap Procedure

### Step 1: Run Cleanup Audit
```bash
chmod +x infrastructure/scripts/aws-cleanup-audit.sh
./infrastructure/scripts/aws-cleanup-audit.sh
```

### Step 2: Bootstrap State Backend
```bash
chmod +x infrastructure/scripts/bootstrap-backend.sh
./infrastructure/scripts/bootstrap-backend.sh
```

This script creates the S3 bucket and DynamoDB table **outside of Terraform** (chicken-and-egg problem). It will:
1. Create `mystermyself-tfstate-{account_id}` S3 bucket
2. Enable versioning
3. Enable AES-256 encryption
4. Block all public access
5. Create `mystermyself-tfstate-lock` DynamoDB table
6. Output backend config values

### Step 3: Initialize Terraform
```bash
cd infrastructure/terraform/environments/dev
terraform init
```

### Step 4: Plan (Review Only)
```bash
terraform plan -out=phase1.tfplan
```

### Step 5: Apply (After Approval)
```bash
terraform apply phase1.tfplan
```

---

## 8. Cost Estimate

| Resource | Monthly Cost | Notes |
|----------|-------------|-------|
| S3 (state file) | $0.00 | < 1 KB, free tier |
| DynamoDB (lock table) | $0.00 | On-demand, negligible reads |
| SQS (6 queues) | $0.00 | 1M free requests/month |
| SNS (1 topic, email) | $0.00 | Email delivery is free |
| Lambda (3 functions) | $0.00 | 1M requests + 400K GB-s free |
| API Gateway (HTTP API) | $0.00 | 1M requests free (12 months) |
| Secrets Manager (4 secrets) | **$1.60** | $0.40/secret/month |
| CloudWatch Logs (4 groups) | $0.00 | 5 GB ingest free |
| CloudWatch Alarms (3 alarms) | $0.00 | 10 free alarms |
| **TOTAL** | **~$1.60/month** | |

**Budget utilization:** 3.2% of $50 monthly limit  
**Credits impact:** < 1% of $200 remaining

---

## 9. Constraints & Exclusions

### MUST NOT Use
- EC2, EKS, ECS, Fargate
- Amplify
- NAT Gateway
- VPC (not needed for serverless)
- RDS (using Supabase)
- CloudFront (using Vercel)
- Cognito (auth handled by Supabase)

### MUST NOT Do
- Run `terraform apply` without plan review
- Hardcode secrets in `.tf` files or `tfvars`
- Use IAM `*` wildcards
- Deploy to `prod` (dev only in Phase 1)
- Enable X-Ray tracing (cost)
- Create custom KMS keys (cost, AWS-managed is sufficient)

### Existing Stack (Unchanged)
- **Vercel** — Frontend hosting & edge functions
- **Supabase** — PostgreSQL database, auth, real-time
- **Stripe** — Payment processing
- **Beehiiv** — Email newsletter
- **GitHub** — Source control & CI/CD
- **Kiro / Claude / ChatGPT** — AI development tools

---

## 10. Rollback & Destroy Plan

### Destroy Everything (Emergency)
```bash
cd infrastructure/terraform/environments/dev
terraform destroy -auto-approve
```

### Destroy Specific Module
```bash
terraform destroy -target=module.compute
terraform destroy -target=module.api
```

### State Backend Cleanup (Last Resort)
```bash
# Only after terraform destroy succeeds
aws s3 rb s3://mystermyself-tfstate-{account_id} --force --profile mystermyself-dev
aws dynamodb delete-table --table-name mystermyself-tfstate-lock --profile mystermyself-dev --region us-east-1
```

---

## 11. Approval Gate

### Before proceeding to Terraform code, confirm:

- [ ] Cleanup audit passed (no stray EC2/RDS)
- [ ] Lambda test functions reviewed and deleted (or kept intentionally)
- [ ] Budget guardrail `MysterMyself-Phase1-Monthly-Budget` is active
- [ ] AWS profile `mystermyself-dev` works via `sts get-caller-identity`
- [ ] Terraform >= 1.5.0 installed locally
- [ ] Founder email confirmed for SNS alerts
- [ ] This spec reviewed and approved

### Next Command After Approval
```bash
# Tell Kiro: "Approved. Write the Terraform code for Phase 1."
```

---

## Revision History

| Date | Change |
|------|--------|
| 2026-06-20 | Initial spec created — Phase 1 AWS Automation Backbone |
