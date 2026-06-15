'use client'

import { motion } from 'framer-motion'
import { Character } from '@/lib/academy'

interface Props {
  character: Character
  message: string
  variant?: 'coach' | 'warning' | 'alert'
}

const roleStyles = {
  coach: {
    border: 'rgba(201,168,76,0.2)',
    bg: 'rgba(201,168,76,0.04)',
    badge: '#c9a84c',
    badgeBg: 'rgba(201,168,76,0.1)',
    label: 'COACH',
  },
  warning: {
    border: 'rgba(245,158,11,0.25)',
    bg: 'rgba(245,158,11,0.04)',
    badge: '#F59E0B',
    badgeBg: 'rgba(245,158,11,0.1)',
    label: 'CAUTION',
  },
  alert: {
    border: 'rgba(239,68,68,0.3)',
    bg: 'rgba(239,68,68,0.05)',
    badge: '#EF4444',
    badgeBg: 'rgba(239,68,68,0.12)',
    label: 'ALERT',
  },
}

export default function CharacterCoach({ character, message, variant }: Props) {
  const role = variant ?? character.role
  const styles = roleStyles[role]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        padding: '28px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Role badge */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        background: styles.badgeBg,
        borderLeft: `1px solid ${styles.border}`,
        borderBottom: `1px solid ${styles.border}`,
        padding: '4px 12px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.45rem',
        letterSpacing: '0.25em',
        color: styles.badge,
      }}>
        {styles.label}
      </div>

      {/* Character header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: `${character.color}18`,
          border: `2px solid ${character.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          flexShrink: 0,
        }}>
          {character.emoji}
        </div>
        <div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.2rem',
            color: character.color,
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}>
            {character.name}
          </div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.15em',
            color: 'rgba(245,240,232,0.35)',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>
            {character.title}
          </div>
        </div>
      </div>

      {/* Speech bubble */}
      <div style={{
        borderLeft: `3px solid ${character.color}`,
        paddingLeft: 20,
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.7rem',
        lineHeight: 1.8,
        color: 'rgba(245,240,232,0.8)',
      }}>
        {message}
      </div>

      {/* Catchphrase footer */}
      <div style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1px solid ${styles.border}`,
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        fontStyle: 'italic',
        color: `${character.color}80`,
        letterSpacing: '0.05em',
      }}>
        &ldquo;{character.catchphrase}&rdquo;
      </div>
    </motion.div>
  )
}
