# MysterMyself — Build Gates and Approval Rules

**Date**: June 20, 2026
**Version**: 1.0

---

## Gate Classification

### Green — Execute Without Asking

These actions are safe, local, and reversible. AI agents proceed immediately.

- Read/search any file in the repo
- Create documentation files
- Create spec files
- Create task lists
- Create steering files
- Create local-only scaffolds (Terraform .tf files, placeholder code)
- Create placeholder code that does not connect to live services
- Run `git status`, `git diff`, `git log`
- Run `npm run build`
- Run `npm run lint`
- Run `npm test` (if available)
- Run `tsc --noEmit` (typecheck)
- Create local git commits after verifying changed files
- Write reports and audits
- Organize docs folder
- Add TODO comments in code
- Add `.example` environment variable files (no real secrets)
- Run AWS CLI read-only commands (`list`, `describe`, `get`)

### Yellow — Proceed If Local-Only, Report in Summary

These actions modify the codebase but are still local and reversible. The agent may proceed but must report the change in the session summary.

- Editing existing route files
- Editing existing components
- Adding local utility files
- Creating API route stubs
- Creating Terraform skeleton files
- Creating Lambda placeholder files
- Creating event client abstraction code
- Updating `.env.local.example` with placeholder variable names
- Adding docs-driven product maps
- Adding local validation scripts
- Adding non-breaking placeholder hooks

### Red — STOP and Wait for Maurice

These actions are irreversible, affect production systems, or cost money. The agent MUST stop and present a summary to Maurice before proceeding.

- `terraform apply` or `terraform destroy`
- Any AWS `create`, `update`, `delete`, or `put` command
- `git push` (to any remote)
- Vercel production deploy
- Vercel environment variable changes
- Supabase migration execution
- Supabase schema changes on live database
- Stripe product/price creation or modification
- Stripe webhook endpoint changes
- Beehiiv live API calls (create subscriber, update tags)
- File deletion (any file in the repo)
- Handling real secrets or credentials
- Paid service activation
- Canon changes (new brands, districts, characters)
- Production configuration changes
- Domain or DNS changes

---

## Gate Format

When a red gate is reached, the agent must output:

```
🔴 RED GATE REACHED

Action requested: [what the agent wants to do]
Why: [why this action is needed]
Risk: [what could go wrong]
Reversible: [yes/no/partially]
Cost: [estimated cost if applicable]

Waiting for Maurice's approval before proceeding.
```

---

## Approval Responses

Maurice can respond with:
- **"Approved"** or **"Go"** — proceed with the action
- **"Hold"** — do not proceed, continue with other work
- **"Skip"** — skip this action entirely, move to next phase
- **"Modify"** — adjust the approach (Maurice will specify how)

---

## Phase Gate Summary

| Phase | Gate Type | Trigger |
|-------|-----------|---------|
| Phase 0 | Green | All documentation |
| Phase 1 | Green | Audit and reporting |
| Phase 2 | Green | Documentation mapping |
| Phase 3 | Yellow | Terraform skeleton (local only) |
| Phase 4 | Yellow | Event system code (local only) |
| Phase 5 | Yellow | App readiness stubs |
| Deploy | Red | git push, Vercel deploy |
| AWS Apply | Red | terraform apply |
| Cleanup | Red | File deletion, resource deletion |
| Live Integration | Red | Stripe/Supabase/Beehiiv changes |
