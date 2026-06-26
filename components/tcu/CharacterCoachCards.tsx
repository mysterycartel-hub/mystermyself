'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getCoachTrio } from '@/data/tcu-character-canon'
import TCUAvatarPlaceholder from './TCUAvatarPlaceholder'

/**
 * CharacterCoachCards — Rotating 3-card coach section.
 *
 * Featured trio: Candle Kid, Wickie, Louie Liquidity (most educational)
 * Cycles every 4 seconds. Pauses on hover/tap.
 * Swipe-friendly on mobile (horizontal scroll fallback).
 */

export default function CharacterCoachCards() {
  const coaches = getCoachTrio()
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % coaches.length)
    }, 4000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, coaches.length])

  const active = coaches[activeIdx]

  // Lessons per character
  const LESSONS: Record<string, string[]> = {
    'candle-kid': [
      'Read candle bodies — they show conviction',
      'Wicks reveal rejection and failed attempts',
      'The close is more important than the open',
    ],
    'wickie': [
      'Long wicks = failed attempts by price',
      'Stop hunts create the best entries',
      'Wait for the wick rejection before entering',
    ],
    'louie-liquidity': [
      'Price always moves toward liquidity pools',
      'Equal highs/lows are liquidity magnets',
      'The sweep happens before the real move',
    ],
  }

  return (
    <section
      style={{
        background: 'var(--deep)',
        borderTop: '1px solid rgba(201,168,76,0.06)',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Learn From the Team</span>
          </div>
          <h3 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 0.95,
          }}>
            YOUR <span style={{ color: 'var(--gold)' }}>COACHES</span>
          </h3>
        </motion.div>

        {/* Coach selector dots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {coaches.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              style={{
                width: activeIdx === i ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: activeIdx === i ? c.color : 'rgba(201,168,76,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Show ${c.name}`}
            />
          ))}
        </div>

        {/* Active coach card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background: 'var(--black)',
              border: `1px solid ${active.color}25`,
              padding: 'clamp(24px, 4vw, 40px)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(20px, 3vw, 36px)',
              alignItems: 'start',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Color accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${active.color}, ${active.color}40, transparent)`,
            }} />

            {/* Left: avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <TCUAvatarPlaceholder character={active} size="lg" showBadge={false} />
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.45rem',
                letterSpacing: '0.15em',
                color: active.color,
                textTransform: 'uppercase',
              }}>
                Coach
              </span>
            </div>

            {/* Right: content */}
            <div>
              {/* Name + role */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  color: active.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {active.name}
                </h4>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  color: 'rgba(245,240,232,0.4)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {active.role}
                </span>
              </div>

              {/* "This character teaches you:" */}
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.5)',
                  display: 'block',
                  marginBottom: 12,
                }}>
                  This character teaches you:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(LESSONS[active.id] || []).map((lesson, li) => (
                    <div key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1rem',
                        color: `${active.color}50`,
                        minWidth: 20,
                        lineHeight: 1.2,
                      }}>
                        {li + 1}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'rgba(245,240,232,0.6)',
                        lineHeight: 1.6,
                      }}>
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '0.78rem',
                fontStyle: 'italic',
                color: 'rgba(245,240,232,0.45)',
                lineHeight: 1.7,
                borderLeft: `2px solid ${active.color}40`,
                paddingLeft: 16,
                marginBottom: 24,
              }}>
                {active.longQuote}
              </p>

              {/* CTA */}
              <Link href="/market-marina" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: active.color,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Learn from {active.name} →
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pause indicator */}
        {paused && (
          <div style={{
            marginTop: 12,
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.45rem',
            color: 'rgba(245,240,232,0.2)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            ⏸ Paused — move mouse away to resume rotation
          </div>
        )}
      </div>
    </section>
  )
}
