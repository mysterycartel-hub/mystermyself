# MysterMyself — Full Audit & Phase 1 Spec

**Date:** 2026-06-20  
**Profile:** mystermyself-dev  
**Region:** us-east-1  
**Credits:** $200 remaining, $0 used  
**myApplications app:** mystermyself-phase1

---

## A. Environment Verification

| Check | Result | Notes |
|-------|--------|-------|
| AWS CLI | **INSTALLED** (v2.33.15) | Available in sandbox; credentials are on your local Windows machine |
| AWS Profile `mystermyself-dev` | **EXISTS LOCALLY** | Not configured in this Kiro sandbox (expected) |
| Terraform | **NOT IN SANDBOX** | Must verify on your local machine: `terraform version` |
| IAM User | **CONFIRMED** (per your context) | CLI access active |
| Credits | **$200 remaining** | $0 spent |
| Budget guardrail | **VERIFY LOCALLY** | Confirm `MysterMyself-Phase1-Monthly-Budget` exists |
| Build region | **us-east-1** | Credit task was us-east-2 |
| myApplications | **mystermyself-phase1** | Created in console |

### Commands to Run on Your Windows Machine

```powershell
# 1. Verify identity
aws sts get-caller-identity --profile mystermyself-dev

# 2. Verify AWS CLI version
aws --version

# 3. Verify Terraform
terraform version
```


---

## B. AWS Cleanup Status

> Cannot execute from Kiro sandbox (no credentials). Run these on your local machine.

### Commands for us-east-1 (build region)

```powershell
# EC2 instances
aws ec2 describe-instances --profile mystermyself-dev --region us-east-1 ^
  --filters "Name=instance-state-name,Values=running,stopped,stopping,pending" ^
  --query "Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,LaunchTime]" ^
  --output table

# RDS databases
aws rds describe-db-instances --profile mystermyself-dev --region us-east-1 ^
  --query "DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,Engine,DBInstanceStatus]" ^
  --output table

# Lambda functions
aws lambda list-functions --profile mystermyself-dev --region us-east-1 ^
  --query "Functions[*].[FunctionName,Runtime,LastModified,MemorySize]" ^
  --output table

# CloudWatch log groups
aws logs describe-log-groups --profile mystermyself-dev --region us-east-1 ^
  --query "logGroups[*].[logGroupName,storedBytes,retentionInDays]" ^
  --output table
```

### Commands for us-east-2 (credit task region)

```powershell
# EC2 instances
aws ec2 describe-instances --profile mystermyself-dev --region us-east-2 ^
  --filters "Name=instance-state-name,Values=running,stopped,stopping,pending" ^
  --query "Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,LaunchTime]" ^
  --output table

# RDS databases
aws rds describe-db-instances --profile mystermyself-dev --region us-east-2 ^
  --query "DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,Engine,DBInstanceStatus]" ^
  --output table

# Lambda functions
aws lambda list-functions --profile mystermyself-dev --region us-east-2 ^
  --query "Functions[*].[FunctionName,Runtime,LastModified,MemorySize]" ^
  --output table

# CloudWatch log groups
aws logs describe-log-groups --profile mystermyself-dev --region us-east-2 ^
  --query "logGroups[*].[logGroupName,storedBytes,retentionInDays]" ^
  --output table
```

### Expected Clean State

| Resource | us-east-1 | us-east-2 |
|----------|-----------|-----------|
| EC2 instances | 0 | 0 |
| RDS databases | 0 | 0 |
| Lambda functions | 0 or test-only | 0 or test-only |
| CloudWatch logs | 0 or test-only | 0 or test-only |

> If any test Lambda or logs exist from the credit activation, list them here so we can decide to delete.


---

## C. Project / Repository Audit

### Framework & Build

| Item | Value |
|------|-------|
| Framework | **Next.js 14.2.5** (App Router) |
| Language | TypeScript 5.5 |
| Package manager | npm (package-lock.json present) |
| Styling | Tailwind CSS 3.4.6 + inline styles |
| UI libraries | Radix UI, Lucide React, Framer Motion 11 |
| Build command | `next build` |
| Dev command | `next dev` |
| Repo size | ~9.8 MB (excluding .git, node_modules) |
| Node version | Not pinned (no .nvmrc or engines field) |

