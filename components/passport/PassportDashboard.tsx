'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import XPBar from './XPBar'
import BadgeGrid from './BadgeGrid'
import StampCollection from './StampCollection'
import type { PassportFull } from '@/lib/passport-db'
import { PASSPORT_MISSIONS } from '@/lib/passport'

type Tab = 'overview' | 'stamps' | 'badges' | 'missions' | 'history'

interface PassportDashboardProps {
  userId: string
  accessToken: string
}

export default function PassportDashboard({ userId, accessToken }: PassportDashboardProps) {
  const [data, setData]     = useState<PassportFull | null>(null)
  const [tab, setTab]       = useState<Tab>('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  const fetchPassport = useCallback(async () => {
    try {
      const res = await fetch('/api/passport/status', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error(await res.text())
      setData(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load passport')
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    // Register passport on first load
    fetch('/api/passport/register', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(() => fetchPassport())
  }, [accessToken, fetchPassport])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: '2rem' }}>🗺️</div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(201,168,76,0.5)',
        }}>
          Loading your passport...
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{
        padding: '40px',
        border: '1px solid rgba(192,57,43,0.3)',
        background: 'rgba(192,57,43,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 16 }}>⚠️</div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)', fontFamily: '"Space Mono", monospace', lineHeight: 1.6 }}>
          {error ?? 'Passport not found. Try refreshing or contact support.'}
        </p>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview',  label: 'Overview' },
    { id: 'stamps',    label: 'Stamps',   count: data.stamps.length },
    { id: 'badges',    label: 'Badges',   count: data.badges.length },
    { id: 'missions',  label: 'Missions', count: data.missions.length },
    { id: 'history',   label: 'XP Log' },
  ]

  return (
    <div>
      {/* Passport header card */}
      <div style={{
        background: 'var(--deep)',
        border: '1px solid rgba(201,168,76,0.15)',
        padding: '40px 48px',
        marginBottom: 2,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ghost stamp */}
        <div style={{
          position: 'absolute',
          right: 32, top: 16,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '8rem',
          color: 'rgba(201,168,76,0.04)',
          letterSpacing: '0.1em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          SKC
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.5)',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Scott-King Coast · Passport · V3
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '3rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: 4,
            }}>
              @{data.profile.username ?? 'coastrider'}
            </h2>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'rgba(245,240,232,0.4)',
              marginBottom: 28,
            }}>
              {data.profile.display_name} · Joined {new Date(data.profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>

            <XPBar xp={data.profile.xp} />
          </div>

          {/* Stats column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end', justifyContent: 'center' }}>
            {[
              { label: 'Stamps',   value: `${data.stamps.length}/9` },
              { label: 'Badges',   value: data.badges.length },
              { label: 'Missions', value: data.missions.length },
              { label: 'Total XP', value: data.profile.xp.toLocaleString() },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.3)',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        background: 'var(--black)',
        marginBottom: 2,
        overflowX: 'auto',
      }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${tab === t.id ? 'var(--gold)' : 'transparent'}`,
              padding: '18px 28px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: tab === t.id ? 'var(--gold)' : 'rgba(245,240,232,0.4)',
              cursor: 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {t.label}
            {t.count !== undefined && (
              <span style={{
                background: tab === t.id ? 'var(--gold)' : 'rgba(201,168,76,0.15)',
                color: tab === t.id ? 'var(--black)' : 'rgba(201,168,76,0.6)',
                padding: '2px 8px',
                fontSize: '0.5rem',
                fontWeight: 700,
              }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.08)',
            padding: '40px 48px',
          }}
        >
          {tab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <StampCollection collectedIds={data.stamps} compact />
              </div>
              <div>
                <BadgeGrid earnedBadgeIds={data.badges} compact />
                <div style={{ marginTop: 32 }}>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: 16,
                  }}>
                    Recent XP
                  </p>
                  {data.xpEvents.slice(0, 4).map((ev, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}>
                      <span style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.55)' }}>
                        {ev.description}
                      </span>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1rem',
                        color: 'var(--gold)',
                      }}>
                        +{ev.xp_amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'stamps' && (
            <StampCollection collectedIds={data.stamps} />
          )}

          {tab === 'badges' && (
            <BadgeGrid earnedBadgeIds={data.badges} />
          )}

          {tab === 'missions' && (
            <div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 24,
              }}>
                Missions — {data.missions.length} / {PASSPORT_MISSIONS.length} Complete
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {PASSPORT_MISSIONS.map((m) => {
                  const done = data.missions.includes(m.id)
                  return (
                    <div key={m.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                      opacity: done ? 1 : 0.55,
                    }}>
                      <div style={{
                        width: 32, height: 32,
                        border: `1px solid ${done ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        flexShrink: 0,
                        color: done ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                      }}>
                        {done ? '✓' : '○'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1.1rem',
                          color: done ? 'var(--cream)' : 'rgba(245,240,232,0.4)',
                          letterSpacing: '0.03em',
                          marginBottom: 4,
                        }}>
                          {m.title}
                        </div>
                        <div style={{
                          fontSize: '0.68rem',
                          color: 'rgba(245,240,232,0.4)',
                          lineHeight: 1.5,
                        }}>
                          {m.description}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.2rem',
                        color: done ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                        flexShrink: 0,
                      }}>
                        +{m.xpReward} XP
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 24,
              }}>
                XP Event Log
              </p>
              {data.xpEvents.length === 0 ? (
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)', fontFamily: '"Space Mono", monospace' }}>
                  No XP events yet. Start exploring the coast.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {data.xpEvents.map((ev, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.65)', marginBottom: 4 }}>
                          {ev.description}
                        </div>
                        <div style={{
                          fontSize: '0.55rem',
                          color: 'rgba(245,240,232,0.25)',
                          fontFamily: '"Space Mono", monospace',
                        }}>
                          {ev.event_type} · {new Date(ev.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.4rem',
                        color: 'var(--gold)',
                      }}>
                        +{ev.xp_amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Public profile link */}
      {data.profile.username && (
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Link
            href={`/passport/${data.profile.username}`}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              color: 'rgba(201,168,76,0.5)',
              textDecoration: 'none',
              letterSpacing: '0.12em',
            }}
          >
            Public Profile: /passport/{data.profile.username} →
          </Link>
        </div>
      )}
    </div>
  )
}
