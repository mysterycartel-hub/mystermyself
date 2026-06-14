'use client'

import { motion } from 'framer-motion'
import type { District } from '@/lib/districts'

interface PassportStampProps {
  district: District
  collected?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export default function PassportStamp({
  district,
  collected = false,
  size = 'md',
  animated = true,
}: PassportStampProps) {
  const sizes = {
    sm: { outer: 64, font: '0.55rem', emoji: '1rem', stamp: '0.65rem' },
    md: { outer: 96, font: '0.65rem', emoji: '1.4rem', stamp: '0.8rem' },
    lg: { outer: 140, font: '0.75rem', emoji: '2rem', stamp: '1.1rem' },
  }
  const s = sizes[size]

  const stamp = (
    <div style={{
      width: s.outer,
      height: s.outer,
      border: `2px solid ${collected ? district.color : 'rgba(201,168,76,0.2)'}`,
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      position: 'relative',
      background: collected ? `${district.color}10` : 'transparent',
      opacity: collected ? 1 : 0.35,
      transition: 'all 0.3s ease',
      flexShrink: 0,
    }}>
      {/* Dashed ring */}
      <div style={{
        position: 'absolute',
        inset: 6,
        border: `1px dashed ${collected ? district.color : 'rgba(201,168,76,0.2)'}40`,
        borderRadius: '50%',
      }} />

      <span style={{ fontSize: s.emoji }}>{district.emoji}</span>
      <div style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: s.stamp,
        letterSpacing: '0.2em',
        color: collected ? district.color : 'rgba(245,240,232,0.3)',
        lineHeight: 1,
        textAlign: 'center',
        padding: '0 8px',
      }}>
        {district.passportStamp}
      </div>

      {!collected && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'rgba(6,6,8,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1rem', opacity: 0.4 }}>🔒</span>
        </div>
      )}
    </div>
  )

  if (!animated) return stamp

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={collected ? { scale: 1.08, rotate: 3 } : {}}
    >
      {stamp}
    </motion.div>
  )
}
