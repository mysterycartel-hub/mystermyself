# GitHub Owner Setup Checklist

**Purpose**: One-time settings so the automation system works without Maurice doing code tasks.

After completing this checklist, Kiro branches auto-create PRs, GitHub checks quality automatically, and Maurice only adds a label to deploy.

---

## Step 1: Enable Auto-Merge

1. Go to: https://github.com/mysterycartel-hub/mystermyself/settings
2. Scroll to **Pull Requests** section
3. Check: ✅ **Allow auto-merge**
4. Check: ✅ **Allow squash merging**
5. Optional: Uncheck "Allow merge commits" for cleaner history

---

## Step 2: Allow GitHub Actions to Create PRs

1. Go to: https://github.com/mysterycartel-hub/mystermyself/settings/actions
2. Scroll to **Workflow permissions**
3. Select: ✅ **Read and write permissions**
4. Check: ✅ **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

---

## Step 3: Create the `ceo-approved` Label

1. Go to: https://github.com/mysterycartel-hub/mystermyself/labels
2. Click **New label**
3. Name: `ceo-approved`
4. Description: `CEO has approved this PR for production merge`
5. Color: `#22C55E` (green)
6. Click **Create label**

---

## Step 4: Branch Protection (Optional but Recommended)

1. Go to: https://github.com/mysterycartel-hub/mystermyself/settings/branches
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Check: ✅ **Require status checks to pass before merging**
5. Add required check: search for `quality-gate` (this is the job from pr-quality-gate.yml)
6. Check: ✅ **Require branches to be up to date before merging**
7. Click **Create**

---

## How It Works After Setup

```
Kiro pushes ops/* branch
        │
        ▼
GitHub Action auto-opens PR (with audit + build results)
        │
        ▼
PR Quality Gate runs (audits + build must pass)
        │
        ▼
Maurice sees PR in GitHub with CEO summary
        │
        ▼
Maurice adds "ceo-approved" label
        │
        ▼
GitHub auto-merges (squash)
        │
        ▼
Vercel auto-deploys to mystermyself.com
```

---

## Verification

After completing all steps, the system is verified when:
- [ ] A pushed `ops/*` branch auto-creates a PR
- [ ] The PR shows the Quality Gate check running
- [ ] Adding `ceo-approved` label triggers auto-merge
- [ ] Vercel deploys after merge

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| PR not auto-created | Check Actions permissions (Step 2) |
| `ceo-approved` label doesn't merge | Check branch protection (Step 4) — ensure `quality-gate` is the required check name |
| Workflow not triggering | The `auto-open-pr.yml` must be on `main` branch (it is ✅) |
| Quality Gate fails | Kiro must fix the branch before it can merge |
