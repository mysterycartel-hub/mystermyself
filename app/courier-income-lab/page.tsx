'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// Logistics City framework: Industry=City, Market=Building, Client=Floor, Route=Room
const city = [
  {
    id: 'medical',
    building: 'Medical District',
    icon: '🏥',
    market: 'Medical Courier',
    color: '#c9a84c',
    floors: [
      { client: 'Hospitals & Health Systems', room: 'Lab Specimen Routes', desc: 'Time-sensitive specimen transport between hospitals and reference labs. Recurring daily routes. High volume.' },
      { client: 'Reference Laboratories', room: 'STAT Courier Routes', desc: 'On-demand STAT pickups for urgent specimens. Premium per-run rates. Requires reliability track record.' },
      { client: 'Outpatient Clinics', room: 'Multi-Stop Daily Routes', desc: 'Fixed multi-stop routes serving clusters of clinics. Predictable income, schedulable hours.' },
      { client: 'Blood Banks & Dialysis', room: 'Specialized Transport', desc: 'Temperature-controlled and specialty transport. Requires additional certification. Higher pay.' },
    ],
  },
  {
    id: 'contract',
    building: 'Contract Tower',
    icon: '📋',
    market: 'Contract Delivery',
    color: '#3B82F6',
    floors: [
      { client: 'Amazon DSP', room: 'Last-Mile Routes', desc: 'High-volume residential last-mile delivery. Consistent volume. Requires fleet scaling to maximize.' },
      { client: 'FedEx ISP', room: 'P&D Routes', desc: 'Pickup and delivery routes purchased from FedEx. Asset-based income. Route valuation required.' },
      { client: 'USPS HCR', room: 'Highway Contract Routes', desc: 'USPS highway contract routes. Bid-based acquisition. Long-distance, predictable mileage income.' },
      { client: 'Regional 3PLs', room: 'Dedicated Lanes', desc: 'Third-party logistics dedicated lane contracts. Negotiated rates. Relationship-driven.' },
    ],
  },
  {
    id: 'logistics',
    building: 'Logistics City Hub',
    icon: '🏛️',
    market: 'Route Acquisition',
    color: '#22C55E',
    floors: [
      { client: 'Route Brokers', room: 'Route Marketplace', desc: 'Buying established routes from existing operators. Valuation, due diligence, and financing frameworks.' },
      { client: 'Independent Operators', room: 'Direct Acquisition', desc: 'Direct purchase from retiring or exiting operators. Lower cost, more negotiation leverage.' },
      { client: 'Franchisor Networks', room: 'Franchise Routes', desc: 'Routes within franchise systems (FedEx, USPS). Structured purchase process with corporate approval.' },
      { client: 'Own Operation', room: 'Build From Scratch', desc: 'Starting from zero — licensing, vehicle, first contract. The startup path mapped step by step.' },
    ],
  },
]

const playbooks = [
  { title: 'Medical Courier Starter Guide', price: '$37', desc: 'Licensing, first contract, route types, and the math on what you can actually make.', available: true },
  { title: 'Route Acquisition Playbook', price: '$57', desc: 'Buy, build, or broker a delivery route. Full valuation and due diligence framework.', available: true },
  { title: 'Logistics City Business OS', price: '$77', desc: 'Run a courier operation like a business — fleet, ops, compliance, and scaling systems.', available: false },
]

