'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'

const concepts = [
  {
    icon: '📐',
    title: 'Market Structure',
    desc: 'Higher highs, lower lows, break of structure, and change of character. The foundation of how gold actually moves.',
    topics: ['BOS & CHoCH identification', 'Multi-timeframe alignment', 'Trend vs. range reading', 'Structure entry triggers'],
  },
  {
    icon: '💧',
    title: 'Liquidity',
    desc: "Gold hunts stops before it moves. Once you see the sweep pattern, you can't unsee it — it repeats every week.",
    topics: ['Buy-side & sell-side pools', 'Stop hunt identification', 'Sweep + displacement', 'Wick reading'],
  },
  {
    icon: '📦',
    title: 'Fair Value Gaps',
    desc: 'Institutional imbalances that price returns to fill. FVGs are your entry zone blueprint.',
    topics: ['FVG identification', 'Inverted FVG setups', 'Order block confluence', 'Premium vs. discount'],
  },
  {
    icon: '🕐',
    title: 'Sessions',
    desc: 'Asian sets the range. London sweeps it. New York confirms or reverses. The 8AM setup is your edge.',
    topics: ['Asian range building', 'London killzone', 'NY open 8AM play', 'Session overlap dynamics'],
  },
  {
    icon: '📊',
    title: 'Financial Literacy',
    desc: "Markets are the economy made visible. Understanding what's actually moving gold makes you a better trader and a better entrepreneur.",
    topics: ['DXY relationship', 'Macro catalysts for gold', 'Risk-on vs. risk-off', 'Economic calendar basics'],
  },
  {
    icon: '🧠',
    title: 'Mindset & Psychology',
    desc: "The market doesn't beat you — your emotions do. Discipline, journaling, and the patience to wait for the real setup.",
    topics: ['Emotion vs. execution', 'Trade journal system', 'Revenge trade patterns', 'Missing the trade reset'],
  },
]

const freeResources = [
  { title: 'Gold Trading Basics — Beginner Series', type: 'YouTube Playlist', tag: 'Free' },
  { title: 'What Is a Liquidity Sweep?', type: 'YouTube Video', tag: 'Free' },
  { title: 'How to Read a Candlestick Chart', type: 'YouTube Video', tag: 'Free' },
  { title: 'The 8AM Setup Explained', type: 'YouTube Video', tag: 'Free' },
  { title: 'XAUUSD Starter Guide PDF', type: 'Download', tag: 'Free' },
]

export default function TradingChefPage() {
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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Space Mono", monospace' }}>
              Division 01 — Trading Education
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            THE<br />
            <span style={{ color: 'var(--gold)' }}>TRADING</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(201,168,76,0.5)', color: 'transparent' }}>CHEF</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 40, fontFamily: '"Space Mono", monospace' }}
          >
            Gold trading education, chart breakdowns, market structure, liquidity, and financial literacy — for the person who wants to learn how the market actually works, not just follow signals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'rgba(245,240,232,0.6)',
              marginBottom: 40,
              borderLeft: '2px solid var(--gold)',
              paddingLeft: 20,
            }}
          >
            "Read the market like a menu."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>Watch on YouTube →</span>
            </a>
            <Link href="/trading-chef-university" className="btn-secondary">
              Go Deeper — TCU
            </Link>
          </motion.div>
        </div>
      </section>

      <EcosystemMarquee />

      {/* Core Concepts */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">What We Teach</span>
          </div>
          <h2 className="section-title">
            CORE<br />
            <span style={{ color: 'var(--gold)' }}>CONCEPTS</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 480, lineHeight: 1.8 }}>
            Every concept taught here is beginner-accessible, practically grounded, and built to give you real understanding — not just patterns to copy.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {concepts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="module-card"
            >
              <span style={{ fontSize: '1.8rem', marginBottom: 16, display: 'block' }}>{c.icon}</span>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 12 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.72rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', marginBottom: 20 }}>
                {c.desc}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {c.topics.map((t) => (
                  <li key={t} style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Free Resources */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Start Here — Free</span>
          </div>
          <h2 className="section-title">
            FREE<br />
            <span style={{ color: 'var(--gold)' }}>RESOURCES</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 700 }}>
          {freeResources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderBottom: '1px solid rgba(201,168,76,0.08)',
                gap: 16,
              }}
            >
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--cream)', marginBottom: 4 }}>{r.title}</p>
                <span style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: '"Space Mono", monospace' }}>
                  {r.type}
                </span>
              </div>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                background: 'rgba(201,168,76,0.15)',
                color: 'var(--gold)',
                flexShrink: 0,
              }}>
                {r.tag}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <span>Watch on YouTube →</span>
          </a>
          <Link href="/trading-chef-university" className="btn-secondary">
            Join TCU — Go Pro
          </Link>
        </motion.div>
      </section>

      {/* Bridge to TCU */}
      <section style={{ background: 'var(--black)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24, fontFamily: '"Space Mono", monospace' }}>
            Ready to go deeper?
          </p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            THE FREE STUFF<br />
            <span style={{ color: 'var(--gold)' }}>IS JUST THE START</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Trading Chef University is the full curriculum — 6 modules, the 8AM setup, live sessions, and the community. This is where free content becomes real skill.
          </p>
          <Link href="/trading-chef-university" className="btn-primary">
            <span>Enter Trading Chef University →</span>
          </Link>
        </motion.div>
      </section>

      <LeadMagnetForm
        division="trading-chef"
        heading={'GET THE FREE\nGOLD STARTER\nGUIDE'}
        subheading="Sessions, setups, and the one chart pattern every gold trader needs to know before risking a dollar. Free. Instant delivery."
      />
      <Footer />
    </main>
  )
}
