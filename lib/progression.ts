// ── TCU Progression Engine ────────────────────────────────────────────────────
// Single source of truth for level gating, lesson completion, and XP.
//
// Level completion requires all THREE:
//   1. Lesson viewed (user opened and stayed on lesson page)
//   2. Practice marked complete (user clicked "I Did It")
//   3. Reflection journal saved (user saved all prompts)
//
// Only when all criteria are met for every lesson in a level
// does the level complete and the next level unlock.

import { LESSONS, ACADEMY_MODULES } from './academy'

export type LevelStatus = 'locked' | 'active' | 'complete'

export interface LessonRecord {
  viewed: boolean
  practiceComplete: boolean
  journalSaved: boolean
  xpEarned: number
  completedAt: string | null
}

export interface LevelRecord {
  level: number
  unlockedAt: string | null
  completedAt: string | null
  lessons: Record<string, LessonRecord>
}

export interface UserProgressData {
  version: 1
  levels: Record<number, LevelRecord>
  totalXP: number
  lastUpdated: string
}

const STORAGE_KEY   = 'tcu_progression_v1'
const SCHEMA_VER    = 1

// ── Private helpers ───────────────────────────────────────────────────────────

function emptyLessonRecord(): LessonRecord {
  return { viewed: false, practiceComplete: false, journalSaved: false, xpEarned: 0, completedAt: null }
}

function emptyLevelRecord(level: number): LevelRecord {
  const mod     = ACADEMY_MODULES.find(m => m.level === level)
  const lessons: Record<string, LessonRecord> = {}
  for (const id of (mod?.lessonIds ?? [])) lessons[id] = emptyLessonRecord()
  return {
    level,
    unlockedAt: level === 0 ? new Date().toISOString() : null,
    completedAt: null,
    lessons,
  }
}

function buildDefault(): UserProgressData {
  const levels: Record<number, LevelRecord> = {}
  for (const mod of ACADEMY_MODULES) levels[mod.level] = emptyLevelRecord(mod.level)
  return { version: 1, levels, totalXP: 0, lastUpdated: new Date().toISOString() }
}

// ── Public loaders ────────────────────────────────────────────────────────────

export function loadProgress(): UserProgressData {
  if (typeof window === 'undefined') return buildDefault()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildDefault()
    const parsed = JSON.parse(raw)
    if (parsed.version !== SCHEMA_VER) return buildDefault()
    // Ensure all levels/lessons exist (handle new lessons added after user started)
    const defaults = buildDefault()
    for (const [lvl, rec] of Object.entries(defaults.levels)) {
      const l = Number(lvl)
      if (!parsed.levels[l]) parsed.levels[l] = rec
      for (const [id, lrec] of Object.entries(rec.lessons)) {
        if (!parsed.levels[l].lessons[id]) parsed.levels[l].lessons[id] = lrec
      }
    }
    return parsed as UserProgressData
  } catch { return buildDefault() }
}

export function saveProgress(data: UserProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, lastUpdated: new Date().toISOString() }))
}

// ── Queries ───────────────────────────────────────────────────────────────────

export function getLevelStatus(data: UserProgressData, level: number): LevelStatus {
  const rec = data.levels[level]
  if (!rec?.unlockedAt)  return 'locked'
  if (rec.completedAt)   return 'complete'
  return 'active'
}

export function canAccessLesson(data: UserProgressData, lessonId: string): boolean {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return false
  return getLevelStatus(data, lesson.level) !== 'locked'
}

export function getLessonRecord(data: UserProgressData, lessonId: string): LessonRecord {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return emptyLessonRecord()
  return data.levels[lesson.level]?.lessons[lessonId] ?? emptyLessonRecord()
}

export function getCurrentLevel(data: UserProgressData): number {
  let current = 0
  for (const mod of ACADEMY_MODULES) {
    const s = getLevelStatus(data, mod.level)
    if (s === 'active' || s === 'complete') current = mod.level
  }
  return current
}

export function getLevelXP(level: number): number {
  const mod = ACADEMY_MODULES.find(m => m.level === level)
  if (!mod) return 0
  return mod.lessonIds.reduce((sum, id) => {
    return sum + (LESSONS.find(l => l.id === id)?.xpReward ?? 0)
  }, 0)
}

