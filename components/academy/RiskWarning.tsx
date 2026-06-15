'use client'

import { motion } from 'framer-motion'

interface Props {
  message: string
}

export default function RiskWarning({ message }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'rgba(239,68,68,0.05)',
        border: '1px solid rgba(239,68,68,0.25)',
        padding: '20px 24px',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left alert bar */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: '#EF4444',
      }} />

      {/* Icon + character */}
      <div style={{ flexShrink: 0, textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', lineHeight: 1 }}>🔔</div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.4rem',
          color: '#EF4444',
          letterSpacing: '0.1em',
          marginTop: 4,
          textTransform: 'uppercase',
        }}>
          Burn<br />Alarm
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#EF4444',
          marginBottom: 8,
        }}>
          Risk Warning
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          lineHeight: 1.8,
          color: 'rgba(245,240,232,0.7)',
          margin: 0,
        }}>
          {message}
        </p>
      </div>
    </motion.div>
  )
}