### Dependencies (production)

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.5 | Framework |
| react / react-dom | ^18.3.1 | UI runtime |
| @supabase/supabase-js | ^2.45.0 | Auth + database |
| stripe | ^16.2.0 | Server-side payments |
| @stripe/stripe-js | ^4.1.0 | Client-side Stripe |
| framer-motion | ^11.3.8 | Animations |
| lucide-react | ^0.417.0 | Icons |
| lightweight-charts | ^5.2.0 | TCU market charts |
| @radix-ui/react-separator | ^1.1.10 | UI primitive |
| clsx + tailwind-merge | latest | Classname utilities |

### Pages (63 total)

**Core pages:**
- `/` — Homepage (full composition: hero, subscribe, districts, map, passport, products)
- `/opportunity-list` — Lead capture / newsletter signup
- `/auth` — Magic link sign-in (Supabase OTP)
- `/dashboard` — Authenticated user dashboard
- `/passport` — Public passport profile
- `/pricing` — Product pricing page
- `/welcome` — Post-purchase landing
- `/coast` — District overview + `[district]` dynamic route
- `/admin` — Admin dashboard

**District pages (direct routes):**
- `/market-marina` — Trading Chef Universe hub
- `/route-harbor` — Medical courier / gig income
- `/flavor-district` — Food business (Breaded)
- `/fantasy-island` — Fantasy sports
- `/creator-pier` — Creator tools
- `/founder-island` — Business ownership
- `/legacy-point` — Long-term wealth
- `/library-vault` — Resource library
- `/blueprint-bay` — Playbooks/guides

**Duplicate district pages in `app/pages/`:**
- `/pages/market-marina`, `/pages/route-harbor`, `/pages/flavor-district`, etc.
- These are simplified `<DistrictPage>` components — appear to be older versions

**Feature pages:**
- `/academy` + `/academy/[lesson]` — TCU lessons
- `/chart-kitchen` — Live chart tool
- `/kitchen-rush` — Trading game/simulator
- `/journal` — Trade journal
- `/missions` — Gamified missions
- `/tcu-theater` — Video content
- `/products/medical-courier-guide` — Single product page

**Legal/info:**
- `/about`, `/terms`, `/privacy`, `/refund`, `/disclaimer`, `/affiliate-disclosure`

### API Routes (12 endpoints)

| Route | Method | Integration | Purpose |
|-------|--------|-------------|---------|
| `/api/leads` | POST | Supabase | Lead capture form submission |
| `/api/newsletter/subscribe` | POST | Beehiiv API | Newsletter signup with tags |
| `/api/checkout` | POST | Stripe | Create checkout session |
| `/api/webhooks/stripe` | POST | Stripe + Supabase | Webhook: payment, subscription, invoice |
| `/api/passport/register` | POST | Supabase | Create passport profile |
| `/api/passport/status` | GET | Supabase | Get user passport data |
| `/api/passport/stamp` | POST | Supabase | Award district stamp |
| `/api/passport/xp` | POST | Supabase | Award XP to user |
| `/api/coach` | POST | OpenAI/Anthropic | AI trading coach |
| `/api/admin/leads` | GET | Supabase | Admin: view leads |
| `/api/admin/stats` | GET | Supabase | Admin: dashboard stats |
| `/auth/callback` | GET | Supabase | OAuth/magic link callback |

### Auth Setup

| Item | Detail |
|------|--------|
| Provider | **Supabase Auth** |
| Method | Magic link (email OTP) |
| Callback | `/auth/callback/route.ts` — exchanges code for session |
| Auth page | `/auth` — `AuthForm` component |
| Middleware | **NONE** — no route protection exists |
| Social login | Google, Yahoo, Apple listed as "Coming Soon" (disabled) |

### Supabase Usage

