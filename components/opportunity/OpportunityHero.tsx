'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { captureSubscriber } from '@/lib/capture'

const LANES = [
  { value: 'interest_route_harbor',   label: '🚢  Route Harbor — Courier & Logistics' },
  { value: 'interest_trading_chef',   label: '⚓  Market Marina — Gold Trading & TCU' },
  { value: 'interest_food',           label: '🍗  Flavor District — Breaded Or Not?!' },
  { value: 'interest_ai_business',    label: '📐  Blueprint Bay — Business Structure' },
  { value: 'interest_creator_tools',  label: '🎬  Creator Pier — Content & Digital Products' },
  { value: 'interest_legacy',         label: '🏛️  Legacy Point — Wealth & Ownership' },
]

export default function OpportunityHero() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lane, setLane] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)

    const result = await captureSubscriber({
      email,
      name: name.trim() || undefined,
      selectedLane: lane || undefined,
      source: 'opportunity_list_page',
    })

    if (!result.ok && !result.fallback) {
      setError(result.reason || 'Something went wrong. Try again.')
      setLoading(false)
      return
    }

    try {
      localStorage.setItem('skc_join_source', 'opportunity_list_page')
      if (lane) localStorage.setItem('skc_join_lane', lane)
    } catch { /* noop */ }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => router.push(`/welcome${lane ? `?lane=${lane}` : ''}`), 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(6,6,8,0.8)',
    border: '1px solid rgba(201,168,76,0.25)',
    color: 'var(--cream)',
    fontFamily: '"Space Mono", monospace',
    fontSize: '0.75rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  }

  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--black)',
      padding: '120px 48px 80px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div className="hero-grid" style={{ opacity: 0.35 }} />

      {/* Gold glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        top: '40%', left: '55%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

          {/* Left — Trading Chef character + copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Trading Chef SVG placeholder */}
            {/* TODO: replace with actual Trading Chef asset */}
            <div style={{
              width: 180, height: 220,
              background: 'rgba(201,168,76,0.05)',
              border: '2px solid rgba(201,168,76,0.3)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
              <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                {/* Chef hat */}
                <ellipse cx="40" cy="25" rx="28" ry="20" fill="rgba(201,168,76,0.3)" />
                <rect x="22" y="22" width="36" height="12" fill="rgba(201,168,76,0.4)" rx="2" />
                {/* Face */}
                <circle cx="40" cy="50" r="16" fill="rgba(245,240,232,0.15)" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" />
                {/* Gold chain */}
                <ellipse cx="40" cy="72" rx="14" ry="6" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" />
                {/* Body */}
                <rect x="28" y="66" width="24" height="30" fill="rgba(245,240,232,0.08)" rx="4" />
              </svg>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
                marginTop: 8,
              }}>
                The Trading Chef
              </span>
            </div>

            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.04)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.7)',
              marginBottom: 24,
            }}>
              Scott-King Coast Entry Gate
            </div>

            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.5rem, 7vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              marginBottom: 20,
            }}>
              THE<br />
              <span style={{ color: 'var(--gold)' }}>OPPORTUNITY</span><br />
              LIST
            </h1>

            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.06em',
              color: 'rgba(201,168,76,0.8)',
              marginBottom: 12,
              lineHeight: 1.6,
            }}>
              Your entry pass into Scott-King Coast.
            </p>

            <p style={{
              fontSize: '0.82rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.9,
              maxWidth: 480,
            }}>
              Get courier drops, trading lessons, food business resources, content systems, and ownership plays delivered to your inbox.
            </p>
          </motion.div>

          {/* Right — form with gold animated border */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              position: 'relative',
              padding: 2,
              background: 'linear-gradient(135deg, rgba(201,168,76,0.6), rgba(201,168,76,0.1), rgba(201,168,76,0.6))',
              backgroundSize: '200% 200%',
              animation: 'goldShimmer 4s ease-in-out infinite',
            }}>
              <div style={{
                background: 'var(--deep)',
                padding: '40px 32px',
              }}>
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                    <p style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2rem',
                      color: 'var(--gold)',
                      letterSpacing: '0.05em',
                    }}>
                      YOU&apos;RE IN.
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.55)', marginTop: 12 }}>
                      Welcome to the Coast. Redirecting...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.52rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.4)',
                        marginBottom: 8,
                      }}>
                        First Name (optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder=""
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = '#c9a84c' }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.52rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.4)',
                        marginBottom: 8,
                      }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = '#c9a84c' }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.52rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.4)',
                        marginBottom: 8,
                      }}>
                        Choose Your Lane (optional)
                      </label>
                      <select
                        value={lane}
                        onChange={(e) => setLane(e.target.value)}
                        style={{
                          ...inputStyle,
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                          paddingRight: '40px',
                        }}
                      >
                        <option value="">Pick your district...</option>
                        {LANES.map((l) => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <div style={{
                        padding: '12px 16px',
                        background: 'rgba(192,57,43,0.1)',
                        border: '1px solid rgba(192,57,43,0.3)',
                        color: '#e74c3c',
                        fontSize: '0.68rem',
                        fontFamily: '"Space Mono", monospace',
                      }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !email.trim()}
                      style={{
                        width: '100%',
                        background: loading ? 'rgba(201,168,76,0.5)' : '#c9a84c',
                        color: '#060608',
                        padding: '18px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? 'Entering...' : 'Enter The Coast →'}
                    </button>

                    <p style={{
                      fontSize: '0.58rem',
                      color: 'rgba(245,240,232,0.25)',
                      fontFamily: '"Space Mono", monospace',
                      textAlign: 'center',
                    }}>
                      Free. No card. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold shimmer animation */}
      <style>{`
        @keyframes goldShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
