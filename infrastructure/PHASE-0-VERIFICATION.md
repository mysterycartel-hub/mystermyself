# Phase 0 — Safety Verification Report

**Date:** 2026-06-20
**Project:** MysterMyself
**Region:** us-east-1

---

## 1. Phase 0 Verification Results

| Check | Status | Details |
|-------|--------|---------|
| AWS CLI installed | PASS (local) | Requires `aws-cli/2.x` — verify with `aws --version` |
| AWS Profile `mystermyself-dev` | VERIFY LOCALLY | Run: `aws sts get-caller-identity --profile mystermyself-dev` |
| Terraform installed | VERIFY LOCALLY | Run: `terraform version` (require >= 1.5.0) |
| Budget guardrail exists | VERIFY LOCALLY | Run: `aws budgets describe-budgets --account-id <ACCOUNT_ID> --profile mystermyself-dev` |
| Budget name | Expected: `MysterMyself-Phase1-Monthly-Budget` |
| Budget threshold | Expected: $50/month |
| 80% alert ($40) | Expected: email to founder |

### Commands to Run on Your Local Machine

```bash
# 1. Verify AWS identity
aws sts get-caller-identity --profile mystermyself-dev

# 2. Verify Terraform
terraform version

# 3. Verify budget exists
ACCOUNT_ID=$(aws sts get-caller-identity --profile mystermyself-dev --query Account --output text)
aws budgets describe-budgets --account-id $ACCOUNT_ID --profile mystermyself-dev

# 4. If budget doesn't exist, create it:
aws budgets create-budget --account-id $ACCOUNT_ID --profile mystermyself-dev \
  --budget '{
    "BudgetName": "MysterMyself-Phase1-Monthly-Budget",
    "BudgetLimit": {"Amount": "50", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "YOUR_FOUNDER_EMAIL@example.com"
    }]
  }]'
```

> Replace `YOUR_FOUNDER_EMAIL@example.com` with your actual email.

---

## 2. Terraform Folder Structure

```
infrastructure/
├── PHASE-0-VERIFICATION.md        ← This file
├── PHASE-1-SPEC.md                ← Terraform spec (no code yet)
├── terraform/
│   ├── environments/
│   │   ├── dev/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   ├── terraform.tfvars
│   │   │   └── backend.tf
│   │   └── prod/                  ← Future (Phase 3+)
│   │       └── ...
│   ├── modules/
│   │   ├── backend/               ← S3 + DynamoDB state management
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── messaging/             ← SQS queues + DLQs
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── notifications/         ← SNS alert topic
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── compute/               ← Lambda placeholders
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── api/                   ← API Gateway placeholders
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── secrets/               ← Secrets Manager paths
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── observability/         ← CloudWatch log groups
│   │       ├── main.tf
│   │       ├── variables.tf
│   │       └── outputs.tf
│   └── shared/
│       ├── tags.tf                ← Standard tagging
│       └── providers.tf           ← AWS provider config
└── scripts/
    ├── bootstrap-backend.sh       ← One-time S3/DynamoDB creation
    └── validate.sh                ← Pre-apply safety checks
```

---

## 3. AWS Resource List (Phase 1)

| Category | Resource | Name Pattern | Purpose |
|----------|----------|-------------|---------|
| **State Management** | S3 Bucket | `mystermyself-terraform-state-{account_id}` | Terraform remote state |
| | DynamoDB Table | `mystermyself-terraform-locks` | State locking |
| **Messaging** | SQS Queue | `mystermyself-order-processing` | Order event processing |
| | SQS DLQ | `mystermyself-order-processing-dlq` | Failed order events |
| | SQS Queue | `mystermyself-notification-dispatch` | Notification delivery |
| | SQS DLQ | `mystermyself-notification-dispatch-dlq` | Failed notifications |
| | SQS Queue | `mystermyself-webhook-ingest` | External webhook intake |
| | SQS DLQ | `mystermyself-webhook-ingest-dlq` | Failed webhooks |
| **Notifications** | SNS Topic | `mystermyself-alerts` | Ops/billing alerts |
| | SNS Subscription | Email → founder | Alert delivery |
| **Compute** | Lambda (placeholder) | `mystermyself-order-processor` | Python 3.12, 128MB, 30s |
| | Lambda (placeholder) | `mystermyself-notification-sender` | Python 3.12, 128MB, 30s |
| | Lambda (placeholder) | `mystermyself-webhook-handler` | Python 3.12, 128MB, 30s |
| **API** | API Gateway (HTTP) | `mystermyself-api` | REST endpoint placeholder |
| **Secrets** | Secrets Manager | `mystermyself/stripe-api-key` | Stripe key (empty) |
| | Secrets Manager | `mystermyself/supabase-service-key` | Supabase key (empty) |
| | Secrets Manager | `mystermyself/beehiiv-api-key` | Beehiiv key (empty) |
| **Observability** | CloudWatch Log Group | `/aws/lambda/mystermyself-order-processor` | 30-day retention |
| | CloudWatch Log Group | `/aws/lambda/mystermyself-notification-sender` | 30-day retention |
| | CloudWatch Log Group | `/aws/lambda/mystermyself-webhook-handler` | 30-day retention |
| | CloudWatch Log Group | `/mystermyself/api-gateway` | 30-day retention |

