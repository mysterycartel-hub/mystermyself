import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for MysterMyself and Scott-King Coast.',
}

export default function TermsPage() {
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
            TERMS OF <span style={{ color: 'var(--gold)' }}>USE</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              {
                title: 'Acceptance of Terms',
                body: 'By accessing or using mystermyself.com, you agree to be bound by these Terms of Use. If you do not agree, please do not use this site.',
              },
              {
                title: 'Educational Content Only',
                body: 'All content on MysterMyself is for educational and informational purposes only. Nothing on this site constitutes financial, legal, or professional advice. Trading involves substantial risk of loss.',
              },
              {
                title: 'Use of Content',
                body: 'Content on this site is owned by MysterMyself unless otherwise noted. You may not reproduce, distribute, or create derivative works without express written permission.',
              },
              {
                title: 'User Conduct',
                body: 'You agree not to use this site for unlawful purposes, to harass other users, to distribute spam, or to interfere with the operation of the site.',
              },
              {
                title: 'Products and Purchases',
                body: 'Digital products sold on this site are delivered electronically. All sales are subject to the Refund Policy. Stripe processes all payments securely.',
              },
              {
                title: 'Affiliate Links',
                body: 'This site contains affiliate links. We may receive a commission when you make a purchase through these links. This is disclosed clearly on the Affiliate Disclosure page.',
              },
              {
                title: 'Disclaimer of Warranties',
                body: 'This site is provided "as is" without warranties of any kind. MysterMyself does not guarantee the accuracy, completeness, or fitness for any particular purpose of the content.',
              },
              {
                title: 'Limitation of Liability',
                body: 'MysterMyself is not liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or its content.',
              },
              {
                title: 'Changes to Terms',
                body: 'We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.',
              },
              {
                title: 'Contact',
                body: 'Questions about these terms? Contact us at mysterycartel@gmail.com.',
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
