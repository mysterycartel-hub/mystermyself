# MysterMyself / Scott-King Coast — Master Design System

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion  
**Status:** Live · v1.0  
**Owner:** Maurice Scott · mysterycartel@gmail.com

---

## PATTERN

**Layout:** Hero-Centric + District Grid  
**Conversion:** Subscriber-first. Visitor → Opportunity List → Free Hub → District drops → Paid products.  
**Section order:** Hero → Subscribe band → Coast intro → EcosystemMarquee → DistrictActionGrid → ProductPriority → Social proof → Map → Passport → Footer

---

## STYLE

**Primary:** Dark Mode Luxury Fintech  
**Keywords:** Animated grid overlay · Gold accents · Noise texture · Large Bebas display type · Candlestick SVG decoration · Razor-thin borders · Space Mono mono body  
**Best For:** Wealth-building platforms, trading education, opportunity newsletters  
**Accessibility:** WCAG AA minimum · cursor: none (custom) · prefers-reduced-motion respected via Framer Motion `viewport: once`

---

## COLORS

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Background primary | `var(--black)` | `#060608` | Page background, section backgrounds |
| Background secondary | `var(--deep)` | `#0D0D10` | Cards, alternating sections |
| Gold accent | `var(--gold)` | `#C9A84C` | CTAs, labels, borders, section lines |
| Gold light | `var(--gold-light)` | `#F0C96E` | Button hover state fill |
| Gold dim | `var(--gold-dim)` | `#7A6230` | Scrollbar, subtle accents |
| Red / bearish | `var(--red)` | `#C0392B` | Bearish candles, hero slash, urgency |
| Red bright | `var(--red-bright)` | `#E74C3C` | Hover states on red elements |
| Cream / text | `var(--cream)` | `#F5F0E8` | Body text, headings |

**Alpha usage pattern:**
- `rgba(201,168,76,0.04)` — grid lines
- `rgba(201,168,76,0.12)` — glow radial
- `rgba(201,168,76,0.15)` — border default
- `rgba(201,168,76,0.25)` — border hover
- `rgba(245,240,232,0.25–0.65)` — body text opacity scale

---

## TYPOGRAPHY

**Display:** `'Bebas Neue', sans-serif`  
- font-size: `clamp(3rem, 6vw, 5.5rem)` (section titles)  
- font-size: `clamp(4rem, 10vw, 9rem)` (hero h1)  
- line-height: `0.92–0.95`  
- letter-spacing: `0.02em`

**Body/Mono:** `'Space Mono', monospace`  
- Labels: `0.55–0.65rem` · `letter-spacing: 0.2–0.3em` · `text-transform: uppercase`  
- Body copy: `0.75–0.88rem` · `line-height: 1.7–1.9`

**Secondary display:** `'Playfair Display', serif` (available, used sparingly for elegance moments)  
**Fallback:** `'Inter', sans-serif`

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

---

## SPACING SCALE

```
Section padding:  clamp(64px, 10vw, 120px) vertical · clamp(20px, 5vw, 80px) horizontal
Card padding:     clamp(24px, 3vw, 32px)
Gap (grid):       2px (flush tile layout) or clamp(32px, 5vw, 64px) (breathable layout)
Section label mb: 20–48px
Heading mb:       24–32px
Body copy mb:     16–36px
CTA gap:          12–16px
```

---

## COMPONENTS

### `.btn-primary`
```css
background: var(--gold);
color: var(--black);
padding: 18px 40px;
font-family: 'Space Mono', monospace;
font-size: 0.75rem; font-weight: 700;
letter-spacing: 0.15em; text-transform: uppercase;
/* Hover: gold-light slides in from left (::after pseudo) */
/* Hover: translateY(-2px) */
```

### `.btn-secondary`
```css
border: 1px solid rgba(201,168,76,0.4);
color: var(--gold);
padding: 18px 40px;
/* Same font as btn-primary */
/* Hover: border-color 1.0 opacity, color #fff */
```

### `.section-label`
```
line + uppercase monospace text in gold
line: 32px × 1px, background: var(--gold)
text: 0.6rem, letter-spacing 0.3em
```

