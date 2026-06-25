'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { districts } from '@/lib/districts'

const mapNodes = [
  { id: 'founder-island',  cx: 50,  cy: 44, r: 28, label: 'FOUNDER\nISLAND' },
  { id: 'market-marina',   cx: 72,  cy: 28, r: 22, label: 'MARKET\nMARINA' },
  { id: 'route-harbor',    cx: 22,  cy: 32, r: 22, label: 'ROUTE\nHARBOR' },
  { id: 'blueprint-bay',   cx: 35,  cy: 66, r: 18, label: 'BLUEPRINT\nBAY' },
  { id: 'creator-pier',    cx: 75,  cy: 64, r: 18, label: 'CREATOR\nPIER' },
  { id: 'flavor-district', cx: 16,  cy: 62, r: 16, label: 'FLAVOR\nDISTRICT' },
  { id: 'legacy-point',    cx: 60,  cy: 18, r: 20, label: 'LEGACY\nPOINT' },
  { id: 'fantasy-island',  cx: 84,  cy: 78, r: 16, label: 'FANTASY\nISLAND' },
  { id: 'library-vault',   cx: 44,  cy: 80, r: 14, label: 'LIBRARY\nVAULT' },
]

const connections = [
  ['founder-island', 'market-marina'],
  ['founder-island', 'route-harbor'],
  ['founder-island', 'blueprint-bay'],
  ['founder-island', 'creator-pier'],
  ['founder-island', 'legacy-point'],
  ['market-marina',  'legacy-point'],
  ['route-harbor',   'flavor-district'],
  ['blueprint-bay',  'library-vault'],
  ['creator-pier',   'fantasy-island'],
  ['legacy-point',   'market-marina'],
]

