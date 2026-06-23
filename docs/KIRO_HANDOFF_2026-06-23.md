# KIRO HANDOFF — 2026-06-23
**From:** Claude Cowork (Desktop)
**To:** Kiro
**Re:** MystermMyself infrastructure — what needs to happen, in order

---

## BUILD STATUS
npm run build: PASS
Routes: 88+ (63 confirmed static + dynamic)
Errors: 0 | Warnings: 0
Branch: main — up to date with origin/main
Vercel project: mystermysself.ver (prj_ijmCs8utz1DSUjOh9cFsm4J5eufo)
Team: team_SomSHdiGehfoh6Bec0y0or7i (maurice's projects)

---

## WHAT IS COMPLETE (DO NOT TOUCH)
- All 88+ routes — built, deployed, live
- TCU Academy: 10 levels, 13 lessons, full curriculum engine
- Passport system: auth, XP, badges, stamps — CODE COMPLETE
- AI Coach: code complete at /api/coach
- Character Trigger Engine: Melissa, Melody, Burn Alarm — all wired
- Daily Quest Board: live on /passport
- Kitchen Rush: live at /kitchen-rush
- Market Kitchen: TradingView embed live at /kitchen
- Stripe: disabled intentionally — do not enable without Maurice approval
- Design system: Black/Gold, Bebas Neue, Space Mono — locked, do not change

---

## WHAT NEEDS TO HAPPEN (ORDERED)

### Step 1 — Supabase (blocks everything else)
Maurice needs to provide:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

Add to Vercel: mystermysself.ver → Settings → Environment Variables → Production

Then run SQL schema in Supabase SQL Editor.
SQL source: docs/TCU_SOURCE_OF_TRUTH.md §Database Schema
Creates: passport_profiles, passport_xp_events, passport_stamps, passport_badges, passport_missions, leads + increment_passport_xp RPC

Then set in Supabase Dashboard → Auth → URL Configuration:
- Site URL: https://mystermyself.com
- Redirect URLs: https://mystermyself.com/**

### Step 2 — Anthropic API Key
Add ANTHROPIC_API_KEY to Vercel (same project).
Effect: AI Coach at /api/coach goes from 503 → live streaming responses.
Model already set: claude-haiku-4-5-20251001

### Step 3 — Beehiiv API Key
Add BEEHIIV_API_KEY to Vercel.
Publication ID already in env: pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7
Effect: Lead capture at /api/leads writes to Beehiiv instead of console log.

### Step 4 — Redeploy
After adding all env vars, trigger redeploy:
Option A: Vercel Dashboard → Deployments → Redeploy latest
Option B: Push empty commit → git commit --allow-empty -m "trigger deploy: env vars active"

### Step 5 — Smoke Test
- /passport/login → enter email → magic link received → /passport loads authenticated
- passport_profiles row created in Supabase Table Editor
- Complete one academy lesson → passport_xp_events row appears
- AI Coach chat → streaming response (not 503)
- Submit email on home page → Beehiiv subscriber appears in Beehiiv dashboard

---

## WHAT NOT TO DO
- Do not add new routes
- Do not add new characters
- Do not add new levels
- Do not change the design system
- Do not enable Stripe without Maurice approval
- Do not push without Maurice approval

---

## KEY FILES FOR CONTEXT
| File | Purpose |
|---|---|
| docs/TCU_SOURCE_OF_TRUTH.md | Full TCU architecture + SQL schema (use LAUNCH_GUIDE.md for SQL — not this file) |
| docs/LAUNCH_GUIDE.md | CORRECT SQL schema source + step-by-step launch sequence |
| docs/POST_DEPLOY_AUDIT.md | Exact list of what's blocked and why |
| docs/MYSTERMYSELF_SOURCE_OF_TRUTH.md | Full ecosystem architecture |
| .env.local.example | All env var names with descriptions |

---

## CANON LOCKS (NEVER CHANGE)
Trading Term → TCU Kitchen Term:
- FVG → Leftover container
- Entry → The pass
- Stop Loss → Burn point
- Targets → Tables served
- Big candle → Full course meal
- Institutional → Michelin Star move
- Setup → The recipe
- Session open → Kitchen is open
- Liquidity sweep → Clearing the plates
- Market structure → How the kitchen runs

Required disclaimer on all TCU content:
"Educational only. No signals. No financial advice. Train first. Trade later."

---

## SEPARATE TASK — NEWSLETTER READY DESK
See tcu-market-kitchen-terminal/tcu-build-state.md for full spec.
Short version: build a new standalone Next.js site for The Opportunity List newsletter.
Does not exist yet. Needs new GitHub repo + Vercel project.
