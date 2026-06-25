# ENV-SETUP.md — MysterMyself Environment Variables

> **This is your permanent reference.** Before adding env vars to Vercel, confirm each value matches the format below. If it doesn't match, it's wrong — don't add it.

---

## Quick Rules

1. All 3 Supabase vars must come from the **SAME** project: **"mysterycartel-hub's Project"** (us-west-2)
2. Never copy keys from the "tcu-market-kitchen" project — that's for the other repo
3. If a value looks like a placeholder (matches the key name, is short, or doesn't match the format), it IS wrong
4. After adding vars, visit: **https://mystermyself.com/api/health** — instant proof of what works

---

## Required Variables

### SUPABASE (3 vars) — All from the SAME project

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com → Project → Settings → API → Project URL | `https://xxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | supabase.com → Project → Settings → API → anon public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT, 200+ chars) |
| `SUPABASE_SERVICE_ROLE_KEY` | supabase.com → Project → Settings → API → service_role secret key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT, different from anon) |

**Which Supabase project?**
→ Use **"mysterycartel-hub's Project"** (region: us-west-2)
→ Do NOT use "tcu-market-kitchen" — that belongs to the other repo

**Common mistakes:**
- ❌ Pasting "supabase_url" or "your-project-url" as the value
- ❌ Pasting a URL that doesn't end in `.supabase.co`
- ❌ Using the anon key where the service role key should go (they look similar but are different)
- ❌ Copying keys from "tcu-market-kitchen" project into this repo

---

### BEEHIIV (2 vars)

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `BEEHIIV_API_KEY` | beehiiv.com → Settings → Integrations → API Keys → Create/copy | Long alphanumeric string (40+ chars) |
| `BEEHIIV_PUBLICATION_ID` | beehiiv.com → Settings → scroll down to Publication ID | `pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

**Your known publication ID:** `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`

**Common mistakes:**
- ❌ Value is literally `"beehiiv_publication_id"` — that's the placeholder text, not a real ID
- ❌ Publication ID doesn't start with `pub_`
- ❌ API key returns 401 — it's expired. Create a new one in Beehiiv → Settings → API Keys

---

### STRIPE (3 vars)

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `STRIPE_SECRET_KEY` | stripe.com → Developers → API Keys → Secret key | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | stripe.com → Developers → Webhooks → select endpoint → Signing secret | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | stripe.com → Developers → API Keys → Publishable key | `pk_live_...` or `pk_test_...` |

**Common mistakes:**
- ❌ Using test keys in production (starts with `sk_test_` / `pk_test_`)
- ❌ Webhook secret doesn't start with `whsec_`
- ❌ Mixing live and test keys

---

### OPTIONAL (app works without these)

| Variable | Purpose | Format |
|----------|---------|--------|
| `NEXT_PUBLIC_MARKET_DATA_PROVIDER` | Market data source | `twelve_data` or `polygon` or empty |
| `MARKET_DATA_API_KEY` | Market data API key | Provider-specific string |
| `OPENAI_API_KEY` | AI Coach (OpenAI) | `sk-...` |
| `ANTHROPIC_API_KEY` | AI Coach (Anthropic) | `sk-ant-...` |

---

## After Adding Vars

1. Go to: **https://mystermyself.com/api/health**
2. You'll see a JSON response showing:
   - ✅ Green = connected and working
   - ❌ Red = broken with exact reason
3. Fix only the broken ones. Don't touch what's green.

---

## Vercel Project

- **Project ID:** `prj_aTYPcafBBKRb3EOpYBYqKFrExZUO`
- **Dashboard:** https://vercel.com/mysterycartel-hub/mystermyself/settings/environment-variables
- **Where to add vars:** Settings → Environment Variables → add each one for Production + Preview + Development

---

## Checklist Before Deploy

- [ ] `NEXT_PUBLIC_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` starts with `eyJ` and is 200+ characters
- [ ] `SUPABASE_SERVICE_ROLE_KEY` starts with `eyJ`, is different from anon key
- [ ] All 3 Supabase vars come from **"mysterycartel-hub's Project"**
- [ ] `BEEHIIV_API_KEY` is 40+ characters (not expired)
- [ ] `BEEHIIV_PUBLICATION_ID` starts with `pub_`
- [ ] `STRIPE_SECRET_KEY` starts with `sk_live_` or `sk_test_`
- [ ] `STRIPE_WEBHOOK_SECRET` starts with `whsec_`