export default function ScottKingCoastMap() {
  const [active, setActive] = useState<string | null>(null)
  const [ambientNode, setAmbientNode] = useState<string | null>(null)
  const ambientTimer = useRef<NodeJS.Timeout | null>(null)
  const activeDistrict = districts.find((d) => d.id === active)

  // Ambient auto-cycle: highlights nodes one by one when nothing is selected
  useEffect(() => {
    if (active) {
      setAmbientNode(null)
      if (ambientTimer.current) clearInterval(ambientTimer.current)
      return
    }

    let idx = 0
    ambientTimer.current = setInterval(() => {
      setAmbientNode(mapNodes[idx % mapNodes.length].id)
      idx++
    }, 2500)

    return () => {
      if (ambientTimer.current) clearInterval(ambientTimer.current)
    }
  }, [active])

  const getNode = (id: string) => mapNodes.find((n) => n.id === id)!
  const getDistrict = (id: string) => districts.find((d) => d.id === id)!

  // Determine which node is "lit" — user selection overrides ambient
  const litNode = active || ambientNode

  return (
    <section style={{
      background: 'var(--deep)',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      borderBottom: '1px solid rgba(201,168,76,0.1)',
      padding: '120px 48px',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64, textAlign: 'center' }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <div className="section-label-line" />
          <span className="section-label-text">V2 · Scott-King Coast</span>
          <div className="section-label-line" />
        </div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          ENTER THE<br />
          <span style={{ color: 'var(--gold)' }}>COAST</span>
        </h2>
        <p style={{
          fontSize: '0.82rem',
          color: 'rgba(245,240,232,0.5)',
          maxWidth: 480,
          lineHeight: 1.8,
          margin: '0 auto',
          fontFamily: '"Space Mono", monospace',
        }}>
          Nine districts. Nine income lanes. One unified universe.<br />
          Click any district to explore or navigate directly.
        </p>
      </motion.div>

      {/* Map container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 2, maxWidth: 1400, margin: '0 auto' }}>
        {/* SVG Map */}
        <div style={{
          background: 'var(--black)',
          border: '1px solid rgba(201,168,76,0.12)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 500,
        }}>
          {/* Animated grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', height: '100%', minHeight: 480, position: 'relative', zIndex: 1 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="glow-coast">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-gold">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Water effect */}
            <rect width="100" height="100" fill="rgba(13,13,30,0.3)" />

            {/* Connection lines */}
            {connections.map(([a, b]) => {
              const na = getNode(a)
              const nb = getNode(b)
              const da = getDistrict(a)
              const isLit = litNode === a || litNode === b
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.cx} y1={na.cy}
                  x2={nb.cx} y2={nb.cy}
                  stroke={isLit ? da.color : 'rgba(201,168,76,0.12)'}
                  strokeWidth={isLit ? 0.4 : 0.2}
                  strokeDasharray="1,1.5"
                  style={{ transition: 'all 0.6s ease' }}
                >
                  {isLit && (
                    <animate
                      attributeName="stroke-opacity"
                      values="0.4;1;0.4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              )
            })}

            {/* District nodes */}
            {mapNodes.map((node) => {
              const d = getDistrict(node.id)
              const isActive = active === node.id
              const isLit = litNode === node.id
              return (
                <g
                  key={node.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActive(isActive ? null : node.id)}
                >
                  {/* Breathing pulse ring — always visible, subtle */}
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={node.r + 3}
                    fill="none"
                    stroke={d.color}
                    strokeWidth="0.2"
                    opacity={isLit ? 0.6 : 0.15}
                    style={{ transition: 'opacity 0.6s' }}
                  >
                    <animate
                      attributeName="r"
                      values={`${node.r + 2};${node.r + 5};${node.r + 2}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values={isLit ? '0.6;0.2;0.6' : '0.15;0.05;0.15'}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Active pulse ring */}
                  {isActive && (
                    <circle
                      cx={node.cx} cy={node.cy}
                      r={node.r + 4}
                      fill="none"
                      stroke={d.color}
                      strokeWidth="0.4"
                      opacity="0.4"
                      style={{ animation: 'coastPulse 2s ease-in-out infinite' }}
                    />
                  )}

                  {/* Outer ring */}
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={node.r + 1.5}
                    fill="none"
                    stroke={isLit ? d.color : 'rgba(201,168,76,0.2)'}
                    strokeWidth="0.3"
                    style={{ transition: 'all 0.6s' }}
                  />

                  {/* Main circle */}
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={node.r}
                    fill={isLit ? `${d.color}20` : 'rgba(13,13,16,0.85)'}
                    stroke={isLit ? d.color : `${d.color}40`}
                    strokeWidth={isLit ? '0.6' : '0.4'}
                    filter={isLit ? 'url(#glow-coast)' : undefined}
                    style={{ transition: 'all 0.5s ease' }}
                  />

                  {/* Emoji */}
                  <text
                    x={node.cx} y={node.cy - 3}
                    textAnchor="middle"
                    fontSize={node.r * 0.55}
                    style={{ userSelect: 'none' }}
                  >
                    {d.emoji}
                  </text>

                  {/* Label lines */}
                  {node.label.split('\n').map((line, li) => (
                    <text
                      key={li}
                      x={node.cx}
                      y={node.cy + 4 + li * 3.2}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill={isLit ? d.color : 'rgba(245,240,232,0.7)'}
                      fontFamily="'Bebas Neue', sans-serif"
                      letterSpacing="0.3"
                      style={{ transition: 'fill 0.5s', userSelect: 'none' }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}
          </svg>

          <style>{`
            @keyframes coastPulse {
              0%, 100% { opacity: 0.4; r: 32; }
              50% { opacity: 0.1; r: 36; }
            }
          `}</style>

          {/* Compass */}
          <div style={{
            position: 'absolute',
            bottom: 20, right: 20,
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'rgba(201,168,76,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
            <span>N</span>
            <span style={{ fontSize: '1.2rem' }}>⊕</span>
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>SCOTT-KING COAST</span>
          </div>
        </div>

        {/* Sidebar — district list + detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--black)', border: '1px solid rgba(201,168,76,0.08)' }}>
          {/* District list */}
          {districts.map((d, i) => (
            <div
              key={d.id}
              onClick={() => setActive(active === d.id ? null : d.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 20px',
                background: litNode === d.id ? `${d.color}10` : 'transparent',
                borderLeft: `3px solid ${litNode === d.id ? d.color : 'transparent'}`,
                cursor: 'none',
                transition: 'all 0.4s ease',
                borderBottom: '1px solid rgba(201,168,76,0.06)',
              }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{d.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  color: litNode === d.id ? d.color : 'var(--cream)',
                  lineHeight: 1,
                  marginBottom: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'color 0.4s',
                }}>
                  {d.name}
                </div>
                <div style={{
                  fontSize: '0.52rem',
                  color: 'rgba(245,240,232,0.3)',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.1em',
                }}>
                  {d.tag}
                </div>
              </div>
              <span style={{
                fontSize: '0.5rem',
                color: d.color,
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.1em',
                flexShrink: 0,
                transition: 'opacity 0.4s',
                opacity: litNode === d.id ? 1 : 0.4,
              }}>
                {litNode === d.id ? '●' : '○'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeDistrict && (
          <motion.div
            key={activeDistrict.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: 'hidden', maxWidth: 1400, margin: '2px auto 0' }}
          >
            <div style={{
              background: 'rgba(6,6,8,0.95)',
              border: `1px solid ${activeDistrict.color}25`,
              padding: '48px 56px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 56,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <span style={{ fontSize: '2.5rem' }}>{activeDistrict.emoji}</span>
                  <div>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.52rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: activeDistrict.color,
                      display: 'block',
                      marginBottom: 6,
                    }}>
                      {activeDistrict.tag} · Scott-King Coast
                    </span>
                    <h3 style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2rem',
                      color: activeDistrict.color,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                    }}>
                      {activeDistrict.name}
                    </h3>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.7rem',
                  fontFamily: '"Space Mono", monospace',
                  color: 'rgba(245,240,232,0.35)',
                  letterSpacing: '0.08em',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}>
                  "{activeDistrict.tagline}"
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}>
                  {activeDistrict.longDescription}
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: activeDistrict.color,
                  marginBottom: 20,
                  fontFamily: '"Space Mono", monospace',
                }}>
                  What&apos;s Here
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {activeDistrict.features.map((f, fi) => (
                    <div key={f} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1rem',
                        color: `${activeDistrict.color}50`,
                        minWidth: 28,
                      }}>
                        {String(fi + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: activeDistrict.color,
                    marginBottom: 20,
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    Passport Stamp
                  </p>
                  <div style={{
                    display: 'inline-block',
                    border: `2px solid ${activeDistrict.color}40`,
                    padding: '16px 28px',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2rem',
                    letterSpacing: '0.25em',
                    color: `${activeDistrict.color}60`,
                    marginBottom: 32,
                    transform: 'rotate(-3deg)',
                  }}>
                    {activeDistrict.passportStamp}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link href={activeDistrict.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: activeDistrict.color,
                      color: '#060608',
                      padding: '16px 32px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}>
                      {activeDistrict.cta} →
                    </div>
                  </Link>
                  {activeDistrict.externalHref && (
                    <Link href={activeDistrict.externalHref} style={{ textDecoration: 'none' }}>
                      <div style={{
                        border: `1px solid ${activeDistrict.color}40`,
                        color: activeDistrict.color,
                        padding: '14px 32px',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}>
                        Go to Division →
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All districts CTA */}
      {!activeDistrict && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <Link href="/coast" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            <div className="btn-primary">
              <span>Explore Full Coast Map →</span>
            </div>
          </Link>
        </motion.div>
      )}
    </section>
  )
}
