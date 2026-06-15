'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PracticeTask } from '@/lib/academy'

interface Props {
  practice: PracticeTask
  onComplete?: () => void
}

export default function PracticePrompt({ practice, onComplete }: Props) {
  const [showHint, setShowHint] = useState(false)
  const [done, setDone] = useState(false)

  const handleComplete = () => {
    setDone(true)
    onComplete?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: done ? 'rgba(34,197,94,0.05)' : 'rgba(201,168,76,0.03)',
        border: `1px solid ${done ? 'rgba(34,197,94,0.25)' : 'rgba(201,168,76,0.15)'}`,
        padding: '32px',
        transition: 'all 0.4s',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
      }}>
        <div style={{
          width: 36, height: 36,
          background: done ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          flexShrink: 0,
          transition: 'background 0.3s',
        }}>
          {done ? '✅' : '🎯'}
        </div>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: done ? 'rgba(34,197,94,0.6)' : 'rgba(201,168,76,0.6)',
          }}>
            {done ? 'Practice Complete' : 'Practice Task'}
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.1rem',
            color: done ? '#22C55E' : 'var(--gold)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginTop: 2,
          }}>
            {done ? 'Well done, Chef.' : 'Your Turn'}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.7rem',
        lineHeight: 1.85,
        color: 'rgba(245,240,232,0.8)',
        margin: '0 0 20px',
      }}>
        {practice.instruction}
      </p>

      {/* Success criteria */}
      <div style={{
        background: 'rgba(245,240,232,0.03)',
        border: '1px solid rgba(245,240,232,0.08)',
        padding: '12px 16px',
        marginBottom: 20,
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.44rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 6,
        }}>
          You are ready when:
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.55)',
          margin: 0,
        }}>
          {practice.successCriteria}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {!done && (
          <>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                background: 'none',
                border: '1px solid rgba(201,168,76,0.25)',
                color: 'rgba(201,168,76,0.6)',
                padding: '10px 20px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              {showHint ? 'Hide Hint' : '💡 Show Hint'}
            </button>
            <button
              onClick={handleComplete}
              style={{
                background: '#c9a84c',
                border: 'none',
                color: '#060608',
                padding: '10px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              I Did It →
            </button>
          </>
        )}
        {done && (
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: '#22C55E',
            letterSpacing: '0.1em',
          }}>
            ✓ Practice marked complete
          </div>
        )}
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && !done && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: 16,
              padding: '16px',
              background: 'rgba(201,168,76,0.06)',
              borderLeft: '3px solid rgba(201,168,76,0.4)',
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 8,
              }}>
                Hint from Chef Goldie
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.65)',
                margin: 0,
              }}>
                {practice.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
