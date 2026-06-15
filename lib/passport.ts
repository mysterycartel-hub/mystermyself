import { districts } from './districts'

export type PassportLevel = 'Recruit' | 'Navigator' | 'Explorer' | 'Captain' | 'Admiral' | 'Legend'

export interface PassportBadge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  xpRequired: number
  districtRequired?: string
}

export interface PassportMission {
  id: string
  title: string
  description: string
  xpReward: number
  districtId: string
  type: 'visit' | 'complete' | 'share' | 'unlock'
  completed: boolean
}

export interface UserPassport {
  userId: string
  username: string
  xp: number
  level: PassportLevel
  stampsCollected: string[]
  badgesEarned: string[]
  missionsCompleted: string[]
  joinedAt: string
}

export const XP_THRESHOLDS: Record<PassportLevel, number> = {
  Recruit:   0,
  Navigator: 250,
  Explorer:  750,
  Captain:   1500,
  Admiral:   3000,
  Legend:    6000,
}

export const LEVEL_ORDER: PassportLevel[] = [
  'Recruit', 'Navigator', 'Explorer', 'Captain', 'Admiral', 'Legend',
]

export function getLevelFromXP(xp: number): PassportLevel {
  const levels = [...LEVEL_ORDER].reverse()
  for (const level of levels) {
    if (xp >= XP_THRESHOLDS[level]) return level
  }
  return 'Recruit'
}

export function getXPToNextLevel(xp: number): { current: number; next: number; level: PassportLevel; nextLevel: PassportLevel | null } {
  const level = getLevelFromXP(xp)
  const levelIndex = LEVEL_ORDER.indexOf(level)
  const nextLevel = LEVEL_ORDER[levelIndex + 1] ?? null
  const nextThreshold = nextLevel ? XP_THRESHOLDS[nextLevel] : XP_THRESHOLDS['Legend']
  const currentThreshold = XP_THRESHOLDS[level]
  return {
    current: xp - currentThreshold,
    next: nextThreshold - currentThreshold,
    level,
    nextLevel,
  }
}

export const PASSPORT_BADGES: PassportBadge[] = [
  // ── Mayhem Badges (earned through Academy + Kitchen discipline) ───────────
  {
    id: 'melissa-survivor',
    name: 'Melissa Survivor',
    description: 'Completed a lesson where Melissa Mayhem appeared — and did not take the bait.',
    icon: '⚡',
    color: '#EC4899',
    xpRequired: 0,
  },
  {
    id: 'melody-named',
    name: 'Name the Feeling',
    description: "Completed Melody Mayhem's emotion journal prompt honestly in 3 lessons.",
    icon: '🎭',
    color: '#F59E0B',
    xpRequired: 0,
  },
  {
    id: 'discipline-holds',
    name: 'Discipline Holds',
    description: 'Wrote DNT (Did Not Trade) in the Recipe Journal during a Kitchen session.',
    icon: '🔒',
    color: '#c9a84c',
    xpRequired: 250,
  },
  {
    id: 'no-revenge',
    name: 'No Revenge',
    description: 'Logged a loss in the journal without taking a recovery trade immediately after.',
    icon: '🧘',
    color: '#A855F7',
    xpRequired: 500,
  },
  {
    id: 'burn-point-held',
    name: 'Burn Point Held',
    description: 'Completed the Management lesson without adjusting the Burn Point example.',
    icon: '🔥',
    color: '#EF4444',
    xpRequired: 750,
  },
  {
    id: 'mayhem-master',
    name: 'Mayhem Master',
    description: 'Completed all Melissa and Melody lessons without skipping the character coaching step.',
    icon: '👑',
    color: '#c9a84c',
    xpRequired: 1500,
  },
  // ── Coast Badges ──────────────────────────────────────────────────────────
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Joined the Scott-King Coast universe.',
    icon: '🌊',
    color: '#c9a84c',
    xpRequired: 0,
  },
  {
    id: 'coast-navigator',
    name: 'Coast Navigator',
    description: 'Visited 3 districts on the coast.',
    icon: '⚓',
    color: '#c9a84c',
    xpRequired: 250,
  },
  {
    id: 'market-reader',
    name: 'Market Reader',
    description: 'Completed Market Marina orientation.',
    icon: '📊',
    color: '#c9a84c',
    xpRequired: 500,
    districtRequired: 'market-marina',
  },
  {
    id: 'route-runner',
    name: 'Route Runner',
    description: 'Explored Route Harbor completely.',
    icon: '🚚',
    color: '#3B82F6',
    xpRequired: 500,
    districtRequired: 'route-harbor',
  },
  {
    id: 'flavor-certified',
    name: 'Flavor Certified',
    description: 'Mastered the Flavor District.',
    icon: '🍗',
    color: '#c0392b',
    xpRequired: 500,
    districtRequired: 'flavor-district',
  },
  {
    id: 'blueprint-builder',
    name: 'Blueprint Builder',
    description: 'Unlocked Blueprint Bay systems.',
    icon: '📐',
    color: '#22C55E',
    xpRequired: 750,
    districtRequired: 'blueprint-bay',
  },
  {
    id: 'fantasy-legend',
    name: 'Fantasy Legend',
    description: 'Conquered Fantasy Island.',
    icon: '🏆',
    color: '#F97316',
    xpRequired: 750,
    districtRequired: 'fantasy-island',
  },
  {
    id: 'vault-keeper',
    name: 'Vault Keeper',
    description: 'Unlocked the Library Vault.',
    icon: '🗄️',
    color: '#94A3B8',
    xpRequired: 1000,
    districtRequired: 'library-vault',
  },
  {
    id: 'legacy-student',
    name: 'Legacy Student',
    description: 'Enrolled at Legacy Point (TCU).',
    icon: '🎓',
    color: '#c9a84c',
    xpRequired: 1500,
    districtRequired: 'legacy-point',
  },
  {
    id: 'coast-captain',
    name: 'Coast Captain',
    description: 'Visited all 9 districts. Full coast stamp collection.',
    icon: '⚜️',
    color: '#c9a84c',
    xpRequired: 3000,
  },
  {
    id: 'founder',
    name: 'Founder Status',
    description: 'Achieved Legend status. Built on the coast.',
    icon: '👑',
    color: '#c9a84c',
    xpRequired: 6000,
  },
]

export const PASSPORT_MISSIONS: Omit<PassportMission, 'completed'>[] = [
  ...districts.map((d) => ({
    id: `visit-${d.id}`,
    title: `Visit ${d.name}`,
    description: `Explore the ${d.name} district on the Scott-King Coast.`,
    xpReward: 50,
    districtId: d.id,
    type: 'visit' as const,
  })),
  {
    id: 'complete-coast-tour',
    title: 'Complete the Coast Tour',
    description: 'Visit all 9 districts and collect all stamps.',
    xpReward: 500,
    districtId: 'founder-island',
    type: 'complete' as const,
  },
  {
    id: 'share-founder-island',
    title: 'Share the Origin',
    description: 'Share Founder Island with someone in your network.',
    xpReward: 100,
    districtId: 'founder-island',
    type: 'share' as const,
  },
  {
    id: 'unlock-tcu',
    title: 'Unlock TCU Academy',
    description: 'Enroll in Trading Chef University at Legacy Point.',
    xpReward: 750,
    districtId: 'legacy-point',
    type: 'unlock' as const,
  },
]
