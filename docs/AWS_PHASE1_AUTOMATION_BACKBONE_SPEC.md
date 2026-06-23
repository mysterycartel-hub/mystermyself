# MysterMyself — Phase 1 AWS Automation Backbone Spec

**Date**: June 20, 2026
**Status**: SPEC ONLY — Not deployed, awaiting approval
**Region**: us-east-1
**Profile**: mystermyself-dev
**Account**: 538774546545

---

## Goal

Create a low-cost serverless AWS event backbone that **supports** (not replaces) the existing Vercel + Supabase + Stripe + Beehiiv stack. This backbone handles asynchronous processing of user events that don't need to block the HTTP response in Next.js API routes.

**Core principle**: AWS extends the system. Vercel remains the front door. Supabase remains the database. Stripe remains payments. Beehiiv remains the newsletter.

---

## User Events to Support

| Event | Source | What Happens |
|-------|--------|--------------|
| New subscriber signup | `/api/newsletter/subscribe` | Queue for onboarding flow, district interest tagging, founder alert |
| Lead capture | `/api/leads` | Queue for enrichment, district interest recording |
| District page visit with interest signal | Client-side / API | Queue for interest tracking and segment building |
| Product purchased | `/api/webhooks/stripe` | Queue for access provisioning, founder alert |
| Subscription cancelled | `/api/webhooks/stripe` | Queue for access revocation, founder alert |
| Resource added to library | Future admin action | Queue for categorization and tagging |
| Key business event | Any of the above | Founder SNS alert (email/SMS) |

---

## API Gateway Routes

A single **HTTP API** (not REST API — lower cost, faster) with the following routes:

| Method | Path | Purpose | Lambda Target |
|--------|------|---------|---------------|
| POST | `/ingest/subscriber` | External subscriber event ingest | subscriber-onboard |
| POST | `/ingest/interest` | District interest signal | district-interest |
| POST | `/ingest/purchase` | Product access event | product-access |
| POST | `/ingest/resource` | Resource categorization trigger | resource-categorizer |
| GET | `/health` | Health check | inline response |

**Base path**: `https://{api-id}.execute-api.us-east-1.amazonaws.com/v1`

**Auth**: IAM-based (Vercel API routes sign requests with AWS credentials) or API key header for simplicity in Phase 1.

---

## Lambda Handlers

All Lambdas use **Python 3.12** runtime with minimal dependencies.

### 1. subscriber-onboard
- **Trigger**: SQS queue `mystermyself-subscriber-onboard`
- **Purpose**: Process new subscriber signups
- **Actions**:
  - Validate payload
  - Record in Supabase (if not already via Next.js)
  - Tag subscriber in Beehiiv with enrichment data
  - Publish founder alert via SNS
- **Timeout**: 30s
- **Memory**: 128 MB

### 2. district-interest
- **Trigger**: SQS queue `mystermyself-district-interest`
- **Purpose**: Track which districts users express interest in
- **Actions**:
  - Record interest event in Supabase
  - Update subscriber tags in Beehiiv
  - Aggregate district popularity metrics
- **Timeout**: 30s
- **Memory**: 128 MB

### 3. product-access
- **Trigger**: SQS queue `mystermyself-product-access`
- **Purpose**: Handle paid product access provisioning
- **Actions**:
  - Validate Stripe payment event
  - Grant access in Supabase (purchases table)
  - Update subscriber tier
  - Publish founder alert via SNS (new sale)
- **Timeout**: 30s
- **Memory**: 128 MB

### 4. resource-categorizer
- **Trigger**: SQS queue `mystermyself-resource-categorize`
- **Purpose**: Auto-categorize resources added to the library
- **Actions**:
  - Parse resource metadata
  - Assign district, tier, and content-type tags
  - Update Supabase resource record
- **Timeout**: 60s
- **Memory**: 256 MB

### 5. founder-alert
- **Trigger**: SQS queue `mystermyself-founder-alerts`
- **Purpose**: Format and dispatch founder notifications
- **Actions**:
  - Format alert message based on event type
  - Publish to SNS topic `mystermyself-founder-alerts`
  - Log alert history
