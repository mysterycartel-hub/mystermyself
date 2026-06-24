'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface DistrictAction {
  id: string
  emoji: string
  name: string
  brand: string
  color: string
  purpose: string
  audience: string
  cta: string
  href: string
}

const districts: DistrictAction[] = [
  {
    id: 'market-marina',
    emoji: '⚓',
    name: 'Market Marina',
    brand: 'Trading Chef / TCU',
    color: '#0D9488',
    purpose: 'Gold trading education. XAUUSD market structure, liquidity, and the 8-step Trading Chef framework.',
    audience: 'Beginners who want to actually understand the market.',
    cta: 'Enter Market Marina',
    href: '/coast/market-marina',
  },
  {
    id: 'route-harbor',
    emoji: '🚢',
    name: 'Route Harbor',
    brand: 'Knighten Route Transportation',
    color: '#0EA5E9',
    purpose: 'Medical courier income. Pharmacy, lab, and contract delivery routes without job boards.',
    audience: 'Anyone looking for road-based income opportunities.',
    cta: 'Enter Route Harbor',
    href: '/coast/route-harbor',
  },
  {
    id: 'flavor-district',
    emoji: '🍗',
    name: 'Flavor District',
    brand: 'Breaded Or Not?!',
    color: '#F97316',
    purpose: 'Food business systems. Pop-ups, catering, menu development, and brand building.',
    audience: 'Food entrepreneurs turning recipes into revenue.',
    cta: 'Enter Flavor District',
    href: '/coast/flavor-district',
  },
  {
    id: 'blueprint-bay',
    emoji: '📐',
    name: 'Blueprint Bay',
    brand: 'AI Operator Lab',
    color: '#6366F1',
    purpose: 'AI automation tools. Agents, workflows, dashboards, and business operating systems.',
    audience: 'Builders who want AI-powered business infrastructure.',
    cta: 'Enter Blueprint Bay',
    href: '/coast/blueprint-bay',
  },
]

const districts2: DistrictAction[] = [
  {
    id: 'creator-pier',
    emoji: '🎬',
    name: 'Creator Pier',
    brand: 'Newsletter Ready Desk',
    color: '#A855F7',
    purpose: 'Content systems and affiliate income. Newsletter, YouTube, and creator monetization tools.',
    audience: 'Creators building audience-powered income.',
    cta: 'Enter Creator Pier',
    href: '/coast/creator-pier',
  },
  {
    id: 'fantasy-island',
    emoji: '🏈',
    name: 'Fantasy Island',
    brand: 'Fantasy Island',
    color: '#22C55E',
    purpose: 'Fantasy football intelligence. Draft Bible, live rankings, injury alerts, and automation.',
    audience: 'Competitive fantasy players who want an edge.',
    cta: 'Enter Fantasy Island',
    href: '/coast/fantasy-island',
  },
  {
    id: 'legacy-point',
    emoji: '🏛️',
    name: 'Legacy Point',
    brand: 'Scott-King Holdings',
    color: '#EC4899',
    purpose: 'Wealth and ownership systems. Credit, assets, business structure, and long-term building.',
    audience: 'Anyone thinking beyond income into ownership.',
    cta: 'Enter Legacy Point',
    href: '/coast/legacy-point',
  },
  {
    id: 'library-vault',
    emoji: '📚',
    name: 'Library Vault',
    brand: 'Library Vault',
    color: '#c9a84c',
    purpose: 'Free resources and guides. Starter frameworks across every income lane. No purchase required.',
    audience: 'Everyone. Start here if you are not sure where to go.',
    cta: 'Open The Vault',
    href: '/coast/library-vault',
  },
]

const allDistricts = [...districts, ...districts2]

export default function DistrictActionGrid() {
  return (
    <section id="districts" style={{
      background: 'var(--deep)',
      padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 80px)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Enter A District</span>
        </div>
        <h2 className="section-title">
          EIGHT DISTRICTS.<br />
          <span style={{ color: 'var(--gold)' }}>YOUR LANE.</span>
        </h2>
        <p style={{
          fontSize: '0.8rem',
          color: 'rgba(245,240,232,0.45)',
          maxWidth: 500,
          lineHeight: 1.8,
        }}>
          Every district is a real destination. Pick the one that matches where you are now.
          Each one has resources, products, and a community waiting.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
      }}>
        {allDistricts.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            style={{
              background: 'var(--black)',
              border: `1px solid ${d.color}18`,
              padding: 'clamp(24px, 3vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{d.emoji}</span>
              <div>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  color: d.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}>
                  {d.name}
                </h3>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: `${d.color}80`,
                }}>
                  {d.brand}
                </span>
              </div>
            </div>

            {/* Purpose */}
            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.7,
              flexGrow: 1,
            }}>
              {d.purpose}
            </p>

            {/* Audience tag */}
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              color: 'rgba(245,240,232,0.3)',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}>
              For: {d.audience}
            </p>

            {/* Action button */}
            <Link href={d.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '12px 20px',
                background: `${d.color}18`,
                border: `1px solid ${d.color}40`,
                color: d.color,
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                {d.cta} →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom — all districts link */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/coast" style={{ textDecoration: 'none' }}>
          <div className="btn-secondary">
            View Full Coast Map →
          </div>
        </Link>
      </div>
    </section>
  )
}
