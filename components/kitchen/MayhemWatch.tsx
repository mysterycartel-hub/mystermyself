'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MELISSA_QUOTES, MELODY_QUOTES } from '@/lib/mayhem'

type ActiveMayhem = 'melissa' | 'melody' | 'both' | null

interface Props {
  activeMayhem?: ActiveMayhem
}

function randomQuote(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function MayhemWatch({ activeMayhem = 'both' }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [melissaQuote] = useState(() => randomQuote(MELISSA_QUOTES))
  const [melodyQuote]  = useState(() => randomQuote(MELODY_QUOTES))

  const showMelissa = activeMayhem === 'melissa' || activeMayhem === 'both'
  const showMelody  = activeMayhem === 'melody'  || activeMayhem === 'both'

  if (!activeMayhem) return null

  return (
    <div style={{
      borderBottom: '1px solid rgba(245,240,232,0.04)',
      flexShrink: 0,
    }}>
      {/* Header toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'rgba(236,72,153,0.03)',
          border: 'none',
          borderBottom: expanded ? '1px solid rgba(236,72,153,0.12)' : 'none',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'none',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {showMelissa && (
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ fontSize: '0.85rem', lineHeight: 1 }}
            >
              ⚡
            </motion.span>
          )}
          {showMelody && (
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '0.85rem', lineHeight: 1 }}
            >
              🎭
            </motion.span>
          )}
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.4rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: showMelissa ? '#EC4899' : '#F59E0B',
          }}>
            {showMelissa && showMelody
              ? 'Melissa + Melody Are Watching'
              : showMelissa
              ? 'Melissa Mayhem Is Watching'
              : 'Melody Mayhem Is Watching'}
          </span>
        </div>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.38rem',
          color: 'rgba(245,240,232,0.2)',
        }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Expanded mayhem panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

              {/* Melissa */}
              {showMelissa && (
                <div style={{
                  background: 'rgba(236,72,153,0.04)',
                  border: '1px solid rgba(236,72,153,0.2)',
                  borderLeft: '2px solid #EC4899',
                  padding: '10px 14px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 6,
                  }}>
                    <span style={{ fontSize: '0.85rem' }}>⚡</span>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '0.8rem',
                      color: '#EC4899',
                      letterSpacing: '0.06em',
                    }}>
                      Melissa Mayhem
                    </span>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.36rem',
                      color: 'rgba(236,72,153,0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      · Chaos · FOMO · Traps
                    </span>
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    lineHeight: 1.7,
                    color: 'rgba(236,72,153,0.75)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    &ldquo;{melissaQuote}&rdquo;
                  </p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.46rem',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.35)',
                    margin: '8px 0 0',
                  }}>
                    Before any entry: complete The Recipe. If any step is missing — wait.
                  </p>
                </div>
              )}

              {/* Melody */}
              {showMelody && (
                <div style={{
                  background: 'rgba(245,158,11,0.03)',
                  border: '1px solid rgba(245,158,11,0.18)',
                  borderLeft: '2px solid #F59E0B',
                  padding: '10px 14px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 6,
                  }}>
                    <span style={{ fontSize: '0.85rem' }}>🎭</span>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '0.8rem',
                      color: '#F59E0B',
                      letterSpacing: '0.06em',
                    }}>
                      Melody Mayhem
                    </span>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.36rem',
                      color: 'rgba(245,158,11,0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      · Fear · Greed · Revenge
                    </span>
                  </div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    lineHeight: 1.7,
                    color: 'rgba(245,158,11,0.75)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    &ldquo;{melodyQuote}&rdquo;
                  </p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.46rem',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.35)',
                    margin: '8px 0 0',
                  }}>
                    Name your emotional state before entering. If it is not neutral — do not trade.
                  </p>
                </div>
              )}

              {/* Combined reminder */}
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                lineHeight: 1.65,
                color: 'rgba(245,240,232,0.18)',
                borderTop: '1px solid rgba(245,240,232,0.04)',
                paddingTop: 8,
              }}>
                They are always in the kitchen. Melissa wants the impulse entry. Melody wants the emotional decision. The Recipe defeats both.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
