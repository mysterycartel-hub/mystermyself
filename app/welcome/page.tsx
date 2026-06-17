'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ACTIONS = [
  { label: 'Continue to Scott-King Coast', href: '/',               emoji: '🗺️', desc: 'Explore all 9 districts' },
  { label: 'Enter Market Marina',           href: '/market-marina', emoji: '⚓', desc: 'Trading Chef Universe' },
  { label: 'View Products',                 href: '/products/medical-courier-guide', emoji: '🚢', desc: 'Route Harbor guide' },
  { label: 'Start Passport',                href: '/passport',      emoji: '📋', desc: 'Track your XP and progress' },
]

export default function WelcomePage() {
  const [returnPath, setReturnPath] = useState<string | null>(null)
  const [source, setSource]         = useState<string | null>(null)

  useEffect(() => {
    try {
      setReturnPath(localStorage.getItem('skc_return_path'))
      setSource(localStorage.getItem('skc_join_source'))
      localStorage.removeItem('skc_return_path')
    } catch { /* noop */ }
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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

          <div style={{ fontSize: '4rem', marginBottom: 24 }}>⚓</div>

          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 16,
          }}>
            Welcome to The Opportunity List
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.03em',
            marginBottom: 24,
          }}>
            YOU&apos;RE IN.
            <br />
            <span style={{ color: 'var(--gold)' }}>THE COAST IS OPEN.</span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.8,
            maxWidth: 500,
            margin: '0 auto 48px',
          }}>
            Check your inbox — your first Opportunity List drop is on the way. In the meantime, pick your next move.
          </p>

          {source && source !== 'website' && (
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.15em',
              color: 'rgba(201,168,76,0.5)',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}>
              Joined via {source}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 48,
          }}>
            {ACTIONS.map((action) => (
              <Link key={action.href} href={returnPath === action.href ? returnPath : action.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  padding: '28px 20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  cursor: 'pointer',
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(201,168,76,0.5)'
                    el.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(201,168,76,0.15)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{action.emoji}</div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.04em',
                    color: 'var(--cream)',
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}>
                    {action.label}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    color: 'rgba(245,240,232,0.35)',
                    letterSpacing: '0.08em',
                  }}>
                    {action.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{
            padding: '24px 32px',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.12)',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.62rem',
              color: 'rgba(245,240,232,0.4)',
              lineHeight: 1.7,
              letterSpacing: '0.06em',
            }}>
              Share your referral link to unlock bonus resources — Courier Outreach Scripts, Affiliate Research Sheets, and Opportunity Vault access coming soon.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
