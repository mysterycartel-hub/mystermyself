import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DistrictCard from '@/components/map/DistrictCard'
import { districts } from '@/lib/districts'

export const metadata = {
  title: 'Districts | Scott-King Coast',
  description: 'All 9 districts of the Scott-King Coast ecosystem. Pick your lane.',
}

export default function DistrictsPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.35 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 16,
            }}>
              Scott-King Coast · Nine Districts
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              CHOOSE <span style={{ color: 'var(--gold)' }}>YOUR DISTRICT</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.8,
              maxWidth: 500,
              margin: '0 auto',
            }}>
              Each district is an income lane, a learning path, and a community. Pick the one that matches where you are right now.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 2,
          }}>
            {districts.map((district, i) => (
              <DistrictCard key={district.id} district={district} index={i} variant="grid" />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
