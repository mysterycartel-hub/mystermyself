# DEPLOYMENT CHECKLIST

**Last updated:** June 23, 2026

---

## Pre-Launch Steps

### Environment Variables (Vercel Dashboard)

Go to: vercel.com → Log in → mystermyself project → Settings → Environment Variables

- [ ] `NEXT_PUBLIC_SUPABASE_URL` — Get from Supabase Dashboard → Settings → API
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Get from Supabase Dashboard → Settings → API
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — Get from Supabase Dashboard → Settings → API
- [ ] `BEEHIIV_API_KEY` — Get from Beehiiv → Settings → Integrations → API
- [ ] `BEEHIIV_PUBLICATION_ID` — Already known: `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`
- [ ] `NEXT_PUBLIC_BEEHIIV_SIGNUP_URL` — `https://maurices-newsletter-b7274b.beehiiv.com/subscribe`
- [ ] `NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL` — `https://maurices-newsletter-b7274b.beehiiv.com`
- [ ] `NEXT_PUBLIC_SITE_URL` — `https://mystermyself.com`

### Domain Verification

- [ ] mystermyself.com resolves to Vercel
- [ ] HTTPS certificate is active (Vercel auto-manages this)
- [ ] www.mystermyself.com redirects to mystermyself.com (or vice versa)

### Build Verification

- [ ] `npm run build` passes locally with zero errors
- [ ] Latest commit on `main` deployed successfully on Vercel
- [ ] Vercel deployment shows "Ready" status

---

## Post-Deploy Verification

### Homepage
- [ ] Homepage loads at mystermyself.com
- [ ] Hero section renders correctly
- [ ] Navigation links work
- [ ] Footer renders

### Newsletter Signup
- [ ] Go to /opportunity-list
- [ ] Enter test email
- [ ] Confirm subscriber appears in Beehiiv dashboard

### Passport / Auth
- [ ] Go to /passport/login
- [ ] Enter email, receive magic link
- [ ] Click link, confirm redirect to /dashboard
- [ ] Dashboard shows user info

### Districts
- [ ] Visit /coast — map loads
- [ ] Click each district — page loads correctly
- [ ] All 9 districts accessible

### Legal Pages
- [ ] /terms loads
- [ ] /privacy loads
- [ ] /disclaimer loads
- [ ] /refund loads

---

## Stripe Activation (FUTURE — Not Required for Launch)

Only do this when the first paid product is ready:

- [ ] Create products in Stripe Dashboard
- [ ] Get price IDs
- [ ] Add `STRIPE_SECRET_KEY` to Vercel env vars
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to Vercel env vars
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Vercel env vars
- [ ] Set up Stripe webhook pointing to `https://mystermyself.com/api/webhooks/stripe`
- [ ] Test checkout flow with Stripe test mode

---

## Emergency Recovery

If the site goes down:

1. Check Vercel Dashboard for deployment errors
2. Check if env vars were accidentally removed
3. Roll back to previous deployment in Vercel → Deployments → click "..." → Promote to Production
4. If repo issue: revert last commit on `main`
