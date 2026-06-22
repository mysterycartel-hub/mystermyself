# TCU Build State — Kiro Cloud Build Layer

**Last Updated:** 2026-06-22
**Repo:** mysterycartel-hub/mystermyself
**Branch:** main
**Vercel Project:** mystermyself-git (prj_aTYPcafBBKRb3EOpYBYqKFrExZUO)

---

## COMPLETED TASKS

### ✅ TCU Market Kitchen Terminal
- **Commit:** b98f803
- **Route:** `/market-marina/tcu-terminal`
- **Features:** Session Clock, FVG Health Score, Three-Touch Study, Lingo Sidebar, Chef Read Format
- **Copy:** Education-first positioning, Chef's Golden Rule, all disclaimers

### ✅ TCU Terminal UI Fix
- **Commit:** 120d299
- **Fixes:** SVG logo (replaces emoji), coach SVG icons (replaces initials), layout 65%/320px, mobile stack

### ✅ Strategy Roadmap
- **Commit:** f0d4a87
- **Route:** `/strategy-roadmap`
- **Features:** 10-phase guided path, TCU characters coaching each stage, bridges Academy → Kitchen
- **Bridge:** Academy (learn) → Strategy Roadmap (guided path) → Kitchen (practice) → Terminal (analysis)

### ✅ Route Redirects
- `/subscribe` → `/opportunity-list`
- `/start` → `/opportunity-list`
- `/join` → `/opportunity-list` (pre-existing)

### ✅ Rumble Social Link Fix
- Updated from `[NEEDS OWNER URL]` to `https://rumble.com/c/Mystermyself`

---

## BUILD STATUS

| Check | Status |
|---|---|
| `npm run build` | ✅ 0 errors |
| All routes compile | ✅ 90+ routes |
| Git clean | ✅ up to date with origin/main |
| Vercel auto-deploy | ✅ connected to GitHub |

---

## ARCHITECTURE DECISION (Confirmed 2026-06-22)

**Decision:** Separate projects with merge ability
- `mystermyself` = main ecosystem site (mystermyself.com)
- `tcu-market-kitchen-terminal` = standalone TCU trading terminal app
- Both share the SAME Supabase instance for auth/data
- `tcu-terminal-test` = local dev copy, NOT the live repo — can be archived

### Shared Supabase Connection
- Both projects use the same Supabase project
- Supabase anon key: `sb_publishable_...ZGmgstqf` (confirmed by Maurice)
- Auth, passport, XP, and badges are shared across both deployments
- Users who sign in on one site are recognized on the other

### Tasks 1-4 (tcu-market-kitchen-terminal repo)
These require opening the `tcu-market-kitchen-terminal` workspace separately:
- Task 1: Investigate `live: false` → Vercel dashboard → Domains tab
- Task 2: Add Supabase env vars to that Vercel project (same keys as mystermyself)
- Task 3: Verify live URL after env vars set
- Task 4: Archive `tcu-terminal-test` local copy

### NEXT STEP FOR CLAUDE/KIRO
When `tcu-market-kitchen-terminal` workspace is opened:
1. Add env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (sb_publishable_...ZGmgstqf), SUPABASE_SERVICE_ROLE_KEY
2. Check domain alias
3. Verify routes load
4. Both sites share auth — user logs into one, recognized on both

---

## BRAND RULES (LOCKED)

- Legal: Breaded Enterprise Trust → Scott-King Holdings LLC → operating LLCs
- Characters: Trading Chef, Candle Kid, Wickie, Louie Liquidity, Chef Goldie, Grandma Market, Nana Value, Melissa Mayhem, Melody Mayhem
- Districts: Route Harbor, Market Marina, Flavor District, Blueprint Bay, Creator Pier, Legacy Point
- No new characters, districts, or legal layers without Maurice's explicit direction
