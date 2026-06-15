'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { getLevelProgress, getLevelStatus, type UserProgressData } from '@/lib/progression'
import { ACADEMY_MODULES, LESSONS } from '@/lib/academy'

interface LevelGateProps {
  blockedLessonId: string
  data: UserProgressData
  onBack?: () => void
}

export default function LevelGate({ blockedLessonId, data, onBack }: LevelGateProps) {
  const lesson = LESSONS.find(l => l.id === blockedLessonId)
  if (!lesson) return null

  const blockingLevel = lesson.level - 1
  const blockingMod = ACADEMY_MODULES.find(m => m.level === blockingLevel)
  const currentProgress = blockingMod ? getLevelProgress(data, blockingLevel) : null
  const blockingStatus = getLevelStatus(data, blockingLevel)

  // Find the active level
  let activeLevel = 0
  for (const mod of ACADEMY_MODULES) {
    const s = getLevelStatus(data, mod.level)
    if (s === 'active' || s === 'complete') activeLevel = mod.level
  }
  const activeMod = ACADEMY_MODULES.find(m => m.level === activeLevel)
  const activeLesson = activeMod ? LESSONS.find(l => l.id === activeMod.lessonIds[0]) : null

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060608',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: 520, width: '100%' }}
      >
        {/* Lock icon */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              border: '1px solid rgba(201,168,76,0.2)',
              background: 'rgba(201,168,76,0.04)',
              marginBottom: 20,
            }}
          >
            <Lock size={24} style={{ color: '#c9a84c' }} />
          </motion.div>

          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.6)',
            marginBottom: 10,
          }}>
            Locked
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            letterSpacing: '0.06em',
            color: 'rgba(245,240,232,0.95)',
            marginBottom: 8,
          }}>
            {lesson.levelName}
          </h1>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            color: 'rgba(245,240,232,0.4)',
            lineHeight: 1.7,
            maxWidth: 360,
            margin: '0 auto',
          }}>
            You haven't earned this level yet. Complete the level below it first.
          </p>
        </div>

        {/* Trading Chef quote */}
        <div style={{
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.15)',
          padding: '20px 24px',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>👑</span>
            <div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                color: '#c9a84c',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                The Trading Chef
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                color: 'rgba(245,240,232,0.7)',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}>
                "The kitchen has an order. You learn prep before you cook. You cook before you plate.
                There are no shortcuts in a professional kitchen — only chefs who thought there were."
              </p>
            </div>
          </div>
        </div>

        {/* Current progress toward unlock */}
        {currentProgress && blockingMod && blockingStatus !== 'complete' && (
          <div style={{
            background: 'rgba(6,6,8,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '20px 24px',
            marginBottom: 24,
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
              marginBottom: 16,
            }}>
              Complete to Unlock — Level {blockingLevel}: {blockingMod.name}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Lessons Viewed', done: currentProgress.viewedAll, icon: '📖' },
                { label: 'Practice Complete', done: currentProgress.practiceAll, icon: '✍️' },
                { label: 'Journal Saved', done: currentProgress.journalAll, icon: '📓' },
              ].map(row => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{row.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.62rem',
                        color: row.done ? 'rgba(34,197,94,0.9)' : 'rgba(245,240,232,0.5)',
                      }}>
                        {row.label}
                      </span>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.6rem',
                        color: row.done ? '#22C55E' : 'rgba(245,240,232,0.25)',
                      }}>
                        {row.done ? '✓ Done' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lesson progress bar */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(245,240,232,0.3)',
                }}>
                  Lessons
                </span>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(245,240,232,0.4)',
                }}>
                  {currentProgress.lessonsComplete}/{currentProgress.lessonsTotal}
                </span>
              </div>
              <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress.lessonsTotal > 0 ? (currentProgress.lessonsComplete / currentProgress.lessonsTotal) * 100 : 0}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0, left: 0, background: '#c9a84c' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Melissa interruption */}
        <div style={{
          background: 'rgba(236,72,153,0.04)',
          border: '1px solid rgba(236,72,153,0.15)',
          padding: '14px 20px',
          marginBottom: 24,
          borderLeft: '3px solid #EC4899',
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <motion.span
              animate={{ rotate: [-2, 2, -2, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              style={{ fontSize: '1rem', flexShrink: 0 }}
            >
              ⚡
            </motion.span>
            <div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                color: '#EC4899',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}>
                Melissa Mayhem
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                "You tried to skip ahead. That's exactly what I do. Every time. And every time the kitchen has to remind me how this works."
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activeLesson && (
            <Link
              href={`/academy/${activeLesson.slug}`}
              style={{
                display: 'block',
                background: '#c9a84c',
                color: '#060608',
                padding: '14px 24px',
                textAlign: 'center',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Continue Where I Left Off →
            </Link>
          )}

          <Link
            href="/academy"
            style={{
              display: 'block',
              background: 'none',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'rgba(201,168,76,0.7)',
              padding: '12px 24px',
              textAlign: 'center',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Return to Academy
          </Link>

          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(245,240,232,0.3)',
                padding: '10px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.6)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.3)' }}
            >
              ← Go Back
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
