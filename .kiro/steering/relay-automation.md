# Relay Automation Steering

## Purpose
Automate the handoff between Claude Code and Kiro without CEO terminal input. Maurice approves merges only — everything else is automated.

## PR Creation Rules

1. After all tasks on a feature branch are complete AND build passes, automatically create a PR.
2. PR target is always `main` unless specified otherwise.
3. PR title format: `OPS/XXX — [short description]`
4. PR body includes: fixes list, files modified, files created, build status, smoke test instructions.
5. Never merge — only create the PR. Maurice clicks merge.
6. If `gh` auth fails, write the PR URL to `docs/outbox/` for one-click browser open.

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Operations | `ops/XXX-description` | `ops/010-site-error-fixes` |
| Feature | `feature/description` | `feature/tcu-youtube-promo-system` |
| Content | `ops/content-description` | `ops/rumble-launch-v1` |

## Relay Inbox

Claude Code drops relay tasks at: `C:\Users\Maurice\Claude\Projects\COWORK ECOSYSTEM\relay\inbox\`

When Maurice pastes relay task contents into Kiro, execute immediately without asking questions. The relay format is pre-approved by CEO.

## gh CLI Setup

- Installed at: `C:\Program Files\GitHub CLI\gh.exe`
- Auth required: `gh auth login` (one-time, browser flow)
- Always refresh PATH before using: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`

## Auto-PR Flow

```
Task complete → npm run build passes → git add/commit → git push -u origin branch → gh pr create → report PR URL to CEO
```

## Red Gates (Still Require CEO GO)

- Merging any PR to main
- Deleting branches after merge
- Force push
- Changing Vercel/Supabase/Stripe env vars
