# TCU Character Canon — Locked Reference

**Status:** LOCKED. Do not add, rename, or modify characters without CEO approval.  
**Source of Truth:** `data/tcu-character-canon.ts`  
**Last Updated:** 2026-06-25

---

## Canon Rules

1. **9 characters only.** No additions. No inventions. No "temporary" characters.
2. **BANNED names:** Penny, Rico Rhythm, Burn Alarm, Profit Plate (as characters). Never use these.
3. **All character data imports from** `data/tcu-character-canon.ts` — never hardcode character info in components.
4. **Art direction:** Urban cartoon style. See `docs/VISUAL-CANON.md` for full specs.
5. **Characters are not mascots.** Each one teaches a specific market concept through the chef/kitchen metaphor.

---

## The 9 Canon Characters

| # | ID | Name | Role | Color | Emoji |
|---|---|---|---|---|---|
| 1 | `trading-chef` | Trading Chef | Lead Mentor · Market Kitchen Guide | `#c9a84c` | 👨‍🍳 |
| 2 | `candle-kid` | Candle Kid | Pattern Reader · Candle Analyst | `#A855F7` | 🕯️ |
| 3 | `wickie` | Wickie | Wick Hunter · Rejection Specialist | `#EF4444` | 🎯 |
| 4 | `louie-liquidity` | Louie Liquidity | Flow King · Sweep Master | `#3B82F6` | 🌊 |
| 5 | `chef-goldie` | Chef Goldie | Gold Specialist · XAUUSD Expert | `#c9a84c` | ✨ |
| 6 | `grandma-market` | Grandma Market | Structure Elder · Patience Teacher | `#7a6230` | 🧓 |
| 7 | `nana-value` | Nana Value | Gap Finder · Value Zone Specialist | `#22C55E` | 💎 |
| 8 | `melissa-mayhem` | Melissa Mayhem | Volatility Expert · Chaos Teacher | `#F97316` | ⚡ |
| 9 | `melody-mayhem` | Melody Mayhem | Rhythm Trader · Session Timer | `#EC4899` | 🎵 |

---

## Character Quotes (Short)

| Character | Quote |
|---|---|
| Trading Chef | "The kitchen is open." |
| Candle Kid | "Every candle tells a story." |
| Wickie | "Wicks don't lie. They just move fast." |
| Louie Liquidity | "Follow the liquidity. That's where price is going." |
| Chef Goldie | "XAUUSD is the main dish. He cooks it daily." |
| Grandma Market | "She's seen every cycle. She doesn't panic." |
| Nana Value | "Fair value gaps are her love language." |
| Melissa Mayhem | "News hits. Volatility spikes. She's ready." |
| Melody Mayhem | "Price has a rhythm. She hears it." |

---

## Asset Injection

Character PNGs go in `/public/characters/{id}.png`. When the file exists, the `TCUAvatarPlaceholder` component auto-displays it — no code change needed.

Expected files:
```
public/characters/trading-chef.png
public/characters/trading-chef-hero.png
public/characters/candle-kid.png
public/characters/wickie.png
public/characters/louie-liquidity.png
public/characters/chef-goldie.png
public/characters/grandma-market.png
public/characters/nana-value.png
public/characters/melissa-mayhem.png
public/characters/melody-mayhem.png
```

Art direction: Urban cartoon. Transparent background PNG. Min 200x200 for avatars, 800x600 for hero images.

---

## Where Characters Appear

| Route | Components Used |
|---|---|
| `/` (homepage) | TradingChefSpotlight, TCUCharacterCanonStrip |
| `/market-marina` | TradingChefSpotlight, TCUCharacterCanonStrip, CharacterCoachCards |
| `/opportunity-list` | TCUCharacterCanonStrip (compact) |
| `/welcome` | TCUCharacterCanonStrip (subset: candle-kid, wickie, louie) when lane=trading |
| `/dashboard` | Trading Chef Next Step widget when lane=TCU |
| `/coast/market-marina` | TCUCharacterCanonStrip (compact) |
