# KIRO_HANDOFF.md — MysterMyself Ecosystem OS

**Generated:** 2026-06-28
**From:** Kiro (repo builder)
**To:** Emergent Agent (layout + frontend polish)
**CEO:** Maurice Scott

---

## 1. PROJECT SNAPSHOT

MysterMyself is a multi-business portfolio platform for Maurice Scott's Scott-King Coast ecosystem. It's a production-deployed Next.js 14 App Router site with 60+ routes covering 9 districts (trading education, courier business, food brand, content funnels, legal holdings, AI tools, fantasy sports, free resources, HQ). The site is live at mystermyself.com deployed via Vercel. Current state: fully functional homepage with interactive hero, 10 animated characters, district pages, newsletter capture (Beehiiv), passport/XP system scaffolding, Stripe checkout scaffolding, and a Trading Chef AI Coach (mock mode). PRs #24–#27 merged in last 48 hours fixing canon errors, adding motion system, and consolidating 4 repos into one monorepo.

**Stack:**
- Next.js 14.2.5 (App Router)
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.6
- Framer Motion 11.3.8
- Supabase 2.45.0 (auth + DB)
- Stripe 16.2.0 (payments)
- lightweight-charts 5.2.0 (chart component)
- Lucide React (icons)
- Radix UI (separator)

**Live URL:** https://mystermyself.com
**Repo:** https://github.com/mysterycartel-hub/mystermyself
**Default branch:** main
**Vercel project:** mystermyself-git (auto-deploys from main)

---

## 2. FOLDER MAP

```
mystermyself/
├── .agents/          → Agent task tracking (Kiro internal)
├── .github/          → GitHub Actions (auto-open-pr, ceo-automerge)
├── .kiro/            → Kiro config: hooks, specs, skills, steering, settings
├── Agents/           → Relay system files (CEO-START activation, outbox)
├── app/              → Next.js App Router — ALL production routes (source of truth)
│   ├── api/          → API routes (newsletter, coach, passport, checkout, webhooks)
│   ├── (60+ page dirs)
│   └── pages/        → ORPHAN duplicate district pages (canonical = /coast/[district])
├── components/       → Shared React components
│   ├── home/         → Homepage sections (hero, characters, districts, passport)
│   ├── tcu/          → Trading Chef University components
│   ├── kitchen/      → Market Kitchen Terminal components
│   ├── map/          → Scott-King Coast map
│   ├── auth/         → Auth UI
│   ├── passport/     → Passport/XP UI
│   └── ui/           → Generic UI primitives
├── content/          → Static content data
├── data/             → Canon data files + ops reports
├── db/               → SQL schema files for Supabase
├── design-system/    → Design tokens and references
├── docs/             → CEO-facing documentation
│   ├── archive/      → Legacy TCU terminal docs (historical reference)
│   ├── relay/        → Agent relay task files
│   ├── reports/      → Audit reports (canon, links, routes, funnels)
│   └── tcu-youtube-promo-system/  → YouTube content production docs
├── infrastructure/   → Infrastructure specs and audit scripts
├── lib/              → Utility libraries (28 files: Supabase, Stripe, AI, XP, etc.)
├── outbox/           → Relay outbox (Kiro → Claude Code handoff)
├── public/           → Static assets (characters/, assets/)
├── scripts/          → Ops audit scripts + Trading Chef tools
└── tools/            → Trading Chef Studio (Remotion video engine)
```

**Non-obvious folders:**
- `Agents/relay/` — CEO-START activation records and relay outbox
- `tools/trading-chef-studio/` — Remotion video rendering engine (separate from main app)
- `outbox/` — Kiro-to-Claude relay task files
- `docs/archive/tcu-terminal-legacy/` — Consolidated from dead repos, reference only

---

## 3. CANON & BRAND TRUTH SOURCES

| File | Status | What It Is |
|------|--------|------------|
| `.kiro/steering/brand-canon.md` | **AUTHORITATIVE** | 9 districts, 10 characters, Beehiiv config, payment stack, Supabase rules, brand identity |
| `.kiro/steering/ceo-brand-bible.md` | **AUTHORITATIVE** | Entity structure, project frames F1–F5, brand defaults, Trading Chef lingo, output rules |
| `data/tcu-character-canon.ts` | **AUTHORITATIVE** | TypeScript character data (names, roles, colors, descriptions) |
| `docs/TCU-CHARACTER-CANON.md` | Reference | Human-readable character canon |
| `docs/VISUAL-CANON.md` | Reference | Visual system documentation |
| `docs/tcu-world-visual-canon.md` | Reference | World visual canon |
| `docs/INTERACTION-CANON.md` | Reference | Interaction patterns |
| `AGENTS.md` | **AUTHORITATIVE** | Rules for all AI agents (do not delete, do not start new app, etc.) |
| `.kiro/steering/mystermyself-automation.md` | **AUTHORITATIVE** | Operating rules, workflow, red gates |

