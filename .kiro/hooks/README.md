# Kiro Hooks — MysterMyself Automation

## Planned Hooks

### After Code Change (fileEdited)
- Run `npm run ops:audit-all`
- Run `npm run build`
- Summarize results

### Before PR (preToolUse — write)
- Generate CEO report
- Check no duplicate project references
- Check no OpenAI/Anthropic requirement added

### After Deployment (userTriggered)
- Verify Vercel production ready
- Remind CEO to test live site
- Run site audit against production URL

## Hook Configuration

Hooks are defined in `.kiro/hooks/` as JSON files following the Kiro hook schema:

```json
{
  "name": "Hook Name",
  "version": "1.0.0",
  "description": "What the hook does",
  "when": {
    "type": "fileEdited | userTriggered | preToolUse | postToolUse",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "askAgent | runCommand",
    "prompt": "instruction for askAgent",
    "command": "command for runCommand"
  }
}
```

## Current Status

Hooks are documented here for future implementation. Exact hook files will be created once the automation scripts are validated and the workflow is stable.
