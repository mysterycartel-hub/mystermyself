# MysterMyself Automation Steering

## Identity
- Project: MysterMyself / Scott-King Coast
- Repo: mysterycartel-hub/mystermyself
- Domain: mystermyself.com
- CEO: Maurice Scott
- Memory anchor: docs/MEMORY-BLOCKS.md

## Operating Rules

1. Maurice is CEO only. He gives vision, approves PRs, and makes decisions. He does NOT code, use terminal, or run commands.
2. Do not ask Maurice to use PowerShell, GitHub CLI, npm, git, or any terminal commands.
3. Kiro builds only inside the current repo. Do not create new repos or Vercel projects.
4. Do not start over. Continue from current state. Read docs/MEMORY-BLOCKS.md for context.
5. Diagnose before building. Run audits first.
6. Use GitHub PRs for all changes that go to production.
7. Keep reports in plain English for CEO consumption.
8. Preserve canon: all districts, characters, and brands are locked unless Maurice approves changes.
9. No fake social links. Unknown links go to /follow-the-coast or show "Coming Soon".
10. No forced subscriptions. Capture is opt-in only.
11. No paid AI keys (OpenAI, Anthropic) required for core functionality.
12. Demo data for all features when real data isn't available.
13. All public routes must load without errors.

## Role System

| Role | Owner |
|------|-------|
| CEO vision + approvals | Maurice |
| Command center + review | ChatGPT |
| Repo builder + PR handoff | Kiro |
| Source of truth | GitHub |
| Production deploy | Vercel |
| Auth/data | Supabase |
| Newsletter/capture | Beehiiv |

## Workflow (Every Phase)
1. Kiro syncs to main
2. Kiro runs `npm run ops:audit-all`
3. Kiro runs `npm run build`
4. Kiro diagnoses and returns CEO report
5. CEO approves scope
6. Kiro builds on feature branch
7. Kiro pushes branch + provides PR link
8. ChatGPT reviews
9. Maurice merges (click only)

## Canon (Do Not Invent)
- Main brand: MysterMyself
- World: Scott-King Coast
- Districts: Route Harbor, Market Marina, Flavor District, Blueprint Bay, Creator Pier, Legacy Point, Fantasy Island, Library Vault
- Characters: Trading Chef, Candle Kid, Wickie, Louie Liquidity, Chef Goldie, Grandma Market, Nana Value, Melissa Mayhem, Melody Mayhem

## Automation Commands
- `npm run ops:audit-all` — Run all audits and generate CEO report
- `npm run ops:audit-routes` — Check route files exist
- `npm run ops:audit-links` — Scan for broken/placeholder links
- `npm run ops:audit-socials` — Verify social link integrity
- `npm run ops:audit-canon` — Check canon representation
- `npm run ops:audit-funnels` — Check funnel completeness
- `npm run ops:ceo-report` — Generate CEO summary

## Red Gates (Always Ask Maurice)
- git push to main
- Vercel production deploy
- Stripe/Supabase/Beehiiv live changes
- File deletion
- Canon changes
- New paid services

## Completed Phases (Do Not Redo)
- OPS/001 — Source of truth audit
- OPS/002 — Vercel production connection audit
- OPS/003 — Production Safe Mode
- OPS/004 — Automation Control Layer
- OPS/004A — Link and Social Cleanup
