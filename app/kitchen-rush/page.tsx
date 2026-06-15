'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  KITCHEN_RUSH_SCENARIOS,
  getAvailableScenarios,
  type RushScenario,
  type ScenarioChoice,
  TOTAL_RUSH_XP,
} from '@/lib/kitchen-rush-scenarios'
import { loadProgress, getCurrentLevel } from '@/lib/progression'
import { XPRewardEngine } from '@/lib/xp-reward-engine'
import { CharacterTriggerEngine } from '@/lib/character-trigger-engine'

const CHAR_COLOR: Record<string, string> = {
  melissa: '#EC4899',
  melody: '#F59E0B',
  'burn-alarm': '#EF4444',
}

const LEVEL_LABELS: Record<number, string> = {
  0: 'Market Child',
  1: 'Candle Kitchen',
  2: 'Structure Kitchen',
  3: 'Flow Kitchen',
  4: 'AOI Kitchen',
  5: 'Delivery Kitchen',
  6: 'Confirmation Kitchen',
  7: 'The Pass',
  8: 'Tables Served',
  9: 'Head Chef',
}

type Phase = 'browse' | 'countdown' | 'active' | 'revealed'

export default function KitchenRushPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [availableLevels, setAvailableLevels] = useState<number[]>([0])
  const [filterLevel, setFilterLevel] = useState<number | 'all'>('all')
  const [scenario, setScenario] = useState<RushScenario | null>(null)
  const [phase, setPhase] = useState<Phase>('browse')
  const [countdown, setCountdown] = useState(3)
  const [timeLeft, setTimeLeft] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [journalText, setJournalText] = useState('')
  const [riskAnswer, setRiskAnswer] = useState('')
  const [xpEarned, setXpEarned] = useState(0)
  const [totalRushXP, setTotalRushXP] = useState(0)
  const [firstRushDone, setFirstRushDone] = useState(false)

  useEffect(() => {
    const data = loadProgress()
    const lvl  = getCurrentLevel(data)
    setCurrentLevel(lvl)

    // Build unlocked level list
    const unlocked = Array.from({ length: lvl + 1 }, (_, i) => i)
    setAvailableLevels(unlocked)

    // Load total XP earned from rushes (stored in progression)
    const totalXP = data.totalXP
    setTotalRushXP(totalXP)

    // Check first rush badge
    setFirstRushDone(XPRewardEngine.hasBadge('rush-runner'))
  }, [])

  const visibleScenarios = filterLevel === 'all'
    ? KITCHEN_RUSH_SCENARIOS.filter(s => availableLevels.includes(s.level))
    : KITCHEN_RUSH_SCENARIOS.filter(s => s.level === filterLevel)

  function startScenario(s: RushScenario) {
    setScenario(s)
    setPhase('countdown')
    setCountdown(3)
    setSelected(null)
    setJournalText('')
    setRiskAnswer('')
  }

  // Countdown effect
  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown <= 0) {
      setPhase('active')
      setTimeLeft(scenario?.timeLimitSeconds ?? 60)
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, countdown, scenario])

  // Timer effect
  useEffect(() => {
    if (phase !== 'active') return
    if (timeLeft <= 0) {
      // Time's up — auto-reveal with whatever is selected
      handleReveal()
      return
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft])

  const handleReveal = useCallback(() => {
    if (!scenario) return
    setPhase('revealed')

    // Award XP
    const result = XPRewardEngine.awardXP(scenario.xpReward, 'kitchen-rush', scenario.id)
    setXpEarned(scenario.xpReward)

    // Award first-rush badge
    if (!firstRushDone) {
      XPRewardEngine.awardBadge('rush-runner')
      setFirstRushDone(true)
    }

    // Fire coach cue
    CharacterTriggerEngine.fireCoachCue('practice-complete')

    // Analyze journal text for behavioral states
    if (journalText) {
      CharacterTriggerEngine.analyzeText(journalText, 'journal')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, journalText, firstRushDone])

  function reset() {
    setScenario(null)
    setPhase('browse')
    setSelected(null)
    setJournalText('')
    setRiskAnswer('')
    setXpEarned(0)
  }

  const timePct = scenario ? (timeLeft / scenario.timeLimitSeconds) * 100 : 100
  const timeColor = timePct > 50 ? '#22C55E' : timePct > 25 ? '#F59E0B' : '#EF4444'

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'var(--black)',
        padding: '120px 48px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ opacity: 0.2 }} />
        <div style={{
          position: 'absolute', right: -10, top: 60,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '20rem', color: 'rgba(201,168,76,0.025)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          RUSH
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            <div className="section-label-line" />
            <span className="section-label-text">Kitchen Rush · Recognition Trainer</span>
          </div>
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 20,
          }}>
            KITCHEN<br />
            <span style={{ color: 'var(--gold)' }}>RUSH</span>
          </h1>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem', lineHeight: 1.9,
            color: 'rgba(245,240,232,0.4)', maxWidth: 480, marginBottom: 32,
          }}>
            Timed scenarios test whether you can recognize Recipe elements under pressure. No guessing. No searching. You either see it or you don&apos;t — yet.
          </p>

          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { label: 'Scenarios', value: visibleScenarios.length },
              { label: 'Total Rush XP', value: TOTAL_RUSH_XP },
              { label: 'Your Level', value: LEVEL_LABELS[currentLevel] },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario browser */}
      <section style={{
        background: 'var(--deep)',
        padding: '48px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        display: phase !== 'browse' ? 'none' : undefined,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Level filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <button
              onClick={() => setFilterLevel('all')}
              style={{
                background: filterLevel === 'all' ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: `1px solid ${filterLevel === 'all' ? 'rgba(201,168,76,0.4)' : 'rgba(245,240,232,0.08)'}`,
                color: filterLevel === 'all' ? '#c9a84c' : 'rgba(245,240,232,0.3)',
                padding: '7px 16px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              All Levels
            </button>
            {availableLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                style={{
                  background: filterLevel === lvl ? 'rgba(201,168,76,0.12)' : 'transparent',
                  border: `1px solid ${filterLevel === lvl ? 'rgba(201,168,76,0.4)' : 'rgba(245,240,232,0.08)'}`,
                  color: filterLevel === lvl ? '#c9a84c' : 'rgba(245,240,232,0.3)',
                  padding: '7px 16px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                  transition: 'all 0.2s',
                }}
              >
                L{lvl} · {LEVEL_LABELS[lvl]}
              </button>
            ))}
          </div>

          {/* Scenario grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 2,
          }}>
            {visibleScenarios.map(s => (
              <motion.div
                key={s.id}
                whileHover={{ borderColor: 'rgba(201,168,76,0.3)' }}
                style={{
                  background: 'rgba(245,240,232,0.02)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '24px',
                  cursor: 'none',
                  transition: 'all 0.2s',
                }}
                onClick={() => startScenario(s)}
              >
                {/* Level + type */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.38rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    padding: '3px 10px',
                  }}>
                    L{s.level} · {LEVEL_LABELS[s.level]}
                  </span>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.38rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.25)',
                    border: '1px solid rgba(245,240,232,0.06)',
                    padding: '3px 10px',
                  }}>
                    {s.type}
                  </span>
                </div>

                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--cream)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}>
                  {s.question}
                </div>

                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  color: 'rgba(245,240,232,0.3)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}>
                  {s.setup}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.42rem',
                    color: 'rgba(245,240,232,0.2)',
                  }}>
                    ⏱ {s.timeLimitSeconds}s
                  </span>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    color: 'var(--gold)',
                  }}>
                    +{s.xpReward} XP
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown overlay */}
      <AnimatePresence>
        {phase === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 900,
              background: 'rgba(6,6,8,0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 20,
            }}
          >
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)',
            }}>
              Kitchen Rush Starting
            </div>
            <motion.div
              key={countdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '14rem', color: 'var(--gold)', lineHeight: 1,
              }}
            >
              {countdown}
            </motion.div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem', color: 'rgba(245,240,232,0.3)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Read the scenario. Trust your Recipe.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active scenario */}
      {(phase === 'active' || phase === 'revealed') && scenario && (
        <section style={{
          background: 'var(--black)',
          padding: '40px 48px 80px',
          minHeight: '100vh',
        }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {/* Timer bar */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 8,
                color: phase === 'revealed' ? 'rgba(245,240,232,0.2)' : timeColor,
              }}>
                <span>Level {scenario.level} · {LEVEL_LABELS[scenario.level]}</span>
                <span>{phase === 'revealed' ? 'Complete' : `${timeLeft}s remaining`}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.05)' }}>
                <motion.div
                  animate={{ width: phase === 'revealed' ? '100%' : `${timePct}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    background: phase === 'revealed' ? '#22C55E' : timeColor,
                  }}
                />
              </div>
            </div>

            {/* Setup */}
            <div style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.12)',
              borderLeft: '3px solid rgba(201,168,76,0.4)',
              padding: '20px 24px',
              marginBottom: 28,
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 8,
              }}>
                The Setup
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                lineHeight: 1.85,
                color: 'rgba(245,240,232,0.75)',
                margin: 0,
              }}>
                {scenario.setup}
              </p>
            </div>

            {/* Question */}
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.8rem',
              color: 'var(--cream)',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              marginBottom: 28,
            }}>
              {scenario.question}
            </div>

            {/* Multiple choice */}
            {scenario.type !== 'journal' && scenario.type !== 'risk-check' && scenario.choices && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {scenario.choices.map((choice: ScenarioChoice) => {
                  const isSelected = selected === choice.id
                  const isRevealed = phase === 'revealed'
                  const isTrap = choice.isTrap
                  const isCorrect = !isTrap && !choice.isHesitation

                  let borderColor = 'rgba(245,240,232,0.08)'
                  let bg = 'transparent'
                  let color = 'rgba(245,240,232,0.65)'

                  if (isRevealed && isSelected) {
                    if (isCorrect) { borderColor = '#22C55E'; bg = 'rgba(34,197,94,0.06)'; color = '#22C55E' }
                    else if (isTrap) { borderColor = '#EC4899'; bg = 'rgba(236,72,153,0.06)'; color = '#EC4899' }
                    else { borderColor = '#F59E0B'; bg = 'rgba(245,158,11,0.06)'; color = '#F59E0B' }
                  } else if (isSelected && !isRevealed) {
                    borderColor = 'rgba(201,168,76,0.5)'
                    bg = 'rgba(201,168,76,0.06)'
                    color = '#c9a84c'
                  } else if (isRevealed && isCorrect) {
                    borderColor = 'rgba(34,197,94,0.3)'
                    bg = 'rgba(34,197,94,0.03)'
                    color = 'rgba(34,197,94,0.7)'
                  }

                  return (
                    <motion.button
                      key={choice.id}
                      onClick={() => {
                        if (phase !== 'active') return
                        setSelected(choice.id)
                      }}
                      whileHover={phase === 'active' ? { x: 4 } : {}}
                      style={{
                        background: bg,
                        border: `1px solid ${borderColor}`,
                        padding: '16px 20px',
                        textAlign: 'left',
                        cursor: phase === 'active' ? 'none' : 'default',
                        transition: 'all 0.2s',
                        display: 'flex',
                        gap: 16,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        color: isSelected ? color : 'rgba(245,240,232,0.2)',
                        flexShrink: 0,
                        width: 16,
                        marginTop: 2,
                      }}>
                        {choice.id.toUpperCase()}
                      </span>
                      <div>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.62rem',
                          color,
                          lineHeight: 1.7,
                        }}>
                          {choice.label}
                        </div>
                        {isRevealed && isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              fontFamily: '"Space Mono", monospace',
                              fontSize: '0.55rem',
                              color: color,
                              lineHeight: 1.6,
                              marginTop: 8,
                              fontStyle: 'italic',
                              opacity: 0.75,
                            }}
                          >
                            {choice.feedback}
                          </motion.div>
                        )}
                        {isRevealed && !isSelected && isCorrect && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              fontFamily: '"Space Mono", monospace',
                              fontSize: '0.5rem',
                              color: 'rgba(34,197,94,0.6)',
                              marginTop: 6,
                              fontStyle: 'italic',
                            }}
                          >
                            ← This was the correct read
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Journal input */}
            {scenario.type === 'journal' && (
              <div style={{ marginBottom: 28 }}>
                {scenario.journalPrompt && (
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.58rem',
                    color: 'rgba(245,240,232,0.4)',
                    lineHeight: 1.75,
                    marginBottom: 16,
                    fontStyle: 'italic',
                  }}>
                    {scenario.journalPrompt}
                  </div>
                )}
                <textarea
                  value={journalText}
                  onChange={e => setJournalText(e.target.value)}
                  disabled={phase === 'revealed'}
                  placeholder="Write your debrief here..."
                  rows={8}
                  style={{
                    width: '100%',
                    background: 'rgba(245,240,232,0.02)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    color: 'rgba(245,240,232,0.75)',
                    padding: '16px 20px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    lineHeight: 1.8,
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            {/* Risk check input */}
            {scenario.type === 'risk-check' && scenario.riskPrompt && (
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 12,
                  marginBottom: 20,
                }}>
                  {[
                    { label: 'Account Size', value: `$${scenario.riskPrompt.accountSize.toLocaleString()}` },
                    { label: 'Entry Price', value: `$${scenario.riskPrompt.entryPrice}` },
                    { label: 'Burn Point (Stop)', value: `$${scenario.riskPrompt.stopPrice}` },
                    { label: 'Risk %', value: `${scenario.riskPrompt.suggestedRisk}%` },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: 'rgba(201,168,76,0.04)',
                      border: '1px solid rgba(201,168,76,0.1)',
                      padding: '14px 16px',
                    }}>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.4rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(201,168,76,0.4)',
                        marginBottom: 6,
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.2rem',
                        color: 'var(--gold)',
                      }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <label style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  color: 'rgba(245,240,232,0.4)',
                  display: 'block',
                  marginBottom: 8,
                  letterSpacing: '0.1em',
                }}>
                  Your position size (units):
                </label>
                <input
                  type="number"
                  value={riskAnswer}
                  onChange={e => setRiskAnswer(e.target.value)}
                  disabled={phase === 'revealed'}
                  placeholder="Enter number of units..."
                  style={{
                    background: 'rgba(245,240,232,0.03)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'rgba(245,240,232,0.85)',
                    padding: '14px 18px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.75rem',
                    width: '100%',
                    outline: 'none',
                    boxSizing: 'border-box',
                    marginBottom: 12,
                  }}
                />
                {phase === 'revealed' && scenario.correctAnswer && (
                  <div style={{
                    background: riskAnswer.trim() === scenario.correctAnswer
                      ? 'rgba(34,197,94,0.06)'
                      : 'rgba(201,168,76,0.06)',
                    border: `1px solid ${riskAnswer.trim() === scenario.correctAnswer ? 'rgba(34,197,94,0.25)' : 'rgba(201,168,76,0.2)'}`,
                    padding: '12px 16px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    color: riskAnswer.trim() === scenario.correctAnswer ? '#22C55E' : '#c9a84c',
                    lineHeight: 1.6,
                  }}>
                    {riskAnswer.trim() === scenario.correctAnswer
                      ? `✓ Correct — ${scenario.correctAnswer} units`
                      : `Correct answer: ${scenario.correctAnswer} units`}
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            {phase === 'active' && (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={handleReveal}
                  style={{
                    background: '#c9a84c',
                    border: 'none',
                    color: '#060608',
                    padding: '12px 32px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                  }}
                >
                  {scenario.type === 'journal' ? 'Submit Journal' : 'Reveal Answer →'}
                </button>
                <button
                  onClick={reset}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(245,240,232,0.08)',
                    color: 'rgba(245,240,232,0.25)',
                    padding: '12px 24px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                  }}
                >
                  Exit
                </button>
              </div>
            )}

            {/* Revealed state */}
            {phase === 'revealed' && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 4 }}
                >
                  {/* XP award */}
                  <div style={{
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    padding: '20px 24px',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2.5rem',
                      color: 'var(--gold)',
                      lineHeight: 1,
                    }}>
                      +{xpEarned} XP
                    </div>
                    <div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.44rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(201,168,76,0.5)',
                        marginBottom: 4,
                      }}>
                        Kitchen Rush Complete
                      </div>
                      {firstRushDone && xpEarned > 0 && (
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.48rem',
                          color: 'rgba(245,240,232,0.4)',
                        }}>
                          Rush Runner badge earned ⏱️
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div style={{
                    background: 'rgba(245,240,232,0.02)',
                    border: '1px solid rgba(245,240,232,0.06)',
                    borderLeft: '3px solid rgba(201,168,76,0.4)',
                    padding: '20px 24px',
                    marginBottom: 20,
                  }}>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.44rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.4)',
                      marginBottom: 10,
                    }}>
                      The Read
                    </div>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.62rem',
                      lineHeight: 1.85,
                      color: 'rgba(245,240,232,0.65)',
                      margin: 0,
                    }}>
                      {scenario.explanation}
                    </p>
                  </div>

                  {/* Character note */}
                  {scenario.characterNote && (
                    <div style={{
                      background: `${CHAR_COLOR[scenario.characterNote.character] ?? '#C9A84C'}08`,
                      border: `1px solid ${CHAR_COLOR[scenario.characterNote.character] ?? '#C9A84C'}25`,
                      borderLeft: `3px solid ${CHAR_COLOR[scenario.characterNote.character] ?? '#C9A84C'}`,
                      padding: '16px 20px',
                      marginBottom: 24,
                    }}>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.44rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: CHAR_COLOR[scenario.characterNote.character] ?? '#C9A84C',
                        marginBottom: 6,
                      }}>
                        {scenario.characterNote.character.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                      <p style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.6rem',
                        color: 'rgba(245,240,232,0.55)',
                        lineHeight: 1.75,
                        fontStyle: 'italic',
                        margin: 0,
                      }}>
                        &ldquo;{scenario.characterNote.note}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      onClick={reset}
                      style={{
                        background: '#c9a84c',
                        border: 'none',
                        color: '#060608',
                        padding: '12px 32px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'none',
                      }}
                    >
                      Next Scenario →
                    </button>
                    <Link href="/academy" style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: 'transparent',
                        border: '1px solid rgba(245,240,232,0.08)',
                        color: 'rgba(245,240,232,0.3)',
                        padding: '12px 24px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        Back to Academy
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      )}

      {phase === 'browse' && <Footer />}
    </main>
  )
}
