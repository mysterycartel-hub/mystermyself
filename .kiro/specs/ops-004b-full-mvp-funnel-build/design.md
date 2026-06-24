# OPS/004B–F: Full MVP Funnel Build — Design

## Architecture

```
Visitor Lands
    │
    ▼
┌─────────────────────────────────────────────┐
│  Entry Points                                │
│  /, /coast, /market-marina, /follow-the-coast│
│  /pricing, /about, brand pages               │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Capture Layer                               │
│  OpportunitySignup (full form)               │
│  LeadMagnetForm (contextual on 8+ pages)     │
│  SubscribeBox (minimal CTA → /opportunity-list)│
│                                              │
│  All route through:                          │
│    lib/capture.ts → /api/newsletter/subscribe│
│      → Beehiiv (primary, tagged)             │
│      → Supabase (backup, non-blocking)       │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Welcome / Routing Layer                     │
│  /welcome — personalized by lane             │
│  Shows: district grid, social buttons        │
│  Stores: lane in localStorage               │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  District Layer (8 districts)                │
│  /coast/[district] — dynamic pages           │
│  Each has: purpose, audience, offer, CTA     │
│  CTAs → Opportunity List, product, resource  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Product / Resource Layer                    │
│  /pricing — tier overview                    │
│  /products/* — individual products           │
│  /free-content, /resources — free access     │
│  Coming Soon clearly labeled                 │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Return Path                                 │
│  /dashboard — progress, XP, next steps       │
│  /passport — stamp collection                │
│  localStorage tracks: lane, source, XP       │
│  Supabase tracks: auth users (optional)      │
└─────────────────────────────────────────────┘
```

## Key Technical Decisions

### Capture Strategy
- **Primary**: Beehiiv API v2 (tags, custom fields, UTM tracking)
- **Backup**: Supabase `leads` table (non-blocking upsert)
- **Shared logic**: `lib/capture.ts` — single entry point for all forms
- **Fallback**: If env vars missing → log locally, don't block user

### State Management
- **Lane choice**: localStorage (`skc_join_lane`) + URL param
- **Source tracking**: localStorage (`skc_join_source`)
- **XP/Progress**: localStorage via `lib/xp-reward-engine.ts`
- **Auth state**: Supabase client (optional, graceful without)

### Design System (Locked)
- Background: `var(--black)` = #060608
- Accent: `var(--gold)` = #C9A84C
- Text: `var(--cream)` = #F5F0E8
- Display font: Bebas Neue
- Data font: Space Mono

### Integration Dependencies
| Service | Required | Fallback |
|---------|----------|----------|
| Beehiiv API | Env vars in Vercel | Log + return success |
| Supabase | Env vars in Vercel | Skip backup write |
| Stripe | Not active yet | CTAs show "Coming Soon" |
| OpenAI/Anthropic | NOT required | AI Coach disabled |

## File Map

| File | Purpose |
|------|---------|
| `lib/capture.ts` | Shared capture logic |
| `lib/social-links.ts` | Social URL registry |
| `lib/districts.ts` | District data |
| `lib/stripe.ts` | Lazy Stripe client |
| `lib/supabase.ts` | Lazy Supabase client |
| `components/OpportunitySignup.tsx` | Full capture form |
| `components/LeadMagnetForm.tsx` | Contextual capture |
| `components/SubscribeBox.tsx` | Minimal CTA link |
| `app/opportunity-list/page.tsx` | Main capture page |
| `app/welcome/page.tsx` | Post-signup routing |
| `app/coast/[district]/page.tsx` | District pages |
| `app/pricing/page.tsx` | Product tiers |
| `app/dashboard/page.tsx` | Return path |
| `data/canon/scott-king-coast.json` | Canon source of truth |
| `data/ops/funnel-map.json` | Funnel definitions |
