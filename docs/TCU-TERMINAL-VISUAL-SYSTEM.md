# TCU Terminal Visual System — Market Marina

**Purpose:** Define how Market Marina should feel and how TCU components render.  
**Last Updated:** 2026-06-25

---

## The Core Metaphor

Market Marina is the **Trading Chef's Kitchen** — not a generic trading page, not a Bloomberg terminal.

Every concept maps to a kitchen metaphor:
- Trading setup = "The recipe"
- Entry = "The pass"
- Stop loss = "Burn point"
- Targets = "Tables served"
- FVG = "Leftover container"
- Session open = "Kitchen is open"
- No trade = "Kitchen is closed"

See `CHEF_LINGO` in `data/tcu-character-canon.ts` for the full dictionary.

---

## Section Patterns

### TradingChefSpotlight

Used on: `/` (homepage), `/market-marina`

Structure:
1. **Hero intro** — "THE KITCHEN IS OPEN" + Trading Chef avatar (hero size)
2. **TCU Road Map** — 8 interactive steps, click-to-expand with chef labels
3. **Chef Lingo Decoder** — two-column grid: trading term → kitchen term
4. **Golden Rule** — "NO SETUP, NO SERVE." in large Bebas Neue with gold text-shadow pulse

### TCUCharacterCanonStrip

Used on: `/`, `/market-marina`, `/opportunity-list`, `/welcome`, `/coast/market-marina`

Modes:
- **Full:** all 9 characters, horizontal scroll
- **Compact:** first 3 characters only (`compact={true}`)
- **Subset:** specific characters by ID (`subset={['candle-kid', 'wickie', 'louie-liquidity']}`)

### CharacterCoachCards

Used on: `/market-marina`

- Rotating 3-card section (Candle Kid, Wickie, Louie Liquidity)
- Auto-cycles every 4 seconds
- Pauses on hover
- Each card: avatar + name + role + 3 lessons + quote + CTA

---

## Road Map Display Rules

The TCU Road Map has exactly 8 steps. They are always displayed in order.

| Step | Label | Chef Label |
|---|---|---|
| 1 | Bias | Read the Menu |
| 2 | Liquidity | Clear the Plates |
| 3 | AOI | Find the Station |
| 4 | Delivery | Plate the Dish |
| 5 | Confirmation | Taste Before Serving |
| 6 | Entry | The Pass |
| 7 | Targets | Tables Served |
| 8 | Management | Clean the Kitchen |

Rules:
- Each step shows number, label, and chef label in collapsed state
- Click/tap expands to show full description
- Background step number in faded Bebas Neue (large)
- Never reorder, skip, or add steps

---

## Market Marina Page Structure

```
/market-marina
├── MarketMarinaHero (existing)
├── TradingChefSpotlight (Road Map + Lingo + Golden Rule)
├── TCUCharacterCanonStrip (all 9)
├── CharacterCoachCards (rotating trio)
├── MarketMarinaCharacters (existing — should refactor to use canon data)
├── MarketMarinaAcademy (existing)
├── TCU Market Kitchen Terminal (existing)
├── MarketMarinaKitchen (existing)
└── Capture CTA
```

---

## CTA Language for Market Marina

- "Enter the Kitchen →" (primary CTA)
- "Join TCU Updates →" (to /opportunity-list?lane=interest_trading_chef)
- "Start with Bias →" (to /market-marina#road-map)
- "Learn from [Character Name] →" (coach cards)

Never use generic "Sign Up" or "Learn More" on Market Marina pages.

---

## Dashboard TCU Widget

When user's lane is `interest_trading_chef`:
- Shows "Trading Chef Next Step" card
- Displays current Road Map step (default: Step 1 — Bias)
- CTA: "Today's Kitchen →" links to /market-marina
- Future: pull actual progress from Supabase passport system
