import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Affiliate Disclosure | MysterMyself',
  description: 'Affiliate link disclosure for MysterMyself and Scott-King Coast.',
}

export default function AffiliateDisclosurePage() {
  return (
    <main>
      <Navbar />
      <section style={{ background: 'var(--black)', minHeight: '100vh', padding: '120px 48px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 16,
          }}>
            Legal · Scott-King Coast
          </div>
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 48,
          }}>
            AFFILIATE <span style={{ color: 'var(--gold)' }}>DISCLOSURE</span>
          </h1>

          {/* Required verbatim disclosure */}
          <div style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.2)',
            padding: '28px 32px',
            marginBottom: 40,
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.78rem',
              color: 'rgba(245,240,232,0.8)',
              lineHeight: 1.9,
              letterSpacing: '0.04em',
            }}>
              MysterMyself may earn commissions from qualifying purchases through affiliate links. This does not change the cost to the visitor.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              {
                title: 'What Are Affiliate Links?',
                body: 'Affiliate links are tracking links that allow companies to credit MysterMyself when someone clicks a link and makes a qualifying purchase. These links are used throughout the site, particularly in the Resource Vault and district pages.',
              },
              {
                title: 'No Extra Cost to You',
                body: 'Using an affiliate link does not change the price you pay for a product or service. In some cases, affiliate partnerships provide access to special discounts for our audience.',
              },
              {
                title: 'Our Editorial Standards',
                body: 'We only recommend tools and products we believe are genuinely useful for the Scott-King Coast community. Affiliate relationships do not influence which products we feature or how we describe them.',
              },
              {
                title: 'Programs We Participate In',
                body: 'We may earn commissions from programs including but not limited to: Amazon Associates, Beehiiv, ConvertKit, Canva, TradingView, Stripe, Impact.com, and other creator and business tool platforms.',
              },
              {
                title: 'FTC Compliance',
                body: 'In accordance with FTC guidelines, we disclose our affiliate relationships clearly. Where affiliate links appear in content, you will see a note or tag indicating this relationship.',
              },
              {
                title: 'Questions?',
                body: 'If you have questions about our affiliate partnerships or content, contact us at mysterycartel@gmail.com.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.3rem',
                  letterSpacing: '0.04em',
                  color: 'var(--gold)',
                  marginBottom: 12,
                }}>
                  {section.title}
                </h2>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.9 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(201,168,76,0.1)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            color: 'rgba(245,240,232,0.25)',
            letterSpacing: '0.1em',
          }}>
            Last updated: June 2026 · mystermyself.com
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
