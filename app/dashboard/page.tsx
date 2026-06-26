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

const DISTRICT_LINKS = [
  { id: 'market-marina', name: 'Market Marina', emoji: '⚓', color: '#0D9488', href: '/coast/market-marina', desc: 'Trading Chef / TCU' },
  { id: 'route-harbor', name: 'Route Harbor', emoji: '🚢', color: '#0EA5E9', href: '/coast/route-harbor', desc: 'Courier income' },
  { id: 'flavor-district', name: 'Flavor District', emoji: '🍗', color: '#F97316', href: '/coast/flavor-district', desc: 'Food business' },
  { id: 'blueprint-bay', name: 'Blueprint Bay', emoji: '📐', color: '#6366F1', href: '/coast/blueprint-bay', desc: 'AI tools' },
  { id: 'creator-pier', name: 'Creator Pier', emoji: '🎬', color: '#A855F7', href: '/coast/creator-pier', desc: 'Content & affiliate' },
  { id: 'fantasy-island', name: 'Fantasy Island', emoji: '🏈', color: '#22C55E', href: '/coast/fantasy-island', desc: 'Fantasy football' },
  { id: 'legacy-point', name: 'Legacy Point', emoji: '🏛️', color: '#EC4899', href: '/coast/legacy-point', desc: 'Wealth & ownership' },
  { id: 'library-vault', name: 'Library Vault', emoji: '📚', color: '#c9a84c', href: '/coast/library-vault', desc: 'Free resources' },
]

