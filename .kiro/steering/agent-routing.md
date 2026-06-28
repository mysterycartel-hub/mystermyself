# Agent Routing — Subagent Team Dispatch

## Purpose
Route CEO requests to the correct subagent based on intent. Maurice never names an agent — he just says what he wants and the system routes.

## Routing Rules

### → Builder Agent (.kiro/agents/builder.md)
**Triggers:** build, create page, add component, new route, fix bug, API endpoint, implement, code
**Examples:**
- "Build me a new page for the courier lab"
- "Add a checkout flow to the pricing page"
- "Fix the broken dashboard component"
- "Implement the subscription system"

### → Content Agent (.kiro/agents/content.md)
**Triggers:** write, script, hooks, CTA, copy, newsletter, ebook, lesson, captions, lingo
**Examples:**
- "Write 5 YouTube hooks for trading content"
- "Create the next episode script"
- "Write newsletter copy for this week"
- "Generate lesson content for Wick Work"

### → Design Agent (.kiro/agents/design.md)
**Triggers:** design, layout, style, look, feel, animation, responsive, mobile, clean up UI, polish
**Examples:**
- "Make the dashboard look cleaner"
- "Fix the mobile layout on the homepage"
- "Add animations to the district cards"
- "Apply the Emergent layout vision"

### → Ops Agent (.kiro/agents/ops.md)
**Triggers:** fix build, audit, deploy, push, PR, merge, git, error, broken, cache, performance
**Examples:**
- "Fix the build and push it"
- "Run a full audit"
- "Create a PR for this work"
- "The deploy failed — fix it"

### → Strategy Agent (.kiro/agents/strategy.md)
**Triggers:** plan, spec, roadmap, architecture, design system, funnel, pricing, what should we build
**Examples:**
- "Plan out the subscription system"
- "Write a spec for the capture engine"
- "What should we build next?"
- "Map the funnel from landing to purchase"

### → Canon Guard Agent (.kiro/agents/canon-guard.md)
**Triggers:** check brand, verify canon, compliance, audit brand, before merge
**Examples:**
- "Check if the site follows brand rules"
- "Verify this PR is brand compliant"
- "Run canon check before merge"

## Multi-Agent Workflows

Some tasks need multiple agents in sequence:

### Feature Build (full lifecycle)
1. **Strategy** → writes spec
2. **Builder** → implements code
3. **Design** → polishes UI
4. **Canon Guard** → validates compliance
5. **Ops** → pushes PR

### Content Production
1. **Content** → writes scripts/copy
2. **Canon Guard** → validates brand compliance
3. **Ops** → commits and pushes

### Bug Fix
1. **Ops** → diagnoses the issue
2. **Builder** → fixes the code
3. **Ops** → verifies build + pushes PR

### Layout Upgrade
1. **Strategy** → plans the structure
2. **Design** → creates the visual approach
3. **Builder** → implements
4. **Canon Guard** → validates
5. **Ops** → PR + deploy

## CEO Commands That Trigger Routing

| Maurice Says | Routes To |
|---|---|
| "GO" | Ops (merge) |
| "build [thing]" | Builder |
| "write [thing]" | Content |
| "make it look [adjective]" | Design |
| "fix [thing]" | Ops → Builder |
| "plan [thing]" | Strategy |
| "check [thing]" | Canon Guard |
| "audit" | Ops |
| "what's next" | Strategy |
| "start" / "brief me" | CEO-START skill (session init) |
