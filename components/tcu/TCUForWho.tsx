'use client'

import { motion } from 'framer-motion'

const yesItems = [
  "You're tired of random YouTube setups that never work consistently",
  "You're willing to study the chart, not just watch the chart",
  'You want a structured system for gold, not hot tips',
  'You understand risk is real and you want to manage it properly',
  "You're ready to put in the screen time and journal your trades",
  'You believe in mastering one market deeply before expanding',
]

const noItems = [
  'You\'re looking for guaranteed profits or "signals"',
  'You want to get rich in 30 days without doing the work',
  "You're not willing to demo trade before going live",
  'You expect to never have losing trades',
  'You skip lessons and want someone to just tell you what to buy',
  "You're trading money you can't afford to learn with",
]

export default function TCUForWho() {
  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="section-label">
        <div className="section-label-line" />
        <span className="section-label-text">Is This For You?</span>
      </div>
      <h2 className="section-title">
        BE HONEST<br />
        <span style={{ color: 'var(--gold)' }}>WITH YOURSELF</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 64 }}
        className="block lg:grid"
      >
        {/* Yes */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: 48, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.85rem', letterSpacing: '0.2em', padding: '6px 16px', background: 'var(--gold)', color: 'var(--black)' }}>
              You're Ready If
            </span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {yesItems.map((item) => (
              <li key={item} style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(245,240,232,0.7)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* No */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ padding: 48, background: 'rgba(192,57,43,0.04)', border: '1px solid rgba(192,57,43,0.15)' }}
        >
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.85rem', letterSpacing: '0.2em', padding: '6px 16px', background: 'var(--red)', color: 'var(--cream)' }}>
              This Isn't For You If
            </span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {noItems.map((item) => (
              <li key={item} style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(245,240,232,0.7)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--red)', flexShrink: 0 }}>✗</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
