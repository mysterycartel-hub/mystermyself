# MysterMyself — Owner Return Guide

**Written for:** Maurice Scott  
**Purpose:** You've been away. Here is everything, exactly as it is.

---

## What Exists

### The Website
`mystermyself.com` is a fully built Next.js web application with 88+ routes, deployed on Vercel, connected to GitHub. It auto-deploys whenever code is pushed to the `main` branch.

### The Brand
- **Parent brand:** MysterMyself
- **World:** Scott-King Coast
- **9 Districts:** Founder Island, Market Marina, Route Harbor, Fantasy Island, Creator Pier, Flavor District, Legacy Point, Library Vault, Blueprint Bay

### The Newsletter
**The Opportunity List** — lives on Beehiiv at `maurices-newsletter-b7274b.beehiiv.com`  
Publication ID: `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`

---

## What Works Right Now

### Fully functional (no keys needed)
- All 88 website routes load and render
- Homepage, district pages, all navigation
- `/opportunity-list` — full subscriber page with lane selector
- `/join` — smart redirect to Beehiiv with UTM tracking + return path
- `/welcome` — post-subscribe landing page
- `/academy` and all 14 TCU lessons
- `/kitchen` — Market Kitchen with live TradingView chart embed, pair selector, timeframe selector, AI Coach, Bias Panel, Mayhem Watch, Character Trigger System
- `/kitchen-rush` — timed scenario training
- `/passport` — Passport page (shows login prompt if Supabase not configured)
- `/missions`, `/dashboard`, `/districts`, `/pricing`, `/auth`, `/library`, `/resources`
- XP system, badge system, progression system (localStorage-based for Academy)
- Character trigger system (Melissa, Melody, Burn Alarm) — fires from text analysis

### Requires env vars to activate
| Feature | Env var needed |
|---|---|
| Beehiiv subscriber API | `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID` |
| Passport + XP save to cloud | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` |
| AI Coach in Kitchen | `ANTHROPIC_API_KEY` |
| Stripe payments | `STRIPE_SECRET_KEY` + price IDs |

---

## What Is Live and Earning Money

**Currently: $0 in automated revenue.**

The platform is built. The intake system works. No payment processor is active.

What's closest to revenue:
1. Beehiiv newsletter — set up paid tier ($7/mo) and it starts earning
2. Affiliate links on `/resources` — sign up for Amazon Associates, TradingView, etc.
3. Medical Courier Guide page — add Stripe and it can sell at $37

---

## What Still Needs Work

### To launch the newsletter as paid (est. 2–4 hours)
1. In Beehiiv dashboard: set post-subscribe redirect to `https://www.mystermyself.com/welcome`
2. In Beehiiv dashboard: create the 5-email welcome automation (see `docs/beehiiv-opportunity-list-setup.md`)
3. In Beehiiv dashboard: enable paid tier — Opportunity Vault — $7/month or $49/year
4. In Vercel: confirm `BEEHIIV_API_KEY` is set correctly

### To launch Stripe payments (est. 1–2 hours)
1. Create Medical Courier Insider Edge product in Stripe at $37
2. Copy the price ID to Vercel as `STRIPE_PRICE_COURIER_STARTER`
3. Uncomment 12 lines in `app/api/checkout/route.ts`
4. Add `STRIPE_SECRET_KEY` to Vercel

### To launch Passport to cloud (est. 1–2 hours)
1. Add Supabase env vars to Vercel
2. Run the SQL from `DEPLOYMENT_MASTER_GUIDE.md` in Supabase SQL Editor
3. Configure Supabase auth redirect URL to `https://mystermyself.com/passport`

### To activate affiliate revenue (est. 30 min)
1. Sign up for Amazon Associates at affiliate-program.amazon.com
2. Sign up for TradingView affiliate at tradingview.com/affiliate-program
3. Sign up for Beehiiv referral at beehiiv.com/affiliates
4. Replace placeholder names in `app/resources/page.tsx` with real links

---

## Where Everything Is

### Code
```
GitHub: https://github.com/mysterycartel-hub/mystermyself
Main branch: main
```

### Deployed site
```
Vercel: vercel.com (log in with mysterycartel@gmail.com)
Live URL: https://mystermyself.com
```

### Newsletter
```
Beehiiv: app.beehiiv.com (log in with mysterycartel@gmail.com)
Publication: The Opportunity List
```

### Database
```
Supabase: supabase.com (log in with mysterycartel@gmail.com)
Tables needed: see DEPLOYMENT_MASTER_GUIDE.md
```

### Key files in the repo

| File | Purpose |
|---|---|
| `DEPLOYMENT_MASTER_GUIDE.md` | Complete setup: Vercel, Supabase SQL, Beehiiv, Stripe |
| `MONETIZATION_READINESS_REPORT.md` | Revenue status, blockers, launch order |
| `OWNER_RETURN_GUIDE.md` | This file |
| `BUSINESS_LAUNCH_MASTER_CHECKLIST.md` | Day-by-day task list to first revenue |
| `docs/beehiiv-opportunity-list-setup.md` | Beehiiv tag, segment, automation setup |
| `.env.local.example` | All env vars listed with descriptions |
| `lib/xp-reward-engine.ts` | XP, rank, badge logic |
| `lib/mission-engine.ts` | Lesson → Mission → XP → Badge orchestration |
| `lib/passport-db.ts` | Supabase passport read/write functions |
| `lib/character-trigger-engine.ts` | Melissa, Melody, Burn Alarm behavioral systems |
| `lib/kitchen.ts` | Market Kitchen pairs, timeframes, symbols |
| `lib/districts.ts` | All 9 district definitions |
| `lib/site.ts` | Beehiiv URLs, site config, district list |
| `content/newsletter-templates/` | 6 email templates ready to use |

---

## The Funnel (How It's Supposed to Work)

```
Social media → /join?source=tiktok
        ↓
Beehiiv subscribe page
        ↓
Beehiiv redirects to → /welcome
        ↓
/welcome → Choose path → /dashboard or /passport or district pages
        ↓
Weekly Opportunity List drops via Beehiiv email
        ↓
Subscribers who want more → /pricing → Opportunity Vault ($7/mo)
        ↓
Product buyers → Medical Courier Guide ($37), TCU ($TBD), etc.
```

---

## First 48 Hours Back

1. Log into Vercel → confirm `BEEHIIV_API_KEY` is set
2. Log into Beehiiv → set post-subscribe redirect to `https://www.mystermyself.com/welcome`
3. Log into Beehiiv → create welcome automation (5 emails, see the setup doc)
4. Post one social link to `/join?source=instagram` and confirm redirect works
5. Pick one affiliate program (TradingView is easiest) and sign up
6. Decide: launch Stripe for the Courier Guide ($37) or grow newsletter list first?

---

## If Something Breaks

| Problem | First step |
|---|---|
| Site is down | Check Vercel dashboard → Deployments for build error |
| Subscribers not saving | Check Vercel env vars for `BEEHIIV_API_KEY` |
| Passport not saving | Check Vercel env vars for Supabase keys |
| AI Coach not responding | Check `ANTHROPIC_API_KEY` in Vercel |
| Build fails | Run `npm run build` locally, read the error |
| Need to redeploy | Push any change to main branch on GitHub |
