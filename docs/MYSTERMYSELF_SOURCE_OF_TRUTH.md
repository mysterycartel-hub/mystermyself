# MYSTERMYSELF SOURCE OF TRUTH
**MysterMyself Ecosystem OS — Scott-King Coast**
Last updated: 2026-06-15

---

## TABLE OF CONTENTS

1. [World Architecture](#world-architecture)
2. [District Architecture](#district-architecture)
3. [Funnel Architecture](#funnel-architecture)
4. [Revenue Architecture](#revenue-architecture)
5. [Brand Canon](#brand-canon)
6. [MS Crown Usage](#ms-crown-usage)
7. [Route Harbor Canon](#route-harbor-canon)
8. [Fantasy Island Canon](#fantasy-island-canon)
9. [Blueprint Bay Canon](#blueprint-bay-canon)
10. [Creator Pier Canon](#creator-pier-canon)
11. [Flavor District Canon](#flavor-district-canon)
12. [Trading Chef Universe Canon](#trading-chef-universe-canon)

---

## WORLD ARCHITECTURE

### The Scott-King Coast
MysterMyself is a **multi-income education and entertainment universe** built on the metaphor of a coastal city. The Scott-King Coast is the world. Every income lane is a district. Every district is a destination.

The world has one unifying truth: **every skill, every play, every money move is a location you can visit and a system you can learn.**

### Platform Versions
| Version | What Was Built | Status |
|---|---|---|
| V1 | Initial ecosystem concept, brand identity | ✅ Complete |
| V2 | Scott-King Coast interactive map, district pages | ✅ Complete |
| V3 | Passport system — auth, XP, stamps, badges | ✅ Complete |
| V4 | TCU Academy — 10 levels, 13 lessons, full curriculum engine | ✅ Complete |
| V5 | Quest board, Kitchen Rush, Crown Method, Theater XP sync | ✅ Complete |
| V6+ | DEPLOYMENT PHASE — no new features | 🔒 Locked |

### Tech Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript strict mode (`.jsx` allowed via `allowJs`)
- **Styling:** CSS Modules + global CSS variables + inline styles
- **Animation:** Framer Motion
- **Auth:** Supabase Email Magic Link
- **Database:** Supabase PostgreSQL
- **AI:** Anthropic API (`claude-haiku-4-5-20251001`)
- **Payments:** Stripe (disabled at launch)
- **Hosting:** Vercel (autodeploy from `main`)
- **Repo:** `https://github.com/mysterycartel-hub/mystermyself.git`

### Design System Locks
```
Background:   var(--black) = #060608
Accent:       var(--gold)  = #C9A84C
Text:         var(--cream) = #F5F0E8
Deep:         var(--deep)  = #0A0A0C
Typography:   Bebas Neue (display) + Space Mono (data/labels)
Grid overlay: .hero-grid class
MS Crown:     Never lowercase. Never serif. Never modified.
```

---

## DISTRICT ARCHITECTURE

### The 9 Districts of Scott-King Coast

| District | Slug | Tag | Income Lane | Color | Terrain | Passport Stamp |
|---|---|---|---|---|---|---|
| Founder Island | `founder-island` | HQ | Personal brand / Origin story | Gold | island | ORIGIN |
| Market Marina | `market-marina` | Trading | XAUUSD / ICT / Forex | Gold | marina | GOLD |
| Route Harbor | `route-harbor` | Logistics | Medical courier / Contract delivery | Blue | harbor | ROUTE |
| Blueprint Bay | `blueprint-bay` | Playbooks | Frameworks / Playbooks / Templates | Green | bay | BLUEPRINT |
| Creator Pier | `creator-pier` | AI Creator | AI workflows / Content systems | Purple | pier | CREATOR |
| Flavor District | `flavor-district` | Food Biz | Breaded Or Not?! / Pop-up catering | Red | district | FLAVOR |
| Legacy Point | `legacy-point` | Academy | TCU 10-level curriculum | Gold | point | LEGACY |
| Fantasy Island | `fantasy-island` | Fantasy | Fantasy Draft Bible / Draft tools | Orange | island | FANTASY |
| Library Vault | `library-vault` | Free | Free guides / Starter content | Slate | vault | VAULT |

### District Route Pattern
- Coast hub: `/coast`
- District detail page: `/coast/[district-slug]`
- Shortcut redirects: `/route-harbor` → `/coast/route-harbor`, etc.
- All 9 district detail pages are SSG (generateStaticParams from `lib/districts.ts`)

### District Source of Truth
**File:** `lib/districts.ts` — `districts` array is the canonical data source for all district info.

Every district has: `id`, `slug`, `name`, `tagline`, `emoji`, `color`, `colorDim`, `icon`, `description`, `longDescription`, `features[]`, `cta`, `href`, `externalHref`, `mapX`, `mapY`, `size`, `terrain`, `tag`, `passportStamp`

---

## FUNNEL ARCHITECTURE

### Entry Points
| Entry Point | Destination | Purpose |
|---|---|---|
| `mystermyself.com` | `/` (Home) | Brand awareness, ecosystem overview |
| Organic social | `/coast` or district pages | Coast map exploration |
| Trading content | `/market-marina` → `/trading-chef-university` | TCU enrollment funnel |
| Fantasy content | `/fantasy-island` → `/fantasy` | Fantasy product funnel |
| Food content | `/flavor-district` → `/breaded` | Breaded Or Not?! funnel |
| Logistics content | `/route-harbor` → `/courier-income-lab` | Courier income funnel |
| YouTube | `/tcu-theater` | Video → XP → Academy enrollment |
| Email list | `/passport/login` | Passport auth + XP gamification |

### Home Page Section Order
1. HomeHero — brand statement
2. EcosystemMarquee — district names scrolling
3. FlagshipVideos — 3 TCU theater videos
4. EcosystemMarquee (dark, reverse)
5. ScottKingCoastMap — interactive map
6. EcosystemGrid — income lane cards
7. WealthCity — philosophy section
8. HomeRoadmap — platform roadmap
9. PassportPreview — Passport CTA
10. CharacterSection — TCU characters
11. LeadMagnetForm — email capture
12. Footer

### Email Capture
- **Component:** `LeadMagnetForm`
- **API:** `POST /api/leads` — currently logs to console (Supabase insert commented out, enable when configured)
- **Table needed:** `leads` (email, name, interest, division, source, created_at)
- **Beehiiv integration:** Pending — wire Beehiiv API to `/api/leads` when active

---

## REVENUE ARCHITECTURE

### Product Ladder
| Tier | Product | Status | Price | Platform |
|---|---|---|---|---|
| Free | Library Vault guides + free content | ✅ Live | $0 | Site |
| Free | TCU Academy Levels 0–9 | ✅ Live | $0 | Site |
| Free | Passport XP system | ✅ Live | $0 | Site |
| Paid | Gold Playbook | 🔒 Stripe disabled | TBD | Stripe |
| Paid | TCU Membership (Crown Method access) | 🔒 Stripe disabled | TBD | Stripe |
| Paid | Courier Starter Pack | 🔒 Stripe disabled | TBD | Stripe |
| Paid | Food Pop-Up Blueprint | 🔒 Stripe disabled | TBD | Stripe |
| Paid | Fantasy Draft Bible | 🔒 Stripe disabled | TBD | Stripe |
| Paid | AI Operator Guide | 🔒 Stripe disabled | TBD | Stripe |
| Affiliate | Amazon Associates | Pending setup | Commission | Amazon |
| Affiliate | Impact / CJ | Pending setup | Commission | External |

### Stripe Product IDs (env vars, all disabled)
```
STRIPE_PRICE_GOLD_PLAYBOOK
STRIPE_PRICE_TCU_MEMBERSHIP
STRIPE_PRICE_COURIER_STARTER
STRIPE_PRICE_FOOD_POPUP
STRIPE_PRICE_FANTASY_DRAFT_BIBLE
STRIPE_PRICE_AI_OPERATOR
```

### To Enable Stripe
1. Create products in Stripe Dashboard
2. Add price IDs to Vercel env vars
3. Uncomment `lib/stripe.ts` usage in `app/api/checkout/route.ts`
4. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to Vercel

---

## BRAND CANON

### MysterMyself
- Full name: **MysterMyself**
- Never: "Mystery Myself" / "Myster Myself" / "mysterymyself"
- The platform / the ecosystem / the universe — not just a website

### The Founder
- **Maurice Scott** — founder, Trading Chef, creator of the ecosystem
- Public brand name: **Maurice Scott** or **Trading Chef**
- The persona behind Market Marina and the TCU curriculum

### Brand Voice
- Direct. No filler. No fluff.
- Luxury fintech meets street-smart education
- Knowledge is the product. The Coast is the world.
- "You earn it. You do not buy it."

### Visual Locks
- **Background:** Black/Navy — never white, never light
- **Accent:** Gold (#C9A84C) — singular, never rainbow
- **Grid overlay:** Always present on hero sections
- **Typography:** Large, tracked, uppercase for headers
- **Aesthetic:** Luxury fintech — not crypto, not gaming, not hype

---

## MS CROWN USAGE

### What MS Crown Is
MS Crown is the internal designation for the **M · S · Crown framework** — the three-pillar content and strategy system used across the ecosystem.

| Pillar | Symbol | Domain |
|---|---|---|
| M | Move | Market structure, bias, directional read |
| S | Structure | AOI, delivery, price mechanics |
| Crown | Confirmation | Entry confirmation, The Pass, execution |

### Rules
- MS Crown is always written as **M · S · Crown** (with interpuncts)
- Never lowercase
- Never as an acronym only (MSC)
- Never used as a company name — it is a framework name
- Used in: Crown Method page, curriculum references, brand content
- **Crown Method** (`/crown-method`) is the premium module that teaches the full framework
- Requires `head-chef` badge to unlock the advanced modules

---

## ROUTE HARBOR CANON

**District:** Route Harbor
**Slug:** `route-harbor`
**Income Lane:** Logistics — medical courier routes, contract delivery, road-based income
**Tag:** Logistics
**Color:** `#3B82F6` (Blue)
**Terrain:** Harbor

### What It Is
The logistics and courier income operations center. For operators who build income systems on the road — medical specimen courier routes, Amazon DSP, contract delivery vehicles, and route acquisition strategy.

### Current Page
`/route-harbor` → redirects to `/coast/route-harbor`
Full district detail page at `/coast/route-harbor` (SSG)

### External Link
`/courier-income-lab` — the dedicated courier income content hub

### Canon Content
- Medical Courier Routes
- Contract Delivery systems
- Route Acquisition Math
- Vehicle Strategy
- Logistics Systems
- Logistics City Hub

---

## FANTASY ISLAND CANON

**District:** Fantasy Island
**Slug:** `fantasy-island`
**Income Lane:** Fantasy sports — draft tools, rankings, research, strategy
**Tag:** Fantasy
**Color:** `#F97316` (Orange)
**Terrain:** Island

### What It Is
The Fantasy Draft Bible universe. Rankings, sleeper research, draft tools, and the complete fantasy football system. For players competing for prizes and serious fantasy investors.

### Current Page
`/fantasy-island` → redirects to `/coast/fantasy-island`
Full district detail page at `/coast/fantasy-island` (SSG)

### External Link
`/fantasy` — the Fantasy Draft Bible content hub

### Canon Content
- Fantasy Draft Bible (flagship product)
- Draft Tools
- Sleeper Research
- Rankings Database
- Strategy Guides
- Multi-Format Systems (redraft, dynasty, best ball)

---

## BLUEPRINT BAY CANON

**District:** Blueprint Bay
**Slug:** `blueprint-bay`
**Income Lane:** Frameworks and execution playbooks across all income lanes
**Tag:** Playbooks
**Color:** `#22C55E` (Green)
**Terrain:** Bay

### What It Is
Where strategy lives. Money Move Playbooks — executable frameworks for every income lane in the ecosystem. No theory. Step-by-step guides that produce income.

### Current Page
`/blueprint-bay` → redirects to `/coast/blueprint-bay`
Full district detail page at `/coast/blueprint-bay` (SSG)

### External Link
`/playbooks` — the playbooks library

### Canon Content
- Money Move Playbooks
- Income Lane Systems
- Business Templates
- Revenue Frameworks
- Digital Products
- Execution Guides

---

## CREATOR PIER CANON

**District:** Creator Pier
**Slug:** `creator-pier`
**Income Lane:** Content creation, AI workflows, automation, digital business infrastructure
**Tag:** AI Creator
**Color:** `#A855F7` (Purple)
**Terrain:** Pier

### What It Is
The content and automation engine of Scott-King Coast. AI-powered workflows, Claude and ChatGPT prompt libraries, content systems, and the digital business operating system that runs behind every MysterMyself brand.

### Current Page
`/creator-pier` → redirects to `/coast/creator-pier`
Full district detail page at `/coast/creator-pier` (SSG)

### External Link
`/about` (current — future: `/creator-pier` full content hub)

### Canon Content
- AI Business OS
- Claude Workflows
- Content Systems
- Prompt Libraries
- Automation Playbooks
- Creator Economy Tools

---

## FLAVOR DISTRICT CANON

**District:** Flavor District
**Slug:** `flavor-district`
**Income Lane:** Food business — catering, pop-ups, food entrepreneurship
**Tag:** Food Biz
**Color:** `#c0392b` (Red)
**Terrain:** District

### What It Is
Where hustle meets hunger. The Breaded Or Not?! brand lives here — pop-up operation systems, catering business frameworks, menu development, brand building, and the complete food entrepreneur playbook.

### Flagship Brand
**Breaded Or Not?!** — the food brand. Wing-based catering and pop-up operation.
- Route: `/breaded`
- District page: `/coast/flavor-district`

### Canon Content
- Breaded Or Not?! brand systems
- Pop-Up Operations
- Catering Framework
- Menu Development
- Food Brand Playbook
- Revenue Operations

---

## TRADING CHEF UNIVERSE CANON

Trading Chef Universe (TCU) occupies **Market Marina** (the financial district) and **Legacy Point** (the academy). See `docs/TCU_SOURCE_OF_TRUTH.md` for the full TCU canon.

### Summary
- 10 levels (0–9): Market Child → Head Chef
- 10 characters: locked, no additions
- TCU Academy at `/academy` — free, sequential, gated
- TCU Theater at `/tcu-theater` — 3 flagship videos
- Passport system at `/passport` — XP, badges, stamps
- Kitchen Rush at `/kitchen-rush` — recognition trainer
- Market Kitchen at `/kitchen` — TradingView chart environment
- Crown Method at `/crown-method` — premium M·S·Crown framework module

### Safety Constraints (permanent)
- No fake win rates
- No profit promises
- No signals
- No gambling encouragement
- AI Coach enforces all in system prompt
