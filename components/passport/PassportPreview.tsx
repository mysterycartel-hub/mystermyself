'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { districts } from '@/lib/districts'
import PassportStamp from './PassportStamp'
import { PASSPORT_BADGES, LEVEL_ORDER, XP_THRESHOLDS } from '@/lib/passport'

export default function PassportPreview() {
  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">V3 · Coming Next</span>
        </div>
        <h2 className="section-title">
          PASSPORT<br />
          <span style={{ color: 'var(--gold)' }}>SYSTEM</span>
        </h2>
        <p style={{
          fontSize: '0.82rem',
          color: 'rgba(245,240,232,0.5)',
          maxWidth: 480,
          lineHeight: 1.8,
          fontFamily: '"Space Mono", monospace',
        }}>
          Visit districts. Collect stamps. Earn XP. Unlock levels and badges across the entire Scott-King Coast universe.
        </p>
      </motion.div>

      {/* Passport card mockup */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, maxWidth: 1200 }}>
        {/* Left — passport book */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'var(--black)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background text */}
          <div style={{
            position: 'absolute',
            bottom: -20, right: -10,
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '8rem',
            color: 'rgba(201,168,76,0.03)',
            letterSpacing: '0.05em',
            userSelect: 'none',
            lineHeight: 1,
          }}>
            SKC
          </div>

          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 20,
          }}>
            Scott-King Coast · Passport System · V3
          </div>

          <h3 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2.5rem',
            color: 'var(--gold)',
            letterSpacing: '0.05em',
            marginBottom: 8,
            lineHeight: 1,
          }}>
            COAST PASSPORT
          </h3>
          <p style={{
            fontSize: '0.65rem',
            color: 'rgba(245,240,232,0.3)',
            fontFamily: '"Space Mono", monospace',
            marginBottom: 40,
          }}>
            Issued by MysterMyself Ecosystem OS
          </p>

          {/* Stamps grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}>
            {districts.map((d, i) => (
              <div key={d.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <PassportStamp district={d} collected={i < 3} size="sm" animated={i < 3} />
                <span style={{
                  fontSize: '0.48rem',
                  color: 'rgba(245,240,232,0.3)',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                }}>
                  {d.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — levels + badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* XP Levels */}
          <div style={{
            background: 'var(--black)',
            border: '1px solid rgba(201,168,76,0.1)',
            padding: '32px 36px',
          }}>
            <p style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
              fontFamily: '"Space Mono", monospace',
            }}>
              XP Levels
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LEVEL_ORDER.map((level) => (
                <div key={level} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.06)',
                }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    color: 'rgba(201,168,76,0.3)',
                    minWidth: 80,
                  }}>
                    {XP_THRESHOLDS[level]} XP
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 2,
                      background: `rgba(201,168,76,${level === 'Recruit' ? 0.6 : 0.1})`,
                    }} />
                  </div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold)',
                    minWidth: 80,
                    textAlign: 'right',
                  }}>
                    {level}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge preview */}
          <div style={{
            background: 'var(--black)',
            border: '1px solid rgba(201,168,76,0.1)',
            padding: '32px 36px',
            flex: 1,
          }}>
            <p style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
              fontFamily: '"Space Mono", monospace',
            }}>
              Badges · {PASSPORT_BADGES.length} Total
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {PASSPORT_BADGES.slice(0, 6).map((badge, i) => (
                <div key={badge.id} title={badge.name} style={{
                  width: 48, height: 48,
                  border: `1px solid ${i < 2 ? badge.color : 'rgba(201,168,76,0.15)'}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  opacity: i < 2 ? 1 : 0.3,
                  background: i < 2 ? `${badge.color}10` : 'transparent',
                }}>
                  {badge.icon}
                </div>
              ))}
              <div style={{
                width: 48, height: 48,
                border: '1px solid rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                color: 'rgba(201,168,76,0.4)',
                fontFamily: '"Space Mono", monospace',
              }}>
                +{PASSPORT_BADGES.length - 6}
              </div>
            </div>

            <Link href="/coast" style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--gold)',
                padding: '14px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
                display: 'block',
              }}>
                Start Your Journey → /coast
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
