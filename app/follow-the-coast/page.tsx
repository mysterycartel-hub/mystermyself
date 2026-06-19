import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SOCIAL, isRealUrl } from '@/lib/social-links'

export const metadata = {
  title: 'Follow The Coast',
  description: 'Stay connected across every lane: newsletter, videos, shorts, social updates, and live drops from Scott-King Coast.',
  openGraph: {
    title: 'Follow The Coast — MysterMyself',
    description: 'Stay connected across every lane: newsletter, videos, shorts, social updates, and live drops from Scott-King Coast.',
    url: 'https://mystermyself.com/follow-the-coast',
  },
}

const CHANNELS = [
  {
    platform: 'The Opportunity List',
    desc: 'All district drops, opportunity research, affiliate picks, and tools delivered free. The primary channel.',
    cta: 'Join The Opportunity List',
    href: '/opportunity-list',
    color: '#c9a84c',
    emoji: '⚓',
    internal: true,
    priority: true,
  },
  {
    platform: 'YouTube',
    desc: 'Full-length videos: Trading Chef lessons, courier income walkthroughs, AI system builds, and Scott-King Coast world updates.',
    cta: 'Subscribe on YouTube',
    href: SOCIAL.youtube,
    color: '#FF0000',
    emoji: '▶',
  },
  {
    platform: 'TikTok',
    desc: 'Short drops, quick income plays, chart reads, and behind-the-scenes from the coast.',
    cta: 'Follow on TikTok',
    href: SOCIAL.tiktok,
    color: '#69C9D0',
    emoji: '♪',
  },
  {
    platform: 'Instagram',
    desc: 'Visual posts, district updates, product previews, and community content.',
    cta: 'Follow on Instagram',
    href: SOCIAL.instagram,
    color: '#E1306C',
    emoji: '◎',
  },
  {
    platform: 'Facebook',
    desc: 'MrMyself Scott — community posts, food business updates, and coast drops.',
    cta: 'Follow on Facebook',
    href: SOCIAL.facebook,
    color: '#1877F2',
    emoji: 'f',
  },
  {
    platform: 'X / Twitter',
    desc: 'Real-time commentary, trades in progress, and short-form coast drops.',
    cta: 'Follow on X',
    href: SOCIAL.x,
    color: '#1DA1F2',
    emoji: 'X',
  },
  {
    platform: 'Rumble',
    desc: 'Long-form uncensored drops and coast archives.',
    cta: 'Follow on Rumble',
    href: SOCIAL.rumble,
    color: '#85C742',
    emoji: '◉',
  },
]

const RESOURCE_BUTTONS = [
  { label: 'Enter Scott-King Coast',  href: '/',                internal: true },
  { label: 'View Resource Library',   href: '/resources',       internal: true },
  { label: 'Work With MysterMyself',  href: `mailto:${SOCIAL.email}`, internal: false },
]

export default function FollowTheCoastPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 64 }}>
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
              Scott-King Coast · Social Hub
            </div>

            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              marginBottom: 20,
            }}>
              FOLLOW THE<br />
              <span style={{ color: 'var(--gold)' }}>COAST</span>
            </h1>

            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.85,
              maxWidth: 520,
              marginBottom: 16,
            }}>
              Stay connected across every lane: newsletter, videos, shorts, social updates, and live drops.
            </p>
          </div>

          {/* Channel cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 64 }}>
            {CHANNELS.map((ch) => {
              const real = ch.internal || isRealUrl(ch.href)
              return (
                <div key={ch.platform} style={{
                  background: 'var(--deep)',
                  border: `1px solid ${real ? ch.color + '18' : 'rgba(245,240,232,0.05)'}`,
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  flexWrap: 'wrap',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {ch.priority && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)', opacity: 0.5 }} />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 200 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      background: real ? `${ch.color}15` : 'rgba(245,240,232,0.03)',
                      border: `1px solid ${real ? ch.color + '30' : 'rgba(245,240,232,0.06)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.1rem',
                      color: real ? ch.color : 'rgba(245,240,232,0.2)',
                      flexShrink: 0,
                    }}>
                      {ch.emoji}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.1rem',
                        letterSpacing: '0.04em',
                        color: real ? 'var(--cream)' : 'rgba(245,240,232,0.3)',
                        lineHeight: 1.1,
                        marginBottom: 6,
                      }}>
                        {ch.platform}
                        {!real && (
                          <span style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.44rem',
                            letterSpacing: '0.12em',
                            color: 'rgba(245,240,232,0.2)',
                            marginLeft: 10,
                            textTransform: 'uppercase',
                          }}>
                            [NEEDS OWNER URL]
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.7, fontFamily: '"Space Mono", monospace' }}>
                        {ch.desc}
                      </p>
                    </div>
                  </div>

                  {real ? (
                    ch.internal ? (
                      <Link href={ch.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                          background: ch.color,
                          color: '#060608',
                          padding: '12px 24px',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}>
                          {ch.cta} →
                        </div>
                      </Link>
                    ) : (
                      <a href={ch.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                          background: `${ch.color}15`,
                          border: `1px solid ${ch.color}40`,
                          color: ch.color,
                          padding: '12px 24px',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}>
                          {ch.cta} →
                        </div>
                      </a>
                    )
                  ) : (
                    <div style={{
                      border: '1px solid rgba(245,240,232,0.06)',
                      color: 'rgba(245,240,232,0.15)',
                      padding: '12px 24px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                      cursor: 'default',
                    }}>
                      Link Pending
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Additional resource buttons */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.1)',
            padding: '36px 32px',
          }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 20,
            }}>
              More From Scott-King Coast
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {RESOURCE_BUTTONS.map((b) =>
                b.internal ? (
                  <Link key={b.label} href={b.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'var(--gold)',
                      padding: '12px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {b.label}
                    </div>
                  </Link>
                ) : (
                  <a key={b.label} href={b.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'var(--gold)',
                      padding: '12px 20px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {b.label}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Owner note */}
          <div style={{
            marginTop: 40,
            padding: '16px 20px',
            background: 'rgba(201,168,76,0.03)',
            border: '1px solid rgba(201,168,76,0.08)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.5rem',
            color: 'rgba(245,240,232,0.2)',
            letterSpacing: '0.1em',
            lineHeight: 1.8,
          }}>
            OWNER NOTE: Channels marked [NEEDS OWNER URL] require real social profile URLs.<br />
            Add to Vercel env vars: NEXT_PUBLIC_YOUTUBE_URL, NEXT_PUBLIC_TIKTOK_URL, NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_RUMBLE_URL
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
