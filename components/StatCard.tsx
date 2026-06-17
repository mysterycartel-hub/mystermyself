'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  color?: string
  icon?: string
  index?: number
}

export default function StatCard({ label, value, sub, color = 'var(--gold)', icon, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      style={{
        background: 'var(--deep)',
        border: `1px solid ${color}20`,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: color,
        opacity: 0.6,
      }} />
      {icon && (
        <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{icon}</div>
      )}
      <div style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '2.4rem',
        color,
        lineHeight: 1,
        letterSpacing: '0.02em',
        marginBottom: 6,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.56rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(245,240,232,0.45)',
        marginBottom: sub ? 6 : 0,
      }}>
        {label}
      </div>
      {sub && (
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          color: 'rgba(245,240,232,0.25)',
          letterSpacing: '0.08em',
        }}>
          {sub}
        </div>
      )}
    </motion.div>
  )
}
