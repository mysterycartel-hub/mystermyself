'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  { icon: '📊', title: 'Draft Rankings Database', desc: 'Positional rankings updated through the season. PPR, standard, and half-PPR. Sortable, filterable.' },
  { icon: '💤', title: 'Sleeper Research', desc: 'Under-the-radar players positioned to outperform their ADP. Where the real value hides every draft.' },
  { icon: '📈', title: 'ADP Analysis', desc: 'Average draft position breakdowns — who is being over/undervalued and why. Draft smart, not popular.' },
  { icon: '🎯', title: 'Draft Strategy Guides', desc: 'Snake vs. auction, positional scarcity, roster construction, and the draft philosophies that win leagues.' },
  { icon: '🔄', title: 'Waiver Wire Systems', desc: 'In-season waiver wire frameworks. How to prioritize claims, what to look for, and when to act fast.' },
  { icon: '🏆', title: 'Playoff Scheduling', desc: 'Schedule analysis for the fantasy playoff weeks. Who has the easiest path when it matters most.' },
]

export default function FantasyPage() {
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
        <div style={{
          position: 'absolute',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
          top: '50%', left: '40%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: '#F97316' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316', fontFamily: '"Space Mono", monospace' }}>
              Division 07 — Fantasy Football
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            FANTASY<br />
            <span style={{ color: '#F97316' }}>DRAFT</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(249,115,22,0.5)', color: 'transparent' }}>BIBLE</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 32, fontFamily: '"Space Mono", monospace' }}
          >
            The complete fantasy football resource — draft rankings, sleeper research, ADP analysis, and the strategy guides that actually win leagues. Draft smart. Win bigger.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <Link href="/#lead" style={{
              background: '#F97316', color: 'var(--black)', padding: '18px 40px',
              fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 12,
            }}>
              Get The Draft Bible →
            </Link>
            <Link href="/#lead" className="btn-secondary">Join The Waitlist</Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">What's Inside</span>
          </div>
          <h2 className="section-title">DRAFT LIKE<br /><span style={{ color: 'var(--gold)' }}>YOU STUDIED</span></h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 480, lineHeight: 1.8 }}>
            Every tool and resource in the Fantasy Draft Bible is built to give you an edge — not just opinions, but frameworks.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 2 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{ background: 'var(--deep)', padding: '36px 28px', borderTop: '2px solid rgba(249,115,22,0.3)' }}
            >
              <span style={{ fontSize: '2rem', marginBottom: 16, display: 'block' }}>{f.icon}</span>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: '#F97316', marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <div className="section-label-line" />
            <span className="section-label-text">2025 Season</span>
            <div className="section-label-line" />
          </div>
          <h2 className="section-title">FANTASY DRAFT<br /><span style={{ color: 'var(--gold)' }}>BIBLE 2025</span></h2>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', color: '#F97316', lineHeight: 1, marginBottom: 8 }}>$17</div>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em', marginBottom: 32 }}>
            One-time — full 2025 season access
          </p>
          <Link href="/#lead" style={{
            background: '#F97316', color: 'var(--black)', padding: '18px 48px',
            fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 12,
          }}>
            Get The Bible →
          </Link>
        </motion.div>
      </section>

      <LeadMagnetForm
        division="fantasy"
        heading={'DRAFT SMART.\nWIN BIGGER.'}
        subheading="Get notified when the 2025 Fantasy Draft Bible drops — plus a free sleeper watchlist to hold you over."
      />
      <Footer />
    </main>
  )
}
