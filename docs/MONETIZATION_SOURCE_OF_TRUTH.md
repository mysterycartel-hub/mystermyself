# MONETIZATION SOURCE OF TRUTH
**MysterMyself — Revenue Architecture and Channel Map**
Last updated: 2026-06-15

---

## TABLE OF CONTENTS

1. [Beehiiv](#beehiiv)
2. [Stripe](#stripe)
3. [Shopify](#shopify)
4. [Affiliate Programs](#affiliate-programs)
5. [Amazon Associates](#amazon-associates)
6. [Impact](#impact)
7. [CJ (Commission Junction)](#cj-commission-junction)
8. [Lead Magnets](#lead-magnets)
9. [Email Funnels](#email-funnels)
10. [Product Ladder](#product-ladder)
11. [Revenue Map](#revenue-map)

---

## BEEHIIV

### Purpose
Primary email newsletter platform. The list is the asset.

### Integration Points
- **Lead capture:** `LeadMagnetForm` component → `POST /api/leads`
- **Current status:** `/api/leads` logs to console — Supabase insert and Beehiiv API call are both commented out
- **Next step:** Wire `POST /api/leads` to Beehiiv Subscribe API

### Beehiiv Subscribe API
```javascript
// To wire: add to app/api/leads/route.ts after Supabase insert
const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email.toLowerCase().trim(),
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: division,
    custom_fields: [{ name: 'Interest', value: interest }],
  }),
})
```

### Env Vars Needed
```
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=...
```

### Newsletter Segments (planned)
| Segment | Content | Cadence |
|---|---|---|
| Trading | XAUUSD setups, TCU curriculum updates, Kitchen alerts | Weekly |
| Courier | Route income, logistics plays, vehicle strategy | Bi-weekly |
| Fantasy | Draft content, rankings, sleeper alerts | Seasonal |
| Food Biz | Breaded Or Not?! ops, pop-up playbooks | Monthly |
| General | Ecosystem updates, free content drops | Monthly |

---

## STRIPE

### Current Status: DISABLED
All Stripe checkout functionality is commented out. The infrastructure exists but does not execute payments.

### Files
| File | Purpose | Status |
|---|---|---|
| `lib/stripe.ts` | Stripe client + price IDs | Exists, client initialized |
| `app/api/checkout/route.ts` | Checkout session creation | Code commented out, returns placeholder |

### Product Map
| Product | Price ID Env Var | Amount |
|---|---|---|
| Gold Playbook | `STRIPE_PRICE_GOLD_PLAYBOOK` | TBD |
| TCU Membership | `STRIPE_PRICE_TCU_MEMBERSHIP` | TBD |
| Courier Starter Pack | `STRIPE_PRICE_COURIER_STARTER` | TBD |
| Food Pop-Up Blueprint | `STRIPE_PRICE_FOOD_POPUP` | TBD |
| Fantasy Draft Bible | `STRIPE_PRICE_FANTASY_DRAFT_BIBLE` | TBD |
| AI Operator Guide | `STRIPE_PRICE_AI_OPERATOR` | TBD |

### How to Enable Stripe
1. Create products in Stripe Dashboard (Products → Add Product)
2. Copy price IDs to Vercel env vars
3. Add to Vercel: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. In `app/api/checkout/route.ts`: uncomment the Stripe checkout session block
5. Set `NEXT_PUBLIC_SITE_URL` for redirect URLs
6. Test with Stripe test mode keys first (`sk_test_...`, `pk_test_...`)

### Webhook Events to Handle
```
checkout.session.completed   → fulfill order, update user access
payment_intent.payment_failed → notify user
customer.subscription.deleted → revoke access
```

### Stripe Dashboard
- Live: `https://dashboard.stripe.com`
- Test mode: toggle in dashboard header

---

## SHOPIFY

### Current Status: Not integrated

### Planned Use
Physical product sales for the Breaded Or Not?! brand and any physical merchandise:
- Merch (branded apparel, hats, accessories)
- Physical cookbook / recipe book
- Spice blends / dry rubs (food product)

### Integration Approach (when ready)
- Shopify storefront embedded via Buy Button or full headless storefront
- Storefront API for product catalog on `/flavor-district` and `/breaded`
- Fulfillment handled by Shopify

### Env Vars Needed (when ready)
```
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
SHOPIFY_STORE_DOMAIN=mystermyself.myshopify.com
```

---

## AFFILIATE PROGRAMS

### Overview
Affiliate revenue supplements product revenue by recommending tools, gear, and services used in each income lane.

### General Rules
- Only recommend products actually used or trusted
- Disclose affiliate relationships (FTC compliance)
- Place affiliate links in context — lesson pages, playbooks, YouTube descriptions
- Never lead with affiliate links; earn trust first with free content

---

## AMAZON ASSOCIATES

### Purpose
Book recommendations, tools, equipment — all income lanes

### Integration Points
| Content | Amazon Category |
|---|---|
| Trading books | Books — Finance/Trading |
| Courier equipment | Tools, GPS devices, insulated bags |
| Food business supplies | Commercial kitchen equipment |
| Fantasy sports books | Books — Sports |
| Tech for creators | Electronics, cameras, microphones |

### Status: Pending Setup
1. Apply at `affiliate-program.amazon.com`
2. Use Associate tag in all product links: `mystermyself-20` (example)
3. Add disclosure text to any page with affiliate links

### High-Value TCU Affiliate Opportunities
- ICT / SMC recommended reading
- Charting platform subscriptions (TradingView Pro)
- Brokers with affiliate programs (verify regulatory compliance by jurisdiction)

---

## IMPACT

### Purpose
Impact is the premium affiliate network for SaaS and fintech brands.

### Status: Pending Setup
1. Apply at `impact.com`
2. Relevant programs: fintech tools, trading platforms, business software

### Target Programs on Impact
| Brand | Relevance |
|---|---|
| TradingView | Market Kitchen embed, chart tools |
| QuickBooks | Business income tracking for all lanes |
| Shopify | Food biz and merch store setup |
| Fiverr | Creator tools content |

---

## CJ (COMMISSION JUNCTION)

### Purpose
CJ (now CJ Affiliate) is the broad affiliate network for retail, finance, and software.

### Status: Pending Setup
1. Apply at `cj.com`
2. Search for programs relevant to each district's income lane

### Target Programs on CJ
| Brand | District | Commission Type |
|---|---|---|
| Office Depot | All | Product commission |
| GoPro | Creator Pier | Hardware commission |
| Intuit TurboTax | Blueprint Bay | Software commission |
| H&R Block | Blueprint Bay | Service commission |

---

## LEAD MAGNETS

### Active
| Lead Magnet | Location | Collects |
|---|---|---|
| Coast Passport (XP) | `/passport` | Email via Supabase Auth |
| LeadMagnetForm | Home page footer | Name, email, interest |

### Planned (not yet built)
| Lead Magnet | District | Format |
|---|---|---|
| TCU Free Level 0 | Market Marina | Free curriculum (already free) |
| Route Math Calculator | Route Harbor | Interactive tool |
| Fantasy Sleeper Sheet | Fantasy Island | PDF download |
| Pop-Up Launch Checklist | Flavor District | PDF download |
| AI Prompt Starter Pack | Creator Pier | PDF / Notion |

### LeadMagnetForm
- **Component:** `components/LeadMagnetForm.tsx`
- **Fields:** Name, Email, Interest (dropdown)
- **API:** `POST /api/leads`
- **Current:** Logs to console (Supabase insert + Beehiiv commented out)
- **Supabase table needed:** `leads(id, name, email, interest, division, source, created_at)`

---

## EMAIL FUNNELS

### Funnel 1: Trading / TCU
```
Entry: Trading content → /market-marina or YouTube
Lead: Email capture at /passport/login (magic link = email confirm)
Day 0: Welcome + Passport activated
Day 1: TCU Level 0 prompt — "Start the kitchen"
Day 3: Candle Kitchen level unlock notification
Day 7: "You're in the top 30%" XP milestone email
Day 14: Crown Method / TCU Membership CTA
Ongoing: Weekly trading content from Beehiiv
```

### Funnel 2: Courier / Logistics
```
Entry: Courier content → /route-harbor
Lead: LeadMagnetForm (interest: logistics)
Day 0: Welcome + Route Math Sheet
Day 3: Medical courier intro content
Day 7: Route acquisition system
Day 14: Courier Starter Pack CTA
```

### Funnel 3: Fantasy
```
Entry: Fantasy content → /fantasy-island
Lead: LeadMagnetForm (interest: fantasy)
Day 0: Welcome + Sleeper Sheet
Day 3: Draft strategy content
Day 7: Fantasy Draft Bible CTA
Ongoing: Seasonal content (draft season, waiver wire)
```

### Platform
All funnels run through **Beehiiv** sequences (Automations feature).

---

## PRODUCT LADDER

### Free Tier (top of funnel)
- Scott-King Coast map and district exploration
- TCU Academy Levels 0–9 (entire curriculum, free forever)
- Coast Passport with XP tracking
- Library Vault free guides
- Flagship YouTube content

### Paid Tier 1 — Playbooks ($27–$97)
Single-purpose execution guides:
- Gold Playbook (XAUUSD trade framework PDF)
- Courier Starter Pack (route acquisition system)
- Fantasy Draft Bible (annual product)
- Food Pop-Up Blueprint (launch checklist + systems)
- AI Operator Guide (Claude + ChatGPT workflow pack)

### Paid Tier 2 — Membership ($97–$297/mo)
Recurring access:
- TCU Membership — Crown Method, live sessions, AI Coach premium
- Community access (Discord or Circle)
- Live trade reviews
- Personalized feedback

### Paid Tier 3 — Premium / High-Ticket ($997+)
1:1 or small group:
- TCU 1:1 mentorship (Trading Chef direct access)
- Done-With-You courier route setup
- Done-For-You content systems (Creator Pier)

### Affiliate (passive)
- Amazon Associates product links
- TradingView affiliate referrals
- Software tool referrals via Impact / CJ

---

## REVENUE MAP

```
SCOTT-KING COAST REVENUE MAP

Market Marina (Gold)
├── Free:     TCU Academy (10 levels, free)
├── Paid:     Gold Playbook ($47)
├── Paid:     TCU Membership ($197/mo)
├── Paid:     Crown Method Access (inside TCU Membership)
├── Affiliate: TradingView Pro referral
└── Affiliate: Trading book recommendations (Amazon)

Route Harbor (Blue)
├── Free:     Courier income content
├── Paid:     Courier Starter Pack ($67)
├── Affiliate: Vehicle/equipment (Amazon)
└── Affiliate: GPS/tracking tools

Fantasy Island (Orange)
├── Free:     Sleeper sheet, rankings
├── Paid:     Fantasy Draft Bible ($27/season)
└── Affiliate: Fantasy sports books (Amazon)

Flavor District (Red)
├── Free:     Pop-up tips, food biz content
├── Paid:     Food Pop-Up Blueprint ($47)
├── Shopify:  Breaded Or Not?! merch (future)
└── Affiliate: Kitchen equipment (Amazon)

Creator Pier (Purple)
├── Free:     AI prompt library, workflow tips
├── Paid:     AI Operator Guide ($67)
└── Affiliate: Creator tools (Impact/CJ)

Blueprint Bay (Green)
├── Free:     Starter frameworks
└── Paid:     Premium playbook bundles

Library Vault (Slate)
└── Free:     All content (top of funnel only)

Cross-District
├── Email:    Beehiiv list (all segments)
└── Passport: XP gamification → retention loop
```
