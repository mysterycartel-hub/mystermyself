# AI AGENT ARCHITECTURE
**MysterMyself — Current AI Implementation + Future Agent Routing**
Last updated: 2026-06-15

---

## TABLE OF CONTENTS

1. [Current AI Implementation](#current-ai-implementation)
2. [Trading Agent](#trading-agent)
3. [Fantasy Agent](#fantasy-agent)
4. [Courier Agent](#courier-agent)
5. [Creator Agent](#creator-agent)
6. [Opportunity Agent](#opportunity-agent)
7. [Future AI Routing Architecture](#future-ai-routing-architecture)

---

## CURRENT AI IMPLEMENTATION

### What Is Live Today
One AI endpoint is live:

**`POST /api/coach`** — TCU AI Coach
- **Model:** `claude-haiku-4-5-20251001`
- **Mode:** Streaming SSE (text/plain chunked transfer)
- **Auth:** Bearer token (Supabase session)
- **Requires:** `ANTHROPIC_API_KEY` env var — returns 503 without it
- **System prompt:** Built by `buildCoachSystemPrompt()` in `lib/kitchen.ts`
- **User prompt:** Built by `buildCoachUserPrompt(symbol, timeframe)` in `lib/kitchen.ts`

### AI Coach Constraints (enforced in system prompt)
```
- Never output trading signals
- Never state win rates or success percentages
- Never promise profitability
- Never encourage overtrading
- Respond only in TCU canon language (Bias, Flow, AOI, Delivery, Confirmation, The Pass, etc.)
- Operate within the Trading Chef University framework at all times
- This is educational simulation only
```

### AI Coach Context Window
The coach receives: symbol (default XAUUSD), timeframe (default 1H), and the full TCU system prompt. It does not receive chart data, candle values, or real-time price — it coaches on methodology and psychology.

---

## TRADING AGENT

### Role
The Trading Agent serves **Market Marina** — TCU methodology, XAUUSD analysis coaching, and recipe adherence.

### Current Implementation
**Status: Live (partial)** — `POST /api/coach`

The current AI Coach is the foundation of the Trading Agent. It operates within the TCU curriculum and fires from:
- Market Kitchen (`/kitchen`) — symbol/timeframe context
- Academy lesson journal prompts — text analysis
- Kitchen Rush — reveal coaching cues

### Planned Expansion
| Capability | Status | Notes |
|---|---|---|
| TCU Recipe coaching | ✅ Live | System prompt enforces Recipe framework |
| Symbol-specific analysis | ✅ Live | Accepts `symbol` + `timeframe` params |
| Journal text analysis | ✅ Live (local) | `CharacterTriggerEngine.analyzeText()` — client-side |
| Character voice mode | 🔒 Planned | Switch between Trading Chef / Chef Goldie / Wickie persona |
| Session-aware coaching | 🔒 Planned | Add market session context (London/NY/Tokyo) |
| Multi-turn conversation | 🔒 Planned | Add `messages[]` history to API call |

### Trading Agent System Prompt Shape
```
You are the Trading Chef AI Coach, part of the Trading Chef University.
You speak only in TCU canon language.
You do not provide signals. You do not state win rates.
You coach the student through The Recipe: Bias → Flow → AOI → Delivery → Confirmation → The Pass → Tables Served.
Current symbol: {symbol}. Current timeframe: {timeframe}.
```

### Safety Constraints (permanent, non-negotiable)
- No signals
- No win rates
- No profit promises
- No gambling encouragement
- No real-time price data

---

## FANTASY AGENT

### Role
The Fantasy Agent serves **Fantasy Island** — draft strategy, sleeper analysis, matchup coaching, and rankings reasoning.

### Current Implementation
**Status: Not built**

### Planned Capabilities
| Capability | Priority | Notes |
|---|---|---|
| Draft pick coaching | High | "Should I take RB or WR here?" |
| Sleeper analysis | High | "Is [player] worth a late-round pick?" |
| Matchup breakdown | Medium | "Who has the better start/sit this week?" |
| Waiver wire guidance | Medium | "Top available players at my position?" |
| Trade analysis | Medium | "Is this trade fair for my roster?" |
| Dynasty advice | Low | Long-term player value reasoning |

### Planned API Route
`POST /api/fantasy-agent`

### Fantasy Agent System Prompt Shape (planned)
```
You are the Fantasy Draft Bible AI Coach.
You specialize in fantasy football — NFL only.
You help players make smarter draft and in-season decisions.
You do not guarantee outcomes. All fantasy is probabilistic.
Context: {format}, {scoring_type}, {roster_needs}, {draft_position}
```

### Fantasy Agent Safety Constraints
- No gambling advice (distinguish between paid fantasy leagues and DFS gambling)
- No guarantees of player performance
- Disclose uncertainty on all projections

---

## COURIER AGENT

### Role
The Courier Agent serves **Route Harbor** — logistics income planning, route math, vehicle strategy, and medical courier operations.

### Current Implementation
**Status: Not built**

### Planned Capabilities
| Capability | Priority | Notes |
|---|---|---|
| Route math calculator | High | Revenue per mile, cost-per-mile, breakeven |
| Medical courier guidance | High | How to get certified, find accounts |
| Vehicle selection advice | Medium | Cost analysis: owned vs. leased |
| Multi-route scaling | Medium | When to add a second route/driver |
| Contract acquisition | Medium | How to pitch medical facilities |
| Income projection | Medium | Based on route type and hours |

### Planned API Route
`POST /api/courier-agent`

### Courier Agent System Prompt Shape (planned)
```
You are the Route Harbor Logistics Coach.
You help operators build income through courier and delivery routes.
You specialize in: medical specimen courier, contract delivery, Amazon DSP, route acquisition.
You provide operational math and strategy — not guarantees.
Context: {route_type}, {vehicle}, {state}, {hours_available}
```

---

## CREATOR AGENT

### Role
The Creator Agent serves **Creator Pier** — AI workflow design, content strategy, prompt engineering, and automation systems.

### Current Implementation
**Status: Not built**

### Planned Capabilities
| Capability | Priority | Notes |
|---|---|---|
| Content calendar generation | High | Generate weekly content plans |
| Prompt library builder | High | Custom prompts for creator's niche |
| AI workflow design | High | Claude + ChatGPT + automation stack |
| Caption and hook writing | Medium | Platform-specific content generation |
| Repurposing strategies | Medium | One piece → multiple formats |
| Monetization path advice | Medium | Which platforms, which products first |

### Planned API Route
`POST /api/creator-agent`

### Creator Agent System Prompt Shape (planned)
```
You are the Creator Pier AI Business Coach.
You help creators and entrepreneurs build AI-powered content systems.
You specialize in: Claude workflows, ChatGPT prompt libraries, content automation, and digital product creation.
You do not create content for the user — you help them build systems to create content consistently.
Context: {niche}, {platform}, {goal}, {experience_level}
```

---

## OPPORTUNITY AGENT

### Role
The Opportunity Agent is a cross-district income discovery tool — it listens to the user's situation and routes them to the most relevant income lane in the Scott-King Coast ecosystem.

### Current Implementation
**Status: Not built**

### Concept
A user describes their situation: time available, skills, capital, risk tolerance, location constraints. The Opportunity Agent analyzes and recommends the best district to start in — and the first three steps.

```
User: "I have a car, 20 hours a week, $500 saved, and I need income within 60 days."
Agent: "Route Harbor. Medical courier income. Here's your 60-day plan..."

User: "I have a phone and free time. I know football really well."
Agent: "Fantasy Island. Fantasy Draft Bible. Here's how to monetize it..."

User: "I trade on weekends but keep losing. I don't understand why."
Agent: "Market Marina. TCU Academy Level 0. Your losses are curriculum, not bad luck."
```

### Planned Capabilities
| Capability | Priority | Notes |
|---|---|---|
| Income lane matching | High | Situation → best district |
| 30/60/90 day plan | High | First steps per recommendation |
| District deep-link routing | High | Route user to correct page |
| Follow-up prompting | Medium | Clarify constraints to improve match |
| Multi-lane awareness | Medium | "You could do both courier AND trading" |

### Planned API Route
`POST /api/opportunity-agent`

### Opportunity Agent System Prompt Shape (planned)
```
You are the Opportunity Agent for the Scott-King Coast ecosystem.
You have knowledge of 9 income districts: Market Marina (trading), Route Harbor (logistics),
Fantasy Island (fantasy sports), Flavor District (food business), Blueprint Bay (playbooks),
Creator Pier (AI content), Legacy Point (TCU Academy), Library Vault (free resources), Founder Island (brand).

When a user describes their situation, you:
1. Identify the most viable income lane given their constraints
2. Recommend the specific district
3. Give them 3 concrete first steps
4. Link them to the right page on mystermyself.com

You do not guarantee income. You do not suggest illegal activity. You route toward legitimate income systems.
```

---

## FUTURE AI ROUTING ARCHITECTURE

### The Agent Hub Pattern
When multiple agents are live, a routing layer (Agent Hub) determines which agent handles each request.

```
User Request
    ↓
POST /api/agent (Agent Hub)
    ↓
Intent Classification (lightweight model or keyword matching)
    ├── "trading" / "market" / "gold"    → Trading Agent
    ├── "fantasy" / "draft" / "NFL"      → Fantasy Agent
    ├── "courier" / "route" / "delivery" → Courier Agent
    ├── "content" / "AI" / "workflow"    → Creator Agent
    └── "income" / "start" / "help"      → Opportunity Agent
    ↓
Selected Agent API (POST /api/[agent])
    ↓
Streamed Response → Client
```

### Implementation Options

#### Option A: Keyword Routing (fast, cheap)
```typescript
function routeRequest(message: string): AgentType {
  const lower = message.toLowerCase()
  if (['xauusd','gold','bias','flow','candle'].some(k => lower.includes(k))) return 'trading'
  if (['fantasy','draft','nfl','player'].some(k => lower.includes(k))) return 'fantasy'
  if (['courier','route','medical','delivery'].some(k => lower.includes(k))) return 'courier'
  if (['content','ai','workflow','prompt'].some(k => lower.includes(k))) return 'creator'
  return 'opportunity'  // default
}
```

#### Option B: Claude-Powered Intent Classification (slower, more accurate)
```typescript
// First call: classify intent using claude-haiku-4-5 with tool use
// Second call: invoke classified agent with full context
// Cost: 2 API calls per request, but dramatically better routing
```

### Agent-to-District Mapping
| Agent | District | Route | Passport Stamp |
|---|---|---|---|
| Trading Agent | Market Marina / Legacy Point | `/api/coach` | GOLD / LEGACY |
| Fantasy Agent | Fantasy Island | `/api/fantasy-agent` | FANTASY |
| Courier Agent | Route Harbor | `/api/courier-agent` | ROUTE |
| Creator Agent | Creator Pier | `/api/creator-agent` | CREATOR |
| Opportunity Agent | All Districts | `/api/opportunity-agent` | — |

### Agent Response Format (standard)
All agents should return structured responses:
```typescript
interface AgentResponse {
  agent: AgentType
  district: string
  message: string          // streamed text
  suggestedLinks?: string[]  // relevant site pages
  characterCue?: string      // fire a CharacterTriggerEngine event
}
```

### Build Order (when expanding)
1. **Trading Agent** — already live as `/api/coach`; expand with persona + multi-turn
2. **Opportunity Agent** — highest cross-district value; routes users to all other agents
3. **Fantasy Agent** — seasonal spike in usage; Fantasy Island needs it
4. **Courier Agent** — high intent, clear use case
5. **Creator Agent** — meta: helps creators build the content that feeds all funnels

### Platform Integration Points
| Component | Current Agent | Future Agent |
|---|---|---|
| Market Kitchen | Trading Agent (`/api/coach`) | Trading Agent (expanded) |
| Kitchen Rush reveal | None | Trading Agent coaching cue |
| Academy journal prompts | `CharacterTriggerEngine` (local) | Trading Agent (cloud analysis) |
| Passport onboarding | None | Opportunity Agent |
| Home page chat widget | None | Opportunity Agent |
| Creator Pier page | None | Creator Agent |
| Fantasy Island page | None | Fantasy Agent |
| Route Harbor page | None | Courier Agent |

### Anthropic Model Selection Per Agent
| Agent | Model | Reason |
|---|---|---|
| Trading Agent | `claude-haiku-4-5-20251001` | Fast, low-cost for coaching Q&A |
| Opportunity Agent | `claude-sonnet-4-6` | Better reasoning for complex routing |
| Fantasy Agent | `claude-haiku-4-5-20251001` | Volume-heavy in-season queries |
| Courier Agent | `claude-haiku-4-5-20251001` | Factual operational math |
| Creator Agent | `claude-sonnet-4-6` | Creative strategy requires stronger model |
