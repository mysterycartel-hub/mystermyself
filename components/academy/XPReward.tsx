'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  xp: number
  lessonTitle: string
  earned?: boolean
}

export default function XPReward({ xp, lessonTitle, earned = false }: Props) {
  const [animating, setAnimating] = useState(false)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    if (earned && !claimed) {
      setAnimating(true)
      const t = setTimeout(() => setAnimating(false), 2000)
      return () => clearTimeout(t)
    }
  }, [earned, claimed])

  const handleClaim = () => {
    setClaimed(true)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: claimed
          ? 'rgba(201,168,76,0.08)'
          : 'rgba(201,168,76,0.03)',
        border: `1px solid ${claimed ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.15)'}`,
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s',
      }}
    >
      {/* Burst animation */}
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Left: info */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          marginBottom: 8,
        }}>
          Lesson Complete · {lessonTitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '3rem',
            color: '#c9a84c',
            lineHeight: 1,
          }}>
            +{xp}
          </span>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            color: 'rgba(201,168,76,0.6)',
            letterSpacing: '0.15em',
          }}>
            XP
          </span>
        </div>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: 'rgba(245,240,232,0.3)',
          marginTop: 4,
        }}>
          {claimed ? 'XP added to your Passport' : 'Complete the practice to earn XP'}
        </div>
      </div>

      {/* Right: claim button / claimed state */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {!claimed ? (
          <button
            onClick={handleClaim}
            disabled={!earned && !claimed}
            style={{
              background: earned ? '#c9a84c' : 'transparent',
              border: `1px solid ${earned ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
              color: earned ? '#060608' : 'rgba(201,168,76,0.3)',
              padding: '12px 28px',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: earned ? 'none' : 'default',
              transition: 'all 0.2s',
              opacity: earned ? 1 : 0.6,
            }}
          >
            {earned ? `Claim ${xp} XP →` : 'Finish Practice First'}
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: '#c9a84c',
          }}>
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <span>XP Earned!</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
