# Visual Canon — MysterMyself / Scott-King Coast

**Public Brand:** MysterMyself / Scott-King Coast  
**Public Handle:** @mystermyself  
**Internal Only:** MysteryCartel (never on public-facing UI)  
**Last Updated:** 2026-06-25

---

## Color System

| Token | Hex | Usage |
|---|---|---|
| `--black` | `#060608` | Primary background |
| `--deep` | `#0d0d10` | Card/section background |
| `--gold` | `#c9a84c` | Primary accent, CTAs, highlights |
| `--gold-light` | `#f0c96e` | Hover states, emphasis |
| `--gold-dim` | `#7a6230` | Subtle borders, muted gold |
| `--red` | `#c0392b` | Bearish candles, warnings |
| `--red-bright` | `#e74c3c` | Error states |
| `--cream` | `#f5f0e8` | Primary text |

### District Colors

| District | Color | Hex |
|---|---|---|
| Market Marina | Teal | `#0D9488` |
| Route Harbor | Sky Blue | `#0EA5E9` |
| Flavor District | Fire Orange | `#F97316` |
| Blueprint Bay | Indigo | `#6366F1` |
| Creator Pier | Purple | `#A855F7` |
| Fantasy Island | Green | `#22C55E` |
| Legacy Point | Pink | `#EC4899` |
| Library Vault | Gold | `#c9a84c` |

---

## Typography

| Font | Usage | Weight |
|---|---|---|
| **Bebas Neue** | Display headings, large numbers, character names | 400 |
| **Space Mono** | Labels, tags, data, code-style text | 400, 700 |
| **Inter** | Body copy (when needed for long-form) | 300–700 |

### Sizing Rules

- Section titles: `clamp(3rem, 6vw, 5.5rem)` in Bebas Neue
- Section labels: `0.6rem` Space Mono, `0.3em` letter-spacing, uppercase
- Body text: `0.82rem` Inter or system font
- Data/meta: `0.5–0.55rem` Space Mono, uppercase

---

## Style Direction

**Premium urban trading kitchen.** Not generic SaaS. Not plain finance. Not kids-only cartoon.

### The Feel

- Dark, moody, confident
- Gold accents feel earned, not decorative
- Noise texture overlay (subtle grain)
- Grid backgrounds suggest structure/precision
- Animations are smooth, never bouncy or playful
- Custom cursor (crosshair/dot) — no default pointer

### What It Is NOT

- Not Bloomberg terminal (too corporate)
- Not Robinhood (too gamified/simple)
- Not crypto bro culture (no lambo imagery)
- Not generic educational platform (no stock photos)
- Not children's cartoon (characters are educational tools, not mascots)

---

## Character Art Direction

### Trading Chef (Lead)

- Confident Black male chef-trader
- Chef hat (white/gold)
- White apron over dark clothing
- Gold chain visible
- Glasses
- Urban cartoon style — NOT anime, NOT realistic
- Warm smile or focused expression
- Black and gold color base

### All Characters

- Urban cartoon style (consistent across all 9)
- Transparent background PNG
- Color palette matches their assigned accent color
- Expressive but not over-the-top
- Educational energy — they teach, not entertain
- Tools referenced: Leonard AI, RenderNet/Affogato, Dzine AI

### Dimensions

- Avatar: min 200x200, square, transparent bg
- Hero: min 800x600, transparent bg preferred
- Card: 400x400 works well for strips

---

## Component Patterns

### Cards

- Background: `var(--deep)` or `var(--black)`
- Border: `1px solid rgba(201,168,76,0.08)` (default), character color on active
- Padding: `clamp(24px, 3vw, 32px)`
- Hover: lift -6px + glow border + radial gradient overlay

### Sections

- Padding: `clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)`
- Section label: line + text (`section-label` class)
- Section title: Bebas Neue + gold accent word
- Separator: `1px solid rgba(201,168,76,0.08)`

### Buttons

- Primary: gold background, black text, Space Mono uppercase
- Secondary: gold border, gold text, transparent background
- Hover: scale 1.03 + boxShadow glow
- Tap: scale 0.97

### Motion

- Library: Framer Motion (already installed)
- Entry: `initial={{ opacity: 0, y: 24 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Viewport gate: `{ once: true }` (animate only first time in view)
- Hover: spring physics (`stiffness: 300, damping: 20`)
- Never: bounce, wiggle, or playful motion
