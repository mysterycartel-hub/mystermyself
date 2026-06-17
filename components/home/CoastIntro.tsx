export default function CoastIntro() {
  return (
    <section style={{
      background: 'var(--black)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 24 }}>
          <div className="section-label-line" />
          <span className="section-label-text">The World</span>
        </div>

        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          lineHeight: 0.95,
          letterSpacing: '0.02em',
          marginBottom: 20,
        }}>
          WHAT IS<br />
          <span style={{ color: 'var(--gold)' }}>SCOTT-KING COAST?</span>
        </h2>

        <p style={{
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
          color: 'rgba(245,240,232,0.6)',
          lineHeight: 1.9,
          maxWidth: 620,
          marginBottom: 16,
        }}>
          Scott-King Coast is an open information hub. Nine districts covering courier income,
          trading education, fantasy tools, AI resources, affiliate plays, food business, and more.
          Free to subscribers. No paywalls yet — just resources, guides, and opportunity drops.
        </p>

        <p style={{
          fontSize: '0.72rem',
          color: 'rgba(245,240,232,0.35)',
          fontFamily: '"Space Mono", monospace',
          lineHeight: 1.7,
          maxWidth: 560,
          marginBottom: 32,
        }}>
          Every district gives value before asking for anything. Paid sections will be added later
          after the community grows.
        </p>

        <a href="#districts" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="btn-secondary">
            Choose Your District →
          </div>
        </a>
      </div>
    </section>
  )
}
