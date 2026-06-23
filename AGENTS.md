# AGENTS.md — MysterMyself AI Operating Instructions

**Repo:** mysterycartel-hub/mystermyself
**Owner:** Maurice Scott (CEO, non-coder)
**Domain:** mystermyself.com
**Stack:** Next.js 14.2.5 · TypeScript · Tailwind CSS · Supabase · Stripe · Beehiiv · Vercel

---

## Rules For All AI Agents

1. **Never delete existing work.** If something is broken, fix it. If something is unused, flag it — do not remove it without CEO approval.
2. **Never start a new app.** This repo IS the production source of truth. All work continues here.
3. **Never ask Maurice coding questions.** He is the idea owner. Translate technical decisions into plain English.
4. **Never push directly to main without a PR.** All changes go through a feature branch and pull request.
5. **Never add new features during deployment phase (V6+).** Focus is stabilization, cleanup, and launch readiness.
6. **Always run `npm run build` before pushing.** If the build breaks, fix it before committing.
7. **Always update docs/ files when making structural changes.**
8. **Respect the design system locks.** Colors, fonts, and brand identity are frozen (see below).

---

## Design System Locks (Do Not Change)

```
Background:   var(--black) = #060608
Accent:       var(--gold)  = #C9A84C
Text:         var(--cream) = #F5F0E8
Deep:         var(--deep)  = #0A0A0C
Typography:   Bebas Neue (display) + Space Mono (data/labels)
MS Crown:     Never lowercase. Never serif. Never modified.
```

---

## Project Structure

```
/app/            → Next.js App Router (PRODUCTION routes — this is the source of truth)
/components/     → Shared React components
/lib/            → Utility libraries (Supabase, Stripe, AI, XP engine, etc.)
/db/             → SQL schema files for Supabase
/public/         → Static assets
/docs/           → CEO-facing documentation and source-of-truth files
/content/        → Static content data
/design-system/  → Design tokens and references
```

---

## Known Orphan Directories (Safe to Ignore)

- `/src/app/` — Contains 1 orphaned route (market-marina/tcu-sound-identity). Not used by build.
- `/src/components/` — Contains 1 orphaned file (TCUSoundIdentitySystem.jsx). Not used by build.
- `/app/pages/` — Contains duplicate district landing pages. The canonical versions are at `/coast/[district]`.

These should be cleaned up in a future housekeeping PR with CEO approval.

---

## Deployment

- **Host:** Vercel (auto-deploys from `main` branch)
- **Domain:** mystermyself.com
- **Login:** vercel.com → mysterycartel@gmail.com
- **Env vars:** Must be set in Vercel Dashboard (see `.env.local.example` for full list)

---

## Key Integrations

| Service | Status | Notes |
|---------|--------|-------|
| Supabase (Auth + DB) | Installed, needs env vars in Vercel | Magic link OTP auth |
| Stripe (Payments) | Installed, disabled at launch | Activate after first product sale |
| Beehiiv (Newsletter) | Active | "The Opportunity List" newsletter |
| Anthropic AI (Coach) | Installed, optional | TCU AI Coach feature |

---

## How To Work On This Repo

1. Pull latest `main`
2. Create a feature branch: `git checkout -b ops/your-task-name`
3. Make changes
4. Run `npm run build` — must pass with zero errors
5. Commit with clear message
6. Push branch and open PR
7. Tag Maurice for approval if needed

---

## Documentation Files (CEO-Facing)

| File | Purpose |
|------|---------|
| `docs/CEO_BRIEF.md` | Plain-English status for Maurice |
| `docs/BUILD_STATUS.md` | Current build health |
| `docs/PRODUCT_CANON.md` | What exists and what each district does |
| `docs/KNOWN_BLOCKERS.md` | What's stopping launch |
| `docs/DEPLOYMENT_CHECKLIST.md` | Steps to go live |
| `docs/QA_CHECKLIST.md` | What to test before launch |
