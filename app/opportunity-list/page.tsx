import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpportunitySignup from '@/components/OpportunitySignup'

export const metadata = {
  title: 'The Opportunity List | MysterMyself',
  description: 'Weekly drops for money moves, creator tools, courier routes, trading education, AI systems, fantasy research, and skill-to-income plays.',
}

const WHAT_YOU_GET = [
  { emoji: '⚓', label: 'Trading drops',       desc: 'Market structure, XAUUSD setups, and beginner lessons from Market Marina.' },
  { emoji: '🚢', label: 'Courier routes',       desc: 'Medical, pharmacy, and lab courier opportunities from Route Harbor.' },
  { emoji: '🎬', label: 'Creator tools',        desc: 'AI workflows, affiliate picks, and content systems from Creator Pier.' },
  { emoji: '🏈', label: 'Fantasy intel',        desc: 'Rankings, injury alerts, and draft plays from Fantasy Island.' },
  { emoji: '📐', label: 'AI systems',           desc: 'Automation, agents, and business OS drops from Blueprint Bay.' },
  { emoji: '🍗', label: 'Food biz plays',       desc: 'Pop-up systems, catering frameworks, and food brand builds.' },
  { emoji: '⚡', label: 'Fast income leads',    desc: 'Job boards, gig opportunities, and quick-start income intel.' },
]

const FREE_VS_VAULT = [
  { tier: 'Free · Opportunity List', items: ['Weekly drops for all 7 lanes', 'Tools, links, and public breakdowns', 'District entry guides', 'Referral unlock rewards'], color: '#c9a84c' },
  { tier: 'Coming · Opportunity Vault', items: ['Full opportunity breakdowns', 'Courier route leads and scripts', 'Affiliate research sheets', 'Trading execution checklists', 'Fantasy premium alerts', 'AI automation templates'], color: '#6366F1', badge: 'Soon' },
]

export default function OpportunityListPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '90vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="hero-grid" style={{ opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

            <div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
                marginBottom: 20,
              }}>
                Free · Scott-King Coast
              </div>
              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                marginBottom: 24,
              }}>
                THE<br />
                <span style={{ color: 'var(--gold)' }}>OPPORTUNITY</span><br />
                LIST
              </h1>
              <p style={{
                fontSize: '0.85rem',
                color: 'rgba(245,240,232,0.6)',
                lineHeight: 1.8,
                maxWidth: 460,
                marginBottom: 32,
              }}>
                Weekly drops for money moves, creator tools, courier routes, trading education, AI systems, fantasy research, and skill-to-income plays. Free. Always.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                {['7 Income Lanes', 'Weekly Drops', 'No Card Required'].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    background: 'rgba(201,168,76,0.08)',
                    color: 'rgba(201,168,76,0.6)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <OpportunitySignup source="opportunity_list_page" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section style={{ background: 'var(--deep)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              What&apos;s Inside
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              letterSpacing: '0.03em',
              color: 'var(--cream)',
            }}>
              Seven Lanes. One Free Drop.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {WHAT_YOU_GET.map((item, i) => (
              <div key={i} style={{
                background: 'var(--black)',
                padding: '28px 24px',
                border: '1px solid rgba(201,168,76,0.06)',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{item.emoji}</div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  letterSpacing: '0.04em',
                  color: 'var(--gold)',
                  marginBottom: 8,
                }}>
                  {item.label}
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.75 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Vault */}
      <section style={{ background: 'var(--black)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '0.03em',
              color: 'var(--cream)',
            }}>
              Free Now. <span style={{ color: 'var(--gold)' }}>Vault Coming.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {FREE_VS_VAULT.map((tier) => (
              <div key={tier.tier} style={{
                background: 'var(--deep)',
                border: `1px solid ${tier.color}25`,
                padding: '36px 32px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: tier.color,
                  opacity: 0.6,
                }} />
                {tier.badge && (
                  <span style={{
                    position: 'absolute',
                    top: 16, right: 16,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.48rem',
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
                <h3 style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tier.color,
                  marginBottom: 24,
                }}>
                  {tier.tier}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tier.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 4, height: 4, background: tier.color, borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section style={{ background: 'var(--deep)', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '0.03em',
            color: 'var(--cream)',
            marginBottom: 16,
          }}>
            Built for <span style={{ color: 'var(--gold)' }}>Real Moves</span>
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(245,240,232,0.55)',
            lineHeight: 1.85,
            marginBottom: 36,
          }}>
            The Opportunity List is not a hype newsletter. It&apos;s intel. Every drop covers one or more income lanes from the Scott-King Coast ecosystem. Actionable, specific, and useful whether you&apos;re starting from zero or stacking skills on top of existing income.
          </p>
          <div style={{ display: 'inline-block' }}>
            <a href="/join" style={{
              display: 'inline-block',
              background: 'var(--gold)',
              color: '#060608',
              padding: '16px 36px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              Join Free Now →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
