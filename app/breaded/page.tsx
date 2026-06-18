'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BREADED, isRealUrl } from '@/lib/social-links'

const pillars = [
  { icon: '🍗', title: 'Wings & Flavor', desc: 'The product is the brand. Flavor profiles, sauce development, and menu strategy that makes people come back.' },
  { icon: '🚐', title: 'Pop-Up Operations', desc: 'Location scouting, event strategy, equipment lists, pricing, and the day-of systems that make a pop-up actually profitable.' },
  { icon: '🍽️', title: 'Catering Systems', desc: 'From first inquiry to final invoice — the catering business framework that scales beyond you.' },
  { icon: '📦', title: 'Brand Building', desc: 'Name, packaging, story, and identity. Building a food brand people recognize and talk about.' },
  { icon: '💰', title: 'Food Business Finance', desc: 'Food cost, margins, pricing strategy, and the numbers that keep a food operation alive.' },
  { icon: '📱', title: 'Content & Community', desc: 'Building an audience around your food — the content strategy that turns followers into customers.' },
]

const comingSoon = [
  'Breaded Or Not?! Pop-Up Blueprint — $47',
  'Food Brand Starter Kit — $37',
  'Catering Business System — $57',
  'Sauce & Flavor Development Guide — $27',
]

export default function BreadedPage() {
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
          background: 'radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)',
          top: '50%', left: '40%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, right: '18%', width: 2, height: '100%', background: 'linear-gradient(to bottom, transparent, var(--red) 30%, var(--red) 70%, transparent)', opacity: 0.5 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: 'var(--red)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--red)', fontFamily: '"Space Mono", monospace' }}>
              Division 03 — Food Business
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            BREADED<br />
            <span style={{ color: 'var(--red)' }}>OR NOT?!</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 32, fontFamily: '"Space Mono", monospace' }}
          >
            Wings, flavor, hustle, catering, pop-ups, and the business of food entrepreneurship. For the cooks who dream bigger and the food hustlers ready to build something real.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(245,240,232,0.6)', marginBottom: 40, borderLeft: '2px solid var(--red)', paddingLeft: 20 }}
          >
            "From the kitchen to the community."
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link href="/opportunity-list" className="btn-red"><span>Get The Food Biz Guide →</span></Link>
            {isRealUrl(BREADED.orderUrl) && (
              <a href={BREADED.orderUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                background: 'var(--red)',
                color: '#fff',
                padding: '14px 28px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Order Now →
              </a>
            )}
            {isRealUrl(BREADED.instagram) && (
              <a href={BREADED.instagram} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                border: '1px solid rgba(192,57,43,0.4)',
                color: 'var(--red)',
                padding: '14px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Instagram →
              </a>
            )}
            {isRealUrl(BREADED.tiktok) && (
              <a href={BREADED.tiktok} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                border: '1px solid rgba(192,57,43,0.4)',
                color: 'var(--red)',
                padding: '14px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                TikTok →
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">What We Cover</span>
          </div>
          <h2 className="section-title">THE FOOD<br /><span style={{ color: 'var(--gold)' }}>BUSINESS PILLARS</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 2 }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{
                background: 'var(--deep)',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ borderTopColor: 'var(--red)' } as any}
            >
              <span style={{ fontSize: '2rem', marginBottom: 16, display: 'block' }}>{p.icon}</span>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 12 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming soon products */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Playbooks — Coming Soon</span>
          </div>
          <h2 className="section-title">FOOD BIZ<br /><span style={{ color: 'var(--gold)' }}>PLAYBOOKS</span></h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 600 }}>
          {comingSoon.map((item, i) => (
            <motion.div
              key={item}
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
              }}
            >
              <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.6)' }}>{item}</span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(192,57,43,0.15)', color: 'var(--red)' }}>
                Notify Me
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ marginTop: 40 }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.5)', marginBottom: 24 }}>
            Drop your email below to get notified when food biz playbooks drop — and grab the free starter guide in the meantime.
          </p>
        </motion.div>
      </section>

      <LeadMagnetForm
        division="breaded"
        heading={'FROM THE\nKITCHEN TO\nTHE MONEY'}
        subheading="Get the free food business starter guide — pop-up setup, pricing basics, and how to turn your cooking into income."
      />
      <Footer />
    </main>
  )
}
