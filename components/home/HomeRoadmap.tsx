'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const steps = [
  {
    num: '01',
    title: 'Free Content',
    subtitle: 'YouTube · TikTok · Short-form',
    desc: 'Start with free videos, breakdowns, and educational content across all eight divisions. Zero investment required.',
    icon: '▶',
    color: 'var(--gold)',
  },
  {
    num: '02',
    title: 'Downloadable Guides',
    subtitle: 'PDFs · Cheat Sheets · Starter Packs',
    desc: 'Grab targeted free guides for your lane — gold trading, courier income, food biz, or fantasy. Deep dives, no charge.',
    icon: '📄',
    color: 'var(--gold)',
  },
  {
    num: '03',
    title: 'Community',
    subtitle: 'Forum · Accountability · Live Sessions',
    desc: 'Join the inner circle. Connect with builders in every lane, get feedback, share wins, and stay accountable.',
    icon: '🏛',
    color: 'var(--red)',
  },
  {
    num: '04',
    title: 'Products & Playbooks',
    subtitle: 'Ebooks · Templates · Systems',
    desc: 'When you\'re ready to go deeper, grab a playbook. Full frameworks for execution in every income lane.',
    icon: '📚',
    color: 'var(--red)',
  },
  {
    num: '05',
    title: 'Execution',
    subtitle: 'Apply · Test · Iterate',
    desc: 'Take the knowledge into the real world. Execute the plan, track results, refine the approach, and scale.',
    icon: '🎯',
    color: '#7a6230',
  },
  {
    num: '06',
    title: 'Ownership',
    subtitle: 'Assets · Systems · Freedom',
    desc: 'The goal: income that doesn\'t require your constant presence. Own the asset, run the system, live the freedom.',
    icon: '🏆',
    color: '#7a6230',
  },
]

export default function HomeRoadmap() {
  return (
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
          <span className="section-label-text">The Path</span>
        </div>
        <h2 className="section-title">
          YOUR MONEY<br />
          <span style={{ color: 'var(--gold)' }}>MOVE ROADMAP</span>
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 440, lineHeight: 1.8 }}>
          Six steps from zero to ownership. No shortcuts — just the real path.
        </p>
      </motion.div>

      {/* Desktop: horizontal grid. Mobile: stacked */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
      }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: 'var(--deep)',
              padding: '36px 28px',
              position: 'relative',
              borderTop: `2px solid ${s.color}`,
            }}
          >
            {/* Ghost number */}
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '5rem',
              color: 'rgba(201,168,76,0.06)',
              lineHeight: 1,
              position: 'absolute',
              top: 16,
              right: 24,
            }}>
              {s.num}
            </div>

            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{s.icon}</div>

            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.3rem',
              letterSpacing: '0.05em',
              color: s.color,
              marginBottom: 6,
              lineHeight: 1.1,
            }}>
              {s.title}
            </h3>

            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              color: 'rgba(245,240,232,0.35)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              {s.subtitle}
            </p>

            <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', marginTop: 48 }}
      >
        <Link href="/#lead" className="btn-primary">
          <span>Start At Step 1 →</span>
        </Link>
      </motion.div>
    </section>
  )
}
