'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { districts } from '@/lib/districts'
import PassportStamp from './PassportStamp'

interface StampCollectionProps {
  collectedIds: string[]
  onCollect?: (districtId: string) => void
  compact?: boolean
}

export default function StampCollection({ collectedIds, onCollect, compact = false }: StampCollectionProps) {
  const collected = new Set(collectedIds)
  const count = collected.size

  if (compact) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
          }}>
            Stamps
          </span>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1rem',
            color: 'var(--gold)',
            letterSpacing: '0.1em',
          }}>
            {count} / 9
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {districts.map((d) => (
            <PassportStamp key={d.id} district={d} collected={collected.has(d.id)} size="sm" animated={false} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 8,
          }}>
            District Stamps
          </p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              color: 'var(--gold)',
              lineHeight: 1,
            }}>
              {count}
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'rgba(245,240,232,0.35)',
            }}>
              / 9 collected
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: 200 }}>
          <div style={{ height: 4, background: 'rgba(201,168,76,0.12)', position: 'relative', marginBottom: 6 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(count / 9) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: '0 auto 0 0', background: 'var(--gold)' }}
            />
          </div>
          <span style={{
            fontSize: '0.52rem',
            color: 'rgba(245,240,232,0.3)',
            fontFamily: '"Space Mono", monospace',
          }}>
            {count === 9 ? '✓ COAST COMPLETE' : `${9 - count} districts remaining`}
          </span>
        </div>
      </div>

      {/* Stamp grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 2,
      }}>
        {districts.map((d, i) => {
          const have = collected.has(d.id)
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{
                background: have ? `${d.color}08` : 'var(--deep)',
                border: `1px solid ${have ? d.color : 'rgba(201,168,76,0.08)'}30`,
                padding: '28px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <PassportStamp district={d} collected={have} size="md" animated={have} />

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.95rem',
                  color: have ? d.color : 'rgba(245,240,232,0.35)',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                }}>
                  {d.name}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  color: 'rgba(245,240,232,0.25)',
                  letterSpacing: '0.1em',
                }}>
                  {d.tag}
                </div>
              </div>

              {!have ? (
                <Link href={`/coast/${d.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.4)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    padding: '6px 14px',
                  }}>
                    Visit to Stamp →
                  </div>
                </Link>
              ) : (
                onCollect ? (
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.12em',
                    color: d.color,
                    opacity: 0.7,
                  }}>
                    ✓ STAMPED
                  </div>
                ) : (
                  <Link href={`/coast/${d.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.52rem',
                      letterSpacing: '0.12em',
                      color: d.color,
                      opacity: 0.7,
                    }}>
                      ✓ STAMPED
                    </div>
                  </Link>
                )
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
