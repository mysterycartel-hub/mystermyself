'use client'

import { motion } from 'framer-motion'

const problems = [
  { num: '01', strong: 'Chasing candles', rest: ' instead of waiting for the setup to come to them — entering late, taking the worst price, getting stopped out.' },
  { num: '02', strong: 'No session awareness.', rest: ' Trading the wrong hours, missing the kill zones, fighting low-liquidity consolidation.' },
  { num: '03', strong: 'Watching YouTube tutorials', rest: ' that teach strategies without context. No institutional logic. No market structure framework.' },
  { num: '04', strong: 'Emotional trading', rest: ' — FOMO entries, revenge trades, holding losers and cutting winners too early.' },
]

export default function TCUHook() {
  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
        className="block lg:grid"
      >
        {/* Left */}
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Problem</span>
          </div>
          <h2 className="section-title">
            MOST TRADERS FAIL<br />
            <span style={{ color: 'var(--red)' }}>FOR THE SAME</span><br />
            REASONS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 40 }}>
            {problems.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  padding: '22px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                }}
              >
                <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: 'rgba(192,57,43,0.5)', minWidth: 40, lineHeight: 1 }}>
                  {p.num}
                </span>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.7)' }}>
                  <strong style={{ color: 'var(--cream)' }}>{p.strong}</strong>
                  {p.rest}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            padding: 40,
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'rgba(201,168,76,0.03)',
            position: 'relative',
            marginTop: 40,
          }}
        >
          {/* Giant quote mark */}
          <div style={{
            position: 'absolute',
            top: -20, left: 30,
            fontFamily: '"Playfair Display", serif',
            fontSize: '8rem',
            color: 'rgba(201,168,76,0.15)',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            "
          </div>

          <blockquote style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: 'var(--cream)',
            marginBottom: 24,
            position: 'relative',
          }}>
            "Gold doesn't lie. It leaves footprints. You just need to know how to read them."
          </blockquote>

          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Space Mono", monospace' }}>
            — The Trading Chef
          </div>

          <div style={{ marginTop: 40, padding: 28, background: 'var(--red)', color: 'var(--cream)' }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: 10 }}>
              The TCU Method
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.7, opacity: 0.9 }}>
              We teach you to trade gold the way institutions move it — identifying liquidity pools, reading fair value gaps, and executing only on the highest-probability setups during the sessions that matter most. No noise. No guessing. Pure structure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
