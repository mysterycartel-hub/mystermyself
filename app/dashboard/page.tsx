'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface UserStats {
  email: string | null
  totalXP: number
  rank: number
  rankLabel: string
  analysesCount: number
  journalCount: number
  missionsCount: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userLane, setUserLane] = useState<string | null>(null)

  useEffect(() => {
    // Load lane/district context from localStorage
    try {
      const lane = localStorage.getItem('skc_join_lane')
      if (lane) setUserLane(lane)
    } catch { /* noop */ }

    async function loadDashboard() {
      let email: string | null = null

      // Try to get the authenticated user
      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          email = user.email
          setAuthenticated(true)
        }
      } catch {
        // Supabase not configured - continue with local data
      }

      // Load XP and rank from localStorage via the engine
      let totalXP = 0
      let rank = 1
      let rankLabel = 'Kitchen Recruit'
      try {
        const { XPRewardEngine } = await import('@/lib/xp-reward-engine')
        totalXP = XPRewardEngine.getTotalXP()
        rank = XPRewardEngine.getRank(totalXP)
        rankLabel = XPRewardEngine.getRankLabel(rank)
      } catch {
        // Engine not available
      }

      // Count analyses from localStorage
      let analysesCount = 0
      try {
        const raw = localStorage.getItem('tcu_analyses')
        if (raw) {
          const arr = JSON.parse(raw)
          analysesCount = Array.isArray(arr) ? arr.length : 0
        }
      } catch { /* ignore */ }

      // Count journal entries from localStorage
      let journalCount = 0
      try {
        const raw = localStorage.getItem('tcu_journal_entries')
        if (raw) {
          const arr = JSON.parse(raw)
          journalCount = Array.isArray(arr) ? arr.length : 0
        }
      } catch { /* ignore */ }

      // Count missions from localStorage
      let missionsCount = 0
      try {
        const raw = localStorage.getItem('tcu_missions_completed')
        if (raw) {
          const arr = JSON.parse(raw)
          missionsCount = Array.isArray(arr) ? arr.length : 0
        }
      } catch { /* ignore */ }

      setStats({ email, totalXP, rank, rankLabel, analysesCount, journalCount, missionsCount })
      setLoading(false)
    }

    loadDashboard()
  }, [])

  const statCards = stats ? [
    { label: 'Total XP', value: String(stats.totalXP), icon: '⚡', color: '#c9a84c' },
    { label: 'Rank', value: `${stats.rank}`, icon: '🏅', color: '#22C55E', sub: stats.rankLabel },
    { label: 'Analyses Saved', value: String(stats.analysesCount), icon: '📊', color: '#0EA5E9' },
    { label: 'Journal Entries', value: String(stats.journalCount), icon: '📓', color: '#A855F7' },
    { label: 'Missions Done', value: String(stats.missionsCount), icon: '🎯', color: '#c0392b' },
  ] : []

  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Trading Chef University · Dashboard
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}>
              YOUR <span style={{ color: 'var(--gold)' }}>DASHBOARD</span>
            </h1>
            {stats?.email && (
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                color: 'rgba(245,240,232,0.5)',
                marginTop: 12,
              }}>
                Signed in as <span style={{ color: 'var(--gold)' }}>{stats.email}</span>
              </p>
            )}
          </div>

          {loading ? (
            <div style={{
              background: 'var(--deep)',
              border: '1px solid rgba(201,168,76,0.08)',
              padding: '48px 32px',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                color: 'rgba(245,240,232,0.4)',
              }}>
                Loading your stats...
              </p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 2,
                marginBottom: 48,
              }}>
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    style={{
                      background: 'var(--deep)',
                      border: '1px solid rgba(201,168,76,0.08)',
                      padding: '24px 20px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: '1.2rem' }}>{card.icon}</span>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.4)',
                      }}>
                        {card.label}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2rem',
                      color: card.color,
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                    }}>
                      {card.value}
                    </div>
                    {card.sub && (
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        color: 'rgba(245,240,232,0.3)',
                        marginTop: 6,
                      }}>
                        {card.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Your Lane / Recommended Next */}
              {userLane && (
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  padding: '24px 28px',
                  marginBottom: 32,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.5)',
                      marginBottom: 8,
                    }}>
                      Your Selected Lane
                    </div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.4rem',
                      color: 'var(--gold)',
                      letterSpacing: '0.04em',
                    }}>
                      {userLane.replace('interest_', '').replace(/_/g, ' ').toUpperCase()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link href="/coast" style={{ textDecoration: 'none' }}>
                      <div style={{
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: 'var(--gold)',
                        padding: '10px 18px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        Explore Districts
                      </div>
                    </Link>
                    <Link href="/pricing" style={{ textDecoration: 'none' }}>
                      <div style={{
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: 'var(--gold)',
                        padding: '10px 18px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        View Products
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Primary CTA - Chart Kitchen */}
              <Link href="/chart-kitchen" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
                <div style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  padding: '28px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.5rem',
                      letterSpacing: '0.04em',
                      color: 'var(--gold)',
                      marginBottom: 4,
                    }}>
                      Continue to Chart Kitchen
                    </div>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.65rem',
                      color: 'rgba(245,240,232,0.4)',
                      margin: 0,
                    }}>
                      Analyze charts, earn XP, and level up your trading skills.
                    </p>
                  </div>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '1.2rem',
                    color: 'var(--gold)',
                  }}>
                    →
                  </span>
                </div>
              </Link>

              {/* Navigation Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 2,
                marginBottom: 48,
              }}>
                {[
                  { href: '/journal', label: 'Trade Journal', icon: '📓', desc: 'Log your sessions' },
                  { href: '/missions', label: 'Missions', icon: '🎯', desc: 'Complete challenges' },
                  { href: '/roadmap', label: 'Roadmap', icon: '🗺️', desc: 'Your learning path' },
                ].map((nav) => (
                  <Link key={nav.href} href={nav.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--deep)',
                      border: '1px solid rgba(201,168,76,0.08)',
                      padding: '24px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                      <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 10 }}>{nav.icon}</span>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.1rem',
                        letterSpacing: '0.04em',
                        color: 'var(--cream)',
                        marginBottom: 4,
                      }}>
                        {nav.label}
                      </div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.55rem',
                        color: 'rgba(245,240,232,0.35)',
                      }}>
                        {nav.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Auth prompt if not signed in */}
              {!authenticated && (
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  padding: '28px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.3rem',
                      letterSpacing: '0.04em',
                      color: 'var(--gold)',
                      marginBottom: 4,
                    }}>
                      Sign In to Track Progress
                    </div>
                    <p style={{
                      fontSize: '0.65rem',
                      color: 'rgba(245,240,232,0.4)',
                      fontFamily: '"Space Mono", monospace',
                      margin: 0,
                    }}>
                      Connect your account to sync XP, journal entries, and missions across devices.
                    </p>
                  </div>
                  <Link href="/auth" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--gold)',
                      color: '#060608',
                      padding: '12px 24px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}>
                      Sign In →
                    </div>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
