# MysterMyself — AI Build Operating Plan

**Date**: June 20, 2026
**Version**: 1.0
**Status**: Active

---

## Overview

This document defines how the MysterMyself / Scott-King Coast project is built using a coordinated AI system. The goal is to reduce manual input from Maurice (the founder) while maintaining full control over critical decisions.

The system operates on a **mission-driven autonomous loop** where Maurice provides direction at key gates, and AI agents execute everything between those gates without interruption.

---

## Operating Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  1. MISSION ASSIGNMENT                                          │
│     Maurice (or ChatGPT on Maurice's behalf) defines the goal   │
│     Examples: "Build the subscriber onboarding flow"            │
│               "Add district interest tracking"                  │
│               "Create the Phase 1 Terraform skeleton"           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. SPEC + TASK GENERATION (Kiro)                               │
│     - Read existing docs and code                               │
│     - Generate requirements spec                                │
│     - Generate task list with dependencies                      │
│     - Validate against canon and build rules                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. LOCAL EXECUTION (Kiro + Claude Code)                        │
│     - Kiro handles file creation, scaffolds, docs, small edits  │
│     - Claude Code handles heavy refactors and multi-file builds │
│     - All work is local-only (no deploy, no push)               │
│     - Green actions execute without asking                      │
│     - Yellow actions summarize before executing                 │
│     - Red actions STOP and wait for Maurice                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. VALIDATION                                                  │
│     - Run build (npm run build)                                 │
│     - Run typecheck (tsc --noEmit)                              │
│     - Run lint (npm run lint)                                   │
│     - Verify git status matches expected changes                │
│     - Local commit with descriptive message                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. AWS SAFETY CHECK (if applicable)                            │
│     - Verify no forbidden services used                         │
│     - Verify no hardcoded secrets                               │
│     - Verify terraform plan output (not apply)                  │
│     - Verify least-privilege IAM policies                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. APPROVAL GATE (Maurice)                                     │
│     - Summary of all changes                                    │
│     - List of risks                                             │
│     - List of next commands requiring approval                  │
│     - Maurice says GO or HOLD                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. DEPLOY (only after explicit approval)                       │
│     - git push to feature branch                                │
│     - Vercel preview deploy (automatic on push)                 │
│     - terraform apply (if infrastructure changes)               │
│     - Vercel production promote (manual)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## How Maurice Interacts Less Often

### Before (manual mode)
Maurice had to approve every file, every edit, every commit, every idea.

### After (autonomous mode)
Maurice only interacts at these moments:

1. **Start of a phase** — "Go ahead with Phase 2" or "Build the subscriber flow"
2. **Red gate reached** — System stops and asks (deploy, push, AWS create, delete)
3. **Phase complete** — System reports what was done, what's next
4. **Canon question** — If a decision requires brand/story knowledge Maurice hasn't documented

### What Maurice should NOT need to do:
- Approve individual file reads
- Approve documentation creation
- Approve local scaffolds
- Approve build/lint/typecheck runs
- Approve git status checks
- Approve spec generation
- Approve task list creation

---

## Decision Authority

| Decision Type | Who Decides |
|---------------|-------------|
| Brand strategy, canon, messaging | ChatGPT (Library) + Maurice |
| Technical spec and architecture | Kiro |
| Code implementation | Kiro + Claude Code |
| Infrastructure safety | AWS Advisor + Kiro |
| Deploy/push/apply | Maurice (explicit approval) |
| Delete anything | Maurice (explicit approval) |
| New paid services | Maurice (explicit approval) |

---

## Session Continuity

Each Kiro session should:
1. Read `docs/KIRO_AUTONOMOUS_TASK_QUEUE.md` to know current phase
2. Read `.kiro/steering/autonomous-build-rules.md` for operating rules
3. Read `.kiro/steering/mystermyself-canon.md` for locked canon
4. Pick up where the last session left off
5. Work until a red gate is hit or the phase is complete
6. Commit locally and report status
