'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'

const perks = [
  { icon: '💬', title: 'Real Talk Forum', desc: "Ask questions, share wins, get feedback from people actually doing the work — not just talking about it." },
  { icon: '📊', title: 'Weekly Chart Reviews', desc: 'Live XAUUSD breakdowns and community Q&A. Real chart, real setups, real talk.' },
  { icon: '⚡', title: 'Early Access', desc: 'Playbooks, guides, and drops land in the community first. Members get it before anyone else.' },
  { icon: '🛡', title: 'Accountability Groups', desc: 'Small groups organized by income lane. Progress, not perfection. Accountability is real.' },
  { icon: '🏆', title: 'Wins Spotlight', desc: 'First route. First profitable trade. First pop-up. Every win gets recognized. Community momentum is real.' },
  { icon: '👥', title: 'Direct Access', desc: 'Connect directly with Maurice Scott and the ecosystem team. Not through a bot — for real.' },
]

const tiers = [
  {
    name: 'Free Access',
    price: 'FREE',
    features: ['Ecosystem newsletter', 'Free guides & downloads', 'Public YouTube content', 'Discord community (read)'],
    cta: 'Join Free',
    featured: false,
  },
  {
    name: 'Inner Circle',
    price: '$27/mo',
    features: ['Everything in Free', 'Private Discord community', 'Weekly chart review sessions', 'Accountability group access', 'Early product drops', 'Monthly ecosystem call'],
    cta: 'Join The Inner Circle',
    featured: true,
    badge: 'Launching Soon',
  },
  {
    name: 'VIP Kitchen',
    price: '$97/mo',
    features: ['Everything in Inner Circle', 'TCU membership included', 'Direct Q&A with Maurice', 'All playbooks included', 'Priority feedback & review', 'VIP-only sessions'],
    cta: 'Join VIP Kitchen',
    featured: false,
  },
]

export default function CommunityPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '140px 48px 80px',
        background: 'var(--black)',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Space Mono", monospace' }}>
              Inner Circle
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            THE<br /><span style={{ color: 'var(--gold)' }}>COMMUNITY</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 40, fontFamily: '"Space Mono", monospace' }}
          >
            You don't build a money move alone. The community is where the work happens, wins get shared, and the ecosystem comes alive. Every lane. One table.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <Link href="#lead" className="btn-primary"><span>Join The Waitlist →</span></Link>
            <Link href="#tiers" className="btn-secondary">See Membership Tiers</Link>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">What You Get</span>
          </div>
          <h2 className="section-title">INSIDE THE<br /><span style={{ color: 'var(--gold)' }}>KITCHEN</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 2 }}>
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass-card"
              style={{ padding: '32px 28px' }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: 16, display: 'block' }}>{p.icon}</span>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <div className="section-label-line" />
            <span className="section-label-text">Membership Tiers</span>
            <div className="section-label-line" />
          </div>
          <h2 className="section-title">PICK YOUR<br /><span style={{ color: 'var(--gold)' }}>SEAT</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="price-card"
              style={{
                background: t.featured ? 'var(--gold)' : 'var(--deep)',
                transform: t.featured ? 'translateY(-12px)' : 'none',
                position: 'relative', zIndex: t.featured ? 2 : 1,
              }}
            >
              {t.badge && (
                <div style={{ position: 'absolute', top: -1, right: 24, background: 'var(--red)', color: 'var(--cream)', fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', padding: '5px 14px' }}>
                  {t.badge}
                </div>
              )}
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', color: t.featured ? 'var(--black)' : 'var(--cream)', marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3.5rem', color: t.featured ? 'var(--black)' : 'var(--gold)', lineHeight: 1, marginBottom: 4 }}>{t.price}</div>
              <div style={{ height: 1, margin: '24px 0', background: t.featured ? 'rgba(6,6,8,0.2)' : 'rgba(201,168,76,0.15)' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {t.features.map((f) => (
                  <li key={f} style={{ fontSize: '0.72rem', lineHeight: 1.6, display: 'flex', gap: 10, alignItems: 'flex-start', color: t.featured ? 'rgba(6,6,8,0.75)' : 'rgba(245,240,232,0.65)' }}>
                    <span style={{ color: t.featured ? 'var(--red)' : 'var(--gold)', flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="#lead" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none', padding: 14,
                fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: t.featured ? 'var(--black)' : 'transparent',
                color: t.featured ? 'var(--gold)' : 'var(--gold)',
                border: t.featured ? 'none' : '1px solid rgba(201,168,76,0.3)',
                transition: 'all 0.2s',
              }}>
                {t.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <LeadMagnetForm
        division="community"
        heading={'JOIN THE\nINNER CIRCLE\nWAITLIST'}
        subheading="Be first in the door when the community launches. Drop your info and we'll notify you the moment the doors open."
      />
      <Footer />
    </main>
  )
}
