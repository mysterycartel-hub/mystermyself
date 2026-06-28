# RELAY-EMERGENT-002 — Where to Find Specs, Canon, Characters, Roadmap & Skills

## Status: REFERENCE
## Priority: HIGH
## From: Kiro (repo builder)
## To: Emergent Agent
## CEO: Maurice Scott

---

## Purpose

This document tells you (Emergent) exactly where to find the TCU trading app specs, character canon, roadmap, education system design, tools used, and skill files in the `mysterycartel-hub/mystermyself` repo.

---

## 1. TCU Trading App Spec (Requirements + Design)

The Kiro spec for the Trading Chef Studio (Frame 1) lives here:

```
.kiro/specs/f1-trading-chef-studio/
├── requirements.md    ← Full requirements: user stories, acceptance criteria
└── design.md          ← Technical design: architecture, data models, API
```

This is the formal spec that drives all TCU Market Kitchen Terminal development.

---

## 2. Character Canon (10 Locked Characters)

### Primary Canon Doc
```
docs/TCU-CHARACTER-CANON.md
```

### Full Product Canon (all districts + characters)
```
docs/PRODUCT_CANON.md
```

### Characters (never invent new ones):
Trading Chef | Candle Kid | Wickie | Louie Liquidity | Chef Goldie | Grandma Market | Nana Value | Melissa Mayhem | Melody Mayhem | Rico Rhythm

### TCMOS Expansion Characters:
Mr. Stocks (equities) | Dave Dollar (forex) | Crypto Carl (crypto)

---

## 3. TCU Roadmap & Education System

### Source of Truth
```
docs/TCU_SOURCE_OF_TRUTH.md
```

### TCU Master Law (never remove)
> No Sweep. No Shift. No Trade.

### Terminal Visual System
```
docs/TCU-TERMINAL-VISUAL-SYSTEM.md
```

### World Visual Canon
```
docs/tcu-world-visual-canon.md
```

### YouTube Promo System + Episode Builds
```
docs/tcu-youtube-promo-system/
├── TCU-YOUTUBE-PROMO-SYSTEM.md
└── BUILD-EPISODE-1.md
```

---

## 4. Chef Lingo (Trading → Kitchen Language)

The brand voice is documented in the CEO Brand Bible steering file:

```
.kiro/steering/ceo-brand-bible.md
```

Key translations:
| Trading Term | Kitchen Equivalent |
|---|---|
| FVG | Leftover container |
| Entry | The pass |
| Stop Loss | Burn point |
| Targets | Tables served |
| Big candle | Full course meal |
| Institutional move | Michelin Star move |
| Setup | The recipe |
| Session open | Kitchen is open |
| Liquidity sweep | Clearing the plates |
| Structure break | Flip the menu |
| Rejection | Sent back to the kitchen |

AI schema fields: `chef_check`, `burn_alarm`, `no_clean_plate_warning`, verdict `'No Clean Plate'`

---

## 5. Lib Files (TCU Logic / AI / Market Data)

All runtime logic lives in `/lib/`:

| File | What It Does |
|------|------|
| `lib/tcu-terminal.ts` | TCU terminal state + session logic |
| `lib/aiCoach.ts` | AI Coach integration (Claude Sonnet via Emergent LLM) |
| `lib/kitchen.ts` | Kitchen metaphor engine |
| `lib/kitchen-rush-scenarios.ts` | Scenario-based learning content |
| `lib/marketData.ts` | Market data adapter (demo + live providers) |
| `lib/progression.ts` | XP / level / streak engine |
| `lib/mission-engine.ts` | Mission / quest system |
| `lib/quests.ts` | Quest definitions |
| `lib/xp-reward-engine.ts` | XP reward calculations |
| `lib/tcuOverlayEngine.ts` | TCU overlay UI logic |
| `lib/character-trigger-engine.ts` | Character appearance triggers |
| `lib/academy.ts` | Academy / lessons system |
| `lib/districts.ts` | District definitions + routing |
| `lib/district-content.ts` | District page content |
| `lib/passport.ts` | User passport (progress tracking) |
| `lib/passport-db.ts` | Passport persistence layer |

---

## 6. Design System Tokens

```
design-system/
├── mystermyself-design-system.md   ← Master design tokens
├── trading-chef-universe.md        ← TCU-specific tokens + components
├── fantasy-island.md               ← Fantasy Island district design
└── route-harbor.md                 ← Route Harbor district design
```