- **Timeout**: 15s
- **Memory**: 128 MB

---

## SQS Queues and DLQs

Each queue has a corresponding Dead Letter Queue (DLQ) for failed messages.

| Queue Name | DLQ Name | Visibility Timeout | Max Receive Count | Message Retention |
|------------|----------|-------------------|-------------------|-------------------|
| `mystermyself-subscriber-onboard` | `mystermyself-subscriber-onboard-dlq` | 60s | 3 | 7 days |
| `mystermyself-district-interest` | `mystermyself-district-interest-dlq` | 60s | 3 | 7 days |
| `mystermyself-product-access` | `mystermyself-product-access-dlq` | 60s | 3 | 14 days |
| `mystermyself-resource-categorize` | `mystermyself-resource-categorize-dlq` | 120s | 3 | 7 days |
| `mystermyself-founder-alerts` | `mystermyself-founder-alerts-dlq` | 30s | 3 | 3 days |

**DLQ alarm**: CloudWatch alarm triggers if any DLQ receives a message → founder SNS alert.

---

## SNS Founder Alerts

| Topic Name | Purpose | Subscribers |
|------------|---------|-------------|
| `mystermyself-founder-alerts` | All critical business events | Email: `mysterycartel@gmail.com` |

### Alert Types
- New subscriber signup (with district interest)
- New product sale (with amount + product name)
- Subscription cancelled
- DLQ message received (system issue)
- Daily digest (future — batch summary)

---

## Secrets Manager Paths

All secrets stored under a structured path. Lambdas retrieve at cold-start and cache.

| Path | Contains |
|------|----------|
| `/mystermyself/prod/supabase/url` | Supabase project URL |
| `/mystermyself/prod/supabase/service-role-key` | Supabase service role key |
| `/mystermyself/prod/stripe/secret-key` | Stripe secret key |
| `/mystermyself/prod/stripe/webhook-secret` | Stripe webhook signing secret |
| `/mystermyself/prod/beehiiv/api-key` | Beehiiv API key |
| `/mystermyself/prod/beehiiv/publication-id` | Beehiiv publication ID |
| `/mystermyself/dev/supabase/url` | Dev Supabase URL |
| `/mystermyself/dev/supabase/service-role-key` | Dev Supabase service role key |

**Cost**: ~$0.40/secret/month × 8 secrets = ~$3.20/month

---

## CloudWatch Log Retention

| Log Group | Retention | Source |
|-----------|-----------|--------|
| `/aws/lambda/mystermyself-subscriber-onboard` | 30 days | Lambda |
| `/aws/lambda/mystermyself-district-interest` | 30 days | Lambda |
| `/aws/lambda/mystermyself-product-access` | 30 days | Lambda |
| `/aws/lambda/mystermyself-resource-categorizer` | 30 days | Lambda |
| `/aws/lambda/mystermyself-founder-alert` | 30 days | Lambda |
| `/aws/apigateway/mystermyself-api` | 30 days | API Gateway |

All log groups created with explicit 30-day retention to prevent unbounded cost growth.

---

## S3 Storage Plan

| Bucket Name | Purpose | Lifecycle |
|-------------|---------|-----------|
| `mystermyself-terraform-state` | Terraform remote state + lock (DynamoDB) | Versioning enabled, never delete |
| `mystermyself-assets-prod` | Future: resource library PDFs, images, downloads | Intelligent-Tiering after 30 days |

**State bucket**: Created manually (one-time bootstrap) before first `terraform apply`.

---

## Terraform Folder Structure

