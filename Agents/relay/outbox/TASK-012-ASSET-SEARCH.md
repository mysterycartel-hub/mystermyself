# TASK-012 — Asset Search Report

**FROM:** Kiro
**TO:** COWORK / Maurice
**DATE:** 2026-06-25
**STATUS:** CANNOT EXECUTE — Sandbox limitation

---

## Situation

Kiro runs in a cloud sandbox environment at `/projects/sandbox/`. This environment does **not** have access to Maurice's local Windows filesystem (`C:\Users\Maurice\...`).

The following paths were requested for search but are **unreachable from this sandbox**:
- `C:\Users\Maurice\Downloads\`
- `C:\Users\Maurice\Pictures\`
- `C:\Users\Maurice\Desktop\`
- `C:\Users\Maurice\Claude\Projects\COWORK ECOSYSTEM\`
- `C:\Users\Maurice\Downloads\mystermyself\`

---

## What Kiro Built Instead

All components use a **premium placeholder system** (`TCUAvatarPlaceholder.tsx`) that:
1. Renders character emoji + accent color ring + initial in Bebas Neue
2. Looks intentional and premium (not cheap placeholder-y)
3. **Automatically swaps to real PNG** when file exists at `/public/characters/{id}.png`

This means: **drop the PNG → it displays. No code change needed.**

---

## CEO Action Required

Maurice must copy character PNGs to the repo's `/public/characters/` directory using these canonical filenames:

| Character | Expected Filename |
|---|---|
| Trading Chef | `trading-chef.png` |
| Trading Chef (hero) | `trading-chef-hero.png` |
| Candle Kid | `candle-kid.png` |
| Wickie | `wickie.png` |
| Louie Liquidity | `louie-liquidity.png` |
| Chef Goldie | `chef-goldie.png` |
| Grandma Market | `grandma-market.png` |
| Nana Value | `nana-value.png` |
| Melissa Mayhem | `melissa-mayhem.png` |
| Melody Mayhem | `melody-mayhem.png` |

### How to do it (Windows):

```powershell
# 1. Find the files
dir C:\Users\Maurice\Downloads\ -Recurse | Where-Object { $_.Name -match "trading-chef|candle-kid|wickie|louie|goldie|grandma|nana|melissa|melody|tcu|character" }

# 2. Copy to repo (adjust source paths)
$dest = "C:\Users\Maurice\Downloads\mystermyself\public\characters\"
mkdir $dest -Force
Copy-Item "C:\path\to\trading-chef.png" "$dest\trading-chef.png"
# ... repeat for each character

# 3. Git add and push
cd C:\Users\Maurice\Downloads\mystermyself
git add public/characters/
git commit -m "art: add TCU character PNGs"
git push
```

Or: use Claude Desktop / Cowork (which has local file access) to search and copy.

---

## Characters With No Asset (all — using placeholders)

| Character | Placeholder Active | PNG Expected |
|---|---|---|
| Trading Chef | ✅ Premium placeholder | `trading-chef.png` |
| Candle Kid | ✅ Premium placeholder | `candle-kid.png` |
| Wickie | ✅ Premium placeholder | `wickie.png` |
| Louie Liquidity | ✅ Premium placeholder | `louie-liquidity.png` |
| Chef Goldie | ✅ Premium placeholder | `chef-goldie.png` |
| Grandma Market | ✅ Premium placeholder | `grandma-market.png` |
| Nana Value | ✅ Premium placeholder | `nana-value.png` |
| Melissa Mayhem | ✅ Premium placeholder | `melissa-mayhem.png` |
| Melody Mayhem | ✅ Premium placeholder | `melody-mayhem.png` |

All 9 characters will display premium placeholders until PNGs are dropped in.
