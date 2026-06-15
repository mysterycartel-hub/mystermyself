'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lesson } from '@/lib/academy'

interface Props {
  lesson: Lesson
  index: number
  completed?: boolean
  locked?: boolean
}

export default function LessonCard({ lesson, index, completed = false, locked = false }: Props) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={!locked ? { y: -3, borderColor: `${lesson.color}50` } : undefined}
      style={{
        background: completed
          ? `${lesson.color}08`
          : locked
          ? 'rgba(245,240,232,0.01)'
          : 'rgba(245,240,232,0.02)',
        border: `1px solid ${completed ? lesson.color + '30' : locked ? 'rgba(245,240,232,0.05)' : 'rgba(245,240,232,0.08)'}`,
        padding: '24px',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
        opacity: locked ? 0.45 : 1,
        cursor: locked ? 'default' : 'none',
      }}
    >
      {/* Top accent */}
      {!locked && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: completed
            ? lesson.color
            : `linear-gradient(90deg, ${lesson.color}60, transparent)`,
          transition: 'opacity 0.2s',
        }} />
      )}

      {/* Step + status */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.45rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: locked ? 'rgba(245,240,232,0.15)' : `${lesson.color}70`,
        }}>
          Step {lesson.step}
        </div>
        <div style={{ fontSize: '0.85rem' }}>
          {completed ? '✅' : locked ? '🔒' : lesson.icon}
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '1.3rem',
        color: locked ? 'rgba(245,240,232,0.25)' : completed ? lesson.color : 'var(--cream)',
        letterSpacing: '0.04em',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {lesson.title}
      </div>

      {/* TCU term */}
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.48rem',
        color: locked ? 'rgba(245,240,232,0.12)' : `${lesson.color}80`,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        {lesson.tcuTerm}
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.58rem',
        lineHeight: 1.7,
        color: locked ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.45)',
        margin: '0 0 16px',
      }}>
        {lesson.subtitle}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTop: `1px solid ${locked ? 'rgba(245,240,232,0.04)' : 'rgba(245,240,232,0.06)'}`,
      }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.5rem',
          color: locked ? 'rgba(245,240,232,0.12)' : 'rgba(201,168,76,0.6)',
        }}>
          +{lesson.xpReward} XP
        </span>
        {!locked && (
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            color: completed ? lesson.color : 'rgba(245,240,232,0.25)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {completed ? 'Completed ✓' : 'Start →'}
          </span>
        )}
      </div>
    </motion.div>
  )

  if (locked) return content

  return (
    <Link href={`/academy/${lesson.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      {content}
    </Link>
  )
}
