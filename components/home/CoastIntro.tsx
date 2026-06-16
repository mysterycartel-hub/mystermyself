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
        }}>
          Scott-King Coast is the MysterMyself ecosystem — a connected world of income
          districts where skills become income, income becomes assets, and assets create
          freedom.
        </p>
      </div>
    </section>
  )
}
