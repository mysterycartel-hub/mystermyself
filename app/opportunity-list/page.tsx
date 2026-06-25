import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpportunitySignup from '@/components/OpportunitySignup'
import Link from 'next/link'

export const metadata = {
  title: 'The Opportunity List',
  description: 'Your entry pass into Scott-King Coast. Get courier drops, trading lessons, AI tools, fantasy updates, creator plays, food business resources, and ownership systems delivered to your inbox.',
}

const DISTRICTS = [
  { label: 'Market Marina',   color: '#0D9488' },
  { label: 'Route Harbor',    color: '#0EA5E9' },
  { label: 'Blueprint Bay',   color: '#6366F1' },
  { label: 'Fantasy Island',  color: '#22C55E' },
  { label: 'Creator Pier',    color: '#A855F7' },
  { label: 'Flavor District', color: '#F97316' },
]

const LANES = [
  { emoji: '⚓', label: 'Trading Chef / TCU',    desc: 'Gold trading education, market structure, and beginner lessons from Market Marina.', next: 'TCU Academy + Market Kitchen' },
  { emoji: '🚢', label: 'Courier income',        desc: 'Medical, pharmacy, and lab courier routes from Route Harbor.', next: 'Medical Courier Insider Edge' },
  { emoji: '📐', label: 'AI automation',          desc: 'Agents, workflows, and business OS from Blueprint Bay.', next: 'AI Operator Starter Kit' },
  { emoji: '🏈', label: 'Fantasy football',      desc: 'Rankings, injury alerts, and draft strategy from Fantasy Island.', next: 'Fantasy Draft Bible' },
  { emoji: '🎬', label: 'Creator & affiliate',   desc: 'Content systems, newsletters, and monetization from Creator Pier.', next: 'Newsletter Ready Desk' },
  { emoji: '🍗', label: 'Food business',          desc: 'Pop-up systems, catering, and food brand building from Flavor District.', next: 'Food Pop-Up Blueprint' },
  { emoji: '🏛️', label: 'Wealth & ownership',    desc: 'Credit, assets, and generational wealth from Legacy Point.', next: 'Ownership playbooks' },
  { emoji: '📚', label: 'Free resources',         desc: 'Starter guides and downloads from Library Vault.', next: 'Resource library access' },
]

export default function OpportunityListPage() {
  return (
    <main>
      <Navbar />

      {/* Hero — Entry Gate */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="hero-grid" style={{ opacity: 0.35 }} />

        {/* Gold glow */}
        <div style={{
          position: 'absolute',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          top: '40%', left: '60%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

            {/* Left — copy */}
            <div>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                border: '1px solid rgba(201,168,76,0.3)',
                background: 'rgba(201,168,76,0.04)',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)',
                marginBottom: 24,
              }}>
                Scott-King Coast Entry Gate
              </div>

              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                marginBottom: 20,
              }}>
                THE<br />
                <span style={{ color: 'var(--gold)' }}>OPPORTUNITY</span><br />
                LIST
              </h1>

              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                color: 'rgba(201,168,76,0.8)',
                marginBottom: 20,
                lineHeight: 1.6,
              }}>
                Your entry pass into Scott-King Coast.
              </p>

              <p style={{
                fontSize: '0.82rem',
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.9,
                maxWidth: 480,
                marginBottom: 32,
              }}>
                Get courier drops, trading lessons, AI tools, fantasy updates, creator plays, food business resources, and ownership systems delivered to your inbox.
              </p>

              {/* District chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                {DISTRICTS.map((d) => (
                  <span key={d.label} style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.48rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    background: `${d.color}10`,
                    color: d.color,
                    border: `1px solid ${d.color}25`,
                    whiteSpace: 'nowrap',
                  }}>
                    {d.label}
                  </span>
                ))}
              </div>

              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.4)',
              }}>
                One City. One System. Your Legacy.
              </p>
            </div>

            {/* Right — form */}
            <div>
              <OpportunitySignup source="opportunity_list_page" />
            </div>
          </div>
        </div>
      </section>

      {/* Character Strip — TCU Canon */}
      <section style={{
        background: 'var(--black)',
        padding: '32px 48px',
        borderTop: '1px solid rgba(201,168,76,0.06)',
        borderBottom: '1px solid rgba(201,168,76,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.45rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.4)',
            marginBottom: 16,
            textAlign: 'center',
          }}>
            TCU Canon Characters
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}>
            {[
              { name: 'Trading Chef', emoji: '👨‍🍳' },
              { name: 'Candle Kid', emoji: '🕯️' },
              { name: 'Wickie', emoji: '🎯' },
              { name: 'Louie Liquidity', emoji: '🌊' },
              { name: 'Chef Goldie', emoji: '✨' },
              { name: 'Grandma Market', emoji: '🧓' },
              { name: 'Nana Value', emoji: '💎' },
              { name: 'Melissa Mayhem', emoji: '⚡' },
              { name: 'Melody Mayhem', emoji: '🎵' },
            ].map((c) => (
              <div key={c.name} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 4 }}>{c.emoji}</div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(245,240,232,0.4)',
                  textTransform: 'uppercase',
                }}>
                  {c.name}
                </div>
              </div>
            ))}
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
              Eight Lanes. One Free Drop.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {LANES.map((item) => (
              <div key={item.label} style={{
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
                <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.75, marginBottom: 10 }}>
                  {item.desc}
                </p>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.45rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.4)',
                  borderTop: '1px solid rgba(201,168,76,0.06)',
                  paddingTop: 10,
                }}>
                  Next: {item.next}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow The Coast section */}
      <section style={{ background: 'var(--black)', padding: '80px 48px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 12,
          }}>
            Stay Connected
          </div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 16,
          }}>
            FOLLOW THE <span style={{ color: 'var(--gold)' }}>COAST</span>
          </h2>
          <p style={{
            fontSize: '0.78rem',
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.85,
            maxWidth: 520,
            margin: '0 auto 36px',
          }}>
            Stay connected across every lane: newsletter, videos, shorts, social updates, and live drops.
          </p>
          <Link href="/follow-the-coast" style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: '#060608',
            padding: '16px 40px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            See All Channels →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
