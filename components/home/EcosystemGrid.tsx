'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const divisions = [
  {
    emoji: '📊',
    num: '01',
    title: 'The Trading Chef',
    subtitle: 'Gold · Market Structure · Liquidity · Financial Literacy',
    desc: 'Learn to read gold like a menu. Market structure, liquidity sweeps, institutional concepts, and XAUUSD mastery for the everyday trader.',
    href: '/trading-chef',
    tag: 'Education',
    accent: 'var(--gold)',
  },
  {
    emoji: '🎓',
    num: '02',
    title: 'Trading Chef University',
    subtitle: 'Premium Courses · Community · Mentorship · Membership',
    desc: '6 modules. One system. From market structure foundations to psychology and execution — the complete TCU gold trading curriculum.',
    href: '/trading-chef-university',
    tag: 'Academy',
    accent: 'var(--gold)',
  },
  {
    emoji: '🍗',
    num: '03',
    title: 'Breaded Or Not?!',
    subtitle: 'Food Business · Catering · Brand · Pop-Ups',
    desc: 'Wings, flavor, hustle. The food brand playbook for anyone ready to turn a recipe into a real business with real revenue.',
    href: '/breaded',
    tag: 'Food Biz',
    accent: 'var(--red)',
  },
  {
    emoji: '🏛️',
    num: '04',
    title: 'Market Kitchen',
    subtitle: 'Ecosystem HQ · Charts · Simulation · Live Market',
    desc: 'Market Kitchen is ecosystem headquarters — the live charting workspace and market simulation environment powering the Scott-King Coast financial education system.',
    href: '/kitchen',
    tag: 'Ecosystem HQ',
    accent: '#C9A84C',
  },
  {
    emoji: '🚢',
    num: '05',
    title: 'Route Harbor',
    subtitle: 'Medical Courier · Insider Edge · Contract Routes · Road Income',
    desc: 'Medical Courier Insider Edge lives inside Route Harbor. Find pharmacy, lab, and medical courier opportunities without depending only on job boards or delivery apps.',
    href: '/coast/route-harbor',
    tag: 'Income',
    accent: '#0EA5E9',
  },
  {
    emoji: '📚',
    num: '06',
    title: 'Money Move Playbooks',
    subtitle: 'Digital Guides · Templates · Systems · Blueprints',
    desc: 'Step-by-step playbooks for every income lane in the ecosystem. No fluff — just frameworks you can execute starting today.',
    href: '/playbooks',
    tag: 'Products',
    accent: '#22C55E',
  },
  {
    emoji: '🏈',
    num: '07',
    title: 'Fantasy Draft Bible',
    subtitle: 'Fantasy Football · Draft Tools · Research · Rankings',
    desc: 'The complete fantasy football resource — draft tools, sleeper research, rankings database, and strategy guides for every format.',
    href: '/fantasy',
    tag: 'Fantasy',
    accent: '#F97316',
  },
  {
    emoji: '🤖',
    num: '08',
    title: 'AI Operator Lab',
    subtitle: 'Claude · ChatGPT · Automation · Business OS',
    desc: 'Build your personal business operating system with AI. Automation playbooks, prompt libraries, and Claude workflows for every lane.',
    href: '/about',
    tag: 'AI',
    accent: '#A855F7',
  },
]

export default function EcosystemGrid() {
  return (
    <section style={{ background: 'var(--black)' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">The Divisions</span>
        </div>
        <h2 className="section-title">
          EXPLORE THE<br />
          <span style={{ color: 'var(--gold)' }}>ECOSYSTEM</span>
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 480, lineHeight: 1.8 }}>
          Eight divisions. Every income lane. One unified platform for building your next money move.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 2,
      }}>
        {divisions.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
          >
            <Link href={d.href} style={{ textDecoration: 'none', display: 'block' }}>
              <div className="division-card" style={{ height: '100%' }}>
                {/* Ghost number */}
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '4rem',
                  color: 'rgba(201,168,76,0.08)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {d.num}
                </div>

                {/* Emoji + tag row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: '2rem' }}>{d.emoji}</span>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    background: `${d.accent}20`,
                    color: d.accent,
                    border: `1px solid ${d.accent}40`,
                  }}>
                    {d.tag}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.4rem',
                  letterSpacing: '0.04em',
                  color: d.accent,
                  marginBottom: 6,
                  lineHeight: 1.1,
                }}>
                  {d.title}
                </h3>

                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(245,240,232,0.35)',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  lineHeight: 1.5,
                }}>
                  {d.subtitle}
                </p>

                <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>
                  {d.desc}
                </p>

                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: d.accent,
                  }}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
