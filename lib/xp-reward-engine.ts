// ── XPRewardEngine ────────────────────────────────────────────────────────────
// XP math, rank levels, badges, and unlocks.
// Separates XP display/badge logic from the raw progression data in progression.ts.
//
// Two level systems:
//   Curriculum levels (0–9): lesson-gated, controlled by progression.ts
//   XP ranks (1–100): XP-accumulation based, visual prestige system
//
// XPRewardEngine handles ranks and badges. progression.ts handles curriculum gates.

import { loadProgress, saveProgress, UserProgressData } from './progression'

// ── XP Rank thresholds ────────────────────────────────────────────────────────
// Every 100 XP = 1 rank. Ranks are display-only and do not gate content.

const XP_PER_RANK = 100

export type BadgeId =
  | 'first-step'         // completed Level 0
  | 'candle-reader'      // completed Level 1
  | 'structure-student'  // completed Level 2
  | 'flow-finder'        // completed Level 3
  | 'aoi-analyst'        // completed Level 4
  | 'delivery-reader'    // completed Level 5
  | 'confirmed'          // completed Level 6
  | 'the-pass'           // completed Level 7
  | 'tables-served'      // completed Level 8
  | 'head-chef'          // completed Level 9
  | 'daily-100'          // earned 100+ XP in a single day
  | 'streak-3'           // 3-day login/activity streak
  | 'streak-7'           // 7-day streak
  | 'rush-runner'        // completed first Kitchen Rush scenario
  | 'recipe-runner'      // ran the full 8-step Recipe once
  | 'journal-habit'      // saved 10 journal entries
  | 'no-setup-discipline' // correctly identified "no setup" 3 times

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
  xpBonus: number       // bonus XP awarded when badge is earned
  unlockedAt?: string   // ISO timestamp when earned, null if not yet
}

export const BADGES: Record<BadgeId, Badge> = {
  'first-step':         { id: 'first-step', name: 'First Step', description: 'Completed Market Child — Level 0', icon: '👶', xpBonus: 25 },
  'candle-reader':      { id: 'candle-reader', name: 'Candle Reader', description: 'Completed Candle Kitchen — Level 1', icon: '🕯️', xpBonus: 50 },
  'structure-student':  { id: 'structure-student', name: 'Structure Student', description: 'Completed Structure Kitchen — Level 2', icon: '🏗️', xpBonus: 75 },
  'flow-finder':        { id: 'flow-finder', name: 'Flow Finder', description: 'Completed Flow Kitchen — Level 3', icon: '🌊', xpBonus: 100 },
  'aoi-analyst':        { id: 'aoi-analyst', name: 'AOI Analyst', description: 'Completed AOI Kitchen — Level 4', icon: '🏡', xpBonus: 100 },
  'delivery-reader':    { id: 'delivery-reader', name: 'Delivery Reader', description: 'Completed Delivery Kitchen — Level 5', icon: '📦', xpBonus: 125 },
  'confirmed':          { id: 'confirmed', name: 'Confirmed', description: 'Completed Confirmation Kitchen — Level 6', icon: '✅', xpBonus: 125 },
  'the-pass':           { id: 'the-pass', name: 'The Pass', description: 'Completed The Pass — Level 7', icon: '🎯', xpBonus: 150 },
  'tables-served':      { id: 'tables-served', name: 'Tables Served', description: 'Completed Tables Served — Level 8', icon: '🍽️', xpBonus: 150 },
  'head-chef':          { id: 'head-chef', name: 'Head Chef', description: 'Completed all 10 Academy levels', icon: '👑', xpBonus: 500 },
  'daily-100':          { id: 'daily-100', name: 'Century Day', description: 'Earned 100+ XP in a single day', icon: '💯', xpBonus: 50 },
  'streak-3':           { id: 'streak-3', name: '3-Day Streak', description: 'Active 3 days in a row', icon: '🔥', xpBonus: 30 },
  'streak-7':           { id: 'streak-7', name: 'Weekly Habit', description: 'Active 7 days in a row', icon: '⚡', xpBonus: 100 },
  'rush-runner':        { id: 'rush-runner', name: 'Rush Runner', description: 'Completed your first Kitchen Rush scenario', icon: '⏱️', xpBonus: 50 },
  'recipe-runner':      { id: 'recipe-runner', name: 'Recipe Runner', description: 'Ran the full 8-step Recipe from start to finish', icon: '📋', xpBonus: 100 },
  'journal-habit':      { id: 'journal-habit', name: 'Journal Habit', description: 'Saved 10 journal entries', icon: '📝', xpBonus: 75 },
  'no-setup-discipline':{ id: 'no-setup-discipline', name: 'No Setup Discipline', description: 'Correctly identified "No Setup Today" 3 times', icon: '🧘', xpBonus: 100 },
}

// Level → Badge mapping
const LEVEL_BADGES: Record<number, BadgeId> = {
  0: 'first-step',
  1: 'candle-reader',
  2: 'structure-student',
  3: 'flow-finder',
  4: 'aoi-analyst',
  5: 'delivery-reader',
  6: 'confirmed',
  7: 'the-pass',
  8: 'tables-served',
  9: 'head-chef',
}

