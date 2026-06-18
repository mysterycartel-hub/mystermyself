'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductPriority() {
  return (
    <section id="featured-opportunity" style={{
      background: 'var(--black)',
      borderTop: '1px solid rgba(14,165,233,0.15)',
      borderBottom: '1px solid rgba(14,165,233,0.15)',
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 16 }}
      >
        <div className="section-label">
          <div className="section-label-line" style={{ background: '#0EA5E9' }} />
          <span className="section-label-text" style={{ color: '#0EA5E9' }}>Featured Opportunity</span>
        </div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'center',
      }}>
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.3)',
            padding: '6px 14px',
            marginBottom: 24,
          }}>
            <span style={{ fontSize: '1rem' }}>🚢</span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0EA5E9',
            }}>
              Start with Route Harbor
            </span>
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 16,
          }}>
            MEDICAL COURIER<br />
            <span style={{ color: '#0EA5E9' }}>INSIDER EDGE</span>
          </h2>

          <p style={{
            fontSize: '0.82rem',
            color: 'rgba(245,240,232,0.5)',
            lineHeight: 1.7,
            maxWidth: 440,
            marginBottom: 12,
            fontFamily: '"Space Mono", monospace',
          }}>
            Medical Courier Insider Edge is the first live opportunity path.
          </p>

          <p style={{
            fontSize: '0.82rem',
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.9,
            maxWidth: 480,
            marginBottom: 36,
          }}>
            Learn how to find pharmacy, lab, and medical courier opportunities
            without depending only on job boards or delivery apps.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/products/medical-courier-guide" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0EA5E9',
                color: '#060608',
                padding: '16px 32px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                View The Guide →
              </div>
            </Link>
            <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid rgba(14,165,233,0.4)',
                color: '#0EA5E9',
                padding: '16px 32px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Get Free Courier Chapter
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Right: Price card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(14,165,233,0.25)',
            padding: 'clamp(32px, 5vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#0EA5E9' }} />

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#0EA5E9',
              marginBottom: 24,
            }}>
              Medical Courier Insider Edge
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', color: 'var(--cream)', lineHeight: 1 }}>
                $37
              </span>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: 'rgba(245,240,232,0.25)', textDecoration: 'line-through', lineHeight: 1, marginBottom: 8 }}>
                $47
              </span>
            </div>

            <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.45)', fontFamily: '"Space Mono", monospace', lineHeight: 1.7, marginBottom: 28 }}>
              One-time access. Instant delivery. No subscription.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Digital guide — instant access', 'Route Harbor method included', 'Real income math, no hype', 'Free first chapter via newsletter'].map((f) => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ color: '#0EA5E9', fontSize: '0.8rem' }}>✓</span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)', fontFamily: '"Space Mono", monospace' }}>{f}</span>
                </div>
              ))}
            </div>

            <Link href="/products/medical-courier-guide" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: '#0EA5E9',
                color: '#060608',
                padding: '18px 32px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                View The Guide →
              </div>
            </Link>

            <p style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.25)', fontFamily: '"Space Mono", monospace', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              As an affiliate, MysterMyself may earn from qualifying purchases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
