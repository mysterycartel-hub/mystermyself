'use client'

import { motion } from 'framer-motion'

interface Props {
  lessonId: string
  visualGuide: string
  tcuTerm: string
}

export default function VisualExample({ visualGuide, tcuTerm }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'var(--deep)',
        border: '1px solid rgba(201,168,76,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
        }}>
          Visual Guide · {tcuTerm}
        </div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.42rem',
          letterSpacing: '0.12em',
          color: 'rgba(245,240,232,0.2)',
          textTransform: 'uppercase',
        }}>
          XAUUSD 1H · Live Chart
        </div>
      </div>

      {/* Chart placeholder */}
      <div style={{
        height: 260,
        background: '#060608',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Candle art - decorative static chart */}
        <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          {/* Simplified candle silhouettes */}
          {[
            { x: 40,  open: 140, close: 100, high: 90,  low: 155, bull: true  },
            { x: 80,  open: 100, close: 120, high: 95,  low: 130, bull: false },
            { x: 120, open: 120, close: 80,  high: 70,  low: 135, bull: true  },
            { x: 160, open: 80,  close: 60,  high: 50,  low: 90,  bull: true  },
            { x: 200, open: 60,  close: 90,  high: 55,  low: 100, bull: false },
            { x: 240, open: 90,  close: 70,  high: 65,  low: 100, bull: true  },
            { x: 280, open: 70,  close: 50,  high: 40,  low: 80,  bull: true  },
            { x: 320, open: 50,  close: 80,  high: 45,  low: 90,  bull: false },
            { x: 360, open: 80,  close: 55,  high: 45,  low: 90,  bull: true  },
            { x: 400, open: 55,  close: 40,  high: 30,  low: 65,  bull: true  },
            { x: 440, open: 40,  close: 70,  high: 35,  low: 80,  bull: false },
            { x: 480, open: 70,  close: 45,  high: 40,  low: 80,  bull: true  },
            { x: 520, open: 45,  close: 30,  high: 20,  low: 55,  bull: true  },
            { x: 560, open: 30,  close: 55,  high: 25,  low: 65,  bull: false },
          ].map((c, i) => (
            <g key={i}>
              {/* Wick */}
              <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={c.bull ? '#22C55E' : '#EF4444'} strokeWidth="1" />
              {/* Body */}
              <rect
                x={c.x - 12}
                y={Math.min(c.open, c.close)}
                width={24}
                height={Math.abs(c.open - c.close) || 2}
                fill={c.bull ? '#22C55E' : '#EF4444'}
                opacity={0.7}
              />
            </g>
          ))}
        </svg>

        {/* Instruction overlay */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 40px',
          maxWidth: 480,
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>🔍</div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.62rem',
            lineHeight: 1.9,
            color: 'rgba(245,240,232,0.7)',
            margin: 0,
          }}>
            {visualGuide}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 24px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.45rem',
        color: 'rgba(245,240,232,0.2)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Open the Market Kitchen for live chart practice →
      </div>
    </motion.div>
  )
}
