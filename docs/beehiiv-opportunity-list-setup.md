# Beehiiv Opportunity List Setup Guide

Complete setup guide for The Opportunity List newsletter inside Beehiiv.

---

## Step 1 — Get Your API Credentials

1. Log into Beehiiv → Settings → Integrations → API
2. Generate a new API key
3. Copy your Publication ID from Settings → General

Add both to Vercel environment variables (or `.env.local` for local dev):

```
BEEHIIV_API_KEY=your_api_key_here
BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx
```

---

## Step 2 — Create Tags

In Beehiiv → Subscribers → Tags, create these tags exactly as shown:

**Lane Interest Tags**
- `interest_trading_chef`
- `interest_route_harbor`
- `interest_creator_tools`
- `interest_fantasy`
- `interest_ai_business`
- `interest_food`
- `interest_fast_income`

**Engagement Tags**
- `website_signup`
- `hot_reader`
- `paid_lead`
- `vault_member`

**UTM Source Tags** (auto-created by API)
- `utm_youtube`
- `utm_tiktok`
- `utm_instagram`
- `utm_facebook`
- `utm_pinterest`

---

## Step 3 — Create Segments

In Beehiiv → Subscribers → Segments, create these subscriber segments:

| Segment Name | Filter |
|---|---|
| Trading Chef Readers | Tag = `interest_trading_chef` |
| Route Harbor Readers | Tag = `interest_route_harbor` |
| Creator Tool Readers | Tag = `interest_creator_tools` |
| Fantasy Island Readers | Tag = `interest_fantasy` |
| AI Business Readers | Tag = `interest_ai_business` |
| Food Brand Readers | Tag = `interest_food` |
| Fast Income Readers | Tag = `interest_fast_income` |
| Hot Readers | Tag = `hot_reader` |
| Paid Leads | Tag = `paid_lead` |
| Vault Members | Tag = `vault_member` |

---

## Step 4 — Configure Post-Subscribe Redirect

In Beehiiv → Publication Settings → Subscription:

Set **"Thank You Page"** redirect to:
```
https://www.mystermyself.com/welcome
```

This sends subscribers back to the site welcome page immediately after subscribing.

---

## Step 5 — Create Welcome Automation

In Beehiiv → Automations → New Automation:

**Trigger:** New subscriber joins

### Email 1 — Immediate
- **Subject:** Welcome to The Opportunity List ⚓
- **Purpose:** Confirm subscription, introduce Scott-King Coast, explain the ecosystem
- **Key content:**
  - What they'll receive weekly
  - District overview (7 lanes)
  - Link to: https://mystermyself.com/welcome
  - Link to: https://mystermyself.com/districts

### Email 2 — Day 1
- **Subject:** Choose Your Lane
- **Purpose:** Get subscribers to identify their primary interest area
- **Key content:**
  - Brief description of all 7 lanes
  - Ask them to reply with their lane or click a preference link
  - Link to: https://mystermyself.com/opportunity-list

### Email 3 — Day 3
- **Subject:** Your First Opportunity Drop
- **Purpose:** Deliver immediate value before they forget why they subscribed
- **Key content:**
  - One specific opportunity from their likely lane (or all-lane general)
  - Tool or resource recommendation
  - Link to Library Vault: https://mystermyself.com/library

### Email 4 — Day 6
- **Subject:** The Vault Preview
- **Purpose:** Introduce the paid tier concept
- **Key content:**
  - What Opportunity Vault subscribers will unlock
  - Preview of one paid-tier resource
  - Link to: https://mystermyself.com/pricing

### Email 5 — Day 11
- **Subject:** Want the Full Breakdown?
- **Purpose:** Soft pitch to paid tier waitlist
- **Key content:**
  - Value stack recap
  - Founding member pricing teaser
  - Call to action: https://mystermyself.com/pricing

---

## Step 6 — Configure Referral Rewards

In Beehiiv → Referrals → Rewards, set up these milestone rewards:

| Referrals | Reward |
|---|---|
| 1 | Fast Income Starter List (PDF) |
| 3 | Courier Outreach Script Pack |
| 5 | Affiliate Product Research Sheet |
| 10 | Opportunity Vault 30-Day Pass |

---

## Step 7 — Configure Paid Subscription (When Ready)

In Beehiiv → Monetization → Paid Subscriptions:

**Free Tier:** The Opportunity List (current — automatic)

**Paid Tier: Opportunity Vault**
- Monthly: $7/month
- Annual: $49/year
- Description: "Full opportunity breakdowns, route leads, scripts, templates, execution checklists, and research packs across all 7 income lanes."

> Do not enable paid tiers until the Vault content is ready. Collect free subscribers first.

---

## Step 8 — Social Bio Links

All social platform bios should point to:

```
https://mystermyself.com/join
```

With UTM parameters:

| Platform | Link |
|---|---|
| YouTube description | https://mystermyself.com/join?source=youtube |
| TikTok bio | https://mystermyself.com/join?source=tiktok |
| Instagram bio | https://mystermyself.com/join?source=instagram |
| Facebook page | https://mystermyself.com/join?source=facebook |
| Pinterest profile | https://mystermyself.com/join?source=pinterest |

---

## Vercel Environment Variables Checklist

Add these in Vercel → Project → Settings → Environment Variables:

```
BEEHIIV_API_KEY           → [secret] Production only
BEEHIIV_PUBLICATION_ID    → [secret] Production only
NEXT_PUBLIC_BEEHIIV_SIGNUP_URL     → https://maurices-newsletter-b7274b.beehiiv.com/subscribe
NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL → https://maurices-newsletter-b7274b.beehiiv.com
NEXT_PUBLIC_SITE_URL       → https://mystermyself.com
```

---

## What Happens Without API Keys

If `BEEHIIV_API_KEY` or `BEEHIIV_PUBLICATION_ID` are not set:

- The `/api/newsletter/subscribe` route returns a graceful `{ ok: true, dev: true }` response
- No subscriber is created in Beehiiv
- The UI still shows the success state
- A console warning is logged: `BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set`

This lets you test the full flow locally before connecting Beehiiv.
