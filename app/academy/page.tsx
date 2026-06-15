import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LessonCard from '@/components/academy/LessonCard'
import ProgressTracker from '@/components/academy/ProgressTracker'
import { LESSONS, ACADEMY_MODULES, CHARACTERS, TOTAL_ACADEMY_XP } from '@/lib/academy'

export const metadata = {
  title: 'Trading Chef Academy | Scott-King Coast',
  description: 'Learn to trade using the Trading Chef Universe framework — Bias, Flow, AOI, Delivery, Confirmation, The Pass, Tables Served, Management.',
}

export default function AcademyPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'var(--black)',
        padding: '140px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />

        {/* Ghost text */}
        <div style={{
          position: 'absolute',
          right: -20, bottom: -40,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '22rem',
          color: 'rgba(201,168,76,0.025)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          TCU
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>
            <div className="section-label-line" />
            <span className="section-label-text">V4 · Trading Chef Academy</span>
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: 24,
          }}>
            THE TRADING<br />
            <span style={{ color: 'var(--gold)' }}>CHEF ACADEMY</span>
          </h1>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            lineHeight: 1.9,
            color: 'rgba(245,240,232,0.5)',
            maxWidth: 560,
            marginBottom: 40,
          }}>
            Learn to think in the market — not just react to it. The Trading Chef Universe teaches you to read price through structure, context, and logic. Every lesson earns XP toward your Coast Passport.
          </p>

          {/* Key stats */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            {[
              { num: LESSONS.length, label: 'Lessons' },
              { num: `${TOTAL_ACADEMY_XP.toLocaleString()}`, label: 'Total XP' },
              { num: Object.keys(CHARACTERS).length, label: 'Characters' },
              { num: ACADEMY_MODULES.length, label: 'Modules' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.8rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.25)',
                  marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/academy/candles" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Start Lesson 1 →</span></div>
            </Link>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Open Market Kitchen</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress tracker */}
      <section style={{ background: 'var(--deep)', padding: '0 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
          <ProgressTracker />
        </div>
      </section>

      {/* Characters intro */}
      <section style={{
        background: 'var(--black)',
        padding: '60px 48px',
        borderTop: '1px solid rgba(201,168,76,0.06)',
        borderBottom: '1px solid rgba(201,168,76,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 32 }}>
            <div className="section-label-line" />
            <span className="section-label-text">Your Instructors</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2,
          }}>
            {Object.values(CHARACTERS).map((c) => (
              <div
                key={c.id}
                style={{
                  background: c.role === 'alert'
                    ? 'rgba(239,68,68,0.03)'
                    : c.role === 'warning'
                    ? 'rgba(245,158,11,0.03)'
                    : 'rgba(245,240,232,0.015)',
                  border: `1px solid ${
                    c.role === 'alert'   ? 'rgba(239,68,68,0.15)'    :
                    c.role === 'warning' ? 'rgba(245,158,11,0.12)'   :
                    'rgba(245,240,232,0.06)'
                  }`,
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{c.emoji}</div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem',
                  color: c.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.45rem',
                  color: 'rgba(245,240,232,0.25)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  {c.title}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.4)',
                  fontStyle: 'italic',
                }}>
                  &ldquo;{c.catchphrase.split('—')[0].trim()}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules + Lesson Grid */}
      {ACADEMY_MODULES.map((mod) => (
        <section
          key={mod.id}
          style={{
            background: 'var(--deep)',
            padding: '60px 48px',
            borderBottom: '1px solid rgba(201,168,76,0.05)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Module header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.48rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.4)',
                marginBottom: 8,
              }}>
                {mod.id}
              </div>
              <h2 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '2rem',
                color: 'var(--cream)',
                letterSpacing: '0.04em',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {mod.name}
              </h2>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.35)',
                maxWidth: 500,
                margin: 0,
              }}>
                {mod.description}
              </p>
            </div>

            {/* Lesson cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 2,
            }}>
              {mod.lessonIds.map((slug, i) => {
                const lesson = LESSONS.find(l => l.id === slug)
                if (!lesson) return null
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    index={i}
                  />
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Kitchen CTA */}
      <section style={{
        background: 'var(--black)',
        padding: '80px 48px',
        textAlign: 'center',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🍳</div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            marginBottom: 16,
          }}>
            Ready to Cook?
          </h2>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.68rem',
            lineHeight: 1.9,
            color: 'rgba(245,240,232,0.45)',
            marginBottom: 32,
          }}>
            Apply everything you learn in the Market Kitchen — live TradingView charts, AI Coach analysis, and your own Recipe journal.
          </p>
          <Link href="/kitchen" style={{ textDecoration: 'none' }}>
            <div className="btn-primary" style={{ display: 'inline-flex' }}>
              <span>Open the Market Kitchen →</span>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
