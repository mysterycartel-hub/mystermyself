# GitHub Control Plane — CEO Guide

**Purpose**: Maurice does not judge code. Maurice approves business outcomes. GitHub handles code quality automatically.

---

## How It Works

```
1. Kiro builds on a feature branch
         │
         ▼
2. Kiro pushes branch → GitHub creates PR automatically
         │
         ▼
3. GitHub runs PR Quality Gate (automatic):
   - Installs dependencies
   - Runs all audits (routes, links, socials, canon, funnels)
   - Runs production build
   - Checks for placeholder URLs
   - Checks canon files exist
         │
         ▼
4. If checks PASS → PR shows green checkmarks ✅
   If checks FAIL → PR shows red X ❌ (Kiro must fix before merge)
         │
         ▼
5. Maurice reviews the CEO Summary in the PR description:
   - What changed (plain English)
   - Routes affected
   - Funnel changes
   - Audit results
   - External blockers
         │
         ▼
6. Maurice's decision:
   Option A: Add label "ceo-approved" → GitHub auto-merges → Vercel deploys
   Option B: Comment "request changes" → Kiro fixes and updates the PR
         │
         ▼
7. After merge, Vercel auto-deploys to mystermyself.com
```

---

## What Maurice Does

| Action | How |
|--------|-----|
| Review a PR | Read the CEO Summary section at the top |
| Approve and deploy | Add the label `ceo-approved` to the PR |
| Request changes | Write a comment describing what you want different |
| Submit a build request | Create a new issue using the "CEO Build Request" template |

---

## What Maurice Does NOT Do

- Read or judge code
- Run terminal commands
- Install tools
- Manually merge PRs (the label triggers auto-merge)
- Debug build failures (Kiro handles this)
- Manage GitHub settings after initial setup

---

## What GitHub Does Automatically

| Event | Automation |
|-------|-----------|
| PR opened | Quality Gate runs (audits + build) |
| Checks pass + `ceo-approved` label | Auto-merge via squash |
| PR title has WIP/BLOCKED/DO-NOT-MERGE | Auto-merge blocked |
| Draft PR | Auto-merge blocked |
| Fork PR | Auto-merge blocked |

---

## One-Time GitHub Settings (Do Once)

These settings need to be enabled once in the GitHub repository settings:

1. **Settings → General → Pull Requests**:
   - ✅ Allow squash merging
   - ✅ Allow auto-merge
   - ☐ Optionally disable merge commits (cleaner history)

2. **Settings → Branches → Branch Protection Rules** (for `main`):
   - ✅ Require status checks to pass before merging
   - Add required check: `quality-gate` (the job name from pr-quality-gate.yml)
   - ✅ Require branches to be up to date before merging

3. **Settings → Actions → General**:
   - ✅ Allow GitHub Actions to create and approve pull requests
   - ✅ Read and write permissions

4. **Create the `ceo-approved` label**:
   - Go to Issues → Labels → New Label
   - Name: `ceo-approved`
   - Color: `#22C55E` (green)
   - Description: "CEO has approved this PR for production merge"

---

## Label Reference

| Label | Meaning |
|-------|---------|
| `ceo-approved` | Maurice approved → triggers auto-merge |
| `ceo-request` | Maurice submitted a build request |
| `needs-triage` | Needs to be picked up by Kiro |
| `wip` | Work in progress — do not merge |

---

## Security

- CODEOWNERS file requires `@mysterycartel-hub` approval for all files
- Canon files (data/canon/, .kiro/steering/) have extra protection
- Fork PRs cannot auto-merge
- Draft PRs cannot auto-merge
- Failed checks block all merges
