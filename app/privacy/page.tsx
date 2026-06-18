import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | MysterMyself',
  description: 'Privacy Policy for MysterMyself and Scott-King Coast.',
}

export default function PrivacyPage() {
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
            PRIVACY <span style={{ color: 'var(--gold)' }}>POLICY</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              {
                title: 'Information We Collect',
                body: 'We collect information you provide directly, including your name and email address when you subscribe to The Opportunity List or contact us. We may also collect usage data such as pages visited and time on site through analytics tools.',
              },
              {
                title: 'How We Use Your Information',
                body: 'We use your information to send The Opportunity List newsletter, respond to inquiries, improve the site, and deliver relevant content about the Scott-King Coast ecosystem districts.',
              },
              {
                title: 'Email Communications',
                body: 'By joining The Opportunity List, you consent to receive email communications from MysterMyself. You can unsubscribe at any time using the link at the bottom of any email.',
              },
              {
                title: 'Cookies and Analytics',
                body: 'We may use cookies and third-party analytics to understand how visitors use this site. No personally identifiable information is shared with analytics providers.',
              },
              {
                title: 'Third-Party Services',
                body: 'We use Beehiiv for email delivery, Stripe for payment processing, and Supabase for data storage. Each service has its own privacy policy. We do not sell your data to third parties.',
              },
              {
                title: 'Affiliate Links',
                body: 'This site contains affiliate links. Clicking them may result in us earning a commission. This does not affect the price you pay or our editorial recommendations.',
              },
              {
                title: 'Data Retention',
                body: 'We retain your data as long as you are subscribed or have an active account. You may request deletion of your data at any time by contacting us.',
              },
              {
                title: 'Contact',
                body: 'For privacy-related questions, contact us at mysterycartel@gmail.com.',
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
