'use client'

import { motion } from 'framer-motion'
import { getXPToNextLevel } from '@/lib/passport'

interface XPBarProps {
  xp: number
  compact?: boolean
}

export default function XPBar({ xp, compact = false }: XPBarProps) {
  const { current, next, level, nextLevel } = getXPToNextLevel(xp)
  const pct = next > 0 ? Math.min((current / next) * 100, 100) : 100

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '0.85rem',
          color: 'var(--gold)',
          letterSpacing: '0.1em',
          minWidth: 80,
        }}>
          {level.toUpperCase()}
        </span>
        <div style={{ flex: 1, height: 3, background: 'rgba(201,168,76,0.15)', position: 'relative' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--gold)' }}
          />
        </div>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: 'rgba(245,240,232,0.4)',
          minWidth: 60,
          textAlign: 'right',
        }}>
          {xp} XP
        </span>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <div>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2rem',
            color: 'var(--gold)',
            letterSpacing: '0.08em',
          }}>
            {level}
          </span>
          {nextLevel && (
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              color: 'rgba(245,240,232,0.3)',
              marginLeft: 12,
              letterSpacing: '0.1em',
            }}>
              → {nextLevel}
            </span>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.4rem',
            color: 'var(--gold)',
          }}>
            {xp.toLocaleString()}
          </span>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: 'rgba(245,240,232,0.4)',
            marginLeft: 6,
          }}>
            XP
          </span>
        </div>
      </div>

      {/* Track */}
      <div style={{
        height: 6,
        background: 'rgba(201,168,76,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))',
            boxShadow: '0 0 12px rgba(201,168,76,0.5)',
          }}
        />
        {/* Tick marks */}
        {[25, 50, 75].map((p) => (
          <div key={p} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${p}%`,
            width: 1,
            background: 'rgba(6,6,8,0.5)',
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: 'rgba(245,240,232,0.3)',
          letterSpacing: '0.1em',
        }}>
          {current.toLocaleString()} / {next.toLocaleString()} XP to {nextLevel ?? 'MAX'}
        </span>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: 'var(--gold)',
          letterSpacing: '0.1em',
        }}>
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  )
}
