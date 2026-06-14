import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DistrictCard from '@/components/map/DistrictCard'
import { districts, getDistrict } from '@/lib/districts'

export async function generateStaticParams() {
  return districts.map((d) => ({ district: d.slug }))
}

export async function generateMetadata({ params }: { params: { district: string } }) {
  const d = getDistrict(params.district)
  if (!d) return { title: 'Not Found' }
  return {
    title: `${d.name} | Scott-King Coast`,
    description: d.description,
  }
}

export default function DistrictPage({ params }: { params: { district: string } }) {
  const d = getDistrict(params.district)
  if (!d) notFound()

  const others = districts.filter((x) => x.id !== d.id).slice(0, 3)

  return (
    <main>
      <Navbar />

      {/* District Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        background: 'var(--black)',
        padding: '160px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" />
        {/* Colored glow for district */}
        <div style={{
          position: 'absolute',
          width: 800, height: 800,
          background: `radial-gradient(circle, ${d.color}12 0%, transparent 70%)`,
          top: '50%', left: '30%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        {/* Ghost stamp */}
        <div style={{
          position: 'absolute',
          right: 48, bottom: 40,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(6rem, 16vw, 14rem)',
          letterSpacing: '0.08em',
          color: `${d.color}06`,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {d.passportStamp}
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Link href="/coast" style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              textDecoration: 'none',
              fontFamily: '"Space Mono", monospace',
            }}>
              Scott-King Coast
            </Link>
            <span style={{ color: 'rgba(201,168,76,0.25)', fontSize: '0.6rem' }}>›</span>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: d.color,
              fontFamily: '"Space Mono", monospace',
            }}>
              {d.tag}
            </span>
          </div>

          {/* Tag */}
          <div style={{
            display: 'inline-block',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '5px 14px',
            background: `${d.color}15`,
            color: d.color,
            border: `1px solid ${d.color}30`,
            marginBottom: 24,
          }}>
            {d.tag} · {d.terrain.toUpperCase()}
          </div>

          {/* Emoji + Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
            <span style={{ fontSize: '4rem' }}>{d.emoji}</span>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(4rem, 9vw, 8rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              color: d.color,
            }}>
              {d.name.replace(' ', '\n').split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h1>
          </div>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: 'rgba(245,240,232,0.4)',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            "{d.tagline}"
          </p>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.8,
            maxWidth: 600,
            marginBottom: 40,
          }}>
            {d.longDescription}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {d.externalHref && (
              <Link href={d.externalHref} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: d.color,
                  color: '#060608',
                  padding: '16px 36px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  {d.cta} →
                </div>
              </Link>
            )}
            <Link href="/coast" style={{ textDecoration: 'none' }}>
              <div style={{
                border: `1px solid ${d.color}40`,
                color: d.color,
                padding: '16px 36px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                ← All Districts
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section style={{ background: 'var(--deep)', borderTop: `1px solid ${d.color}20` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 32 }}>
              <div className="section-label-line" style={{ background: d.color }} />
              <span className="section-label-text" style={{ color: d.color }}>What&apos;s Inside</span>
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 40 }}>
              {d.name.toUpperCase().split(' ').map((word, i) => (
                <span key={i} style={{ display: 'block', color: i === 0 ? 'var(--cream)' : d.color }}>
                  {word}
                </span>
              ))}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.9, marginBottom: 32 }}>
              {d.longDescription}
            </p>

            {/* Passport stamp */}
            <div style={{
              display: 'inline-block',
              border: `2px solid ${d.color}35`,
              padding: '12px 24px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.4rem',
              letterSpacing: '0.25em',
              color: `${d.color}50`,
              transform: 'rotate(-2deg)',
            }}>
              {d.passportStamp}
            </div>
          </div>

          <div>
            <p style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: d.color,
              marginBottom: 28,
              fontFamily: '"Space Mono", monospace',
            }}>
              Features & Resources
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {d.features.map((f, fi) => (
                <div key={f} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.07)',
                }}>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.8rem',
                    color: `${d.color}30`,
                    minWidth: 48,
                    lineHeight: 1,
                  }}>
                    {String(fi + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.65)', flex: 1 }}>{f}</span>
                  <div style={{ width: 6, height: 6, background: d.color, borderRadius: '50%', opacity: 0.5, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* V3 Passport teaser */}
      <section style={{ background: 'var(--black)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{
          border: '1px solid rgba(201,168,76,0.15)',
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
          background: 'rgba(201,168,76,0.02)',
        }}>
          <div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              V3 · Coming Next
            </div>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              marginBottom: 12,
            }}>
              Passport System
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.8, maxWidth: 480 }}>
              Visit every district. Collect stamps. Earn XP. Unlock levels, badges, and exclusive content across the Scott-King Coast universe.
              The Passport System drops with V3.
            </p>
          </div>
          <div style={{
            border: '2px solid rgba(201,168,76,0.2)',
            padding: '20px 32px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2rem',
            letterSpacing: '0.25em',
            color: 'rgba(201,168,76,0.3)',
            transform: 'rotate(-4deg)',
            flexShrink: 0,
          }}>
            {d.passportStamp}
          </div>
        </div>
      </section>

      {/* Other Districts */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Continue Exploring</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          OTHER<br />
          <span style={{ color: 'var(--gold)' }}>DISTRICTS</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
          marginBottom: 40,
        }}>
          {others.map((other, i) => (
            <DistrictCard key={other.id} district={other} index={i} variant="grid" />
          ))}
        </div>
        <Link href="/coast" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <div className="btn-secondary">
            View All 9 Districts →
          </div>
        </Link>
      </section>

      <Footer />
    </main>
  )
}
