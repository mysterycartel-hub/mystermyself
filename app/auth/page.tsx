import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthForm from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Sign In | Scott-King Coast Passport',
  description: 'Sign in to access your Passport Dashboard, XP, district progress, and missions.',
}

const SOCIAL_METHODS = [
  { label: 'Google',  emoji: '🔵', available: false },
  { label: 'Yahoo',   emoji: '🟣', available: false },
  { label: 'Apple',   emoji: '⚫', available: false },
]

export default function AuthPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 480, margin: '0 auto', width: '100%' }}>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>📋</div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Coast Passport System
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}>
              SIGN <span style={{ color: 'var(--gold)' }}>IN</span>
            </h1>
            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.4)',
              lineHeight: 1.7,
              fontFamily: '"Space Mono", monospace',
            }}>
              Enter your email and we&apos;ll send a magic link. No password required.
            </p>
          </div>

          <AuthForm redirectTo="/passport" />

          {/* Social methods — future */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(245,240,232,0.06)' }} />
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.2)',
                textTransform: 'uppercase',
              }}>
                Coming Soon
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(245,240,232,0.06)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SOCIAL_METHODS.map((method) => (
                <div
                  key={method.label}
                  style={{
                    padding: '14px 20px',
                    background: 'var(--deep)',
                    border: '1px solid rgba(245,240,232,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    opacity: 0.4,
                    cursor: 'not-allowed',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{method.emoji}</span>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(245,240,232,0.4)',
                  }}>
                    Continue with {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: 32,
            padding: '16px 20px',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.1)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.56rem',
              color: 'rgba(245,240,232,0.25)',
              lineHeight: 1.6,
            }}>
              Don&apos;t have an account? <a href="/opportunity-list" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}>Join The Opportunity List free →</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
