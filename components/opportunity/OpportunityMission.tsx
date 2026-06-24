'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function OpportunityMission() {
  return (
    <section style={{
      background: 'var(--black)',
      padding: '80px 48px',
      borderTop: '1px solid rgba(201,168,76,0.08)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}
      >
        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 0.95,
          letterSpacing: '0.02em',
          marginBottom: 24,
        }}>
          ONE COAST. SIX DISTRICTS.<br />
          <span style={{ color: 'var(--gold)' }}>ONE MISSION.</span>
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'rgba(245,240,232,0.6)',
          lineHeight: 1.9,
          marginBottom: 40,
          maxWidth: 560,
          margin: '0 auto 40px',
        }}>
          Maurice Scott built The Scott-King Coast as a living map of every income lane he&apos;s navigating — trading, food, logistics, content, and legacy. The Opportunity List is how you ride along. Free drops. Real systems. No fluff.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/follow-the-coast" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--gold)',
              color: '#060608',
              padding: '16px 36px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Follow The Coast →
            </div>
          </Link>
          <Link href="/coast" style={{ textDecoration: 'none' }}>
            <div style={{
              border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--gold)',
              padding: '16px 36px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Explore All Districts
            </div>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
