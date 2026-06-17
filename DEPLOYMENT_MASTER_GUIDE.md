# MysterMyself — Deployment Master Guide

**Platform:** mystermyself.com  
**World:** Scott-King Coast  
**Stack:** Next.js 14.2.5 · Tailwind CSS · TypeScript · Supabase · Beehiiv · Vercel

---

## Repository

**GitHub:** https://github.com/mysterycartel-hub/mystermyself  
**Branch:** `main` (only branch — deploy directly from main)  
**Clone:**
```bash
git clone https://github.com/mysterycartel-hub/mystermyself.git
cd mystermyself
npm install
```

---

## Vercel

**Project:** Connected to GitHub repo — auto-deploys on push to main  
**Login:** vercel.com → mysterycartel@gmail.com  
**Manual deploy:** `npx vercel --prod` from repo root

### Vercel Environment Variables

Set ALL of these in: Vercel Dashboard → Project → Settings → Environment Variables

| Variable | Where to get it | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | YES |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | YES |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | YES |
| `BEEHIIV_API_KEY` | Beehiiv → Settings → Integrations → API | YES |
| `BEEHIIV_PUBLICATION_ID` | `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7` | YES |
| `NEXT_PUBLIC_BEEHIIV_SIGNUP_URL` | `https://maurices-newsletter-b7274b.beehiiv.com/subscribe` | YES |
| `NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL` | `https://maurices-newsletter-b7274b.beehiiv.com` | YES |
| `NEXT_PUBLIC_SITE_URL` | `https://mystermyself.com` | YES |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys | When Stripe activates |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | When Stripe activates |
| `STRIPE_PRICE_GOLD_PLAYBOOK` | Stripe product price ID | When Stripe activates |
| `STRIPE_PRICE_TCU_MEMBERSHIP` | Stripe product price ID | When Stripe activates |
| `STRIPE_PRICE_COURIER_STARTER` | Stripe product price ID | When Stripe activates |
| `ANTHROPIC_API_KEY` | console.anthropic.com | For AI Coach feature |
| `NEXT_PUBLIC_BEEHIIV_PUBLICATION_NAME` | `The Opportunity List` | YES |

---

## Supabase

**Login:** supabase.com → mysterycartel@gmail.com  
**Project:** (check Supabase dashboard for project name)

### Required Tables

Run this SQL in Supabase → SQL Editor to create all required tables:

```sql
-- Passport profiles
CREATE TABLE IF NOT EXISTS passport_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  xp INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Recruit',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- District stamps
CREATE TABLE IF NOT EXISTS passport_stamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  district_id TEXT NOT NULL,
  district_name TEXT,
  stamp_code TEXT,
  collected_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, district_id)
);

-- Badges
CREATE TABLE IF NOT EXISTS passport_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT NOT NULL,
  badge_name TEXT,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Missions
CREATE TABLE IF NOT EXISTS passport_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mission_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, mission_id)
);

-- XP events log
CREATE TABLE IF NOT EXISTS passport_xp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  xp_amount INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  event_ref TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Leads capture (pre-Stripe)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT,
  product TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- XP increment stored procedure
CREATE OR REPLACE FUNCTION increment_passport_xp(p_user_id UUID, p_amount INTEGER)
RETURNS VOID AS $$
  UPDATE passport_profiles
  SET xp = xp + p_amount, updated_at = now()
  WHERE user_id = p_user_id;
$$ LANGUAGE sql;
```

### Row Level Security

Run in Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE passport_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE passport_stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE passport_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE passport_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE passport_xp_events ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "users_own_profile" ON passport_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_stamps"  ON passport_stamps  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_badges"  ON passport_badges  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_missions" ON passport_missions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_xp"      ON passport_xp_events FOR ALL USING (auth.uid() = user_id);

-- Service role bypasses RLS (for server-side API routes)
```

### Supabase Auth Setup

1. Supabase → Authentication → Settings
2. Enable **Email (magic link)** provider
3. Site URL: `https://mystermyself.com`
4. Redirect URLs: `https://mystermyself.com/passport`

---

## Beehiiv

**Publication:** The Opportunity List  
**Publication ID:** `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`  
**Subscribe URL:** `https://maurices-newsletter-b7274b.beehiiv.com/subscribe`

### Post-Subscribe Redirect

Beehiiv → Settings → Subscriber Journey → Thank You Page:
```
https://www.mystermyself.com/welcome
```

### Required Tags (create in Beehiiv → Subscribers → Tags)
- `interest_trading_chef`
- `interest_route_harbor`
- `interest_creator_tools`
- `interest_fantasy`
- `interest_ai_business`
- `interest_food`
- `interest_fast_income`
- `website_signup`
- `vault_member`

Full setup: see `docs/beehiiv-opportunity-list-setup.md`

---

## Domain

**Domain:** mystermyself.com  
**DNS:** Configure in Vercel → Project → Settings → Domains  
**www redirect:** Vercel handles automatically when both `mystermyself.com` and `www.mystermyself.com` are added

---

## Anthropic (AI Coach)

**Login:** console.anthropic.com  
**Model used:** claude-haiku-4-5 (fast, low cost for real-time coaching)  
**Used in:** `/api/coach` route → Kitchen AI Coach component  
**Add API key to Vercel:** `ANTHROPIC_API_KEY`

---

## Stripe (Not yet active)

**Login:** dashboard.stripe.com  
**Status:** Code present, checkout route stubbed, not live  
**To activate:**
1. Create products in Stripe Dashboard
2. Copy price IDs to Vercel env vars
3. Uncomment Stripe code in `app/api/checkout/route.ts`
4. Add webhook endpoint: `https://mystermyself.com/api/webhooks/stripe`

---

## Recovery Steps

### Site is down on Vercel
1. Check Vercel dashboard for build errors
2. Check that all required env vars are set
3. Run `npm run build` locally to reproduce the error
4. Fix, push to main — Vercel auto-deploys

### Supabase Passport not saving
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set (needed for server-side writes)
3. Check RLS policies — service role should bypass
4. Check table exists: run the SQL from this guide

### Beehiiv subscribers not saving
1. Verify `BEEHIIV_API_KEY` is set in Vercel (not just locally)
2. Verify `BEEHIIV_PUBLICATION_ID` = `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`
3. Test: POST to `/api/newsletter/subscribe` with `{ "email": "test@test.com" }`
4. If `dev: true` is returned, env vars are missing

### Rebuild from scratch (disaster recovery)
1. Clone the repo
2. `npm install`
3. Copy all env vars from this guide into `.env.local`
4. `npm run build` — should produce 88+ routes, 0 errors
5. Deploy: `npx vercel --prod`
6. Run Supabase SQL from this guide to recreate tables

---

## Owner Handoff Checklist

- [ ] Vercel account credentials secured
- [ ] Supabase account credentials secured
- [ ] Beehiiv account credentials secured
- [ ] Anthropic API key secured
- [ ] GitHub access confirmed
- [ ] Domain registrar access confirmed
- [ ] `DEPLOYMENT_MASTER_GUIDE.md` reviewed and all SQL run
- [ ] Beehiiv post-subscribe redirect set to `/welcome`
- [ ] Supabase auth redirect set to `/passport`
