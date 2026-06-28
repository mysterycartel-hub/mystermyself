# MysterMyself Subagent Team

## What This Is

A team of specialized AI subagents that Kiro dispatches to handle different types of work across your 5 business frames. Instead of one agent trying to do everything, each subagent is an expert in one domain.

## How It Works

```
Maurice says what he wants
    ↓
Kiro (orchestrator) reads the request
    ↓
Kiro dispatches to the right subagent
    ↓
Subagent executes within its lane
    ↓
Kiro commits, pushes, PRs
    ↓
Maurice says GO → merged
```

## The Team

| Agent | Lane | What It Does |
|-------|------|------|
| **builder** | Code | Writes React/Next.js components, pages, APIs, fixes bugs |
| **content** | Writing | Scripts, hooks, CTAs, ebooks, newsletter copy, Chef Lingo |
| **design** | UI/UX | Tailwind styling, layout upgrades, responsive fixes, animations |
| **ops** | DevOps | Audits, build fixes, git ops, PR management, deploy verification |
| **strategy** | Planning | Specs, roadmaps, architecture decisions, funnel planning |
| **canon-guard** | Quality | Brand compliance checks, character/district validation, lingo enforcement |

## How Maurice Uses It

Just tell Kiro what you want. Kiro routes to the right agent automatically:

- "Build me a new page for the courier lab" → **builder**
- "Write 5 YouTube hooks for trading content" → **content**
- "Make the dashboard look cleaner" → **design**
- "Fix the build and push it" → **ops**
- "Plan out the subscription system" → **strategy**
- "Check if the site follows brand rules" → **canon-guard**

You never need to name the agent. Just describe what you want.

## Files

```
.kiro/agents/
├── README.md           ← You're reading this
├── builder.md          ← Code execution agent
├── content.md          ← Content writing agent
├── design.md           ← UI/UX design agent
├── ops.md              ← Operations/DevOps agent
├── strategy.md         ← Planning/architecture agent
└── canon-guard.md      ← Brand compliance agent
```
