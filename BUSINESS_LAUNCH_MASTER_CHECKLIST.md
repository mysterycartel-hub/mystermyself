# MysterMyself — Business Launch Master Checklist

**Brand:** MysterMyself · Scott-King Coast  
**Newsletter:** The Opportunity List  
**Goal:** Subscriber-first → District member → Product customer

---

## Required Today (Before Anything Else)

- [ ] Rotate exposed Beehiiv API key in Beehiiv → Settings → Integrations → API
- [ ] Add new `BEEHIIV_API_KEY` to Vercel Environment Variables (Production)
- [ ] Confirm `BEEHIIV_PUBLICATION_ID` = `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7` in Vercel
- [ ] Log into Beehiiv → Settings → Subscriber Journey → set redirect to `https://www.mystermyself.com/welcome`
- [ ] Test the full subscribe flow: visit `mystermyself.com/join`, subscribe, confirm redirect to `/welcome`

---

## Required This Week

**Beehiiv setup (2–3 hours)**
- [ ] Create tags: `interest_trading_chef`, `interest_route_harbor`, `interest_creator_tools`, `interest_fantasy`, `interest_ai_business`, `interest_food`, `interest_fast_income`, `website_signup`
- [ ] Create subscriber segments (one per tag)
- [ ] Create 5-email welcome automation (see `docs/beehiiv-opportunity-list-setup.md`)
- [ ] Set up referral reward milestones: 1 / 3 / 5 / 10 referrals

**Social bio links (30 min)**
- [ ] Instagram bio → `mystermyself.com/join?source=instagram`
- [ ] TikTok bio → `mystermyself.com/join?source=tiktok`
- [ ] YouTube description → `mystermyself.com/join?source=youtube`
- [ ] Facebook page → `mystermyself.com/join?source=facebook`
- [ ] Pinterest → `mystermyself.com/join?source=pinterest`

**Supabase passport (1–2 hours)**
- [ ] Run the SQL schema from `DEPLOYMENT_MASTER_GUIDE.md` in Supabase SQL Editor
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` to Vercel
- [ ] Set Supabase auth redirect URL to `https://mystermyself.com/passport`
- [ ] Test: sign in at `/auth`, confirm passport dashboard loads

---

## Required Before First Sale

- [ ] Create Stripe account (if not already created) at stripe.com
- [ ] Create "Medical Courier Insider Edge" product in Stripe → set price at $37
- [ ] Copy price ID to Vercel as `STRIPE_PRICE_COURIER_STARTER`
- [ ] Add `STRIPE_SECRET_KEY` to Vercel
- [ ] Uncomment Stripe code in `app/api/checkout/route.ts` (12 lines marked with comments)
- [ ] Test checkout: click buy button on `/products/medical-courier-guide`, confirm Stripe checkout opens
- [ ] Create the actual Medical Courier Guide PDF or digital product to deliver
- [ ] Set up product delivery (Stripe success webhook → email PDF link OR use Beehiiv automation)

**Minimum viable product delivery:**
- Option A: Stripe success URL → Beehiiv automation sends PDF via email
- Option B: Stripe sends customer to a protected page with download link

---

## Required Before First 100 Subscribers

- [ ] Send first Opportunity List drop (use template at `content/newsletter-templates/main-opportunity-list.md`)
- [ ] Post at least one piece of content per platform driving to `/join`
- [ ] Send lane-specific follow-up email to each segment (7 segments)
- [ ] Add at least 3 real affiliate links to `/resources` page (replace placeholder names)
- [ ] Sign up for Amazon Associates at affiliate-program.amazon.com
- [ ] Sign up for TradingView affiliate at tradingview.com/affiliate-program
- [ ] Sign up for Beehiiv referral program for recurring affiliate income
- [ ] Publish at least one Route Harbor drop using `content/newsletter-templates/route-harbor-drop.md`
- [ ] Publish at least one Trading Chef drop using `content/newsletter-templates/trading-chef-drop.md`

---

## Required Before First $1,000

- [ ] Stripe live and Medical Courier Guide selling at $37
- [ ] 3+ real affiliate programs active with real links
- [ ] Beehiiv paid tier enabled at $7/month (Opportunity Vault)
- [ ] 50+ active subscribers receiving weekly drops
- [ ] First referral reward delivered (subscriber referred 1+ person)
- [ ] Weekly cadence: one Opportunity List drop per week, on schedule
- [ ] At least one district-specific drop per month (7 lanes, rotate)

**Math to $1,000:**
- 27 Medical Courier Guide sales at $37 = $999
- OR 143 Vault subscribers at $7/month = $1,001
- OR mix: 10 guide sales + 80 vault subscribers = $370 + $560 = $930

---

## Required Before First $10,000

- [ ] TCU course priced and behind Stripe gate (Levels 4–9 require membership)
- [ ] Opportunity Vault at $7/mo with 100+ paying subscribers = $700/mo recurring
- [ ] Medical Courier Guide driving consistent affiliate + direct sales
- [ ] At least 3 affiliate programs generating monthly commissions
- [ ] Fantasy Island drops during football season (Aug–Jan) monetized via Vault
- [ ] Second product launched (Gold Playbook or AI Operator Guide)
- [ ] Creator Pier affiliate content generating commissions from AI tools
- [ ] 500+ Opportunity List subscribers total
- [ ] Weekly drop sent without interruption for 12+ weeks

**Math to $10,000 (monthly recurring):**
- 500 Vault subscribers × $7 = $3,500/mo
- 50 TCU members × $30 = $1,500/mo
- 50 product sales × $37 = $1,850/mo
- Affiliate commissions = $500–$2,000/mo estimated
- Total: $7,350–$8,850/mo — scale from there

---

## Platform Tasks That Don't Require Claude Code

| Task | Where to do it |
|---|---|
| Add Beehiiv API key | Vercel dashboard → Environment Variables |
| Set post-subscribe redirect | Beehiiv dashboard → Settings → Subscriber Journey |
| Create Beehiiv welcome automation | Beehiiv dashboard → Automations |
| Create Beehiiv tags and segments | Beehiiv dashboard → Subscribers |
| Enable Beehiiv paid tier | Beehiiv dashboard → Monetization |
| Create Stripe products | Stripe dashboard → Products |
| Run Supabase SQL | Supabase dashboard → SQL Editor |
| Set Supabase auth redirect | Supabase dashboard → Authentication → Settings |
| Sign up for affiliate programs | Each platform's affiliate portal |
| Post social bio links | Instagram / TikTok / YouTube apps |
| Write and send newsletter drops | Beehiiv dashboard → New Post |

---

## Tasks That Require Claude Code

| Task | Why |
|---|---|
| Uncomment Stripe in `/api/checkout/route.ts` | Code change required |
| Add real affiliate links to `/resources/page.tsx` | Code change required |
| Build Stripe webhook handler for product delivery | New API route required |
| Add auth gates to TCU lesson pages | Code change required |
| Build Shopify integration | New feature, no code exists yet |
