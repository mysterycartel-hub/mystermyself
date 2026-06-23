'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const LEVELS = [
  { level: 0, name: 'Market Child', description: 'Introduction to the Kitchen, basic terms', icon: '👶', color: '#94A3B8' },
  { level: 1, name: 'Candle Kitchen', description: 'Candle types, wicks, bodies, patterns', icon: '🕯️', color: '#c9a84c' },
  { level: 2, name: 'Structure Kitchen', description: 'Market structure, HH, HL, LL, LH, BOS, CHOCH', icon: '🏗️', color: '#0EA5E9' },
  { level: 3, name: 'Flow Kitchen', description: 'Liquidity, flow, where price is drawn', icon: '🌊', color: '#22C55E' },
  { level: 4, name: 'AOI Kitchen', description: 'Areas of Interest, supply/demand, leftover containers (FVG)', icon: '🏡', color: '#A855F7' },
  { level: 5, name: 'Delivery Kitchen', description: 'How price delivers, impulsive vs corrective', icon: '📦', color: '#c0392b' },
  { level: 6, name: 'Confirmation Kitchen', description: 'Confirmation signals, timing', icon: '✅', color: '#0EA5E9' },
  { level: 7, name: 'The Pass', description: 'Entry execution, the pass', icon: '🎯', color: '#c9a84c' },
  { level: 8, name: 'Tables Served', description: 'Targets, taking profit', icon: '🍽️', color: '#22C55E' },
  { level: 9, name: 'Head Chef', description: 'Full recipe execution, management, mastery', icon: '👑', color: '#c9a84c' },
]

export default function RoadmapPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Link href="/dashboard" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(201,168,76,0.5)',
                textDecoration: 'none',
              }}>
                ← Dashboard
              </Link>
              <Link href="/chart-kitchen" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(201,168,76,0.5)',
                textDecoration: 'none',
              }}>
                Chart Kitchen →
              </Link>
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Trading Chef University · Learning Path
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}>
              THE <span style={{ color: 'var(--gold)' }}>ROADMAP</span>
            </h1>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.7,
              marginTop: 16,
              maxWidth: 600,
            }}>
              From Market Child to Head Chef. Master each kitchen before advancing to the next level.
              Every level builds on the last.
            </p>
          </div>

          {/* Levels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {LEVELS.map((lvl, i) => (
              <div
                key={lvl.level}
                style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  position: 'relative',
                }}
              >
                {/* Level number indicator */}
                <div style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${lvl.color}15`,
                  border: `1px solid ${lvl.color}40`,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.2rem',
                    color: lvl.color,
                  }}>
                    {lvl.level}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '1.2rem' }}>{lvl.icon}</span>
                    <h2 style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.4rem',
                      letterSpacing: '0.04em',
                      color: 'var(--cream)',
                      margin: 0,
                    }}>
                      {lvl.name}
                    </h2>
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(245,240,232,0.45)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {lvl.description}
                  </p>
                </div>

                {/* Connector line between items */}
                {i < LEVELS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 53,
                    bottom: -2,
                    width: 2,
                    height: 4,
                    background: 'rgba(201,168,76,0.2)',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 48,
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '32px',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.5rem',
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              marginBottom: 12,
            }}>
              Ready to Cook?
            </h3>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'rgba(245,240,232,0.4)',
              lineHeight: 1.6,
              marginBottom: 20,
            }}>
              Head to the Chart Kitchen to practice what you learn in real-time.
            </p>
            <Link href="/chart-kitchen" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'inline-block',
                background: 'var(--gold)',
                color: '#060608',
                padding: '14px 32px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
                Enter Chart Kitchen →
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
