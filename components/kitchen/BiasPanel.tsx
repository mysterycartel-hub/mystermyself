'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KitchenSymbol } from '@/lib/kitchen'
import {
  MELISSA_KITCHEN_TRIGGERS,
  MELODY_KITCHEN_TRIGGERS,
  MayhemKitchenTrigger,
} from '@/lib/mayhem'

interface Props {
  symbol: KitchenSymbol
}

type BiasValue = 'bullish' | 'bearish' | 'neutral' | null

const TCU_FIELDS = [
  { id: 'bias',         label: 'Bias',           placeholder: 'Bullish / Bearish / Neutral', color: '#c9a84c' },
  { id: 'flow',         label: 'Flow',            placeholder: 'Where is liquidity drawing price?', color: '#3B82F6' },
  { id: 'aoi',          label: 'AOI',             placeholder: 'Area of Interest — Premium or Discount?', color: '#F97316' },
  { id: 'delivery',     label: 'Delivery',        placeholder: 'Impulsive or corrective move?', color: '#22C55E' },
  { id: 'confirmation', label: 'Confirmation',    placeholder: 'What signal confirms The Recipe?', color: '#A855F7' },
  { id: 'pass',         label: 'The Pass',        placeholder: 'Where would you enter — and why?', color: '#c9a84c' },
  { id: 'tables',       label: 'Tables Served',   placeholder: 'Target levels if price delivers', color: '#22C55E' },
  { id: 'management',   label: 'Management',      placeholder: 'Burn Point + invalidation level', color: '#EF4444' },
]

function getActiveTrigger(fieldId: string, text: string): MayhemKitchenTrigger | null {
  if (!text.trim()) return null
  const allTriggers = [...MELISSA_KITCHEN_TRIGGERS, ...MELODY_KITCHEN_TRIGGERS]
  return allTriggers.find(t => {
    if (t.field !== fieldId) return false
    return t.triggerPattern.split('|').some(p => text.toLowerCase().includes(p.toLowerCase()))
  }) ?? null
}

