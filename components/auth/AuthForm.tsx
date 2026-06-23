'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export default function AuthForm({ onSuccess, redirectTo }: AuthFormProps) {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)

    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      const supabase = getSupabaseClient()

      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
        options: {
          emailRedirectTo: redirectTo ?? `${window.location.origin}/dashboard`,
        },
      })

      if (authError) throw authError
      setSent(true)
      onSuccess?.()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication error'
      setError(msg.includes('not configured') ? 'Passport System coming soon — Supabase not yet configured.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
          >
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.5)',
                marginBottom: 10,
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  color: 'var(--cream)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.8rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(192,57,43,0.1)',
                border: '1px solid rgba(192,57,43,0.3)',
                color: '#e74c3c',
                fontSize: '0.7rem',
                fontFamily: '"Space Mono", monospace',
                marginBottom: 16,
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
                background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
                color: '#060608',
                padding: '18px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Sending Magic Link...' : 'Send Magic Link →'}
            </button>

            <p style={{
              marginTop: 16,
              fontSize: '0.6rem',
              color: 'rgba(245,240,232,0.3)',
              fontFamily: '"Space Mono", monospace',
              lineHeight: 1.6,
              textAlign: 'center',
            }}>
              No password required. We&apos;ll email you a secure login link.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '40px 32px',
              border: '1px solid rgba(201,168,76,0.2)',
              background: 'rgba(201,168,76,0.04)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>📬</div>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.8rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}>
              Check Your Inbox
            </h3>
            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.8,
              fontFamily: '"Space Mono", monospace',
            }}>
              We sent a magic link to <strong style={{ color: 'var(--gold)' }}>{email}</strong>.
              Click it to enter your Passport Dashboard.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
