# MysterMyself — Memory Blocks

**Last Updated**: June 24, 2026
**Purpose**: Permanent memory anchor so agents across sessions do not drift, repeat work, or lose context.

---

## MEMORY BLOCK 1 — Current Production State

### Project Identity
- **Ecosystem**: MysterMyself / Scott-King Coast
- **Repo**: mysterycartel-hub/mystermyself
- **Vercel Project**: mystermyself-git
- **Live Domain**: mystermyself.com
- **Branch**: main
- **Production Status**: READY

### Completed and Merged (do not redo)
| Phase | Description |
|-------|-------------|
| OPS/001 | Source of truth audit |
| OPS/002 | Vercel production connection audit |
| OPS/003 | Production Safe Mode without OpenAI/Anthropic keys |
| OPS/004 | Automation Control Layer |
| OPS/004A | Link and Social Cleanup / funnel CTA fixes |

### Current Production Has
- Route audits (38/38 passing)
- Link audits (0 issues)
- Social audits (9 confirmed, 2 coming_soon)
- Canon audits (8/8 districts, 9/9 characters)
- Funnel audits (8/16 clean — remaining are informational)
- CEO reports (auto-generated)
- GitHub workflow (ops-site-audit.yml runs on PRs)
- Issue templates (ops-build, ops-diagnosis, ops-funnel)
- PR template (CEO-focused)
- Kiro steering rules (.kiro/steering/mystermyself-automation.md)
- Social link registry (data/ops/social-links.json)
- Funnel map (data/ops/funnel-map.json)
- Route map (data/ops/route-map.json)
- Scott-King Coast canon data (data/canon/scott-king-coast.json)

### Rules
- Do not restart
- Do not create a new repo
- Do not create a new Vercel project
- Do not touch duplicate Vercel projects
- Do not require OpenAI or Anthropic API keys yet

---

## MEMORY BLOCK 2 — Automation Role System

### Maurice is CEO Only
Maurice should NOT:
- Use PowerShell
- Use GitHub CLI
- Run npm commands
- Run git commands
- Manually diagnose files
- Repeat prompts across tools

### Role Split
| Role | Owner | Responsibilities |
|------|-------|-----------------|
| CEO vision, screenshots, approvals | Maurice | Gives missions, approves merges, clicks PR links |
| CEO command center, reviewer, auditor, prompt composer, tool router | ChatGPT | Converts missions into build commands, reviews PRs, tells Maurice merge/hold |
| Repo builder, file editor, branch creator, audit runner, build runner, PR handoff | Kiro | Diagnoses, builds, tests, pushes, provides PR links and CEO reports |
| Source of truth, PR approval gate | GitHub | Stores code, PRs require approval |
| Production deployment | Vercel | Auto-deploys main branch |
| Auth/database | Supabase | User auth, leads, products, passport |
| Newsletter/capture | Beehiiv | Subscriber management, tags, API |
| Visuals (later) | Canva | Brand design assets |
| Live click testing (later) | Browser/Playwright MCP | End-to-end route testing |

### Known Blocker
ChatGPT GitHub connector can read/review but may be blocked from write actions (creating PRs/issues/merges). Do not rely on ChatGPT for repo write actions.

### Correct Workflow
1. CEO gives mission
2. ChatGPT converts mission into approved build command
3. Kiro diagnoses first
4. Kiro builds only approved scope
5. Kiro runs `npm run ops:audit-all`
6. Kiro runs `npm run build`
7. Kiro pushes branch
8. Kiro provides PR link and CEO report
9. ChatGPT reviews PR/status
10. Maurice only approves merge when needed

If Kiro cannot auto-open a PR, it must provide the direct GitHub browser PR link. Maurice should only click CEO approval buttons, not operate terminal.

---

## MEMORY BLOCK 3 — Next Phase and Canon

### Next Phase
**OPS/004B — Opportunity List Capture Engine**

Do not build until diagnosis is complete and CEO approval is given.

**Mission**: Turn Opportunity List into the main easy-entry funnel:
- Visitor chooses lane → joins/signs in
- Selects opportunity/district
- Gets captured into correct segment
- Routes to product/resource/waitlist
- Can return later through dashboard/passport/progress

### Social Status (source: data/ops/social-links.json)

**MysterMyself:**
- YouTube: confirmed
- TikTok: confirmed
- Instagram: confirmed
- X: confirmed
- Rumble: confirmed
- Facebook: confirmed
- Beehiiv: confirmed

**Breaded Or Not?!:**
- Instagram: confirmed
- TikTok: confirmed
- Facebook: coming_soon (routes to /follow-the-coast)
- Order URL: coming_soon (routes to /follow-the-coast)

### Core Canon (do not invent new)

**Districts:**
- Route Harbor
- Market Marina
- Flavor District
- Blueprint Bay
- Creator Pier
- Legacy Point
- Fantasy Island
- Library Vault

**Lanes:**
- MysterMyself / Scott-King Coast hub
- Trading Chef / Trading Chef University
- Route Harbor / Courier Income Lab
- Breaded Or Not?! / Flavor District
- Newsletter Ready Desk
- Blueprint Bay / AI tools and automation
- Creator Pier / content engine
- Fantasy Island / live fantasy and subscriber updates
- Legacy Point / wealth, ownership and holdings

**TCU Characters:**
- Trading Chef
- Candle Kid
- Wickie
- Louie Liquidity
- Chef Goldie
- Grandma Market
- Nana Value
- Melissa Mayhem
- Melody Mayhem

### Site Completion Definition
A visitor must:
1. Land and understand Scott-King Coast
2. Choose a district/lane
3. Join the Opportunity List
4. Get captured into the right funnel
5. Access a product/resource/waitlist
6. Follow the brand through consent-based CTAs
7. Return later through dashboard/passport/progress

Without: dead buttons, fake socials, broken routes, or signup confusion.