```
infra/
├── main.tf                         # Provider config, backend, module calls
├── variables.tf                    # Shared input variables
├── outputs.tf                      # Exported ARNs, URLs, queue URLs
├── versions.tf                     # Required provider versions
├── environments/
│   ├── dev.tfvars                  # Dev variable values
│   └── prod.tfvars                 # Prod variable values
└── modules/
    ├── secrets/
    │   ├── main.tf                 # Secrets Manager resources
    │   ├── variables.tf
    │   └── outputs.tf
    ├── queues/
    │   ├── main.tf                 # SQS queues + DLQs
    │   ├── variables.tf
    │   └── outputs.tf
    ├── alerts/
    │   ├── main.tf                 # SNS topics + subscriptions
    │   ├── variables.tf
    │   └── outputs.tf
    ├── functions/
    │   ├── main.tf                 # Lambda function definitions + IAM roles
    │   ├── variables.tf
    │   └── outputs.tf
    ├── api/
    │   ├── main.tf                 # API Gateway HTTP API + routes + integrations
    │   ├── variables.tf
    │   └── outputs.tf
    ├── storage/
    │   ├── main.tf                 # S3 buckets
    │   ├── variables.tf
    │   └── outputs.tf
    └── logging/
        ├── main.tf                 # CloudWatch log groups with retention
        ├── variables.tf
        └── outputs.tf
```

### Lambda Source Structure

```
lambdas/
├── subscriber_onboard/
│   ├── handler.py
│   └── requirements.txt
├── district_interest/
│   ├── handler.py
│   └── requirements.txt
├── product_access/
│   ├── handler.py
│   └── requirements.txt
├── resource_categorizer/
│   ├── handler.py
│   └── requirements.txt
└── founder_alert/
    ├── handler.py
    └── requirements.txt
```

---

## What Is Allowed

| Service | Usage |
|---------|-------|
| API Gateway HTTP API | Single API, pay-per-request |
| Lambda (Python 3.12) | 5 functions, event-driven |
| SQS Standard Queues | 5 queues + 5 DLQs |
| SNS | 1 founder alert topic |
| Secrets Manager | Structured secret paths |
| CloudWatch Logs | 30-day retention on all groups |
| S3 | Terraform state + future assets |
| IAM | Least-privilege roles per Lambda |
| DynamoDB | Terraform state lock table only |
| Terraform | Infrastructure as code (plan only until approved) |

---

## What Is NOT Allowed

| Service/Practice | Reason |
|------------------|--------|
| EC2 | Not serverless, unnecessary cost |
| RDS | Supabase is the database |
| EKS | Overkill for event processing |
| Amplify | Not needed — Vercel handles frontend |
| NAT Gateway | Expensive, Lambdas don't need VPC |
| Bedrock (production) | Not Phase 1 scope |
| Hardcoded secrets | All secrets via Secrets Manager |
| `terraform apply` without approval | Must be explicitly approved |
| Replacing Vercel, Supabase, Stripe, Beehiiv | AWS supports, does not replace |
| Inventing new brands/districts/characters | Canon is fixed |
| Direct production deployment | Requires explicit founder approval |

---

## Estimated Monthly Cost (Low Traffic)

| Service | Estimate |
|---------|----------|
| Lambda | $0.00 (free tier: 1M requests + 400K GB-seconds) |
| SQS | $0.00 (free tier: 1M requests) |
| SNS | $0.00 (free tier: 1M publishes) |
| API Gateway | $0.00–$1.00 (first 1M requests free) |
| Secrets Manager | ~$3.20 (8 secrets × $0.40) |
| CloudWatch Logs | ~$0.50 (minimal log volume) |
| S3 | ~$0.10 (state files + minimal storage) |
| DynamoDB (state lock) | ~$0.00 (on-demand, near-zero reads) |
| **Total** | **~$4–5/month** |

---

## Integration Flow (How AWS Connects to Existing Stack)

```
User Action
    │
    ▼
Vercel (Next.js API Route)
    │
    ├── Immediate: respond to user (200 OK)
    │
    └── Async: publish message to SQS queue
              │
              ▼
         AWS Lambda (processes event)
              │
              ├── Read secrets from Secrets Manager
              ├── Write to Supabase (via service role key)
              ├── Update Beehiiv tags (via API key)
              └── Publish to SNS (founder alerts)
```

**Key principle**: The user never waits for AWS. Next.js handles the response immediately, then fires an async event to SQS for background processing.
