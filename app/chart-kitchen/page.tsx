import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Chart Kitchen | Market Marina',
  description: 'Upload your charts, get structure analysis, and practice reading price action.',
}

const TOOLS = [
  { name: 'Chart Upload',       desc: 'Drop a screenshot for structure analysis.',          status: 'active',  emoji: '📊' },
  { name: 'Watchlist',          desc: 'Track your pairs and setups across sessions.',        status: 'active',  emoji: '👁️' },
  { name: 'AI Coach',           desc: 'Ask the Chef about your chart before you trade.',     status: 'active',  emoji: '🤖' },
  { name: 'Session Playbook',   desc: 'London, New York, and overlap session breakdowns.',   status: 'soon',    emoji: '📋' },
  { name: 'Trade Journal',      desc: 'Log trades, outcomes, and lessons in one place.',     status: 'link',    href: '/journal', emoji: '📓' },
  { name: 'Bias Board',         desc: 'Daily directional bias before the session opens.',    status: 'soon',    emoji: '🧭' },
]

export default function ChartKitchenPage() {
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

          <div style={{ marginBottom: 48 }}>
            <Link href="/market-marina" style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              color: 'rgba(201,168,76,0.5)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 20,
            }}>
              ← Market Marina
            </Link>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Market Marina · Analysis Tools
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}>
              CHART <span style={{ color: 'var(--gold)' }}>KITCHEN</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.75,
              maxWidth: 500,
            }}>
              Upload your charts. Read the structure. Cook the setup. This is where analysis becomes action.
            </p>
          </div>

          {/* Upload panel */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.12)',
            padding: '48px',
            marginBottom: 32,
            textAlign: 'center',
            position: 'relative',
          }}>
            <style>{`.chart-upload-zone:hover { border-color: rgba(201,168,76,0.5) !important; }`}</style>
            <div className="chart-upload-zone" style={{
              width: '100%',
              maxWidth: 600,
              margin: '0 auto',
              border: '2px dashed rgba(201,168,76,0.2)',
              padding: '60px 40px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📊</div>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.3rem',
                letterSpacing: '0.05em',
                color: 'var(--cream)',
                marginBottom: 8,
              }}>
                Drop Your Chart Here
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem',
                color: 'rgba(245,240,232,0.3)',
                letterSpacing: '0.08em',
                marginBottom: 20,
              }}>
                PNG · JPG · WebP — TradingView screenshots work best
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: 'var(--gold)',
                padding: '12px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Choose File
              </div>
            </div>
          </div>

          {/* Tools grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 2,
          }}>
            {TOOLS.map((tool) => (
              <div key={tool.name} style={{
                background: 'var(--deep)',
                border: '1px solid rgba(201,168,76,0.06)',
                padding: '24px 24px',
                opacity: tool.status === 'soon' ? 0.5 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: '1.4rem' }}>{tool.emoji}</span>
                  {tool.status === 'soon' && (
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.46rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      background: 'rgba(201,168,76,0.08)',
                      color: 'rgba(201,168,76,0.4)',
                      border: '1px solid rgba(201,168,76,0.15)',
                    }}>
                      Soon
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.04em',
                  color: 'var(--cream)',
                  marginBottom: 6,
                }}>
                  {tool.status === 'link' && tool.href
                    ? <Link href={tool.href} style={{ color: 'var(--gold)', textDecoration: 'none' }}>{tool.name} →</Link>
                    : tool.name}
                </div>
                <p style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', fontSize: '0.62rem', fontFamily: '"Space Mono", monospace', color: 'rgba(245,240,232,0.3)', lineHeight: 1.6 }}>
            ⚠️ Chart Kitchen is for educational analysis and simulation only. This is not financial advice. Do not use this as a basis for live trading decisions without proper risk management.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
