import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Medical Courier Insider Edge | Route Harbor — MysterMyself',
  description:
    'Learn how to find pharmacy, lab, and medical courier opportunities without depending only on job boards or delivery apps. The Route Harbor method.',
}

const BEEHIIV = '/opportunity-list'
const BLUE = '#0EA5E9'

const whatsInside = [
  {
    num: '01',
    title: 'The Opportunity Map',
    desc: "How to identify active medical courier contracts in your metro area — and which client types hire independent couriers vs. agencies.",
  },
  {
    num: '02',
    title: 'Research Without Job Boards',
    desc: "Pharmacy chains, reference labs, hospital systems, and outpatient clinics all source couriers differently. We show you exactly how to find them.",
  },
  {
    num: '03',
    title: 'Route Math',
    desc: "What you can realistically earn per run, per day, per week. No inflated numbers — just the actual math broken down by route type.",
  },
  {
    num: '04',
    title: 'The Route Harbor Method',
    desc: "A step-by-step framework for positioning yourself as a reliable independent courier without an existing track record.",
  },
  {
    num: '05',
    title: 'Your First Contract',
    desc: "How to approach clients, what questions to ask, what to expect in the first conversation, and how to handle the first run.",
  },
  {
    num: '06',
    title: 'Licensing & Compliance Basics',
    desc: "What you actually need to run legally — insurance, vehicle requirements, and HIPAA basics explained in plain language.",
  },
]

const whoThisIsFor = [
  'You want income that doesn\'t rely on a single employer',
  'You have a reliable vehicle and want to put it to work',
  'You\'ve looked at gig apps but want something more consistent',
  'You want to build a route-based business, not just drive for tips',
  'You\'re in a metro area with hospitals, clinics, or reference labs',
  'You\'re willing to do the research and make the calls',
]

const routeHarborMethod = [
  { step: 'Map', label: 'Identify Your Market', desc: 'Find every hospital system, reference lab, and pharmacy chain in your radius.' },
  { step: 'Research', label: 'Find the Decision Maker', desc: 'Locate the logistics, operations, or courier coordinator — not HR.' },
  { step: 'Position', label: 'Build Your Pitch', desc: 'Frame your offer around reliability and availability — the two things clients care about most.' },
  { step: 'Contact', label: 'Make the Ask', desc: 'Scripts, email templates, and call approaches that work for independent couriers.' },
  { step: 'Land', label: 'First Run → First Contract', desc: 'What to do on your first run to lock in repeat business.' },
]

