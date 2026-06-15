'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PassportDashboard from '@/components/passport/PassportDashboard'
import DailyQuestBoard from '@/components/quests/DailyQuestBoard'
import Link from 'next/link'

interface Session {
  userId: string
  accessToken: string
  email: string
}

export default function PassportPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        const supabase = getSupabaseClient()
        const { data: { session: s } } = await supabase.auth.getSession()

        if (!mounted) return

        if (s?.user) {
          setSession({
            userId: s.user.id,
            accessToken: s.access_token,
            email: s.user.email ?? '',
          })
        }

        // Listen for auth changes (magic link callback)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s2) => {
          if (!mounted) return
          if (s2?.user) {
            setSession({
              userId: s2.user.id,
              accessToken: s2.access_token,
              email: s2.user.email ?? '',
            })
          } else {
            setSession(null)
          }
        })

        return () => subscription.unsubscribe()
      } catch {
        // Supabase not configured — stay in unauthenticated state
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()
    return () => { mounted = false }
  }, [])

  const handleSignOut = async () => {
    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setSession(null)
    } catch { /* noop */ }
  }

  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.4 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>
                <div className="section-label-line" />
                <span className="section-label-text">V3 · Passport System</span>
              </div>
              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
              }}>
                COAST<br />
                <span style={{ color: 'var(--gold)' }}>PASSPORT</span>
              </h1>
            </div>

            {!loading && session && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.58rem',
                  color: 'rgba(245,240,232,0.35)',
                  letterSpacing: '0.1em',
                }}>
                  {session.email}
                </span>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: 'rgba(201,168,76,0.6)',
                    padding: '8px 16px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Daily Quest Board — always visible, no auth required */}
          <div style={{
            background: 'rgba(201,168,76,0.03)',
            border: '1px solid rgba(201,168,76,0.08)',
            padding: '32px 40px',
            marginBottom: 2,
          }}>
            <DailyQuestBoard />
          </div>

          {/* Content */}
          {loading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 320,
              flexDirection: 'column',
              gap: 20,
            }}>
              <div style={{ fontSize: '2.5rem' }}>⚓</div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                Docking at the coast...
              </div>
            </div>
          ) : session ? (
            <PassportDashboard userId={session.userId} accessToken={session.accessToken} />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              gap: 32,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '4rem' }}>🗺️</div>
              <div>
                <h2 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.5rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.05em',
                  marginBottom: 12,
                }}>
                  Your Passport Awaits
                </h2>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(245,240,232,0.45)',
                  lineHeight: 1.8,
                  maxWidth: 400,
                  fontFamily: '"Space Mono", monospace',
                }}>
                  Sign in to access your Passport Dashboard. Collect district stamps, earn XP, and track your progress across the Scott-King Coast.
                </p>
              </div>
              <Link href="/passport/login" style={{ textDecoration: 'none' }}>
                <div className="btn-primary">
                  <span>Get Your Passport →</span>
                </div>
              </Link>
              <Link href="/coast" style={{ textDecoration: 'none' }}>
                <div className="btn-secondary">
                  Explore the Coast First
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
