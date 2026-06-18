import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Refund Policy | MysterMyself',
  description: 'Refund and return policy for MysterMyself digital products.',
}

export default function RefundPage() {
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
            REFUND <span style={{ color: 'var(--gold)' }}>POLICY</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              {
                title: 'Digital Products',
                body: 'All sales of digital products (guides, playbooks, templates, and courses) are final upon delivery. Because digital products are immediately accessible after purchase, we do not offer refunds once access has been granted.',
              },
              {
                title: '7-Day Exception',
                body: 'If you have not accessed or downloaded the product and you contact us within 7 days of purchase, we may issue a refund at our discretion. Contact us at mysterycartel@gmail.com with your order details.',
              },
              {
                title: 'Subscriptions',
                body: 'Subscription plans (District Pass, Opportunity Vault) can be cancelled at any time. Cancellation stops future billing. We do not provide partial refunds for the remaining period of a billing cycle.',
              },
              {
                title: 'Defective or Incomplete Products',
                body: 'If a product you purchased is defective, inaccessible, or significantly different from its description, contact us within 14 days and we will either resolve the issue or issue a full refund.',
              },
              {
                title: 'How to Request a Refund',
                body: 'Email mysterycartel@gmail.com with your name, order number or email used at purchase, and reason for the refund request. We aim to respond within 2 business days.',
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
