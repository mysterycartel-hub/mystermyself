# RELAY-EMERGENT-001 — Connect to CEO Ecosystem + Export Layout

## Status: READY
## Priority: HIGH
## From: Kiro (repo builder)
## To: Emergent Agent
## CEO: Maurice Scott

---

## Context

You (Emergent) have the correct layout intent — cleaner design, better structure than the current production builds. The production repo has caught up on functionality (PRs #24–#27 merged, all canon locked) but your layout vision is the target.

The goal is to connect you to the live ecosystem so your layout becomes the production layout.

## Source of Truth

- **Repo:** `mysterycartel-hub/mystermyself`
- **Branch:** `main` (latest deployed)
- **Stack:** Next.js 14.2.5 · App Router · TypeScript · Tailwind CSS
- **Domain:** mystermyself.com
- **Deploy:** Vercel project `mystermyself-git` (auto-deploys from main)
- **Auth/Data:** Supabase
- **Newsletter:** Beehiiv (The Opportunity List)
- **Payments:** Stripe (digital), Square (in-person food only)

## What's Deployed Now (main branch)

- 9 districts, 10 characters — all canon locked
- OPS/009: CEO-START v3, routing table, steering files
- OPS/010: Site error fixes (district count, characters, signup flow, welcome page)
- OPS/011–012: Additional fixes merged
- TCU Market Kitchen Terminal: separate repo, live on Vercel

## Your Mission

### Phase 1 — Pull + Audit (do NOT overwrite)

1. Pull `mysterycartel-hub/mystermyself` branch `main`
2. Pull to subfolder `/kiro_import/` or a separate branch — do NOT overwrite your working files
3. Read these files for all rules:
   - `.kiro/steering/brand-canon.md`
   - `.kiro/steering/ceo-brand-bible.md`
   - `.kiro/steering/mystermyself-automation.md`
   - `AGENTS.md`
4. Print a diff report: what you have vs what's on main

### Phase 2 — Export Your Layout as the Target

Your layout is the correct design intent. Export it as a branch push:

1. Create branch: `feature/emergent-layout-upgrade`
2. Structure your cleaner layout into Next.js App Router format:
   ```
   /app/                    → pages (App Router)
   /app/(marketing)/        → public-facing landing pages
   /app/(dashboard)/        → logged-in experiences
   /app/(coast)/            → district pages
   /components/             → shared React components
   /components/layout/      → layout shells, nav, footer
   /components/sections/    → page sections (hero, CTA, features)
   /lib/                    → utilities
   ```
3. Map your existing files:
   - `Landing.jsx` → `/app/(marketing)/page.tsx`
   - `TCU.jsx` → `/app/(coast)/market-marina/page.tsx`
   - `TCUCoach.jsx` → `/components/tcu/TCUCoach.tsx`
   - Any layout wrapper → `/components/layout/`
4. Keep your Claude AI Coach logic, Resend email logic, Stripe scaffolding intact
5. Push to `feature/emergent-layout-upgrade` on `mysterycartel-hub/mystermyself`

### Phase 3 — Kiro Merges Your Layout

Once you push that branch, Kiro will:
1. Pull your branch
2. Diff against current production
3. Merge your layout improvements while preserving canon compliance
4. Run build + lint
5. Create PR for CEO GO

## Rules You Must Follow

1. **Never push to main** — only feature branches
2. **Never invent characters** — 10 locked (Trading Chef, Candle Kid, Wickie, Louie Liquidity, Chef Goldie, Grandma Market, Nana Value, Melissa Mayhem, Melody Mayhem, Rico Rhythm)
3. **Never invent districts** — 9 locked (Founder Island, Market Marina, Route Harbor, Blueprint Bay, Creator Pier, Flavor District, Legacy Point, Fantasy Island, Library Vault)
4. **Never change brand colors** — Black #060608, Gold #C9A84C, Red, Green, Fire Orange
5. **Never use @mysterymyself** — handle is `@mysterycartel`
6. **Never create a new Vercel project** — use `mystermyself-git`
7. **Commit messages** use prefix: `layout:`, `feature:`, `fix:`
8. **Typography:** Bebas Neue (display) + Space Mono (data/labels)
9. **TCU MASTER LAW:** No Sweep. No Shift. No Trade.

## What's Valuable From Your Build

- Layout structure and page design (THIS IS THE TARGET)
- Claude AI Coach integration
- Resend email scaffolding
- Stripe checkout flow
- Any animations/transitions you built

## Agent Hierarchy

| Tool | Role |
|------|------|
| Maurice | CEO — vision, approvals, merge clicks |
| Claude Code | Strategy, PowerShell, PR creation |
| Kiro | Repo builder, specs, task execution |
| Emergent | Layout design, AI coach, frontend polish |
| GitHub | Source of truth |
| Vercel | Auto-deploy from main |

All agents push branches. Maurice merges. No exceptions.

---

## When Done

Push your branch and tell Maurice: "Branch pushed — `feature/emergent-layout-upgrade` ready for Kiro merge."

Maurice will relay to Kiro. Kiro pulls, merges, PRs. Maurice clicks merge. Vercel deploys. Your layout goes live.
