'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const districts = [
  {
    id: 'trading',
    name: 'Trading District',
    emoji: '📊',
    buildings: ['Trading Chef', 'TCU Academy', 'Gold Market', 'Chart Room'],
    desc: 'The financial core of Wealth City. Where liquidity flows, market structure is studied, and gold setups are identified.',
    href: '/trading-chef',
    color: '#c9a84c',
    size: 'large',
    floors: ['Market Structure', 'Liquidity Sweeps', 'FVG Lab', 'Session Desk', 'Psychology Suite'],
  },
  {
    id: 'food',
    name: 'Food District',
    emoji: '🍗',
    buildings: ['Breaded HQ', 'The Kitchen', 'Pop-Up Plaza', 'Sauce Lab'],
    desc: 'Where food entrepreneurs build brands. Catering systems, pop-up operations, and food business frameworks.',
    href: '/breaded',
    color: '#c0392b',
    size: 'medium',
    floors: ['Menu Development', 'Pop-Up Systems', 'Brand Strategy', 'Catering Ops'],
  },
  {
    id: 'logistics',
    name: 'Logistics District',
    emoji: '🚚',
    buildings: ['Courier HQ', 'Route Center', 'Medical Bay', 'Logistics City Hub'],
    desc: 'The road-based income engine. Medical courier routes, contract delivery systems, and logistics business frameworks.',
    href: '/courier-income-lab',
    color: '#3B82F6',
    size: 'medium',
    floors: ['Medical Routes', 'Contract Delivery', 'Route Math', 'Vehicle Ops'],
  },
  {
    id: 'ownership',
    name: 'Ownership District',
    emoji: '🏛️',
    buildings: ['Market Kitchen', 'Creator Studio', 'Asset Vault', 'Equity Tower'],
    desc: 'Business infrastructure, creator economy, and ownership education. Building real assets, not just followers.',
    href: '/about',
    color: '#7a6230',
    size: 'small',
    floors: ['Business OS', 'Creator Hub', 'Asset Building', 'Equity Strategy'],
  },
  {
    id: 'creator',
    name: 'Creator District',
    emoji: '🎬',
    buildings: ['Playbooks HQ', 'Fantasy Lab', 'AI Operator Studio', 'Content Engine'],
    desc: 'Digital products, fantasy football, AI automation, and the content systems that power the whole ecosystem.',
    href: '/playbooks',
    color: '#22C55E',
    size: 'small',
    floors: ['Playbook Library', 'Fantasy Database', 'AI Workflows', 'Content Systems'],
  },
]

export default function WealthCity() {
  const [active, setActive] = useState<string | null>(null)
  const activeDistrict = districts.find((d) => d.id === active)

  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
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
          <span className="section-label-text">The Map</span>
        </div>
        <h2 className="section-title">
          WEALTH<br />
          <span style={{ color: 'var(--gold)' }}>CITY</span>
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 440, lineHeight: 1.8 }}>
          The MysterMyself ecosystem mapped as a city. Each district is a business pillar. Click to explore.
        </p>
      </motion.div>

      {/* City map */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, minHeight: 400 }}>
        {/* Trading district — large */}
        {districts.map((d, i) => {
          const span = d.size === 'large' ? 5 : d.size === 'medium' ? 4 : 3
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(active === d.id ? null : d.id)}
              className="district-card"
              style={{
                gridColumn: `span ${span}`,
                padding: 28,
                borderColor: active === d.id ? d.color : 'rgba(201,168,76,0.1)',
                boxShadow: active === d.id ? `0 0 40px ${d.color}20` : 'none',
                minHeight: 180,
              }}
            >
              {/* Building skyline visual */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginBottom: 20, height: 48 }}>
                {d.buildings.map((_, bi) => (
                  <div
                    key={bi}
                    style={{
                      flex: 1,
                      background: active === d.id ? d.color : 'rgba(201,168,76,0.15)',
                      height: `${30 + (bi % 3) * 15}px`,
                      transition: 'all 0.3s ease',
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '1.4rem' }}>{d.emoji}</span>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.05em',
                  color: active === d.id ? d.color : 'var(--cream)',
                  lineHeight: 1,
                }}>
                  {d.name}
                </h3>
              </div>

              <p style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6 }}>
                {d.buildings.join(' · ')}
              </p>

              <div style={{
                marginTop: 12,
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: d.color,
                fontFamily: '"Space Mono", monospace',
              }}>
                {active === d.id ? 'Click to collapse ↑' : 'Click to explore →'}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeDistrict && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden', marginTop: 2 }}
          >
            <div style={{
              background: 'rgba(6,6,8,0.8)',
              border: `1px solid ${activeDistrict.color}30`,
              padding: '40px 48px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
            }}>
              <div>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  color: activeDistrict.color,
                  letterSpacing: '0.05em',
                  marginBottom: 16,
                }}>
                  {activeDistrict.emoji} {activeDistrict.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.8, marginBottom: 24 }}>
                  {activeDistrict.desc}
                </p>
                <Link
                  href={activeDistrict.href}
                  className="btn-primary"
                  style={{ display: 'inline-flex' }}
                >
                  <span>Enter District →</span>
                </Link>
              </div>

              <div>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: activeDistrict.color, marginBottom: 20, fontFamily: '"Space Mono", monospace' }}>
                  Floors / Areas
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {activeDistrict.floors.map((floor, fi) => (
                    <div key={floor} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                    }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.2rem',
                        color: `${activeDistrict.color}50`,
                        minWidth: 32,
                      }}>
                        {String(fi + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.65)' }}>
                        {floor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
