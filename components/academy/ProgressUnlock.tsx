'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lesson } from '@/lib/academy'

interface Props {
  nextLesson: Lesson | null
  prevLesson: Lesson | null
  currentXP: number
  lessonXP: number
}

export default function ProgressUnlock({ nextLesson, prevLesson, currentXP, lessonXP }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid rgba(201,168,76,0.15)',
        padding: '32px',
        background: 'rgba(201,168,76,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* XP progress line */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.48rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
          }}>
            Lesson XP Reward
          </span>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.4rem',
            color: '#c9a84c',
            lineHeight: 1,
          }}>
            +{lessonXP} XP
          </span>
        </div>
      </div>

      {/* Next/Prev navigation */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {prevLesson && (
          <Link
            href={`/academy/${prevLesson.slug}`}
            style={{ textDecoration: 'none', flex: 1, minWidth: 180 }}
          >
            <div style={{
              border: '1px solid rgba(245,240,232,0.1)',
              padding: '16px 20px',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.2)',
                marginBottom: 8,
              }}>
                ← Previous Lesson
              </div>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1rem',
                color: 'rgba(245,240,232,0.55)',
                letterSpacing: '0.05em',
              }}>
                {prevLesson.icon} {prevLesson.title}
              </div>
            </div>
          </Link>
        )}

        {nextLesson ? (
          <Link
            href={`/academy/${nextLesson.slug}`}
            style={{ textDecoration: 'none', flex: 1, minWidth: 180 }}
          >
            <motion.div
              whileHover={{ borderColor: 'rgba(201,168,76,0.5)', background: 'rgba(201,168,76,0.06)' }}
              style={{
                border: '1px solid rgba(201,168,76,0.25)',
                padding: '16px 20px',
                background: 'rgba(201,168,76,0.03)',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 8,
              }}>
                Next Lesson →
              </div>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1rem',
                color: '#c9a84c',
                letterSpacing: '0.05em',
              }}>
                {nextLesson.icon} {nextLesson.title}
              </div>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.48rem',
                color: 'rgba(245,240,232,0.3)',
                marginTop: 4,
              }}>
                +{nextLesson.xpReward} XP
              </div>
            </motion.div>
          </Link>
        ) : (
          <div style={{
            flex: 1, minWidth: 180,
            border: '1px solid rgba(201,168,76,0.3)',
            padding: '16px 20px',
            background: 'rgba(201,168,76,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.44rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
            }}>
              Module Complete
            </div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1rem',
              color: '#c9a84c',
              letterSpacing: '0.05em',
            }}>
              🏆 You finished this module
            </div>
          </div>
        )}
      </div>

      {/* Back to academy */}
      <div style={{
        borderTop: '1px solid rgba(245,240,232,0.06)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <Link href="/academy" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.3)',
            transition: 'color 0.2s',
          }}>
            ← Back to Academy
          </span>
        </Link>
        <Link href="/kitchen" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            transition: 'color 0.2s',
          }}>
            Open Market Kitchen →
          </span>
        </Link>
      </div>
    </motion.div>
  )
}
