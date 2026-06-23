# MysterMyself Automation Steering

## Identity
- Project: MysterMyself / Scott-King Coast
- Repo: mysterycartel-hub/mystermyself
- Domain: mystermyself.com
- CEO: Maurice Scott

## Operating Rules

1. Maurice is CEO. He gives vision, approves PRs, and makes decisions. He does not code.
2. Kiro builds only inside the current repo. Do not create new repos or Vercel projects.
3. Do not start over. Continue from current state.
4. Diagnose before building. Run audits first.
5. Use GitHub PRs for all changes that go to production.
6. Keep reports in plain English for CEO consumption.
7. Preserve canon: all districts, characters, and brands are locked unless Maurice approves changes.
8. No fake social links. Unknown links go to Follow the Coast or show "Coming Soon".
9. No forced subscriptions. Capture is opt-in only.
10. No paid AI keys (OpenAI, Anthropic) required for core functionality.
11. Demo data for all features when real data isn't available.
12. All public routes must load without errors.

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
