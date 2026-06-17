# Route Harbor — Design System

**District:** Route Harbor  
**Routes:** `/coast/route-harbor` · `/pages/route-harbor` · `/products/medical-courier-guide`  
**Accent:** `#0EA5E9` (sky blue)  
**Status:** Live · First monetized path

---

## IDENTITY

**District:** Route Harbor — Courier + Logistics income district  
**Sub-brand:** Courier Income Lab (lives inside Route Harbor, not standalone)  
**Flagship product:** Medical Courier Insider Edge — $37 (paid guide, coming soon; free chapter via Beehiiv now)  
**Tagline:** Courier income without depending only on apps.  
**Tone:** Research-grade. Practical. No hype. Real income math.

---

## PATTERN

**Layout:** Resource Hub → Free chapter capture → Paid guide conversion  
**Conversion flow:** Visitor → Free chapter via Beehiiv → Subscriber → Early access to $37 guide → Purchase (Stripe, when live)  
**Section structure on product page:**
1. Hero (free resource hub framing)
2. What's Inside (6 sections)
3. Who This Is For
4. The Route Harbor Method (5 steps)
5. Free Resources CTA + Price card (coming soon)
6. Newsletter band ("Get First Chapter Free")
7. Disclosure footer

---

## COLORS

| Role | Hex | Usage |
|------|-----|-------|
| District accent | `#0EA5E9` | All Route Harbor borders, labels, CTAs, step numbers |
| Background | `#060608` | Page |
| Background secondary | `#0D0D10` | Cards, method steps |
| Gold | `#C9A84C` | MS Crown brand moments only |
| Cream | `#F5F0E8` | Body text |

**Alpha pattern:**
- `rgba(14,165,233,0.08)` — card/section tint
- `rgba(14,165,233,0.15)` — border default
- `rgba(14,165,233,0.25–0.30)` — border hover / card highlight
- `rgba(14,165,233,0.50)` — button outline border

---

## TYPOGRAPHY

Inherits master. Route Harbor overrides:

- Section labels: Space Mono `0.55rem`, color `#0EA5E9`, `letter-spacing: 0.2em`
- Step numbers: Bebas Neue `2rem`, color `rgba(14,165,233,0.25)` (ghost)
- Step labels: Space Mono `0.55rem`, `color: #0EA5E9`, uppercase
- Feature checklist items: Space Mono `0.72rem`, `color: rgba(245,240,232,0.6)`
- Disclosure text: Space Mono `0.62rem`, `color: rgba(245,240,232,0.2)`

---

## COMPONENTS

### Product Hero
```
background: var(--black)
hero-grid overlay active
radial blue glow: rgba(14,165,233,0.08), 800px, centered right
tag pill: background rgba(14,165,233,0.15), border rgba(14,165,233,0.30), color #0EA5E9
h1: Bebas Neue clamp(3.5rem, 8vw, 7.5rem)
subtitle: Space Mono 0.88rem, line-height 1.9
primary CTA: background #0EA5E9, color #060608
secondary CTA: border 1px solid rgba(14,165,233,0.50), color #0EA5E9
```

### What's Inside Grid
```
layout: auto-fit minmax(280px, 1fr), gap 2px
tile: background var(--black), border rgba(14,165,233,0.15)
number: Bebas Neue 2.5rem, color rgba(14,165,233,0.25)
title: Bebas Neue 1.3rem, color #0EA5E9
desc: 0.75rem, color rgba(245,240,232,0.55)
```

### Route Harbor Method Steps
```
layout: column, gap 2px
each row: grid 3-col (number | label | description)
background: var(--black)
border: rgba(14,165,233,0.12)
step label: Space Mono 0.55rem teal + Bebas Neue 1.3rem cream
```

### Price Card
```
background: var(--deep)
border: 1px solid rgba(14,165,233,0.30)
top bar: 2px solid #0EA5E9
price display: Bebas Neue 5.5rem var(--cream) + 2.2rem struck-through
note: "Full guide coming soon. Subscribe free..."
CTA: background #0EA5E9, color #060608
```

### Beehiiv CTA Band (Route Harbor)
```
background: linear-gradient from rgba(14,165,233,0.08) to transparent
border: rgba(14,165,233,0.15)
headline: "GET THE FIRST CHAPTER FREE"
button: background #0EA5E9
```

---

## THE ROUTE HARBOR METHOD (5 Steps)

| # | Step | Label | Description |
|---|------|-------|-------------|
| 1 | Map | Identify Your Market | Every hospital system, reference lab, pharmacy in radius |
| 2 | Research | Find the Decision Maker | Logistics/ops coordinator — not HR |
| 3 | Position | Build Your Pitch | Reliability and availability — what clients care about most |
| 4 | Contact | Make the Ask | Scripts, email templates, call approaches |
| 5 | Land | First Run → First Contract | Lock in repeat business on first run |

---

## CONTENT RULES

- Frame as research and education, not "get rich driving"
- Always show route math honestly — no inflated numbers
- Primary offer is free (Beehiiv chapter); paid guide is secondary
- Every income claim qualified with: "Results vary based on market, effort, and individual circumstances"
- Full disclosure on every page: "As an affiliate, MysterMyself may earn from qualifying purchases"
- State/market compliance note: "Verify licensing and compliance requirements in your specific state"

---

## COURIER INCOME LAB

- Lives INSIDE Route Harbor — not a standalone district or product
- Referenced as "Courier Income Lab inside Route Harbor" — never as a top-level nav item
- `vercel.json` redirect: `/courier-income-lab` → `/coast/route-harbor`

---

## ANTI-PATTERNS

- No "quit your job tomorrow" language
- No inflated income examples (e.g., "$10k/month guaranteed")
- No HIPAA-sensitive details (guide covers basics only)
- Do not list actual client company names as guaranteed opportunities
- Do not promise contract availability in specific cities
