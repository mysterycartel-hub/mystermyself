import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Disclaimer | MysterMyself',
  description: 'Trading and earnings disclaimer for MysterMyself and Scott-King Coast.',
}

export default function DisclaimerPage() {
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
            <span style={{ color: 'var(--gold)' }}>DISCLAIMER</span>
          </h1>

          {/* Trading disclaimer — required verbatim */}
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
              Trading involves risk. Educational content only. Nothing on this site is financial advice.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              {
                title: 'No Financial Advice',
                body: 'MysterMyself and Scott-King Coast provide educational and informational content only. The Trading Chef curriculum, Market Marina content, and all trading-related material on this site is for educational purposes only. Nothing constitutes a buy, sell, or hold recommendation for any security, commodity, or financial instrument.',
              },
              {
                title: 'Trading Risk',
                body: 'Trading financial markets involves substantial risk of loss and is not appropriate for all investors. Past performance is not indicative of future results. You should not trade with money you cannot afford to lose. Always consult a qualified financial professional before making any investment decisions.',
              },
              {
                title: 'No Guarantee of Results',
                body: 'We do not guarantee any specific trading results. Any income figures, results, or examples shown are for illustrative purposes only and are not typical. Individual results will vary based on market conditions, capital, experience, and risk management.',
              },
              {
                title: 'Courier and Income Information',
                body: 'Information about courier income, gig work, and other income opportunities is educational only. Actual earnings depend on your location, vehicle, effort, and many other factors. MysterMyself does not guarantee any specific income outcome.',
              },
              {
                title: 'General Disclaimer',
                body: 'MysterMyself is not responsible for any financial decisions made based on content found on this site. All users are solely responsible for their own decisions, actions, and results.',
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
