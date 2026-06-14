'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'

const playbooks = [
  {
    num: '01',
    title: 'TCU Gold Starter Guide',
    division: 'Trading Chef University',
    price: 'FREE',
    desc: 'Sessions, setups, and the one chart pattern every gold trader needs to know. Free. Instant delivery.',
    available: true,
    accent: 'var(--gold)',
    cta: 'Get Free',
    href: '/trading-chef-university#lead',
  },
  {
    num: '02',
    title: 'TCU Gold Playbook',
    division: 'Trading Chef University',
    price: '$47',
    desc: 'Complete XAUUSD ebook — all 6 modules, the 8AM setup, FVG & liquidity cheat sheets, trade journal template.',
    available: true,
    accent: 'var(--gold)',
    cta: 'Get The Playbook',
    href: '#',
  },
  {
    num: '03',
    title: 'Medical Courier Starter Guide',
    division: 'Courier Income Lab',
    price: '$37',
    desc: 'Everything to launch a medical courier route — licensing, route types, income math, and landing your first contract.',
    available: true,
    accent: '#3B82F6',
    cta: 'Get The Guide',
    href: '#',
  },
  {
    num: '04',
    title: 'Route Acquisition Playbook',
    division: 'Courier Income Lab',
    price: '$57',
    desc: 'Buy, build, or broker a delivery route. Full valuation, due diligence, and deal structure framework.',
    available: true,
    accent: '#3B82F6',
    cta: 'Get The Playbook',
    href: '#',
  },
  {
    num: '05',
    title: 'Food Pop-Up Blueprint',
    division: 'Breaded Or Not?!',
    price: '$47',
    desc: 'Launch a profitable food pop-up from scratch — location strategy, menu pricing, equipment list, and day-of systems.',
    available: true,
    accent: 'var(--red)',
    cta: 'Get The Blueprint',
    href: '#',
  },
  {
    num: '06',
    title: 'Money Move Starter Pack',
    division: 'All Divisions',
    price: '$27',
    desc: 'Income ideas, templates, and step-by-step systems across all income lanes. Your first money move, mapped out.',
    available: true,
    accent: '#22C55E',
    cta: 'Get The Pack',
    href: '#',
  },
  {
    num: '07',
    title: 'Fantasy Draft Bible 2025',
    division: 'Fantasy Draft Bible',
    price: '$17',
    desc: 'Complete draft guide — rankings, sleepers, ADP analysis, positional strategy, and waiver wire systems.',
    available: true,
    accent: '#F97316',
    cta: 'Get The Bible',
    href: '#',
  },
  {
    num: '08',
    title: 'AI Operator Starter Kit',
    division: 'AI Operator Lab',
    price: '$47',
    desc: 'Claude + ChatGPT automation playbooks for your business OS. Prompt libraries, workflows, and automation systems.',
    available: false,
    accent: '#A855F7',
    cta: 'Coming Soon',
    href: '#',
  },
  {
    num: '09',
    title: 'Income Stack Playbook',
    division: 'All Divisions',
    price: '$57',
    desc: 'Build multiple income streams simultaneously. Research, prioritization, and execution framework across all lanes.',
    available: false,
    accent: 'var(--gold)',
    cta: 'Coming Soon',
    href: '#',
  },
]

export default function PlaybooksPage() {
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
              Division 06 — Digital Products
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            MONEY MOVE<br /><span style={{ color: 'var(--gold)' }}>PLAYBOOKS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 40, fontFamily: '"Space Mono", monospace' }}
          >
            Step-by-step playbooks, blueprints, and systems for every income lane in the ecosystem. Not theory — frameworks you can execute starting today.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(245,240,232,0.6)', borderLeft: '2px solid var(--gold)', paddingLeft: 20 }}
          >
            "Your next move, step by step."
          </motion.p>
        </div>
      </section>

      {/* Playbook grid */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">All Playbooks</span>
          </div>
          <h2 className="section-title">PICK YOUR<br /><span style={{ color: 'var(--gold)' }}>LANE</span></h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 480, lineHeight: 1.8 }}>
            Each playbook targets one income lane. No fluff, no filler — just the framework you need to execute.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {playbooks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              style={{
                background: 'var(--deep)',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden',
                opacity: p.available ? 1 : 0.65,
                borderTop: `2px solid ${p.accent}40`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Ghost number */}
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: 'rgba(201,168,76,0.07)', lineHeight: 1, position: 'absolute', top: 16, right: 20 }}>
                {p.num}
              </div>

              {/* Division tag */}
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                background: `${p.accent}15`,
                color: p.accent,
                display: 'inline-block',
                marginBottom: 16,
              }}>
                {p.division}
              </span>

              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: p.accent, lineHeight: 1, marginBottom: 12 }}>
                {p.price}
              </div>

              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.04em', color: 'var(--cream)', marginBottom: 12, lineHeight: 1.1 }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8, marginBottom: 24 }}>
                {p.desc}
              </p>

              {p.available ? (
                <Link
                  href={p.href}
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: p.accent,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'gap 0.2s',
                  }}
                >
                  {p.cta} →
                </Link>
              ) : (
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  background: 'rgba(201,168,76,0.08)',
                  color: 'rgba(201,168,76,0.4)',
                }}>
                  Coming Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            NOT SURE<br /><span style={{ color: 'var(--gold)' }}>WHERE TO START?</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Grab the free guide first. We'll help you figure out which lane fits your situation — then give you the playbook for it.
          </p>
          <Link href="#lead" className="btn-primary"><span>Get The Free Guide First →</span></Link>
        </motion.div>
      </section>

      <LeadMagnetForm
        division="playbooks"
        heading={'YOUR FIRST\nMONEY MOVE\nPLAYBOOK'}
        subheading="Tell us your lane and we'll send you the right free guide to get started — no upsell, no pressure."
      />
      <Footer />
    </main>
  )
}
