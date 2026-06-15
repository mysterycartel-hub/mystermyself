'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const modules = [
  {
    num: '01',
    icon: '🕯️',
    name: 'Reading Price — Foundation',
    desc: 'Before you can execute The Recipe, you need to read the language of price. Candles, wicks, body ratios, and what each tells you about conviction.',
    topics: [
      'Candle anatomy — body, wick, open/close',
      'Rejection wicks — what they mean',
      'Candle sequences — reading 3 in a row',
      'Bullish vs. bearish delivery signals',
    ],
    lessonLink: '/academy/candles',
    lessonLabel: 'Start Lesson 1 →',
    color: '#22C55E',
  },
  {
    num: '02',
    icon: '🌊',
    name: 'Bias + Flow',
    desc: "Read the direction, then follow where price is drawing. Smart money needs liquidity before it moves — once you see Flow, you can't miss it.",
    topics: [
      'Bias determination — bullish, bearish, neutral',
      'Flow — where is price drawing?',
      'Liquidity pools above and below price',
      'The stop hunt pattern on XAUUSD',
    ],
    lessonLink: '/academy/bias',
    lessonLabel: 'Study Bias →',
    color: '#3B82F6',
  },
  {
    num: '03',
    icon: '🎯',
    name: 'AOI + Structure',
    desc: 'Area of Interest — where will price react? AOI is premium/discount logic applied to real chart zones. Structure is how you identify it.',
    topics: [
      'AOI — premium vs. discount zones',
      'Leftover Containers (imbalances)',
      'Market structure — highs, lows, breaks',
      'Multi-timeframe AOI alignment',
    ],
    lessonLink: '/academy/aoi',
    lessonLabel: 'Study AOI →',
    color: '#F97316',
  },
  {
    num: '04',
    icon: '📦',
    name: 'Delivery + Confirmation',
    desc: 'How price moves matters as much as where it goes. Impulsive delivery vs. corrective delivery tells you whether the move has institutional commitment.',
    topics: [
      'Impulsive vs. corrective delivery',
      'Confirmation candle signals',
      'Rejection wicks at AOI',
      'Engulfing and displacement patterns',
    ],
    lessonLink: '/academy/delivery',
    lessonLabel: 'Study Delivery →',
    color: '#A855F7',
  },
  {
    num: '05',
    icon: '🚪',
    name: 'The Pass + Tables Served',
    desc: "The entry and the target — The Pass is where you enter, Tables Served is where you collect. Never move a target. Never chase The Pass.",
    topics: [
      'The Pass — defining the entry zone',
      '"Do not chase the candle" discipline',
      'Tables Served — target level logic',
      'Partial profit and full exit planning',
    ],
    lessonLink: '/academy/pass',
    lessonLabel: 'Study The Pass →',
    color: '#c9a84c',
  },
  {
    num: '06',
    icon: '🧠',
    name: 'Management + Chef Mindset',
    desc: 'A good cook does not rush the recipe. Burn Point placement, invalidation logic, and the psychology of discipline every session.',
    topics: [
      'Burn Point — stop placement rules',
      'Trade invalidation logic',
      'Melody Mayhem — emotional trading trap',
      'Grandma Market patience protocol',
    ],
    lessonLink: '/academy/management',
    lessonLabel: 'Study Management →',
    color: '#EF4444',
  },
]

export default function TCUCurriculum() {
  return (
    <section id="curriculum" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 64,
        flexWrap: 'wrap',
        gap: 24,
      }}>
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Curriculum</span>
          </div>
          <h2 className="section-title">
            6 MODULES.<br />
            <span style={{ color: 'var(--gold)' }}>ONE SYSTEM.</span>
          </h2>
        </div>
        <div style={{ maxWidth: 420 }}>
          <p style={{
            fontSize: '0.8rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.55)',
            fontFamily: '"Space Mono", monospace',
            marginBottom: 16,
          }}>
            From reading your first candle to executing a full Recipe — six modules that build the complete Trading Chef Universe framework.
          </p>
          <Link href="/academy" style={{ textDecoration: 'none' }}>
            <div className="btn-secondary" style={{ display: 'inline-flex' }}>
              Open the Free Academy →
            </div>
          </Link>
        </div>
      </div>

      {/* Module grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
      }}>
        {modules.map((m, i) => (
          <motion.div
            key={m.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            style={{
              background: 'rgba(245,240,232,0.015)',
              border: '1px solid rgba(245,240,232,0.07)',
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Color accent top */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${m.color}, transparent)`,
            }} />

            {/* Ghost number */}
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '4rem',
              color: `${m.color}10`,
              lineHeight: 1,
              marginBottom: 16,
            }}>
              {m.num}
            </div>

            <span style={{ fontSize: '1.5rem', marginBottom: 16, display: 'block' }}>{m.icon}</span>

            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.3rem',
              letterSpacing: '0.05em',
              color: m.color,
              marginBottom: 12,
              lineHeight: 1.1,
            }}>
              {m.name}
            </div>

            <p style={{
              fontSize: '0.68rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.55)',
              marginBottom: 20,
              fontFamily: '"Space Mono", monospace',
            }}>
              {m.desc}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
              {m.topics.map((t) => (
                <li key={t} style={{
                  fontSize: '0.62rem',
                  color: 'rgba(245,240,232,0.38)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: '"Space Mono", monospace',
                }}>
                  <span style={{
                    width: 4, height: 4,
                    background: m.color,
                    borderRadius: '50%',
                    flexShrink: 0,
                    opacity: 0.7,
                  }} />
                  {t}
                </li>
              ))}
            </ul>

            {/* Lesson link */}
            <Link href={m.lessonLink} style={{ textDecoration: 'none' }}>
              <div style={{
                borderTop: '1px solid rgba(245,240,232,0.06)',
                paddingTop: 16,
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: `${m.color}80`,
                transition: 'color 0.2s',
              }}>
                {m.lessonLabel}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Academy bridge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          marginTop: 2,
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.12)',
          padding: '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 8,
          }}>
            Free · No login required
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.6rem',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            Start with the Free Academy
          </div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: 'rgba(245,240,232,0.35)',
            margin: '8px 0 0',
            lineHeight: 1.6,
          }}>
            13 lessons. Every TCU concept explained step-by-step with characters, kitchen metaphors, practice tasks, and XP rewards.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="/academy" style={{ textDecoration: 'none' }}>
            <div className="btn-primary"><span>Open Academy →</span></div>
          </Link>
          <Link href="/kitchen" style={{ textDecoration: 'none' }}>
            <div className="btn-secondary">Market Kitchen</div>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
