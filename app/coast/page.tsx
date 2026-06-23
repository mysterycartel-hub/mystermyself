import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScottKingCoastMap from '@/components/map/ScottKingCoastMap'
import DistrictCard from '@/components/map/DistrictCard'
import { districts } from '@/lib/districts'

export const metadata = {
  title: 'Scott-King Coast | MysterMyself',
  description: 'Navigate the Scott-King Coast — nine districts, nine income lanes, one unified universe.',
}

export default function CoastPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--black)',
        padding: '160px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-slash" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <div className="section-label" style={{ marginBottom: 28 }}>
            <div className="section-label-line" />
            <span className="section-label-text">V2 · Scott-King Coast Interactive Map</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', marginBottom: 24 }}>
            SCOTT-KING<br />
            <span style={{ color: 'var(--gold)' }}>COAST</span>
          </h1>
          <p style={{
            fontSize: '0.82rem',
            color: 'rgba(245,240,232,0.55)',
            maxWidth: 480,
            lineHeight: 1.8,
            fontFamily: '"Space Mono", monospace',
            marginBottom: 40,
          }}>
            Nine districts. Nine income lanes. Every skill, every play, every money move — mapped to a living universe.
            Navigate the coast. Build your wealth.
          </p>

          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {['9 Districts', '9 Income Lanes', '1 Universe', 'V3 Passport Coming'].map((s) => (
              <div key={s} style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                border: '1px solid rgba(201,168,76,0.2)',
                color: 'rgba(201,168,76,0.7)',
              }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <ScottKingCoastMap />

      {/* All Districts Grid */}
      <section style={{ background: 'var(--black)' }}>
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">All Nine Districts</span>
        </div>
        <h2 className="section-title">
          CHOOSE YOUR<br />
          <span style={{ color: 'var(--gold)' }}>DISTRICT</span>
        </h2>
        <p style={{
          fontSize: '0.82rem',
          color: 'rgba(245,240,232,0.5)',
          maxWidth: 480,
          lineHeight: 1.8,
          marginBottom: 56,
          fontFamily: '"Space Mono", monospace',
        }}>
          Every district is a pillar of the ecosystem. Every pillar is a path to income.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {districts.map((d, i) => (
            <DistrictCard key={d.id} district={d} index={i} variant="grid" />
          ))}
        </div>
      </section>

      {/* Opportunity List CTA */}
      <section style={{
        background: 'var(--black)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        padding: '64px 48px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 16,
          }}>
            MysterMyself · Scott-King Coast
          </p>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            JOIN THE<br />
            <span style={{ color: 'var(--gold)' }}>OPPORTUNITY LIST</span>
          </h2>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.8,
            marginBottom: 28,
            fontFamily: '"Space Mono", monospace',
          }}>
            Get district drops, income plays, and resources from every lane — straight to your inbox. Free.
          </p>
          <a href="/opportunity-list" style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: '#060608',
            padding: '16px 40px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Enter The Coast →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
