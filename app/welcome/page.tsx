'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SOCIAL, isRealUrl } from '@/lib/social-links'
import TCUCharacterCanonStrip from '@/components/tcu/TCUCharacterCanonStrip'

const DISTRICTS = [
  {
    name: 'Route Harbor',
    desc: 'Courier routes, medical courier, delivery income',
    href: '/coast/route-harbor',
    color: '#0EA5E9',
    emoji: '🚢',
  },
  {
    name: 'Market Marina',
    desc: 'Trading Chef, trading education, chart kitchen',
    href: '/coast/market-marina',
    color: '#0D9488',
    emoji: '⚓',
  },
  {
    name: 'Blueprint Bay',
    desc: 'AI tools, automations, business systems',
    href: '/coast/blueprint-bay',
    color: '#6366F1',
    emoji: '📐',
  },
  {
    name: 'Fantasy Island',
    desc: 'Fantasy football rankings, alerts, draft bible',
    href: '/coast/fantasy-island',
    color: '#22C55E',
    emoji: '🏈',
  },
  {
    name: 'Creator Pier',
    desc: 'YouTube, affiliate, content engine',
    href: '/coast/creator-pier',
    color: '#A855F7',
    emoji: '🎬',
  },
  {
    name: 'Flavor District',
    desc: 'Breaded Or Not, food business, catering',
    href: '/coast/flavor-district',
    color: '#F97316',
    emoji: '🍗',
  },
  {
    name: 'Library Vault',
    desc: 'Free guides, downloads, resource hub',
    href: '/coast/library-vault',
    color: '#c9a84c',
    emoji: '📚',
  },
  {
    name: 'Legacy Point',
    desc: 'Ownership, assets, structure, wealth path',
    href: '/coast/legacy-point',
    color: '#EC4899',
    emoji: '🏛️',
  },
]

const SOCIAL_BUTTONS = [
  { label: 'Subscribe on YouTube',  href: SOCIAL.youtube,   emoji: '▶' },
  { label: 'Follow on TikTok',      href: SOCIAL.tiktok,    emoji: '♪' },
  { label: 'Follow on Instagram',   href: SOCIAL.instagram, emoji: '◎' },
  { label: 'Follow on Facebook',    href: SOCIAL.facebook,  emoji: 'f' },
  { label: 'Follow on X',           href: SOCIAL.x,         emoji: 'X' },
  { label: 'Follow on Rumble',      href: SOCIAL.rumble,    emoji: '◉' },
]

export default function WelcomePage() {
  const [source, setSource] = useState<string | null>(null)
  const [lane, setLane] = useState<string | null>(null)

  useEffect(() => {
    try {
      setSource(localStorage.getItem('skc_join_source'))
      setLane(localStorage.getItem('skc_join_lane'))
      localStorage.removeItem('skc_return_path')
    } catch { /* noop */ }

    // Also check URL params
    const params = new URLSearchParams(window.location.search)
    const urlLane = params.get('lane')
    if (urlLane) setLane(urlLane)
  }, [])

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
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.55)',
              marginBottom: 20,
            }}>
              {lane ? `Your lane: ${lane.replace('interest_', '').replace(/_/g, ' ')}` : source && source !== 'website' ? `Joined via ${source}` : 'Scott-King Coast · The Opportunity List'}
            </div>

            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}>
              You&apos;re in<br />
              <span style={{ color: 'var(--gold)' }}>The Opportunity List.</span>
            </h1>

            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.85,
              maxWidth: 520,
              margin: '0 auto',
            }}>
              Your first opportunity drop is on the way. Check your email, then choose your lane so MysterMyself can send the right plays first.
            </p>
          </div>

          {/* District grid */}
          <div style={{ marginBottom: 80 }}>

            {/* TCU Welcome — when user chose trading lane */}
            {(lane === 'interest_trading_chef' || lane === 'trading' || lane === 'market-marina') && (
              <div style={{
                background: 'var(--deep)',
                border: '1px solid rgba(13,148,136,0.2)',
                padding: '32px',
                marginBottom: 32,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                }}>
                  <span style={{ fontSize: '2rem' }}>👨‍🍳</span>
                  <div>
                    <h3 style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.5rem',
                      color: '#0D9488',
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                    }}>
                      Welcome to the Trading Chef Kitchen
                    </h3>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      color: 'rgba(245,240,232,0.4)',
                    }}>
                      Market Marina · TCU
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}>
                  You chose the trading lane. Here are your first 3 steps:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {[
                    { step: '1', label: "Check today's bias", desc: 'Is gold bullish or bearish? Read the daily/weekly structure.' },
                    { step: '2', label: 'Find the liquidity', desc: 'Where are the equal highs/lows? Price sweeps them first.' },
                    { step: '3', label: 'Watch for the FVG', desc: "Mark the fair value gap (leftover container). That's your zone." },
                  ].map((item) => (
                    <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.4rem',
                        color: 'var(--gold)',
                        minWidth: 24,
                      }}>
                        {item.step}
                      </span>
                      <div>
                        <div style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1rem',
                          color: 'var(--cream)',
                          marginBottom: 2,
                        }}>
                          {item.label}
                        </div>
                        <p style={{
                          fontSize: '0.65rem',
                          color: 'rgba(245,240,232,0.4)',
                          fontFamily: '"Space Mono", monospace',
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compact character strip */}
                <TCUCharacterCanonStrip subset={['candle-kid', 'wickie', 'louie-liquidity']} />

                <Link href="/market-marina" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
                  <div style={{
                    background: '#0D9488',
                    color: '#060608',
                    padding: '14px 28px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    Go to Market Marina →
                  </div>
                </Link>
              </div>
            )}

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 24,
              textAlign: 'center',
            }}>
              Choose Your District
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 2,
            }}>
              {DISTRICTS.map((d) => (
                <Link key={d.name} href={d.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--deep)',
                    border: `1px solid ${d.color}15`,
                    padding: '24px 20px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                    className="district-welcome-card"
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{d.emoji}</div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.1rem',
                      letterSpacing: '0.04em',
                      color: d.color,
                      marginBottom: 6,
                      lineHeight: 1,
                    }}>
                      {d.name}
                    </div>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(245,240,232,0.35)',
                      lineHeight: 1.7,
                      letterSpacing: '0.04em',
                    }}>
                      {d.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <style>{`.district-welcome-card:hover { border-color: rgba(201,168,76,0.4) !important; background: rgba(201,168,76,0.03) !important; }`}</style>
          </div>

          {/* Follow The Coast section */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '40px 36px',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)', opacity: 0.5 }} />

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Stay Connected
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}>
              FOLLOW THE <span style={{ color: 'var(--gold)' }}>COAST</span>
            </h2>
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.8,
              marginBottom: 28,
              maxWidth: 520,
            }}>
              Stay connected across every lane: newsletter, videos, shorts, social updates, and live drops.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SOCIAL_BUTTONS.map((s) => {
                const real = isRealUrl(s.href)
                return real ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: 'var(--gold)',
                      padding: '12px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {s.emoji} {s.label}
                    </div>
                  </a>
                ) : (
                  <div key={s.label} style={{
                    background: 'rgba(245,240,232,0.02)',
                    border: '1px solid rgba(245,240,232,0.06)',
                    color: 'rgba(245,240,232,0.2)',
                    padding: '12px 20px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}>
                    {s.emoji} {s.label} ⚠
                  </div>
                )
              })}
              <Link href="/follow-the-coast" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--gold)',
                  color: '#060608',
                  padding: '12px 24px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  All Channels →
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
