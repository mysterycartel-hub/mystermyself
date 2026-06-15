// ── Daily Quest Engine ────────────────────────────────────────────────────────
// Quests are tied to the user's current level.
// They reset daily at midnight local time.
// Completing quests awards XP and can award passport badges.
// Quests do not repeat on the same day — once dismissed, they're done for the day.

import { ACADEMY_MODULES } from './academy'

export type QuestType =
  | 'view-lesson'
  | 'complete-practice'
  | 'save-journal'
  | 'run-rush-scenario'
  | 'read-recipe-step'
  | 'visit-kitchen'
  | 'visit-passport'
  | 'identify-character'

export interface DailyQuest {
  id: string
  level: number            // available at this level and above
  maxLevel?: number        // not available above this level
  type: QuestType
  title: string
  description: string
  xpReward: number
  badgeId?: string         // optional passport badge awarded on completion
  targetId?: string        // lessonId, scenarioId, etc.
  characterNote?: {
    character: 'trading-chef' | 'chef-goldie' | 'melody' | 'melissa' | 'burn-alarm'
    note: string
  }
}

export interface QuestProgress {
  date: string             // YYYY-MM-DD
  completed: string[]      // quest IDs completed today
  dismissed: string[]      // quest IDs dismissed today
}

const STORAGE_KEY = 'tcu_quests_v1'

// ── Quest Definitions ─────────────────────────────────────────────────────────

