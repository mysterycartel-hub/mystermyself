import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Library Vault | Scott-King Coast',
  description: 'Free guides, frameworks, and starter content for every income lane. No purchase required.',
}

const RESOURCES = [
  { category: 'Route Harbor · Courier',  color: '#0EA5E9', items: [
    { title: 'Medical Courier Starter Guide', desc: 'How to find pharmacy, lab, and medical courier routes without relying on apps.', href: '/products/medical-courier-guide', badge: 'Free Chapter' },
    { title: 'Courier Income Math Sheet',     desc: 'Estimate your potential earnings by route type, frequency, and vehicle.', href: '/join', badge: 'Subscriber' },
    { title: 'Route Acquisition Checklist',   desc: 'Step-by-step process for landing your first courier contract.', href: '/join', badge: 'Subscriber' },
  ]},
  { category: 'Market Marina · Trading',  color: '#c9a84c', items: [
    { title: 'Market Child Lesson',         desc: 'The foundation: what market structure actually is and why it matters.', href: '/academy/market-child', badge: 'Free' },
    { title: 'XAUUSD Session Playbook',     desc: 'London and New York session behavior for gold traders.', href: '/join', badge: 'Subscriber' },
    { title: 'Liquidity Concepts Intro',    desc: 'What liquidity sweeps are and how institutions use them.', href: '/academy/liquidity', badge: 'Free' },
  ]},
  { category: 'Creator Pier · AI Tools',  color: '#A855F7', items: [
    { title: 'Tool Vault Directory',    desc: 'The full Scott-King Coast tool directory — AI, affiliate, and creator tools.', href: '/tools', badge: 'Free' },
    { title: 'Affiliate Starter Pack',  desc: 'First 5 affiliate programs every content creator should join.', href: '/join', badge: 'Subscriber' },
    { title: 'Claude Prompt Bible',     desc: 'AI prompts for business, content, research, and opportunity analysis.', href: '/join', badge: 'Subscriber' },
  ]},
  { category: 'Fantasy Island',           color: '#22C55E', items: [
    { title: 'Draft Bible Preview',     desc: 'Introduction to the Fantasy Island ranking methodology.', href: '/join', badge: 'Subscriber' },
    { title: 'Injury Alert Framework',  desc: 'How to track and react to injury news before your opponents do.', href: '/join', badge: 'Subscriber' },
  ]},
]

export default function LibraryPage() {
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

          <div style={{ marginBottom: 64 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Scott-King Coast · Free Resource Library
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              LIBRARY <span style={{ color: 'var(--gold)' }}>VAULT</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.8,
              maxWidth: 520,
            }}>
              Free guides, frameworks, and starter content across every income lane. Subscriber-unlocked resources are marked. Join free to access them.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {RESOURCES.map((section) => (
              <div key={section.category}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${section.color}20`,
                }}>
                  <div style={{ width: 8, height: 8, background: section.color, borderRadius: '50%' }} />
                  <h2 style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: section.color,
                  }}>
                    {section.category}
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 2,
                }}>
                  {section.items.map((item) => (
                    <Link key={item.title} href={item.href} style={{ textDecoration: 'none' }}>
                      <style>{`.lib-card-${section.category.replace(/[^a-z]/gi, '')}:hover { border-color: ${section.color}35 !important; }`}</style>
                      <div className={`lib-card-${section.category.replace(/[^a-z]/gi, '')}`} style={{
                        background: 'var(--deep)',
                        border: `1px solid ${section.color}10`,
                        padding: '24px 24px',
                        height: '100%',
                        transition: 'all 0.2s',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <h3 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.04em',
                            color: 'var(--cream)',
                            lineHeight: 1.1,
                            flex: 1,
                            marginRight: 12,
                          }}>
                            {item.title}
                          </h3>
                          <span style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.46rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            background: item.badge === 'Free' ? 'rgba(34,197,94,0.1)' : 'rgba(201,168,76,0.08)',
                            color: item.badge === 'Free' ? '#22C55E' : 'rgba(201,168,76,0.6)',
                            border: `1px solid ${item.badge === 'Free' ? 'rgba(34,197,94,0.25)' : 'rgba(201,168,76,0.2)'}`,
                            flexShrink: 0,
                          }}>
                            {item.badge}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>
                          {item.desc}
                        </p>
                        <div style={{
                          marginTop: 16,
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.52rem',
                          letterSpacing: '0.12em',
                          color: section.color,
                          textTransform: 'uppercase',
                        }}>
                          {item.badge === 'Free' || item.badge === 'Free Chapter' ? 'Access →' : 'Subscribe to Unlock →'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
