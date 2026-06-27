# Trading Chef Studio — CLAUDE.md

> This file gives Claude Code full context on the Trading Chef Studio project.
> Every session should start here before touching any code.

---

## gstack

This project uses **gstack** — Garry Tan's Claude Code skill toolkit.

Use these skills before and during all work:

| Task | Skill |
|------|-------|
| Planning a new feature or composition | `/plan-ceo-review` |
| Product/brand direction questions | `/office-hours` |
| Before committing any code | `/review` |
| After running Remotion Studio | `/qa` |
| Architecture decisions | `/plan-eng-review` |
| Anything UI/design related | `/plan-design-review` |
| Security check before deploy | `/cso` |
| Shipping a PR | `/ship` |

**Rule:** Run `/plan-ceo-review` before adding any new video composition or feature. Run `/review` before every commit.

---

## Project Overview

**Brand:** The Trading Chef
**Creator:** Maurice Scott | @mysterymyself
**Focus:** XAUUSD (Gold) trading education content
**Stack:** TypeScript, React, Remotion, TradingView Pine Script
**Style:** Black, gold, red — cinematic chef-trader aesthetic
**Tagline:** "Feeding the World, One Trade at a Time."

This repo is a **content production engine** — it generates educational trading videos for YouTube, YouTube Shorts, and social media using animated React components rendered by Remotion.

---

## Repo Structure

```
trading-chef-studio/
├── trading-chef-remotion-os-v2/     ← ACTIVE — Full production version
│   ├── src/
│   │   ├── compositions/
│   │   │   ├── TradingChefFVG.tsx   ← YouTube (1280x720, 36s)
│   │   │   └── TradingChefShort.tsx ← YouTube Shorts (1080x1920, 45s)
│   │   ├── components/
│   │   │   ├── SceneCard.tsx        ← Main scene renderer
│   │   │   ├── ChefAvatar.tsx       ← Chef character component
│   │   │   ├── ChartKitchen.tsx     ← Chart visualization component
│   │   │   └── SafeText.tsx         ← Text rendering utility
│   │   ├── data/
│   │   │   └── videoData.ts         ← Scene data (edit here to change video content)
│   │   ├── types/
│   │   │   └── sceneTypes.ts        ← TypeScript types for all scene data
│   │   └── Root.tsx                 ← Remotion composition registry
│   └── public/chef/                 ← ⚠️ PUT CHEF AVATAR PNG HERE
│
├── trading-chef-remotion-starter/   ← Simpler template (reference only)
│
└── scripts/
    ├── trading_chef_xauusd_v1.pine  ← TradingView Pine Script indicator
    └── trading_chef_claude_prompt.md ← AI chart analysis system prompt
```

---

## Scene Data Schema

Every video is driven by a `TradingChefVideoData` object in `src/data/videoData.ts`.

```typescript
type SceneData = {
  id: string;
  type: "hook" | "lesson" | "chart" | "warning" | "checklist" | "cta";
  start: number;        // seconds
  duration: number;     // seconds
  title: string;
  subtitle: string;
  voiceover: string;
  chefPose: "confident" | "teaching" | "warning" | "celebrating";
  visual: string;       // description of what to show
  sfx?: string;         // sound effect cue
};
```

**To create a new video:** add a new data object in `videoData.ts` and register a new Composition in `Root.tsx`.

---

## Compositions

| ID | Format | Size | FPS | Duration | Purpose |
|----|--------|------|-----|----------|---------|
| `TradingChefFVG` | YouTube | 1280×720 | 30 | 36s (1080f) | FVG lesson |
| `TradingChefShort` | Shorts | 1080×1920 | 30 | 45s (1350f) | Vertical short |

---

## Dev Commands

```bash
# From inside trading-chef-remotion-os-v2/

npm install                          # first time only
npm run dev                          # open Remotion Studio in browser
npm run render:tc                    # render YouTube video → out/fvg-recipe.mp4
npm run render:short                 # render Short → out/fvg-recipe-short.mp4
```

---

## Brand Rules — NEVER BREAK THESE

1. **Colors:** Black `#000000`, Gold `#FFD700`, Red `#CC0000`, Green `#00AA00`, Fire Orange `#FF6600`
2. **Font style:** Bold, cinematic, high contrast
3. **Chef avatar:** Always present on screen. Image goes in `public/chef/` as PNG.
4. **Kitchen metaphor:** Every trading concept must use the Trading Chef language system (see below)
5. **Disclaimer:** Every video ends with "Educational only — not financial advice."
6. **CTA:** Every video ends with "Follow The Trading Chef for daily chart recipes."
7. **No chasing candles:** Rule #1 always appears in warning scenes.

---

## Trading Chef Language System

| Trading Term | Trading Chef Language |
|---|---|
| Fair Value Gap (FVG) | Leftover container |
| Inverted FVG | Recycled leftovers |
| Entry | The pass |
| Stop Loss | Burn point |
| Take Profit | Table served |
| BOS (Break of Structure) | New dish on the menu |
| CHoCH (Change of Character) | Menu is changing |
| Supply zone | Inventory overhead |
| Demand zone | Restocked kitchen |
| Liquidity sweep | Order filled |
| Consolidation | Mise en place |
| Confirmation | Ticket fired |
| No trade condition | Kitchen is not ready |
| Overextended candle | Chasing the candle |

---

## Planned Video Episodes (from masterlist)

| Prompt # | Title | Status |
|----------|-------|--------|
| #01 | Daily XAUUSD Recipe | ⬜ not started |
| #10 | FVG Recipe Lesson | ✅ data built |
| #11 | Liquidity Sweep Lesson | ⬜ not started |
| #12 | Risk Management (Portion Control) | ⬜ not started |
| #13 | Don't Chase Candles | ⬜ not started |
| #14 | Market Structure | ⬜ not started |
| #15 | Kids Safe Financial Literacy | ⬜ not started |

---

## Known Gaps — Fix These First

1. **Chef avatar missing** — `public/chef/` folder is empty. Drop a PNG of the Trading Chef caricature there before rendering.
2. **No GitHub remote** — repo is local only. Push to `github.com/mysterycartelhub/trading-chef-studio`.
3. **node_modules not installed** — run `npm install` inside `trading-chef-remotion-os-v2/` before using Remotion Studio.
4. **`out/` folder doesn't exist yet** — created automatically on first render.

---

## Related Brand Assets

- Pine Script indicator: `scripts/trading_chef_xauusd_v1.pine` → paste into TradingView
- AI chart analysis prompt: `scripts/trading_chef_claude_prompt.md` → use in Claude with a chart screenshot
- Brand Bible: `../00_Brand Bible/`
- Scott-King Holdings docs: `../01_Scott King Holdings/`

---

## Contact / Brand

**Maurice Scott** | mysterycartel@gmail.com
**GitHub:** github.com/mysterycartelhub
**Brand:** The Trading Chef + Breaded Or Not?!
**Holding:** Scott-King Holdings LLC / Breaded Enterprise Trust