export default function CourierIncomeLabPage() {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null)
  const [activeFloor, setActiveFloor] = useState<number | null>(null)
  const active = city.find((b) => b.id === activeBuilding)

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
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          top: '50%', left: '40%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, right: '18%', width: 2, height: '100%', background: 'linear-gradient(to bottom, transparent, #3B82F6 30%, #3B82F6 70%, transparent)', opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: '#3B82F6' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontFamily: '"Space Mono", monospace' }}>
              Division 05 — Road-Based Income
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 32 }}
          >
            COURIER<br />
            <span style={{ color: '#3B82F6' }}>INCOME</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(59,130,246,0.5)', color: 'transparent' }}>LAB</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', maxWidth: 520, marginBottom: 32, fontFamily: '"Space Mono", monospace' }}
          >
            Medical courier routes, contract delivery systems, route acquisition, and logistics business frameworks. Real research, real math, real income plays — for the road-based entrepreneur.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(245,240,232,0.6)', marginBottom: 40, borderLeft: '2px solid #3B82F6', paddingLeft: 20 }}
          >
            "The road is your office."
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <Link href="#playbooks" className="btn-primary"><span>Get The Playbook →</span></Link>
            <Link href="#logistics-city" className="btn-secondary">Explore Logistics City</Link>
          </motion.div>
        </div>
      </section>

      {/* Logistics City */}
      <section id="logistics-city" style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Framework</span>
          </div>
          <h2 className="section-title">LOGISTICS<br /><span style={{ color: 'var(--gold)' }}>CITY</span></h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 560, lineHeight: 1.8 }}>
            Every industry is a city. Every market is a building. Every client is a floor. Every route is a room. Click a building to explore the income opportunities inside.
          </p>
        </motion.div>

        {/* City buildings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 2 }}>
          {city.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => { setActiveBuilding(activeBuilding === b.id ? null : b.id); setActiveFloor(null) }}
              style={{
                background: activeBuilding === b.id ? `${b.color}12` : 'var(--black)',
                border: `1px solid ${activeBuilding === b.id ? b.color : 'rgba(201,168,76,0.08)'}`,
                padding: 32,
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Skyline */}
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', marginBottom: 24, height: 56 }}>
                {[...Array(b.floors.length)].map((_, fi) => (
                  <div key={fi} style={{
                    flex: 1,
                    background: activeBuilding === b.id ? b.color : 'rgba(201,168,76,0.2)',
                    height: `${28 + fi * 10}px`,
                    opacity: 0.7,
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
              <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{b.icon}</div>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: activeBuilding === b.id ? b.color : 'var(--cream)', letterSpacing: '0.05em', marginBottom: 8 }}>
                {b.building}
              </h3>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: 12 }}>
                {b.market} · {b.floors.length} income rooms
              </p>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: b.color, fontFamily: '"Space Mono", monospace' }}>
                {activeBuilding === b.id ? 'Collapse ↑' : 'Enter Building →'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Floor detail panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'rgba(6,6,8,0.9)', border: `1px solid ${active.color}25`, padding: '40px 48px' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: active.color, marginBottom: 24, fontFamily: '"Space Mono", monospace' }}>
                  {active.building} — Floors (Click to expand)
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
                  {active.floors.map((floor, fi) => (
                    <div
                      key={fi}
                      onClick={() => setActiveFloor(activeFloor === fi ? null : fi)}
                      style={{
                        background: activeFloor === fi ? `${active.color}10` : 'var(--deep)',
                        border: `1px solid ${activeFloor === fi ? active.color : 'rgba(201,168,76,0.08)'}`,
                        padding: 24,
                        cursor: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: `${active.color}50` }}>
                          {String(fi + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cream)' }}>{floor.client}</p>
                          <p style={{ fontSize: '0.58rem', color: active.color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: '"Space Mono", monospace' }}>{floor.room}</p>
                        </div>
                      </div>
                      <AnimatePresence>
                        {activeFloor === fi && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}
                          >
                            {floor.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Playbooks */}
      <section id="playbooks" style={{ background: 'var(--black)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Products</span>
          </div>
          <h2 className="section-title">COURIER<br /><span style={{ color: 'var(--gold)' }}>PLAYBOOKS</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {playbooks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--deep)',
                padding: '40px 32px',
                border: '1px solid rgba(201,168,76,0.1)',
                opacity: p.available ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {!p.available && (
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', fontFamily: '"Space Mono", monospace' }}>
                  Coming Soon
                </div>
              )}
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: '#3B82F6', lineHeight: 1, marginBottom: 16 }}>
                {p.price}
              </div>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 12 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.8, marginBottom: 24 }}>
                {p.desc}
              </p>
              {p.available ? (
                <Link href="/#lead" style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', textDecoration: 'none' }}>
                  Get It →
                </Link>
              ) : (
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Notify Me
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <LeadMagnetForm
        division="courier-income-lab"
        heading={'YOUR FIRST\nROUTE PLAY'}
        subheading="Get the free courier income starter guide — route types, income math, and how to land your first contract."
      />
      <Footer />
    </main>
  )
}
