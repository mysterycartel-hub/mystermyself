'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { JournalPrompt } from '@/lib/academy'
import { MELODY_JOURNAL_INTRO, MELISSA_JOURNAL_NOTE } from '@/lib/mayhem'

interface Props {
  prompts: JournalPrompt[]
  lessonId: string
}

const typeStyles = {
  observation: { color: '#c9a84c', label: 'Observation', icon: '👁️' },
  invalidation: { color: '#3B82F6', label: 'Invalidation', icon: '❌' },
  emotion:      { color: '#F59E0B', label: 'Melody Mayhem · Psychology', icon: '🎭' },
}

export default function ReflectionJournal({ prompts, lessonId }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Persist to localStorage with lesson key
    const key = `tcu_journal_${lessonId}`
    localStorage.setItem(key, JSON.stringify({ answers, savedAt: new Date().toISOString() }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const allAnswered = prompts.every((_, i) => (answers[i] ?? '').trim().length > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(245,240,232,0.015)',
        border: '1px solid rgba(245,240,232,0.08)',
        padding: '32px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          marginBottom: 8,
        }}>
          Reflection Journal
        </div>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.4rem',
          color: 'var(--cream)',
          letterSpacing: '0.05em',
        }}>
          What Did You See?
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.58rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.35)',
          margin: '8px 0 0',
        }}>
          No right answers. Honest reflection builds the skill. Write what you actually noticed.
        </p>
      </div>

      {/* Melody intro — always present before emotion prompts */}
      {prompts.some(p => p.type === 'emotion') && (
        <div style={{
          background: 'rgba(245,158,11,0.04)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderLeft: '3px solid #F59E0B',
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>🎭</span>
          <div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.42rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              marginBottom: 4,
            }}>
              Melody Mayhem · Reading Your Answers
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.58rem',
              lineHeight: 1.75,
              color: 'rgba(245,240,232,0.5)',
              margin: 0,
            }}>
              {MELODY_JOURNAL_INTRO}
            </p>
          </div>
        </div>
      )}

      {/* Melissa reminder — always present */}
      <div style={{
        background: 'rgba(236,72,153,0.03)',
        border: '1px solid rgba(236,72,153,0.15)',
        borderLeft: '3px solid #EC4899',
        padding: '10px 16px',
        marginBottom: 20,
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        lineHeight: 1.7,
        color: 'rgba(245,240,232,0.4)',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.3 }}>⚡</span>
        <span>{MELISSA_JOURNAL_NOTE}</span>
      </div>

      {/* Journal prompts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {prompts.map((p, i) => {
          const ts = typeStyles[p.type]
          return (
            <div key={i}>
              {/* Prompt label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}>
                <span style={{ fontSize: '0.9rem' }}>{ts.icon}</span>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: ts.color,
                }}>
                  {ts.label}
                </span>
              </div>

              {/* Question */}
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                lineHeight: 1.75,
                color: 'rgba(245,240,232,0.7)',
                margin: '0 0 10px',
              }}>
                {p.question}
              </p>

              {/* Textarea */}
              <textarea
                value={answers[i] ?? ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                placeholder="Write your honest answer here..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(245,240,232,0.03)',
                  border: `1px solid ${answers[i]?.trim() ? ts.color + '40' : 'rgba(245,240,232,0.08)'}`,
                  color: 'rgba(245,240,232,0.75)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  lineHeight: 1.7,
                  padding: '12px 16px',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Save */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={handleSave}
          disabled={!allAnswered}
          style={{
            background: allAnswered ? '#c9a84c' : 'transparent',
            border: `1px solid ${allAnswered ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
            color: allAnswered ? '#060608' : 'rgba(201,168,76,0.3)',
            padding: '10px 24px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: allAnswered ? 'none' : 'default',
            transition: 'all 0.2s',
          }}
        >
          Save Reflection
        </button>
        {saved && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              color: '#22C55E',
            }}
          >
            ✓ Saved locally
          </motion.span>
        )}
        {!allAnswered && (
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            color: 'rgba(245,240,232,0.2)',
          }}>
            Answer all prompts to save
          </span>
        )}
      </div>
    </motion.div>
  )
}
