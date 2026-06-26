# CEO-START v3.0 — ACTIVE SKILL REGISTRATION

## Status: ACTIVE
## Installed: 2026-06-26
## Location: `.kiro/skills/ceo-start/SKILL.md`

---

## Trigger Commands

Any agent (Kiro, Claude, Cowork) encountering these triggers should load and follow the CEO-START v3 skill:

| Trigger | Action |
|---------|--------|
| `start` | Load skill → run session start protocol |
| `go` | Load skill → run session start protocol |
| `brief me` | Load skill → deliver CEO brief |
| `CEO brief` | Load skill → deliver CEO brief |
| `what did Kiro do` | Load skill → summarize recent outbox reports |
| `audit the system` | Load skill → run full audit protocol |
| `check the builds` | Load skill → run build check + deploy status |
| `what's live` | Load skill → report production status |
| Screenshot/error attachment | Load skill → diagnose from image |

---

## Relay Contract

- **Kiro** reads this file to confirm active skill version before executing.
- **Claude** reads this file to confirm routing table is v3.
- **Cowork** reads this file to confirm platform wall protocol.

## Skill Reference

Full specification: `.kiro/skills/ceo-start/SKILL.md`

## System Identity

**MYSTERYCARTEL CEO SYSTEM — v3.0**

Maurice gives direction. The system executes.
Platform walls get one paste, not a task list.