### Locked Design Tokens
```
Background:   #060608 (var(--black))
Accent:       #C9A84C (var(--gold))
Text:         #F5F0E8 (var(--cream))
Deep:         #0A0A0C (var(--deep))
Typography:   Bebas Neue (display) + Space Mono (data/labels)
```

---

## 7. Skills (AI Agent Configuration)

### Kiro Skills
```
.kiro/skills/ceo-start/SKILL.md     ← CEO-START v3.0 routing + session init
```

### Claude Skills (for Claude Code agent)
```
.claude/skills/
├── banner-design/SKILL.md
├── brand/SKILL.md                  ← Brand guideline enforcement
├── design/SKILL.md                 ← Design generation
├── design-system/SKILL.md          ← Design system management
├── slides/SKILL.md                 ← Slide/presentation generation
├── ui-styling/SKILL.md             ← UI/CSS styling
└── ui-ux-pro-max/SKILL.md          ← Full UI/UX generation
```

---

## 8. Steering Files (Rules All Agents Follow)

```
.kiro/steering/
├── ceo-brand-bible.md              ← Canon, characters, lingo, brands, output rules
├── mystermyself-automation.md       ← Operating rules, workflow, red gates
└── relay-automation.md              ← PR/branch/relay automation rules
```

---

## 9. All Other Specs in the Repo

```
.kiro/specs/
├── f1-trading-chef-studio/         ← TCU Market Kitchen Terminal (YOUR PRIMARY TARGET)
├── f2-breaded-hq/                  ← Breaded Or Not?! food ops
├── f3-scott-king-legal/            ← Legal / entity structure
├── f4-courier-income-lab/          ← Knighten Route courier ops
├── f5-content-funnel-engine/       ← Funnels / ebooks / email sequences
├── ops-004b-full-mvp-funnel-build/ ← Full MVP funnel spec
└── rumble-launch-content/          ← Rumble launch content plan
```

---

## 10. Key Reference Docs

| File | What It Is |
|------|------|
| `AGENTS.md` | Master rules for ALL AI agents |
| `docs/MEMORY-BLOCKS.md` | Memory anchor — read this first for full context |
| `docs/MYSTERMYSELF_SOURCE_OF_TRUTH.md` | Master source of truth |
| `docs/MONETIZATION_SOURCE_OF_TRUTH.md` | Revenue model + pricing |
| `docs/INTERACTION-CANON.md` | How characters interact |
| `docs/VISUAL-CANON.md` | Visual identity rules |
| `docs/BUILD_STATUS.md` | Current build health |
| `docs/CEO_BRIEF.md` | Plain-English status for Maurice |
| `docs/KNOWN_BLOCKERS.md` | What's blocking launch |

---

## 11. Tools & Stack Summary

| Tool | Purpose |
|------|---------|
| Next.js 14.2.5 | App framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Auth + database |
| Stripe | Digital payments |
| Square | In-person food payments |
| Beehiiv | Newsletter (The Opportunity List) |
| Claude Sonnet 4.5 | AI Coach (via Emergent Universal LLM Key) |
| Vercel | Auto-deploy from main |
| MongoDB | TCU terminal data (journal, chart reviews, lessons, watchlist) |
| Resend | Transactional email |

---

## How to Use This

1. **Clone** `mysterycartel-hub/mystermyself` → branch `main`
2. **Read first:** `docs/MEMORY-BLOCKS.md` → then `AGENTS.md`
3. **TCU spec:** `.kiro/specs/f1-trading-chef-studio/requirements.md` + `design.md`
4. **Character canon:** `docs/TCU-CHARACTER-CANON.md`
5. **Chef lingo:** `.kiro/steering/ceo-brand-bible.md` (Trading Chef Lingo table)
6. **Design tokens:** `design-system/trading-chef-universe.md`
7. **AI Coach logic:** `lib/aiCoach.ts` + `lib/kitchen.ts`
8. **Your build target:** Apply your layout vision on branch `feature/emergent-layout-upgrade`

---

## Rules Reminder

- Never push to `main`
- Never invent characters or districts
- Never change brand colors or typography
- TCU Master Law: No Sweep. No Shift. No Trade.
- All changes via feature branch → PR → CEO merge
