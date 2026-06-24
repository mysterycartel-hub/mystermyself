# OPS/004B–F: Full MVP Funnel Build — Requirements

## Overview
Transform MysterMyself / Scott-King Coast from a collection of pages into a working MVP funnel system where visitors can land, choose a lane, join the ecosystem, access products/resources, and return later.

---

## REQ-001: Opportunity List Capture Engine (OPS/004B)

### User Stories
- As a visitor, I can choose my interest lane so I receive relevant content
- As a visitor, I can submit my email to join the Opportunity List without friction
- As a returning subscriber, I can re-enter without confusion
- As the system, I capture subscribers in Beehiiv with correct lane tags
- As the system, I backup captures to Supabase leads table

### Acceptance Criteria
- [ ] All LeadMagnetForm instances route through unified `lib/capture.ts`
- [ ] Beehiiv receives lane-specific tags for every capture
- [ ] Supabase gets a backup write (non-blocking)
- [ ] Missing env vars result in graceful fallback, not errors
- [ ] Welcome page personalizes by selected lane
- [ ] No paid AI key required for capture flow

---

## REQ-002: Scott-King Coast District Flow (OPS/004C)

### User Stories
- As a visitor, I can see all 8 districts and understand what each offers
- As a visitor, I can navigate from any district to its primary action
- As a subscriber, every district CTA routes me somewhere useful

### Acceptance Criteria
- [ ] Every district page has: purpose, audience, primary offer, CTA
- [ ] All CTAs route to Opportunity List, product, resource, or follow page
- [ ] No dead buttons or broken links
- [ ] No fake social/order links (use /follow-the-coast or Coming Soon)
- [ ] Breaded Facebook and order URL show Coming Soon until confirmed
- [ ] District selector is clear and accessible from multiple entry points

---

## REQ-003: Product/Funnel Cleanup (OPS/004D)

### User Stories
- As a visitor, I can see what products/resources are available and their status
- As a buyer, I can reach checkout from a clear CTA
- As a visitor, I am not forced to subscribe to access product info

### Acceptance Criteria
- [ ] Pricing page clearly shows: Free tier, District Pass (Coming Soon), Vault (Coming Soon)
- [ ] Product CTAs are clear and actionable
- [ ] Coming Soon products are marked honestly (no fake checkout buttons)
- [ ] No subscription gates on product pages
- [ ] Every CTA routes somewhere useful

---

## REQ-004: Dashboard / Passport / Return Path (OPS/004E)

### User Stories
- As a returning user, I can see my progress and next recommended step
- As a returning user, I can see my selected lane/district
- As an unauthenticated user, I see a useful fallback state

### Acceptance Criteria
- [ ] Dashboard shows selected lane/district if available (from localStorage)
- [ ] Dashboard shows recommended next action based on context
- [ ] Available resources/products listed
- [ ] Auth-incomplete state uses safe fallback (not blank page)
- [ ] No production breakage from missing Supabase auth

---

## REQ-005: Final Launch Audit (OPS/004F)

### User Stories
- As the CEO, I receive a plain-English report of site readiness
- As the system, all routes, links, socials, canon, and funnels pass automated checks

### Acceptance Criteria
- [ ] `npm run ops:audit-all` passes
- [ ] `npm run build` passes with 0 errors
- [ ] 0 broken links
- [ ] 0 placeholder URLs in source code
- [ ] No fake social links
- [ ] No OpenAI/Anthropic key required for core functionality
- [ ] All public routes load without errors
- [ ] CEO report generated with clear status

---

## Constraints (All Phases)
- Do not require OpenAI or Anthropic API keys
- Do not create new repos or Vercel projects
- Do not invent new brands, districts, or characters
- Do not delete existing files without CEO approval
- Do not push directly to main (use PRs)
- Demo data for all features when real data unavailable
- Preserve canon: data/canon/scott-king-coast.json is source of truth
