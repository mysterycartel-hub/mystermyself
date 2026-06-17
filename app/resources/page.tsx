import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Affiliate Resource Vault | Creator Pier',
  description: 'Curated affiliate programs, creator tools, and income resources from the Scott-King Coast ecosystem.',
}

const VAULT_SECTIONS = [
  {
    category: 'AI & Automation Tools',
    color: '#A855F7',
    emoji: '🤖',
    items: [
      { name: 'Claude by Anthropic',    desc: 'Best-in-class AI for business, content, and research.',              tag: 'Affiliate Available' },
      { name: 'ChatGPT / OpenAI',       desc: 'Industry standard AI for content and code generation.',              tag: 'Direct' },
      { name: 'Notion AI',              desc: 'Document workspace with AI built in.',                               tag: 'Affiliate Available' },
      { name: 'Beehiiv',                desc: 'Newsletter platform — what The Opportunity List runs on.',           tag: 'Partner' },
    ],
  },
  {
    category: 'Creator & Content Income',
    color: '#c9a84c',
    emoji: '🎬',
    items: [
      { name: 'Amazon Associates',  desc: 'The largest affiliate program. Works for almost any niche.',             tag: 'Affiliate' },
      { name: 'Impact.com',         desc: 'Premium affiliate network — high-ticket brands and SaaS.',              tag: 'Affiliate' },
      { name: 'ConvertKit',         desc: 'Email for creators — affiliate program pays recurring commissions.',     tag: 'Affiliate' },
      { name: 'Canva Pro',          desc: 'Design tool with a strong affiliate program and creator use case.',      tag: 'Affiliate' },
    ],
  },
  {
    category: 'Logistics & Courier Resources',
    color: '#0EA5E9',
    emoji: '🚢',
    items: [
      { name: 'Courier Exchange',      desc: 'Find courier loads and contract delivery work.',                      tag: 'Subscriber' },
      { name: 'Roadie (via UPS)',       desc: 'Large item delivery marketplace — pays more than gig apps.',         tag: 'Direct' },
      { name: 'GoShip',                desc: 'Freight platform for courier business owners with vehicles.',         tag: 'Direct' },
      { name: 'Medical Courier Guide',  desc: 'The Route Harbor flagship — how to break into medical delivery.',    tag: 'Free Chapter', href: '/products/medical-courier-guide' },
    ],
  },
  {
    category: 'Trading Education',
    color: '#c9a84c',
    emoji: '⚓',
    items: [
      { name: 'TradingView',            desc: 'Best charting platform. Free and Pro versions available.',           tag: 'Affiliate' },
      { name: 'Funded Trader Programs', desc: 'Get funded after passing evaluation — reduces personal risk.',       tag: 'Research' },
      { name: 'TCU Academy',            desc: 'Trading Chef University — the SKC gold trading curriculum.',        tag: 'Internal', href: '/trading-chef-university' },
    ],
  },
  {
    category: 'Financial & Business Tools',
    color: '#6366F1',
    emoji: '🏛️',
    items: [
      { name: 'Stripe',         desc: 'Accept payments. Powers the future paid tiers of MysterMyself.',   tag: 'Partner' },
      { name: 'Wave Accounting', desc: 'Free accounting for freelancers and small businesses.',             tag: 'Affiliate' },
      { name: 'Lili Bank',       desc: 'Business banking for freelancers and gig workers.',                 tag: 'Affiliate' },
    ],
  },
]

export default function ResourcesPage() {
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
              Creator Pier · Affiliate Vault
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              RESOURCE <span style={{ color: 'var(--gold)' }}>VAULT</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: 16,
            }}>
              Curated tools, affiliate programs, and income resources used inside the Scott-King Coast ecosystem. Some links are affiliate links — at no extra cost to you.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.15)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.12em',
              color: 'rgba(245,240,232,0.3)',
            }}>
              Affiliate Disclosure: MysterMyself may earn a commission from qualifying purchases through links in this vault.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {VAULT_SECTIONS.map((section) => (
              <div key={section.category}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${section.color}20`,
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{section.emoji}</span>
                  <h2 style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: section.color,
                  }}>
                    {section.category}
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 2,
                }}>
                  {section.items.map((item) => (
                    <div key={item.name} style={{
                      background: 'var(--deep)',
                      border: `1px solid ${section.color}10`,
                      padding: '22px 22px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
                        <h3 style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1rem',
                          letterSpacing: '0.04em',
                          color: 'var(--cream)',
                          lineHeight: 1.1,
                        }}>
                          {item.name}
                        </h3>
                        <span style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.44rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '2px 7px',
                          background: `${section.color}10`,
                          color: section.color,
                          border: `1px solid ${section.color}25`,
                          flexShrink: 0,
                          whiteSpace: 'nowrap',
                        }}>
                          {item.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.67rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
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
