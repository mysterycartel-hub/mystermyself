'use client'

// ── LessonTemplate ─────────────────────────────────────────────────────────────
// Dynamic lesson renderer. Steps are built from lesson data fields — not hardcoded.
// Adding a new field to a Lesson automatically adds a new step.
// Characters fire from engines, not from lesson sections.
//
// Step order (dynamic — only present if data exists):
//   intro → concept? → example? → common-trap? → guided-practice? →
//   practice → reflection → xp-reward

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Lesson, CHARACTERS, LESSONS, LessonConcept, LessonExample, LessonTrap, GuidedPractice, KitchenRushPrompt } from '@/lib/academy'
import { getLessonMayhem } from '@/lib/mayhem'
import { canAccessLesson, getLevelProgress } from '@/lib/progression'
import { MissionEngine } from '@/lib/mission-engine'
import { CharacterTriggerEngine } from '@/lib/character-trigger-engine'
import CharacterCoach from './CharacterCoach'
import KitchenMetaphor from './KitchenMetaphor'
import VisualExample from './VisualExample'
import PracticePrompt from './PracticePrompt'
import XPReward from './XPReward'
import ReflectionJournal from './ReflectionJournal'
import RiskWarning from './RiskWarning'
import MayhemCard from './MayhemCard'
import LevelGate from '../progression/LevelGate'

interface Props {
  lesson: Lesson
}

// ── Step system ───────────────────────────────────────────────────────────────

type StepType =
  | 'intro'
  | 'concept'
  | 'example'
  | 'common-trap'
  | 'guided-practice'
  | 'kitchen-rush'
  | 'practice'
  | 'reflection'
  | 'xp-reward'

interface StepDef {
  type: StepType
  label: string
}

function buildSteps(lesson: Lesson): StepDef[] {
  const steps: StepDef[] = []
  steps.push({ type: 'intro', label: 'Why This Matters' })
  if (lesson.concept)         steps.push({ type: 'concept',          label: 'The Concept' })
  if (lesson.example)         steps.push({ type: 'example',          label: 'See It in Action' })
  if (lesson.commonTrap)      steps.push({ type: 'common-trap',      label: 'Common Trap' })
  if (lesson.guidedPractice)  steps.push({ type: 'guided-practice',  label: 'Guided Practice' })
  if (lesson.kitchenRush)     steps.push({ type: 'kitchen-rush',     label: 'Kitchen Rush' })
  steps.push({ type: 'practice',   label: 'Your Turn' })
  steps.push({ type: 'reflection', label: 'Reflection' })
  steps.push({ type: 'xp-reward',  label: 'XP Reward' })
  return steps
}

// ── Shared step sub-elements ──────────────────────────────────────────────────

function StepLabel({ color, num, total, label }: { color: string; num: number; total: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <div style={{
        background: `${color}20`,
        border: `1px solid ${color}40`,
        padding: '3px 10px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.44rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color,
      }}>
        {num}/{total}
      </div>
      <span style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(245,240,232,0.4)',
      }}>
        {label}
      </span>
    </div>
  )
}

function ContinueButton({ color, onClick, label = 'Continue →' }: { color: string; onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 32,
        background: `${color}18`,
        border: `1px solid ${color}50`,
        color,
        padding: '12px 32px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.55rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'none',
        transition: 'all 0.2s',
        display: 'block',
      }}
    >
      {label}
    </button>
  )
}

// ── Concept step renderer ─────────────────────────────────────────────────────

function ConceptStep({ concept, color }: { concept: LessonConcept; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Definition */}
      <div style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.07)',
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 10,
        }}>
          Definition
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.8)',
          margin: 0,
        }}>
          {concept.definition}
        </p>
      </div>

      {/* Kitchen analogy */}
      <div style={{
        background: 'rgba(201,168,76,0.04)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderLeft: `3px solid rgba(201,168,76,0.4)`,
        padding: '18px 22px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          marginBottom: 10,
        }}>
          👑 Kitchen Metaphor
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.65)',
          margin: 0,
          fontStyle: 'italic',
        }}>
          {concept.kitchenAnalogy}
        </p>
      </div>

      {/* Market meaning */}
      <div style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.07)',
        borderLeft: `3px solid ${color}50`,
        padding: '18px 22px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: `${color}90`,
          marginBottom: 10,
        }}>
          📊 XAUUSD Application
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.65)',
          margin: 0,
        }}>
          {concept.marketMeaning}
        </p>
      </div>
    </div>
  )
}

