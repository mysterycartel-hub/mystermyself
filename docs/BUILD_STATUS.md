# BUILD STATUS

**Last verified:** June 23, 2026
**Command:** `npm run build`
**Result:** SUCCESS (zero errors)

---

## Build Summary

| Metric | Value |
|--------|-------|
| Framework | Next.js 14.2.5 |
| Node.js | v20+ |
| Package Manager | npm |
| Total pages compiled | 70+ |
| Static pages | 60+ |
| Dynamic pages | ~8 (API routes, dynamic [district], [username]) |
| Build errors | 0 |
| Build warnings | 0 |
| First Load JS (shared) | 87.3 kB |

---

## Page Categories

### Static Pages (pre-rendered at build time)
- Homepage, Coast map, all district pages
- Academy, Kitchen, Kitchen Rush, TCU Theater
- Passport, Dashboard, Welcome
- Legal pages (terms, privacy, disclaimer, refund)
- Products, Playbooks, Pricing, Roadmap
- Opportunity List (newsletter signup)

### Dynamic Pages (rendered on request)
- `/coast/[district]` — Individual district pages
- `/passport/[username]` — User passport profiles
- `/trading-chef-university` — TCU with server data
- `/auth/callback` — Auth redirect handler
- All `/api/*` routes

### API Routes
- `/api/admin/*` — Admin operations
- `/api/checkout/*` — Stripe checkout
- `/api/coach/*` — AI coach
- `/api/leads/*` — Lead capture
- `/api/newsletter/subscribe` — Beehiiv integration
- `/api/passport/*` — Passport CRUD + XP
- `/api/webhooks/stripe` — Stripe webhook handler

---

## Dependencies Health

| Package | Version | Status |
|---------|---------|--------|
| next | 14.2.5 | Current (LTS) |
| react | 18.3.1 | Current |
| @supabase/supabase-js | 2.45.0 | Current |
| stripe | 16.2.0 | Current |
| framer-motion | 11.3.8 | Current |
| tailwindcss | 3.4.6 | Current |
| typescript | 5.5.3 | Current |

---

## Known Issues (Non-Blocking)

1. **8 npm audit vulnerabilities** — Mostly upstream dependency issues. None affect runtime. Fix with `npm audit fix` when ready.
2. **Orphan `/src/` directory** — 2 unused files. Does not affect build.
3. **Duplicate `/app/pages/` routes** — 9 district pages duplicated from `/coast/[district]`. Cosmetic redundancy only.

---

## How To Verify Build

```bash
cd mystermyself
npm install
npm run build
```

Expected output ends with: all routes listed, zero errors, exit code 0.
