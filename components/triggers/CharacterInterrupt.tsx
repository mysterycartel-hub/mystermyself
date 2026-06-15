'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { type CharacterTrigger, type TriggerEvent, getTrigger } from '@/lib/triggers'
import { type CoachCue } from '@/lib/character-trigger-engine'

const COACH_CONFIG: Record<string, { emoji: string; color: string }> = {
  'trading-chef':    { emoji: '👨‍🍳', color: '#C9A84C' },
  'chef-goldie':     { emoji: '🥇', color: '#F59E0B' },
  'wickie':          { emoji: '🕯️', color: '#A78BFA' },
  'louie-liquidity': { emoji: '💧', color: '#38BDF8' },
  'rico-rhythm':     { emoji: '🎵', color: '#34D399' },
  'penny-stacks':    { emoji: '🛡️', color: '#FB923C' },
  'mr-stocks':       { emoji: '📈', color: '#60A5FA' },
}

const CHARACTER_CONFIG = {
  melissa: {
    name: 'Melissa Mayhem',
    emoji: '⚡',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.06)',
    border: 'rgba(236,72,153,0.3)',
    pulse: 'rgba(236,72,153,0.15)',
    headerBg: 'rgba(236,72,153,0.12)',
    dismissNote: "Dismissing this does not make her leave.",
  },
  melody: {
    name: 'Melody Mayhem',
    emoji: '🎭',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.3)',
    pulse: 'rgba(245,158,11,0.15)',
    headerBg: 'rgba(245,158,11,0.1)',
    dismissNote: "Closing this doesn't answer the question she's asking.",
  },
  'burn-alarm': {
    name: 'Burn Alarm',
    emoji: '🔔',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.06)',
    border: 'rgba(239,68,68,0.35)',
    pulse: 'rgba(239,68,68,0.2)',
    headerBg: 'rgba(239,68,68,0.12)',
    dismissNote: null,
  },
}

const MODE_LABEL = {
  interrupt: 'INTERRUPT',
  warning: 'WARNING',
  alert: 'ALERT',
}

interface ActiveInterrupt {
  trigger: CharacterTrigger
  event: TriggerEvent
}