### `.hero-grid`
```css
/* Animated gold grid — 80px tiles, 20s infinite pan */
background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
background-size: 80px 80px;
animation: gridShift 20s linear infinite;
```

### `.hero-glow`
```css
/* 800px radial gold glow, 4s pulse animation */
background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
```

### `.hero-slash`
```css
/* Red vertical 2px line, right: 18%, 0.4 opacity */
background: linear-gradient(to bottom, transparent, var(--red) 30%, var(--red) 70%, transparent);
```

### Cards (District / Product)
```css
background: var(--deep or --black alternating);
border: 1px solid rgba(201,168,76,0.15);
padding: clamp(24px, 3vw, 32px);
/* Top accent bar on featured cards: 2px solid var(--gold) */
/* gap: 2px for flush tile grid */
```

---

## EFFECTS & ANIMATIONS

| Effect | Implementation |
|--------|---------------|
| Scroll reveal | Framer Motion `whileInView` · `viewport: { once: true }` · `initial: { opacity:0, y:24 }` |
| Stagger | `delay: (i % 3) * 0.07` on grid children |
| Noise texture | SVG feTurbulence `baseFrequency: 0.9` · `opacity: 0.35` on `body::before` |
| Grid animation | `gridShift` — 80px translate in 20s |
| Glow pulse | Scale 1→1.15 over 4s |
| Custom cursor | `cursor: none` on body — custom cursor component |
| Button hover | `::after` pseudo-element slide + `translateY(-2px)` |

---

## DISTRICT COLOR SYSTEM

Each district has a unique accent color used for borders, labels, and CTAs within its section:

| District | Hex |
|----------|-----|
| Founder Island | `#6B21A8` (purple) |
| Route Harbor | `#0EA5E9` (sky blue) |
| Market Marina (TCU) | `#0D9488` (teal) |
| Fantasy Island | `#22C55E` (green) |
| Creator Pier | `#A855F7` (violet) |
| Flavor District | `#F97316` (orange) |
| Legacy Point | `#C9A84C` (gold) |
| Library Vault | `#6366F1` (indigo) |
| Blueprint Bay | `rgba(245,240,232,0.25)` (disabled) |

---

## ANTI-PATTERNS

- No bright white backgrounds
- No rounded buttons (sharp corners only — `border-radius: 0`)
- No sans-serif body text (Space Mono only for brand sections)
- No emojis as icons in UI components (inline text use is okay)
- No fake profit claims, win rates, or trading signals
- No Tailwind `rounded-*` on primary cards (flush grid aesthetic)
- No warm/pastel color palettes
- No animations without `viewport: { once: true }` (avoid re-triggering)

---

## PRE-DELIVERY CHECKLIST

- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] All Beehiiv CTAs point to `NEXT_PUBLIC_BEEHIIV_SIGNUP_URL`
- [ ] All publication links point to `NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL`
- [ ] No `href="#"` without a real anchor
- [ ] No dead internal routes (run `npm run build` — 0 errors)
- [ ] Section anchors present: `#start-here`, `#subscribe`, `#districts`, `#featured-opportunity`
- [ ] Affiliate disclosure visible in footer
- [ ] `cursor: none` preserved on body (custom cursor active)
- [ ] Framer Motion animations use `viewport: { once: true }`
- [ ] Responsive: 375px, 768px, 1024px, 1440px — use `clamp()` not fixed breakpoints
- [ ] Educational content only — no signals, no win rates, no profit promises

---

## ROUTES REFERENCE

| Path | Purpose |
|------|---------|
| `/` | Homepage — full Scott-King Coast experience |
| `/coast/[district]` | District pages (dynamic, 9 districts) |
| `/pages/[district]` | District landing pages with DistrictPage component |
| `/products/medical-courier-guide` | Route Harbor product page |
| `/opportunity-list` | Beehiiv newsletter subscribe page |
| `/follow-the-coast` | Post-signup follow page with all channels |
| `/academy/[lesson]` | TCU lesson pages |
| `/trading-chef-university` | TCU home |
| `/about` | About + legal (disclaimer, privacy, terms, refund) |