// ── XP storage (separate from progression.ts) ─────────────────────────────────
// XP totals are already tracked in progression.ts (data.totalXP).
// Badges are stored separately.

const BADGE_KEY = 'tcu_badges_v1'

export interface BadgeData {
  earned: Partial<Record<BadgeId, string>>  // badgeId → ISO timestamp
  journalCount: number
  noSetupCount: number
}

function loadBadges(): BadgeData {
  if (typeof window === 'undefined') return { earned: {}, journalCount: 0, noSetupCount: 0 }
  try {
    const raw = localStorage.getItem(BADGE_KEY)
    return raw ? JSON.parse(raw) : { earned: {}, journalCount: 0, noSetupCount: 0 }
  } catch { return { earned: {}, journalCount: 0, noSetupCount: 0 } }
}

function saveBadges(data: BadgeData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(BADGE_KEY, JSON.stringify(data))
}

// ── XPRewardEngine public API ─────────────────────────────────────────────────

export interface XPResult {
  totalXP: number
  xpAwarded: number
  rank: number
  previousRank: number
  rankUp: boolean
  badgeEarned?: Badge
}

export const XPRewardEngine = {

  // Get XP rank from total XP
  getRank(totalXP: number): number {
    return Math.floor(totalXP / XP_PER_RANK) + 1
  },

  // Get XP needed to reach the next rank
  getXPToNextRank(totalXP: number): number {
    const currentRankXP = (XPRewardEngine.getRank(totalXP) - 1) * XP_PER_RANK
    return XP_PER_RANK - (totalXP - currentRankXP)
  },

  // Award XP — updates progression.ts totalXP and checks for rank up
  awardXP(amount: number, source: string, lessonId?: string): XPResult {
    const data = loadProgress()
    const previousTotal = data.totalXP
    const previousRank = XPRewardEngine.getRank(previousTotal)

    const updatedData: UserProgressData = {
      ...data,
      totalXP: previousTotal + amount,
    }
    saveProgress(updatedData)

    const newRank = XPRewardEngine.getRank(updatedData.totalXP)

    return {
      totalXP: updatedData.totalXP,
      xpAwarded: amount,
      rank: newRank,
      previousRank,
      rankUp: newRank > previousRank,
    }
  },

  // Called when a curriculum level completes — awards badge + bonus XP
  onLevelComplete(level: number): Badge | null {
    const badgeId = LEVEL_BADGES[level]
    if (!badgeId) return null

    const badges = loadBadges()
    if (badges.earned[badgeId]) return null  // already earned

    badges.earned[badgeId] = new Date().toISOString()
    saveBadges(badges)

    const badge = BADGES[badgeId]

    // Award badge bonus XP
    const data = loadProgress()
    saveProgress({ ...data, totalXP: data.totalXP + badge.xpBonus })

    return badge
  },

  // Award a specific badge by ID
  awardBadge(badgeId: BadgeId): Badge | null {
    const badges = loadBadges()
    if (badges.earned[badgeId]) return null

    badges.earned[badgeId] = new Date().toISOString()

    // Track counters for counter-based badges
    if (badgeId === 'journal-habit') badges.journalCount += 1
    if (badgeId === 'no-setup-discipline') badges.noSetupCount += 1

    saveBadges(badges)
    return BADGES[badgeId]
  },

  // Increment journal count and auto-award badge if threshold reached
  onJournalSaved(): Badge | null {
    const badges = loadBadges()
    badges.journalCount = (badges.journalCount ?? 0) + 1
    saveBadges(badges)
    if (badges.journalCount >= 10 && !badges.earned['journal-habit']) {
      return XPRewardEngine.awardBadge('journal-habit')
    }
    return null
  },

  // Increment no-setup count and auto-award badge at threshold
  onNoSetupIdentified(): Badge | null {
    const badges = loadBadges()
    badges.noSetupCount = (badges.noSetupCount ?? 0) + 1
    saveBadges(badges)
    if (badges.noSetupCount >= 3 && !badges.earned['no-setup-discipline']) {
      return XPRewardEngine.awardBadge('no-setup-discipline')
    }
    return null
  },

  // Get all earned badges with timestamps
  getEarnedBadges(): Array<Badge & { earnedAt: string }> {
    const data = loadBadges()
    return Object.entries(data.earned)
      .filter(([, ts]) => !!ts)
      .map(([id, ts]) => ({
        ...BADGES[id as BadgeId],
        earnedAt: ts as string,
      }))
  },

  // Check if a specific badge has been earned
  hasBadge(badgeId: BadgeId): boolean {
    const data = loadBadges()
    return !!data.earned[badgeId]
  },

  // Get total XP from progression
  getTotalXP(): number {
    return loadProgress().totalXP
  },

  // Get display string for a rank
  getRankLabel(rank: number): string {
    if (rank >= 100) return 'Legendary Chef'
    if (rank >= 75)  return 'Master Chef'
    if (rank >= 50)  return 'Senior Chef'
    if (rank >= 25)  return 'Line Cook'
    if (rank >= 10)  return 'Prep Cook'
    return 'Kitchen Recruit'
  },
}
