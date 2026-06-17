'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StatCard from '@/components/StatCard'

const DISTRICTS = [
  { name: 'Market Marina',   href: '/market-marina',  emoji: '⚓', color: '#c9a84c', tag: 'Trading',    locked: false },
  { name: 'Route Harbor',    href: '/route-harbor',   emoji: '🚢', color: '#0EA5E9', tag: 'Logistics',  locked: false },
  { name: 'Fantasy Island',  href: '/fantasy',        emoji: '🏈', color: '#22C55E', tag: 'Fantasy',    locked: false },
  { name: 'Creator Pier',    href: '/creator-pier',   emoji: '🎬', color: '#A855F7', tag: 'AI Creator', locked: false },
  { name: 'Flavor District', href: '/flavor-district',emoji: '🍗', color: '#c0392b', tag: 'Food Biz',   locked: false },
  { name: 'Blueprint Bay',   href: '/blueprint-bay',  emoji: '📐', color: '#22C55E', tag: 'Systems',    locked: true  },
  { name: 'Legacy Point',    href: '/legacy-point',   emoji: '🎓', color: '#c9a84c', tag: 'Academy',    locked: true  },
  { name: 'Library Vault',   href: '/library',        emoji: '📖', color: '#94A3B8', tag: 'Free',       locked: false },
  { name: 'Founder Island',  href: '/founder-island', emoji: '🏝️', color: '#c9a84c', tag: 'Origin',     locked: false },
]

const STATS = [
  { label: 'XP Earned',      value: '0',   sub: 'Start exploring to earn XP',     icon: '⚡', color: '#c9a84c' },
  { label: 'Districts Visited', value: '0/9', sub: 'Enter a district to progress', icon: '🗺️', color: '#0EA5E9' },
  { label: 'Current Rank',   value: 'NEW', sub: 'Dockworker · Level 0',            icon: '🏅', color: '#22C55E' },
  { label: 'Streak',         value: '0',   sub: 'Days active',                     icon: '🔥', color: '#c0392b' },
]

export default function DashboardPage() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null)

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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

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
              Scott-King Coast · Member Dashboard
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}>
              YOUR <span style={{ color: 'var(--gold)' }}>DASHBOARD</span>
            </h1>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2,
            marginBottom: 48,
          }}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>

          {/* Passport CTA */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.12)',
            padding: '28px 32px',
            marginBottom: 48,
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
                📋 Get Your Passport
              </div>
              <p style={{
                fontSize: '0.68rem',
                color: 'rgba(245,240,232,0.45)',
                fontFamily: '"Space Mono", monospace',
              }}>
                Sign in to track XP, earn district stamps, and unlock missions.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/passport/login" style={{ textDecoration: 'none' }}>
                <div className="btn-primary"><span>Sign In →</span></div>
              </Link>
              <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
                <div className="btn-secondary">Join Free First</div>
              </Link>
            </div>
          </div>

          {/* District Access */}
          <div style={{ marginBottom: 12 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
              marginBottom: 20,
            }}>
              District Access
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 2,
            }}>
              {DISTRICTS.map((d) => (
                <div
                  key={d.name}
                  onClick={() => !d.locked && setActiveDistrict(activeDistrict === d.name ? null : d.name)}
                  style={{
                    background: activeDistrict === d.name ? `${d.color}08` : 'var(--deep)',
                    border: `1px solid ${activeDistrict === d.name ? d.color + '35' : 'rgba(201,168,76,0.06)'}`,
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: d.locked ? 'default' : 'pointer',
                    opacity: d.locked ? 0.4 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{d.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1rem',
                      letterSpacing: '0.04em',
                      color: activeDistrict === d.name ? d.color : 'var(--cream)',
                      lineHeight: 1,
                      marginBottom: 3,
                    }}>
                      {d.name}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(245,240,232,0.3)',
                    }}>
                      {d.tag}
                    </div>
                  </div>
                  {d.locked ? (
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>🔒</span>
                  ) : (
                    <Link href={d.href} style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: d.color,
                      textDecoration: 'none',
                      flexShrink: 0,
                    }}>
                      Enter →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
