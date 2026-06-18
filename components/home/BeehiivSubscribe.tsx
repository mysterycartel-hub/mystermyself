import Link from 'next/link'

export default function BeehiivSubscribe() {
  return (
    <section id="subscribe" style={{
      background: 'var(--deep)',
      borderTop: '1px solid rgba(201,168,76,0.12)',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
      padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}>
          <div style={{ width: 28, height: 1, background: 'var(--gold)' }} />
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            Free · Weekly · No Spam
          </span>
          <div style={{ width: 28, height: 1, background: 'var(--gold)' }} />
        </div>

        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          lineHeight: 0.95,
          letterSpacing: '0.02em',
          marginBottom: 20,
        }}>
          GET THE NEXT<br />
          <span style={{ color: 'var(--gold)' }}>OPPORTUNITY DROP.</span>
        </h2>

        <p style={{
          fontSize: '0.78rem',
          color: 'rgba(245,240,232,0.5)',
          lineHeight: 1.9,
          marginBottom: 32,
          fontFamily: '"Space Mono", monospace',
        }}>
          Courier income, Trading Chef lessons, Fantasy Island updates, AI tools,
          affiliate plays, and business-building systems — sent free.
        </p>

        <Link href="/opportunity-list" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="btn-primary" style={{ padding: '16px 44px' }}>
            <span>Enter The Coast →</span>
          </div>
        </Link>

        <p style={{
          marginTop: 20,
          fontSize: '0.62rem',
          color: 'rgba(245,240,232,0.3)',
          fontFamily: '"Space Mono", monospace',
          lineHeight: 1.7,
        }}>
          After joining, visit{' '}
          <Link href="/follow-the-coast" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            Follow The Coast
          </Link>{' '}
          to subscribe across all channels.
        </p>
      </div>
    </section>
  )
}
