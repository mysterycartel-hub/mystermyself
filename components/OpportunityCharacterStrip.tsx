'use client'

import { motion } from 'framer-motion'

/**
 * TCU Character Strip — horizontal scrollable row of 9 canon characters.
 * Used on the Opportunity List page below the hero.
 * Characters are locked canon — do NOT add or remove.
 */
const CHARACTERS = [
  { name: 'Trading Chef', role: 'System Architect', emoji: '👨‍🍳', color: '#c9a84c' },
  { name: 'Candle Kid', role: 'Pattern Spotter', emoji: '🕯️', color: '#A855F7' },
  { name: 'Wickie', role: 'Wick Hunter', emoji: '🎯', color: '#EF4444' },
  { name: 'Louie Liquidity', role: 'Flow King', emoji: '🌊', color: '#3B82F6' },
  { name: 'Chef Goldie', role: 'Gold Specialist', emoji: '✨', color: '#c9a84c' },
  { name: 'Grandma Market', role: 'Structure Elder', emoji: '🧓', color: '#7a6230' },
  { name: 'Nana Value', role: 'Gap Finder', emoji: '💎', color: '#22C55E' },
  { name: 'Melissa Mayhem', role: 'Volatility Expert', emoji: '⚡', color: '#F97316' },
  { name: 'Melody Mayhem', role: 'Rhythm Trader', emoji: '🎵', color: '#EC4899' },
]

export default function OpportunityCharacterStrip() {
  return (
    <section style={{
      background: 'var(--deep)',
      padding: '48px 0',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '0 48px', marginBottom: 24 }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
        }}>
          Meet The Kitchen · TCU Canon Characters
        </div>
      </div>

      {/* Scrollable character row */}
      <div style={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        padding: '0 48px 16px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(201,168,76,0.3) transparent',
      }}>
        {CHARACTERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            style={{
              minWidth: 160,
              background: 'var(--black)',
              border: `1px solid ${c.color}25`,
              padding: '24px 20px',
              textAlign: 'center',
              flexShrink: 0,
              cursor: 'default',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            {/* Avatar circle with gold ring */}
            {/* TODO: replace emoji with actual character artwork when available */}
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: `2px solid ${c.color}60`,
              background: `${c.color}10`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: '1.8rem',
              boxShadow: `0 0 16px ${c.color}15`,
            }}>
              {c.emoji}
            </div>

            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              color: c.color,
              marginBottom: 4,
              lineHeight: 1.1,
            }}>
              {c.name}
            </div>

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.45rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
            }}>
              {c.role}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
