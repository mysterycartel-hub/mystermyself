import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DistrictCard from '@/components/map/DistrictCard'
import { districts, getDistrict } from '@/lib/districts'
import { getDistrictContent } from '@/lib/district-content'

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

  const content = getDistrictContent(params.district)
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
        <div style={{
          position: 'absolute',
          width: 800, height: 800,
          background: `radial-gradient(circle, ${d.color}12 0%, transparent 70%)`,
          top: '50%', left: '30%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

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
            <span style={{ color: 'rgba(201,168,76,0.25)', fontSize: '0.6rem' }}>&rsaquo;</span>
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

          {/* Tag + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              background: `${d.color}15`,
              color: d.color,
              border: `1px solid ${d.color}30`,
            }}>
              {d.tag} &middot; {d.terrain.toUpperCase()}
            </div>
            {content && (
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.48rem',
                letterSpacing: '0.12em',
                color: 'rgba(245,240,232,0.35)',
              }}>
                {content.brand}
              </span>
            )}
          </div>

          {/* Name */}
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
            &ldquo;{d.tagline}&rdquo;
          </p>

          {/* Purpose from enriched content */}
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.8,
            maxWidth: 600,
            marginBottom: 16,
          }}>
            {content?.purpose || d.longDescription}
          </p>

          {content && (
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.4)',
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 40,
              fontFamily: '"Space Mono", monospace',
            }}>
              {content.problemSolved}
            </p>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
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
                Join The Opportunity List &rarr;
              </div>
            </Link>
            {content?.relatedProducts[0] && (
              <Link href={content.relatedProducts[0].href} style={{ textDecoration: 'none' }}>
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
                  View Products
                </div>
              </Link>
            )}
            <Link href="/coast" style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid rgba(201,168,76,0.25)',
                color: 'rgba(201,168,76,0.6)',
                padding: '16px 36px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                &larr; All Districts
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Inside — Live Offers + Coming Soon */}
      {content && (
        <section style={{
          background: 'var(--deep)',
          borderTop: `1px solid ${d.color}20`,
          padding: 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>
              {/* Left — live offers */}
              <div>
                <div className="section-label" style={{ marginBottom: 24 }}>
                  <div className="section-label-line" style={{ background: d.color }} />
                  <span className="section-label-text" style={{ color: d.color }}>Live Now</span>
                </div>
                <h2 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--cream)',
                  letterSpacing: '0.03em',
                  marginBottom: 28,
                }}>
                  AVAILABLE <span style={{ color: d.color }}>NOW</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {content.liveOffers.map((offer, i) => (
                    <div key={offer} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.07)',
                    }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.4rem',
                        color: `${d.color}50`,
                        minWidth: 36,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        color: 'rgba(245,240,232,0.7)',
                        flex: 1,
                      }}>
                        {offer}
                      </span>
                      <div style={{
                        width: 8, height: 8,
                        background: '#22C55E',
                        borderRadius: '50%',
                        flexShrink: 0,
                        boxShadow: '0 0 6px rgba(34,197,94,0.4)',
                      }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — coming soon */}
              <div>
                <div className="section-label" style={{ marginBottom: 24 }}>
                  <div className="section-label-line" style={{ background: 'rgba(245,240,232,0.2)' }} />
                  <span className="section-label-text">Coming Soon</span>
                </div>
                <h2 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--cream)',
                  letterSpacing: '0.03em',
                  marginBottom: 28,
                }}>
                  ON THE <span style={{ color: 'rgba(245,240,232,0.4)' }}>HORIZON</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {content.comingSoon.map((item, i) => (
                    <div key={item} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.05)',
                    }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.4rem',
                        color: 'rgba(245,240,232,0.12)',
                        minWidth: 36,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        color: 'rgba(245,240,232,0.4)',
                        flex: 1,
                      }}>
                        {item}
                      </span>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.4rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.2)',
                        border: '1px solid rgba(245,240,232,0.1)',
                        padding: '3px 8px',
                      }}>
                        SOON
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience + Problem */}
            <div style={{
              marginTop: 48,
              padding: '32px',
              background: 'var(--black)',
              border: `1px solid ${d.color}15`,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 32,
            }}>
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: d.color,
                  marginBottom: 10,
                }}>
                  Who This Is For
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>
                  {content.audience}
                </p>
              </div>
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: d.color,
                  marginBottom: 10,
                }}>
                  Problem Solved
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>
                  {content.problemSolved}
                </p>
              </div>
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: d.color,
                  marginBottom: 10,
                }}>
                  Your Next Step
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>
                  {content.districtLanguage.callToAction}
                </p>
                <Link href="/opportunity-list" style={{
                  display: 'inline-block',
                  marginTop: 12,
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: d.color,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${d.color}40`,
                  paddingBottom: 2,
                }}>
                  Join Opportunity List &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features section */}
      <section style={{
        background: 'var(--black)',
        padding: 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        borderTop: `1px solid ${d.color}10`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 24 }}>
            <div className="section-label-line" style={{ background: d.color }} />
            <span className="section-label-text" style={{ color: d.color }}>Features &amp; Resources</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2,
          }}>
            {d.features.map((f, fi) => (
              <div key={f} style={{
                background: 'var(--deep)',
                border: '1px solid rgba(201,168,76,0.06)',
                padding: '28px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}>
                <span style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.6rem',
                  color: `${d.color}30`,
                  minWidth: 40,
                  lineHeight: 1,
                }}>
                  {String(fi + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.65)', flex: 1 }}>{f}</span>
                <div style={{ width: 6, height: 6, background: d.color, borderRadius: '50%', opacity: 0.4, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passport + Dashboard Return */}
      <section style={{
        background: 'var(--deep)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {/* Passport */}
            <div style={{
              border: '1px solid rgba(201,168,76,0.15)',
              padding: '32px',
              background: 'rgba(201,168,76,0.02)',
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 12,
              }}>
                Coast Passport
              </div>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.6rem',
                color: 'var(--gold)',
                letterSpacing: '0.04em',
                marginBottom: 10,
              }}>
                Collect Your Stamp
              </h3>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.4)',
                lineHeight: 1.7,
                marginBottom: 16,
              }}>
                Visit this district. Earn XP. Track your progress across all of Scott-King Coast.
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Link href="/passport" style={{ textDecoration: 'none' }}>
                  <div className="btn-primary" style={{ padding: '10px 18px' }}><span>Claim Stamp &rarr;</span></div>
                </Link>
                <div style={{
                  border: '2px solid rgba(201,168,76,0.2)',
                  padding: '8px 16px',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(201,168,76,0.3)',
                  transform: 'rotate(-3deg)',
                }}>
                  {d.passportStamp}
                </div>
              </div>
            </div>

            {/* Dashboard return */}
            <div style={{
              border: `1px solid ${d.color}20`,
              padding: '32px',
              background: `${d.color}05`,
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: `${d.color}80`,
                marginBottom: 12,
              }}>
                Your Dashboard
              </div>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.6rem',
                color: d.color,
                letterSpacing: '0.04em',
                marginBottom: 10,
              }}>
                Return Hub
              </h3>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.4)',
                lineHeight: 1.7,
                marginBottom: 16,
              }}>
                Track your lane, see your next actions, and navigate back to any district from one place.
              </p>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: `${d.color}20`,
                  border: `1px solid ${d.color}40`,
                  color: d.color,
                  padding: '10px 18px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                }}>
                  Go To Dashboard &rarr;
                </div>
              </Link>
            </div>

            {/* Opportunity List */}
            <div style={{
              border: '1px solid rgba(201,168,76,0.15)',
              padding: '32px',
              background: 'rgba(201,168,76,0.02)',
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 12,
              }}>
                Get Drops From This District
              </div>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.6rem',
                color: 'var(--gold)',
                letterSpacing: '0.04em',
                marginBottom: 10,
              }}>
                Opportunity List
              </h3>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.4)',
                lineHeight: 1.7,
                marginBottom: 16,
              }}>
                {content?.districtLanguage.greeting || 'Join the list.'} Free resources, updates, and opportunities from {d.name}.
              </p>
              <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
                <div className="btn-primary" style={{ padding: '10px 18px' }}>
                  <span>Join Free &rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Districts */}
      <section style={{
        background: 'var(--black)',
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
              View All Districts &rarr;
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
