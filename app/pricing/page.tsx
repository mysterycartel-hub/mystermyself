import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing | Scott-King Coast',
  description: 'Free subscriber tier, district passes, and the Opportunity Vault. Build access your way.',
}

const TIERS = [
  {
    name: 'Free Subscriber',
    price: '$0',
    period: 'Always',
    color: '#22C55E',
    badge: null,
    cta: 'Join Free Now',
    href: '/opportunity-list',
    external: false,
    features: [
      'The Opportunity List — weekly drops',
      'All 7 income lane categories',
      'District intro content',
      'Library Vault — free resources',
      'Coast Passport (basic)',
      'Mission access — beginner tier',
      'Referral rewards program',
    ],
    note: null,
  },
  {
    name: 'District Pass',
    price: '$7',
    period: '/ month · or $49/yr',
    color: '#c9a84c',
    badge: 'MOST POPULAR',
    cta: 'Coming Soon',
    href: '/opportunity-list',
    external: false,
    features: [
      'Everything in Free Subscriber',
      'Full Opportunity List deep dives',
      'District-specific research drops',
      'Courier route leads and scripts',
      'Affiliate research sheets',
      'Trading execution checklists',
      'Fantasy premium alerts',
      'Mission access — intermediate tier',
      'Priority Beehiiv drops',
    ],
    note: 'Launching soon. Subscribe free now to get early access.',
  },
  {
    name: 'Opportunity Vault',
    price: '$29',
    period: '/ month · or $197/yr',
    color: '#6366F1',
    badge: 'FULL ACCESS',
    cta: 'Join Waitlist',
    href: '/opportunity-list',
    external: false,
    features: [
      'Everything in District Pass',
      'Full execution playbooks by lane',
      'AI automation templates',
      'Weekly live opportunity calls (future)',
      'Private community access',
      'Coast Passport — full progression',
      'Mission access — advanced tier',
      'Asset download library',
      'Personal referral dashboard',
      'First access to new districts',
    ],
    note: 'Vault opens when enough founding members are aboard. Subscriber waitlist gets first pricing.',
  },
]

const FAQ = [
  { q: 'Do I need to pay to use the site?', a: 'No. The free subscriber tier gives you access to all the core content, weekly drops, and district intro material.' },
  { q: 'What does the Opportunity Vault include?', a: 'Full opportunity breakdowns, route leads, scripts, templates, execution checklists, and research packs across all 7 income lanes.' },
  { q: 'When do paid tiers launch?', a: 'Soon. Subscribe free now and you\'ll be first in line when they open with founding member pricing.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Monthly plans cancel at the end of the billing cycle. No contracts.' },
]

export default function PricingPage() {
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

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Scott-King Coast · Access Tiers
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              BUILD ACCESS <span style={{ color: 'var(--gold)' }}>YOUR WAY</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.8,
              maxWidth: 480,
              margin: '0 auto',
            }}>
              Start free. Upgrade when the drops hit different. No pressure — the value compounds whether you pay or not.
            </p>
          </div>

          {/* Tiers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 2,
            marginBottom: 80,
          }}>
            {TIERS.map((tier) => (
              <div key={tier.name} style={{
                background: 'var(--deep)',
                border: `1px solid ${tier.color}20`,
                padding: '40px 32px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: tier.color,
                  opacity: 0.7,
                }} />

                {tier.badge && (
                  <span style={{
                    position: 'absolute',
                    top: 16, right: 16,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.46rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    background: `${tier.color}15`,
                    color: tier.color,
                    border: `1px solid ${tier.color}30`,
                  }}>
                    {tier.badge}
                  </span>
                )}

                <div style={{ marginBottom: 24 }}>
                  <h2 style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: tier.color,
                    marginBottom: 16,
                  }}>
                    {tier.name}
                  </h2>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '3rem',
                    color: 'var(--cream)',
                    lineHeight: 1,
                    letterSpacing: '0.02em',
                    marginBottom: 4,
                  }}>
                    {tier.price}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.52rem',
                    color: 'rgba(245,240,232,0.3)',
                    letterSpacing: '0.08em',
                  }}>
                    {tier.period}
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: 28 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <div style={{ width: 4, height: 4, background: tier.color, borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {tier.note && (
                  <div style={{
                    padding: '10px 14px',
                    background: `${tier.color}06`,
                    border: `1px solid ${tier.color}15`,
                    marginBottom: 20,
                    fontSize: '0.58rem',
                    color: 'rgba(245,240,232,0.3)',
                    fontFamily: '"Space Mono", monospace',
                    lineHeight: 1.5,
                  }}>
                    {tier.note}
                  </div>
                )}

                <Link href={tier.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    width: '100%',
                    background: tier.cta === 'Join Free Now' ? tier.color : 'transparent',
                    border: `1px solid ${tier.color}40`,
                    color: tier.cta === 'Join Free Now' ? '#060608' : tier.color,
                    padding: '14px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}>
                    {tier.cta} →
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              letterSpacing: '0.04em',
              color: 'var(--cream)',
              textAlign: 'center',
              marginBottom: 32,
            }}>
              Common Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {FAQ.map((faq) => (
                <div key={faq.q} style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '24px 28px',
                }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.04em',
                    color: 'var(--cream)',
                    marginBottom: 8,
                  }}>
                    {faq.q}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.75 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