export default function CharacterInterrupt() {
  const [active, setActive] = useState<ActiveInterrupt | null>(null)
  const [queue, setQueue] = useState<ActiveInterrupt[]>([])
  const [coachCue, setCoachCue] = useState<CoachCue | null>(null)

  const dismiss = useCallback(() => {
    setActive(null)
    // Show next in queue after a brief pause
    setTimeout(() => {
      setQueue(q => {
        if (q.length === 0) return q
        const [next, ...rest] = q
        setActive(next)
        return rest
      })
    }, 300)
  }, [])

  useEffect(() => {
    function handleTrigger(e: Event) {
      const event = (e as CustomEvent<TriggerEvent>).detail
      const trigger = getTrigger(event.type)
      if (!trigger) return

      const interrupt: ActiveInterrupt = { trigger, event }

      setActive(curr => {
        if (!curr) return interrupt
        setQueue(q => [...q, interrupt])
        return curr
      })
    }

    function handleCoachCue(e: Event) {
      const cue = (e as CustomEvent<CoachCue>).detail
      setCoachCue(cue)
    }

    window.addEventListener('tcu-trigger', handleTrigger)
    window.addEventListener('tcu-coach-cue', handleCoachCue)
    return () => {
      window.removeEventListener('tcu-trigger', handleTrigger)
      window.removeEventListener('tcu-coach-cue', handleCoachCue)
    }
  }, [])

  // Auto-dismiss for non-interrupt modes
  useEffect(() => {
    if (!active?.trigger.autoDismissMs) return
    const t = setTimeout(dismiss, active.trigger.autoDismissMs)
    return () => clearTimeout(t)
  }, [active, dismiss])

  // Auto-dismiss coach cues
  useEffect(() => {
    if (!coachCue) return
    const t = setTimeout(() => setCoachCue(null), coachCue.autoDismissMs)
    return () => clearTimeout(t)
  }, [coachCue])

  const cfg = active ? CHARACTER_CONFIG[active.trigger.character] : null
  const coachCfg = coachCue ? COACH_CONFIG[coachCue.character] : null

  return (
    <>
    {/* Coach cue toast */}
    <AnimatePresence>
      {coachCue && coachCfg && (
        <motion.div
          key={`coach-${coachCue.character}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 999,
            width: 340,
            background: '#0a0a0c',
            border: `1px solid ${coachCfg.color}30`,
            boxShadow: `0 0 24px ${coachCfg.color}10, 0 8px 32px rgba(0,0,0,0.5)`,
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.1rem' }}>{coachCfg.emoji}</span>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: coachCfg.color,
              }}>
                {String(coachCue.character).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <button
              onClick={() => setCoachCue(null)}
              style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.2)', cursor: 'none', padding: 2 }}
            >
              <X size={11} />
            </button>
          </div>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: 'rgba(245,240,232,0.7)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {coachCue.message}
          </p>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            color: coachCfg.color,
            lineHeight: 1.5,
            fontStyle: 'italic',
            margin: 0,
            borderLeft: `2px solid ${coachCfg.color}40`,
            paddingLeft: 8,
          }}>
            &ldquo;{coachCue.quote}&rdquo;
          </p>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {active && cfg && (
        <>
          {/* Backdrop — only for interrupt mode */}
          {active.trigger.mode === 'interrupt' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.65)',
                zIndex: 990,
              }}
              onClick={dismiss}
            />
          )}

          {/* Panel */}
          <motion.div
            key={`${active.trigger.character}-${active.trigger.eventType}`}
            initial={{ opacity: 0, y: active.trigger.mode === 'interrupt' ? 0 : 20, scale: active.trigger.mode === 'interrupt' ? 0.96 : 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              zIndex: 1000,
              ...(active.trigger.mode === 'interrupt'
                ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: 480 }
                : { bottom: 24, right: 24, width: 380 }),
              background: '#0a0a0c',
              border: `1px solid ${cfg.border}`,
              boxShadow: `0 0 40px ${cfg.pulse}, 0 24px 64px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Pulsing left bar */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: active.trigger.character === 'melissa' ? 1.2 : 2.4, repeat: Infinity }}
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 3,
                background: cfg.color,
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: '14px 20px 12px 24px',
                background: cfg.headerBg,
                borderBottom: `1px solid ${cfg.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <motion.span
                  animate={active.trigger.character === 'melissa'
                    ? { rotate: [-2, 2, -2, 0] }
                    : { opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: active.trigger.character === 'melissa' ? 0.5 : 2, repeat: Infinity }}
                  style={{ fontSize: '1.2rem' }}
                >
                  {cfg.emoji}
                </motion.span>
                <div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.25em',
                    color: cfg.color,
                    textTransform: 'uppercase',
                    marginBottom: 1,
                  }}>
                    {MODE_LABEL[active.trigger.mode]}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.72rem',
                    color: 'rgba(245,240,232,0.9)',
                    letterSpacing: '0.08em',
                  }}>
                    {cfg.name}
                  </div>
                </div>
              </div>

              <button
                onClick={dismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(245,240,232,0.3)',
                  cursor: 'none',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = cfg.color }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.3)' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px' }}>
              {/* Title */}
              <p style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.35rem',
                letterSpacing: '0.06em',
                color: 'rgba(245,240,232,0.95)',
                marginBottom: 10,
                lineHeight: 1.2,
              }}>
                {active.trigger.title}
              </p>

              {/* Message */}
              {active.trigger.message && (
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.7,
                  marginBottom: 14,
                }}>
                  {active.trigger.message}
                </p>
              )}

              {/* Quote */}
              <div style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                padding: '10px 14px',
                marginBottom: active.trigger.trap ? 14 : 0,
              }}>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  color: cfg.color,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}>
                  "{active.trigger.quote}"
                </p>
              </div>

              {/* Trap */}
              {active.trigger.trap && (
                <div style={{ marginTop: 12 }}>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.3)',
                    marginBottom: 4,
                  }}>The Trap</p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    color: 'rgba(245,240,232,0.55)',
                    lineHeight: 1.6,
                  }}>
                    {active.trigger.trap}
                  </p>
                </div>
              )}

              {/* Escape */}
              {active.trigger.escape && (
                <div style={{
                  marginTop: 12,
                  borderLeft: `2px solid ${cfg.color}`,
                  paddingLeft: 12,
                }}>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.3)',
                    marginBottom: 4,
                  }}>The Escape</p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.62rem',
                    color: 'rgba(245,240,232,0.75)',
                    lineHeight: 1.6,
                  }}>
                    {active.trigger.escape}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 24px 16px',
              borderTop: `1px solid rgba(255,255,255,0.04)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              {cfg.dismissNote ? (
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.5rem',
                  color: 'rgba(245,240,232,0.25)',
                  fontStyle: 'italic',
                  flex: 1,
                }}>
                  {cfg.dismissNote}
                </p>
              ) : <div style={{ flex: 1 }} />}

              {active.trigger.cta ? (
                <button
                  onClick={dismiss}
                  style={{
                    background: cfg.color,
                    color: '#060608',
                    border: 'none',
                    padding: '8px 16px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  {active.trigger.cta}
                </button>
              ) : (
                <button
                  onClick={dismiss}
                  style={{
                    background: 'none',
                    border: `1px solid ${cfg.border}`,
                    color: cfg.color,
                    padding: '7px 14px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                  }}
                >
                  Got it
                </button>
              )}
            </div>

            {/* Queue indicator */}
            {queue.length > 0 && (
              <div style={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: cfg.color,
                color: '#060608',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                fontWeight: 700,
              }}>
                +{queue.length}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}