**DO NOT CHANGE without CEO GO:**
- Character roster (10 locked)
- District roster (9 locked)
- Brand colors (Black #060608, Gold #C9A84C, Red, Green, Fire Orange)
- Typography (Bebas Neue display, Space Mono data)
- TCU MASTER LAW: No Sweep. No Shift. No Trade.
- Handle: @mysterycartel

**Character images:** `/public/characters/` — most are missing (see README.md in that folder for naming convention)

---

## 4. WHAT'S BUILT (working features)

| Feature | Status | Files | What Works | Gotchas |
|---------|--------|-------|------------|---------|
| Homepage interactive hero | ✅ Live | `components/home/InteractiveCoastHero.tsx` | Animated particles, district preview, gold aesthetic | Framer Motion heavy |
| Character section (10 chars) | ✅ Live | `components/home/CharacterSection.tsx`, `data/tcu-character-canon.ts` | Grid of 10 characters with roles/colors | Uses placeholder avatars (no art uploaded) |
| District grid | ✅ Live | `components/home/DistrictActionGrid.tsx` | 9 districts with navigation | |
| Newsletter signup | ✅ Live | `components/OpportunitySignup.tsx`, `app/api/newsletter/subscribe/route.ts` | POSTs to Beehiiv API, redirects to /welcome | Needs real BEEHIIV_API_KEY in Vercel env |
| Welcome page | ✅ Live | `app/welcome/page.tsx` | "You're in The Opportunity List." confirmation | |
| Coast map | ✅ Live | `components/map/ScottKingCoastMap.tsx` | SVG district map | |
| Trading Chef Spotlight | ✅ Live | `components/tcu/TradingChefSpotlight.tsx` | 8-step Road Map, character coaching cards | |
| TCU Character Canon Strip | ✅ Live | `components/tcu/TCUCharacterCanonStrip.tsx` | Horizontal scrolling character display | |
| Passport progress UI | ✅ Live | `components/home/CoastPassportProgress.tsx` | XP bar, level, streak display | Reads localStorage (no Supabase yet) |
| AI Coach endpoint | 🚧 WIP | `app/api/coach/route.ts`, `lib/aiCoach.ts` | Route exists, mock mode works | Needs API key for real mode |
| Stripe checkout | 🚧 WIP | `app/api/checkout/route.ts`, `lib/stripe.ts` | Route exists, scaffolded | Needs STRIPE_SECRET_KEY |
| Passport auth | 🚧 WIP | `app/api/passport/register/route.ts`, `lib/passport-db.ts` | Routes exist | Needs Supabase tables created |
| Market Kitchen Terminal | 🚧 WIP | `app/market-marina/tcu-terminal/page.tsx`, `components/kitchen/` | Page renders | Needs market data API key for live charts |
| Gold particles | ✅ Live | `components/home/GoldParticles.tsx` | Animated background effect | |
| Character coach cards | ✅ Live | `components/tcu/CharacterCoachCards.tsx` | Rotating trio of character tips | |

---

## 5. WHAT'S BROKEN OR HALF-DONE

| Issue | Severity | Location | Details |
|-------|----------|----------|---------|
| Character art missing | Medium | `/public/characters/` | No PNG art uploaded. Components use colored placeholder circles. |
| Beehiiv env vars placeholder | High | Vercel dashboard | Newsletter subscribe will 401 without real API key |
| Supabase tables not created | Medium | `db/*.sql` | Schema files exist but tables aren't created in Supabase |
| Passport XP system localStorage only | Low | `lib/xp-reward-engine.ts` | Works but doesn't persist across devices |
| Orphan pages at `/app/pages/` | Low | `app/pages/*.tsx` | Duplicate district pages — canonical versions at `/coast/[district]` |
| AI Coach mock mode only | Low | `lib/aiCoach.ts` | No paid API key required per operating rules |
| `/app/pages/` directory | Low | `app/pages/` | Contains 9 orphan files that duplicate district routes |

---

## 6. WHAT'S MISSING (the gap list)

| Missing Feature | Canon Reference | Notes |
|-----------------|-----------------|-------|
| Authenticated dashboard | F5 (Content Funnel Engine) | `/app/dashboard/page.tsx` exists but is stub |
| Stripe product checkout flow | F1 (Gold Playbook $47) | Route scaffolded, no product IDs |
| Academy lesson content | F1 spec | `/app/academy/` exists, `lib/academy.ts` has structure, no lessons written |
| Journal system | F1 spec | `/app/journal/page.tsx` exists, empty |
| Missions/quests | Design system | `lib/mission-engine.ts` + `lib/quests.ts` exist, no UI integration |
| Fantasy sports | F8 district | `/app/fantasy-island/page.tsx` exists, minimal content |
| Breaded food menu | F2 spec | `/app/breaded/page.tsx` exists, no menu data |
| Courier guide product | F4 spec | `/app/products/medical-courier-guide/page.tsx` exists, needs Stripe |
| YouTube/Rumble content pipeline | `docs/tcu-youtube-promo-system/` | Documented but not automated |
| Remotion video rendering | `tools/trading-chef-studio/` | Engine exists, not integrated into main app |
| Resend email system | Not yet | Not installed. Emergent had this — bring it over. |

---

## 7. DECISIONS MADE (and why)

| Decision | Rationale |
|----------|-----------|
| Next.js 14 App Router (not CRA/Remix) | Server components for SEO, API routes co-located, Vercel native deploy |
| Tailwind CSS (not CSS modules/styled-components) | Fast iteration, design-token friendly, team-scalable |
| Supabase (not Firebase) | PostgreSQL, Row Level Security, magic-link auth, cheaper at scale |
| Stripe (not PayPal) | Digital product standard, webhook architecture, subscription support |
| Framer Motion (not CSS animations) | Complex interactive sequences, gesture support, layout animations |
| lightweight-charts (not TradingView widget) | Self-hosted, no API key required for chart rendering |
| localStorage for XP (temporary) | Ship fast, migrate to Supabase later |
| Mock AI coach mode | Operating rule: no paid AI keys required for core functionality |
| Monorepo consolidation | 4 dead repos merged into one — everything discoverable in one place |
| Bebas Neue + Space Mono | Brand locked. Bebas = bold display energy. Space Mono = data/code aesthetic. |

---

## 8. THINGS TRIED THAT DIDN'T WORK

| What | Why It Failed | Lesson |
|------|---------------|--------|
| Separate TCU Market Kitchen Terminal repo | Orphaned, empty `.git`, no deployable code | Everything belongs in monorepo |
| Trading Chef Remotion as standalone | No one ran it independently | Moved to `tools/` subfolder in monorepo |
| Multiple Vercel projects | 5 dead projects created confusion | One project (`mystermyself-git`) only |
| OpenAI integration as default | Paid key requirement violates operating rules | Mock mode default, real mode opt-in |
| `/src/app/` folder structure | Created orphan routes conflicting with `/app/` | Canonical is `/app/` at root |
| Beehiiv hosted redirect as primary CTA | Broke the user experience (external redirect) | Keep signup in-app, redirect to /welcome |

---

## 9. ENVIRONMENT VARIABLES & SECRETS

| Env Var | Required | Used In | Obtain From |
|---------|----------|---------|-------------|
| `BEEHIIV_API_KEY` | Yes (for newsletter) | `app/api/newsletter/subscribe/route.ts` | beehiiv.com → Settings → API Keys |
| `BEEHIIV_PUBLICATION_ID` | Yes | same | Already known: `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for auth/data) | `lib/supabase.ts` | Supabase dashboard (us-west-2 project) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `lib/supabase.ts` | Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server-side) | `lib/passport-db.ts` | Supabase dashboard |
| `STRIPE_SECRET_KEY` | Optional (payments disabled at launch) | `lib/stripe.ts` | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | Optional | `app/api/webhooks/stripe/route.ts` | Stripe dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Client-side Stripe | Stripe dashboard |
| `NEXT_PUBLIC_AI_PROVIDER` | Optional (default: mock) | `lib/aiCoach.ts` | Set to "anthropic" or "openai" |
| `ANTHROPIC_API_KEY` | Optional | `lib/aiCoach.ts` | console.anthropic.com |
| `OPENAI_API_KEY` | Optional | `lib/aiCoach.ts` | platform.openai.com |
| `MARKET_DATA_API_KEY` | Optional | `lib/marketData.ts` | Twelve Data or Polygon |
| `NEXT_PUBLIC_SITE_URL` | Yes | Various | `https://mystermyself.com` |

**CRITICAL RULE:** mystermyself-git → Supabase us-west-2 keys ONLY. Never cross with us-east-1.

---

## 10. DATA MODEL / SCHEMA

### `db/passport-schema.sql`
```
profiles (id UUID PK, username, display_name, avatar_url, xp INT, level INT, streak INT, created_at)
stamps (id UUID PK, profile_id FK, district TEXT, earned_at)
```

### `db/schema.sql`
```
leads (id UUID PK, email, lane TEXT, source TEXT, created_at)
products (id UUID PK, name, slug, price_cents INT, stripe_price_id, active BOOLEAN)
purchases (id UUID PK, lead_id FK, product_id FK, stripe_session_id, created_at)
```

### `db/tcu-schema.sql`
```
tcu_progress (id UUID PK, profile_id FK, lesson_slug, completed BOOLEAN, score INT, completed_at)
tcu_journal (id UUID PK, profile_id FK, entry TEXT, trade_type, created_at)
```

**Migration status:** Schema files exist but have NOT been run against Supabase. Tables don't exist yet.

---

## 11. INTEGRATIONS STATUS

| Service | Status | Files | Env Var | Quirks |
|---------|--------|-------|---------|--------|
| Supabase (Auth) | 🚧 Scaffolded | `lib/supabase.ts`, `app/auth/page.tsx` | `NEXT_PUBLIC_SUPABASE_*` | Tables not created yet |
| Supabase (Passport DB) | 🚧 Scaffolded | `lib/passport-db.ts`, `app/api/passport/*` | `SUPABASE_SERVICE_ROLE_KEY` | Schema in `db/` not applied |
| Stripe (Checkout) | 🚧 Scaffolded | `lib/stripe.ts`, `app/api/checkout/route.ts` | `STRIPE_SECRET_KEY` | Disabled at launch per rules |
| Stripe (Webhooks) | 🚧 Scaffolded | `app/api/webhooks/stripe/route.ts` | `STRIPE_WEBHOOK_SECRET` | No webhook URL configured |
| Beehiiv (Newsletter) | ✅ Wired | `app/api/newsletter/subscribe/route.ts` | `BEEHIIV_API_KEY` | Needs real key in Vercel |
| AI Coach (Claude/OpenAI) | 🚧 Mock mode | `lib/aiCoach.ts`, `app/api/coach/route.ts` | `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | Mock mode default, no cost |
| Market Data (Charts) | 🚧 Demo candles | `lib/marketData.ts` | `MARKET_DATA_API_KEY` | Placeholder data shown |
| Framer Motion | ✅ Wired | Multiple components | N/A | |
| lightweight-charts | ✅ Wired | `components/kitchen/` | N/A | |
| Resend (Email) | ❌ Not started | N/A | N/A | Emergent had this — import it |
| YouTube API | ❌ Not started | N/A | N/A | Documented in promo system docs |

---

## 12. CONTENT INVENTORY

| Content Type | Exists | Planned | Notes |
|--------------|--------|---------|-------|
| Academy lessons | 0 | ~20+ | `lib/academy.ts` has structure, no content |
| Character bios | 10 | 10 | Complete in `data/tcu-character-canon.ts` |
| District descriptions | 9 | 9 | In component files |
| Trading Chef lingo | 12 terms | 12+ | In `ceo-brand-bible.md` |
| YouTube promo scripts | 1 episode documented | 1 + 5 shorts | `docs/tcu-youtube-promo-system/BUILD-EPISODE-1.md` |
| Ebooks | 0 | 2+ (Gold Playbook, Courier Guide) | Not written |
| Character art (PNG) | 0 | 10+ | `/public/characters/README.md` has specs |
| Remotion video compositions | 2 | 10+ | `tools/trading-chef-studio/src/compositions/` |

---

## 13. CRITICAL CONTEXT THE NEXT AGENT MUST KNOW

1. **The homepage hero font is Bebas Neue on purpose** — do NOT change to Inter, Poppins, or any other font. Typography is brand-locked.

2. **Colors are locked** — Black `#060608`, Gold `#C9A84C`, Cream `#F5F0E8`, Deep `#0A0A0C`. Fire Orange, Red, Green for accents. Do NOT introduce blues, purples, or pastels.

3. **The orphan `/app/pages/` directory looks wrong but don't delete it** — flag it, but deletion requires CEO GO.

4. **Newsletter form already works** — it POSTs to `/api/newsletter/subscribe` and redirects to `/welcome`. Do NOT rewire to a Beehiiv hosted page.

5. **Mock mode is intentional** — AI Coach returns mock responses. This is correct behavior. Do not assume it's broken.

6. **Maurice never codes** — all terminal commands, git operations, and builds are done by agents. Write plain-English reports for him.

7. **`@mysterycartel` is the handle** — not `@mysterymyself`. The .env.local.example has wrong social handles (legacy). The brand canon in `.kiro/steering/brand-canon.md` is authoritative.

8. **The Remotion studio in `/tools/` is NOT part of the Next.js build** — it's a separate video rendering tool. Don't try to import from it.

9. **There's a GitHub Action `ceo-automerge.yml`** — it handles automatic merge flows but still respects CEO GO gate.

---

## 14. RECOMMENDED NEXT STEPS (top 5 priorities)

1. **Apply your cleaner layout to the existing routes** — The current build works but the layout/design structure from Emergent is the target aesthetic. Port your layout shells, nav, footer into `/components/layout/`. (L)

2. **Wire Resend email system** — You had this working. Bring it over as `/lib/resend.ts` + `/app/api/email/route.ts`. Needed for transactional emails and welcome sequences. (M)

3. **Upload character art** — Create or generate 10 character PNGs matching the canon descriptions. Drop into `/public/characters/`. Components already reference these paths. (M)

4. **Complete Stripe checkout flow** — The route exists. Wire a real product (Gold Playbook, $47). Test in Stripe test mode. (M)

5. **Build 3 Academy lessons** — `lib/academy.ts` has the structure. Write content for the first 3 Road Map lessons (Bias, Liquidity, AOI). This unlocks the /academy section. (S)

---

## 15. OPEN QUESTIONS FOR MAURICE

1. **Stripe product pricing** — Is Gold Playbook still $47? Is TCU Membership still $97/month? Need confirmed prices before wiring checkout.

2. **Character art style** — Should we use AI-generated art (e.g., Midjourney/DALL-E) or commission hand-drawn? Budget?

3. **Resend domain** — Which email domain for transactional emails? `noreply@mystermyself.com`? Need DNS verification.

4. **Fantasy Island content** — What content goes on the fantasy sports district page? Is there a partner or data source?

5. **Stan Store** — Is Stan Store still part of the payment stack or has Stripe replaced it entirely?

---

## APPENDIX: package.json Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-separator": "^1.1.10",
    "@stripe/stripe-js": "^4.1.0",
    "@supabase/supabase-js": "^2.45.0",
    "clsx": "^2.1.1",
    "framer-motion": "^11.3.8",
    "lightweight-charts": "^5.2.0",
    "lucide-react": "^0.417.0",
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "stripe": "^16.2.0",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.11",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "typescript": "^5.5.3"
  }
}
```

## APPENDIX: Routes (65 pages + 11 API routes)

### Pages
```
/                           → Homepage (interactive hero + districts + characters)
/about
/academy                    → Lesson list (empty)
/academy/[lesson]           → Individual lesson (dynamic)
/admin                      → Admin dashboard
/affiliate-disclosure
/auth                       → Login/signup (Supabase magic link)
/blueprint-bay              → AI/automation district
/brands
/breaded                    → Breaded Or Not?! page
/chart-kitchen              → Chart tool
/coast                      → Coast overview
/coast/[district]           → Dynamic district detail
/community
/courier-income-lab
/creator-pier               → Content district
/crown-method
/dashboard                  → User dashboard (stub)
/disclaimer
/districts                  → District list
/fantasy                    
/fantasy-island             → Fantasy sports district
/flavor-district            → Food district
/follow-the-coast           → Fallback for unknown links
/founder-island             → HQ district
/free-content
/join
/journal                    → Trading journal (stub)
/kitchen                    → Kitchen terminal
/kitchen-rush               → Gamified scenarios
/legacy-point               → Wealth district
/library
/library-vault              → Free resources district
/market-marina              → Trading/TCU district
/market-marina/tcu-terminal → TCU terminal app
/missions                   → Mission system (stub)
/opportunity-list           → Newsletter capture page
/passport                   → User passport (XP/stamps)
/passport/login
/passport/[username]
/playbooks
/pricing
/privacy
/products/medical-courier-guide
/refund
/resources
/roadmap
/route-harbor               → Courier district
/start
/strategy-roadmap
/subscribe
/tcu-theater                → TCU animated theater (stub)
/terms
/tools
/trading-chef
/trading-chef-university
/welcome                    → Post-signup confirmation
```

### API Routes
```
POST /api/newsletter/subscribe  → Beehiiv subscriber creation
POST /api/checkout              → Stripe checkout session
POST /api/coach                 → AI Coach query (mock/real)
POST /api/leads                 → Lead capture
GET  /api/admin/leads           → Admin lead list
GET  /api/admin/stats           → Admin stats
POST /api/passport/register     → Passport registration
POST /api/passport/stamp        → Stamp collection
GET  /api/passport/status       → Passport status
POST /api/passport/xp           → XP award
POST /api/webhooks/stripe       → Stripe webhook handler
```

---

**End of handoff. Pull this repo, read this file, say "audit" to begin.**
