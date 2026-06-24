'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * 6 approved districts only.
 * Fantasy Island and Library Vault are REMOVED per CEO direction.
 */
const DISTRICTS = [
  {
    name: 'Route Harbor',
    description: 'Courier & Logistics Income',
    color: '#0EA5E9',
    emoji: '🚢',
    href: '/coast/route-harbor',
  },
  {
    name: 'Market Marina',
    description: 'Gold Trading & TCU Education',
    color: '#0D9488',
    emoji: '⚓',
    href: '/coast/market-marina',
  },
  {
    name: 'Flavor District',
    description: 'Breaded Or Not?! Food Brand',
    color: '#F97316',
    emoji: '🍗',
    href: '/coast/flavor-district',
  },
  {
    name: 'Blueprint Bay',
    description: 'Business Structure & Legal',
    color: '#6366F1',
    emoji: '📐',
    href: '/coast/blueprint-bay',
  },
  {
    name: 'Creator Pier',
    description: 'Content, YouTube & Digital Products',
    color: '#A855F7',
    emoji: '🎬',
    href: '/coast/creator-pier',
  },
  {
    name: 'Legacy Point',
    description: 'Wealth, Trust & Ownership',
    color: '#EC4899',
    emoji: '🏛️',
    href: '/coast/legacy-point',
  },
]

export default function OpportunityDistricts() {
  return (
    <section style={{
      background: 'var(--deep)',
      padding: '80px 48px',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            display: 'block',
            marginBottom: 12,
          }}>
            Six Districts · Six Income Lanes
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
          }}>
            CHOOSE YOUR <span style={{ color: 'var(--gold)' }}>DISTRICT</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}>
          {DISTRICTS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={d.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="district-opp-card"
                  style={{
                    background: 'var(--black)',
                    border: `1px solid ${d.color}20`,
                    padding: '32px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '2rem', flexShrink: 0 }}>{d.emoji}</span>
                  <div>
                    <h3 style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.3rem',
                      color: d.color,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}>
                      {d.name}
                    </h3>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      color: 'rgba(245,240,232,0.5)',
                      lineHeight: 1.5,
                    }}>
                      {d.description}
                    </p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: d.color, fontSize: '1.2rem', flexShrink: 0 }}>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .district-opp-card:hover {
          border-color: rgba(201,168,76,0.4) !important;
          box-shadow: 0 0 30px rgba(201,168,76,0.08);
          transform: translateX(4px);
        }
      `}</style>
    </section>
  )
}
