# Trading Chef Universe — Design System

**District:** Market Marina  
**Route:** `/coast/market-marina` · `/pages/market-marina` · `/academy/[lesson]` · `/trading-chef-university`  
**Accent:** `#0D9488` (teal)  
**Status:** Live

---

## IDENTITY

**Brand:** The Trading Chef Universe (TCU)  
**Parent:** Scott-King Holdings → MysterMyself → Market Marina  
**Tagline:** Feeding the World One Trade at a Time.  
**Character:** Chef Goldie — confident Black male chef-trader. Chef hat, apron, gold chain. Urban cartoon. Bold.  
**Core metaphor:** Kitchen = market. Recipes = strategies. Ingredients = indicators. Chef = trader.

---

## PATTERN

**Layout:** Education-first with product conversion  
**Section structure:**
1. District Hero (teal accent, candlestick SVG)
2. TCU Overview — 8 learning steps
3. Character gallery (Chef Goldie, Wickie, Louie Liquidity, Grandma Market)
4. Lesson grid with progress indicators
5. Beehiiv CTA band (teal)
6. Product/upgrade path

---

## COLORS

| Role | Hex | Usage |
|------|-----|-------|
| District accent | `#0D9488` | Borders, labels, CTAs, step numbers |
| Background | `#060608` | Page |
| Background secondary | `#0D0D10` | Cards, lesson tiles |
| Gold | `#C9A84C` | MS Crown label, shared brand moments |
| Bullish green | `#22C55E` | Bullish candles, positive outcomes |
| Bearish red | `#C0392B` | Bearish candles, warnings |
| Cream | `#F5F0E8` | Body text |

**Alpha pattern:**
- `rgba(13,149,136,0.08)` — card background tint
- `rgba(13,149,136,0.20)` — border default
- `rgba(13,149,136,0.40)` — border hover / active

---

## TYPOGRAPHY

Inherits master typography. TCU-specific overrides:

- Step numbers: Bebas Neue `3–5rem`, color `rgba(13,149,136,0.25)` (ghost)
- Lesson titles: Bebas Neue `1.2–1.8rem`, color `#0D9488`
- Kitchen terminology labels: Space Mono `0.55rem`, `letter-spacing: 0.25em`, `text-transform: uppercase`

---

## TCU CURRICULUM STRUCTURE

8 learning steps (the "Recipe"):

| # | Step | Kitchen Metaphor | Route |
|---|------|-----------------|-------|
| 1 | Market Bias | Read the Menu | `/academy/market-bias` |
| 2 | Candle Anatomy | Prep the Ingredients | `/academy/candles` |
| 3 | Wicks & Shadows | Season the Trade | `/academy/wicks` |
| 4 | Structure | Build the Dish | `/academy/market-child` |
| 5 | Liquidity | Find the Heat Source | `/academy/liquidity` |
| 6 | FVGs | Fill the Gap | `/academy/fvgs` |
| 7 | Entry | Plate the Trade | `/academy/entry` |
| 8 | Management | Serve and Adjust | `/academy/management` |

**Additional:** `/academy/risk`, `/academy/sessions`, `/academy/psychology`  
**Total lessons:** 13

---

## CHARACTERS

| Character | Role | Visual |
|-----------|------|--------|
| Chef Goldie | Lead teacher / alter ego | Gold chain, chef hat, glasses |
| Wickie | Wick specialist / trickster | Exaggerated wicks, playful |
| Louie Liquidity | Market mechanic | Blue uniform, wrench |
| Grandma Market | Elder wisdom / patience | Apron, rolling pin |
| Market Child | Student / beginner | Wide eyes, learning posture |

---

## COMPONENT PATTERNS

### Lesson Tile
```
background: var(--deep)
border: 1px solid rgba(13,149,136,0.15)
padding: 28px
header: step number (ghost) + lesson title (teal)
footer: duration pill + difficulty badge
hover: border teal 0.35 + translateY(-2px)
```

### TCU Progress Bar
```
track: rgba(13,149,136,0.15)
fill: #0D9488
height: 3px
label: Space Mono 0.55rem teal
```

### Beehiiv CTA Band (Market Marina variant)
```
background: linear-gradient from teal/08 to transparent
border-top + border-bottom: 1px solid rgba(13,149,136,0.15)
headline: Bebas Neue, "GET TRADING CHEF DROPS."
button: background #0D9488, color var(--black)
```

---

## TRADING TERMINOLOGY GLOSSARY (for copy)

| Term | Definition |
|------|-----------|
| XAUUSD | Gold vs USD — primary market |
| FVG | Fair Value Gap — imbalanced price area |
| Liquidity sweep | Stop-hunt before reversal |
| Market structure | HH/HL/LL/LH pattern sequence |
| NY session | 8AM–5PM EST primary session |
| Kill zones | London open (2AM–5AM EST), NY open (7AM–9AM EST) |
| OTE | Optimal Trade Entry (61.8–79% Fibonacci) |
| PDH/PDL | Previous Day High/Low |
| Bias | Directional expectation (bullish/bearish) |

---

## ANTI-PATTERNS

- No signals, no entry calls, no win rates (education only)
- No real money P&L screenshots
- No guarantees of profit
- No "join and get rich" language
- Bearish candles always `var(--red)`, never green
- No mixing TCU Kitchen metaphors with other district terminologies

---

## SAFETY RULE (PERMANENT)

> This is education, simulation, journaling, and decision training.  
> Do not use fake win rates. Do not promise profits. Do not create signals.  
> Never output signals. Never output win rates. Never encourage gambling.
