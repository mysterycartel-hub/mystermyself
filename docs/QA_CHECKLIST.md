# QA CHECKLIST

**Last updated:** June 23, 2026

---

## How To Use This Checklist

Run through this before every major deployment or after any structural change. Check items manually on the live site or local dev server (`npm run dev`).

---

## Critical Path Tests

### 1. Site Loads
- [ ] Homepage loads without errors
- [ ] No console errors in browser dev tools
- [ ] Page renders within 3 seconds

### 2. Navigation
- [ ] Navbar appears on all pages
- [ ] All nav links resolve (no 404s)
- [ ] Mobile menu works (if applicable)
- [ ] Footer links work

### 3. Newsletter Signup (The Opportunity List)
- [ ] /opportunity-list page loads
- [ ] Email input accepts valid email
- [ ] Submit button triggers API call
- [ ] Success message appears
- [ ] Subscriber appears in Beehiiv (check dashboard)
- [ ] Invalid email shows error

### 4. Passport / Authentication
- [ ] /passport/login page loads
- [ ] Email input works
- [ ] "Send Magic Link" button triggers Supabase OTP
- [ ] Email arrives with login link
- [ ] Clicking link redirects to /dashboard
- [ ] Dashboard shows user information
- [ ] Logout works

### 5. District Pages
- [ ] /coast loads with interactive map
- [ ] /coast/founder-island loads
- [ ] /coast/market-marina loads
- [ ] /coast/route-harbor loads
- [ ] /coast/blueprint-bay loads
- [ ] /coast/creator-pier loads
- [ ] /coast/flavor-district loads
- [ ] /coast/legacy-point loads
- [ ] /coast/fantasy-island loads
- [ ] /coast/library-vault loads

### 6. Trading Chef University
- [ ] /trading-chef-university loads
- [ ] Level navigation works
- [ ] Lesson content renders
- [ ] XP tracking works (if logged in)

### 7. Kitchen / TCU Terminal
- [ ] /kitchen loads
- [ ] /market-marina/tcu-terminal loads
- [ ] Chart renders (demo mode acceptable without API key)

### 8. Legal & Compliance
- [ ] /terms loads with content
- [ ] /privacy loads with content
- [ ] /disclaimer loads with content
- [ ] /refund loads with content
- [ ] /affiliate-disclosure loads

---

## Redirect Tests

| From | To | Type |
|------|----|------|
| /courier-income-lab | /route-harbor | 301 (permanent) |
| /subscribe | /opportunity-list | 302 (temporary) |
| /newsletter | /opportunity-list | 302 (temporary) |
| /join | /opportunity-list | 302 (temporary) |
| /districts | /coast | 302 (temporary) |
| /start | /opportunity-list | 302 (temporary) |

---

## Performance Checks

- [ ] First Load JS under 100 kB (shared bundle)
- [ ] Largest Contentful Paint under 2.5 seconds
- [ ] No layout shift visible on page load
- [ ] Images load without broken icons

---

## Mobile Checks

- [ ] Homepage readable on mobile
- [ ] Navigation accessible on mobile
- [ ] Newsletter form usable on mobile
- [ ] Text readable without zooming

---

## Known Acceptable States

These are NOT bugs:

- Stripe checkout returns "not configured" — payments are intentionally disabled
- AI Coach shows demo/mock responses — expected without API key
- Market charts show demo candles — expected without market data API key
