# F1 — Trading Chef Studio Design

## Architecture

```
/market-marina (district page)
├── TradingChefSpotlight (Road Map + Lingo + Golden Rule)
├── TCUCharacterCanonStrip (9 characters)
├── CharacterCoachCards (rotating trio)
├── MarketMarinaAcademy (lessons)
└── Market Kitchen Terminal (chart tool)

/academy (lesson system)
├── Lesson list page
└── /academy/[lesson] (individual lessons)

/chart-kitchen (trading tool)
├── Chart display (lightweight-charts)
├── AI Coach analysis
├── Journal integration
└── XP/streak system
```

## Data Flow

```
data/tcu-character-canon.ts → ALL character components
lib/xp-reward-engine.ts → XP calculations
lib/passport-db.ts → Supabase passport tables
/api/coach → AI trading analysis (OpenAI/Anthropic/mock)
```

## Content Production Pipeline

1. CEO creates trading analysis (manual)
2. Content formatted with Chef Lingo
3. Published via Beehiiv (The Opportunity List)
4. Cross-posted to YouTube/TikTok
5. Drives to /opportunity-list?lane=interest_trading_chef

## Product Funnel

```
Free: Opportunity List signup → lane=trading
Free: Academy lessons (first 3)
$47: Gold Playbook (Stripe checkout)
$97/mo: TCU Membership (Stripe subscription)
```