| Feature | Implementation |
|---------|---------------|
| Client | `lib/supabase.ts` — lazy singleton (client + server) |
| Auth | Magic link OTP via `supabase.auth.signInWithOtp()` |
| Tables used | leads, subscribers, products, orders, community_members |
| Passport tables | passport_profiles, passport_xp_events, passport_stamps, passport_badges, passport_missions |
| TCU tables | profiles, missions, mission_progress, journal_entries, chart_analyses |
| RLS | Enabled on all tables |
| Views | `admin_stats`, `passport_summary` |

### Stripe Usage

| Feature | Implementation |
|---------|---------------|
| Server client | `lib/stripe.ts` — Stripe SDK with API version 2024-06-20 |
| Checkout | `/api/checkout` — creates payment/subscription sessions |
| Webhook | `/api/webhooks/stripe` — handles 3 event types |
| Events handled | `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed` |
| Products | 8 seeded (Gold Playbook, TCU Membership, Courier Guide, Food Blueprint, Fantasy Bible, AI Kit, Money Move Pack) |
| Access control | `resolveAccessTag()` maps purchases to access tags in Supabase |

### Beehiiv Usage

| Feature | Implementation |
|---------|---------------|
| API integration | `/api/newsletter/subscribe` — direct API call to Beehiiv v2 |
| Tags | `website_signup` + lane-specific interest tags (7 lanes) |
| Custom fields | source, signup_page, brand, first_name |
| Fallback | Logs subscriber if API fails (graceful degradation) |
| Publication | `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7` |
| Newsletter templates | 6 templates in `content/newsletter-templates/` |

### Environment Variables Expected

| Variable | Purpose | Scope |
|----------|---------|-------|
| `BEEHIIV_API_KEY` | Newsletter API | Server |
| `BEEHIIV_PUBLICATION_ID` | Newsletter pub ID | Server |
| `NEXT_PUBLIC_BEEHIIV_SIGNUP_URL` | Public signup link | Client |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin | Server |
| `STRIPE_SECRET_KEY` | Stripe server key | Server |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing | Server |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client key | Client |
| `MARKET_DATA_API_KEY` | Market data (TCU) | Server |
| `OPENAI_API_KEY` | AI Coach | Server |
| `ANTHROPIC_API_KEY` | AI Coach | Server |

### Vercel Setup

| Item | Status |
|------|--------|
| vercel.json | Present — 6 redirects configured |
| .vercel/ directory | NOT present (not committed) |
| Deployment target | Vercel (confirmed by redirects + NEXT_PUBLIC_SITE_URL) |
| Framework preset | Next.js (auto-detected by Vercel) |

### Database Schemas (3 files in `db/`)

| File | Tables | Purpose |
|------|--------|---------|
| `schema.sql` | leads, subscribers, products, orders, community_members | Core business data |
| `passport-schema.sql` | passport_profiles, passport_xp_events, passport_stamps, passport_badges, passport_missions | Gamification system |
| `tcu-schema.sql` | profiles, missions, mission_progress, journal_entries, chart_analyses | Trading education |


---

## D. What Is Safe to Delete

| Item | Path | Reason | Risk |
|------|------|--------|------|
| `TEST.txt` | `/TEST.txt` | Junk test file (14 bytes, no content) | None |
| `tcu_sound_identity_vercel_package.zip` | `/tcu_sound_identity_vercel_package.zip` | 11KB zip in repo root — should be in assets or removed | None |
| `app/pages/` directory (9 files) | `/app/pages/*.tsx` | **Duplicate** simplified district pages — same districts exist as full pages at `/app/market-marina/`, `/app/route-harbor/`, etc. | Low — verify no internal links point to `/pages/*` routes |
| `src/` directory | `/src/app/` + `/src/components/` | Partial duplicate — only contains `market-marina/tcu-sound-identity` and `components/tcu/TCUSoundIdentitySystem.jsx`. Content appears to be an older experiment. | Low — check if anything imports from `src/` |
| `infrastructure/PHASE-0-VERIFICATION.md` | Previous session's draft | Superseded by this document | None |
| `infrastructure/PHASE-1-SPEC.md` | Previous session's draft | Superseded by this document | None |

### Deletion Commands (after confirmation)

