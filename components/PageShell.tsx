import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface PageShellProps {
  children: React.ReactNode
  gridOpacity?: number
}

export default function PageShell({ children, gridOpacity = 0.35 }: PageShellProps) {
  return (
    <main>
      <Navbar />
      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: gridOpacity }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          {children}
        </div>
      </section>
      <Footer />
    </main>
  )
}
