'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Lesson, CHARACTERS, LESSONS } from '@/lib/academy'
import { getLessonMayhem } from '@/lib/mayhem'
import {
  loadProgress,
  markLessonViewed,
  markPracticeComplete,
  markJournalSaved,
  canAccessLesson,
  getLevelProgress,
} from '@/lib/progression'
import { dispatchTrigger } from '@/lib/triggers'
import CharacterCoach from './CharacterCoach'
import KitchenMetaphor from './KitchenMetaphor'
import VisualExample from './VisualExample'
import PracticePrompt from './PracticePrompt'
import XPReward from './XPReward'
import ReflectionJournal from './ReflectionJournal'
import RiskWarning from './RiskWarning'
import ProgressUnlock from './ProgressUnlock'
import MayhemCard from './MayhemCard'
import LevelGate from '../progression/LevelGate'

interface Props {
  lesson: Lesson
}

const STEPS = [
  { id: 'hook',       label: '1. Hook'        },
  { id: 'kitchen',    label: '2. Kitchen'      },
  { id: 'visual',     label: '3. Visual'       },
  { id: 'coaching',   label: '4. Coaching'     },
  { id: 'practice',   label: '5. Practice'     },
  { id: 'journal',    label: '6. Journal'      },
  { id: 'xp',         label: '7. XP'           },
]

