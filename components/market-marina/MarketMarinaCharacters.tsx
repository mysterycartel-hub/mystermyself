'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CHARACTERS, Character } from '@/lib/academy'

const COACH_ORDER = [
  'chef-goldie',
  'candle-kid',
  'wickie',
  'louie-liquidity',
  'grandma-market',
  'nana-value',
]
const ADVERSARY_ORDER = ['melissa-mayhem', 'melody-mayhem', 'burn-alarm']

export default function MarketMarinaCharacters() {
  const [active, setActive] = useState<string>('chef-goldie')
  const activeChar = CHARACTERS[active]

  const CharChip = ({ id, c }: { id: string; c: Character }) => (
    <motion.button
      onClick={() => setActive(id)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: active === id ? `${c.color}18` : 'transparent',
        border: `1px solid ${active === id ? c.color + '50' : 'rgba(245,240,232,0.08)'}`,
        padding: '12px 16px',
        cursor: 'none',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{c.emoji}</span>
      <div>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '0.85rem',
          color: active === id ? c.color : 'rgba(245,240,232,0.5)',
          letterSpacing: '0.05em',
          lineHeight: 1,
          transition: 'color 0.2s',
        }}>
          {c.name}
        </div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.38rem',
          color: 'rgba(245,240,232,0.2)',
          marginTop: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {c.role === 'coach' ? 'Coach' : c.role === 'warning' ? 'Adversary' : 'Alert'}
        </div>
      </div>
    </motion.button>
  )

  return (
    <section style={{
      background: 'var(--deep)',
      padding: '80px 48px',
      borderTop: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>
            <div className="section-label-line" />
            <span className="section-label-text">The Characters</span>
          </div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 12,
          }}>
            WHO TEACHES<br />
            <span style={{ color: 'var(--gold)' }}>THE KITCHEN</span>
          </h2>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.4)',
            maxWidth: 480,
            margin: 0,
          }}>
            Every Trading Chef lesson is delivered by a character — each one represents a different skill, concept, or psychological trap you need to master.
          </p>
        </div>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 2 }}>

          {/* Left: character list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Coaches */}
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.4)',
              padding: '8px 16px',
              background: 'rgba(201,168,76,0.03)',
              borderBottom: '1px solid rgba(201,168,76,0.06)',
            }}>
              Coaches
            </div>
            {COACH_ORDER.map(id => (
              <CharChip key={id} id={id} c={CHARACTERS[id]} />
            ))}

            {/* Adversaries */}
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(239,68,68,0.4)',
              padding: '8px 16px',
              background: 'rgba(239,68,68,0.02)',
              borderTop: '1px solid rgba(239,68,68,0.08)',
              borderBottom: '1px solid rgba(239,68,68,0.06)',
              marginTop: 2,
            }}>
              The Market
            </div>
            {ADVERSARY_ORDER.map(id => (
              <CharChip key={id} id={id} c={CHARACTERS[id]} />
            ))}
          </div>

          {/* Right: active character detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `${activeChar.color}06`,
                border: `1px solid ${activeChar.color}20`,
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost emoji */}
              <div style={{
                position: 'absolute',
                right: 24, bottom: -20,
                fontSize: '10rem',
                opacity: 0.06,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {activeChar.emoji}
              </div>

              {/* Role badge */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                background: `${activeChar.color}15`,
                border: `1px solid ${activeChar.color}25`,
                borderLeft: 'none',
                borderTop: 'none',
                padding: '5px 14px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: activeChar.color,
              }}>
                {activeChar.role === 'coach' ? 'Coach' : activeChar.role === 'warning' ? 'Adversary' : 'Alert System'}
              </div>

              {/* Character identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                <div style={{
                  width: 72, height: 72,
                  background: `${activeChar.color}15`,
                  border: `2px solid ${activeChar.color}40`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  flexShrink: 0,
                }}>
                  {activeChar.emoji}
                </div>
                <div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2rem',
                    color: activeChar.color,
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}>
                    {activeChar.name}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(245,240,232,0.3)',
                    textTransform: 'uppercase',
                    marginTop: 6,
                  }}>
                    {activeChar.title}
                  </div>
                </div>
              </div>

              {/* Catchphrase */}
              <blockquote style={{
                borderLeft: `3px solid ${activeChar.color}`,
                paddingLeft: 20,
                margin: '0 0 28px',
              }}>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  lineHeight: 1.9,
                  color: 'rgba(245,240,232,0.75)',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  &ldquo;{activeChar.catchphrase}&rdquo;
                </p>
              </blockquote>

              {/* Teaches */}
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.2)',
                  marginBottom: 12,
                }}>
                  {activeChar.role === 'coach' ? 'Teaches' : 'Represents'}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {activeChar.teaches.map((t) => (
                    <Link key={t} href={`/academy/${t}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: `${activeChar.color}12`,
                        border: `1px solid ${activeChar.color}30`,
                        padding: '5px 14px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.48rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: activeChar.color,
                        transition: 'all 0.2s',
                      }}>
                        {t} →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
