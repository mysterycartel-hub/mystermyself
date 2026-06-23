# MysterMyself — Tool Lanes and Responsibilities

**Date**: June 20, 2026
**Version**: 1.0

---

## Tool Assignments

Each tool in the MysterMyself build system has a defined lane. Tools do not replace each other.

---

## ChatGPT — Command Center / Canon Brain

| Responsibility | Details |
|----------------|---------|
| Brand strategy | Messaging, voice, naming, positioning |
| Canon authority | Districts, characters, brands, world rules |
| Content writing | Marketing copy, email sequences, product descriptions |
| Decision framing | Present options to Maurice with recommendations |
| Session memory | Long-term project context and decisions |
| Prompt engineering | Craft prompts for other agents |

**Does NOT**: Write code, run builds, access repos, deploy, handle secrets

---

## Kiro — Local Repo Executor

| Responsibility | Details |
|----------------|---------|
| File creation | Docs, specs, scaffolds, code files |
| File editing | Route pages, components, lib modules |
| Build validation | npm run build, lint, typecheck |
| Git operations | status, diff, add, commit (NOT push) |
| AWS CLI reads | list, describe, get (NOT create/update/delete) |
| Spec generation | Requirements, design, task lists |
| Steering files | Canon rules, build rules, session context |
| Terraform skeleton | .tf files (NOT apply/destroy) |
| Audit reports | File inventory, risk assessment, health checks |

**Does NOT**: Push to GitHub, deploy to Vercel, run terraform apply, handle live secrets, make production changes

---

## Claude Code — Heavy Builder / Refactor Assistant

| Responsibility | Details |
|----------------|---------|
| Multi-file refactors | Complex rewrites across many files |
| Large code generation | Full feature implementations |
| Test writing | Unit tests, integration tests |
| Complex debugging | Multi-step troubleshooting |
| Performance optimization | Code-level improvements |
| Migration support | Breaking changes, API upgrades |

**Does NOT**: Deploy, push, handle secrets, make canon decisions, create AWS resources

---

## AWS Startup Advisor — AWS Safety Auditor

| Responsibility | Details |
|----------------|---------|
| Cost review | Verify free-tier compliance |
| Architecture review | Validate service choices |
| Security audit | IAM policies, encryption, least privilege |
| Terraform plan review | Check plan output before apply |
| Resource inventory | Verify what exists in the account |
| Best practices | Recommend patterns for startup workloads |

**Does NOT**: Run commands, write code, deploy, handle secrets directly

---

## AWS CLI + Terraform — Infrastructure Hands

| Responsibility | Details |
|----------------|---------|
| Resource creation | Only after explicit Maurice approval |
| State management | Terraform state in S3 |
| Configuration | Provider setup, module structure |
| Planning | terraform plan (safe, read-only) |

**Requires explicit approval for**: terraform apply, terraform destroy, any aws create/update/delete command

---

## GitHub — Source of Truth

| Responsibility | Details |
|----------------|---------|
| Version control | All code history |
| Branch management | Feature branches, main protection |
| Pull requests | Code review before merge |
| CI/CD trigger | Push triggers Vercel deploy |

**Push requires**: Explicit Maurice approval

---

## Vercel — Frontend Deployment

| Responsibility | Details |
|----------------|---------|
| Build hosting | Next.js production builds |
| Preview deploys | Automatic on branch push |
| Production deploys | Manual promote or main branch |
| Environment variables | Secrets stored in Vercel dashboard |
| Redirects | vercel.json rules |

**Production deploy requires**: Explicit Maurice approval

---

## Supabase — Auth / Data

| Responsibility | Details |
|----------------|---------|
| Authentication | User auth via passport system |
| Database | PostgreSQL with RLS |
| Storage | Future file uploads |
| Schema management | SQL files in db/ folder |

**Schema migration execution requires**: Explicit Maurice approval

---

## Stripe — Payments / Products

| Responsibility | Details |
|----------------|---------|
| Checkout | Product purchase sessions |
| Webhooks | Payment event handling |
| Subscriptions | Recurring membership billing |
| Products | Price IDs and catalog |

**Product/price changes require**: Explicit Maurice approval

---

## Beehiiv — Email / Subscribers

| Responsibility | Details |
|----------------|---------|
| Newsletter delivery | Email campaigns |
| Subscriber management | Tags, segments, custom fields |
| API integration | Server-side subscription creation |
| Landing pages | Beehiiv-hosted signup pages |

**Live API changes require**: Explicit Maurice approval

---

## Handoff Protocol

When work moves between tools:

1. **ChatGPT → Kiro**: ChatGPT provides strategy/spec, Kiro receives as mission prompt
2. **Kiro → Claude Code**: Kiro creates task list, Claude Code executes heavy builds
3. **Kiro → AWS Advisor**: Kiro outputs terraform plan, Advisor reviews safety
4. **Any → Maurice**: Red gate reached, awaiting approval
5. **Maurice → Any**: "Approved" triggers next phase execution
