'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { District } from '@/lib/districts'

interface DistrictCardProps {
  district: District
  index?: number
  variant?: 'grid' | 'featured' | 'compact'
  active?: boolean
  onClick?: () => void
}

export default function DistrictCard({
  district,
  index = 0,
  variant = 'grid',
  active = false,
  onClick,
}: DistrictCardProps) {
  const d = district

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        onClick={onClick}
        style={{
          background: active ? `${d.color}10` : 'var(--deep)',
          border: `1px solid ${active ? d.color : 'rgba(201,168,76,0.1)'}`,
          padding: '20px 24px',
          cursor: 'none',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: active ? `0 0 30px ${d.color}20` : 'none',
        }}
      >
        <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{d.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.05em',
            color: active ? d.color : 'var(--cream)',
            lineHeight: 1,
            marginBottom: 4,
          }}>
            {d.name}
          </div>
          <div style={{
            fontSize: '0.6rem',
            color: 'rgba(245,240,232,0.35)',
            letterSpacing: '0.1em',
            fontFamily: '"Space Mono", monospace',
          }}>
            {d.tag}
          </div>
        </div>
        <div style={{
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: d.color,
          fontFamily: '"Space Mono", monospace',
          flexShrink: 0,
        }}>
          {active ? '← ACTIVE' : 'VIEW →'}
        </div>
      </motion.div>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        style={{
          background: 'var(--deep)',
          border: `1px solid ${d.color}30`,
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${d.color}, transparent)`,
        }} />
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '5rem',
          color: `${d.color}08`,
          lineHeight: 1,
          position: 'absolute',
          bottom: 16,
          right: 24,
          letterSpacing: '0.05em',
        }}>
          {d.passportStamp}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
          <span style={{ fontSize: '2.4rem' }}>{d.emoji}</span>
          <div>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              background: `${d.color}15`,
              color: d.color,
              border: `1px solid ${d.color}30`,
              display: 'inline-block',
              marginBottom: 12,
            }}>
              {d.tag}
            </span>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.8rem',
              letterSpacing: '0.04em',
              color: d.color,
              lineHeight: 1,
              marginBottom: 6,
            }}>
              {d.name}
            </h3>
            <p style={{
              fontSize: '0.6rem',
              color: 'rgba(245,240,232,0.4)',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.08em',
            }}>
              {d.tagline}
            </p>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.8, marginBottom: 28 }}>
          {d.description}
        </p>

        <div style={{ marginBottom: 28 }}>
          {d.features.slice(0, 4).map((f) => (
            <div key={f} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 0',
              borderBottom: '1px solid rgba(201,168,76,0.06)',
            }}>
              <div style={{ width: 4, height: 4, background: d.color, borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.55)' }}>{f}</span>
            </div>
          ))}
        </div>

        <Link href={d.href} style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <div style={{
            background: d.color,
            color: '#060608',
            padding: '14px 32px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}>
            {d.cta} →
          </div>
        </Link>
      </motion.div>
    )
  }

  // Default: grid variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
    >
      <Link href={d.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          background: 'var(--deep)',
          border: `1px solid ${d.color}15`,
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.35s ease',
          height: '100%',
        }}
          className="district-card-hover"
        >
          <style>{`
            .district-card-hover:hover {
              border-color: ${d.color}50 !important;
              transform: translateY(-6px);
              box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${d.color}10;
            }
            .district-card-hover:hover .district-card-bar {
              transform: scaleX(1) !important;
            }
          `}</style>

          <div className="district-card-bar" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 2,
            background: d.color,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s ease',
          }} />

          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '3.5rem',
            color: `${d.color}08`,
            lineHeight: 1,
            marginBottom: 4,
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <span style={{ fontSize: '1.8rem' }}>{d.emoji}</span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              background: `${d.color}15`,
              color: d.color,
              border: `1px solid ${d.color}30`,
            }}>
              {d.tag}
            </span>
          </div>

          <h3 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.3rem',
            letterSpacing: '0.04em',
            color: d.color,
            marginBottom: 6,
            lineHeight: 1.1,
          }}>
            {d.name}
          </h3>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.56rem',
            letterSpacing: '0.08em',
            color: 'rgba(245,240,232,0.3)',
            textTransform: 'uppercase',
            marginBottom: 16,
            lineHeight: 1.5,
          }}>
            {d.tagline}
          </p>

          <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.8 }}>
            {d.description}
          </p>

          <div style={{
            marginTop: 24,
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: d.color,
          }}>
            Enter →
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
