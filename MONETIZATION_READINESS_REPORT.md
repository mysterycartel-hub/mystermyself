# MysterMyself — Monetization Readiness Report

**Date:** 2026-06-17  
**Status:** Pre-revenue. Subscriber intake live. Payment infrastructure stubbed.

---

## Revenue Stream Inventory

### 1. Beehiiv Newsletter — The Opportunity List

| Item | Status |
|---|---|
| Publication created | ✅ Live |
| Subscribe URL active | ✅ `maurices-newsletter-b7274b.beehiiv.com/subscribe` |
| Publication ID | ✅ `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7` |
| API integration | ✅ Built (`/api/newsletter/subscribe`) |
| Lane tagging | ✅ Built (7 lanes auto-tagged) |
| Welcome automation | ❌ Not yet created in Beehiiv dashboard |
| Post-subscribe redirect to `/welcome` | ❌ Must be set in Beehiiv dashboard |
| Paid tier (Opportunity Vault) | ❌ Not yet enabled in Beehiiv |
| Free tier earnings | $0 until paid tier activates |
| Referral rewards | ❌ Not yet configured in Beehiiv |

**Revenue potential:** Beehiiv paid subscriptions ($7/mo or $49/yr) once Opportunity Vault goes live.  
**Blocker:** Beehiiv paid tier not enabled. Content for Vault not yet assembled.

---

### 2. Stripe — Direct Product Sales

| Item | Status |
|---|---|
| Stripe account | Unknown — needs login confirmation |
| `STRIPE_SECRET_KEY` | ❌ Not set in Vercel |
| Checkout route (`/api/checkout`) | ✅ Built but commented out |
| Product price IDs | ❌ Not created in Stripe |
| Webhook handler | ❌ Not built |
| Products planned | 6 (see below) |

**Planned Products:**
| Product | Price | Status |
|---|---|---|
| Medical Courier Insider Edge | $37 | Page built, Stripe not active |
| TCU Membership | TBD | Page built, Stripe not active |
| Gold Playbook | TBD | Not yet built |
| Food Pop-Up Blueprint | TBD | Not yet built |
| Fantasy Draft Bible | TBD | Not yet built |
| AI Operator Guide | TBD | Not yet built |

**To activate Stripe:**
1. Log into Stripe, create each product with a price
2. Copy price IDs into Vercel env vars
3. Uncomment 12 lines in `app/api/checkout/route.ts`
4. Add webhook route for fulfillment

---

### 3. Shopify — Physical / Branded Products

| Item | Status |
|---|---|
| Shopify store | Unknown — not referenced in codebase |
| Integration | ❌ Not built |
| Products | None |

**Note:** Shopify MCP tools are available in this environment. No Shopify store has been created or linked to the codebase. This is a future revenue lane, not a current one.

---

### 4. Affiliate Revenue (Amazon Associates / Impact / CJ)

| Item | Status |
|---|---|
| Resource Vault page (`/resources`) | ✅ Built |
| Affiliate disclosures | ✅ Present on relevant pages |
| Amazon Associates account | Unknown — needs confirmation |
| Impact.com account | Unknown |
| CJ account | Unknown |
| Affiliate links installed | ❌ All links are placeholders |

**To activate:** Sign up for each program, replace placeholder product names with real affiliate links in `app/resources/page.tsx`.

---

### 5. Trading Chef University — Course Revenue

| Item | Status |
|---|---|
| TCU page (`/trading-chef-university`) | ✅ Built |
| Academy lessons (`/academy/[lesson]`) | ✅ Built (14 lessons) |
| Kitchen OS (`/kitchen`) | ✅ Built with live chart embed |
| Kitchen Rush (`/kitchen-rush`) | ✅ Built |
| Passport + XP system | ✅ Built |
| Character trigger system | ✅ Built (Melissa, Melody, Burn Alarm) |
| Stripe payment gate | ❌ Not active |
| Member-only content gate | ❌ No auth gate on lessons |

**Current state:** Full TCU platform is free to access. Revenue gate (Stripe) is not active.  
**To monetize:** Activate Stripe, add `LevelGate` auth check to lesson pages above Level 3.

---

## Launch Order (Revenue Priority)

**Phase 1 — Free subscriber base (do this first)**
1. Set Beehiiv post-subscribe redirect to `/welcome`
2. Create welcome automation in Beehiiv (5-email sequence)
3. Add API key to Vercel so `/api/newsletter/subscribe` fires live
4. Start posting to social with `/join?source=platform` links
5. Collect 100 subscribers before turning on any paid tier

**Phase 2 — First revenue ($7–$37 products)**
1. Activate Stripe — create Medical Courier Insider Edge as first product ($37)
2. Uncomment checkout route
3. Route Medical Courier Guide CTA to Stripe instead of Beehiiv
4. Activate Beehiiv paid tier — Opportunity Vault ($7/mo)
5. Sign up for Amazon Associates and TradingView affiliate programs
6. Replace placeholder links in `/resources` with real affiliate links

**Phase 3 — Course revenue (TCU gate)**
1. Create TCU Membership in Stripe ($pricing TBD)
2. Add auth gate to lessons above Level 3
3. Market via Opportunity List drops to existing subscribers

**Phase 4 — Scale**
1. Shopify store for branded merchandise
2. Impact.com and CJ affiliate programs
3. Opportunity Vault referral program live in Beehiiv

---

## Revenue Blockers (Exact)

1. **`BEEHIIV_API_KEY` not confirmed in Vercel** — subscribers may not be saving to Beehiiv
2. **Beehiiv post-subscribe redirect not set** — users don't reach `/welcome` after signup
3. **Beehiiv paid tier not enabled** — Opportunity Vault has no way to charge
4. **`STRIPE_SECRET_KEY` not in Vercel** — zero ability to process payments
5. **No Stripe products created** — no price IDs to charge
6. **`/api/checkout/route.ts` is commented out** — Stripe checkout will return null even with keys
7. **Affiliate links are placeholders** — `/resources` generates no commission
8. **No content assembled for Opportunity Vault** — can't sell access to empty content

---

## Recovery Instructions

**If Beehiiv stops receiving subscribers:**
- Check Vercel → Environment Variables for `BEEHIIV_API_KEY`
- Test: `curl -X POST https://mystermyself.com/api/newsletter/subscribe -H "Content-Type: application/json" -d '{"email":"test@test.com"}'`
- Expected: `{"ok":true,"id":"..."}` (with real key) or `{"ok":true,"dev":true}` (key missing)

**If Stripe payments fail:**
- Check `STRIPE_SECRET_KEY` in Vercel
- Check `STRIPE_PRICE_*` vars match real Stripe price IDs
- Uncomment checkout code in `app/api/checkout/route.ts`

**If TCU XP stops saving:**
- XP is localStorage-based for the Academy/Kitchen
- Passport XP requires Supabase to be configured
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
