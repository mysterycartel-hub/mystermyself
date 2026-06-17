# Fantasy Island — Design System

**District:** Fantasy Island  
**Routes:** `/coast/fantasy-island` · `/pages/fantasy-island`  
**Accent:** `#22C55E` (green)  
**Status:** Live (content hub) · Drops via Beehiiv · Full product TBD

---

## IDENTITY

**District:** Fantasy Island — Game destination + Live automation district  
**Full definition:** Fantasy football live-update automation district covering Draft Bible, rankings, injury alerts, subscriber segments, Beehiiv drops, XP, rewards, unlocks, and TCU/trading simulation bridge.  
**Tone:** Real-time. Competitive intelligence. Subscriber advantage. Seasonal urgency.  
**Audience:** Fantasy football players who want an edge — dynasty, redraft, DFS.

---

## PATTERN

**Layout:** Live-update hub with subscribe-to-unlock model  
**Conversion flow:** Visitor → Subscribe for live drops → Seasonal product unlocks (Draft Bible, rankings exports)  
**Section structure on district page:**
1. District hero (green accent, game destination framing)
2. What You Get (live updates, alerts, drops)
3. Fantasy Draft Bible preview
4. Subscriber segments (draft, dynasty, DFS, seasonal)
5. Beehiiv CTA band (green)
6. XP and rewards teaser (coming)

---

## COLORS

| Role | Hex | Usage |
|------|-----|-------|
| District accent | `#22C55E` | All Fantasy Island borders, labels, CTAs |
| Background | `#060608` | Page |
| Background secondary | `#0D0D10` | Cards |
| Gold | `#C9A84C` | MS Crown moments, reward badges |
| Alert amber | `#F59E0B` | Injury alerts, breaking news labels |
| Cream | `#F5F0E8` | Body text |

**Alpha pattern:**
- `rgba(34,197,94,0.08)` — section tint
- `rgba(34,197,94,0.15)` — border default
- `rgba(34,197,94,0.25–0.40)` — border hover
- `rgba(245,158,11,0.15)` — injury alert background

---

## TYPOGRAPHY

Inherits master. Fantasy Island overrides:

- Live update labels: Space Mono `0.55rem`, color `#22C55E`, `letter-spacing: 0.25em`, uppercase
- Alert labels: Space Mono `0.55rem`, color `#F59E0B`, uppercase
- Player name display: Bebas Neue `1.4–1.8rem`, color `var(--cream)`
- Rankings numbers: Bebas Neue `2.5–4rem`, color `rgba(34,197,94,0.25)` (ghost rank) + `#22C55E` (active)
- Subscriber tier labels: Space Mono `0.58rem`, background `rgba(34,197,94,0.12)`, border green

---

## COMPONENTS

### Live Update Feed Tile
```
background: var(--deep)
border-left: 3px solid #22C55E  (or #F59E0B for alerts)
padding: 16px 20px
label: "LIVE DROP" or "INJURY ALERT" in green/amber monospace
timestamp: Space Mono 0.55rem, rgba(245,240,232,0.35)
player name: Bebas Neue 1.4rem
update text: 0.75rem Space Mono, rgba(245,240,232,0.65)
```

### Rankings Card
```
background: var(--black)
border: 1px solid rgba(34,197,94,0.15)
rank number: Bebas Neue 3rem, rgba(34,197,94,0.2)
player: Bebas Neue 1.5rem, var(--cream)
position badge: Space Mono 0.55rem, background rgba(34,197,94,0.12), color #22C55E
trend arrow: ▲ green | ▼ red
```

### Draft Bible Preview Card
```
background: var(--deep)
border: 1px solid rgba(34,197,94,0.25)
top bar: 2px solid #22C55E
badge: "FANTASY DRAFT BIBLE" in green mono
teaser content visible
CTA: "Get Access via Newsletter" → SIGNUP
```

### Subscriber Segment Badge
```
draft tier: background rgba(34,197,94,0.12), border green
dynasty tier: background rgba(14,165,233,0.10), border blue
DFS tier: background rgba(245,158,11,0.10), border amber
seasonal: background rgba(201,168,76,0.10), border gold
```

### Beehiiv CTA Band (Fantasy Island)
```
background: linear-gradient from rgba(34,197,94,0.08) to transparent
border: rgba(34,197,94,0.15)
headline: "GET LIVE FANTASY ISLAND DROPS."
sub: "Draft updates, rankings, injury alerts, and seasonal plays — sent free."
button: background #22C55E, color #060608
```

---

## CONTENT STRUCTURE

### Fantasy Draft Bible
- Pre-draft positional rankings
- Tier breakdowns (QB, RB, WR, TE, K, DEF)
- ADP vs value gaps
- Sleeper and bust profiles
- Dynasty-specific guidance
- Delivered via: Beehiiv drops + future PDF product

### Live Update Automation (future)
- Player news scraped and formatted for subscribers
- Injury alerts with fantasy impact ratings
- Weekly start/sit drops
- Waiver wire targets
- Segment routing: dynasty vs. redraft vs. DFS subscribers

### XP + Rewards System (future, TCU bridge)
- Earn XP for opening drops, clicking through, making picks
- Levels unlock early access to rankings
- TCU simulation: trade decisions mapped to trading structure concepts

---

## SEASONAL CALENDAR

| Period | District Activity |
|--------|-----------------|
| Pre-draft (Jun–Aug) | Draft Bible drops, ADP tracking, rookie reports |
| Draft season (Aug–Sep) | Live rankings, draft alerts, subscriber segments launch |
| In-season (Sep–Jan) | Weekly drops, start/sit, waiver alerts, trade targets |
| Off-season (Feb–May) | Dynasty content, NFL draft coverage, tool builds |

---

## ANTI-PATTERNS

- No gambling language ("bet this player scores 3 TDs")
- No DFS entry fee recommendations
- No lock/parlay language
- Rankings are projections, not guarantees — always disclaim
- Do not imply Beehiiv drops will fire in real-time before automation is live
- Blueprint Bay (automation engine) must be built before advertising real-time alerts
