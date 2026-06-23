# KNOWN BLOCKERS

**Last updated:** June 23, 2026

---

## Critical Blockers (Must Fix Before Launch)

### BLOCKER-001: Supabase Environment Variables Not Set in Vercel
- **Impact:** Login/Passport system will show "not configured" error on live site
- **Fix:** Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel Dashboard → Settings → Environment Variables
- **Who:** Maurice (Vercel login) or AI agent with access
- **Time:** 5 minutes
- **Priority:** HIGH

### BLOCKER-002: Beehiiv API Key Not Set in Vercel
- **Impact:** Newsletter signup will fail silently on live site (shows success to user but doesn't actually subscribe them)
- **Fix:** Add `BEEHIIV_API_KEY` to Vercel Dashboard → Settings → Environment Variables
- **Who:** Maurice (Beehiiv Settings → Integrations → API)
- **Time:** 5 minutes
- **Priority:** HIGH

---

## Non-Critical Issues (Fix After Launch)

### ISSUE-001: Orphan `/src/` Directory
- **Impact:** None — build ignores these files
- **What:** 2 files from an earlier experiment left behind
- **Fix:** Remove `/src/` directory in a housekeeping PR
- **Priority:** LOW

### ISSUE-002: Duplicate District Pages in `/app/pages/`
- **Impact:** SEO confusion — two URLs serve similar content for each district
- **What:** `/app/pages/blueprint-bay/`, `/app/pages/creator-pier/`, etc. duplicate content from `/coast/[district]`
- **Fix:** Add redirects from `/pages/*` to `/coast/*` or remove duplicates
- **Priority:** MEDIUM (after launch)

### ISSUE-003: No Staging Environment
- **Impact:** All code pushes go directly to production
- **Risk:** If a bad commit merges to main, the live site breaks immediately
- **Fix:** Set up preview deployments in Vercel (already supported, just needs branch protection)
- **Priority:** MEDIUM (after launch)

### ISSUE-004: NPM Audit Vulnerabilities (8 total)
- **Impact:** None at runtime. All are upstream transitive dependencies.
- **Fix:** Run `npm audit fix` periodically
- **Priority:** LOW

### ISSUE-005: No Automated Tests
- **Impact:** No way to catch regressions automatically
- **Fix:** Add basic smoke tests for critical paths (homepage, newsletter, auth)
- **Priority:** LOW (after launch)

---

## Blocker Resolution Checklist

- [ ] BLOCKER-001 resolved (Supabase keys in Vercel)
- [ ] BLOCKER-002 resolved (Beehiiv key in Vercel)
- [ ] Live site tested after keys are set
- [ ] Newsletter signup confirmed working
- [ ] Passport login confirmed working