### NOT Included (by design)
- EC2, EKS, Amplify, NAT Gateway
- VPC (not needed for serverless)
- RDS (using Supabase)
- CloudFront (using Vercel)

---

## 4. Security Checklist

| # | Requirement | Implementation |
|---|-------------|---------------|
| 1 | No hardcoded secrets | All secrets in AWS Secrets Manager; referenced via data sources |
| 2 | State encryption | S3 bucket with `AES-256` server-side encryption |
| 3 | State access control | S3 bucket policy restricts to IAM role/user only |
| 4 | DynamoDB encryption | Default AWS-managed encryption |
| 5 | SQS encryption | Server-side encryption (SSE-SQS) on all queues |
| 6 | SNS encryption | AWS-managed KMS key |
| 7 | Lambda least privilege | Each Lambda gets a dedicated IAM role with minimal permissions |
| 8 | API Gateway auth | Placeholder for API key / JWT validation (Phase 2) |
| 9 | CloudWatch logs | No sensitive data in log output; 30-day retention |
| 10 | Budget guardrail | $50/month budget with 80% ($40) email alert |
| 11 | Terraform state locking | DynamoDB prevents concurrent modifications |
| 12 | No `terraform apply` in CI | Manual approval required for all applies |
| 13 | Tagging standard | All resources tagged: `Project=MysterMyself`, `Environment=dev`, `ManagedBy=terraform` |
| 14 | Secrets rotation | Secrets Manager paths created empty; values injected manually |
| 15 | DLQ monitoring | CloudWatch alarms on DLQ message count > 0 → SNS alert |

---

## 5. Estimated Monthly Cost

| Resource | Pricing Tier | Estimated Cost |
|----------|-------------|----------------|
| S3 (state file, < 1 KB) | Free tier / ~$0.01 | $0.00 |
| DynamoDB (on-demand, minimal reads) | Free tier eligible | $0.00 |
| SQS (3 queues + 3 DLQs, low volume) | 1M requests free/month | $0.00 |
| SNS (1 topic, email only) | Free for email | $0.00 |
| Lambda (3 functions, light usage) | 1M requests + 400K GB-s free | $0.00 |
| API Gateway (HTTP API, low traffic) | 1M requests free for 12 months | $0.00 |
| Secrets Manager (3 secrets) | $0.40/secret/month | **$1.20** |
| CloudWatch Logs (4 groups, minimal) | 5 GB ingest free | $0.00 |
| CloudWatch Alarms (DLQ alerts) | 10 free alarms | $0.00 |

### **Total Estimated Monthly Cost: ~$1.20 - $3.00**

> Well within the $50/month budget. Costs will only increase with actual usage in Phase 2+.

---

## 6. Next Command After Approval

Once you verify Phase 0 locally and approve this spec, run:

```bash
# Initialize the Terraform backend (one-time bootstrap)
cd infrastructure/terraform/environments/dev
chmod +x ../../scripts/bootstrap-backend.sh
../../scripts/bootstrap-backend.sh
```

This script will:
1. Create the S3 bucket for Terraform state
2. Create the DynamoDB table for state locking
3. Enable versioning and encryption on the S3 bucket
4. Output the backend configuration values

**After bootstrap, the next step is:**
```bash
terraform init
terraform plan -out=phase1.tfplan
# Review the plan, then:
terraform apply phase1.tfplan
```

> Do NOT run `terraform apply` until you have reviewed the plan output.

---

## Decisions Preserved

- **Runtime:** Python 3.12 for all Lambdas
- **Region:** us-east-1 (single region)
- **State:** Remote S3 + DynamoDB locking
- **Existing stack unchanged:** Vercel, Supabase, Stripe, Beehiiv, GitHub, Kiro, Claude, ChatGPT
- **No VPC required** — fully serverless architecture
- **Environment:** `dev` only for now; `prod` planned for Phase 3+
