# Kiro Hooks — MysterMyself Autopilot Layer

These hooks automate the build workflow so Maurice does not need to repeat prompts.

## Active Hooks

| Hook | Trigger | Action |
|------|---------|--------|
| `memory-load.json` | Before task execution | Reminds Kiro to read memory blocks and canon data |
| `scope-guard.json` | Before write operations | Validates change belongs to current spec and respects canon rules |
| `post-edit-audit.json` | After code file edits | Runs `npm run ops:audit-all` automatically |
| `post-task-build.json` | After task completion | Runs `npm run build` to catch breakage |
| `ceo-report.json` | When agent session ends | Generates a CEO-ready summary report |

## What This Means for Maurice

Maurice gives a mission once. Kiro picks up from specs + hooks automatically:
1. Memory is loaded (no context drift)
2. Scope is enforced (no rogue changes)
3. Audits run after edits (no broken links slip through)
4. Build runs after tasks (no deploy failures)
5. CEO report generated at end (no asking "what happened?")

## Hook Schema

Each hook is a JSON file following this structure:
```json
{
  "name": "Hook Name",
  "version": "1.0.0",
  "description": "What this hook does",
  "when": {
    "type": "eventType",
    "patterns": ["optional file patterns"],
    "toolTypes": ["optional tool categories"]
  },
  "then": {
    "type": "askAgent or runCommand",
    "prompt": "for askAgent",
    "command": "for runCommand"
  }
}
```

## Event Types Used
- `preTaskExecution` — before a spec task starts
- `postTaskExecution` — after a spec task completes
- `preToolUse` — before a tool (write, shell, etc.) is used
- `fileEdited` — when a code file is saved
- `agentStop` — when the agent session ends
