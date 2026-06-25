# TASK-011 — Supabase Project Consolidation Audit

**Date:** 2026-06-25
**Status:** COMPLETE
**Auditor:** Kiro

---

## 1. Supabase Projects in Account

| Project Name | Region | Used By |
|---|---|---|
| mysterycartel-hub's Project | AWS us-west-2 | mystermyself repo |
| tcu-market-kitchen | AWS us-east-1 | tcu-market-kitchen-terminal repo |

**RULE:** Each repo uses its own Supabase project. Never cross keys.

---

## 2. Files Referencing Supabase — mystermyself repo

| File | Import Source | Client Type | Notes |
|---|---|---|---|
| `lib/supabase.ts` | `@supabase/supabase-js` | Browser + Server singleton | Uses `NEXT_PUBLIC_SUPABASE_URL` + env vars correctly |
| `lib/passport-db.ts` | `./supabase` | Server (createServerClient) | Correct |
| `lib/access.ts` | `./supabase` | Server (createServerClient) | Correct — checks env before calling |
| `components/auth/AuthForm.tsx` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `components/kitchen/SaveToJournal.tsx` | `@supabase/supabase-js` | Browser — **creates new client inline** | ⚠️ Does NOT use singleton |
| `app/auth/callback/route.ts` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `app/dashboard/page.tsx` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `app/journal/page.tsx` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `app/passport/page.tsx` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `app/tcu-theater/page.tsx` | `@/lib/supabase` | Browser (getSupabaseClient) | Correct |
| `app/api/leads/route.ts` | `@/lib/supabase` | Server (createServerClient) | Correct — guards with env check |
| `app/api/newsletter/subscribe/route.ts` | `@/lib/supabase` | Server (createServerClient) | Correct — guards with env check |
| `app/api/passport/register/route.ts` | `@/lib/supabase` | Server (createServerClient) | Correct |
| `app/api/webhooks/stripe/route.ts` | `@/lib/supabase` | Server (createServerClient) | Correct — guards with env check |
| `app/api/admin/leads/route.ts` | Commented out | N/A | Disabled — returns mock data |
| `app/api/admin/stats/route.ts` | Commented out | N/A | Disabled — returns mock data |

### Hardcoded URLs: **NONE FOUND** ✅
### Cross-project references: **NONE FOUND** ✅

---

## 3. Files Referencing Supabase — tcu-market-kitchen-terminal repo

| File | Import Source | Client Type | Notes |
|---|---|---|---|
| `lib/supabase/client.ts` | `@supabase/supabase-js` | Browser singleton | Correct |
| `lib/supabase/server.ts` | `@supabase/ssr` + `@supabase/supabase-js` | Server (SSR + service role) | Correct |
| `lib/tcu/progress-backend.ts` | (implied via server) | Server | Correct |
| `proxy.ts` | `@supabase/ssr` | Server (createServerClient) | Correct — middleware-like auth check |
| `components/tcu/TCUProgressProvider.tsx` | (implied via client) | Browser | Correct |
| `app/api/auth/callback/route.ts` | `@supabase/ssr` | Server (createServerClient) | Correct |
| `app/api/chart-analyses/route.ts` | (checks env) | Server | Correct — returns 503 if not configured |
| `app/api/journal/route.ts` | (checks env) | Server | Correct — returns 503 if not configured |
| `app/api/trade-plans/route.ts` | (checks env) | Server | Correct — returns 503 if not configured |
| `app/api/webhooks/stripe/route.ts` | (checks env) | Server | Correct — guards with env check |
| `app/api/stripe/webhook/route.ts` | (checks env) | Server | Correct — duplicate webhook handler (legacy?) |

### Hardcoded URLs: **NONE FOUND** ✅
### Cross-project references: **NONE FOUND** ✅

---

## 4. Supabase Tables Referenced in Code

### mystermyself repo (→ "mysterycartel-hub's Project")

| Table | Used In |
|---|---|
| `leads` | api/leads, api/newsletter/subscribe, api/admin/leads |
| `purchases` | api/webhooks/stripe |
| `product_access` | api/webhooks/stripe, lib/access.ts |
| `passport_profiles` | api/webhooks/stripe, lib/passport-db.ts |
| `passport_xp_events` | lib/passport-db.ts |
| `passport_stamps` | lib/passport-db.ts |
| `passport_badges` | lib/passport-db.ts |
| `passport_missions` | lib/passport-db.ts |
| `journal_entries` | app/journal, components/kitchen/SaveToJournal |
| `chart_analyses` | (referenced in schema) |
| `admin_stats` (view) | api/admin/stats |

### tcu-market-kitchen-terminal repo (→ "tcu-market-kitchen")

| Table | Used In |
|---|---|
| `profiles` | lib/tcu/progress-backend, components/tcu/TCUProgressProvider |
| `journal_entries` | app/api/journal |
| `chart_analyses` | app/api/chart-analyses |
| `trade_plans` | app/api/trade-plans |
| `mission_progress` | lib/tcu/progress-backend |
| `character_unlocks` | lib/tcu/progress-backend |
| `subscriptions` | app/api/webhooks/stripe |

---

## 5. Issues Found

| # | Severity | Repo | Issue | Fix |
|---|---|---|---|---|
| 1 | ⚠️ LOW | mystermyself | `components/kitchen/SaveToJournal.tsx` creates a new Supabase client inline instead of using the singleton from `lib/supabase.ts` | Refactor to use `getSupabaseClient()` |
| 2 | ⚠️ LOW | tcu-market-kitchen | Two Stripe webhook handlers exist (`/api/stripe/webhook/route.ts` AND `/api/webhooks/stripe/route.ts`) | Consolidate to one — likely the `/api/webhooks/stripe` version is newer |
| 3 | ✅ GOOD | Both | No hardcoded Supabase URLs anywhere | No action needed |
| 4 | ✅ GOOD | Both | All env var references use `process.env.NEXT_PUBLIC_SUPABASE_URL` (never raw URLs) | No action needed |
| 5 | ✅ GOOD | Both | Each repo has its own client setup — no shared imports between repos | No action needed |

---

## 6. Cross-Project Key Mixing Risk Assessment

**Risk: MEDIUM** — The failure mode described in TASK-011 (mixing keys from one project into the other) is NOT caused by code. The code is clean. The problem is **human error during Vercel env var entry**.

**Root cause:** Maurice has two Supabase projects open and copies keys from the wrong one into Vercel.

**Fix:** The ENV-SETUP.md (Deliverable A) and build-time validator (Deliverable C) prevent this by:
1. Documenting which project belongs to which repo
2. Validating URL format at build time (each project has a unique subdomain)
3. The /api/health endpoint tests the actual connection live

---

## 7. Recommendation

The Supabase setup in code is **architecturally sound**. Both repos use env vars correctly, never hardcode URLs, and use appropriate client types (browser vs server). The problem is purely at the **configuration layer** (wrong values entered in Vercel), which Deliverables A/B/C fix permanently.
