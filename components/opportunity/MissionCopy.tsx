'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MissionCopy() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '100px 48px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 24,
          }}>
            ONE COAST.<br />
            EIGHT DISTRICTS.<br />
            <span style={{ color: '#C9A84C' }}>ONE MISSION.</span>
          </h2>

          <p style={{
            fontSize: '0.88rem',
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.9,
            maxWidth: 600,
            margin: '0 auto 40px',
          }}>
            Maurice Scott built The Scott-King Coast as a living map of every income lane
            he&apos;s navigating — trading, food, logistics, content, and legacy. The Opportunity
            List is how you ride along. Free drops. Real systems. No fluff.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#start-here" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#C9A84C',
                color: '#060608',
                padding: '18px 40px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                Join The List →
              </div>
            </Link>
            <Link href="/follow-the-coast" style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#C9A84C',
                padding: '18px 40px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                Follow The Coast
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
