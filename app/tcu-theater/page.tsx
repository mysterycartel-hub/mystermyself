'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { THEATER_VIDEOS, TheaterVideo, TOTAL_THEATER_XP } from '@/lib/theater'
import { CHARACTERS } from '@/lib/academy'

const STORAGE_KEY = 'tcu_theater_watched'

function loadWatched(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch { return [] }
}

function saveWatched(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export default function TCUTheaterPage() {
  const [watched, setWatched]       = useState<string[]>([])
  const [active, setActive]         = useState<TheaterVideo>(THEATER_VIDEOS[0])
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null)

  useEffect(() => {
    setWatched(loadWatched())
  }, [])

  const isWatched    = (id: string) => watched.includes(id)
  const isUnlocked   = (v: TheaterVideo) => !v.prerequisiteVideoId || isWatched(v.prerequisiteVideoId)
  const xpEarned     = watched.reduce((sum, id) => {
    const v = THEATER_VIDEOS.find(v => v.id === id)
    return sum + (v?.xpAward ?? 0)
  }, 0)

  function handleMarkWatched(video: TheaterVideo) {
    if (isWatched(video.id)) return
    const updated = [...watched, video.id]
    setWatched(updated)
    saveWatched(updated)
    setJustUnlocked(video.id)
    setTimeout(() => setJustUnlocked(null), 4000)
  }

  const char = CHARACTERS[active.character]
  const isMelissa = active.character === 'melissa-mayhem'

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
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div style={{
          position: 'absolute',
          right: -20, bottom: -40,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '18rem',
          color: 'rgba(201,168,76,0.025)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          TCU
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            <div className="section-label-line" />
            <span className="section-label-text">TCU Theater · Lesson Assets</span>
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: 20,
          }}>
            TCU<br />
            <span style={{ color: 'var(--gold)' }}>THEATER</span>
          </h1>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
            lineHeight: 1.9,
            color: 'rgba(245,240,232,0.45)',
            maxWidth: 520,
            marginBottom: 40,
          }}>
            These are not marketing videos. They are lesson assets. Watching each one unlocks the next set of Academy lessons, awards Passport XP, and activates character dialogue throughout the system.
          </p>

          {/* XP tracker */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { num: THEATER_VIDEOS.length, label: 'Videos' },
              { num: `${TOTAL_THEATER_XP}`, label: 'Total XP Available' },
              { num: `${xpEarned}`, label: 'XP Earned' },
              { num: `${watched.length}/${THEATER_VIDEOS.length}`, label: 'Watched' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.4rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.25)',
                  marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theater Layout */}
      <section style={{
        background: 'var(--deep)',
        padding: '64px 48px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 2 }}>

            {/* Left: Video list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {THEATER_VIDEOS.map((v) => {
                const locked   = !isUnlocked(v)
                const watched_ = isWatched(v.id)
                const isActive = active.id === v.id

                return (
                  <button
                    key={v.id}
                    onClick={() => !locked && setActive(v)}
                    disabled={locked}
                    style={{
                      background: isActive
                        ? 'rgba(201,168,76,0.08)'
                        : 'transparent',
                      border: 'none',
                      borderLeft: `3px solid ${
                        isActive ? '#c9a84c' :
                        watched_ ? 'rgba(34,197,94,0.4)' :
                        locked ? 'rgba(245,240,232,0.06)' :
                        'rgba(245,240,232,0.1)'
                      }`,
                      borderBottom: '1px solid rgba(245,240,232,0.04)',
                      padding: '20px 20px 20px 24px',
                      cursor: locked ? 'default' : 'none',
                      textAlign: 'left',
                      opacity: locked ? 0.4 : 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {/* Number + status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.42rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: watched_ ? '#22C55E' : locked ? 'rgba(245,240,232,0.15)' : 'rgba(201,168,76,0.5)',
                      }}>
                        {watched_ ? '✓ Watched' : locked ? '🔒 Locked' : `Video ${v.order}`}
                      </span>
                    </div>

                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '0.95rem',
                      color: isActive ? '#c9a84c' : 'rgba(245,240,232,0.6)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      marginBottom: 4,
                      transition: 'color 0.2s',
                    }}>
                      {v.title}
                    </div>

                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.4rem',
                      color: 'rgba(245,240,232,0.2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      {v.duration} · +{v.xpAward} XP
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right: Active video detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(6,6,8,0.6)',
                  border: '1px solid rgba(245,240,232,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Video embed area */}
                <div style={{
                  background: '#000',
                  aspectRatio: '16/9',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {active.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${active.youtubeId}`}
                      style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', inset: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 16,
                    }}>
                      <div style={{ fontSize: '3rem' }}>🎬</div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.2)',
                      }}>
                        Coming Soon
                      </div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.5rem',
                        color: 'rgba(245,240,232,0.4)',
                        letterSpacing: '0.06em',
                        textAlign: 'center',
                        padding: '0 40px',
                      }}>
                        {active.title}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ padding: '32px' }}>
                  {/* Character intro */}
                  <div style={{
                    background: isMelissa ? 'rgba(236,72,153,0.04)' : 'rgba(201,168,76,0.04)',
                    border: `1px solid ${isMelissa ? 'rgba(236,72,153,0.2)' : 'rgba(201,168,76,0.12)'}`,
                    borderLeft: `3px solid ${isMelissa ? '#EC4899' : '#c9a84c'}`,
                    padding: '14px 18px',
                    marginBottom: 24,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>{char?.emoji ?? '🎬'}</span>
                    <div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.4rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: isMelissa ? '#EC4899' : '#c9a84c',
                        marginBottom: 4,
                      }}>
                        {char?.name ?? active.character}
                      </div>
                      <p style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.58rem',
                        lineHeight: 1.75,
                        color: 'rgba(245,240,232,0.5)',
                        margin: 0,
                        fontStyle: 'italic',
                      }}>
                        &ldquo;{active.characterLine}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.44rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.4)',
                    marginBottom: 8,
                  }}>
                    Video {active.order} of {THEATER_VIDEOS.length} · {active.duration}
                  </div>

                  <h2 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {active.title}
                  </h2>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.46rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    marginBottom: 16,
                  }}>
                    {active.subtitle}
                  </p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    lineHeight: 1.85,
                    color: 'rgba(245,240,232,0.45)',
                    marginBottom: 28,
                  }}>
                    {active.description}
                  </p>

                  {/* What this video unlocks */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 12,
                    marginBottom: 28,
                  }}>
                    {[
                      { label: 'Unlocks Lessons', items: active.unlocksLessons, color: '#22C55E', icon: '📚' },
                      { label: 'Awards XP', items: [`+${active.xpAward} Passport XP`], color: '#c9a84c', icon: '⭐' },
                      { label: 'Unlocks Characters', items: active.unlocksCharacterDialogue, color: active.character === 'melissa-mayhem' ? '#EC4899' : '#A855F7', icon: '🎭' },
                    ].map(g => (
                      <div key={g.label} style={{
                        background: 'rgba(245,240,232,0.02)',
                        border: '1px solid rgba(245,240,232,0.06)',
                        padding: '14px 16px',
                      }}>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.4rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: g.color,
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}>
                          {g.icon} {g.label}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {g.items.map(item => (
                            <div key={item} style={{
                              fontFamily: '"Space Mono", monospace',
                              fontSize: '0.48rem',
                              color: 'rgba(245,240,232,0.45)',
                            }}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Badge award */}
                  {active.badgeAward && (
                    <div style={{
                      background: `rgba(201,168,76,0.04)`,
                      border: `1px solid rgba(201,168,76,0.15)`,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 24,
                    }}>
                      <span style={{ fontSize: '1.6rem' }}>{active.badgeAward.icon}</span>
                      <div>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.4rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(201,168,76,0.5)',
                          marginBottom: 2,
                        }}>
                          Badge Reward
                        </div>
                        <div style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1rem',
                          color: active.badgeAward.color,
                          letterSpacing: '0.06em',
                        }}>
                          {active.badgeAward.name}
                        </div>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.46rem',
                          color: 'rgba(245,240,232,0.3)',
                          marginTop: 2,
                        }}>
                          {active.badgeAward.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    {isWatched(active.id) ? (
                      <div style={{
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        color: '#22C55E',
                        padding: '10px 24px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}>
                        ✓ Watched · {active.xpAward} XP Earned
                      </div>
                    ) : !isUnlocked(active) ? (
                      <div style={{
                        background: 'transparent',
                        border: '1px solid rgba(245,240,232,0.1)',
                        color: 'rgba(245,240,232,0.2)',
                        padding: '10px 24px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}>
                        🔒 Watch Video {active.order - 1} First
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMarkWatched(active)}
                        style={{
                          background: '#c9a84c',
                          border: 'none',
                          color: '#060608',
                          padding: '10px 24px',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.55rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          cursor: 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        Mark as Watched → Unlock +{active.xpAward} XP
                      </button>
                    )}

                    <Link href="/academy" style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: 'transparent',
                        border: '1px solid rgba(245,240,232,0.08)',
                        color: 'rgba(245,240,232,0.3)',
                        padding: '10px 20px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        Go to Academy →
                      </div>
                    </Link>
                  </div>

                  {/* Unlock confirmation flash */}
                  <AnimatePresence>
                    {justUnlocked === active.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          marginTop: 16,
                          background: 'rgba(34,197,94,0.08)',
                          border: '1px solid rgba(34,197,94,0.25)',
                          padding: '12px 16px',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.52rem',
                          color: '#22C55E',
                          lineHeight: 1.7,
                        }}
                      >
                        ✓ +{active.xpAward} XP awarded · {active.unlocksLessons.length} lesson{active.unlocksLessons.length !== 1 ? 's' : ''} unlocked · {active.unlocksCharacterDialogue.length} character{active.unlocksCharacterDialogue.length !== 1 ? 's' : ''} activated
                        {active.badgeAward && ` · Badge earned: ${active.badgeAward.name}`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <section style={{
        background: 'var(--black)',
        padding: '48px',
        borderTop: '1px solid rgba(201,168,76,0.06)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.2)',
            marginBottom: 12,
          }}>
            Theater Progress · {xpEarned} / {TOTAL_THEATER_XP} XP
          </div>
          <div style={{
            height: 3,
            background: 'rgba(201,168,76,0.1)',
            marginBottom: 24,
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${TOTAL_THEATER_XP > 0 ? (xpEarned / TOTAL_THEATER_XP) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'var(--gold)',
              }}
            />
          </div>
          <Link href="/academy" style={{ textDecoration: 'none' }}>
            <div className="btn-primary" style={{ display: 'inline-flex' }}>
              <span>Open the Academy →</span>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
