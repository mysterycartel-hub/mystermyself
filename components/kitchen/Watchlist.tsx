'use client'

import { motion } from 'framer-motion'
import { KitchenSymbol, KITCHEN_SYMBOLS, TIMEFRAMES, Timeframe } from '@/lib/kitchen'

interface Props {
  activeSymbol: KitchenSymbol
  activeTimeframe: Timeframe
  onSymbolChange: (s: KitchenSymbol) => void
  onTimeframeChange: (t: Timeframe) => void
}

export default function Watchlist({
  activeSymbol,
  activeTimeframe,
  onSymbolChange,
  onTimeframeChange,
}: Props) {
  const forex = KITCHEN_SYMBOLS.filter(s => s.group === 'forex')
  const gold  = KITCHEN_SYMBOLS.filter(s => s.group === 'gold')

  const SymbolRow = ({ s }: { s: KitchenSymbol }) => {
    const active = s.id === activeSymbol.id
    return (
      <motion.button
        onClick={() => onSymbolChange(s)}
        whileHover={{ x: 2 }}
        style={{
          width: '100%',
          background: active ? 'rgba(201,168,76,0.08)' : 'transparent',
          border: 'none',
          borderLeft: `2px solid ${active ? '#c9a84c' : 'transparent'}`,
          padding: '10px 16px',
          textAlign: 'left',
          cursor: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.15s',
        }}
      >
        <div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '0.9rem',
            color: active ? '#c9a84c' : 'rgba(245,240,232,0.6)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            transition: 'color 0.15s',
          }}>
            {s.short}
          </div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.38rem',
            color: 'rgba(245,240,232,0.2)',
            marginTop: 2,
            letterSpacing: '0.05em',
          }}>
            {s.label.split(' / ')[0]}
          </div>
        </div>
        {active && (
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: '#c9a84c',
            boxShadow: '0 0 6px rgba(201,168,76,0.6)',
            flexShrink: 0,
          }} />
        )}
      </motion.button>
    )
  }

  const GroupLabel = ({ label }: { label: string }) => (
    <div style={{
      padding: '8px 16px 4px',
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.4rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: 'rgba(245,240,232,0.18)',
    }}>
      {label}
    </div>
  )

  return (
    <div style={{
      width: 180,
      flexShrink: 0,
      background: 'rgba(6,6,8,0.9)',
      borderRight: '1px solid rgba(201,168,76,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.44rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
        }}>
          Watchlist
        </div>
      </div>

      {/* Timeframe selector */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid rgba(201,168,76,0.06)',
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
      }}>
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => onTimeframeChange(tf)}
            style={{
              flex: 1,
              minWidth: 28,
              background: tf.value === activeTimeframe.value ? 'rgba(201,168,76,0.15)' : 'transparent',
              border: `1px solid ${tf.value === activeTimeframe.value ? 'rgba(201,168,76,0.4)' : 'rgba(245,240,232,0.06)'}`,
              color: tf.value === activeTimeframe.value ? '#c9a84c' : 'rgba(245,240,232,0.3)',
              padding: '4px 2px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.05em',
              cursor: 'none',
              transition: 'all 0.15s',
            }}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Symbol groups */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <GroupLabel label="Forex Kitchen" />
        {forex.map(s => <SymbolRow key={s.id} s={s} />)}

        <div style={{ height: 1, background: 'rgba(201,168,76,0.06)', margin: '8px 0' }} />

        <GroupLabel label="Gold Kitchen" />
        {gold.map(s => <SymbolRow key={s.id} s={s} />)}
      </div>

      {/* Active symbol info */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        background: 'rgba(201,168,76,0.03)',
      }}>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.1rem',
          color: '#c9a84c',
          letterSpacing: '0.05em',
          lineHeight: 1,
          marginBottom: 4,
        }}>
          {activeSymbol.short}
        </div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.38rem',
          color: 'rgba(245,240,232,0.2)',
          lineHeight: 1.5,
        }}>
          {activeTimeframe.label} · {activeSymbol.group === 'gold' ? 'Gold Kitchen' : 'Forex Kitchen'}
        </div>
      </div>
    </div>
  )
}
