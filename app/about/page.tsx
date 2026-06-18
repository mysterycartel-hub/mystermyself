'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'

const timeline = [
  { phase: 'The Start', label: 'The Question', desc: 'What if one place had all the plays? Trading, food, courier, digital — all in one ecosystem.' },
  { phase: 'Phase 1', label: 'Trading Chef', desc: 'Gold trading education goes live. Charts meet culinary energy. The identity finds its voice.' },
  { phase: 'Phase 2', label: 'TCU Launches', desc: 'Trading Chef University opens — 6 modules, the 8AM setup, the community, and the full curriculum.' },
  { phase: 'Phase 3', label: 'Breaded Or Not?!', desc: 'The food brand enters the ecosystem. Wings, hustle, pop-ups, and the business of flavor.' },
  { phase: 'Phase 4', label: 'Courier Income Lab', desc: 'Delivery business research goes deep. Real routes, real math, real frameworks for the road.' },
  { phase: 'Phase 5', label: 'Playbooks Launch', desc: 'Digital products drop. Step-by-step systems for every income lane in the ecosystem.' },
  { phase: 'Phase 6', label: 'Fantasy + AI Lab', desc: 'Fantasy Draft Bible and AI Operator Lab round out the ecosystem. All 8 divisions active.' },
  { phase: 'Now', label: 'Ecosystem OS', desc: 'All eight divisions unified. Skills. Plays. Freedom. Built for real.' },
]

const credentials = [
  { icon: '📍', label: 'West Palm Beach, FL', sub: 'Local roots. Global market focus.' },
  { icon: '📊', label: 'XAUUSD Specialist', sub: 'Gold-only focus for depth over breadth.' },
  { icon: '🍳', label: 'Food Entrepreneur', sub: 'Founder of Breaded Or Not?! — wings, catering, brand.' },
  { icon: '🚚', label: 'Logistics Researcher', sub: 'Medical courier, contract routes, road-based income systems.' },
  { icon: '🤖', label: 'AI Operator', sub: 'Claude, ChatGPT, business automation, and AI-powered systems.' },
  { icon: '📱', label: '@mystermyself', sub: 'Follow the journey in real time.' },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '140px 48px 80px',
        background: 'var(--black)',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-slash" />

        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', width: '100%', maxWidth: 1200 }}
          className="block lg:grid"
        >
          {/* Avatar */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div style={{
                width: 340, height: 420,
                border: '1px solid rgba(201,168,76,0.3)',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.05), rgba(192,57,43,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'visible',
              }}>
                <div style={{ position: 'absolute', top: 16, left: 16, right: -16, bottom: -16, border: '1px solid rgba(201,168,76,0.1)', zIndex: 0 }} />
                <span style={{ fontSize: '8rem', opacity: 0.65, zIndex: 1, position: 'relative' }}>👨🏾‍🍳</span>
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  background: 'var(--gold)', color: 'var(--black)',
                  padding: '14px 22px', fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem', letterSpacing: '0.05em', zIndex: 2,
                }}>
                  MAURICE SCOTT
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Space Mono", monospace' }}>
                The Founder
              </span>
            </div>
            <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}>
              BUILT FROM<br /><span style={{ color: 'var(--gold)' }}>THE KITCHEN</span><br />UP
            </h1>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(245,240,232,0.65)', marginBottom: 24, fontFamily: '"Space Mono", monospace' }}>
              Maurice Scott isn't a Wall Street guy. He's a builder from West Palm Beach who learned trading the hard way — through blown accounts and courses that taught patterns without principles.
            </p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(245,240,232,0.65)', marginBottom: 32, fontFamily: '"Space Mono", monospace' }}>
              The MysterMyself Ecosystem was built around one question: what if one place had all the plays? Trading, food, courier income, digital products — real education, real systems, for real people building real income.
            </p>
            <blockquote style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'rgba(245,240,232,0.7)',
              borderLeft: '2px solid var(--gold)',
              paddingLeft: 20,
              marginBottom: 32,
            }}>
              "Gold doesn't lie. It leaves footprints. You just need to know how to read them."
            </blockquote>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/trading-chef-university" className="btn-primary"><span>See The Curriculum →</span></Link>
              <a href="https://x.com/mystermyself" target="_blank" rel="noopener noreferrer" className="btn-secondary">@mystermyself</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Builder</span>
          </div>
          <h2 className="section-title">WHAT<br /><span style={{ color: 'var(--gold)' }}>MAURICE BUILDS</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {credentials.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              style={{ background: 'var(--black)', padding: '28px', borderTop: '2px solid rgba(201,168,76,0.2)' }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 12 }}>{c.icon}</span>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 6 }}>{c.label}</h3>
              <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6 }}>{c.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Build</span>
          </div>
          <h2 className="section-title">BUILDING THE<br /><span style={{ color: 'var(--gold)' }}>ECOSYSTEM</span></h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {timeline.map((t, i) => (
            <motion.div
              key={t.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 32,
                padding: '24px 0',
                borderBottom: '1px solid rgba(201,168,76,0.08)',
              }}
            >
              <div style={{ minWidth: 80, textAlign: 'right' }}>
                <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.85rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  {t.phase}
                </span>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(201,168,76,0.2)', flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 4 }}>{t.label}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <LeadMagnetForm
        division="about"
        heading={'JOIN THE\nECOSYSTEM'}
        subheading="Get the free Money Move starter guide and plug into the full MysterMyself ecosystem — all eight lanes, one place."
      />
      <Footer />
    </main>
  )
}