// ── Example step renderer ─────────────────────────────────────────────────────

function ExampleStep({ example, color }: { example: LessonExample; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Scenario */}
      <div style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.07)',
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 10,
        }}>
          Scenario
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.75)',
          margin: 0,
        }}>
          {example.scenario}
        </p>
      </div>

      {/* Walkthrough */}
      <div style={{
        background: `${color}08`,
        border: `1px solid ${color}20`,
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: `${color}90`,
          marginBottom: 10,
        }}>
          Step-by-Step Read
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          lineHeight: 1.9,
          color: 'rgba(245,240,232,0.7)',
          margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {example.walkthrough}
        </p>
      </div>

      {/* Key takeaway */}
      <div style={{
        background: 'rgba(34,197,94,0.04)',
        border: '1px solid rgba(34,197,94,0.2)',
        borderLeft: '3px solid #22C55E',
        padding: '14px 18px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1rem', flexShrink: 0 }}>✓</span>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#22C55E',
            marginBottom: 5,
          }}>
            Key Takeaway
          </div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.62rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.75)',
            margin: 0,
          }}>
            {example.keyTakeaway}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Common Trap step renderer ─────────────────────────────────────────────────

function CommonTrapStep({ trap, color }: { trap: LessonTrap; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Melissa interrupt callout */}
      <div style={{
        background: 'rgba(236,72,153,0.04)',
        border: '1px solid rgba(236,72,153,0.2)',
        borderLeft: '3px solid #EC4899',
        padding: '14px 18px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚡</span>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.4)',
          margin: 0,
        }}>
          Melissa Mayhem lives in the gap between concept and execution. This is where she catches most traders.
        </p>
      </div>

      {/* The mistake */}
      <div style={{
        background: 'rgba(239,68,68,0.04)',
        border: '1px solid rgba(239,68,68,0.2)',
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(239,68,68,0.8)',
          marginBottom: 10,
        }}>
          The Mistake
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.75)',
          margin: 0,
        }}>
          {trap.mistake}
        </p>
      </div>

      {/* Why it happens */}
      <div style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.07)',
        padding: '18px 22px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 10,
        }}>
          Why It Happens
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.6)',
          margin: 0,
        }}>
          {trap.whyItHappens}
        </p>
      </div>

      {/* Consequence */}
      <div style={{
        background: 'rgba(239,68,68,0.04)',
        border: '1px solid rgba(239,68,68,0.15)',
        borderLeft: '3px solid rgba(239,68,68,0.5)',
        padding: '14px 18px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(239,68,68,0.7)',
          marginBottom: 8,
        }}>
          The Cost
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.6rem',
          lineHeight: 1.8,
          color: 'rgba(245,240,232,0.55)',
          margin: 0,
        }}>
          {trap.consequence}
        </p>
      </div>
    </div>
  )
}

// ── Guided Practice step renderer ─────────────────────────────────────────────

function GuidedPracticeStep({ gp, color }: { gp: GuidedPractice; color: string }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.07)',
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 10,
        }}>
          Scenario
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          lineHeight: 1.85,
          color: 'rgba(245,240,232,0.75)',
          margin: 0,
        }}>
          {gp.scenario}
        </p>
      </div>

      <div style={{
        background: `${color}06`,
        border: `1px solid ${color}20`,
        padding: '20px 24px',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: `${color}90`,
          marginBottom: 14,
        }}>
          Work Through It — Step by Step
        </div>
        <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {gp.steps.map((step, i) => (
            <li key={i} style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.65)',
            }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: 'rgba(245,240,232,0.03)',
            border: '1px solid rgba(245,240,232,0.12)',
            color: 'rgba(245,240,232,0.4)',
            padding: '12px 24px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
        >
          Attempt it yourself — then reveal the answer
        </button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: 'rgba(34,197,94,0.04)',
              border: '1px solid rgba(34,197,94,0.2)',
              padding: '20px 24px',
            }}
          >
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#22C55E',
              marginBottom: 10,
            }}>
              Full Answer
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.62rem',
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.75)',
              margin: '0 0 16px',
              whiteSpace: 'pre-line',
            }}>
              {gp.answer}
            </p>
            <div style={{
              borderTop: '1px solid rgba(34,197,94,0.15)',
              paddingTop: 14,
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              lineHeight: 1.75,
              color: 'rgba(245,240,232,0.45)',
            }}>
              <span style={{ color: '#22C55E' }}>Why it matters: </span>
              {gp.whyItMatters}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Kitchen Rush step renderer ────────────────────────────────────────────────

