import Link from 'next/link'

export const metadata = {
  title: "You're In. Now Follow The Coast. | MysterMyself",
  description: 'Subscribe to district drops and follow all MysterMyself channels.',
}

const SIGNUP = process.env.NEXT_PUBLIC_BEEHIIV_SIGNUP_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com/subscribe'
const PUBLICATION = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com'

const external = { target: '_blank' as const, rel: 'noopener noreferrer' }

const districts = [
  {
    name: 'Route Harbor',
    desc: 'Courier income, medical courier drops, logistics tools.',
    cta: 'Get Route Harbor Drops',
    href: SIGNUP,
    color: '#0EA5E9',
  },
  {
    name: 'Market Marina',
    desc: 'Trading Chef lessons, market structure, TCU updates.',
    cta: 'Get Trading Chef Drops',
    href: SIGNUP,
    color: '#0D9488',
  },
  {
    name: 'Fantasy Island',
    desc: 'Draft updates, rankings, alerts, and live fantasy drops.',
    cta: 'Get Fantasy Island Drops',
    href: SIGNUP,
    color: '#22C55E',
  },
  {
    name: 'Creator Pier',
    desc: 'AI tools, affiliate plays, content systems, creator resources.',
    cta: 'Explore Tool Vault',
    href: '/pages/creator-pier',
    color: '#A855F7',
    internal: true,
  },
]

const socials = [
  { name: 'YouTube', cta: 'Subscribe on YouTube', href: '', disabled: true },
  { name: 'Instagram', cta: 'Follow on Instagram', href: '', disabled: true },
  { name: 'TikTok', cta: 'Follow on TikTok', href: '', disabled: true },
  { name: 'Facebook', cta: 'Follow on Facebook', href: '', disabled: true },
]

export default function FollowTheCoast() {
  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh', padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px) 80px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
          }}>
            <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Scott-King Coast
            </span>
          </div>
        </div>

        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          marginBottom: 20,
        }}>
          YOU&apos;RE IN.<br />
          NOW FOLLOW <span style={{ color: 'var(--gold)' }}>THE COAST.</span>
        </h1>

        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(245,240,232,0.6)',
          lineHeight: 1.9,
          maxWidth: 560,
          marginBottom: 56,
        }}>
          Your first step is complete. Follow the lanes you care about most so you
          don&apos;t miss drops, updates, tools, and opportunities.
        </p>

        {/* Opportunity List */}
        <div style={{
          background: 'var(--deep)',
          border: '1px solid rgba(201,168,76,0.25)',
          padding: 'clamp(24px, 4vw, 36px)',
          marginBottom: 2,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)' }} />
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 12,
          }}>
            Primary Channel
          </div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.8rem',
            letterSpacing: '0.04em',
            color: 'var(--cream)',
            marginBottom: 8,
          }}>
            The Opportunity List
          </h2>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(245,240,232,0.5)',
            fontFamily: '"Space Mono", monospace',
            lineHeight: 1.7,
            marginBottom: 20,
          }}>
            All district drops, opportunity research, affiliate picks, and tools delivered free.
          </p>
          <a href={PUBLICATION} {...external} style={{ textDecoration: 'none', display: 'inline-block' }}>
            <div style={{
              background: 'var(--gold)',
              color: '#060608',
              padding: '14px 28px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Open The Opportunity List →
            </div>
          </a>
        </div>

        {/* District drops */}
        <div style={{ marginBottom: 48, marginTop: 2 }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
            padding: '20px 0 16px',
          }}>
            District Drops
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {districts.map((d) => (
              <div key={d.name} style={{
                background: 'var(--deep)',
                border: `1px solid ${d.color}20`,
                padding: '24px',
              }}>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  color: d.color,
                  letterSpacing: '0.04em',
                  marginBottom: 8,
                }}>
                  {d.name}
                </h3>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'rgba(245,240,232,0.45)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                  fontFamily: '"Space Mono", monospace',
                }}>
                  {d.desc}
                </p>
                {d.internal ? (
                  <Link href={d.href} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <div style={{
                      border: `1px solid ${d.color}40`,
                      color: d.color,
                      padding: '10px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {d.cta} →
                    </div>
                  </Link>
                ) : (
                  <a href={d.href} {...external} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <div style={{
                      border: `1px solid ${d.color}40`,
                      color: d.color,
                      padding: '10px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {d.cta} →
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social channels */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
            marginBottom: 16,
          }}>
            Social Channels
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
            {socials.map((s) => (
              <div key={s.name} style={{
                background: 'var(--deep)',
                border: '1px solid rgba(245,240,232,0.06)',
                padding: '20px',
                opacity: s.disabled ? 0.4 : 1,
              }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  color: 'rgba(245,240,232,0.5)',
                  letterSpacing: '0.04em',
                  marginBottom: 12,
                }}>
                  {s.name}
                </div>
                <div style={{
                  border: '1px solid rgba(245,240,232,0.1)',
                  color: 'rgba(245,240,232,0.25)',
                  padding: '10px 16px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'default',
                  textAlign: 'center',
                }}>
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div style={{
          borderTop: '1px solid rgba(201,168,76,0.1)',
          paddingTop: 32,
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <Link href="/" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}>← Back to Scott-King Coast</Link>
          <a href={SIGNUP} {...external} style={{ fontSize: '0.65rem', color: 'var(--gold)', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}>Subscribe to Opportunity List</a>
          <Link href="/products/medical-courier-guide" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}>Medical Courier Guide</Link>
        </div>

      </div>
    </main>
  )
}
