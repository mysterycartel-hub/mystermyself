# Trading Chef Studio 🍳📈

Remotion-based video animation projects for **The Trading Chef** brand — gold trading education content built with TypeScript/React.

## What's in here

```
trading-chef-studio/
├── trading-chef-remotion-starter/   ← Starting template (simpler)
├── trading-chef-remotion-os-v2/     ← Full version with FVG + Short compositions
└── scripts/
    ├── trading_chef_xauusd_v1.pine  ← TradingView Pine Script indicator
    └── trading_chef_claude_prompt.md ← AI prompt for content generation
```

## Quick Start (Remotion projects)

```bash
# 1. Go into the project you want to work on
cd trading-chef-remotion-os-v2

# 2. Install dependencies (only needed once)
npm install

# 3. Open Remotion Studio in browser
npx remotion studio

# 4. To render a video
npx remotion render
```

## ⚠️ Memory / Storage Warning

`node_modules/` is excluded from git (see `.gitignore`).  
Always run `npm install` after cloning — do NOT commit node_modules, it's 200MB+.

## Compositions

- **TradingChefFVG** — Fair Value Gap breakdown video
- **TradingChefShort** — YouTube Shorts format (vertical)
- **TradingChefDaily** — Daily market recap format

## Brand: The Trading Chef
Focus: XAUUSD / Gold trading education  
Style: Black, gold, red — cinematic chef-trader aesthetic
