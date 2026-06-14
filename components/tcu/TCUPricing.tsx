'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    label: 'Entry Level',
    name: 'Starter Guide',
    price: 'FREE',
    period: 'Download instantly',
    featured: false,
    features: [
      'Gold Trading Basics PDF',
      'Session timing cheat sheet',
      'Liquidity sweep intro video',
      'Chart setup guide',
      'Email tips series',
    ],
    cta: 'Get Free Guide →',
    href: '#lead',
    stripeKey: null,
  },
  {
    label: 'Full Playbook',
    name: 'Gold Playbook',
    price: '$47',
    period: 'One-time — lifetime access',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Complete TCU Gold Ebook',
      'All 6 core modules written',
      '8AM Setup breakdown',
      'FVG & liquidity cheat sheets',
      'Trade journal template',
      'Session guide + timing PDF',
      'Bonus: Market structure drills',
    ],
    cta: 'Get The Playbook →',
    href: '#',
    stripeKey: 'GOLD_PLAYBOOK',
  },
  {
    label: 'Full Access',
    name: 'TCU Membership',
    price: '$97',
    period: 'Per month — cancel anytime',
    featured: false,
    features: [
      'Everything in Gold Playbook',
      'Weekly live chart sessions',
      'Private Telegram community',
      'Monthly market structure reviews',
      'New lessons added monthly',
      'Direct Q&A access',
      'Priority trade review feedback',
    ],
    cta: 'Join The Kitchen →',
    href: '#',
    stripeKey: 'TCU_MEMBERSHIP',
  },
]

export default function TCUPricing() {
  return (
    <section id="pricing" style={{ background: 'var(--black)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <div className="section-label-line" />
          <span className="section-label-text">Choose Your Path</span>
          <div className="section-label-line" />
        </div>
        <h2 className="section-title">
          START WHERE<br />
          <span style={{ color: 'var(--gold)' }}>YOU ARE</span>
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', marginTop: 12, fontFamily: '"Space Mono", monospace' }}>
          No upsells. No pressure. Just pick what fits your situation right now.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 2,
        alignItems: 'start',
      }}>
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="price-card"
            style={{
              background: p.featured ? 'var(--gold)' : 'var(--deep)',
              transform: p.featured ? 'translateY(-16px)' : 'none',
              position: 'relative',
              zIndex: p.featured ? 2 : 1,
            }}
          >
            {p.badge && (
              <div style={{
                position: 'absolute',
                top: -1, right: 32,
                background: 'var(--red)',
                color: 'var(--cream)',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                padding: '6px 16px',
              }}>
                {p.badge}
              </div>
            )}

            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'block',
              color: p.featured ? 'rgba(6,6,8,0.6)' : 'var(--gold)',
              fontFamily: '"Space Mono", monospace',
            }}>
              {p.label}
            </span>

            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              letterSpacing: '0.05em',
              marginBottom: 8,
              color: p.featured ? 'var(--black)' : 'var(--cream)',
            }}>
              {p.name}
            </div>

            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '4rem',
              lineHeight: 1,
              marginBottom: 4,
              color: p.featured ? 'var(--black)' : 'var(--gold)',
            }}>
              {p.price}
            </div>

            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              marginBottom: 32,
              display: 'block',
              color: p.featured ? 'rgba(6,6,8,0.5)' : 'rgba(245,240,232,0.4)',
              fontFamily: '"Space Mono", monospace',
            }}>
              {p.period}
            </span>

            <div style={{ height: 1, marginBottom: 32, background: p.featured ? 'rgba(6,6,8,0.2)' : 'rgba(201,168,76,0.15)' }} />

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {p.features.map((f) => (
                <li key={f} style={{
                  fontSize: '0.72rem',
                  lineHeight: 1.6,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  color: p.featured ? 'rgba(6,6,8,0.75)' : 'rgba(245,240,232,0.65)',
                }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: p.featured ? 'var(--red)' : 'var(--gold)' }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={p.href}
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                padding: 16,
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                ...(p.featured ? {
                  background: 'var(--black)',
                  color: 'var(--gold)',
                } : {
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--gold)',
                }),
              }}
            >
              {p.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