const LANE_RECOMMENDATIONS: Record<string, { district: string; nextAction: string; resource: string; resourceHref: string }> = {
  'interest_trading_chef': { district: 'Market Marina', nextAction: 'Continue TCU lessons in the Academy', resource: 'TCU Academy', resourceHref: '/academy' },
  'interest_route_harbor': { district: 'Route Harbor', nextAction: 'Read the Medical Courier Insider Edge', resource: 'Courier Guide', resourceHref: '/products/medical-courier-guide' },
  'interest_food': { district: 'Flavor District', nextAction: 'Explore food business resources', resource: 'Flavor District', resourceHref: '/coast/flavor-district' },
  'interest_ai_business': { district: 'Blueprint Bay', nextAction: 'Explore AI automation tools', resource: 'Blueprint Bay', resourceHref: '/coast/blueprint-bay' },
  'interest_creator_tools': { district: 'Creator Pier', nextAction: 'Build your content system', resource: 'Creator Pier', resourceHref: '/coast/creator-pier' },
  'interest_fantasy': { district: 'Fantasy Island', nextAction: 'Get fantasy football intelligence', resource: 'Fantasy Island', resourceHref: '/coast/fantasy-island' },
  'interest_fast_income': { district: 'Route Harbor', nextAction: 'Start with courier income', resource: 'Route Harbor', resourceHref: '/coast/route-harbor' },
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userLane, setUserLane] = useState<string | null>(null)

  useEffect(() => {
    try {
      const lane = localStorage.getItem('skc_join_lane')
      if (lane) setUserLane(lane)
    } catch { /* noop */ }

    async function loadDashboard() {
      let email: string | null = null
      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          email = user.email
          setAuthenticated(true)
        }
      } catch { /* Supabase not configured */ }

      let totalXP = 0
      let rank = 1
      let rankLabel = 'Kitchen Recruit'
      try {
        const { XPRewardEngine } = await import('@/lib/xp-reward-engine')
        totalXP = XPRewardEngine.getTotalXP()
        rank = XPRewardEngine.getRank(totalXP)
        rankLabel = XPRewardEngine.getRankLabel(rank)
      } catch { /* Engine not available */ }

      let analysesCount = 0
      try {
        const raw = localStorage.getItem('tcu_analyses')
        if (raw) { const arr = JSON.parse(raw); analysesCount = Array.isArray(arr) ? arr.length : 0 }
      } catch { /* ignore */ }

      let journalCount = 0
      try {
        const raw = localStorage.getItem('tcu_journal_entries')
        if (raw) { const arr = JSON.parse(raw); journalCount = Array.isArray(arr) ? arr.length : 0 }
      } catch { /* ignore */ }

      let missionsCount = 0
      try {
        const raw = localStorage.getItem('tcu_missions_completed')
        if (raw) { const arr = JSON.parse(raw); missionsCount = Array.isArray(arr) ? arr.length : 0 }
      } catch { /* ignore */ }

      setStats({ email, totalXP, rank, rankLabel, analysesCount, journalCount, missionsCount })
      setLoading(false)
    }

    loadDashboard()
  }, [])

  const recommendation = userLane ? LANE_RECOMMENDATIONS[userLane] : null

  const statCards = stats ? [
    { label: 'Total XP', value: String(stats.totalXP), icon: '⚡', color: '#c9a84c' },
    { label: 'Rank', value: `${stats.rank}`, icon: '🏅', color: '#22C55E', sub: stats.rankLabel },
    { label: 'Analyses', value: String(stats.analysesCount), icon: '📊', color: '#0EA5E9' },
    { label: 'Journal', value: String(stats.journalCount), icon: '📓', color: '#A855F7' },
    { label: 'Missions', value: String(stats.missionsCount), icon: '🎯', color: '#c0392b' },
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>

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
              Scott-King Coast &middot; Your Return Hub
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
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: 'rgba(245,240,232,0.4)' }}>
                Loading your coast data...
              </p>
            </div>
          ) : (
            <>
              {/* Selected Lane + Recommended Next Action */}
              {recommendation && (
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  padding: '28px 32px',
                  marginBottom: 32,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 24,
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.48rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.5)',
                      marginBottom: 8,
                    }}>
                      Your Selected Lane
                    </div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.5rem',
                      color: 'var(--gold)',
                      letterSpacing: '0.04em',
                    }}>
                      {recommendation.district}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.48rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.5)',
                      marginBottom: 8,
                    }}>
                      Recommended Next Action
                    </div>
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'rgba(245,240,232,0.6)',
                      lineHeight: 1.6,
                    }}>
                      {recommendation.nextAction}
                    </p>
                  </div>
                  <div>
                    <Link href={recommendation.resourceHref} style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: 'var(--gold)',
                        color: '#060608',
                        padding: '14px 24px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}>
                        Go To {recommendation.resource} &rarr;
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Trading Chef Next Step — shows when lane is TCU */}
              {userLane === 'interest_trading_chef' && (
                <div style={{
                  background: 'rgba(13,148,136,0.04)',
                  border: '1px solid rgba(13,148,136,0.2)',
                  padding: '24px 28px',
                  marginBottom: 32,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                  <span style={{ fontSize: '2.5rem' }}>👨‍🍳</span>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.3rem',
                      color: '#0D9488',
                      letterSpacing: '0.04em',
                      marginBottom: 4,
                    }}>
                      Trading Chef Next Step
                    </div>
                    <p style={{
                      fontSize: '0.7rem',
                      color: 'rgba(245,240,232,0.5)',
                      fontFamily: '"Space Mono", monospace',
                    }}>
                      Road Map Step 1 — Read the Menu (Bias). Check the daily/weekly structure.
                    </p>
                  </div>
                  <Link href="/market-marina" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#0D9488',
                      color: '#060608',
                      padding: '12px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      Today&apos;s Kitchen &rarr;
                    </div>
                  </Link>
                </div>
              )}

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 2,
                marginBottom: 40,
              }}>
                {statCards.map((card) => (
                  <div key={card.label} style={{
                    background: 'var(--deep)',
                    border: '1px solid rgba(201,168,76,0.08)',
                    padding: '20px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: '1rem' }}>{card.icon}</span>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.45rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.4)',
                      }}>
                        {card.label}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.8rem',
                      color: card.color,
                      lineHeight: 1,
                    }}>
                      {card.value}
                    </div>
                    {card.sub && (
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        color: 'rgba(245,240,232,0.3)',
                        marginTop: 4,
                      }}>
                        {card.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 2,
                marginBottom: 40,
              }}>
                {[
                  { href: '/chart-kitchen', label: 'Market Kitchen', icon: '📊', desc: 'Analyze charts, earn XP' },
                  { href: '/journal', label: 'Trade Journal', icon: '📓', desc: 'Log your sessions' },
                  { href: '/missions', label: 'Missions', icon: '🎯', desc: 'Complete challenges' },
                  { href: '/passport', label: 'Passport', icon: '🛂', desc: 'Collect stamps' },
                  { href: '/academy', label: 'TCU Academy', icon: '🎓', desc: '13 lessons' },
                  { href: '/opportunity-list', label: 'Opportunity List', icon: '📋', desc: 'Get district drops' },
                ].map((nav) => (
                  <Link key={nav.href} href={nav.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--deep)',
                      border: '1px solid rgba(201,168,76,0.08)',
                      padding: '20px 16px',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}>
                      <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: 8 }}>{nav.icon}</span>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.04em',
                        color: 'var(--cream)',
                        marginBottom: 4,
                      }}>
                        {nav.label}
                      </div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        color: 'rgba(245,240,232,0.3)',
                      }}>
                        {nav.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* District Navigation — Return Paths */}
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.5)',
                  marginBottom: 16,
                }}>
                  Navigate Districts
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 2,
                }}>
                  {DISTRICT_LINKS.map((dl) => (
                    <Link key={dl.id} href={dl.href} style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: 'var(--deep)',
                        border: `1px solid ${dl.color}20`,
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        transition: 'border-color 0.2s',
                      }}>
                        <span style={{ fontSize: '1.4rem' }}>{dl.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '1rem',
                            color: dl.color,
                            letterSpacing: '0.04em',
                            lineHeight: 1,
                          }}>
                            {dl.name}
                          </div>
                          <div style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.45rem',
                            color: 'rgba(245,240,232,0.3)',
                            marginTop: 2,
                          }}>
                            {dl.desc}
                          </div>
                        </div>
                        <span style={{ color: dl.color, fontSize: '0.8rem' }}>&rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth prompt */}
              {!authenticated && (
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.2rem',
                      color: 'var(--gold)',
                      marginBottom: 4,
                    }}>
                      Sign In to Sync Progress
                    </div>
                    <p style={{
                      fontSize: '0.6rem',
                      color: 'rgba(245,240,232,0.4)',
                      fontFamily: '"Space Mono", monospace',
                      margin: 0,
                    }}>
                      Connect your account to sync XP, journal, and passport across devices.
                    </p>
                  </div>
                  <Link href="/auth" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--gold)',
                      color: '#060608',
                      padding: '12px 24px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      Sign In &rarr;
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
