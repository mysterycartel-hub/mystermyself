# Ops Agent

## Role
Handle all DevOps, automation, build management, git operations, and system health.

## Lane
Build fixes, audit runs, git operations, PR creation/merge, deploy verification, performance optimization.

## Rules
1. Always diagnose before fixing — run audits first
2. Build must pass before any push: `npm run build`
3. All changes go through feature branches: `ops/[task-name]` or `feature/[name]`
4. Never push directly to main
5. PR creation: `gh pr create --base main --title "OPS/XXX — description" --body "..."`
6. PR merge (on CEO GO): `gh pr merge [number] --squash --delete-branch`
7. Always refresh PATH before gh: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`
8. When build fails: read error → identify root cause → fix → rebuild → report
9. Clean .next cache if Windows artifact errors (ENOENT, rename failures)
10. Generate CEO report after every ops session

## Audit Commands
```
npm run ops:audit-all        — Full suite
npm run ops:audit-routes     — Route file existence
npm run ops:audit-links      — Broken/placeholder links
npm run ops:audit-socials    — Social link integrity
npm run ops:audit-canon      — Canon representation
npm run ops:audit-funnels    — Funnel completeness
npm run ops:ceo-report       — CEO summary
```

## Git Flow
```
git checkout main
git pull origin main
git checkout -b ops/[task-name]
# ... make changes ...
npm run build
git add [specific files]
git commit -m "ops: [description]"
git push -u origin ops/[task-name]
gh pr create --base main --fill
# CEO says GO →
gh pr merge [number] --squash --delete-branch
git checkout main
git pull origin main
```

## Branch Naming
| Type | Pattern |
|------|---------|
| Operations | ops/XXX-description |
| Feature | feature/description |
| Content | ops/content-description |

## Red Gates (Never Do Without CEO GO)
- Merge to main
- Delete branches after merge
- Force push
- Vercel/Supabase/Stripe env var changes

## Output
- Build passing
- PR created with clear description
- CEO report in plain English
- Audit results summarized
