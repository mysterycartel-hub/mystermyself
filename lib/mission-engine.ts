// ── MissionEngine ─────────────────────────────────────────────────────────────
// Single lifecycle orchestrator for the TCU lesson flow:
//   Video → Lesson Unlock → Lesson View → Practice → Reflection → XP → Unlock
//
// Every step fires exactly one lifecycle event. MissionEngine handles:
//   - Progression writes (via progression.ts)
//   - Quest completions (via quests.ts)
//   - Character trigger fires (via character-trigger-engine.ts)
//   - XP awards (via xp-reward-engine.ts)
//
// Components call MissionEngine methods — not raw progression/quest functions.

import { markLessonViewed, markPracticeComplete, markJournalSaved, loadProgress } from './progression'
import { completeQuestForLesson, getActiveQuests } from './quests'
import { CharacterTriggerEngine } from './character-trigger-engine'
import { XPRewardEngine } from './xp-reward-engine'

// ── Lifecycle event types ─────────────────────────────────────────────────────

export type LifecycleEvent =
  | 'lesson-viewed'
  | 'practice-submitted'
  | 'reflection-saved'
  | 'xp-awarded'
  | 'level-unlocked'
  | 'lesson-locked'   // student tried to access a locked lesson

export interface LifecycleResult {
  event: LifecycleEvent
  lessonId: string
  xpAwarded?: number
  levelJustCompleted?: number | null
  levelJustUnlocked?: number | null
}

// ── MissionEngine public API ──────────────────────────────────────────────────

export const MissionEngine = {

  // Called when a student opens a lesson page (first view counts)
  onLessonView(lessonId: string): LifecycleResult {
    const { data, levelJustCompleted } = markLessonViewed(lessonId)

    // Complete any view-lesson quests for this lesson
    completeQuestForLesson(lessonId, 'view-lesson')

    // Fire level-complete coach cue if applicable
    if (levelJustCompleted !== null && levelJustCompleted !== undefined) {
      CharacterTriggerEngine.fireCoachCue('level-complete')
      CharacterTriggerEngine.fire('level-complete', { level: levelJustCompleted })
      XPRewardEngine.onLevelComplete(levelJustCompleted)
    }

    return {
      event: 'lesson-viewed',
      lessonId,
      levelJustCompleted: levelJustCompleted ?? null,
    }
  },

  // Called when a student submits/completes the practice section
  onPracticeComplete(lessonId: string, submittedText?: string): LifecycleResult {
    // Analyze submitted text for behavioral states before marking complete
    if (submittedText) {
      CharacterTriggerEngine.analyzeText(submittedText, 'practice')
    }

    const { data, levelJustCompleted } = markPracticeComplete(lessonId)

    // Fire practice-complete coach cue
    CharacterTriggerEngine.fireCoachCue('practice-complete')
    CharacterTriggerEngine.fire('practice-complete', { lessonId })

    // Complete any practice quests
    completeQuestForLesson(lessonId, 'complete-practice')

    if (levelJustCompleted !== null && levelJustCompleted !== undefined) {
      CharacterTriggerEngine.fire('level-complete', { level: levelJustCompleted })
      XPRewardEngine.onLevelComplete(levelJustCompleted)
    }

    return {
      event: 'practice-submitted',
      lessonId,
      levelJustCompleted: levelJustCompleted ?? null,
    }
  },

  // Called when a student saves their reflection journal
  onReflectionSave(lessonId: string, xpAmount: number, journalAnswers?: Record<number, string>): LifecycleResult {
    // Analyze journal answers for behavioral states
    if (journalAnswers) {
      const allText = Object.values(journalAnswers).join(' ')
      CharacterTriggerEngine.analyzeText(allText, 'journal')
    }

    const { data, levelJustCompleted } = markJournalSaved(lessonId)

    // Award XP
    const xpResult = XPRewardEngine.awardXP(xpAmount, 'lesson-complete', lessonId)

    // Fire journal-complete coach cue
    CharacterTriggerEngine.fireCoachCue('journal-complete')
    CharacterTriggerEngine.fire('journal-complete', { lessonId, xp: xpAmount })

    // Complete quests
    completeQuestForLesson(lessonId, 'save-journal')

    if (levelJustCompleted !== null && levelJustCompleted !== undefined) {
      CharacterTriggerEngine.fireCoachCue('level-complete')
      CharacterTriggerEngine.fire('level-complete', { level: levelJustCompleted })
      XPRewardEngine.onLevelComplete(levelJustCompleted)
    }

    return {
      event: 'reflection-saved',
      lessonId,
      xpAwarded: xpAmount,
      levelJustCompleted: levelJustCompleted ?? null,
    }
  },

  // Called when a student tries to access a lesson they haven't unlocked
  onLockedAccess(lessonId: string): LifecycleResult {
    CharacterTriggerEngine.fireMelissaState('rule-breaking', { lessonId })
    return { event: 'lesson-locked', lessonId }
  },

  // Get active missions for the current student
  getActiveMissions(currentLevel: number) {
    return getActiveQuests(currentLevel)
  },

  // Get current progress data
  getProgress() {
    return loadProgress()
  },
}
