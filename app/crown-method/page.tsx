'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const GOLD = 'var(--gold)'

const PILLARS = [
  {
    id: 'M',
    label: 'M — The Move',
    color: '#C9A84C',
    headline: 'Read Where Price Is Going',
    body: 'M is the displacement — the institutional move that creates imbalance in the market. Before any setup is valid, you must identify the Move. It sets the direction, the magnitude, and the reason for the next retracement.',
    recipeLink: 'Bias + Flow',
    icon: '📐',
  },
  {
    id: 'S',
    label: 'S — The Structure',
    color: '#38BDF8',
    headline: 'Mark What the Market Remembers',
    body: 'S is the structural level — the point where the Move originated or where price is likely to react. Structure is not drawn from candles. It is drawn from where institutional intent changed. One level. Precise.',
    recipeLink: 'AOI + Delivery',
    icon: '🏗️',
  },
  {
    id: 'Crown',
    label: 'Crown — The Confirmation',
    color: '#A855F7',
    headline: 'Wait for the Crown to Form',
    body: 'The Crown is the confirmation pattern at the structural level — a specific sequence of price behavior that signals institutional re-entry. When M and S are aligned and the Crown forms, The Pass opens. Not before.',
    recipeLink: 'Confirmation + The Pass',
    icon: '👑',
  },
]

const MODULES = [
  {
    id: 'crown-01',
    title: 'The Crown Pattern — Defined',
    subtitle: 'What it looks like, why it works, and what it is NOT',
    level: 'Foundation',
    color: '#C9A84C',
    locked: false,
    content: [
      'The Crown is not a candle pattern.',
      'The Crown is not a indicator signal.',
      'The Crown is not a shortcut past The Recipe.',
      'The Crown is the final expression of Recipe completion — the moment when Bias, Flow, AOI, Delivery, and Confirmation converge into a single recognizable pattern.',
      'When you see it, you will know it. Until then, do not force it.',
    ],
  },
  {
    id: 'crown-02',
    title: 'The M — Reading Institutional Displacement',
    subtitle: 'How to identify the initiating move and separate it from noise',
    level: 'Intermediate',
    color: '#38BDF8',
    locked: false,
    content: [
      'Institutional displacement is not a big candle. Big candles happen at retail stops.',
      'The M is a series of candles with purpose — higher closes, lower closes — that carry through a structural level.',
      'M must cross through a previous level of significance. That crossing is what makes it a Move.',
      'If price moved without crossing a level — it is not the M. It is noise inside a range.',
      'Mark the origin of the M. That origin is often your next AOI.',
    ],
  },
  {
    id: 'crown-03',
    title: 'The S — One Level. Precise.',
    subtitle: 'Why structure precision separates the Recipe from gambling',
    level: 'Intermediate',
    color: '#38BDF8',
    locked: false,
    content: [
      'S is not a zone. S is a level.',
      'The difference matters: zones are where you hope price reacts. Levels are where The Recipe says price should react.',
      'S is derived from the origin of the M. Where did the Move begin? That is the level.',
      'Do not adjust S after price moves. S is fixed. Price either returns to it or it does not.',
      'If price returns and the Crown forms — the setup is live.',
    ],
  },
  {
    id: 'crown-04',
    title: 'The Crown Pattern — Structure',
    subtitle: 'The three-phase sequence that confirms institutional intent',
    level: 'Advanced',
    color: '#A855F7',
    locked: true,
    content: [
      'Phase 1: Price returns to S with corrective flow (not impulsive — this matters).',
      'Phase 2: Price shows a structural shift on the lower timeframe at or near S.',
      'Phase 3: Price delivers in the direction of M with confirmation on entry timeframe.',
      'All three phases required. Missing one phase means no Crown — no entry.',
      'The Crown is the Recipe compressed into a single setup framework.',
    ],
  },
  {
    id: 'crown-05',
    title: 'Crown Entries — The Pass Through the Crown',
    subtitle: 'Where to enter, where your burn point lives, and where Tables Served is',
    level: 'Advanced',
    color: '#A855F7',
    locked: true,
    content: [
      'The Pass in a Crown setup is at Phase 3 confirmation — not before.',
      'Burn point is below the structural level S with a buffer for spread and volatility.',
      'Tables Served is set at the next structural level in the direction of M.',
      'Risk:Reward minimum 1:2. If the geometry does not give you 1:2, the setup is not a Crown setup — it is a trade you are forcing.',
      'The Crown does not promise wins. The Crown promises process.',
    ],
  },
  {
    id: 'crown-06',
    title: 'Crown Drill — Full Sequence',
    subtitle: 'Practice identifying M, S, and Crown across multiple scenarios',
    level: 'Head Chef',
    color: '#C9A84C',
    locked: true,
    content: [
      'Drill 1: Find the M. Mark the S. Wait for the Crown. Report your read.',
      'Drill 2: Identify which phase of the Crown the scenario is showing.',
      'Drill 3: Given a formed Crown, calculate the entry, burn point, and Tables Served for a 1% risk trade.',
      'These drills are in Kitchen Rush format. Timer active. Recipe required.',
    ],
  },
]

