'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * CoastPassportProgress — Return visitor engagement block.
 * Shows passport XP preview, current level, and 3 next actions.
 * Displays for all users (authenticated state handled by the passport page itself).
 * This is a homepage teaser — not the full passport dashboard.
 */

const NEXT_ACTIONS = [
  {
    emoji: '⚓',
    label: 'Visit Market Marina',
    description: 'Explore trading lessons and earn your first stamp',
    href: '/coast/market-marina',
    color: '#0D9488',
    xp: '+50 XP',
  },
  {
    emoji: '📋',
    label: 'Sign Up for The Opportunity List',
    description: 'Choose your lane and unlock district access',
    href: '/opportunity-list',
    color: '#c9a84c',
    xp: '+100 XP',
  },
  {
    emoji: '🚢',
    label: 'Read the Courier Guide',
    description: 'Learn how to start medical courier income',
    href: '/products/medical-courier-guide',
    color: '#0EA5E9',
    xp: '+75 XP',
  },
]

export default function CoastPassportProgress() {
  return (
    <section style={{
      background: 'var(--black)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Your Journey</span>
          </div>
          <h2 className="section-title">
            START YOUR<br />
            <span style={{ color: 'var(--gold)' }}>COAST PASSPORT</span>
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(245,240,232,0.45)',
            maxWidth: 480,
            lineHeight: 1.8,
          }}>
            Every action earns XP. Visit districts. Complete missions. Level up from Recruit to Legend.
            Your passport tracks it all.
          </p>
        </motion.div>

        {/* Progress card + actions grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
        }}>
          {/* Passport level card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--deep)',
              border: '1px solid rgba(201,168,76,0.15)',
              padding: 'clamp(28px, 4vw, 40px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                transformOrigin: 'left',
              }}
            />

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 20,
            }}>
              Passport Status
            </div>

            {/* Level display */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 24 }}>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '3.5rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}
              >
                RECRUIT
              </motion.span>
            </div>

            {/* XP Bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(245,240,232,0.4)',
                }}>
                  0 / 250 XP
                </span>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'var(--gold)',
                }}>
                  → Navigator
                </span>
              </div>
              <div style={{
                height: 4,
                background: 'rgba(201,168,76,0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '5%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                    borderRadius: 2,
                    boxShadow: '0 0 8px rgba(201,168,76,0.4)',
                  }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'Stamps', value: '0/9' },
                { label: 'Badges', value: '0' },
                { label: 'Missions', value: '0' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.5rem',
                    color: 'var(--cream)',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.45rem',
                    color: 'rgba(245,240,232,0.3)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/auth" style={{ textDecoration: 'none', display: 'block', marginTop: 28 }}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(201,168,76,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'var(--gold)',
                  color: '#060608',
                  padding: '14px 24px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                Claim Your Passport →
              </motion.div>
            </Link>
          </motion.div>

          {/* Next actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              padding: '0 0 12px',
            }}>
              Earn Your First XP
            </div>

            {NEXT_ACTIONS.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{
                  x: 4,
                  background: `${action.color}08`,
                  borderColor: `${action.color}40`,
                }}
                style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                <Link href={action.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{action.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1rem',
                      color: action.color,
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}>
                      {action.label}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      color: 'rgba(245,240,232,0.35)',
                    }}>
                      {action.description}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    color: action.color,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}>
                    {action.xp}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
