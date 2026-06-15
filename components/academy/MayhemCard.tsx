'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MayhemMoment } from '@/lib/mayhem'
import { CHARACTERS } from '@/lib/academy'

interface Props {
  moment: MayhemMoment
  position?: 'inline' | 'full'
}

const CHARACTER_STYLE = {
  'melissa-mayhem': {
    glow:        'rgba(236,72,153,0.15)',
    border:      'rgba(236,72,153,0.3)',
    bg:          'rgba(236,72,153,0.04)',
    accent:      '#EC4899',
    headerBg:    'rgba(236,72,153,0.08)',
    pulseColor:  'rgba(236,72,153,0.4)',
    tagLabel:    'MELISSA IS HERE',
    tagBg:       'rgba(236,72,153,0.12)',
  },
  'melody-mayhem': {
    glow:        'rgba(245,158,11,0.12)',
    border:      'rgba(245,158,11,0.25)',
    bg:          'rgba(245,158,11,0.03)',
    accent:      '#F59E0B',
    headerBg:    'rgba(245,158,11,0.06)',
    tagLabel:    'MELODY IS WATCHING',
    tagBg:       'rgba(245,158,11,0.1)',
    pulseColor:  'rgba(245,158,11,0.35)',
  },
}

export default function MayhemCard({ moment, position = 'inline' }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const char = CHARACTERS[moment.character]
  const style = CHARACTER_STYLE[moment.character]
  const isMelissa = moment.character === 'melissa-mayhem'

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 0 40px ${style.glow}`,
      }}
    >
      {/* Pulsing left bar */}
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
          boxShadow: [`0 0 6px ${style.pulseColor}`, `0 0 16px ${style.pulseColor}`, `0 0 6px ${style.pulseColor}`],
        }}
        transition={{ duration: isMelissa ? 1.2 : 2.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: style.accent,
        }}
      />

      {/* Header */}
      <div style={{
        background: style.headerBg,
        padding: '14px 20px 14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Character avatar */}
          <motion.div
            animate={isMelissa
              ? { rotate: [-1, 1, -1], scale: [1, 1.04, 1] }
              : { opacity: [0.85, 1, 0.85] }}
            transition={{ duration: isMelissa ? 0.8 : 2, repeat: Infinity }}
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: `${style.accent}18`,
              border: `2px solid ${style.accent}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}
          >
            {char?.emoji ?? (isMelissa ? '⚡' : '🎭')}
          </motion.div>

          <div>
            {/* Presence tag */}
            <div style={{
              background: style.tagBg,
              display: 'inline-block',
              padding: '2px 10px',
              marginBottom: 4,
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.38rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: style.accent,
            }}>
              {style.tagLabel}
            </div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.1rem',
              color: style.accent,
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              {char?.name ?? moment.character}
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              color: `${style.accent}60`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}>
              {char?.title}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              background: 'transparent',
              border: `1px solid ${style.accent}30`,
              color: `${style.accent}80`,
              padding: '5px 14px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.2s',
            }}
          >
            {expanded ? 'Less' : 'Read More'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(245,240,232,0.15)',
              fontSize: '0.8rem',
              cursor: 'none',
              lineHeight: 1,
              padding: '4px',
            }}
            title="Dismiss (she is still here)"
          >
            ×
          </button>
        </div>
      </div>

      {/* Quote — always visible */}
      <div style={{ padding: '16px 24px 0' }}>
        <blockquote style={{
          borderLeft: `3px solid ${style.accent}40`,
          paddingLeft: 16,
          margin: 0,
        }}>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            lineHeight: 1.85,
            color: `${style.accent}90`,
            fontStyle: 'italic',
            margin: 0,
          }}>
            &ldquo;{moment.quote}&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Trigger line */}
      <div style={{ padding: '10px 24px' }}>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.58rem',
          lineHeight: 1.8,
          color: 'rgba(245,240,232,0.55)',
          margin: 0,
        }}>
          <span style={{ color: style.accent, fontWeight: 700 }}>Trigger: </span>
          {moment.trigger}
        </p>
      </div>

      {/* Expanded: warning + trap + escape */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderTop: `1px solid ${style.border}`,
              marginTop: 4,
              paddingTop: 16,
            }}>
              {/* Warning */}
              <div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: style.accent,
                  marginBottom: 6,
                }}>
                  ⚠️ Coach Warning
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  lineHeight: 1.8,
                  color: 'rgba(245,240,232,0.7)',
                  margin: 0,
                }}>
                  {moment.warning}
                </p>
              </div>

              {/* Trap */}
              <div style={{
                background: isMelissa ? 'rgba(236,72,153,0.04)' : 'rgba(245,158,11,0.03)',
                border: `1px solid ${style.accent}20`,
                padding: '12px 16px',
              }}>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: `${style.accent}70`,
                  marginBottom: 6,
                }}>
                  The Trap
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.5)',
                  margin: 0,
                }}>
                  {moment.trap}
                </p>
              </div>

              {/* Escape */}
              <div style={{
                background: 'rgba(34,197,94,0.04)',
                border: '1px solid rgba(34,197,94,0.15)',
                padding: '12px 16px',
                borderLeft: '3px solid #22C55E',
              }}>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.42rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#22C55E',
                  marginBottom: 6,
                }}>
                  🔓 The Escape
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.65)',
                  margin: 0,
                }}>
                  {moment.escape}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom note — dismissal is not escape */}
      <div style={{
        padding: '8px 24px',
        borderTop: `1px solid ${style.border}`,
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.38rem',
        color: 'rgba(245,240,232,0.15)',
        letterSpacing: '0.08em',
      }}>
        Dismissing this card does not make her leave. She is in this lesson.
      </div>
    </motion.div>
  )
}