```bash
rm TEST.txt
rm tcu_sound_identity_vercel_package.zip
rm -rf app/pages/
rm -rf src/
rm infrastructure/PHASE-0-VERIFICATION.md
rm infrastructure/PHASE-1-SPEC.md
```

---

## E. What Should NOT Be Touched

| Item | Reason |
|------|--------|
| `app/` (except `app/pages/`) | Active application routes — all 63 pages |
| `components/` | Active UI components (30+ files, 11 subdirectories) |
| `lib/` | All integrations (Supabase, Stripe, Beehiiv, passport, kitchen, etc.) |
| `db/` (3 SQL schemas) | Database source of truth — may not be deployed yet but defines the data model |
| `.env.local.example` | Environment variable documentation |
| `vercel.json` | Active redirect rules |
| `package.json` / `package-lock.json` | Dependency lock — do not modify without reason |
| `next.config.js` / `tsconfig.json` | Build configuration |
| `tailwind.config.js` / `postcss.config.js` | Styling pipeline |
| `public/robots.txt` | SEO configuration |
| `content/newsletter-templates/` | Business content (6 newsletter drop templates) |
| `design-system/` | Brand documentation (4 district design docs) |
| `docs/` | Business source-of-truth documents (8 files) |
| `.claude/` / `.agents/` | AI tooling configuration |
| Existing districts/brands/characters | Do not invent new ones |

---

## F. Recommended Phase 1 Build Order

### Phase 1 Sequence (8 steps)

```
Step 1: Cleanup
  └── Delete safe-to-delete items (Section D)
  └── Commit clean state

Step 2: Terraform Bootstrap
  └── Create S3 state bucket + DynamoDB lock (bootstrap script)
  └── Initialize terraform backend
  └── Commit terraform skeleton

Step 3: Foundation Layer (zero-cost)
  └── SNS ops-alerts topic + email subscription
  └── CloudWatch log groups (4 groups, 30-day retention)
  └── Secrets Manager paths (4 secrets, empty placeholders)

Step 4: Messaging Layer
  └── SQS: subscriber-onboarding queue + DLQ
  └── SQS: interest-tracking queue + DLQ
  └── SQS: product-access queue + DLQ
  └── SQS: webhook-ingest queue + DLQ
  └── DLQ CloudWatch alarms → SNS

Step 5: Compute Layer (placeholders)
  └── Lambda: subscriber-onboarding-handler (Python 3.12)
  └── Lambda: interest-tracker (Python 3.12)
  └── Lambda: product-access-handler (Python 3.12)
  └── Lambda: webhook-ingest-handler (Python 3.12)
  └── IAM roles (least-privilege per function)

Step 6: API Layer
  └── API Gateway HTTP API
  └── Routes: POST /webhooks/stripe, POST /webhooks/beehiiv
  └── Route: GET /health
  └── Lambda integrations

Step 7: Storage Plan
  └── S3 bucket for resource library assets
  └── Bucket policy (private, no public access)
  └── Lifecycle rules (optional: archive after 90 days)

Step 8: Validation & Plan
  └── terraform plan (review only)
  └── Cost validation against $50 budget
  └── Security checklist verification
  └── Document ready for terraform apply approval
```

### Why This Order

1. **Cleanup first** — removes confusion, reduces noise
2. **State backend** — required before any other Terraform
3. **Foundation** — alerting must exist before compute (so failures are visible)
4. **Messaging** — decouples all event processing
5. **Compute** — functions that consume from queues
6. **API** — entry point that routes to functions
7. **Storage** — supports resource library use case
8. **Validation** — safety gate before apply


---

## G. Kiro Spec Proposal — MysterMyself AWS Automation Backbone

### Spec Overview

| Field | Value |
|-------|-------|
| **Spec name** | MysterMyself AWS Automation Backbone |
| **Goal** | Serverless event-driven workflow foundation |
| **Runtime** | Python 3.12 |
| **Region** | us-east-1 |
| **IaC** | Terraform (~1.5+) |
| **Budget** | $50/month max (estimated ~$2-4/month at low volume) |
| **Deployment** | Manual `terraform apply` after plan review |

### Use Cases Supported

