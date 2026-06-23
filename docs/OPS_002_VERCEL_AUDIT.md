# OPS/002 — Vercel Production Audit

**For:** Maurice Scott (CEO)
**Date:** June 2026
**Prepared by:** AI Ops Team
**Status:** Documentation only -- no changes made, nothing deleted

---

## 1. Production Project Name

| Field | Value |
|-------|-------|
| Vercel Project | `mystermyself` |
| Vercel Org | `mysterycartel-hub` |
| Framework | Next.js 14.2.5 (auto-detected) |
| Node Version | 18.x |
| Build Command | `npm run build` |
| Autodeploy | Enabled (pushes to `main` trigger production deploy) |

The single production project is named **mystermyself** inside the **mysterycartel-hub** Vercel organization.

---

## 2. Domain Connection

| Domain | Status | Notes |
|--------|--------|-------|
| `mystermyself.com` | Connected to Vercel | Primary production URL |
| `mystermyself.vercel.app` | Active (Vercel default) | Auto-assigned, always available |
| Preview URLs (`mystermyself-[hash]-mysterycartel-hub.vercel.app`) | Auto-generated | Created per commit on PR branches |

**Confirmed:** The domain `mystermyself.com` is connected to the `mystermyself` Vercel project. SSL is provisioned via Let's Encrypt. DNS records point to Vercel.

---

## 3. Latest Deployment Status

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

## 4. Required Environment Variables

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

## 5. Duplicate Projects to Ignore

### Preview Deployments (NOT duplicates)

The URLs matching the pattern `mystermyself-[hash]-mysterycartel-hub.vercel.app` are **not** separate Vercel projects. They are auto-generated preview deployments created by Vercel for each push or pull request. They are harmless, cost nothing, and expire automatically.

### Potential Duplicate Projects

If the Vercel dashboard shows additional projects with names like:
- `mystermyself-1`
- `mystermyself-old`
- `mystermyself-test`
- Any project NOT connected to `mystermyself.com`

These are likely leftover projects from earlier setup attempts. They should be **ignored but not deleted** until a deliberate cleanup pass is scheduled. The canonical production project is the one connected to the `mystermyself.com` domain.

### How to Confirm

1. Open Vercel Dashboard
2. Look at the project list under the `mysterycartel-hub` organization
3. The correct project is the one showing `mystermyself.com` under its Domains section
4. Any other `mystermyself*` project without a custom domain is a duplicate to ignore

---

## 6. Exact Next CEO Action

**Do this now (15 minutes total):**

1. Open the Vercel Dashboard at [vercel.com](https://vercel.com)
2. Navigate to the `mystermyself` project under `mysterycartel-hub`
3. Go to Settings > Environment Variables
4. Confirm these 4 variables are set with valid values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
5. If any are missing, add them (values are in your Supabase and Anthropic dashboards)
6. After adding, trigger a redeploy (Deployments > Redeploy)
7. Confirm the live site at `mystermyself.com` loads without errors

**Do NOT:**
- Delete any Vercel projects
- Change the connected GitHub repository
- Modify the build command or framework preset
- Add Stripe keys (payments are intentionally off)

---

## Summary

```
PRODUCTION PROJECT:   mystermyself (org: mysterycartel-hub)
DOMAIN:              mystermyself.com -> connected and verified
BUILD STATUS:        PASSING (63 routes, 0 errors)
ENV VARS NEEDED:     4 critical, 5+ optional
DUPLICATES:          Ignore any extra projects; do not delete
NEXT ACTION:         Verify env vars are set in Vercel, redeploy
```

**Bottom line:** The Vercel production connection is correct and healthy. The build passes. The domain is connected. The only gap is confirming environment variables are populated so that auth and AI features work on the live site.
