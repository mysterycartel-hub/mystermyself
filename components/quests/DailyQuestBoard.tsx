'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getActiveQuests,
  completeQuest,
  dismissQuest,
  getDailyXPEarned,
  getTodayCompletionCount,
  type DailyQuest,
  type QuestProgress,
} from '@/lib/quests'
import { getCurrentLevel, loadProgress } from '@/lib/progression'

const CHARACTER_COLORS: Record<string, string> = {
  'trading-chef': '#C9A84C',
  'chef-goldie':  '#F59E0B',
  'melody':       '#F59E0B',
  'melissa':      '#EC4899',
  'burn-alarm':   '#EF4444',
}

const QUEST_TYPE_LABEL: Record<string, string> = {
  'view-lesson':       'Read Lesson',
  'complete-practice': 'Complete Practice',
  'save-journal':      'Save Journal',
  'run-rush-scenario': 'Kitchen Rush',
  'read-recipe-step':  'Recipe Step',
  'visit-kitchen':     'Market Kitchen',
  'visit-passport':    'Visit Passport',
  'identify-character':'Identify Character',
}

export default function DailyQuestBoard() {
  const [quests, setQuests]     = useState<DailyQuest[]>([])
  const [progress, setProgress] = useState<QuestProgress | null>(null)
  const [xpToday, setXpToday]   = useState(0)
  const [level, setLevel]       = useState(0)
  const [justDone, setJustDone] = useState<string | null>(null)

  function refresh() {
    const data = loadProgress()
    const lvl  = getCurrentLevel(data)
    setLevel(lvl)
    const { quests: q, progress: p } = getActiveQuests(lvl, 3)
    setQuests(q)
    setProgress(p)
    setXpToday(getDailyXPEarned(lvl))
  }

  useEffect(() => {
    refresh()
  }, [])

  function handleComplete(q: DailyQuest) {
    completeQuest(q.id)
    setJustDone(q.id)
    setTimeout(() => setJustDone(null), 2500)
    refresh()
  }

  function handleDismiss(q: DailyQuest) {
    dismissQuest(q.id)
    refresh()
  }

  const completedToday = getTodayCompletionCount()

  return (
    <div>
      {/* Board header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
      }}>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 6,
          }}>
            Daily Missions · Level {level}
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.4rem',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            Today&apos;s Kitchen Orders
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2rem',
            color: xpToday > 0 ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
            lineHeight: 1,
          }}>
            +{xpToday} XP
          </div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.2)',
            marginTop: 2,
          }}>
            Earned today · {completedToday} done
          </div>
        </div>
      </div>

      {/* Quest list */}
      {quests.length === 0 ? (
        <div style={{
          padding: '40px 0',
          textAlign: 'center',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          color: 'rgba(245,240,232,0.2)',
          lineHeight: 1.8,
        }}>
          All orders served today.<br />
          <span style={{ fontSize: '0.52rem', color: 'rgba(245,240,232,0.15)' }}>
            New missions unlock at midnight.
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnimatePresence>
            {quests.map((q, i) => {
              const charColor = q.characterNote
                ? CHARACTER_COLORS[q.characterNote.character] ?? '#C9A84C'
                : '#C9A84C'
              const isDone = progress?.completed.includes(q.id)
              const isNew = justDone === q.id

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: isNew
                      ? 'rgba(34,197,94,0.06)'
                      : 'rgba(245,240,232,0.02)',
                    border: `1px solid ${isNew ? 'rgba(34,197,94,0.25)' : 'rgba(201,168,76,0.08)'}`,
                    borderLeft: `3px solid ${isNew ? '#22C55E' : charColor + '60'}`,
                    padding: '20px 24px',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                >
                  {/* Quest type badge */}
                  <div style={{
                    position: 'absolute',
                    top: 12, right: 12,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.38rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: charColor,
                    background: charColor + '12',
                    border: `1px solid ${charColor}25`,
                    padding: '3px 10px',
                  }}>
                    {QUEST_TYPE_LABEL[q.type] ?? q.type}
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.1rem',
                      color: 'var(--cream)',
                      letterSpacing: '0.03em',
                      lineHeight: 1,
                      marginBottom: 6,
                      paddingRight: 80,
                    }}>
                      {q.title}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(245,240,232,0.45)',
                      lineHeight: 1.65,
                    }}>
                      {q.description}
                    </div>
                  </div>

                  {/* Character note */}
                  {q.characterNote && (
                    <div style={{
                      borderLeft: `2px solid ${charColor}40`,
                      paddingLeft: 12,
                      marginBottom: 14,
                    }}>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.44rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: charColor,
                        marginBottom: 3,
                      }}>
                        {q.characterNote.character.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.52rem',
                        color: 'rgba(245,240,232,0.4)',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}>
                        &ldquo;{q.characterNote.note}&rdquo;
                      </div>
                    </div>
                  )}

                  {/* Footer: XP + actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.2rem',
                      color: 'var(--gold)',
                      lineHeight: 1,
                    }}>
                      +{q.xpReward} XP
                    </div>

                    {isNew ? (
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        color: '#22C55E',
                        letterSpacing: '0.12em',
                      }}>
                        ✓ Marked Complete
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => handleDismiss(q)}
                          style={{
                            background: 'none',
                            border: '1px solid rgba(245,240,232,0.08)',
                            color: 'rgba(245,240,232,0.2)',
                            padding: '6px 14px',
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.44rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'none',
                            transition: 'all 0.2s',
                          }}
                        >
                          Skip
                        </button>
                        <button
                          onClick={() => handleComplete(q)}
                          style={{
                            background: charColor,
                            border: 'none',
                            color: '#060608',
                            padding: '6px 18px',
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.44rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'none',
                            transition: 'opacity 0.2s',
                          }}
                        >
                          Done →
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Daily XP bar */}
      {xpToday > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.2)',
            marginBottom: 8,
          }}>
            <span>Daily XP</span>
            <span>{xpToday} / 200 XP daily cap</span>
          </div>
          <div style={{ height: 2, background: 'rgba(201,168,76,0.1)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((xpToday / 200) * 100, 100)}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100%', background: 'var(--gold)' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
