# OPS/004B–F: Full MVP Funnel Build — Task List

## Task Dependency Graph

```
TASK-001 (capture engine) ─┐
TASK-002 (district flow)   ├── TASK-005 (launch audit)
TASK-003 (product cleanup) ─┤
TASK-004 (return path)    ─┘
```

---

## TASK-001: Opportunity List Capture Engine [OPS/004B]
**Status**: ✅ Complete (committed in ops/004b-full-mvp-funnel-build)
**Depends on**: None

### Sub-tasks
- [x] Create `lib/capture.ts` with shared Beehiiv + Supabase logic
- [x] Update `LeadMagnetForm` to use `captureFullFunnel`
- [x] Add Supabase backup write to `/api/newsletter/subscribe`
- [x] Pass lane choice to welcome page via URL + localStorage
- [x] Welcome page reads and displays lane personalization
- [x] Verify build passes

---

## TASK-002: Scott-King Coast District Flow [OPS/004C]
**Status**: not_started
**Depends on**: TASK-001

### Sub-tasks
- [ ] Audit all 8 district pages for CTA completeness
- [ ] Add SubscribeBox or Opportunity List CTA to any district page missing one
- [ ] Ensure all district CTAs route to real destinations
- [ ] Add district-specific product/resource links where available
- [ ] Confirm Breaded Facebook/order show Coming Soon (not broken)
- [ ] Add "Explore More Districts" navigation to each district page footer
- [ ] Update funnel audit script if needed to reflect improvements
- [ ] Run audits, verify 0 dead links

---

## TASK-003: Product/Funnel Cleanup [OPS/004D]
**Status**: not_started
**Depends on**: TASK-001

### Sub-tasks
- [ ] Audit /pricing page — verify tiers are clear and CTAs work
- [ ] Audit /products/medical-courier-guide — verify CTA routes
- [ ] Mark "District Pass" and "Opportunity Vault" as Coming Soon clearly
- [ ] Ensure "Join Free Now" routes to /opportunity-list (confirmed working)
- [ ] Check /playbooks, /free-content, /resources for CTA completeness
- [ ] Add SubscribeBox to any product page without a capture path
- [ ] Run audits, verify no broken product links

---

## TASK-004: Dashboard / Passport / Return Path [OPS/004E]
**Status**: not_started
**Depends on**: TASK-001, TASK-002

### Sub-tasks
- [ ] Add lane/district context to dashboard (read from localStorage)
- [ ] Show "Your Lane" card on dashboard with link to chosen district
- [ ] Add recommended next steps based on lane
- [ ] Show available products/resources for the user's lane
- [ ] Verify unauthenticated fallback state is useful (not blank)
- [ ] Add "Explore Districts" and "View Pricing" CTAs to dashboard
- [ ] Test with fresh localStorage (first-visit state)
- [ ] Run build, verify no breakage

---

## TASK-005: Final Launch Audit [OPS/004F]
**Status**: not_started
**Depends on**: TASK-002, TASK-003, TASK-004

### Sub-tasks
- [ ] Run `npm run ops:audit-all` — all checks must pass
- [ ] Run `npm run build` — 0 errors
- [ ] Verify 0 broken links
- [ ] Verify 0 `[NEEDS OWNER URL]` in source
- [ ] Verify no fake social links
- [ ] Verify no OpenAI/Anthropic key required
- [ ] Verify all public routes load
- [ ] Generate final CEO launch report
- [ ] Commit all changes
- [ ] Push branch
- [ ] Provide PR link

---

## Completion Criteria
A visitor can:
1. Land on mystermyself.com and understand Scott-King Coast
2. Choose a district/lane
3. Join the Opportunity List
4. Get captured into the correct funnel segment
5. Access a product/resource/waitlist
6. Follow the brand through consent-based CTAs
7. Return later via dashboard and see progress

Without: dead buttons, fake socials, broken routes, or signup confusion.
