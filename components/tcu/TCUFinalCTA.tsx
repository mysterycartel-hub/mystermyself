'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TCUFinalCTA() {
  return (
    <section style={{
      background: 'var(--gold)',
      padding: '120px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost text watermark */}
      <div style={{
        position: 'absolute',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '30vw',
        color: 'rgba(6,6,8,0.06)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        TCU
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
          style={{ color: 'var(--black)' }}
        >
          THE KITCHEN<br />IS OPEN.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontSize: '0.85rem',
            color: 'rgba(6,6,8,0.65)',
            maxWidth: 500,
            margin: '0 auto 48px',
            lineHeight: 1.8,
            fontFamily: '"Space Mono", monospace',
          }}
        >
          Stop chasing candles. Stop following random signals. Start learning to read gold the way it was designed to be read — with structure, patience, and a system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/trading-chef-university#pricing"
            style={{
              background: 'var(--black)',
              color: 'var(--gold)',
              padding: '18px 40px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              transition: 'background 0.2s',
            }}
          >
            Enroll Today →
          </Link>
          <Link
            href="/#lead"
            style={{
              border: '1px solid rgba(6,6,8,0.3)',
              color: 'var(--black)',
              padding: '18px 40px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Get Free Guide First
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