| # | Use Case | AWS Services | Connects To |
|---|----------|-------------|-------------|
| 1 | **Subscriber Onboarding** | SQS → Lambda → Secrets Manager | Beehiiv API, Supabase (leads table) |
| 2 | **District Interest Tracking** | SQS → Lambda → CloudWatch | Supabase (leads.interest, passport_stamps) |
| 3 | **Paid Product Access** | SQS → Lambda → Secrets Manager | Stripe webhooks, Supabase (product_access) |
| 4 | **Resource Library Categorization** | S3 + Lambda → CloudWatch | Supabase (products table metadata) |

### Architecture

```
                    ┌──────────────┐
                    │  Vercel App  │ (existing — unchanged)
                    │  Next.js 14  │
                    └──────┬───────┘
                           │ HTTPS webhooks
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   AWS us-east-1                               │
│                                                              │
│  ┌──────────────────┐         ┌────────────────────────┐    │
│  │ API Gateway HTTP │────────▶│ webhook-ingest-handler │    │
│  │ POST /webhooks/* │         │ (Python 3.12 Lambda)   │    │
│  │ GET /health      │         └──────────┬─────────────┘    │
│  └──────────────────┘                    │                   │
│                                          │ Routes to queues  │
│           ┌──────────────────────────────┼──────────┐        │
│           ▼                              ▼          ▼        │
│  ┌─────────────────┐  ┌─────────────────────┐  ┌────────┐  │
│  │ subscriber-     │  │ product-access       │  │interest│  │
│  │ onboarding      │  │ queue                │  │tracking│  │
│  │ queue           │  │                      │  │queue   │  │
│  └────────┬────────┘  └──────────┬───────────┘  └───┬────┘  │
│           ▼                      ▼                   ▼       │
│  ┌─────────────────┐  ┌─────────────────────┐  ┌────────┐  │
│  │ onboarding-     │  │ product-access-      │  │interest│  │
│  │ handler Lambda  │  │ handler Lambda       │  │tracker │  │
│  └────────┬────────┘  └──────────┬───────────┘  └───┬────┘  │
│           │                      │                   │       │
│           ▼                      ▼                   ▼       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │               Secrets Manager                           │ │
│  │  stripe-api-key | supabase-key | beehiiv-key | stripe-wh│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────┐    ┌────────────────────────────┐   │
│  │  CloudWatch Logs   │    │  SNS ops-alerts → Email    │   │
│  │  (30-day retention)│    │  (DLQ alarms trigger)      │   │
│  └────────────────────┘    └────────────────────────────┘   │
│                                                              │
│  ┌────────────────────┐    ┌────────────────────────────┐   │
│  │  S3: resource-     │    │  Terraform State:          │   │
│  │  library-assets    │    │  S3 + DynamoDB lock        │   │
│  └────────────────────┘    └────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Terraform Module Structure

```
infrastructure/terraform/
├── environments/dev/
│   ├── main.tf            # Composes all modules
│   ├── variables.tf       # All input vars
│   ├── outputs.tf         # Exported ARNs/URLs
│   ├── backend.tf         # S3 state config
│   ├── providers.tf       # AWS provider, version pins
│   └── terraform.tfvars   # Values (git-ignored if sensitive)
├── modules/
│   ├── state-backend/     # S3 bucket + DynamoDB lock table
│   ├── messaging/         # 4 SQS queues + 4 DLQs
│   ├── notifications/     # SNS topic + email sub
│   ├── compute/           # 4 Lambda functions + IAM roles
│   ├── api/               # API Gateway HTTP API + routes
│   ├── secrets/           # 4 Secrets Manager paths
│   ├── storage/           # S3 resource library bucket
│   └── observability/     # CloudWatch log groups + DLQ alarms
└── scripts/
    ├── bootstrap-backend.sh   # One-time state infra creation
    └── destroy-all.sh         # Emergency teardown
