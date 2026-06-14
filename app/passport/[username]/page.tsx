import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StampCollection from '@/components/passport/StampCollection'
import BadgeGrid from '@/components/passport/BadgeGrid'
import XPBar from '@/components/passport/XPBar'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Passport Profile | Scott-King Coast',
}

async function getProfileData(username: string) {
  try {
    const { getPassportByUsername } = await import('@/lib/passport-db')
    return await getPassportByUsername(username)
  } catch {
    return null
  }
}

export default async function PublicPassportPage({ params }: { params: { username: string } }) {
  const data = await getProfileData(params.username)

  if (!data) {
    return (
      <main>
        <Navbar />
        <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 24 }}>🔍</div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '3rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              marginBottom: 16,
            }}>
              Passport Not Found
            </h1>
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.4)',
              fontFamily: '"Space Mono", monospace',
              marginBottom: 32,
            }}>
              @{params.username} hasn&apos;t claimed their passport yet.
            </p>
            <Link href="/passport" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Claim Yours →</span></div>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      {/* Profile Hero */}
      <section style={{
        background: 'var(--black)',
        padding: '140px 48px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" />
        <div style={{
          position: 'absolute',
          right: 48, top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '16rem',
          color: 'rgba(201,168,76,0.03)',
          letterSpacing: '0.05em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          SKC
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.3em',
            color: 'rgba(201,168,76,0.4)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Scott-King Coast · Passport · Public Profile
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            color: 'var(--gold)',
            marginBottom: 8,
          }}>
            @{data.profile.username}
          </h1>

          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            color: 'rgba(245,240,232,0.35)',
            marginBottom: 32,
          }}>
            {data.profile.display_name} · Coast member since {new Date(data.profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>

          <div style={{ maxWidth: 400 }}>
            <XPBar xp={data.profile.xp} />
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: 48,
            marginTop: 32,
            paddingTop: 32,
            borderTop: '1px solid rgba(201,168,76,0.1)',
            flexWrap: 'wrap',
          }}>
            {[
              { num: `${data.stamps.length}/9`, label: 'Stamps' },
              { num: data.badges.length, label: 'Badges' },
              { num: data.missions.length, label: 'Missions' },
              { num: data.profile.xp.toLocaleString(), label: 'Total XP' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.5rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.3)',
                  marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stamps */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="section-label" style={{ marginBottom: 40 }}>
          <div className="section-label-line" />
          <span className="section-label-text">District Stamps</span>
        </div>
        <StampCollection collectedIds={data.stamps} />
      </section>

      {/* Badges */}
      <section style={{ background: 'var(--black)' }}>
        <BadgeGrid earnedBadgeIds={data.badges} />
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2.5rem',
            color: 'var(--gold)',
            letterSpacing: '0.05em',
          }}>
            Build Your Own Passport
          </h2>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.8,
            maxWidth: 400,
            fontFamily: '"Space Mono", monospace',
          }}>
            Explore the coast, collect stamps, earn badges. Your journey starts at the login.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/passport/login" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Claim Your Passport →</span></div>
            </Link>
            <Link href="/coast" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Explore the Coast</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
