'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LANES = [
  { value: 'interest_trading_chef',   label: 'Trading Chef / Market Marina',         emoji: '⚓' },
  { value: 'interest_route_harbor',   label: 'Courier Money / Route Harbor',          emoji: '🚢' },
  { value: 'interest_creator_tools',  label: 'Affiliate & Creator Tools / Creator Pier', emoji: '🎬' },
  { value: 'interest_fantasy',        label: 'Fantasy Island',                        emoji: '🏈' },
  { value: 'interest_ai_business',    label: 'AI Business Systems / Blueprint Bay',   emoji: '📐' },
  { value: 'interest_food',           label: 'Food Business / Breaded Or Not',        emoji: '🍗' },
  { value: 'interest_fast_income',    label: 'Jobs & Fast Income',                    emoji: '⚡' },
]

interface Props {
  source?: string
  accentColor?: string
  compact?: boolean
}

export default function OpportunitySignup({ source = 'website', accentColor = '#c9a84c', compact = false }: Props) {
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [lane, setLane]       = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          name: name.trim() || undefined,
          selectedLane: lane || undefined,
          source,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Subscription failed')
      setSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'var(--black)',
    border: `1px solid rgba(201,168,76,0.2)`,
    color: 'var(--cream)',
    fontFamily: '"Space Mono", monospace',
    fontSize: '0.75rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ maxWidth: compact ? 480 : 560, width: '100%' }}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '40px 36px',
              border: `1px solid ${accentColor}30`,
              background: `${accentColor}08`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚓</div>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              color: accentColor,
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}>
              You&apos;re In.
            </h3>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.8,
              marginBottom: 20,
            }}>
              Your first Opportunity List drop is on the way. Check your inbox and confirm your spot.
            </p>
            <a
              href="/welcome"
              style={{
                display: 'inline-block',
                background: accentColor,
                color: '#060608',
                padding: '12px 28px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Enter The Coast →
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {!compact && (
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
                  placeholder="Maurice"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = accentColor }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.2)' }}
                />
              </div>
            )}

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
                onFocus={(e) => { e.target.style.borderColor = accentColor }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.2)' }}
              />
            </div>

            {!compact && (
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
                  <option value="">Pick your main interest...</option>
                  {LANES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.emoji}  {l.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(192,57,43,0.1)',
                border: '1px solid rgba(192,57,43,0.3)',
                color: '#e74c3c',
                fontSize: '0.68rem',
                fontFamily: '"Space Mono", monospace',
                lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              style={{
                width: '100%',
                background: loading ? 'rgba(201,168,76,0.5)' : accentColor,
                color: '#060608',
                padding: '16px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Joining...' : 'Join Free →'}
            </button>

            <p style={{
              fontSize: '0.58rem',
              color: 'rgba(245,240,232,0.25)',
              fontFamily: '"Space Mono", monospace',
              lineHeight: 1.6,
              textAlign: 'center',
              marginTop: -4,
            }}>
              Free. No card. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
