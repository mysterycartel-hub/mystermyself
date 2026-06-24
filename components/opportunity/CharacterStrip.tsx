'use client'

import { motion } from 'framer-motion'

const CHARACTERS = [
  { name: 'Trading Chef', role: 'System Architect', initials: 'TC', color: '#C9A84C' },
  { name: 'Candle Kid', role: 'Pattern Spotter', initials: 'CK', color: '#A855F7' },
  { name: 'Wickie', role: 'Wick Hunter', initials: 'W', color: '#EF4444' },
  { name: 'Louie Liquidity', role: 'Flow King', initials: 'LL', color: '#3B82F6' },
  { name: 'Chef Goldie', role: 'Gold Specialist', initials: 'CG', color: '#C9A84C' },
  { name: 'Grandma Market', role: 'Structure Elder', initials: 'GM', color: '#7a6230' },
  { name: 'Nana Value', role: 'Gap Finder', initials: 'NV', color: '#22C55E' },
  { name: 'Melissa Mayhem', role: 'Volatility Expert', initials: 'MM', color: '#F97316' },
  { name: 'Melody Mayhem', role: 'Rhythm Trader', initials: 'MY', color: '#EC4899' },
]

export default function CharacterStrip() {
  return (
    <section style={{
      background: '#0A0A0C',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      borderBottom: '1px solid rgba(201,168,76,0.1)',
      padding: '48px 0',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '0 48px', marginBottom: 24 }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
        }}>
          Market Marina · TCU Canon Characters
        </div>
      </div>

      {/* Horizontal scroll */}
      <div style={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        paddingLeft: 48,
        paddingRight: 48,
        paddingBottom: 8,
        scrollbarWidth: 'none',
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
              background: '#060608',
              border: `1px solid ${c.color}30`,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            {/* Avatar circle with gold ring */}
            {/* TODO: replace with actual character image assets */}
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              border: `2px solid ${c.color}`,
              background: `${c.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.2rem',
              color: c.color,
              letterSpacing: '0.05em',
            }}>
              {c.initials}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '0.9rem',
                color: '#F5F0E8',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                marginBottom: 4,
              }}>
                {c.name}
              </div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.45rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: `${c.color}80`,
              }}>
                {c.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
