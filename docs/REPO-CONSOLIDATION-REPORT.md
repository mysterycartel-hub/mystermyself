# Repository Consolidation Report

This document summarizes the consolidation of 4 repositories from the `mysterycartel-hub` GitHub organization into a single monorepo (`mystermyself`). The goal is to centralize all tools, documentation, prompts, and legacy assets alongside the production Next.js site, eliminating scattered repos and making everything discoverable in one place.

---

## TOOLS

Things that can generate content.

| Tool | Location | Description |
|------|----------|-------------|
| Remotion Video Engine | `tools/trading-chef-studio/` | React + Remotion video rendering engine with 2 compositions: **TradingChefFVG** (Fair Value Gap explainer) and **TradingChefShort** (short-form trade recap) |
| TradingView Pine Script | `scripts/trading-chef/trading_chef_xauusd_v1.pine` | Custom Pine Script indicator for XAUUSD chart analysis |

---

## DOCS

Reference documentation and build bibles.

| Document | Location |
|----------|----------|
| Brand rules + gstack skills reference | `tools/trading-chef-studio/CLAUDE.md` |
| Mystermyself source of truth | `docs/archive/tcu-terminal-legacy/_build-bibles/mystermyself-source-of-truth.md` |
| TCU Terminal master build bible | `docs/archive/tcu-terminal-legacy/_build-bibles/tcu-terminal-master-build-bible.md` |
| TCU asset manifest | `docs/archive/tcu-terminal-legacy/tcu-asset-manifest.md` |
| TCU visual reference map | `docs/archive/tcu-terminal-legacy/tcu-visual-reference-map.md` |
| AI content ecosystem architecture | `docs/archive/tcu-terminal-legacy/ai-content-ecosystem-architecture.md` |

---

## PROMPTS

AI system prompts and agent rules.

| Prompt | Location | Purpose |
|--------|----------|---------|
| Trading Chef Claude prompt | `scripts/trading-chef/trading_chef_claude_prompt.md` | AI chart analysis system prompt |
| Master prompt | `docs/archive/tcu-terminal-legacy/MASTER_PROMPT.md` | Original TCU terminal master system prompt |
| TCU agent rules | `docs/archive/tcu-terminal-legacy/tcu-agent-rules.md` | Agent behavior rules for TCU terminal |
| Remotion ecosystem architect | `docs/archive/tcu-terminal-legacy/chatgpt-remotion-ecosystem-architect.md` | ChatGPT prompt for Remotion video pipeline architecture |

---

## ARCHIVE

Legacy code and documentation superseded by the current mystermyself build. Preserved for historical reference.

| File | Location |
|------|----------|
| TCU character canon | `docs/archive/tcu-terminal-legacy/tcu-character-canon.md` |
| TCU feature priority | `docs/archive/tcu-terminal-legacy/tcu-feature-priority.md` |
| TCU terminal to video factory | `docs/archive/tcu-terminal-legacy/tcu-terminal-to-video-factory.md` |
| Master inventory notes | `docs/archive/tcu-terminal-legacy/master-inventory-notes.md` |
| Agent blockers | `docs/archive/tcu-terminal-legacy/AGENT_BLOCKERS.md` |
| Kiro log | `docs/archive/tcu-terminal-legacy/KIRO_LOG.md` |
| Environment validation script | `docs/archive/tcu-terminal-legacy/scripts/validate-env.js` |

> **Note:** The `-tcu-market-kitchen-terminal` repository was empty (contained only a `.git` folder with no files) and was discarded.

---

## Source Repos

| Repository | Disposition |
|------------|-------------|
| `mystermyself` | Production site (this repo). All consolidation targets here. |
| `tcu-market-kitchen-terminal` | Docs archived to `docs/archive/tcu-terminal-legacy/`. Code already rebuilt in mystermyself. |
| `trading-chef-studio` | Engine copied to `tools/trading-chef-studio/`, scripts to `scripts/trading-chef/`. |
| `-tcu-market-kitchen-terminal` | Empty/dead repo. Discarded. |
