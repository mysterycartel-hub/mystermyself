'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const DISTRICTS = [
  {
    name: 'Route Harbor',
    slug: 'route-harbor',
    description: 'Courier & Logistics Income',
    color: '#0EA5E9',
    emoji: '🚢',
  },
  {
    name: 'Market Marina',
    slug: 'market-marina',
    description: 'Gold Trading & TCU Education',
    color: '#0D9488',
    emoji: '⚓',
  },
  {
    name: 'Flavor District',
    slug: 'flavor-district',
    description: 'Breaded Or Not?! Food Brand',
    color: '#F97316',
    emoji: '🍗',
  },
  {
    name: 'Blueprint Bay',
    slug: 'blueprint-bay',
    description: 'Business Structure & Legal',
    color: '#6366F1',
    emoji: '📐',
  },
  {
    name: 'Creator Pier',
    slug: 'creator-pier',
    description: 'Content, YouTube & Digital Products',
    color: '#A855F7',
    emoji: '🎬',
  },
  {
    name: 'Legacy Point',
    slug: 'legacy-point',
    description: 'Wealth, Trust & Ownership',
    color: '#EC4899',
    emoji: '🏛️',
  },
]

export default function DistrictCards() {
  return (
    <section style={{
      background: '#0A0A0C',
      padding: '80px 48px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          marginBottom: 16,
        }}>
          Scott-King Coast · Districts
        </div>

        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '0.02em',
          color: '#F5F0E8',
          marginBottom: 48,
        }}>
          SIX <span style={{ color: '#C9A84C' }}>DISTRICTS</span>. YOUR LANE.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}>
          {DISTRICTS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={`/coast/${d.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="district-hover-card"
                  style={{
                    background: '#060608',
                    border: `1px solid ${d.color}20`,
                    padding: '32px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span style={{ fontSize: '2rem', flexShrink: 0 }}>{d.emoji}</span>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.3rem',
                      color: d.color,
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}>
                      {d.name}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      color: 'rgba(245,240,232,0.5)',
                      letterSpacing: '0.04em',
                    }}>
                      {d.description}
                    </div>
                  </div>
                  <span style={{
                    marginLeft: 'auto',
                    color: `${d.color}60`,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <style>{`
          .district-hover-card:hover {
            border-color: rgba(201,168,76,0.4) !important;
            box-shadow: 0 0 30px rgba(201,168,76,0.06);
            transform: translateX(4px);
          }
        `}</style>
      </div>
    </section>
  )
}