export default function LessonShell({ lesson }: Props) {
  const [practiceComplete, setPracticeComplete] = useState(false)
  const [journalComplete, setJournalComplete]   = useState(false)
  const [activeStep, setActiveStep]             = useState(0)
  const [levelJustCompleted, setLevelJustCompleted] = useState<number | null>(null)
  const [isLocked, setIsLocked]                 = useState(false)
  const [progressData, setProgressData]         = useState(() => loadProgress())

  const character     = CHARACTERS[lesson.character]
  const warnChar      = lesson.warningCharacter ? CHARACTERS[lesson.warningCharacter] : null
  const prevLessonObj = lesson.prevLesson ? LESSONS.find(l => l.slug === lesson.prevLesson) ?? null : null
  const nextLessonObj = lesson.nextLesson ? LESSONS.find(l => l.slug === lesson.nextLesson) ?? null : null
  const mayhemData    = getLessonMayhem(lesson.id)

  // Gate check + mark viewed on mount
  useEffect(() => {
    const data = loadProgress()
    if (!canAccessLesson(data, lesson.id)) {
      setIsLocked(true)
      dispatchTrigger({ type: 'lesson-jumped', lessonId: lesson.id, level: lesson.level })
      return
    }
    const { data: updated, levelJustCompleted: lvl } = markLessonViewed(lesson.id)
    setProgressData(updated)
    if (lvl !== null) {
      setLevelJustCompleted(lvl)
      dispatchTrigger({ type: 'level-complete', level: lvl })
    }
  }, [lesson.id, lesson.level])

  function handlePracticeComplete() {
    setPracticeComplete(true)
    const { data: updated, levelJustCompleted: lvl } = markPracticeComplete(lesson.id)
    setProgressData(updated)
    if (lvl !== null) {
      setLevelJustCompleted(lvl)
      dispatchTrigger({ type: 'level-complete', level: lvl })
    }
    dispatchTrigger({ type: 'practice-complete', lessonId: lesson.id })
  }

  function handleJournalSaved() {
    setJournalComplete(true)
    const { data: updated, levelJustCompleted: lvl } = markJournalSaved(lesson.id)
    setProgressData(updated)
    if (lvl !== null) {
      setLevelJustCompleted(lvl)
      dispatchTrigger({ type: 'level-complete', level: lvl })
    }
    dispatchTrigger({ type: 'journal-complete', lessonId: lesson.id })
  }

  if (isLocked) {
    return <LevelGate blockedLessonId={lesson.id} data={progressData} />
  }

  const levelProg = getLevelProgress(progressData, lesson.level)

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
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.35)',
              padding: '16px 24px',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.4rem' }}>👑</span>
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.25em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}>
                  Level {levelJustCompleted} Complete
                </div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.06em',
                  color: 'rgba(245,240,232,0.9)',
                }}>
                  Next level unlocked →
                </div>
              </div>
            </div>
            <button
              onClick={() => setLevelJustCompleted(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(245,240,232,0.3)',
                cursor: 'none',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Viewed', done: levelProg.viewedAll },
          { label: 'Practice', done: practiceComplete || levelProg.practiceAll },
          { label: 'Journal', done: journalComplete || levelProg.journalAll },
        ].map(chip => (
          <div
            key={chip.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              border: `1px solid ${chip.done ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
              background: chip.done ? 'rgba(34,197,94,0.06)' : 'transparent',
            }}
          >
            <span style={{ fontSize: '0.7rem' }}>{chip.done ? '✓' : '○'}</span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: chip.done ? 'rgba(34,197,94,0.9)' : 'rgba(245,240,232,0.3)',
            }}>
              {chip.label}
            </span>
          </div>
        ))}
      </div>

      {/* Lesson header */}
      <div style={{ marginBottom: 48 }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.5rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.2)',
        }}>
          <Link href="/academy" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}>
            Academy
          </Link>
          <span>/</span>
          <span style={{ color: lesson.color }}>{lesson.tcuTerm}</span>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40,
            background: `${lesson.color}18`,
            border: `2px solid ${lesson.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
          }}>
            {lesson.icon}
          </div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: `${lesson.color}80`,
          }}>
            Lesson {lesson.step} of {LESSONS.length} · +{lesson.xpReward} XP
          </div>
        </div>

        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          lineHeight: 0.95,
          letterSpacing: '0.02em',
          color: lesson.color,
          marginBottom: 8,
        }}>
          {lesson.title}
        </h1>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.7rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.45)',
          margin: 0,
        }}>
          {lesson.subtitle}
        </p>
      </div>

      {/* Step progress bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'flex',
          gap: 4,
          marginBottom: 10,
        }}>
          {STEPS.map((s, i) => {
            const isUnlocked = i <= activeStep
            const isDone = i < activeStep
            const isCurrent = i === activeStep
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (i <= activeStep) setActiveStep(i)
                  else dispatchTrigger({ type: 'step-skipped', lessonId: lesson.id })
                }}
                title={isUnlocked ? s.label : 'Complete previous steps first'}
                style={{
                  flex: 1,
                  height: 4,
                  background: isDone
                    ? lesson.color
                    : isCurrent
                    ? `${lesson.color}60`
                    : 'rgba(255,255,255,0.06)',
                  border: 'none',
                  cursor: isUnlocked ? 'none' : 'not-allowed',
                  transition: 'background 0.3s',
                }}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: lesson.color,
          }}>
            {STEPS[activeStep].label}
          </span>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            color: 'rgba(245,240,232,0.25)',
          }}>
            {activeStep + 1} / {STEPS.length}
          </span>
        </div>
      </div>

      {/* Step content — one step at a time */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >

          {/* ── STEP 0: WHY THIS MATTERS ── */}
          {activeStep === 0 && (
            <section>
              <StepLabel color={lesson.color}>1 · Why This Matters</StepLabel>
              <div style={{ borderLeft: `4px solid ${lesson.color}`, paddingLeft: 28, marginBottom: 32 }}>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.9,
                  color: 'rgba(245,240,232,0.8)',
                  margin: 0,
                  fontStyle: 'italic',
                }}>
                  {lesson.hook}
                </p>
              </div>
              <ContinueButton color={lesson.color} onClick={() => setActiveStep(1)} />
            </section>
          )}

          {/* ── STEP 1: KITCHEN STORY ── */}
          {activeStep === 1 && (
            <section>
              <StepLabel color={lesson.color}>2 · Kitchen Story</StepLabel>
              <KitchenMetaphor
                kitchenStory={lesson.kitchenStory}
                marketTranslation={lesson.marketTranslation}
              />
              <div style={{ marginTop: 32 }}>
                <ContinueButton color={lesson.color} onClick={() => setActiveStep(2)} />
              </div>
            </section>
          )}

          {/* ── STEP 2: VISUAL GUIDE ── */}
          {activeStep === 2 && (
            <section>
              <StepLabel color={lesson.color}>3 · Visual Guide</StepLabel>
              <VisualExample
                lessonId={lesson.id}
                visualGuide={lesson.visualGuide}
                tcuTerm={lesson.tcuTerm}
              />
              <div style={{ marginTop: 32 }}>
                <ContinueButton color={lesson.color} onClick={() => setActiveStep(3)} />
              </div>
            </section>
          )}

          {/* ── STEP 3: CHARACTER COACHING ── */}
          {activeStep === 3 && (
            <section>
              <StepLabel color={lesson.color}>4 · Character Coaching</StepLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <CharacterCoach character={character} message={lesson.characterCoaching} />
                {warnChar && (
                  <CharacterCoach
                    character={warnChar}
                    message={`Watch out for ${warnChar.name}. ${warnChar.catchphrase}`}
                  />
                )}
              </div>

              {/* Mayhem cards appear in coaching step */}
              {mayhemData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {mayhemData.primary === 'melissa-mayhem' && mayhemData.melissa && (
                    <MayhemCard moment={mayhemData.melissa} />
                  )}
                  {mayhemData.primary === 'melody-mayhem' && mayhemData.melody && (
                    <MayhemCard moment={mayhemData.melody} />
                  )}
                  {mayhemData.primary === 'melissa-mayhem' && mayhemData.melody && (
                    <MayhemCard moment={mayhemData.melody} />
                  )}
                  {mayhemData.primary === 'melody-mayhem' && mayhemData.melissa && (
                    <MayhemCard moment={mayhemData.melissa} />
                  )}
                </div>
              )}

              {lesson.psychologyNote && (
                <div style={{
                  background: 'rgba(236,72,153,0.03)',
                  border: '1px solid rgba(236,72,153,0.15)',
                  padding: '20px 24px',
                  borderLeft: '3px solid #EC4899',
                  marginTop: 16,
                }}>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.44rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(236,72,153,0.6)',
                    marginBottom: 8,
                  }}>
                    🧠 Trading Psychology
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    lineHeight: 1.8,
                    color: 'rgba(245,240,232,0.65)',
                    margin: 0,
                  }}>
                    {lesson.psychologyNote}
                  </p>
                </div>
              )}

              <div style={{ marginTop: 32 }}>
                <ContinueButton color={lesson.color} onClick={() => setActiveStep(4)} />
              </div>
            </section>
          )}

          {/* ── STEP 4: PRACTICE ── */}
          {activeStep === 4 && (
            <section>
              <StepLabel color={lesson.color}>5 · Practice Task</StepLabel>
              {lesson.riskWarning && <RiskWarning message={lesson.riskWarning} />}
              <PracticePrompt
                practice={lesson.practice}
                onComplete={() => {
                  handlePracticeComplete()
                  setActiveStep(5)
                }}
              />
              {/* Melody appears if they've been sitting here without practicing */}
            </section>
          )}

          {/* ── STEP 5: JOURNAL ── */}
          {activeStep === 5 && (
            <section>
              <StepLabel color={lesson.color}>6 · Reflection Journal</StepLabel>
              <ReflectionJournal
                prompts={lesson.journalPrompts}
                lessonId={lesson.id}
                onSaved={() => {
                  handleJournalSaved()
                  setActiveStep(6)
                }}
              />
            </section>
          )}

          {/* ── STEP 6: XP + NEXT ── */}
          {activeStep === 6 && (
            <section>
              <StepLabel color={lesson.color}>7 · XP + Next Step</StepLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <XPReward
                  xp={lesson.xpReward}
                  lessonTitle={lesson.title}
                  earned={practiceComplete}
                />
                <ProgressUnlock
                  nextLesson={nextLessonObj}
                  prevLesson={prevLessonObj}
                  currentXP={0}
                  lessonXP={lesson.xpReward}
                />
              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  )
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function StepLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.48rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: 'rgba(245,240,232,0.2)',
      marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

function ContinueButton({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: '#060608',
        border: 'none',
        padding: '13px 32px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'none',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
    >
      Continue →
    </button>
  )
}