```

### Resource Inventory (Phase 1)

| # | Resource | Name | Cost |
|---|----------|------|------|
| 1 | S3 Bucket (state) | `mystermyself-tfstate-{account}` | $0.00 |
| 2 | DynamoDB Table (lock) | `mystermyself-tfstate-lock` | $0.00 |
| 3 | SQS Queue | `mystermyself-subscriber-onboarding` | $0.00 |
| 4 | SQS DLQ | `mystermyself-subscriber-onboarding-dlq` | $0.00 |
| 5 | SQS Queue | `mystermyself-interest-tracking` | $0.00 |
| 6 | SQS DLQ | `mystermyself-interest-tracking-dlq` | $0.00 |
| 7 | SQS Queue | `mystermyself-product-access` | $0.00 |
| 8 | SQS DLQ | `mystermyself-product-access-dlq` | $0.00 |
| 9 | SQS Queue | `mystermyself-webhook-ingest` | $0.00 |
| 10 | SQS DLQ | `mystermyself-webhook-ingest-dlq` | $0.00 |
| 11 | SNS Topic | `mystermyself-ops-alerts` | $0.00 |
| 12 | SNS Subscription | Email → founder | $0.00 |
| 13 | Lambda | `mystermyself-subscriber-onboarding-handler` | $0.00 |
| 14 | Lambda | `mystermyself-interest-tracker` | $0.00 |
| 15 | Lambda | `mystermyself-product-access-handler` | $0.00 |
| 16 | Lambda | `mystermyself-webhook-ingest-handler` | $0.00 |
| 17 | API Gateway (HTTP) | `mystermyself-api` | $0.00 |
| 18 | Secrets Manager | `mystermyself/stripe-api-key` | $0.40/mo |
| 19 | Secrets Manager | `mystermyself/stripe-webhook-secret` | $0.40/mo |
| 20 | Secrets Manager | `mystermyself/supabase-service-key` | $0.40/mo |
| 21 | Secrets Manager | `mystermyself/beehiiv-api-key` | $0.40/mo |
| 22 | CloudWatch Log Group (×5) | `/aws/lambda/mystermyself-*` + `/aws/apigateway/*` | $0.00 |
| 23 | CloudWatch Alarm (×4) | DLQ message count > 0 | $0.00 |
| 24 | S3 Bucket (assets) | `mystermyself-resource-library` | $0.00 |
| **TOTAL** | | | **~$1.60/mo** |

### Security Rules

1. No hardcoded secrets — all in Secrets Manager
2. No IAM wildcard (`*`) actions or resources
3. Each Lambda gets its own IAM role (least privilege)
4. S3 buckets: all public access blocked
5. SQS: server-side encryption enabled
6. API Gateway: throttling (100 burst / 50 sustained)
7. Terraform state: encrypted, versioned, locked
8. No EC2, EKS, VPC, NAT Gateway, Amplify
9. 30-day CloudWatch log retention (cost control)
10. DLQ alarms notify immediately via SNS email

### What This Does NOT Change

| System | Status |
|--------|--------|
| Vercel frontend | Unchanged — still serves Next.js app |
| Supabase database | Unchanged — still the primary data store |
| Stripe payments | Unchanged — webhooks can optionally route through AWS API Gateway later |
| Beehiiv newsletter | Unchanged — Lambda can call Beehiiv API as a processor |
| GitHub repo | Unchanged — Terraform code lives in `infrastructure/` |
| Existing districts/brands/characters | NOT modified or invented |

### Cost Summary

| Scenario | Monthly Cost |
|----------|-------------|
| Idle (no traffic) | ~$1.60 (Secrets Manager only) |
| Low traffic (< 1000 events/day) | ~$2.00 |
| Moderate (< 10,000 events/day) | ~$3.50 |
| Budget limit | $50.00 |
| Credits remaining | $200.00 |

---

## Next Steps (After You Approve)

1. **Run the AWS cleanup commands** (Section B) on your local machine
2. **Paste the results** back here so I can confirm clean state
3. **Confirm this spec is approved**
4. I will then generate:
   - Complete Terraform code (all 8 modules)
   - Bootstrap script
   - `.gitignore` for Terraform
   - Python Lambda placeholder handlers
   - Push to a new branch + open PR

**No infrastructure will be created until you run `terraform apply` locally.**

---

*Generated by Kiro — 2026-06-20*
