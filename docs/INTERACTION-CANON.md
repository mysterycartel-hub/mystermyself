# Interaction Canon — Character Introduction Flow

**Purpose:** Define how TCU characters are introduced across the site.  
**Last Updated:** 2026-06-25

---

## Character Introduction Sequence

Characters are introduced progressively — not all at once.

### Level 1: Strip (Light Touch)

**Component:** `TCUCharacterCanonStrip`  
**Where:** Homepage, /opportunity-list, /coast/market-marina

- Shows all 9 (or subset) as small cards
- Tap/click reveals: role + market lesson + chef metaphor
- No commitment required — just browse
- Purpose: awareness, curiosity

### Level 2: Spotlight (Deep Dive)

**Component:** `TradingChefSpotlight`  
**Where:** Homepage, /market-marina

- Full Road Map (8 steps, interactive)
- Chef Lingo Decoder (14 terms)
- Golden Rule
- Trading Chef hero visual
- Purpose: education, system understanding

### Level 3: Coach Cards (Relationship)

**Component:** `CharacterCoachCards`  
**Where:** /market-marina

- 3 featured coaches rotate (Candle Kid, Wickie, Louie)
- Each has: avatar, role, 3 lessons, quote, CTA
- Pauses on hover — signals depth
- Purpose: personal connection, "learn from" framing

---

## Lane-Specific Behavior

### /opportunity-list

When user selects **trading lane** (`interest_trading_chef`):
- Form preview shows Trading Chef context
- Submit button says "Enter the Kitchen →"
- Tags user with `interest_trading_chef` in Beehiiv

### /welcome

When URL param `lane=interest_trading_chef` or `lane=trading`:
- TCU welcome block appears above district grid
- Shows: Trading Chef avatar, 3 next steps, compact character strip
- CTA: "Go to Market Marina →"

### /dashboard

When localStorage `skc_join_lane === 'interest_trading_chef'`:
- "Trading Chef Next Step" widget appears
- Shows Road Map progress (static default: Step 1)
- CTA: "Today's Kitchen →" → /market-marina
- Future: dynamic step based on passport mission progress

---

## Character Routing Rules

| User Action | What Happens |
|---|---|
| Lands on homepage | Sees TradingChefSpotlight + full strip |
| Clicks "Enter the Kitchen" | Goes to /market-marina |
| Signs up with trading lane | Welcome shows TCU 3-step + coaches |
| Returns to dashboard | TCU widget appears with next step |
| Visits /market-marina | Full kitchen experience (spotlight + strip + coaches) |

---

## What Characters Do NOT Do

- Characters never appear as pop-ups or interrupts
- Characters never speak in first person on non-Market-Marina pages
- Characters never replace the product/pricing UI
- Characters never appear on legal pages (terms, privacy, refund)
- Characters are educational — they teach concepts, not sell products
- No character has a "personality quiz" or social media account

---

## Future Expansion (Not Built Yet)

- Character-specific lesson pages (`/academy/[character]`)
- Character rotation on dashboard based on day of week
- "Your Coach Today" dynamic selection
- Character unlockables in passport system
- Voice clips / audio lessons per character
