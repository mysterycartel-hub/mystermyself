# TCU SOURCE OF TRUTH
**Trading Chef University — MysterMyself Platform**
Last updated: 2026-06-15 · Build: 63 routes · Status: LAUNCH-READY

---

## TABLE OF CONTENTS

1. [Routes](#routes)
2. [Characters](#characters)
3. [CharacterTriggerEngine](#charactertriggerengine)
4. [MissionEngine](#missionengine)
5. [XPRewardEngine](#xprewardengine)
6. [Passport Architecture](#passport-architecture)
7. [Academy Architecture](#academy-architecture)
8. [Theater Architecture](#theater-architecture)
9. [Daily Quest Architecture](#daily-quest-architecture)
10. [Market Kitchen Architecture](#market-kitchen-architecture)
11. [Environment Variables](#environment-variables)
12. [Database Schema](#database-schema)
13. [Launch Checklist](#launch-checklist)

---

## ROUTES

### Public Routes (Static)
| Route | File | Component | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Home | Landing page |
| `/coast` | `app/coast/page.tsx` | CoastMap | V2 district map |
| `/academy` | `app/academy/page.tsx` | AcademyDashboard | Curriculum hub |
| `/academy/[lesson]` | `app/academy/[lesson]/page.tsx` | LessonTemplate | SSG — 13 lesson pages |
| `/kitchen` | `app/kitchen/page.tsx` | MarketKitchen | TradingView shell |
| `/kitchen-rush` | `app/kitchen-rush/page.tsx` | KitchenRushPage | Recognition trainer |
| `/tcu-theater` | `app/tcu-theater/page.tsx` | TCUTheaterPage | Video + XP sync |
| `/crown-method` | `app/crown-method/page.tsx` | CrownMethodPage | Premium TCU module |
| `/passport` | `app/passport/page.tsx` | PassportPage | Auth-gated dashboard |
| `/passport/login` | `app/passport/login/page.tsx` | PassportLoginPage | Magic link login |
| `/passport/[username]` | `app/passport/[username]/page.tsx` | PublicProfile | Dynamic SSR |
| `/market-marina` | `app/market-marina/page.tsx` | MarketMarinaPage | District hub |
| `/market-marina/tcu-sound-identity` | `app/market-marina/tcu-sound-identity/page.jsx` | TCUSoundIdentitySystem | Sound identity |
| `/playbooks` | `app/playbooks/page.tsx` | PlaybooksPage | — |
| `/trading-chef` | `app/trading-chef/page.tsx` | TradingChefPage | — |
| `/trading-chef-university` | `app/trading-chef-university/page.tsx` | TCULandingPage | Dynamic |
| `/route-harbor` | `app/route-harbor/page.tsx` | RouteHarborPage | — |

### API Routes (Dynamic)
| Route | File | Auth | Purpose |
|---|---|---|---|
| `POST /api/passport/register` | `app/api/passport/register/route.ts` | Bearer token | Create passport_profiles row |
| `POST /api/passport/xp` | `app/api/passport/xp/route.ts` | Bearer token | Write XP event + update total |
| `POST /api/passport/stamp` | `app/api/passport/stamp/route.ts` | Bearer token | Award district stamp |
| `GET /api/passport/status` | `app/api/passport/status/route.ts` | Bearer token | Read full passport |
| `POST /api/coach` | `app/api/coach/route.ts` | Bearer token | SSE AI Coach stream |
| `POST /api/checkout` | `app/api/checkout/route.ts` | None | Stripe — DISABLED, returns placeholder |

### Route That Does NOT Exist
- `/dashboard` — does not exist. `/passport` is the authenticated user dashboard.

---

## CHARACTERS

### Canon Lock: 10 characters only. No additions.

#### Coach Characters (7) — fire from positive lifecycle events
| ID | Name | Title | Emoji | Color | Fires From |
|---|---|---|---|---|---|
| `trading-chef` | Trading Chef | Master Mentor | 👑 | `#C9A84C` | lesson-complete, level-complete, journal-complete |
| `chef-goldie` | Chef Goldie | Execution | 👨‍🍳 | `#C9A84C` | lesson-complete |
| `wickie` | Wickie | Candles | 📍 | `#A855F7` | — |
| `louie-liquidity` | Louie Liquidity | Liquidity | 🌊 | `#3B82F6` | — |
| `rico-rhythm` | Rico Rhythm | Sessions | ⏰ | `#8B5CF6` | — |
| `penny-stacks` | Penny Stacks | Risk | 💰 | `#10B981` | practice-complete |
| `mr-stocks` | Mr. Stocks | Ownership | 📈 | `#0EA5E9` | — |

#### Warning/Alert Characters (3) — fire from behavioral states
| ID | Name | Title | Emoji | Color | Triggers |
|---|---|---|---|---|---|
| `melissa-mayhem` | Melissa Mayhem | FOMO · Overconfidence · Rule Breaking · Revenge · Emotional Entries | ⚡ | `#EC4899` | fomo-keyword, risk-exceeded, lesson-jumped, revenge-keyword, practice-skipped |
| `melody-mayhem` | Melody Mayhem | Fear · Hesitation · Confidence Recovery · Discipline · Emotional Control | 🎭 | `#F59E0B` | hesitation-keyword, confidence-drop, burn-point-moved |
| `burn-alarm` | Burn Alarm | Rule Violations | 🔔 | `#EF4444` | burn-point-moved, risk-exceeded, step-skipped |

### Character Rules
- Characters fire from **behavior** — not from lesson assignment
- Lessons include `character:` and optional `warningCharacter:` fields as coaching display only
- The actual interrupt/toast mechanism is always `CharacterTriggerEngine` or `MissionEngine`
- DO NOT create new characters
- `TCUCharacter` type in `lib/character-trigger-engine.ts` is the single union of all 10 IDs

---

## CHARACTERTRIGGERENGINE

**File:** `lib/character-trigger-engine.ts`

### What it does
Single event dispatcher for all TCU character firing. Separates trigger logic from UI rendering.

### Public API
```typescript
CharacterTriggerEngine.fire(eventType, extra?)
// → dispatches 'tcu-trigger' CustomEvent
// → consumed by CharacterInterrupt.tsx

CharacterTriggerEngine.fireForCharacter(character, eventType, extra?)
// → same as fire() — character targeting is UI-side via getTrigger()

CharacterTriggerEngine.analyzeText(text, context)
// → scans for Melissa keywords → dispatches Melissa trigger
// → scans for Melody keywords → dispatches Melody trigger
// context: 'practice' | 'journal' | 'coach-chat'
// Called from: MissionEngine.onPracticeComplete(), MissionEngine.onReflectionSave()

CharacterTriggerEngine.fireBurnAlarm(state, extra?)
// BurnAlarmState: 'no-burn-point' | 'oversized-risk' | 'stop-manipulation' | 'forced-entry'

CharacterTriggerEngine.fireMelissaState(state, extra?)
// MelissaState: 'fomo' | 'overconfidence' | 'rule-breaking' | 'revenge' | 'emotional-entry'

CharacterTriggerEngine.fireMelodyState(state, extra?)
// MelodyState: 'fear' | 'hesitation' | 'confidence-gap' | 'emotional-overwhelm' | 'early-exit'

CharacterTriggerEngine.fireCoachCue(event)
// event: 'lesson-complete' | 'level-complete' | 'practice-complete' | 'journal-complete'
// → dispatches 'tcu-coach-cue' CustomEvent
// → consumed by CharacterInterrupt.tsx coach toast
```

### Keyword Banks
- **Melissa (FOMO):** 'missing', 'miss it', 'fomo', 'catch it', 'already moved', ...
- **Melissa (Revenge):** 'get it back', 'make it back', 'revenge', 'double down', ...
- **Melissa (Overconfidence):** 'sure thing', 'guaranteed', 'easy money', ...
- **Melody (Fear):** 'scared', 'afraid', 'nervous', 'worried', ...
- **Melody (Hesitation):** 'not sure', 'maybe i should wait', 'second guess', ...
- **Melody (Overwhelm):** 'too much', 'give up', 'impossible', 'confused', ...
- **Melody (Early Exit):** 'exit early', 'scared of losing my profit', ...

### CustomEvents
| Event Name | Dispatched By | Consumed By |
|---|---|---|
| `tcu-trigger` | `dispatchTrigger()` in `lib/triggers.ts` | `CharacterInterrupt.tsx` |
| `tcu-coach-cue` | `CharacterTriggerEngine.fireCoachCue()` | `CharacterInterrupt.tsx` (coach toast) |

### UI Consumer
`components/triggers/CharacterInterrupt.tsx`
- Listens for `tcu-trigger` → renders interrupt panel (Melissa/Melody/Burn Alarm)
- Listens for `tcu-coach-cue` → renders coach toast (bottom-left, auto-dismiss)
- Coach toast uses `CoachCue` interface: `{ character, message, quote, autoDismissMs }`

---

## MISSIONENGINE

**File:** `lib/mission-engine.ts`

### What it does
Single lifecycle orchestrator for the lesson flow. Components call MissionEngine — never raw progression/quest/XP functions directly.

### Lesson Lifecycle
```
Student opens lesson → MissionEngine.onLessonView(lessonId)
  → markLessonViewed()       [progression.ts]
  → completeQuestForLesson() [quests.ts — 'view-lesson']
  → fireCoachCue('level-complete') if level just completed
  → XPRewardEngine.onLevelComplete() if applicable

Student clicks "I Did It" → MissionEngine.onPracticeComplete(lessonId, submittedText?)
  → analyzeText() for Melissa/Melody states [character-trigger-engine.ts]
  → markPracticeComplete()    [progression.ts]
  → fireCoachCue('practice-complete')
  → completeQuestForLesson() [quests.ts — 'complete-practice']
  → XPRewardEngine.onLevelComplete() if applicable

Student saves journal → MissionEngine.onReflectionSave(lessonId, xpAmount, journalAnswers?)
  → analyzeText() for Melissa/Melody states
  → markJournalSaved()        [progression.ts]
  → XPRewardEngine.awardXP()  [local XP]
  → fireCoachCue('journal-complete')
  → completeQuestForLesson() [quests.ts — 'save-journal']
  → fireCoachCue('level-complete') + XPRewardEngine.onLevelComplete() if applicable

Student tries locked lesson → MissionEngine.onLockedAccess(lessonId)
  → fireMelissaState('rule-breaking')
```

### Level Unlock Logic
- Lesson completes when: `viewed && practiceComplete && journalSaved`
- Level completes when: ALL lessons in the level are complete
- Next level unlocks: automatically on level complete
- Level 0 is always unlocked; Level 1–9 require sequential completion

---

## XPREWARDENGINE

**File:** `lib/xp-reward-engine.ts`

### Two XP Systems — do not confuse
| System | Storage | Controls |
|---|---|---|
| **Curriculum XP** | `localStorage: tcu_progression_v1` → `data.totalXP` | `XPRewardEngine.awardXP()` |
| **Passport XP** | Supabase `passport_xp_events` + `passport_profiles.xp` | `POST /api/passport/xp` |

Curriculum XP is always local. Passport XP requires auth.

### Curriculum XP Ranks (display only, do not gate content)
| XP | Rank Label |
|---|---|
| 0–999 | Kitchen Recruit |
| 1000–2499 | Prep Cook |
| 2500–4999 | Line Cook |
| 5000–7499 | Senior Chef |
| 7500–9999 | Master Chef |
| 10000+ | Legendary Chef |

Formula: `rank = Math.floor(totalXP / 100) + 1`

### Badges (Local — `localStorage: tcu_badges_v1`)
| Badge ID | Name | Trigger | XP Bonus |
|---|---|---|---|
| `first-step` | First Step | Level 0 complete | 25 |
| `candle-reader` | Candle Reader | Level 1 complete | 50 |
| `structure-student` | Structure Student | Level 2 complete | 75 |
| `flow-finder` | Flow Finder | Level 3 complete | 100 |
| `aoi-analyst` | AOI Analyst | Level 4 complete | 100 |
| `delivery-reader` | Delivery Reader | Level 5 complete | 125 |
| `confirmed` | Confirmed | Level 6 complete | 125 |
| `the-pass` | The Pass | Level 7 complete | 150 |
| `tables-served` | Tables Served | Level 8 complete | 150 |
| `head-chef` | Head Chef | Level 9 complete | 500 |
| `daily-100` | Century Day | 100+ XP in one day | 50 |
| `streak-3` | 3-Day Streak | 3-day activity streak | 30 |
| `streak-7` | Weekly Habit | 7-day streak | 100 |
| `rush-runner` | Rush Runner | First Kitchen Rush complete | 50 |
| `recipe-runner` | Recipe Runner | Full 8-step Recipe run | 100 |
| `journal-habit` | Journal Habit | 10 journal entries saved | 75 |
| `no-setup-discipline` | No Setup Discipline | "No Setup Today" identified 3×  | 100 |

### XPRewardEngine Public API
```typescript
XPRewardEngine.awardXP(amount, source, lessonId?)  // → updates totalXP in localStorage
XPRewardEngine.onLevelComplete(level)               // → awards level badge + bonus XP
XPRewardEngine.awardBadge(badgeId)                 // → idempotent badge award
XPRewardEngine.onJournalSaved()                    // → increments count, awards at 10
XPRewardEngine.onNoSetupIdentified()               // → increments count, awards at 3
XPRewardEngine.getEarnedBadges()                   // → all badges with timestamps
XPRewardEngine.hasBadge(badgeId)                   // → boolean
XPRewardEngine.getTotalXP()                        // → current totalXP from localStorage
XPRewardEngine.getRank(totalXP)                    // → rank number
XPRewardEngine.getRankLabel(rank)                  // → display string
```

---

## PASSPORT ARCHITECTURE

### Auth Flow
```
User visits /passport/login
  → enters email → supabase.auth.signInWithOtp()
  → Supabase sends magic link email
  → User clicks link → redirected back to /passport
  → supabase.auth.onAuthStateChange() fires with session
  → session.access_token used as Bearer in all /api/passport/* calls
```

### Passport API Write Paths
```
First login → POST /api/passport/register
  → validateToken(token) → supabase.auth.getUser(token)  [service role]
  → getOrCreatePassport(userId)
  → INSERT passport_profiles ON CONFLICT (user_id) DO NOTHING

XP Award → POST /api/passport/xp  { amount, eventType, eventRef, description }
  → validateToken()
  → INSERT passport_xp_events
  → RPC increment_passport_xp(userId, amount)
    → UPDATE passport_profiles SET xp = xp + amount
    → UPDATE level based on new xp total

District Stamp → POST /api/passport/stamp  { districtId, districtName }
  → validateToken()
  → INSERT passport_stamps ON CONFLICT (user_id, district_id) DO NOTHING

Full Passport Read → GET /api/passport/status
  → validateToken()
  → getFullPassport(userId)
  → SELECT from: profiles + stamps + badges + missions + xp_events
```

### Passport Rank Thresholds (Supabase)
| XP | Rank |
|---|---|
| 0 | Recruit |
| 250 | Navigator |
| 750 | Explorer |
| 1,500 | Captain |
| 3,000 | Admiral |
| 6,000 | Legend |

### Supabase Clients
- **Browser client** (`getSupabaseClient()`): uses `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Server client** (`createServerClient()`): uses `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, no session persistence

### Key Files
| File | Purpose |
|---|---|
| `lib/supabase.ts` | Client factory — lazy singletons |
| `lib/passport-db.ts` | All DB operations (service role) |
| `lib/passport.ts` | XP thresholds, badge definitions, mission definitions |
| `app/passport/page.tsx` | Auth listener + PassportDashboard mount |
| `app/passport/login/page.tsx` | Magic link form |
| `components/passport/PassportDashboard.tsx` | Authenticated passport UI |

---

## ACADEMY ARCHITECTURE

### Curriculum Lock
10 levels, sequential. Cannot skip. Cannot unlock out of order.

| Level | Name | Lesson IDs | Lessons |
|---|---|---|---|
| 0 | Market Child | `market-child` | 1 |
| 1 | Candle Kitchen | `candles`, `wicks` | 2 |
| 2 | Structure Kitchen | `structure` | 1 |
| 3 | Flow Kitchen | `bias`, `flow` | 2 |
| 4 | AOI Kitchen | `aoi` | 1 |
| 5 | Delivery Kitchen | `delivery` | 1 |
| 6 | Confirmation Kitchen | `confirmation` | 1 |
| 7 | The Pass | `risk`, `the-pass` | 2 |
| 8 | Tables Served | `tables-served` | 1 |
| 9 | Head Chef | `kitchen-rush` | 1 |

**Total: 13 lesson pages** (may expand, but gating never changes)

### Lesson Completion Gate (all three required)
1. `viewed: true` — student opened lesson page
2. `practiceComplete: true` — student clicked "I Did It"
3. `journalSaved: true` — student saved all journal prompts

### localStorage Keys
| Key | Contents |
|---|---|
| `tcu_progression_v1` | `UserProgressData` — levels, lesson records, totalXP |
| `tcu_badges_v1` | `BadgeData` — earned badges + journal/no-setup counters |
| `tcu_quests_v1` | `QuestProgress` — today's completed/dismissed quest IDs |
| `tcu_theater_watched` | Array of watched video IDs |
| `tcu_journal_${lessonId}` | Saved journal answers per lesson |

### Key Files
| File | Purpose |
|---|---|
| `lib/academy.ts` | All lesson data + character definitions + interfaces |
| `lib/progression.ts` | Level gating, lesson completion, localStorage reads/writes |
| `lib/mission-engine.ts` | Lifecycle orchestrator |
| `app/academy/page.tsx` | Academy hub |
| `app/academy/[lesson]/page.tsx` | SSG lesson page |
| `components/tcu/LessonTemplate.tsx` | Lesson renderer |

### TCU Canon Terminology
| TCU Term | Market Equivalent |
|---|---|
| Bias | Directional read (bullish/bearish/neutral) |
| Flow | Liquidity |
| AOI | Area of Interest |
| Delivery | Price delivery from AOI |
| Confirmation | Entry confirmation (micro-BOS or wick rejection) |
| The Pass | Entry (The Recipe final step) |
| Tables Served | Profit targets |
| Burn Point | Stop loss |
| The Recipe | Full 8-step trade setup process |
| Kitchen Is Open | Session open |
| BOS | Break of Structure |
| CHOCH | Change of Character |
| HH/HL | Higher High / Higher Low (bullish structure) |
| LH/LL | Lower High / Lower Low (bearish structure) |
| Leftover Container | Fair Value Gap (FVG) |

### Safety Constraints (permanent)
- Do not use fake win rates
- Do not promise profits
- Do not create signals
- Never output signals or win rates
- Never encourage gambling
- AI Coach enforces these in system prompt

---

## THEATER ARCHITECTURE

**File:** `app/tcu-theater/page.tsx`

### Video Storage
- Watched video IDs stored in `localStorage: tcu_theater_watched`
- Theater unlock is **narrative only** — does not affect curriculum gating

### On Video Watched (`handleMarkWatched`)
```typescript
// 1. Save to localStorage
saveWatched([...watched, video.id])

// 2. Award local XP
XPRewardEngine.awardXP(video.xpAward, 'theater-watch', video.id)

// 3. Fire coach cue
CharacterTriggerEngine.fireCoachCue('lesson-complete')

// 4. Sync to Supabase (auth-gated, silent-fail)
fetch('/api/passport/xp', { POST, Bearer token,
  body: { amount: video.xpAward, eventType: 'theater-watch',
          eventRef: video.id, description: `Watched: ${video.title}` }
})
```

### Theater vs Academy
- Theater XP → Supabase passport total
- Academy lesson XP → local `tcu_progression_v1` totalXP only
- Both can optionally sync to Supabase via `/api/passport/xp` when authenticated

---

## DAILY QUEST ARCHITECTURE

**File:** `lib/quests.ts` · **UI:** `components/quests/DailyQuestBoard.tsx`

### Quest Storage
- Key: `tcu_quests_v1`
- Structure: `{ date: 'YYYY-MM-DD', completed: string[], dismissed: string[] }`
- Resets at midnight local time (date mismatch = fresh start)

### Quest Types
```typescript
type QuestType =
  | 'view-lesson'        // open a lesson page
  | 'complete-practice'  // click "I Did It"
  | 'save-journal'       // save all journal prompts
  | 'run-rush-scenario'  // complete a Kitchen Rush scenario
  | 'read-recipe-step'   // read a specific recipe step
  | 'visit-kitchen'      // open Market Kitchen
  | 'visit-passport'     // open Passport page
  | 'identify-character' // character quiz
```

### Quest ID Pattern
Quest IDs follow the pattern: `q-{action}-{targetId}` (e.g., `q-read-market-child`, `q-candles-practice`)

**Critical:** Quest IDs are NOT auto-generated. `MissionEngine` calls `completeQuestForLesson(lessonId, type)` which looks up by `targetId + type`. The `id` field in `DAILY_QUESTS` is the canonical identifier.

### Active Quest Selection
```typescript
getActiveQuests(currentLevel, maxDaily = 3)
// → filters by: level <= currentLevel, maxLevel >= currentLevel (if set)
// → excludes completed and dismissed for today
// → sorts by proximity to currentLevel
// → returns first maxDaily quests
```

### Auto-Completion from MissionEngine
```typescript
// On lesson view:
completeQuestForLesson(lessonId, 'view-lesson')

// On practice complete:
completeQuestForLesson(lessonId, 'complete-practice')

// On journal save:
completeQuestForLesson(lessonId, 'save-journal')
```

### DailyQuestBoard
- Mounted on `/passport` page (always visible, no auth required)
- Shows up to 3 active quests
- Daily XP bar capped at 200
- Honor-system Done/Skip buttons

---

## MARKET KITCHEN ARCHITECTURE

**File:** `app/kitchen/page.tsx`

### Current Status
Market Kitchen is a **TradingView embed shell** — the live charting workspace. It is not an educational component; it is the simulation environment.

### Kitchen Rush
**File:** `app/kitchen-rush/page.tsx`

Standalone recognition trainer — time-pressured scenario practice.

#### Phases
`browse → countdown → active → revealed`

#### Scenario Types
| Type | Description |
|---|---|
| `identify` | Multiple choice: identify a pattern/term from a scenario description |
| `decision` | Multiple choice: what to do next (The Recipe step) |
| `journal` | Text entry: typed response, `analyzeText()` fires on submit |
| `risk-check` | Number entry: risk/position math, compares to `scenario.correctAnswer` |

#### Choice Coloring on Reveal
- Green = correct answer
- Pink = trap choice (`isTrap: true`)
- Amber = hesitation/common mistake (`isHesitation: true`)

#### On Reveal
```typescript
XPRewardEngine.awardXP(scenario.xpReward, 'kitchen-rush', scenario.id)
XPRewardEngine.awardBadge('rush-runner')  // first time only — idempotent
CharacterTriggerEngine.fireCoachCue('practice-complete')
```

#### Scenario Level Filtering
Scenarios are filtered by `getCurrentLevel(loadProgress())` — students only see scenarios at or below their current curriculum level.

---

## ENVIRONMENT VARIABLES

```bash
# REQUIRED — Supabase (Passport auth + all DB writes)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# REQUIRED — Anthropic (AI Coach at /api/coach)
ANTHROPIC_API_KEY=sk-ant-...

# OPTIONAL — Stripe (all Stripe code currently DISABLED)
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
# STRIPE_PRICE_GOLD_PLAYBOOK=price_...
# STRIPE_PRICE_TCU_MEMBERSHIP=price_...
# STRIPE_PRICE_COURIER_STARTER=price_...
# STRIPE_PRICE_FOOD_POPUP=price_...
# STRIPE_PRICE_FANTASY_DRAFT_BIBLE=price_...
# STRIPE_PRICE_AI_OPERATOR=price_...

# OPTIONAL — Site URL (Supabase redirect URLs)
# NEXT_PUBLIC_SITE_URL=https://mystermyself.com
```

### Behavior Without Env Vars
| Missing Var | Effect |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Auth fails silently; site still loads; no Passport features |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | All `/api/passport/*` return 500 |
| `ANTHROPIC_API_KEY` | `/api/coach` returns 503; AI Coach panel shows "offline" |

### AI Coach Model
`claude-haiku-4-5-20251001` — fast, cost-efficient, enforces TCU Canon + safety constraints via system prompt

---

## DATABASE SCHEMA

Run once in Supabase SQL Editor:

```sql
-- ── passport_profiles ────────────────────────────────────────────────────────
-- NOTE: columns are 'xp' and 'level' — NOT 'total_xp' and 'rank'
create table if not exists passport_profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references auth.users(id) on delete cascade,
  username     text unique,
  display_name text,
  avatar_url   text,
  bio          text,
  xp           integer not null default 0,
  level        text    not null default 'Recruit',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists passport_profiles_user_id_idx on passport_profiles(user_id);
create index if not exists passport_profiles_username_idx on passport_profiles(username);

-- ── passport_xp_events ───────────────────────────────────────────────────────
-- NOTE: column is 'xp_amount' — NOT 'amount'
create table if not exists passport_xp_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  xp_amount   integer not null,
  event_type  text    not null,
  event_ref   text,
  description text,
  created_at  timestamptz not null default now()
);
create index if not exists passport_xp_events_user_id_idx    on passport_xp_events(user_id);
create index if not exists passport_xp_events_created_at_idx on passport_xp_events(created_at desc);

-- ── passport_stamps ──────────────────────────────────────────────────────────
-- NOTE: column is 'stamp_code' — NOT 'stamp_image_url'
create table if not exists passport_stamps (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  district_id   text not null,
  district_name text,
  stamp_code    text,
  earned_at     timestamptz not null default now(),
  unique(user_id, district_id)
);
create index if not exists passport_stamps_user_id_idx on passport_stamps(user_id);

-- ── passport_badges ──────────────────────────────────────────────────────────
create table if not exists passport_badges (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  badge_id        text not null,
  badge_name      text,
  badge_icon      text,
  earned_at       timestamptz not null default now(),
  unique(user_id, badge_id)
);
create index if not exists passport_badges_user_id_idx on passport_badges(user_id);

-- ── passport_missions ────────────────────────────────────────────────────────
create table if not exists passport_missions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  mission_id      text not null,
  completed_at    timestamptz not null default now(),
  unique(user_id, mission_id)
);
create index if not exists passport_missions_user_id_idx on passport_missions(user_id);

-- ── RPC: increment_passport_xp ───────────────────────────────────────────────
-- Updates 'xp' and 'level' columns (NOT 'total_xp' / 'rank')
create or replace function increment_passport_xp(p_user_id uuid, p_amount integer)
returns void language plpgsql security definer as $$
declare
  new_xp    integer;
  new_level text;
begin
  update passport_profiles
  set xp = xp + p_amount, updated_at = now()
  where user_id = p_user_id
  returning xp into new_xp;

  new_level := case
    when new_xp >= 6000 then 'Legend'
    when new_xp >= 3000 then 'Admiral'
    when new_xp >= 1500 then 'Captain'
    when new_xp >= 750  then 'Explorer'
    when new_xp >= 250  then 'Navigator'
    else 'Recruit'
  end;

  update passport_profiles set level = new_level, updated_at = now()
  where user_id = p_user_id;
end;
$$;

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table passport_profiles  enable row level security;
alter table passport_xp_events enable row level security;
alter table passport_stamps    enable row level security;
alter table passport_badges    enable row level security;
alter table passport_missions  enable row level security;

create policy "Service role full access to profiles"   on passport_profiles  for all using (auth.role() = 'service_role');
create policy "Public can read profiles"               on passport_profiles  for select using (true);
create policy "Service role full access to xp events"  on passport_xp_events for all using (auth.role() = 'service_role');
create policy "Users can read own xp events"           on passport_xp_events for select using (auth.uid() = user_id);
create policy "Service role full access to stamps"     on passport_stamps    for all using (auth.role() = 'service_role');
create policy "Users can read own stamps"              on passport_stamps    for select using (auth.uid() = user_id);
create policy "Service role full access to badges"     on passport_badges    for all using (auth.role() = 'service_role');
create policy "Users can read own badges"              on passport_badges    for select using (auth.uid() = user_id);
create policy "Service role full access to missions"   on passport_missions  for all using (auth.role() = 'service_role');
create policy "Users can read own missions"            on passport_missions  for select using (auth.uid() = user_id);
```

---

## LAUNCH CHECKLIST

### One-Time Setup (do before first user)
- [ ] Run full SQL schema above in Supabase SQL Editor
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` to Vercel env vars (Production)
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel env vars (Production)
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel env vars (Production)
- [ ] Add `ANTHROPIC_API_KEY` to Vercel env vars (Production)
- [ ] Enable Email magic link in Supabase Auth settings
- [ ] Set Supabase Site URL to production domain
- [ ] Add production domain to Supabase Auth redirect URLs

### Verify Before Announcing
- [ ] `/passport/login` → enter email → magic link received → `/passport` loads authenticated
- [ ] `passport_profiles` row created on first login
- [ ] Complete one academy lesson → `passport_xp_events` row appears in Supabase
- [ ] Watch one theater video while logged in → XP sync confirmed
- [ ] AI Coach chat returns response (not 503)
- [ ] Kitchen Rush completes → `rush-runner` badge in localStorage

### What Is Disabled at Launch
- Stripe / checkout — returns placeholder, no errors
- Market Kitchen live trading — TradingView embed only, no order execution

### Build Status
- Build: 63 routes, 0 errors, 0 warnings
- Last clean commit: `336285cf`
- Branch: `main` — up to date with `origin/main`
- Vercel autodeploys from `main`

### TCU Finalization Mode Rules
- Framework phase: COMPLETE
- Implementation phase only
- No new characters
- No new levels (10 levels are locked: 0–9)
- No new pages
- No new districts
- No new navigation
- Wire existing architecture — do not create new systems
