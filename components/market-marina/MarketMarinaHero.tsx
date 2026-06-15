'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const TCU_STEPS = [
  { step: '01', label: 'Bias',         color: '#c9a84c', desc: 'Which way is price going?' },
  { step: '02', label: 'Flow',         color: '#3B82F6', desc: 'Where is liquidity drawing price?' },
  { step: '03', label: 'AOI',          color: '#F97316', desc: 'Where will price react?' },
  { step: '04', label: 'Delivery',     color: '#22C55E', desc: 'How is price moving there?' },
  { step: '05', label: 'Confirmation', color: '#A855F7', desc: 'What signal validates the setup?' },
  { step: '06', label: 'The Pass',     color: '#c9a84c', desc: 'Where do you enter?' },
  { step: '07', label: 'Tables Served',color: '#22C55E', desc: 'Where do you take profit?' },
  { step: '08', label: 'Management',   color: '#EF4444', desc: 'Burn Point + adjustment rules' },
]

export default function MarketMarinaHero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--black)',
      padding: '140px 48px 80px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Ghost text */}
      <div style={{
        position: 'absolute',
        right: -40, bottom: -60,
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: 'clamp(10rem, 22vw, 20rem)',
        color: 'rgba(201,168,76,0.025)',
        lineHeight: 1,
        letterSpacing: '0.02em',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        TCU
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left — copy */}
          <div>
            {/* District badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '6px 16px',
                marginBottom: 28,
              }}
            >
              <span>⚓</span>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)',
              }}>
                Market Marina · Scott-King Coast
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                marginBottom: 24,
              }}
            >
              THE TRADING<br />
              <span style={{ color: 'var(--gold)' }}>CHEF</span><br />
              <span style={{ color: 'var(--gold)' }}>UNIVERSE</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                borderLeft: '3px solid var(--gold)',
                paddingLeft: 20,
                marginBottom: 32,
              }}
            >
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                lineHeight: 1.9,
                color: 'rgba(245,240,232,0.65)',
                margin: 0,
              }}>
                Gold. Forex. Structure. Flow. AOI. The Pass.
                <br />
                Eight steps from seeing a chart to executing a decision.
                <br />
                This is the Trading Chef framework — built for beginners who want to actually understand the market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <Link href="/academy" style={{ textDecoration: 'none' }}>
                <div className="btn-primary"><span>Enter the Academy →</span></div>
              </Link>
              <Link href="/kitchen" style={{ textDecoration: 'none' }}>
                <div className="btn-secondary">Open Market Kitchen</div>
              </Link>
              <Link href="/trading-chef-university" style={{ textDecoration: 'none' }}>
                <div className="btn-secondary">Join TCU</div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: 'flex',
                gap: 40,
                marginTop: 48,
                paddingTop: 32,
                borderTop: '1px solid rgba(201,168,76,0.1)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { num: '13', label: 'Lessons' },
                { num: '8', label: 'TCU Steps' },
                { num: '6', label: 'Symbols' },
                { num: '9', label: 'Characters' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2.5rem',
                    color: '#c9a84c',
                    lineHeight: 1,
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.44rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.25)',
                    marginTop: 4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — TCU framework steps */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'rgba(245,240,232,0.015)',
              border: '1px solid rgba(201,168,76,0.1)',
              padding: '32px',
              display: 'none',
            }}
            className="xl:block"
          >
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 24,
            }}>
              The Recipe — 8 Steps
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TCU_STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 0',
                    borderBottom: i < TCU_STEPS.length - 1 ? '1px solid rgba(245,240,232,0.04)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.2rem',
                    color: 'rgba(201,168,76,0.15)',
                    minWidth: 32,
                    lineHeight: 1,
                  }}>
                    {s.step}
                  </span>
                  <div style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: s.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${s.color}60`,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '0.9rem',
                      color: s.color,
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                    }}>
                      {s.label}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.45rem',
                      color: 'rgba(245,240,232,0.3)',
                      marginTop: 2,
                    }}>
                      {s.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