export default function CrownMethodPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activePillar, setActivePillar] = useState<string | null>('M')

  const active = MODULES.find(m => m.id === activeModule)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />
        <div className="hero-glow" />

        {/* Ghost crown */}
        <div style={{
          position: 'absolute', right: -40, top: 40,
          fontSize: '22rem', opacity: 0.025,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          👑
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            <div className="section-label-line" />
            <span className="section-label-text">TCU Premium · Level 9+ Extension</span>
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: 20,
          }}>
            THE<br />
            <span style={{ color: GOLD }}>CROWN</span><br />
            METHOD
          </h1>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem', lineHeight: 1.9,
            color: 'rgba(245,240,232,0.45)', maxWidth: 540, marginBottom: 40,
          }}>
            The Crown Method is the advanced TCU framework — built on top of The Recipe. It is not a replacement for The Recipe. It is its highest expression. Three elements. One pattern. The pass only opens when all three align.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            {[
              { label: 'Framework', value: 'M · S · Crown' },
              { label: 'Prerequisite', value: 'Level 9 — Head Chef' },
              { label: 'Modules', value: MODULES.length },
              { label: 'Unlocks', value: 'Full Recipe Mastery' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.6rem', color: GOLD, lineHeight: 1,
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

          {/* Prerequisite notice */}
          <div style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.12)',
            borderLeft: '3px solid rgba(201,168,76,0.4)',
            padding: '16px 24px',
            maxWidth: 560,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>👨‍🍳</span>
            <div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: GOLD, marginBottom: 4,
              }}>
                Trading Chef
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem', color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.75, margin: 0, fontStyle: 'italic',
              }}>
                &ldquo;The Crown is not for beginners. It is for Head Chefs who can already run The Recipe in their sleep. If you cannot name every step from Bias to Tables Served without looking — come back after Level 9.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section style={{
        background: 'var(--deep)',
        padding: '64px 48px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>
              <div className="section-label-line" />
              <span className="section-label-text">The Framework</span>
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 0.95, letterSpacing: '0.02em',
            }}>
              THREE ELEMENTS.<br />
              <span style={{ color: GOLD }}>ONE CROWN.</span>
            </h2>
          </div>

          {/* Pillar selector */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            {PILLARS.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                style={{
                  flex: 1,
                  background: activePillar === p.id ? `${p.color}10` : 'transparent',
                  border: `1px solid ${activePillar === p.id ? p.color + '40' : 'rgba(245,240,232,0.06)'}`,
                  padding: '20px 24px',
                  cursor: 'none',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.8rem',
                  color: activePillar === p.id ? p.color : 'rgba(245,240,232,0.3)',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  marginBottom: 4,
                  transition: 'color 0.2s',
                }}>
                  {p.id}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: activePillar === p.id ? p.color : 'rgba(245,240,232,0.2)',
                  transition: 'color 0.2s',
                }}>
                  {p.label.split(' — ')[1]}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {PILLARS.filter(p => p.id === activePillar).map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: `${p.color}04`,
                  border: `1px solid ${p.color}15`,
                  borderTop: `3px solid ${p.color}50`,
                  padding: '40px 48px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: 20 }}>{p.icon}</div>
                  <h3 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2.2rem',
                    color: p.color,
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    marginBottom: 16,
                  }}>
                    {p.headline}
                  </h3>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    color: 'rgba(245,240,232,0.55)',
                    lineHeight: 1.9,
                    margin: 0,
                  }}>
                    {p.body}
                  </p>
                </div>
                <div style={{
                  background: `${p.color}08`,
                  border: `1px solid ${p.color}20`,
                  padding: '28px',
                }}>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.44rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.2)',
                    marginBottom: 12,
                  }}>
                    Recipe Connection
                  </div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.4rem',
                    color: p.color,
                    letterSpacing: '0.08em',
                    marginBottom: 16,
                  }}>
                    {p.recipeLink}
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    color: 'rgba(245,240,232,0.35)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    The Crown does not replace these Recipe steps. It builds on top of them. If {p.id} is missing, the Crown is not there.
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Module list */}
      <section style={{
        background: 'var(--black)',
        padding: '64px 48px',
        borderTop: '1px solid rgba(201,168,76,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>
              <div className="section-label-line" />
              <span className="section-label-text">Crown Method Modules</span>
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 0.95, letterSpacing: '0.02em',
            }}>
              SIX MODULES.<br />
              <span style={{ color: GOLD }}>FULL PROGRESSION.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {MODULES.map((m, i) => {
              const isOpen = activeModule === m.id

              return (
                <div key={m.id}>
                  <button
                    onClick={() => setActiveModule(isOpen ? null : m.id)}
                    style={{
                      width: '100%',
                      background: isOpen ? `${m.color}06` : 'rgba(245,240,232,0.02)',
                      border: `1px solid ${isOpen ? m.color + '30' : 'rgba(245,240,232,0.06)'}`,
                      borderLeft: `3px solid ${m.locked ? 'rgba(245,240,232,0.08)' : m.color + (isOpen ? '' : '60')}`,
                      padding: '24px 28px',
                      textAlign: 'left',
                      cursor: 'none',
                      transition: 'all 0.2s',
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr auto',
                      gap: 20,
                      alignItems: 'center',
                    }}
                  >
                    {/* Number */}
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.8rem',
                      color: m.locked ? 'rgba(245,240,232,0.1)' : m.color,
                      lineHeight: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.1rem',
                        color: m.locked ? 'rgba(245,240,232,0.25)' : 'var(--cream)',
                        letterSpacing: '0.03em',
                        marginBottom: 4,
                      }}>
                        {m.title}
                      </div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        color: m.locked ? 'rgba(245,240,232,0.1)' : 'rgba(245,240,232,0.35)',
                      }}>
                        {m.subtitle}
                      </div>
                    </div>

                    {/* Status */}
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.42rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: m.locked ? 'rgba(245,240,232,0.15)' : m.color,
                      background: m.locked ? 'rgba(245,240,232,0.03)' : `${m.color}10`,
                      border: `1px solid ${m.locked ? 'rgba(245,240,232,0.06)' : m.color + '25'}`,
                      padding: '4px 12px',
                      whiteSpace: 'nowrap',
                    }}>
                      {m.locked ? '🔒 Head Chef Required' : m.level}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && active && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          background: `${m.color}04`,
                          border: `1px solid ${m.color}12`,
                          borderTop: 'none',
                          padding: '28px 28px 28px 88px',
                        }}>
                          {m.locked ? (
                            <div style={{
                              fontFamily: '"Space Mono", monospace',
                              fontSize: '0.6rem',
                              color: 'rgba(245,240,232,0.3)',
                              lineHeight: 1.8,
                            }}>
                              Complete all 10 TCU Academy levels (Head Chef) to unlock this module.{' '}
                              <Link href="/academy" style={{ color: m.color, textDecoration: 'none' }}>
                                Open Academy →
                              </Link>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                              {m.content.map((line, li) => (
                                <div key={li} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                  <span style={{
                                    color: m.color,
                                    fontSize: '0.6rem',
                                    flexShrink: 0,
                                    marginTop: 2,
                                  }}>
                                    —
                                  </span>
                                  <p style={{
                                    fontFamily: '"Space Mono", monospace',
                                    fontSize: '0.6rem',
                                    color: 'rgba(245,240,232,0.6)',
                                    lineHeight: 1.8,
                                    margin: 0,
                                  }}>
                                    {line}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--deep)',
        padding: '80px 48px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: 24 }}>👑</div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '0.04em', lineHeight: 0.95, marginBottom: 16,
          }}>
            THE RECIPE FIRST.<br />
            <span style={{ color: GOLD }}>THEN THE CROWN.</span>
          </h2>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.62rem', color: 'rgba(245,240,232,0.4)',
            lineHeight: 1.9, marginBottom: 40,
          }}>
            The Crown is Level 9+ content. Start the Academy. Complete The Recipe. Earn the Head Chef badge. The Crown unlocks automatically.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/academy" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Open the Academy →</span></div>
            </Link>
            <Link href="/tcu-theater" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Watch The Recipe Video</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
