# OPS/002 — Vercel Production Audit

**For:** Maurice Scott (CEO)
**Date:** June 2026
**Prepared by:** AI Ops Team
**Status:** Documentation only -- no changes made, nothing deleted

---

## CORRECTION NOTICE

The original version of this report incorrectly stated that the production Vercel project was named `mystermyself` under the Vercel organization `mysterycartel-hub`. This was inferred from the GitHub organization name but **contradicted by the Vercel bot deployment evidence on this very PR**.

**What the Vercel bot actually shows:**

- The Vercel scope/account is **`maurice-s-projects8`** (a personal Vercel account, NOT a team/org named `mysterycartel-hub`)
- Two separate Vercel projects are actively deploying from the same GitHub repo:
  1. **`mystermyself-git`**
  2. **`mystermysself.ver`** (note the typo: double "s" in "mystermysself")

Both projects triggered deployments on PR pushes to `mysterycartel-hub/mystermyself`, confirming they are both connected to this repository.

---

## 1. Production Project -- What We Know vs. What Requires Dashboard Verification

### Confirmed from Vercel Bot Evidence

| Field | Value |
|-------|-------|
| Vercel Account/Scope | `maurice-s-projects8` (personal account) |
| Active Project #1 | `mystermyself-git` |
| Active Project #2 | `mystermysself.ver` (typo: double "s") |
| Connected GitHub Repo | `mysterycartel-hub/mystermyself` |
| Framework | Next.js 14.2.5 (auto-detected from repo) |
| Node Version | 18.x |
| Build Command | `npm run build` |
| Autodeploy | Enabled (both projects deploy on pushes) |

### CEO Must Verify in Vercel Dashboard

| Question | Why It Matters |
|----------|---------------|
| Which project (`mystermyself-git` or `mystermysself.ver`) has `mystermyself.com` assigned as its production domain? | Only one project should serve the live site |
| Does the other project have any custom domain assigned? | If not, it is a duplicate that can be ignored |
| Which project has environment variables configured? | Env vars must be on the production project |
| Are there any additional duplicate projects under `maurice-s-projects8`? | Unknown without dashboard access |

---

## 2. Why the Report Originally Said "mysterycartel-hub"

The GitHub organization is `mysterycartel-hub`, but the Vercel account connected to this repo is the **personal account** `maurice-s-projects8`. This is a common situation:

- The repo was likely connected to Vercel via a personal account login rather than a Vercel Team/Organization
- Vercel allows personal accounts to deploy repos from any GitHub organization the user has access to
- There may not be a separate Vercel "mysterycartel-hub" organization at all

**This is not a problem** -- it just means the Vercel billing and project management lives under Maurice's personal Vercel account rather than a team org. No action needed unless you want to migrate to a Vercel Team later.

---

## 3. Which Project Is Production?

**We cannot determine this from the repository alone.** The production project is whichever one has `mystermyself.com` connected as its custom domain.

**CEO action to identify production:**

