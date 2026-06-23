# OPS/004 — Automation Control Layer

## What This Is

A repeatable automation system that allows Maurice to operate as CEO without manually explaining the same audit steps every session.

## How Maurice Uses This

```
1. Maurice gives a mission:
   "Diagnose the site" / "Check socials" / "Audit funnels" / "CEO report"

2. Kiro runs the appropriate command:
   npm run ops:audit-all    (full suite)
   npm run ops:audit-routes (route check only)
   npm run ops:audit-links  (link integrity only)
   npm run ops:audit-socials (social verification only)
   npm run ops:audit-canon  (canon gap check only)
   npm run ops:audit-funnels (funnel completeness only)
   npm run ops:ceo-report   (generate CEO summary only)

3. Reports are generated:
   docs/reports/CEO-AUTOMATION-REPORT.md  (plain English CEO summary)
   docs/reports/ROUTE-AUDIT.md
   docs/reports/LINK-AUDIT.md
   docs/reports/SOCIAL-AUDIT.md
   docs/reports/CANON-AUDIT.md
   docs/reports/FUNNEL-AUDIT.md

4. GitHub stores the work:
   - Issues track problems (use issue templates)
   - PRs contain fixes (use PR template)
   - Actions run audits on every PR

5. Vercel deploys:
   - Preview deploys automatic on PR push
   - Production deploy requires Maurice approval

6. ChatGPT reviews:
   - Reads CEO report
   - Recommends next phase
   - Frames decisions for Maurice

7. Maurice approves:
   - Merge PR
   - Approve deploy
   - Give next mission
```

## File Map

| File | Purpose |
|------|---------|
| `scripts/ops/audit-routes.mjs` | Check route files exist |
| `scripts/ops/audit-links.mjs` | Scan for broken/placeholder links |
| `scripts/ops/audit-socials.mjs` | Verify social link integrity |
| `scripts/ops/audit-canon.mjs` | Check canon representation |
| `scripts/ops/audit-funnels.mjs` | Check funnel completeness |
| `scripts/ops/generate-ceo-report.mjs` | Combine into CEO summary |
| `scripts/ops/run-all.mjs` | Run everything in sequence |
| `data/canon/scott-king-coast.json` | Canon source of truth |
| `data/ops/social-links.json` | Confirmed social URLs |
| `data/ops/funnel-map.json` | Funnel path definitions |
| `data/ops/route-map.json` | Expected route inventory |
| `.github/workflows/ops-site-audit.yml` | Auto-run on PRs |
| `.github/pull_request_template.md` | CEO-focused PR template |
| `.github/ISSUE_TEMPLATE/ops-*.yml` | Structured issue templates |
| `.kiro/steering/mystermyself-automation.md` | Kiro operating rules |

## What This Does NOT Do

- Does not redesign the public site
- Does not add new features
- Does not require paid AI keys
- Does not deploy anything
- Does not create new repos or Vercel projects
- Does not change canon
