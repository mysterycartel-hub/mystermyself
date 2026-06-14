import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthForm from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Passport Login | Scott-King Coast',
  description: 'Sign in to access your Scott-King Coast Passport Dashboard.',
}

export default function PassportLoginPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 540, width: '100%' }}>
          {/* Header */}
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>🗺️</div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 16,
            }}>
              Scott-King Coast · V3 · Passport System
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              ENTER THE<br />
              <span style={{ color: 'var(--gold)' }}>PASSPORT</span>
            </h1>
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.8,
              fontFamily: '"Space Mono", monospace',
            }}>
              Collect district stamps. Earn XP. Track your progress across the entire Scott-King Coast universe.
            </p>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            marginBottom: 40,
          }}>
            {[
              { icon: '🏝️', label: '9 Districts', sub: 'to explore' },
              { icon: '⭐', label: 'XP System', sub: '6 levels' },
              { icon: '🎖️', label: '11 Badges', sub: 'to earn' },
              { icon: '🎯', label: 'Missions', sub: '12 total' },
            ].map((f) => (
              <div key={f.label} style={{
                background: 'var(--deep)',
                border: '1px solid rgba(201,168,76,0.08)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                <div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    color: 'var(--gold)',
                    lineHeight: 1,
                  }}>
                    {f.label}
                  </div>
                  <div style={{
                    fontSize: '0.52rem',
                    color: 'rgba(245,240,232,0.3)',
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auth form */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.12)',
            padding: '40px',
          }}>
            <AuthForm redirectTo="/passport" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
