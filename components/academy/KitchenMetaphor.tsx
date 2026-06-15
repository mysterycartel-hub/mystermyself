'use client'

import { motion } from 'framer-motion'

interface Props {
  kitchenStory: string
  marketTranslation: string
}

export default function KitchenMetaphor({ kitchenStory, marketTranslation }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
    >
      {/* Kitchen side */}
      <div style={{
        background: 'rgba(201,168,76,0.04)',
        border: '1px solid rgba(201,168,76,0.15)',
        padding: '28px 28px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #c9a84c, transparent)',
        }} />
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span>🍳</span>
          <span>Kitchen Story</span>
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.68rem',
          lineHeight: 1.9,
          color: 'rgba(245,240,232,0.75)',
          margin: 0,
        }}>
          {kitchenStory}
        </p>
      </div>

      {/* Market side */}
      <div style={{
        background: 'rgba(34,197,94,0.03)',
        border: '1px solid rgba(34,197,94,0.12)',
        padding: '28px 28px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #22C55E, transparent)',
        }} />
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(34,197,94,0.5)',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span>📈</span>
          <span>Market Translation</span>
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.68rem',
          lineHeight: 1.9,
          color: 'rgba(245,240,232,0.75)',
          margin: 0,
        }}>
          {marketTranslation}
        </p>
      </div>
    </motion.div>
  )
}
