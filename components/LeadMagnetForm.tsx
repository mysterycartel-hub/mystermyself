'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  division?: string
  heading?: string
  subheading?: string
}

const interests = [
  { value: '',         label: 'Select your interest...' },
  { value: 'trading',  label: '📈 Trading & Gold Markets' },
  { value: 'courier',  label: '🚚 Courier Income Lab' },
  { value: 'food',     label: '🍗 Breaded Or Not?! / Food Biz' },
  { value: 'playbooks',label: '📚 Money Move Playbooks' },
  { value: 'fantasy',  label: '🏈 Fantasy Draft Bible' },
  { value: 'ai',       label: '🤖 AI Operator Lab' },
  { value: 'all',      label: '🔥 All of the Above' },
]

export default function LeadMagnetForm({
  division   = 'website',
  heading    = 'YOUR FIRST\nMONEY MOVE',
  subheading = 'Drop your info and get the free starter guide — skills, income ideas, and the roadmap to your next play.',
}: Props) {
  const [form, setForm]     = useState({ name: '', email: '', interest: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError]   = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.interest) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, division }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <section id="lead" style={{ background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
      {/* Gold glow */}
      <div style={{
        position: 'absolute',
        top: -200, right: -200,
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{ fontSize: '3rem', marginBottom: 24 }}>📖</div>

        {/* Heading */}
        <h2 className="section-title" style={{ whiteSpace: 'pre-line', marginBottom: 16 }}>
          {heading.split('\n').map((line, i) => (
            <span key={i}>
              {i === 1 ? <span style={{ color: 'var(--gold)' }}>{line}</span> : line}
              <br />
            </span>
          ))}
        </h2>

        <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', marginBottom: 48 }}>
          {subheading}
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '48px 32px', border: '1px solid var(--gold)', background: 'rgba(201,168,76,0.05)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                YOU'RE IN.
              </p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.55)', marginTop: 12 }}>
                Check your inbox — your first money move guide is on the way.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  padding: '18px 24px',
                  fontSize: '0.75rem',
                  borderBottom: 'none',
                  borderRadius: 0,
                }}
              />
              {/* Email */}
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  padding: '18px 24px',
                  fontSize: '0.75rem',
                  borderBottom: 'none',
                  borderRadius: 0,
                }}
              />
              {/* Interest */}
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                style={{
                  padding: '18px 24px',
                  fontSize: '0.75rem',
                  appearance: 'none',
                  background: 'var(--deep)',
                  borderRadius: 0,
                  cursor: 'none',
                }}
              >
                {interests.map((o) => (
                  <option key={o.value} value={o.value} style={{ background: '#0d0d10' }}>
                    {o.label}
                  </option>
                ))}
              </select>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ fontSize: '0.65rem', color: 'var(--red-bright)', padding: '8px 0', textAlign: 'left' }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ justifyContent: 'center', marginTop: 2, opacity: status === 'loading' ? 0.7 : 1 }}
              >
                <span>{status === 'loading' ? 'Sending...' : 'Send Me The Guide →'}</span>
              </button>

              <p style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(245,240,232,0.3)', marginTop: 16 }}>
                No spam. Unsubscribe anytime. Your info stays private.
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Value props */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
          {[['⚡', 'Instant Delivery'], ['🔒', '100% Free'], ['🎯', 'No Upsells']].map(([icon, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.3rem', marginBottom: 8, display: 'block' }}>{icon}</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