function KitchenRushStep({ kr, color }: { kr: KitchenRushPrompt; color: string }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header callout */}
      <div style={{
        background: 'rgba(201,168,76,0.05)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderLeft: '3px solid #c9a84c',
        padding: '14px 18px',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⏱️</span>
        <div>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 4 }}>
            Kitchen Rush — {kr.timeTarget}s Target
          </div>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.55rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.4)', margin: 0 }}>
            Head Chefs execute this without hesitation. Time yourself.
          </p>
        </div>
      </div>

      {/* Scenario */}
      <div style={{ background: `${color}08`, border: `1px solid ${color}25`, padding: '20px 24px' }}>
        <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${color}80`, marginBottom: 10 }}>
          Scenario
        </div>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', lineHeight: 1.85, color: 'rgba(245,240,232,0.8)', margin: 0 }}>
          {kr.scenario}
        </p>
      </div>

      {/* Task */}
      <div style={{ background: 'rgba(245,240,232,0.02)', border: '1px solid rgba(245,240,232,0.07)', padding: '18px 22px' }}>
        <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', marginBottom: 10 }}>
          Your Task
        </div>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', lineHeight: 1.85, color: 'rgba(245,240,232,0.75)', margin: 0 }}>
          {kr.task}
        </p>
      </div>

      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'rgba(201,168,76,0.6)',
            padding: '12px 24px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'none',
            textAlign: 'center',
          }}
        >
          I answered — reveal Head Chef answer
        </button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.25)', padding: '20px 24px' }}
          >
            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 10 }}>
              Head Chef Answer
            </div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.62rem', lineHeight: 1.9, color: 'rgba(245,240,232,0.8)', margin: 0, whiteSpace: 'pre-line' }}>
              {kr.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── LessonTemplate ─────────────────────────────────────────────────────────────

export default function LessonTemplate({ lesson }: Props) {
  const steps = buildSteps(lesson)

  const [activeStep, setActiveStep]   = useState(0)
  const [practiceComplete, setPracticeComplete] = useState(false)
  const [journalComplete, setJournalComplete]   = useState(false)
  const [levelJustCompleted, setLevelJustCompleted] = useState<number | null>(null)
  const [isLocked, setIsLocked]       = useState(false)
  const [progressData, setProgressData] = useState(() => MissionEngine.getProgress())

  const character  = CHARACTERS[lesson.character]
  const warnChar   = lesson.warningCharacter ? CHARACTERS[lesson.warningCharacter] : null
  const mayhemData = getLessonMayhem(lesson.id)
  const nextObj    = lesson.nextLesson ? LESSONS.find(l => l.slug === lesson.nextLesson) ?? null : null
  const prevObj    = lesson.prevLesson ? LESSONS.find(l => l.slug === lesson.prevLesson) ?? null : null

  // Gate check + mark viewed
  useEffect(() => {
    const data = MissionEngine.getProgress()
    if (!canAccessLesson(data, lesson.id)) {
      setIsLocked(true)
      MissionEngine.onLockedAccess(lesson.id)
      return
    }
    const result = MissionEngine.onLessonView(lesson.id)
    setProgressData(MissionEngine.getProgress())
    if (result.levelJustCompleted !== null && result.levelJustCompleted !== undefined) {
      setLevelJustCompleted(result.levelJustCompleted)
    }
  }, [lesson.id])

  const handlePracticeComplete = useCallback(() => {
    setPracticeComplete(true)
    const result = MissionEngine.onPracticeComplete(lesson.id)
    setProgressData(MissionEngine.getProgress())
    if (result.levelJustCompleted !== null && result.levelJustCompleted !== undefined) {
      setLevelJustCompleted(result.levelJustCompleted)
    }
    advance()
  }, [lesson.id])

  const handleJournalSaved = useCallback((answers: Record<number, string>) => {
    setJournalComplete(true)
    const result = MissionEngine.onReflectionSave(lesson.id, lesson.xpReward, answers)
    setProgressData(MissionEngine.getProgress())
    if (result.levelJustCompleted !== null && result.levelJustCompleted !== undefined) {
      setLevelJustCompleted(result.levelJustCompleted)
    }
    advance()
  }, [lesson.id, lesson.xpReward])

  function advance() {
    setActiveStep(s => Math.min(s + 1, steps.length - 1))
  }

  function navigateTo(index: number) {
    if (index <= activeStep) {
      setActiveStep(index)
    } else {
      CharacterTriggerEngine.fire('step-skipped', { lessonId: lesson.id })
    }
  }

  const levelProg = getLevelProgress(progressData, lesson.level)

  if (isLocked) {
    return <LevelGate blockedLessonId={lesson.id} data={progressData} />
  }

  const currentStep = steps[activeStep]
  const totalSteps  = steps.length

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* Level completion banner */}
      <AnimatePresence>
        {levelJustCompleted !== null && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '16px 24px',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.4rem' }}>👑</span>
              <div>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 2 }}>
                  Level {levelJustCompleted} Complete
                </div>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.06em', color: 'rgba(245,240,232,0.9)' }}>
                  Next level unlocked →
                </div>
              </div>
            </div>
            <button
              onClick={() => setLevelJustCompleted(null)}
              style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.3)', cursor: 'none', fontFamily: '"Space Mono", monospace', fontSize: '0.55rem' }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Viewed',   done: levelProg.viewedAll },
          { label: 'Practice', done: practiceComplete || levelProg.practiceAll },
          { label: 'Journal',  done: journalComplete  || levelProg.journalAll },
        ].map(chip => (
          <div key={chip.label} style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
            border: `1px solid ${chip.done ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.07)'}`,
            background: chip.done ? 'rgba(34,197,94,0.06)' : 'transparent',
          }}>
            <span style={{ fontSize: '0.7rem' }}>{chip.done ? '✓' : '○'}</span>
            <span style={{
              fontFamily: '"Space Mono", monospace', fontSize: '0.47rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: chip.done ? 'rgba(34,197,94,0.9)' : 'rgba(245,240,232,0.3)',
            }}>
              {chip.label}
            </span>
          </div>
        ))}
      </div>

      {/* Lesson header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)' }}>
          <Link href="/academy" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}>Academy</Link>
          <span>/</span>
          <span style={{ color: lesson.color }}>{lesson.tcuTerm}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, background: `${lesson.color}18`, border: `2px solid ${lesson.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
            {lesson.icon}
          </div>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${lesson.color}80` }}>
            Lesson {lesson.step} of {LESSONS.length} · +{lesson.xpReward} XP
          </div>
        </div>

        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: lesson.color, marginBottom: 8 }}>
          {lesson.title}
        </h1>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.45)', margin: 0 }}>
          {lesson.subtitle}
        </p>
      </div>

      {/* Dynamic step progress bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
          {steps.map((s, i) => (
            <button
              key={s.type}
              onClick={() => navigateTo(i)}
              title={i <= activeStep ? s.label : 'Complete previous steps first'}
              style={{
                flex: 1, height: 3, border: 'none', cursor: i <= activeStep ? 'none' : 'not-allowed',
                background: i < activeStep ? lesson.color : i === activeStep ? `${lesson.color}60` : 'rgba(255,255,255,0.05)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.47rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: lesson.color }}>
            {currentStep.label}
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.47rem', color: 'rgba(245,240,232,0.25)' }}>
            {activeStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Step content — one step at a time */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >

          {/* ── INTRO ─────────────────────────────────────────────────────── */}
          {currentStep.type === 'intro' && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Why This Matters" />

              {lesson.tradingChefIntro && (
                <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)', padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>👑</span>
                  <div>
                    <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.46rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 5 }}>
                      Trading Chef
                    </div>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.62rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', margin: 0, fontStyle: 'italic' }}>
                      {lesson.tradingChefIntro}
                    </p>
                  </div>
                </div>
              )}

              <div style={{ borderLeft: `4px solid ${lesson.color}`, paddingLeft: 28, marginBottom: 28 }}>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', lineHeight: 1.9, color: 'rgba(245,240,232,0.8)', margin: 0, fontStyle: 'italic' }}>
                  {lesson.hook}
                </p>
              </div>

              {mayhemData?.melissa && <MayhemCard moment={mayhemData.melissa} />}
              {mayhemData?.melody && <MayhemCard moment={mayhemData.melody} />}

              <ContinueButton color={lesson.color} onClick={advance} />
            </section>
          )}

          {/* ── CONCEPT ───────────────────────────────────────────────────── */}
          {currentStep.type === 'concept' && lesson.concept && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="The Concept" />
              <ConceptStep concept={lesson.concept} color={lesson.color} />
              <ContinueButton color={lesson.color} onClick={advance} />
            </section>
          )}

          {/* ── EXAMPLE ───────────────────────────────────────────────────── */}
          {currentStep.type === 'example' && lesson.example && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="See It in Action" />
              <ExampleStep example={lesson.example} color={lesson.color} />
              <KitchenMetaphor kitchenStory={lesson.kitchenStory} marketTranslation={lesson.marketTranslation} />
              <ContinueButton color={lesson.color} onClick={advance} />
            </section>
          )}

          {/* ── COMMON TRAP ───────────────────────────────────────────────── */}
          {currentStep.type === 'common-trap' && lesson.commonTrap && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Common Trap" />
              <CommonTrapStep trap={lesson.commonTrap} color={lesson.color} />
              <ContinueButton color={lesson.color} onClick={advance} />
            </section>
          )}

          {/* ── GUIDED PRACTICE ───────────────────────────────────────────── */}
          {currentStep.type === 'guided-practice' && lesson.guidedPractice && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Guided Practice" />
              <GuidedPracticeStep gp={lesson.guidedPractice} color={lesson.color} />
              <CharacterCoach character={character} message={lesson.characterCoaching} />
              <ContinueButton color={lesson.color} onClick={advance} label="I Studied This — Now I'll Practice →" />
            </section>
          )}

          {/* ── KITCHEN RUSH ──────────────────────────────────────────────── */}
          {currentStep.type === 'kitchen-rush' && lesson.kitchenRush && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Kitchen Rush" />
              <KitchenRushStep kr={lesson.kitchenRush} color={lesson.color} />
              <ContinueButton color={lesson.color} onClick={advance} label="Rush Complete — Move to Practice →" />
            </section>
          )}

          {/* ── INDEPENDENT PRACTICE ──────────────────────────────────────── */}
          {currentStep.type === 'practice' && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Your Turn" />

              <div style={{ marginBottom: 20, fontFamily: '"Space Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${lesson.color}80` }}>
                Independent Practice — No Guided Steps
              </div>

              {lesson.visualGuide && (
                <VisualExample
                  lessonId={lesson.id}
                  visualGuide={lesson.visualGuide}
                  tcuTerm={lesson.tcuTerm}
                />
              )}

              <PracticePrompt
                practice={lesson.practice}
                onComplete={handlePracticeComplete}
              />

              {lesson.riskWarning && <RiskWarning message={lesson.riskWarning} />}
            </section>
          )}

          {/* ── REFLECTION ────────────────────────────────────────────────── */}
          {currentStep.type === 'reflection' && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="Reflection Journal" />
              <ReflectionJournal
                prompts={lesson.journalPrompts}
                lessonId={lesson.id}
                onSaved={(answers) => handleJournalSaved(answers)}
              />
            </section>
          )}

          {/* ── XP REWARD ─────────────────────────────────────────────────── */}
          {currentStep.type === 'xp-reward' && (
            <section>
              <StepLabel color={lesson.color} num={activeStep + 1} total={totalSteps} label="XP Reward" />
              <XPReward xp={lesson.xpReward} lessonTitle={lesson.title} earned={journalComplete} />

              {/* Lesson navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(245,240,232,0.06)' }}>
                {prevObj ? (
                  <Link href={`/academy/${prevObj.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <div>
                      <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', marginBottom: 2 }}>← Previous</div>
                      <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.06em' }}>{prevObj.title}</div>
                    </div>
                  </Link>
                ) : <div />}

                {nextObj && (
                  <Link href={`/academy/${nextObj.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', textAlign: 'right' }}>
                    <div>
                      <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', marginBottom: 2 }}>Next →</div>
                      <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', color: lesson.color, letterSpacing: '0.06em' }}>{nextObj.title}</div>
                    </div>
                  </Link>
                )}
              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
