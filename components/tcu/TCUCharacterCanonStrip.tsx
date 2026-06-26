'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TCU_CHARACTERS } from '@/data/tcu-character-canon'
import TCUAvatarPlaceholder from './TCUAvatarPlaceholder'

/**
 * TCUCharacterCanonStrip — Horizontal scrollable strip of all 9 canon characters.
 * Tap/hover reveals: role + market lesson + chef metaphor.
 * Imports from data/tcu-character-canon.ts — NEVER hardcoded.
 *
 * Props:
 * - compact: show only first 3 characters (for smaller sections)
 * - subset: array of character IDs to display (overrides compact)
 */

interface Props {
  compact?: boolean
  subset?: string[]
}

export default function TCUCharacterCanonStrip({ compact = false, subset }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const characters = subset
    ? TCU_CHARACTERS.filter((c) => subset.includes(c.id))
    : compact
      ? TCU_CHARACTERS.slice(0, 3)
      : TCU_CHARACTERS

  const active = TCU_CHARACTERS.find((c) => c.id === activeId)

  return (
    <div style={{ position: 'relative' }}>
      {/* Scroll container */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 4,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {characters.map((character, i) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => setActiveId(activeId === character.id ? null : character.id)}
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 auto',
              width: compact ? 140 : 160,
              background: activeId === character.id ? `${character.color}08` : 'var(--deep)',
              border: `1px solid ${activeId === character.id ? character.color + '40' : 'rgba(201,168,76,0.08)'}`,
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: character.color,
              opacity: activeId === character.id ? 0.8 : 0.2,
              transition: 'opacity 0.3s',
            }} />

            {/* Avatar */}
            <TCUAvatarPlaceholder
              character={character}
              size="sm"
              showBadge={false}
            />

            {/* Name */}
            <h4 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.9rem',
              color: activeId === character.id ? character.color : 'var(--cream)',
              letterSpacing: '0.04em',
              textAlign: 'center',
              lineHeight: 1.1,
              transition: 'color 0.3s',
            }}>
              {character.name}
            </h4>

            {/* Role tag */}
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.4rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: `${character.color}80`,
              textAlign: 'center',
            }}>
              {character.role.split('·')[0].trim()}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: 2,
              background: 'rgba(6,6,8,0.95)',
              border: `1px solid ${active.color}20`,
              padding: 'clamp(20px, 3vw, 32px)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 24,
              alignItems: 'start',
            }}>
              {/* Left: avatar */}
              <TCUAvatarPlaceholder character={active} size="lg" />

              {/* Right: info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <h3 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.8rem',
                    color: active.color,
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}>
                    {active.name}
                  </h3>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    background: `${active.color}15`,
                    color: active.color,
                    padding: '3px 10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {active.role}
                  </span>
                </div>

                {/* Market lesson */}
                <div style={{ marginBottom: 16 }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.45rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    display: 'block',
                    marginBottom: 6,
                  }}>
                    Market Lesson
                  </span>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.7,
                  }}>
                    {active.marketLesson}
                  </p>
                </div>

                {/* Chef metaphor */}
                <div style={{ marginBottom: 16 }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.45rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    display: 'block',
                    marginBottom: 6,
                  }}>
                    Chef Metaphor
                  </span>
                  <p style={{
                    fontSize: '0.72rem',
                    color: 'rgba(245,240,232,0.45)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}>
                    {active.chefMetaphor}
                  </p>
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '0.8rem',
                  color: active.color,
                  fontFamily: '"Space Mono", monospace',
                  fontStyle: 'italic',
                  opacity: 0.8,
                }}>
                  {active.shortQuote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar CSS */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