export default function BiasPanel({ symbol }: Props) {
  const [notes, setNotes]         = useState<Record<string, string>>({})
  const [bias, setBias]           = useState<BiasValue>(null)
  const [kitchenOpen, setKitchenOpen] = useState<boolean | null>(null)
  const [saved, setSaved]         = useState(false)

  const handleSave = () => {
    const key = `tcu_bias_${symbol.id}`
    localStorage.setItem(key, JSON.stringify({ notes, bias, kitchenOpen, savedAt: new Date().toISOString() }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleClear = () => {
    setNotes({})
    setBias(null)
    setKitchenOpen(null)
    localStorage.removeItem(`tcu_bias_${symbol.id}`)
  }

  return (
    <div style={{
      background: 'rgba(6,6,8,0.9)',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            marginBottom: 4,
          }}>
            The Recipe — {symbol.short}
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(245,240,232,0.5)',
            letterSpacing: '0.1em',
          }}>
            Bias · Flow · AOI · Delivery · Confirmation · Pass · Tables Served · Management
          </div>
        </div>

        {/* Kitchen Open toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.12em',
            color: 'rgba(245,240,232,0.3)',
            textTransform: 'uppercase',
          }}>
            Kitchen:
          </span>
          {(['open', 'closed'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setKitchenOpen(v === 'open')}
              style={{
                background: kitchenOpen === (v === 'open') ? (v === 'open' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.1)') : 'transparent',
                border: `1px solid ${kitchenOpen === (v === 'open') ? (v === 'open' ? '#22C55E' : '#EF4444') + '50' : 'rgba(245,240,232,0.08)'}`,
                color: kitchenOpen === (v === 'open') ? (v === 'open' ? '#22C55E' : '#EF4444') : 'rgba(245,240,232,0.2)',
                padding: '4px 12px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.15s',
              }}
            >
              {v === 'open' ? '🟢 Open' : '🔴 Closed'}
            </button>
          ))}
        </div>
      </div>

      {/* Bias buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['bullish', 'bearish', 'neutral'] as BiasValue[]).map((b) => {
          const colors = {
            bullish: { active: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
            bearish: { active: '#EF4444', bg: 'rgba(239,68,68,0.1)'  },
            neutral: { active: '#c9a84c', bg: 'rgba(201,168,76,0.08)' },
          }
          const c = colors[b!]
          const isActive = bias === b
          return (
            <button
              key={b}
              onClick={() => setBias(isActive ? null : b)}
              style={{
                background: isActive ? c.bg : 'transparent',
                border: `1px solid ${isActive ? c.active + '60' : 'rgba(245,240,232,0.08)'}`,
                color: isActive ? c.active : 'rgba(245,240,232,0.3)',
                padding: '6px 18px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.48rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.15s',
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {b === 'bullish' ? '▲ Bullish' : b === 'bearish' ? '▼ Bearish' : '— Neutral'}
            </button>
          )
        })}
      </div>

      {/* TCU fields grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 8,
      }}>
        {TCU_FIELDS.slice(1).map((f) => {
          const activeTrigger = getActiveTrigger(f.id, notes[f.id] ?? '')
          const isMelissa = activeTrigger?.character === 'melissa-mayhem'
          const triggerAccent = isMelissa ? '#EC4899' : '#F59E0B'
          return (
            <div key={f.id}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: activeTrigger ? triggerAccent : f.color,
                marginBottom: 4,
                opacity: 0.7,
                transition: 'color 0.2s',
              }}>
                {f.label}
                {activeTrigger && (
                  <span style={{ marginLeft: 6, opacity: 1 }}>
                    {isMelissa ? '⚡' : '🎭'}
                  </span>
                )}
              </div>
              <textarea
                value={notes[f.id] ?? ''}
                onChange={(e) => setNotes(prev => ({ ...prev, [f.id]: e.target.value }))}
                placeholder={f.placeholder}
                rows={2}
                style={{
                  width: '100%',
                  background: activeTrigger
                    ? `rgba(${isMelissa ? '236,72,153' : '245,158,11'},0.04)`
                    : 'rgba(245,240,232,0.02)',
                  border: `1px solid ${
                    activeTrigger
                      ? triggerAccent + '50'
                      : notes[f.id]?.trim()
                      ? f.color + '30'
                      : 'rgba(245,240,232,0.06)'
                  }`,
                  color: 'rgba(245,240,232,0.65)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  lineHeight: 1.6,
                  padding: '8px 10px',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                  boxSizing: 'border-box',
                }}
              />
              <AnimatePresence>
                {activeTrigger && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      overflow: 'hidden',
                      marginTop: 4,
                      background: `rgba(${isMelissa ? '236,72,153' : '245,158,11'},0.05)`,
                      border: `1px solid ${triggerAccent}30`,
                      borderLeft: `2px solid ${triggerAccent}`,
                      padding: '6px 10px',
                    }}
                  >
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.42rem',
                      color: triggerAccent,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: 3,
                    }}>
                      {isMelissa ? '⚡ Melissa Mayhem' : '🎭 Melody Mayhem'}
                    </div>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.46rem',
                      lineHeight: 1.6,
                      color: 'rgba(245,240,232,0.55)',
                      margin: '0 0 4px',
                    }}>
                      {activeTrigger.warning}
                    </p>
                    <p style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.44rem',
                      lineHeight: 1.5,
                      color: `${triggerAccent}70`,
                      fontStyle: 'italic',
                      margin: 0,
                    }}>
                      &ldquo;{activeTrigger.quote}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Action row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleSave}
          style={{
            background: '#c9a84c',
            border: 'none',
            color: '#060608',
            padding: '8px 20px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'background 0.2s',
          }}
        >
          Save Recipe
        </button>
        <button
          onClick={handleClear}
          style={{
            background: 'transparent',
            border: '1px solid rgba(245,240,232,0.1)',
            color: 'rgba(245,240,232,0.25)',
            padding: '8px 16px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'all 0.2s',
          }}
        >
          Clear
        </button>
        {saved && (
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.5rem',
            color: '#22C55E',
          }}>
            ✓ Recipe saved
          </span>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.38rem',
            color: 'rgba(245,240,232,0.15)',
            letterSpacing: '0.05em',
          }}>
            Saved locally · Not financial advice
          </span>
        </div>
      </div>
    </div>
  )
}
