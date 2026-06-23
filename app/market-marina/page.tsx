import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MarketMarinaHero from '@/components/market-marina/MarketMarinaHero'
import MarketMarinaCharacters from '@/components/market-marina/MarketMarinaCharacters'
import MarketMarinaAcademy from '@/components/market-marina/MarketMarinaAcademy'
import MarketMarinaKitchen from '@/components/market-marina/MarketMarinaKitchen'
import TCUMarketKitchenTerminal from '@/components/tcu/TCUMarketKitchenTerminal'

export const metadata = {
  title: 'Market Marina | Trading Chef Universe — Scott-King Coast',
  description: 'The trading district of the Scott-King Coast. Learn gold, forex, and financial markets through the Trading Chef Universe framework.',
}

export default function MarketMarinaPage() {
  return (
    <main>
      <Navbar />
      <MarketMarinaHero />
      <MarketMarinaCharacters />
      <MarketMarinaAcademy />

      {/* TCU Market Kitchen Terminal — integrated into SKC/Market Marina */}
      <section style={{
        background: 'var(--deep)',
        padding: '80px 48px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
              fontFamily: '"Space Mono", monospace',
            }}>
              TCU TERMINAL · EDUCATION FIRST
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: 'var(--cream)',
            }}>
              MARKET KITCHEN{' '}
              <span style={{ color: 'var(--gold)' }}>TERMINAL</span>
            </h2>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.4)',
              maxWidth: 560,
              marginTop: 12,
            }}>
              This is not a signal board. It is a training kitchen. Learn how price cooks, where liquidity sits, when the kitchen is open, and when the recipe is not ready yet. Kitchen lingo is the core teaching method — we are training the eye.
            </p>
          </div>
          <TCUMarketKitchenTerminal />
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link href="/market-marina/tcu-terminal" style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,168,76,0.2)',
              paddingBottom: 2,
            }}>
              Open Full Terminal →
            </Link>
          </div>
        </div>
      </section>

      <MarketMarinaKitchen />
      <Footer />
    </main>
  )
}
