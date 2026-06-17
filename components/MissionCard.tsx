'use client'

import { motion } from 'framer-motion'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface MissionCardProps {
  title: string
  description: string
  xp: number
  difficulty: Difficulty
  completed?: boolean
  district?: string
  districtColor?: string
  index?: number
}

const difficultyColor: Record<Difficulty, string> = {
  beginner: '#22C55E',
  intermediate: '#c9a84c',
  advanced: '#c0392b',
}

const difficultyLabel: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function MissionCard({
  title, description, xp, difficulty, completed = false,
  district, districtColor = 'var(--gold)', index = 0,
}: MissionCardProps) {
  const dc = difficultyColor[difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        background: completed ? 'rgba(34,197,94,0.04)' : 'var(--deep)',
        border: `1px solid ${completed ? '#22C55E30' : dc + '20'}`,
        padding: '24px 28px',
        position: 'relative',
        opacity: completed ? 0.7 : 1,
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            background: `${dc}15`,
            color: dc,
            border: `1px solid ${dc}30`,
          }}>
            {difficultyLabel[difficulty]}
          </span>
          {district && (
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              background: `${districtColor}10`,
              color: districtColor,
              border: `1px solid ${districtColor}25`,
            }}>
              {district}
            </span>
          )}
        </div>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.1rem',
          color: completed ? '#22C55E' : 'var(--gold)',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          {completed ? '✓ DONE' : `+${xp} XP`}
        </div>
      </div>

      <h3 style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '1.2rem',
        letterSpacing: '0.04em',
        color: 'var(--cream)',
        marginBottom: 8,
        lineHeight: 1.1,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.7rem',
        color: 'rgba(245,240,232,0.5)',
        lineHeight: 1.75,
      }}>
        {description}
      </p>
    </motion.div>
  )
}
