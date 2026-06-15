'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const KITCHEN_FEATURES = [
  {
    icon: '📊',
    label: 'Live TradingView Charts',
    desc: 'XAUUSD, EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD — switch instantly between Forex Kitchen and Gold Kitchen.',
    color: '#c9a84c',
  },
  {
    icon: '👨‍🍳',
    label: 'AI Coach — Chef Goldie',
    desc: 'Every symbol change triggers a full TCU analysis: Bias → Flow → AOI → Delivery → Confirmation → The Pass → Tables Served → Management.',
    color: '#c9a84c',
  },
  {
    icon: '📋',
    label: 'The Recipe Journal',
    desc: 'Fill in your own Bias, AOI, Confirmation, and Burn Point for each session. Saved locally. Your private trade journal.',
    color: '#22C55E',
  },
  {
    icon: '⏱️',
    label: 'Timeframe Switcher',
    desc: '5M, 15M, 1H, 4H, 1D — switch context without losing your analysis notes.',
    color: '#3B82F6',
  },
]

const TCU_SYMBOLS = [
  { short: 'XAUUSD', label: 'Gold Kitchen', color: '#c9a84c', note: 'Primary market' },
  { short: 'EURUSD', label: 'Euro Cable',    color: '#3B82F6', note: 'London session' },
  { short: 'GBPUSD', label: 'The Cable',     color: '#22C55E', note: 'Forex Kitchen'  },
  { short: 'USDJPY', label: 'Yen',           color: '#A855F7', note: 'Asia session'   },
  { short: 'AUDUSD', label: 'Aussie',        color: '#F97316', note: 'Commodity-linked'},
  { short: 'USDCAD', label: 'Loonie',        color: '#EC4899', note: 'Oil-correlated' },
]

export default function MarketMarinaKitchen() {
  return (
    <section style={{
      background: 'var(--deep)',
      padding: '80px 48px',
      borderTop: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>
            <div className="section-label-line" />
            <span className="section-label-text">Market Kitchen</span>
          </div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 12,
          }}>
            APPLY WHAT<br />
            <span style={{ color: 'var(--gold)' }}>YOU LEARNED</span>
          </h2>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.4)',
            maxWidth: 480,
            margin: 0,
          }}>
            The Market Kitchen is your live practice environment. TradingView charts, an AI Coach that speaks fluent TCU, and your own Recipe journal — all in one screen.
          </p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {KITCHEN_FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'rgba(245,240,232,0.02)',
                  border: '1px solid rgba(245,240,232,0.06)',
                  padding: '20px 24px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>{f.icon}</span>
                <div>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1rem',
                    color: f.color,
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>
                    {f.label}
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.58rem',
                    lineHeight: 1.75,
                    color: 'rgba(245,240,232,0.45)',
                    margin: 0,
                  }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Symbol grid + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Symbol list */}
            <div style={{
              background: 'rgba(6,6,8,0.6)',
              border: '1px solid rgba(201,168,76,0.1)',
              padding: '24px',
              flex: 1,
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 16,
              }}>
                Available Symbols
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {TCU_SYMBOLS.map((s) => (
                  <div
                    key={s.short}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(245,240,232,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 6, height: 6,
                        borderRadius: '50%',
                        background: s.color,
                        boxShadow: `0 0 6px ${s.color}50`,
                        flexShrink: 0,
                      }} />
                      <div>
                        <div style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '0.9rem',
                          color: s.color,
                          letterSpacing: '0.05em',
                          lineHeight: 1,
                        }}>
                          {s.short}
                        </div>
                        <div style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.38rem',
                          color: 'rgba(245,240,232,0.2)',
                          marginTop: 1,
                        }}>
                          {s.label}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.38rem',
                      color: 'rgba(245,240,232,0.15)',
                      letterSpacing: '0.08em',
                    }}>
                      {s.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              background: 'rgba(239,68,68,0.03)',
              border: '1px solid rgba(239,68,68,0.1)',
              padding: '16px 20px',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🔔</span>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.52rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.35)',
                margin: 0,
              }}>
                The Market Kitchen is an education and journaling tool. Not financial advice. Never trade real money based solely on AI analysis.
              </p>
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.6rem',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              Kitchen Is Open
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.58rem',
              color: 'rgba(245,240,232,0.35)',
              margin: 0,
            }}>
              Full-screen charts + AI Coach + Recipe journal. All in one interface.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Open Market Kitchen →</span></div>
            </Link>
            <Link href="/trading-chef-university" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Join TCU</div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