export const DAILY_QUESTS: DailyQuest[] = [

  // Level 0 — Market Child

  {
    id: 'q-read-market-child',
    level: 0,
    maxLevel: 0,
    type: 'view-lesson',
    title: 'Enter the Kitchen',
    description: 'Open the Market Child lesson and read through the full introduction.',
    xpReward: 30,
    targetId: 'market-child',
    characterNote: {
      character: 'trading-chef',
      note: "Every Head Chef started as a Market Child. Start here.",
    },
  },

  {
    id: 'q-visit-kitchen-l0',
    level: 0,
    maxLevel: 1,
    type: 'visit-kitchen',
    title: 'Walk Through the Kitchen',
    description: 'Visit the Market Kitchen and explore the layout.',
    xpReward: 20,
    characterNote: {
      character: 'trading-chef',
      note: "Know the kitchen before you touch anything in it.",
    },
  },

  // Level 1 — Candle Kitchen

  {
    id: 'q-read-candles',
    level: 1,
    maxLevel: 1,
    type: 'view-lesson',
    title: 'Read the Candles',
    description: 'Open the Candle Kitchen lesson and complete the full read.',
    xpReward: 35,
    targetId: 'candles',
    characterNote: {
      character: 'chef-goldie',
      note: "You cannot read the market until you can read a candle.",
    },
  },

  {
    id: 'q-read-wicks',
    level: 1,
    maxLevel: 1,
    type: 'view-lesson',
    title: "Wickie's Lesson",
    description: 'Open the Wicks lesson and complete Wickie\'s coaching.',
    xpReward: 35,
    targetId: 'wicks',
    characterNote: {
      character: 'chef-goldie',
      note: "Wicks are the most overlooked piece of information on a chart.",
    },
  },

  {
    id: 'q-candles-practice',
    level: 1,
    maxLevel: 1,
    type: 'complete-practice',
    title: 'Candle Practice',
    description: 'Complete the practice task for the Candle Kitchen lesson.',
    xpReward: 40,
    targetId: 'candles',
    characterNote: {
      character: 'melody',
      note: "Reading about candles and practicing candles are two different things. Do both.",
    },
  },

  // Level 2 — Structure Kitchen

  {
    id: 'q-read-structure',
    level: 2,
    maxLevel: 2,
    type: 'view-lesson',
    title: 'Structure Lesson',
    description: 'Open the Structure Kitchen lesson and study Chef Goldie\'s framework.',
    xpReward: 40,
    targetId: 'structure',
  },

  {
    id: 'q-structure-rush',
    level: 2,
    maxLevel: 2,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Structure',
    description: 'Complete a structure-level Kitchen Rush scenario.',
    xpReward: 50,
    targetId: 'l2-structure-break',
    characterNote: {
      character: 'chef-goldie',
      note: "You do not trade without structure. You wait for it.",
    },
  },

  // Level 3 — Flow Kitchen

  {
    id: 'q-read-bias',
    level: 3,
    maxLevel: 3,
    type: 'view-lesson',
    title: 'Set Your Bias',
    description: 'Read the Bias lesson and understand how bias is determined.',
    xpReward: 45,
    targetId: 'bias',
  },

  {
    id: 'q-read-flow',
    level: 3,
    maxLevel: 3,
    type: 'view-lesson',
    title: "Rico's Flow Lesson",
    description: "Open the Flow lesson and learn how price moves with and against bias.",
    xpReward: 45,
    targetId: 'flow',
    characterNote: {
      character: 'chef-goldie',
      note: "Bias tells you where. Flow tells you how. Both are required.",
    },
  },

  {
    id: 'q-bias-rush',
    level: 3,
    maxLevel: 4,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Bias',
    description: 'Complete a bias-level Kitchen Rush scenario.',
    xpReward: 55,
    targetId: 'l3-bias',
    characterNote: {
      character: 'melissa',
      note: "I trade against bias all the time. And somehow I'm always surprised when it doesn't work.",
    },
  },

  // Level 4 — AOI Kitchen

  {
    id: 'q-read-aoi',
    level: 4,
    maxLevel: 4,
    type: 'view-lesson',
    title: 'Mark Your AOI',
    description: 'Open the AOI Kitchen lesson and learn how to identify Areas of Interest.',
    xpReward: 50,
    targetId: 'aoi',
    characterNote: {
      character: 'chef-goldie',
      note: "You are not looking for entries. You are looking for areas worth watching.",
    },
  },

  {
    id: 'q-visit-kitchen-l4',
    level: 4,
    type: 'visit-kitchen',
    title: 'Kitchen Session',
    description: 'Open the Market Kitchen and practice identifying an AOI on a live chart.',
    xpReward: 40,
  },

  // Level 5 — Delivery Kitchen

  {
    id: 'q-read-delivery',
    level: 5,
    maxLevel: 5,
    type: 'view-lesson',
    title: 'Watch for Delivery',
    description: 'Open the Delivery Kitchen lesson and learn how price delivers from an AOI.',
    xpReward: 50,
    targetId: 'delivery',
  },

  {
    id: 'q-delivery-rush',
    level: 5,
    maxLevel: 6,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Delivery',
    description: 'Complete a delivery-level Kitchen Rush scenario.',
    xpReward: 60,
    targetId: 'l5-delivery',
  },

  // Level 6 — Confirmation Kitchen

  {
    id: 'q-read-confirmation',
    level: 6,
    maxLevel: 6,
    type: 'view-lesson',
    title: 'Wait for Confirmation',
    description: 'Open the Confirmation Kitchen lesson and understand the final Recipe step before entry.',
    xpReward: 55,
    targetId: 'confirmation',
    characterNote: {
      character: 'melody',
      note: "I learned confirmation late. After I learned it, I stopped chasing entries.",
    },
  },

  {
    id: 'q-confirmation-rush',
    level: 6,
    maxLevel: 7,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Confirmation',
    description: 'Complete a confirmation-level Kitchen Rush scenario.',
    xpReward: 65,
    targetId: 'l6-confirmation',
  },

  // Level 7 — The Pass

  {
    id: 'q-read-risk',
    level: 7,
    maxLevel: 7,
    type: 'view-lesson',
    title: 'Calculate Your Risk',
    description: 'Open the Risk lesson and complete Grandma Market\'s risk calculation section.',
    xpReward: 60,
    targetId: 'risk',
    characterNote: {
      character: 'burn-alarm',
      note: "Risk is not a feeling. It is a number. Calculate it before every trade.",
    },
  },

  {
    id: 'q-risk-rush',
    level: 7,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Risk Math',
    description: 'Complete the risk calculation Kitchen Rush scenario.',
    xpReward: 65,
    targetId: 'l7-risk',
    characterNote: {
      character: 'burn-alarm',
      note: "If you cannot do this math before entry, you are not ready to trade.",
    },
  },

  {
    id: 'q-risk-journal',
    level: 7,
    type: 'save-journal',
    title: 'Risk Reflection',
    description: 'Complete the journal prompts in the Risk lesson.',
    xpReward: 55,
    targetId: 'risk',
  },

  // Level 8 — Tables Served

  {
    id: 'q-read-tables-served',
    level: 8,
    maxLevel: 8,
    type: 'view-lesson',
    title: 'Tables Served',
    description: 'Open the Tables Served lesson and study trade management.',
    xpReward: 60,
    targetId: 'tables-served',
  },

  {
    id: 'q-management-rush',
    level: 8,
    type: 'run-rush-scenario',
    title: 'Kitchen Rush: Management',
    description: 'Complete the trade management Kitchen Rush scenario.',
    xpReward: 70,
    targetId: 'l8-management',
  },

  // Level 9 — Head Chef

  {
    id: 'q-read-kitchen-rush',
    level: 9,
    type: 'view-lesson',
    title: 'Kitchen Rush Mode',
    description: 'Open the Kitchen Rush lesson — the final Head Chef test.',
    xpReward: 65,
    targetId: 'kitchen-rush',
  },

  {
    id: 'q-full-recipe-rush',
    level: 9,
    type: 'run-rush-scenario',
    title: 'Full Recipe: Head Chef Test',
    description: 'Complete the Full Recipe Kitchen Rush scenario at Level 9.',
    xpReward: 80,
    targetId: 'l9-full-recipe',
    characterNote: {
      character: 'trading-chef',
      note: "This is what everything builds toward. Show me the Recipe.",
    },
  },

  {
    id: 'q-debrief-journal',
    level: 9,
    type: 'run-rush-scenario',
    title: 'Kitchen Debrief',
    description: 'Complete the Kitchen Debrief journal scenario.',
    xpReward: 80,
    targetId: 'l9-journal-reflection',
    characterNote: {
      character: 'melody',
      note: "Head Chefs debrief. Every session. Every time.",
    },
  },

  // ── Recurring Quests (available across multiple levels) ───────────────────

  {
    id: 'q-visit-passport',
    level: 0,
    type: 'visit-passport',
    title: 'Check Your Passport',
    description: 'Visit your Passport to review your XP, badges, and progression status.',
    xpReward: 15,
  },

  {
    id: 'q-kitchen-session',
    level: 3,
    type: 'visit-kitchen',
    title: 'Kitchen Session',
    description: 'Open the Market Kitchen and spend time with the live chart tools.',
    xpReward: 30,
    characterNote: {
      character: 'chef-goldie',
      note: "Reading without practice is just theory. Get in the kitchen.",
    },
  },

]

