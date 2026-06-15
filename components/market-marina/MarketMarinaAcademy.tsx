'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LESSONS, ACADEMY_MODULES } from '@/lib/academy'

export default function MarketMarinaAcademy() {
  return (
    <section style={{
      background: 'var(--black)',
      padding: '80px 48px',
      borderTop: '1px solid rgba(201,168,76,0.06)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'flex-end',
          marginBottom: 48,
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>
              <div className="section-label-line" />
              <span className="section-label-text">V4 · Trading Chef Academy</span>
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}>
              13 LESSONS.<br />
              <span style={{ color: 'var(--gold)' }}>ONE FRAMEWORK.</span>
            </h2>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.4)',
              maxWidth: 480,
              margin: 0,
            }}>
              Show → Explain → Ask → Practice → Review. Every lesson earns XP toward your Passport.
              No signals. No promises. Real understanding.
            </p>
          </div>
          <Link href="/academy" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div className="btn-primary"><span>See All Lessons →</span></div>
          </Link>
        </div>

        {/* Modules */}
        {ACADEMY_MODULES.map((mod, mi) => (
          <div key={mod.id} style={{ marginBottom: 40 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(201,168,76,0.08)',
            }}>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.1rem',
                color: 'var(--gold)',
                letterSpacing: '0.06em',
              }}>
                {mod.name}
              </div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                color: 'rgba(245,240,232,0.2)',
                letterSpacing: '0.12em',
              }}>
                {mod.lessonIds.length} lessons
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 2,
            }}>
              {mod.lessonIds.map((slug, li) => {
                const lesson = LESSONS.find(l => l.id === slug)
                if (!lesson) return null
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: li * 0.04 }}
                  >
                    <Link href={`/academy/${lesson.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <motion.div
                        whileHover={{ borderColor: `${lesson.color}40`, background: `${lesson.color}06` }}
                        style={{
                          border: '1px solid rgba(245,240,232,0.06)',
                          padding: '16px 20px',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{lesson.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '0.95rem',
                            color: 'rgba(245,240,232,0.75)',
                            letterSpacing: '0.04em',
                            lineHeight: 1,
                            marginBottom: 4,
                          }}>
                            {lesson.title}
                          </div>
                          <div style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.42rem',
                            color: `${lesson.color}80`,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}>
                            +{lesson.xpReward} XP
                          </div>
                        </div>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.44rem',
                          color: 'rgba(245,240,232,0.15)',
                        }}>
                          →
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Start CTA */}
        <div style={{
          marginTop: 48,
          padding: '32px',
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.6rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              Start at Step 1 — Candle Anatomy
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              color: 'rgba(245,240,232,0.35)',
              margin: 0,
              lineHeight: 1.7,
            }}>
              You cannot read a setup if you cannot read a candle. Begin with the alphabet.
            </p>
          </div>
          <Link href="/academy/candles" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div className="btn-primary"><span>Lesson 1: Candles →</span></div>
          </Link>
        </div>
      </div>
    </section>
  )
}
