# DEPLOYMENT SOURCE OF TRUTH
**MysterMyself — Vercel + GitHub Deployment Reference**
Last updated: 2026-06-15

---

## TABLE OF CONTENTS

1. [Vercel Setup](#vercel-setup)
2. [GitHub Repo](#github-repo)
3. [Branch Strategy](#branch-strategy)
4. [Production URL](#production-url)
5. [Domain Setup](#domain-setup)
6. [Environment Variables](#environment-variables)
7. [Build Commands](#build-commands)
8. [Recovery Procedure](#recovery-procedure)

---

## VERCEL SETUP

### Project Details
- **Platform:** Vercel
- **Framework:** Next.js (auto-detected)
- **Node version:** 18.x (Vercel default)
- **Autodeploy:** Enabled — pushes to `main` trigger production deploy
- **Build output:** `.next/`

### Vercel Project Settings
| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `.` (project root) |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| Install Command | `npm install` |
| Node.js Version | 18.x |

### No `vercel.json` required
The project uses Next.js App Router — Vercel auto-handles routing, SSR, SSG, and dynamic routes without a config file.

---

## GITHUB REPO

- **URL:** `https://github.com/mysterycartel-hub/mystermyself.git`
- **Org:** `mysterycartel-hub`
- **Repo:** `mystermyself`
- **Default branch:** `main`
- **Visibility:** Private

### Clone
```bash
git clone https://github.com/mysterycartel-hub/mystermyself.git
cd mystermyself
npm install
cp .env.local.example .env.local
# fill in env vars
npm run dev
```

### Recent Commits
```
34fc094e Add TCU Source of Truth — complete system documentation
1ba03ef4 V4/V5 platform mechanics — quest board, kitchen rush trainer, crown method, theater XP sync
88efab9a Add TCU Sound Identity System page
7f697c29 Wire quest completion, coach cues, and canon character cleanup
e9dc08ee Populate full TCU curriculum engine — all 14 lessons
```

---

## BRANCH STRATEGY

### Current Strategy: Trunk-Based (main only)
| Branch | Purpose | Deploy Target |
|---|---|---|
| `main` | Production — all code | Vercel production |

### Rules
- All code goes directly to `main` during the current build phase
- Vercel autodeploys on every push to `main`
- No staging environment configured
- No feature branches required until multi-team development begins

### When to Use Feature Branches
If a change requires more than one commit to be safe (e.g., Stripe re-enable, database migrations), create a short-lived feature branch:
```bash
git checkout -b feat/stripe-enable
# make changes
git push origin feat/stripe-enable
# merge to main via PR after review
```

---

## PRODUCTION URL

- **Primary:** `https://mystermyself.com` (pending domain connection)
- **Vercel default:** `https://mystermyself.vercel.app` (auto-assigned)
- **Preview deployments:** `https://mystermyself-[hash]-mysterycartel-hub.vercel.app`

### NEXT_PUBLIC_SITE_URL
Set this env var to the production domain once connected. It is used by Supabase for magic link redirects.

```
NEXT_PUBLIC_SITE_URL=https://mystermyself.com
```

---

## DOMAIN SETUP

### Steps to Connect Domain to Vercel
1. Log in to Vercel Dashboard → Project → Settings → Domains
2. Add `mystermyself.com`
3. Vercel provides DNS records (CNAME or A record)
4. Update DNS at domain registrar to point to Vercel
5. Vercel auto-provisions SSL certificate (Let's Encrypt)
6. Set `NEXT_PUBLIC_SITE_URL` env var to `https://mystermyself.com`
7. Update Supabase Auth redirect URLs to include production domain

### Supabase Auth URL Configuration
In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL:** `https://mystermyself.com`
- **Redirect URLs:** `https://mystermyself.com/**`

---

## ENVIRONMENT VARIABLES

### Required (features break without these)
```bash
# Supabase — Passport auth + all DB operations
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic — AI Coach at /api/coach
ANTHROPIC_API_KEY=sk-ant-...
```

### Optional (features degrade gracefully without these)
```bash
# Site URL — for Supabase magic link redirects
NEXT_PUBLIC_SITE_URL=https://mystermyself.com

# Stripe — fully disabled; uncomment /api/checkout/route.ts to enable
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_GOLD_PLAYBOOK=price_...
STRIPE_PRICE_TCU_MEMBERSHIP=price_...
STRIPE_PRICE_COURIER_STARTER=price_...
STRIPE_PRICE_FOOD_POPUP=price_...
STRIPE_PRICE_FANTASY_DRAFT_BIBLE=price_...
STRIPE_PRICE_AI_OPERATOR=price_...
```

### Where to Find These Values
| Var | Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → service_role key |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → signing secret |

### Adding to Vercel
Vercel Dashboard → Project → Settings → Environment Variables → Add Variable
- Set scope to **Production** (and optionally Preview + Development)
- Redeploy after adding — env vars only apply to new builds

### Local Development
```bash
cp .env.local.example .env.local
# Edit .env.local with real values
# Never commit .env.local — it is in .gitignore
```

---

## BUILD COMMANDS

### Local Development
```bash
npm run dev        # starts Next.js dev server at localhost:3000
```

### Production Build (local verification)
```bash
npm run build      # full production build — must pass with 0 errors
npm run start      # serves the production build locally
```

### Lint
```bash
npm run lint       # ESLint via next lint
```

### Build Output Reference
The last successful build:
- **63 routes** — 0 errors, 0 warnings
- Mix of Static (○) and Dynamic (ƒ) routes
- First Load JS: ~87.3 kB shared

### Key Build Facts
- `export const dynamic = 'force-dynamic'` is required on any API route that uses `request.headers`
- `generateStaticParams` is used on `/academy/[lesson]` and `/coast/[district]` for SSG
- `.jsx` files are supported via `tsconfig.json: { "allowJs": true }`
- `@/*` alias maps to project root (not `src/`) — check `tsconfig.json`

### Vercel Build Command
Vercel runs `npm run build` automatically. No override needed.

---

## RECOVERY PROCEDURE

### If Build Fails on Vercel
1. Check Vercel dashboard → Deployments → failed build → view build logs
2. Replicate locally: `npm run build` and read the error
3. Common causes:
   - Missing `export const dynamic = 'force-dynamic'` on a dynamic API route
   - TypeScript error in a new file
   - Import path using `src/` instead of `@/` (project uses root-level `app/`)
   - Non-canon character ID in `TCUCharacter` type
4. Fix locally, verify with `npm run build`, commit, push

### If Supabase Auth Breaks
1. Verify Supabase URL and keys in Vercel env vars
2. Verify Site URL in Supabase Auth settings matches production domain
3. Verify redirect URLs in Supabase Auth include `https://yourdomain.com/**`
4. Test magic link in Supabase Dashboard → Authentication → Users → Send magic link

### If AI Coach Returns 503
1. Verify `ANTHROPIC_API_KEY` is set in Vercel env vars (Production scope)
2. Redeploy after adding (env vars don't apply retroactively)
3. Test: `POST /api/coach` with `{ symbol: 'XAUUSD', timeframe: '1H' }`

### To Rollback a Bad Deploy
```bash
# Option 1: Revert the commit
git revert HEAD
git push origin main

# Option 2: Vercel instant rollback
# Vercel Dashboard → Deployments → find the last good deploy → Promote to Production
```

### To Reset Local State (development only)
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Emergency: Supabase Row Recovery
All Supabase tables have RLS enabled. To read data as admin:
- Supabase Dashboard → Table Editor → toggle off RLS temporarily
- OR use the service role key in psql/Supabase Studio

### Database Backup
Supabase Dashboard → Project Settings → Database → Backups
- Daily backups enabled by default on paid plans
- Point-in-time recovery available on Pro+

---

## DEPLOYMENT QUICK REFERENCE

```
Repo:     github.com/mysterycartel-hub/mystermyself
Branch:   main → Vercel Production (autodeploy)
Build:    npm run build (Next.js 14.2.5)
Routes:   63 (last verified build)
DB:       Supabase PostgreSQL (5 passport tables + leads + RPC)
Auth:     Supabase Email Magic Link
AI:       Anthropic API (claude-haiku-4-5-20251001)
Payments: Stripe (DISABLED — enable by uncommenting /api/checkout/route.ts)
```
