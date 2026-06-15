'use client'

import { motion } from 'framer-motion'
import { LESSONS, TOTAL_ACADEMY_XP } from '@/lib/academy'

interface Props {
  completedLessons?: string[]
  totalXP?: number
}

export default function ProgressTracker({ completedLessons = [], totalXP = 0 }: Props) {
  const pct = Math.round((completedLessons.length / LESSONS.length) * 100)
  const xpPct = Math.round((totalXP / TOTAL_ACADEMY_XP) * 100)

  return (
    <div style={{
      background: 'rgba(201,168,76,0.04)',
      border: '1px solid rgba(201,168,76,0.12)',
      padding: '24px 28px',
    }}>
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.48rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.5)',
        marginBottom: 20,
      }}>
        Academy Progress
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { num: completedLessons.length, total: LESSONS.length, label: 'Lessons' },
          { num: totalXP, total: TOTAL_ACADEMY_XP, label: 'XP Earned', raw: true },
          { num: pct, total: 100, label: 'Complete', suffix: '%' },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '2rem',
                color: '#c9a84c',
                lineHeight: 1,
              }}>
                {s.raw ? s.num.toLocaleString() : s.num}
              </span>
              {!s.suffix && !s.raw && (
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  color: 'rgba(245,240,232,0.2)',
                }}>
                  /{s.total}
                </span>
              )}
              {s.suffix && (
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  color: 'rgba(201,168,76,0.6)',
                }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.44rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.25)',
              marginTop: 2,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        height: 4,
        background: 'rgba(245,240,232,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xpPct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #c9a84c, #f0c96e)',
            boxShadow: '0 0 12px rgba(201,168,76,0.5)',
          }}
        />
      </div>

      {/* Mini lesson dots */}
      <div style={{
        display: 'flex',
        gap: 4,
        marginTop: 12,
        flexWrap: 'wrap',
      }}>
        {LESSONS.map((l) => {
          const done = completedLessons.includes(l.id)
          return (
            <div
              key={l.id}
              title={l.title}
              style={{
                width: 8, height: 8,
                borderRadius: '50%',
                background: done ? l.color : 'rgba(245,240,232,0.08)',
                transition: 'background 0.3s',
                boxShadow: done ? `0 0 6px ${l.color}60` : 'none',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