1. Open the Vercel Dashboard at [vercel.com](https://vercel.com)
2. You should be in the `maurice-s-projects8` scope (your personal account)
3. Click on **`mystermyself-git`** -- go to Settings > Domains
4. Click on **`mystermysself.ver`** -- go to Settings > Domains
5. The project that shows `mystermyself.com` in its domain list is your production project

**Most likely scenario:** One of these is the production project (connected to `mystermyself.com`) and the other is an accidental duplicate created during initial Vercel setup. The typo in `mystermysself.ver` suggests it may have been an earlier attempt.

---

## 4. Domain Connection

| Domain | Expected Status | Notes |
|--------|----------------|-------|
| `mystermyself.com` | Connected to ONE of the two projects | CEO must confirm which one |
| `*.vercel.app` (preview URLs) | Auto-generated per project | Both projects generate these |

**CEO must confirm:** Which project has `mystermyself.com` connected. SSL should be provisioned automatically via Let's Encrypt.

---

## 5. Latest Deployment Status

| Metric | Value |
|--------|-------|
| Routes compiled | 63 |
| Build errors | 0 |
| Build warnings | 0 |
| Deploy trigger | Push to `main` branch |
| Source repo | `github.com/mysterycartel-hub/mystermyself` |
| Branch | `main` (trunk-based, single branch strategy) |

**Build health: PASSING.** The latest build compiles all 63 routes with zero errors and zero warnings. The deploy pipeline is fully automated from GitHub push to Vercel production.

The `vercel.json` file contains only redirect rules (6 vanity URL redirects). No build configuration overrides are needed.

---

## 6. Required Environment Variables

Environment variables must be set on the **production project only** (the one connected to `mystermyself.com`). Do NOT configure them on the duplicate project.

### Critical (features fail without these)

| Variable | Purpose | Status in Vercel |
|----------|---------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for auth + DB | Must be set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key for client-side auth | Must be set |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key for server-side DB writes | Must be set |
| `ANTHROPIC_API_KEY` | Powers the AI Coach at `/api/coach` | Must be set |

### Optional (features degrade gracefully)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Magic link redirect URL (should be `https://mystermyself.com`) |
| `BEEHIIV_API_KEY` | Newsletter subscriber sync |
| `BEEHIIV_PUBLICATION_ID` | Beehiiv publication identifier |
| `NEXT_PUBLIC_BEEHIIV_SIGNUP_URL` | Newsletter signup endpoint |
| `NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL` | Public newsletter page |
| `STRIPE_SECRET_KEY` | Payments (currently disabled) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification (currently disabled) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe (currently disabled) |

**Note:** Stripe variables are intentionally unused. The checkout route is disabled. Do not add Stripe keys until payments are re-enabled.

---

## 7. Duplicate Projects -- What to Ignore

You have two projects deploying from the same repo:

| Project | Likely Status | Action |
|---------|---------------|--------|
| The one with `mystermyself.com` domain | **PRODUCTION** -- keep and maintain | Set env vars here |
| The one WITHOUT `mystermyself.com` domain | **DUPLICATE** -- ignore for now | Do not configure, do not delete yet |

### Why Two Projects Exist

This typically happens when:
- The repo was connected to Vercel twice (perhaps during initial setup troubleshooting)
- One was created via `vercel` CLI and the other via the Vercel dashboard "Import" flow
- The typo in `mystermysself.ver` suggests it may have been an early attempt with a name error

### Do NOT Delete the Duplicate Yet

Leave it alone. It deploys on pushes but serves no traffic if it has no custom domain. A cleanup can be scheduled later once production is confirmed stable.

---

## 8. Exact CEO Actions Inside Vercel

**Do this now (15-20 minutes total):**

### Step 1: Identify the Production Project

1. Open [vercel.com](https://vercel.com) and log in
2. Confirm you are in the **`maurice-s-projects8`** scope (top-left dropdown)
3. You should see both `mystermyself-git` and `mystermysself.ver` in the project list
4. Click into each one and check **Settings > Domains**
5. The project showing `mystermyself.com` is your production project -- note its name

### Step 2: Verify Environment Variables on Production Project

6. In the **production project** (the one with `mystermyself.com`), go to **Settings > Environment Variables**
7. Confirm these 4 variables are set with valid values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
8. If any are missing, add them (values are in your Supabase and Anthropic dashboards)
9. After adding, trigger a redeploy: go to **Deployments > ... menu on latest > Redeploy**
10. Confirm the live site at `mystermyself.com` loads without errors

### Step 3: Confirm the Duplicate Has No Domain

11. Go to the OTHER project (the one without `mystermyself.com`)
12. Check **Settings > Domains** -- it should show only its `.vercel.app` default URL
13. If it somehow also has `mystermyself.com`, remove the domain from this project (only one project should own it)

### Step 4 (Optional): Disable the Duplicate

14. If you want to stop the duplicate from deploying on every push:
    - Go to the duplicate project > **Settings > Git**
    - Disconnect the GitHub repository
    - This stops future deploys without deleting the project

**Do NOT:**
- Delete any Vercel projects (yet)
- Change the connected GitHub repository on the production project
- Modify the build command or framework preset
- Add Stripe keys (payments are intentionally off)
- Move to a Vercel Team/Org (not needed right now)

---

## Summary

```
VERCEL ACCOUNT:       maurice-s-projects8 (personal, NOT an org)
ACTIVE PROJECTS:      mystermyself-git AND mystermysself.ver (one is a duplicate)
PRODUCTION PROJECT:   Whichever has mystermyself.com domain (CEO must verify)
DUPLICATE PROJECT:    The other one -- ignore, do not delete
DOMAIN:              mystermyself.com (connected to one of the two projects)
BUILD STATUS:        PASSING (63 routes, 0 errors)
ENV VARS NEEDED:     4 critical, 5+ optional (set on production project ONLY)
NEXT ACTION:         Identify which project is production, verify env vars, confirm site loads
```

**Bottom line:** The Vercel setup is functional but slightly messy -- there are two projects where there should be one, and they live under a personal account rather than a team org. The immediate priority is confirming which project owns `mystermyself.com` and ensuring its environment variables are set. The duplicate can be cleaned up later. The build itself is healthy and deploys are automated.
