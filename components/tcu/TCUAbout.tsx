'use client'

import { motion } from 'framer-motion'

const credentials = [
  { icon: '📍', strong: 'West Palm Beach, FL', rest: ' — local roots, global market focus' },
  { icon: '📊', strong: 'XAUUSD specialist', rest: ' — gold-only focus for depth over breadth' },
  { icon: '🍳', strong: 'Founder, Breaded Or Not?!', rest: ' — entrepreneur first, trader second' },
  { icon: '📱', strong: '@mysterycartel', rest: ' — follow the journey in real time' },
]

export default function TCUAbout() {
  return (
    <section id="about" style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
        className="block lg:grid"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            width: 340, height: 420,
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.05), rgba(192,57,43,0.05))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '100%',
          }}>
            {/* Offset border decoration */}
            <div style={{
              position: 'absolute',
              top: 16, left: 16, right: -16, bottom: -16,
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            <span style={{ fontSize: '8rem', opacity: 0.6, userSelect: 'none', position: 'relative', zIndex: 1 }}>
              👨🏾‍🍳
            </span>
            {/* Gold tag */}
            <div style={{
              position: 'absolute',
              bottom: -20, right: -20,
              background: 'var(--gold)',
              color: 'var(--black)',
              padding: '16px 24px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              zIndex: 2,
            }}>
              THE TRADING CHEF
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: 40 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Instructor</span>
          </div>
          <h2 className="section-title">
            BUILT FROM THE<br />
            <span style={{ color: 'var(--gold)' }}>KITCHEN UP</span>
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(245,240,232,0.65)', marginBottom: 32 }}>
            The Trading Chef isn't a Wall Street guy. He's a builder from West Palm Beach who learned the hard way — through bad trades, blown accounts, and too many "guru" courses that taught patterns without principles.
            <br /><br />
            The TCU method was built around one question: what would actually work for someone trading gold before work, after hours, or between hustles? The answer is structure, sessions, and discipline. That's what this entire university is built on.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {credentials.map((c) => (
              <div key={c.strong} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 0',
                borderBottom: '1px solid rgba(201,168,76,0.08)',
              }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{c.icon}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)' }}>
                  <strong style={{ color: 'var(--cream)' }}>{c.strong}</strong>
                  {c.rest}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