export default function MedicalCourierGuidePage() {
  return (
    <main style={{ background: 'var(--black)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(120px, 15vw, 180px) clamp(20px, 5vw, 80px) 80px',
        background: 'var(--black)',
      }}>
        <div className="hero-grid" />
        <div style={{
          position: 'absolute',
          width: 800, height: 800,
          background: `radial-gradient(circle, ${BLUE}08 0%, transparent 70%)`,
          top: '50%', left: '40%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <Link href="/coast/route-harbor" style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: `${BLUE}70`,
              textDecoration: 'none',
            }}>
              Route Harbor
            </Link>
            <span style={{ color: `${BLUE}30`, fontSize: '0.6rem' }}>›</span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: BLUE,
            }}>
              Medical Courier Insider Edge
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
            background: `${BLUE}15`,
            color: BLUE,
            border: `1px solid ${BLUE}30`,
            marginBottom: 28,
          }}>
            🚢 Route Harbor · Free Resource Hub
          </div>

          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: 28,
          }}>
            THE COURIER<br />
            OPPORTUNITY<br />
            <span style={{ color: BLUE }}>NOBODY&apos;S</span><br />
            TALKING ABOUT
          </h1>

          <p style={{
            fontSize: '0.88rem',
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.9,
            maxWidth: 560,
            marginBottom: 16,
            fontFamily: '"Space Mono", monospace',
          }}>
            Free resource hub covering how to find pharmacy, lab, and medical courier
            opportunities without depending only on job boards or delivery apps.
          </p>

          <p style={{
            fontSize: '0.72rem',
            color: 'rgba(245,240,232,0.35)',
            lineHeight: 1.8,
            maxWidth: 520,
            marginBottom: 40,
          }}>
            Subscribe free to get the first chapter now. The full paid guide is coming soon.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={BEEHIIV} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                background: BLUE,
                color: '#060608',
                padding: '18px 36px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Get The Free Chapter →
              </div>
            </a>
            <Link href="/coast/route-harbor" style={{ textDecoration: 'none' }}>
              <div style={{
                border: `1px solid ${BLUE}50`,
                color: BLUE,
                padding: '18px 36px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                ← Back to Route Harbor
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section id="whats-inside" style={{ background: 'var(--deep)', borderTop: `1px solid ${BLUE}20` }}>
        <div style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            <div className="section-label-line" style={{ background: BLUE }} />
            <span className="section-label-text" style={{ color: BLUE }}>What&apos;s Inside</span>
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            marginBottom: 48,
          }}>
            SIX SECTIONS.<br />
            <span style={{ color: BLUE }}>REAL INCOME RESEARCH.</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
          }}>
            {whatsInside.map((item) => (
              <div key={item.num} style={{
                background: 'var(--black)',
                padding: '32px 28px',
                border: `1px solid ${BLUE}15`,
              }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.5rem',
                  color: `${BLUE}25`,
                  lineHeight: 1,
                  marginBottom: 16,
                }}>
                  {item.num}
                </div>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.3rem',
                  color: BLUE,
                  letterSpacing: '0.04em',
                  marginBottom: 12,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.8,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section style={{ background: 'var(--black)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'start',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: 32 }}>
              <div className="section-label-line" />
              <span className="section-label-text">Who This Is For</span>
            </div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
            }}>
              THIS IS FOR<br />
              <span style={{ color: 'var(--gold)' }}>ROAD-READY</span><br />
              OPERATORS
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {whoThisIsFor.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '20px 0',
                borderBottom: '1px solid rgba(201,168,76,0.07)',
              }}>
                <span style={{
                  color: BLUE,
                  fontSize: '1rem',
                  flexShrink: 0,
                  marginTop: 2,
                }}>✓</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.65)',
                  lineHeight: 1.7,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Route Harbor Method */}
      <section style={{ background: 'var(--deep)', borderTop: `1px solid ${BLUE}20` }}>
        <div style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            <div className="section-label-line" style={{ background: BLUE }} />
            <span className="section-label-text" style={{ color: BLUE }}>The Route Harbor Method</span>
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            marginBottom: 56,
          }}>
            FIVE STEPS.<br />
            <span style={{ color: BLUE }}>FIRST CONTRACT.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {routeHarborMethod.map((item, i) => (
              <div key={item.step} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 2fr',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'start',
                background: 'var(--black)',
                padding: 'clamp(20px, 3vw, 32px) clamp(20px, 3vw, 32px)',
                border: `1px solid ${BLUE}12`,
              }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  color: `${BLUE}30`,
                  lineHeight: 1,
                  minWidth: 32,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    marginBottom: 6,
                  }}>
                    Step — {item.step}
                  </div>
                  <h3 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.3rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                  }}>
                    {item.label}
                  </h3>
                </div>
                <p style={{
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.8,
                  marginTop: 4,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Card + CTA */}
      <section style={{ background: 'var(--black)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}>
          {/* Left: main CTA copy */}
          <div>
            <div className="section-label" style={{ marginBottom: 32 }}>
              <div className="section-label-line" style={{ background: BLUE }} />
              <span className="section-label-text" style={{ color: BLUE }}>Free Resources</span>
            </div>

            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              marginBottom: 24,
            }}>
              START FREE.<br />
              <span style={{ color: BLUE }}>FIRST CHAPTER</span><br />
              DELIVERED NOW.
            </h2>

            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.9,
              marginBottom: 16,
              maxWidth: 420,
            }}>
              Subscribe to The Opportunity List and get the first chapter of Medical Courier
              Insider Edge free. The full guide launches soon at $37 — subscribers get early access.
            </p>

            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.3)',
              fontFamily: '"Space Mono", monospace',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 420,
            }}>
              No payment required. Just subscribe.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={BEEHIIV} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: BLUE,
                  color: '#060608',
                  padding: '18px 36px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Get First Chapter Free →
                </div>
              </a>
            </div>
          </div>

          {/* Right: Price card */}
          <div style={{
            background: 'var(--deep)',
            border: `1px solid ${BLUE}30`,
            padding: 'clamp(32px, 5vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: BLUE }} />

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: BLUE,
              marginBottom: 20,
            }}>
              Medical Courier Insider Edge
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 8 }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '5.5rem',
                color: 'var(--cream)',
                lineHeight: 1,
              }}>
                $37
              </span>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '2.2rem',
                color: 'rgba(245,240,232,0.25)',
                textDecoration: 'line-through',
                lineHeight: 1,
                marginBottom: 10,
              }}>
                $47
              </span>
            </div>

            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.4)',
              fontFamily: '"Space Mono", monospace',
              lineHeight: 1.7,
              marginBottom: 28,
            }}>
              Full guide coming soon. Subscribe free to get the first chapter now and early access when it launches.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {[
                'Digital guide — read on any device',
                'Six sections of real income research',
                'The Route Harbor 5-step method',
                'Route math breakdown included',
                'Free first chapter via newsletter',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: BLUE, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)', fontFamily: '"Space Mono", monospace', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>

            <a href={BEEHIIV} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: BLUE,
                color: '#060608',
                padding: '18px 32px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                Get First Chapter Free →
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Beehiiv Newsletter CTA */}
      <section style={{
        background: `linear-gradient(135deg, ${BLUE}08 0%, rgba(6,6,8,0) 60%)`,
        borderTop: `1px solid ${BLUE}15`,
        borderBottom: `1px solid ${BLUE}15`,
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 80px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: BLUE,
            marginBottom: 16,
          }}>
            MysterMyself Opportunity List
          </p>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            GET THE FIRST<br />
            <span style={{ color: BLUE }}>CHAPTER FREE</span>
          </h2>
          <p style={{
            fontSize: '0.78rem',
            color: 'rgba(245,240,232,0.5)',
            lineHeight: 1.8,
            marginBottom: 32,
          }}>
            Join the Opportunity List and get the first chapter of Medical Courier Insider Edge delivered free.
          </p>
          <a href={BEEHIIV} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{
              background: BLUE,
              color: '#060608',
              padding: '18px 48px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}>
              Join The Opportunity List →
            </div>
          </a>
        </div>
      </section>

      {/* Disclosure footer */}
      <section style={{ background: 'var(--black)', padding: '32px clamp(20px, 5vw, 80px)' }}>
        <p style={{
          fontSize: '0.62rem',
          color: 'rgba(245,240,232,0.2)',
          fontFamily: '"Space Mono", monospace',
          lineHeight: 1.7,
          maxWidth: 720,
        }}>
          <strong style={{ color: 'rgba(245,240,232,0.3)' }}>Disclosure:</strong>{' '}
          As an affiliate, MysterMyself may earn from qualifying purchases. Medical Courier Insider Edge is an
          informational digital guide. Results vary based on market, effort, and individual circumstances.
          This is not a guarantee of income. Always verify licensing and compliance requirements in your
          specific state and market before beginning any courier operation.
        </p>
      </section>

      <Footer />
    </main>
  )
}
