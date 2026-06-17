'use client'

import { useState } from 'react'

interface SubscribeBoxProps {
  headline?: string
  sub?: string
  ctaLabel?: string
  accentColor?: string
}

const BEEHIIV_URL = process.env.NEXT_PUBLIC_BEEHIIV_SIGNUP_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com/subscribe'

export default function SubscribeBox({
  headline = 'Join The Free Hub',
  sub = 'Get district drops, free resources, and opportunity intel delivered.',
  ctaLabel = 'Subscribe Free →',
  accentColor = 'var(--gold)',
}: SubscribeBoxProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const url = `${BEEHIIV_URL}?email=${encodeURIComponent(email.trim())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{
      background: 'var(--deep)',
      border: `1px solid ${accentColor}20`,
      padding: '40px 36px',
      maxWidth: 520,
    }}>
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: accentColor,
        marginBottom: 12,
      }}>
        Free · No Card Required
      </div>
      <h3 style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '2rem',
        color: 'var(--cream)',
        letterSpacing: '0.03em',
        lineHeight: 1.05,
        marginBottom: 10,
      }}>
        {headline}
      </h3>
      <p style={{
        fontSize: '0.72rem',
        color: 'rgba(245,240,232,0.5)',
        lineHeight: 1.75,
        marginBottom: 24,
      }}>
        {sub}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: '1 1 220px',
            padding: '14px 18px',
            background: 'var(--black)',
            border: `1px solid ${accentColor}25`,
            borderRight: 'none',
            color: 'var(--cream)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.72rem',
            outline: 'none',
            minWidth: 0,
          }}
          onFocus={(e) => { e.target.style.borderColor = accentColor }}
          onBlur={(e) => { e.target.style.borderColor = `${accentColor}25` }}
        />
        <button
          type="submit"
          style={{
            padding: '14px 24px',
            background: accentColor,
            color: '#060608',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {ctaLabel}
        </button>
      </form>
    </div>
  )
}