// ── Storage ───────────────────────────────────────────────────────────────────

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function loadQuestProgress(): QuestProgress {
  if (typeof window === 'undefined') return { date: todayKey(), completed: [], dismissed: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { date: todayKey(), completed: [], dismissed: [] }
    const parsed = JSON.parse(raw) as QuestProgress
    if (parsed.date !== todayKey()) return { date: todayKey(), completed: [], dismissed: [] }
    return parsed
  } catch { return { date: todayKey(), completed: [], dismissed: [] } }
}

export function saveQuestProgress(progress: QuestProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function completeQuest(questId: string): QuestProgress {
  const progress = loadQuestProgress()
  if (progress.completed.includes(questId)) return progress
  const updated = { ...progress, completed: [...progress.completed, questId] }
  saveQuestProgress(updated)
  return updated
}

export function dismissQuest(questId: string): QuestProgress {
  const progress = loadQuestProgress()
  if (progress.dismissed.includes(questId)) return progress
  const updated = { ...progress, dismissed: [...progress.dismissed, questId] }
  saveQuestProgress(updated)
  return updated
}

// ── Queries ───────────────────────────────────────────────────────────────────

export function getActiveQuests(currentLevel: number, maxDaily = 3): {
  quests: DailyQuest[]
  progress: QuestProgress
} {
  const progress = loadQuestProgress()
  const available = DAILY_QUESTS.filter(q => {
    if (q.level > currentLevel) return false
    if (q.maxLevel !== undefined && q.maxLevel < currentLevel) return false
    if (progress.completed.includes(q.id)) return false
    if (progress.dismissed.includes(q.id)) return false
    return true
  })

  // Prefer quests at or near the current level
  const sorted = [...available].sort((a, b) => {
    const aDist = Math.abs(a.level - currentLevel)
    const bDist = Math.abs(b.level - currentLevel)
    return aDist - bDist
  })

  return { quests: sorted.slice(0, maxDaily), progress }
}

export function getDailyXPEarned(currentLevel: number): number {
  const progress = loadQuestProgress()
  return DAILY_QUESTS
    .filter(q => progress.completed.includes(q.id))
    .reduce((sum, q) => sum + q.xpReward, 0)
}

export function getTodayCompletionCount(): number {
  const progress = loadQuestProgress()
  return progress.completed.length
}

export function isQuestCompleted(questId: string): boolean {
  const progress = loadQuestProgress()
  return progress.completed.includes(questId)
}

export function completeQuestForLesson(lessonId: string, type: QuestType): void {
  const quest = DAILY_QUESTS.find(q => q.targetId === lessonId && q.type === type)
  if (quest) completeQuest(quest.id)
}

export function getUnlockedLevels(completedLevelNums: number[]): number[] {
  return ACADEMY_MODULES
    .filter(m => completedLevelNums.includes(m.level))
    .map(m => m.level)
}
