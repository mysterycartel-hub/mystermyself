import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TCUMarketKitchenTerminal from '@/components/tcu/TCUMarketKitchenTerminal'
import Link from 'next/link'

export const metadata = {
  title: 'TCU Market Kitchen Terminal | Trading Chef University',
  description: 'The TCU Market Kitchen Terminal — a trading education tool that teaches market cycle, structure, and psychology through kitchen language. Not a signal board. Train first. Trade later.',
}

export default function TCUTerminalPage() {
  return (
    <main style={{ background: '#060608', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        padding: '120px 48px 60px',
        background: 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 16,
            fontFamily: '"Space Mono", monospace',
          }}>
            MARKET MARINA · TRADING CHEF UNIVERSITY
          </div>
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 16,
            color: 'var(--cream)',
          }}>
            MARKET KITCHEN<br />
            <span style={{ color: 'var(--gold)' }}>TERMINAL</span>
          </h1>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.4)',
            maxWidth: 560,
            margin: '0 auto 12px',
          }}>
            Market Kitchen is not a signal board. It is a training kitchen. You are here to learn how price cooks, where liquidity sits, when the kitchen is open, and when the recipe is not ready yet.
          </p>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.58rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.3)',
            maxWidth: 540,
            margin: '0 auto 12px',
          }}>
            TCU teaches market cycle, structure, and trading psychology through kitchen language. Leftover containers, the pass, burn points, and tables served help students slow down and read the market instead of chasing candles.
          </p>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            lineHeight: 1.8,
            color: 'rgba(201,168,76,0.45)',
            maxWidth: 480,
            margin: '0 auto 24px',
            fontStyle: 'italic',
          }}>
            The goal is not to predict every move. The goal is to sharpen your eye, understand the story of price, and wait for the recipe.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '10px 24px',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 6,
                color: '#C9A84C',
                fontSize: '0.6rem',
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Open Live Kitchen →
              </div>
            </Link>
            <Link href="/academy" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '10px 24px',
                background: 'rgba(245,240,232,0.03)',
                border: '1px solid rgba(245,240,232,0.08)',
                borderRadius: 6,
                color: 'rgba(245,240,232,0.5)',
                fontSize: '0.6rem',
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                TCU Academy
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal */}
      <section style={{ padding: '48px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <TCUMarketKitchenTerminal />
      </section>

      <Footer />
    </main>
  )
}