export function getLevelProgress(data: UserProgressData, level: number): {
  lessonsComplete: number
  lessonsTotal: number
  xpEarned: number
  xpTotal: number
  viewedAll: boolean
  practiceAll: boolean
  journalAll: boolean
} {
  const mod = ACADEMY_MODULES.find(m => m.level === level)
  if (!mod) return { lessonsComplete: 0, lessonsTotal: 0, xpEarned: 0, xpTotal: 0, viewedAll: false, practiceAll: false, journalAll: false }
  const rec = data.levels[level]
  let lessonsComplete = 0
  let xpEarned = 0
  let viewedAll = true
  let practiceAll = true
  let journalAll = true
  for (const id of mod.lessonIds) {
    const lr = rec?.lessons[id]
    if (lr?.completedAt) { lessonsComplete++; xpEarned += lr.xpEarned }
    if (!lr?.viewed)          viewedAll    = false
    if (!lr?.practiceComplete) practiceAll = false
    if (!lr?.journalSaved)     journalAll  = false
  }
  return {
    lessonsComplete,
    lessonsTotal: mod.lessonIds.length,
    xpEarned,
    xpTotal: getLevelXP(level),
    viewedAll,
    practiceAll,
    journalAll,
  }
}

// ── Mutations ─────────────────────────────────────────────────────────────────

function patchLesson(
  data: UserProgressData,
  lessonId: string,
  patch: Partial<LessonRecord>
): UserProgressData {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return data

  const prev = data.levels[lesson.level]?.lessons[lessonId] ?? emptyLessonRecord()
  const next = { ...prev, ...patch }

  // Auto-complete lesson when all criteria met
  if (next.viewed && next.practiceComplete && next.journalSaved && !next.completedAt) {
    next.completedAt = new Date().toISOString()
    next.xpEarned   = lesson.xpReward
  }

  return {
    ...data,
    levels: {
      ...data.levels,
      [lesson.level]: {
        ...data.levels[lesson.level],
        lessons: {
          ...data.levels[lesson.level].lessons,
          [lessonId]: next,
        },
      },
    },
  }
}

function checkAndUnlockNext(data: UserProgressData, level: number): UserProgressData {
  const mod = ACADEMY_MODULES.find(m => m.level === level)
  if (!mod) return data

  const rec = data.levels[level]
  if (!rec || rec.completedAt) return data

  const allDone = mod.lessonIds.every(id => !!data.levels[level]?.lessons[id]?.completedAt)
  if (!allDone) return data

  const levelXP = getLevelXP(level)
  const now     = new Date().toISOString()
  let updated: UserProgressData = {
    ...data,
    totalXP: data.totalXP + levelXP,
    levels: {
      ...data.levels,
      [level]: { ...rec, completedAt: now },
    },
  }

  // Unlock next level
  const nextLevel = level + 1
  const nextMod   = ACADEMY_MODULES.find(m => m.level === nextLevel)
  if (nextMod && updated.levels[nextLevel] && !updated.levels[nextLevel].unlockedAt) {
    updated = {
      ...updated,
      levels: {
        ...updated.levels,
        [nextLevel]: { ...updated.levels[nextLevel], unlockedAt: now },
      },
    }
  }

  return updated
}

// ── Public mutation API ───────────────────────────────────────────────────────

export function markLessonViewed(lessonId: string): { data: UserProgressData; levelJustCompleted: number | null } {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return { data: loadProgress(), levelJustCompleted: null }

  let data = loadProgress()
  const wasComplete = !!data.levels[lesson.level]?.completedAt
  data = patchLesson(data, lessonId, { viewed: true })
  data = checkAndUnlockNext(data, lesson.level)
  saveProgress(data)
  const nowComplete = !!data.levels[lesson.level]?.completedAt
  return { data, levelJustCompleted: (!wasComplete && nowComplete) ? lesson.level : null }
}

export function markPracticeComplete(lessonId: string): { data: UserProgressData; levelJustCompleted: number | null } {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return { data: loadProgress(), levelJustCompleted: null }

  let data = loadProgress()
  const wasComplete = !!data.levels[lesson.level]?.completedAt
  data = patchLesson(data, lessonId, { practiceComplete: true })
  data = checkAndUnlockNext(data, lesson.level)
  saveProgress(data)
  const nowComplete = !!data.levels[lesson.level]?.completedAt
  return { data, levelJustCompleted: (!wasComplete && nowComplete) ? lesson.level : null }
}

export function markJournalSaved(lessonId: string): { data: UserProgressData; levelJustCompleted: number | null } {
  const lesson = LESSONS.find(l => l.id === lessonId)
  if (!lesson) return { data: loadProgress(), levelJustCompleted: null }

  let data = loadProgress()
  const wasComplete = !!data.levels[lesson.level]?.completedAt
  data = patchLesson(data, lessonId, { journalSaved: true })
  data = checkAndUnlockNext(data, lesson.level)
  saveProgress(data)
  const nowComplete = !!data.levels[lesson.level]?.completedAt
  return { data, levelJustCompleted: (!wasComplete && nowComplete) ? lesson.level : null }
}

export function resetProgress(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY)
}
