'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * CoastIntro — explains what Scott-King Coast IS.
 * This is the "Meet the Coast" section on the homepage.
 * Makes the world visible, not hidden in data files.
 */
export default function CoastIntro() {
  return (
    <section style={{
      background: 'var(--black)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label" style={{ marginBottom: 24 }}>
            <div className="section-label-line" />
            <span className="section-label-text">Meet The Coast</span>
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 24,
          }}>
            WHAT IS<br />
            <span style={{ color: 'var(--gold)' }}>SCOTT-KING COAST?</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>
          {/* Left — explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.9,
              marginBottom: 20,
            }}>
              Scott-King Coast is a world. Eight districts. Each one is a real income lane,
              a learning path, and a community. MysterMyself is the hub that connects them all.
            </p>

            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.8,
              marginBottom: 20,
            }}>
              Trading education lives in Market Marina. Courier income lives in Route Harbor.
              Food business lives in Flavor District. AI tools live in Blueprint Bay.
              Content and affiliate systems live on Creator Pier. Fantasy football lives on Fantasy Island.
              Wealth and ownership live at Legacy Point. Free resources live in Library Vault.
            </p>

            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.35)',
              fontFamily: '"Space Mono", monospace',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              Every district gives value before asking for anything. Pick a lane.
              Get resources. Build from there.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/coast" style={{ textDecoration: 'none' }}>
                <div className="btn-primary"><span>Explore The Coast →</span></div>
              </Link>
              <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
                <div className="btn-secondary">Join The Opportunity List</div>
              </Link>
            </div>
          </motion.div>

          {/* Right — how it fits together */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'var(--deep)',
              border: '1px solid rgba(201,168,76,0.12)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 24,
            }}>
              How It Fits Together
            </div>

            {[
              { label: 'MysterMyself', desc: 'The hub. The brand. The entry point.', color: '#c9a84c' },
              { label: 'Scott-King Coast', desc: 'The world. Eight districts. One ecosystem.', color: '#c9a84c' },
              { label: 'Trading Chef / TCU', desc: 'Gold trading education. Market Marina district.', color: '#0D9488' },
              { label: 'Breaded Or Not?!', desc: 'Food business and catering. Flavor District.', color: '#F97316' },
              { label: 'Route Harbor', desc: 'Medical courier income. Logistics lanes.', color: '#0EA5E9' },
              { label: 'Opportunity List', desc: 'Your entry pass. Choose a lane. Get drops.', color: '#c9a84c' },
              { label: 'Dashboard / Passport', desc: 'Your return hub. Track progress. Come back.', color: '#A855F7' },
            ].map((item, i) => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 0',
                borderBottom: i < 6 ? '1px solid rgba(201,168,76,0.06)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8,
                  background: item.color,
                  borderRadius: '50%',
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${item.color}40`,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    color: item.color,
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    color: 'rgba(245,240,232,0.35)',
                    marginTop: 2,
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
