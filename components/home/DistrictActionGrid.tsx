'use client'

import { motion } from 'framer-motion'

import Link from 'next/link'

interface DistrictAction {
  id: string
  emoji: string
  name: string
  color: string
  purpose: string
  cta: string
  href: string
  disabled?: boolean
}

const districts: DistrictAction[] = [
  { id: 'route-harbor',    emoji: '🚢', name: 'Route Harbor',    color: '#0EA5E9', purpose: 'Medical courier income and road-based opportunity research.',             cta: 'Enter Route Harbor',    href: '/coast/route-harbor' },
  { id: 'market-marina',   emoji: '⚓', name: 'Market Marina',   color: '#0D9488', purpose: 'XAUUSD trading, market structure, and Trading Chef curriculum.',          cta: 'Enter Market Marina',   href: '/coast/market-marina' },
  { id: 'blueprint-bay',   emoji: '📐', name: 'Blueprint Bay',   color: '#6366F1', purpose: 'AI tools, automations, agents, and business system builds.',              cta: 'Enter Blueprint Bay',   href: '/coast/blueprint-bay' },
  { id: 'fantasy-island',  emoji: '🏈', name: 'Fantasy Island',  color: '#22C55E', purpose: 'Fantasy football, live rankings, Draft Bible, and automation drops.',    cta: 'Enter Fantasy Island',  href: '/coast/fantasy-island' },
  { id: 'creator-pier',    emoji: '🎬', name: 'Creator Pier',    color: '#A855F7', purpose: 'AI tools, affiliate systems, and creator income infrastructure.',         cta: 'Enter Creator Pier',    href: '/coast/creator-pier' },
  { id: 'flavor-district', emoji: '🍗', name: 'Flavor District', color: '#F97316', purpose: 'Food business, pop-up systems, and Breaded Or Not?! brand plays.',        cta: 'Enter Flavor District', href: '/coast/flavor-district' },
  { id: 'library-vault',   emoji: '📚', name: 'Library Vault',   color: '#c9a84c', purpose: 'Free guides, starter frameworks, and resource library.',                  cta: 'View Resources',        href: '/resources' },
  { id: 'legacy-point',    emoji: '🏛️', name: 'Legacy Point',    color: '#EC4899', purpose: 'Ownership education, asset building, and wealth-path systems.',           cta: 'Enter Legacy Point',    href: '/coast/legacy-point' },
]

export default function DistrictActionGrid() {
  return (
    <section id="districts" style={{ background: 'var(--deep)', padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 80px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Scott-King Coast</span>
        </div>
        <h2 className="section-title">
          CHOOSE YOUR<br />
          <span style={{ color: 'var(--gold)' }}>DISTRICT</span>
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', maxWidth: 440, lineHeight: 1.8 }}>
          Nine districts. Every income lane. Pick where you want to start.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
      }}>
        {districts.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
            style={{
              background: 'var(--black)',
              border: `1px solid ${d.color}18`,
              padding: 'clamp(24px, 3vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              opacity: d.disabled ? 0.5 : 1,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{d.emoji}</span>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.2rem',
                color: d.color,
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}>
                {d.name}
              </h3>
            </div>

            {/* Purpose line */}
            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.7,
              flexGrow: 1,
            }}>
              {d.purpose}
            </p>

            {/* Action button */}
            {d.disabled ? (
              <div style={{
                padding: '12px 20px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.25)',
                border: '1px solid rgba(245,240,232,0.1)',
                textAlign: 'center',
                cursor: 'default',
              }}>
                Coming Soon
              </div>
            ) : (
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
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
