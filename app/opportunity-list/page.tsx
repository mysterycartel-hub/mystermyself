import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpportunitySignup from '@/components/OpportunitySignup'
import OpportunityCharacterStrip from '@/components/OpportunityCharacterStrip'
import Link from 'next/link'

export const metadata = {
  title: 'The Opportunity List | Scott-King Coast',
  description: 'Your entry pass into Scott-King Coast. Get courier drops, trading lessons, AI tools, food business resources, and ownership systems delivered to your inbox.',
}

const DISTRICTS = [
  { label: 'Route Harbor', desc: 'Courier & Logistics Income', color: '#0EA5E9', href: '/coast/route-harbor' },
  { label: 'Market Marina', desc: 'Gold Trading & TCU Education', color: '#0D9488', href: '/coast/market-marina' },
  { label: 'Flavor District', desc: 'Breaded Or Not?! Food Brand', color: '#F97316', href: '/coast/flavor-district' },
  { label: 'Blueprint Bay', desc: 'Business Structure & Legal', color: '#6366F1', href: '/coast/blueprint-bay' },
  { label: 'Creator Pier', desc: 'Content, YouTube & Digital Products', color: '#A855F7', href: '/coast/creator-pier' },
  { label: 'Legacy Point', desc: 'Wealth, Trust & Ownership', color: '#EC4899', href: '/coast/legacy-point' },
]

export default function OpportunityListPage() {
  return (
    <main>
      <Navbar />

      {/* SECTION 1 — HERO */}
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

            {/* Left — Trading Chef character + copy */}
            <div>
              {/* Trading Chef Avatar Placeholder */}
              <div style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                border: '3px solid rgba(201,168,76,0.6)',
                background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(6,6,8,0.9) 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                boxShadow: '0 0 40px rgba(201,168,76,0.15), inset 0 0 30px rgba(201,168,76,0.05)',
              }}>
                {/* TODO: replace with actual Trading Chef asset */}
                <span style={{ fontSize: '4rem' }}>👨‍🍳</span>
              </div>

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
                Get courier drops, trading lessons, AI tools, food business resources, and ownership systems delivered to your inbox.
              </p>
            </div>

            {/* Right — form with gold glow border */}
            <div style={{
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '36px 32px',
              background: 'rgba(6,6,8,0.8)',
              boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 0 120px rgba(201,168,76,0.04)',
              position: 'relative',
            }}>
              {/* Animated gold top border */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              }} />
              <OpportunitySignup source="opportunity_list_page" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CHARACTER STRIP */}
      <OpportunityCharacterStrip />

      {/* SECTION 3 — VIDEO EMBED (Coming Soon slot) */}
      <section style={{ background: 'var(--deep)', padding: '80px 48px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 16,
          }}>
            Coming Soon
          </div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '0.03em',
            color: 'var(--cream)',
            marginBottom: 32,
          }}>
            What Is The <span style={{ color: 'var(--gold)' }}>Opportunity List</span>?
          </h2>

          {/* Video placeholder */}
          {/* CEO: paste YouTube/TikTok embed URL here when ready */}
          <div id="opportunity-video" style={{
            width: '100%',
            maxWidth: 640,
            margin: '0 auto',
            aspectRatio: '16/9',
            background: 'var(--black)',
            border: '1px solid rgba(201,168,76,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Play button */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.15)',
              border: '2px solid rgba(201,168,76,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 0, height: 0,
                borderLeft: '20px solid var(--gold)',
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                marginLeft: 4,
              }} />
            </div>
            <div style={{
              position: 'absolute',
              bottom: 16,
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.4)',
            }}>
              Video Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — DISTRICTS (6 approved only) */}
      <section style={{ background: 'var(--black)', padding: '80px 48px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
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
              Choose Your Lane
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              letterSpacing: '0.03em',
              color: 'var(--cream)',
            }}>
              Six Districts. <span style={{ color: 'var(--gold)' }}>Your Path.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {DISTRICTS.map((d) => (
              <Link key={d.label} href={d.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--deep)',
                  border: `1px solid ${d.color}20`,
                  padding: '28px 24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.3rem',
                    letterSpacing: '0.04em',
                    color: d.color,
                    marginBottom: 8,
                  }}>
                    {d.label}
                  </div>
                  <p style={{
                    fontSize: '0.72rem',
                    color: 'rgba(245,240,232,0.5)',
                    lineHeight: 1.75,
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    {d.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — SOCIAL PROOF / MISSION COPY */}
      <section style={{ background: 'var(--deep)', padding: '80px 48px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 24,
          }}>
            ONE COAST. SIX DISTRICTS.<br />
            <span style={{ color: 'var(--gold)' }}>ONE MISSION.</span>
          </h2>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.9,
            maxWidth: 600,
            margin: '0 auto 36px',
          }}>
            Maurice Scott built The Scott-King Coast as a living map of every income lane he&apos;s navigating — trading, food, logistics, content, and legacy. The Opportunity List is how you ride along. Free drops. Real systems. No fluff.
          </p>
          <Link href="/about" style={{
            display: 'inline-block',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)',
            padding: '14px 32px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Meet The Founder →
          </Link>
        </div>
      </section>

      {/* Follow The Coast CTA */}
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
