'use client'

import { motion } from 'framer-motion'
import { TCUCoachAnalysis } from '@/lib/aiCoach'

interface Props {
  analysis: TCUCoachAnalysis | null
}

// The 9 locked TCU characters with their identities
const CHARACTERS = [
  { name: 'Trading Chef', emoji: '👨‍🍳', color: '#c9a84c', role: 'Head Chef - Strategy & Discipline' },
  { name: 'Candle Kid', emoji: '🕯️', color: '#22C55E', role: 'Candle Pattern Reader' },
  { name: 'Wickie', emoji: '📍', color: '#EF4444', role: 'Wick & Liquidity Sweep Specialist' },
  { name: 'Louie Liquidity', emoji: '💧', color: '#3B82F6', role: 'Liquidity Pool Hunter' },
  { name: 'Chef Goldie', emoji: '✨', color: '#F59E0B', role: 'Gold Market Master' },
  { name: 'Grandma Market', emoji: '👵', color: '#A855F7', role: 'Patience & Wisdom' },
  { name: 'Nana Value', emoji: '💎', color: '#06B6D4', role: 'Value Zone Finder' },
  { name: 'Melissa Mayhem', emoji: '⚡', color: '#EC4899', role: 'Chaos & Volatility Warning' },
  { name: 'Melody Mayhem', emoji: '🎭', color: '#F97316', role: 'Emotional Trading Warning' },
] as const

function getCharacterFromLesson(lesson: string): typeof CHARACTERS[number] {
  for (const char of CHARACTERS) {
    if (lesson.toLowerCase().includes(char.name.toLowerCase())) {
      return char
    }
  }
  return CHARACTERS[0] // Default to Trading Chef
}

export default function CharacterLessons({ analysis }: Props) {
  if (!analysis || !analysis.characterLesson) return null

  const activeChar = getCharacterFromLesson(analysis.characterLesson)

  // Generate a mini teaching tip for a secondary character based on analysis
  const secondaryChars = CHARACTERS.filter(c => c.name !== activeChar.name)
  const secondaryIndex = analysis.bias.length % secondaryChars.length
  const secondary = secondaryChars[secondaryIndex]

  const getSecondaryTip = (): string => {
    if (secondary.name === 'Candle Kid') return 'Watch the body-to-wick ratio on your confirmation candle.'
    if (secondary.name === 'Wickie') return 'Long wicks at AOI zones signal liquidity sweeps before the real move.'
    if (secondary.name === 'Louie Liquidity') return 'Equal highs and lows are magnets for smart money delivery.'
    if (secondary.name === 'Chef Goldie') return 'Gold respects institutional levels. Trust the structure.'
    if (secondary.name === 'Grandma Market') return 'The best recipe takes time. Patience wins in every kitchen.'
    if (secondary.name === 'Nana Value') return 'Look for your pass in discount zones, never chase premium.'
    if (secondary.name === 'Melissa Mayhem') return 'Volatility spikes leave leftover containers. Wait for the dust to settle.'
    if (secondary.name === 'Melody Mayhem') return 'If emotions are running hot, step away from the stove.'
    return 'Every chef needs discipline. Follow the recipe step by step.'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      {/* Header */}
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.42rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.5)',
        padding: '0 4px',
      }}>
        Character Lessons
      </div>

      {/* Primary character card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `rgba(${activeChar.color === '#c9a84c' ? '201,168,76' : activeChar.color === '#22C55E' ? '34,197,94' : activeChar.color === '#EF4444' ? '239,68,68' : activeChar.color === '#3B82F6' ? '59,130,246' : activeChar.color === '#F59E0B' ? '245,158,11' : activeChar.color === '#A855F7' ? '168,85,247' : activeChar.color === '#06B6D4' ? '6,182,212' : activeChar.color === '#EC4899' ? '236,72,153' : '249,115,22'},0.04)`,
          border: `1px solid ${activeChar.color}25`,
          borderLeft: `3px solid ${activeChar.color}`,
          padding: '12px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: '1.2rem' }}>{activeChar.emoji}</span>
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.8rem',
              color: activeChar.color,
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}>
              {activeChar.name}
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.36rem',
              color: 'rgba(245,240,232,0.25)',
              letterSpacing: '0.08em',
              marginTop: 2,
            }}>
              {activeChar.role}
            </div>
          </div>
        </div>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.6)',
          margin: 0,
          fontStyle: 'italic',
        }}>
          {analysis.characterLesson}
        </p>
      </motion.div>

      {/* Secondary character tip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        style={{
          background: 'rgba(245,240,232,0.015)',
          border: '1px solid rgba(245,240,232,0.04)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{secondary.emoji}</span>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.4rem',
            letterSpacing: '0.12em',
            color: secondary.color,
            marginBottom: 4,
            textTransform: 'uppercase',
          }}>
            {secondary.name}
          </div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            lineHeight: 1.6,
            color: 'rgba(245,240,232,0.4)',
            margin: 0,
          }}>
            {getSecondaryTip()}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
