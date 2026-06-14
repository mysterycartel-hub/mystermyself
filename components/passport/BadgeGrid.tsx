'use client'

import { motion } from 'framer-motion'
import { PASSPORT_BADGES } from '@/lib/passport'

interface BadgeGridProps {
  earnedBadgeIds: string[]
  compact?: boolean
}

export default function BadgeGrid({ earnedBadgeIds, compact = false }: BadgeGridProps) {
  const earned = new Set(earnedBadgeIds)

  if (compact) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PASSPORT_BADGES.map((badge) => {
          const have = earned.has(badge.id)
          return (
            <div
              key={badge.id}
              title={`${badge.name}: ${badge.description}`}
              style={{
                width: 40, height: 40,
                border: `1px solid ${have ? badge.color : 'rgba(201,168,76,0.1)'}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                opacity: have ? 1 : 0.25,
                background: have ? `${badge.color}12` : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {badge.icon}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.55rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 24,
      }}>
        Badges — {earnedBadgeIds.length} / {PASSPORT_BADGES.length}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 2,
      }}>
        {PASSPORT_BADGES.map((badge, i) => {
          const have = earned.has(badge.id)
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              style={{
                background: have ? `${badge.color}08` : 'transparent',
                border: `1px solid ${have ? badge.color : 'rgba(201,168,76,0.08)'}${have ? '30' : ''}`,
                padding: '20px 18px',
                opacity: have ? 1 : 0.35,
                transition: 'all 0.3s',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{badge.icon}</div>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1rem',
                color: have ? badge.color : 'rgba(245,240,232,0.4)',
                letterSpacing: '0.05em',
                marginBottom: 4,
              }}>
                {badge.name}
              </div>
              <div style={{
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.35)',
                lineHeight: 1.5,
                fontFamily: '"Space Mono", monospace',
              }}>
                {badge.description}
              </div>
              {!have && (
                <div style={{
                  marginTop: 10,
                  fontSize: '0.52rem',
                  color: 'rgba(201,168,76,0.3)',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.1em',
                }}>
                  {badge.xpRequired} XP required
                </div>
              )}
              {have && (
                <div style={{
                  marginTop: 10,
                  fontSize: '0.52rem',
                  color: badge.color,
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.1em',
                }}>
                  ✓ EARNED
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
