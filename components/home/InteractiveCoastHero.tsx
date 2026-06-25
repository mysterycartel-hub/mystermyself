'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * InteractiveCoastHero — Replaces static HomeHero with a living, breathing entry.
 * Features:
 * - Canvas-based floating gold particles
 * - Pulsing district nodes that glow on load
 * - Mouse-reactive grid glow (subtle)
 * - Staggered text reveal with energy
 */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulse: number
}

const DISTRICT_NODES = [
  { label: 'Market Marina', color: '#0D9488', x: 0.78, y: 0.25 },
  { label: 'Route Harbor', color: '#0EA5E9', x: 0.15, y: 0.35 },
  { label: 'Flavor District', color: '#F97316', x: 0.88, y: 0.6 },
  { label: 'Blueprint Bay', color: '#6366F1', x: 0.22, y: 0.7 },
  { label: 'Creator Pier', color: '#A855F7', x: 0.65, y: 0.75 },
  { label: 'Legacy Point', color: '#EC4899', x: 0.45, y: 0.15 },
]

export default function InteractiveCoastHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const count = Math.min(60, Math.floor(canvas.offsetWidth / 20))
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouse)

    let time = 0
    const animate = () => {
      time += 0.016
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Draw particles
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        // Wrap around
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Mouse attraction (subtle)
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.vx += dx * 0.00005
          p.vy += dy * 0.00005
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.5) {
          p.vx *= 0.98
          p.vy *= 0.98
        }

        const pulsedOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${pulsedOpacity})`
        ctx.fill()

        // Glow
        if (p.size > 1.2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201, 168, 76, ${pulsedOpacity * 0.15})`
          ctx.fill()
        }
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw district node glows
      for (const node of DISTRICT_NODES) {
        const nx = node.x * w
        const ny = node.y * h
        const pulse = Math.sin(time * 1.5 + node.x * 10) * 0.3 + 0.7
        const radius = 4 + pulse * 3

        // Outer glow
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 6)
        gradient.addColorStop(0, `${node.color}${Math.floor(pulse * 25).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, radius * 6, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(nx, ny, radius, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}${Math.floor(pulse * 180).toString(16).padStart(2, '0')}`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(frameRef.current)
    }
  }, [mounted])

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut', delay },
  })

  return (
    <section id="start-here" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(100px, 15vw, 160px) clamp(20px, 5vw, 48px) 80px',
    }}>
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          zIndex: 0,
        }}
      />

      {/* Grid background */}
      <div className="hero-grid" style={{ zIndex: 0 }} />

      {/* Radial glow — center gold pulse */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {/* Eyebrow */}
        <motion.div
          {...fadeUp(0.2)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
        >
          <motion.div
            animate={{ width: [32, 48, 32] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: 1, background: 'var(--gold)' }}
          />
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontFamily: '"Space Mono", monospace',
          }}>
            MysterMyself Presents · Scott-King Coast
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.4)}
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: 32,
          }}
        >
          BUILD YOUR<br />
          LIFE LIKE A<br />
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px rgba(201,168,76,0.3)',
                '0 0 40px rgba(201,168,76,0.5)',
                '0 0 20px rgba(201,168,76,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--gold)' }}
          >
            BUSINESS.
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.6)}
          style={{
            fontSize: '0.85rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.65)',
            maxWidth: 520,
            marginBottom: 48,
            fontFamily: '"Space Mono", monospace',
          }}
        >
          Skills become income. Income becomes assets. Assets create freedom.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.8)}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
            <motion.div
              className="btn-primary"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span>Enter The Coast →</span>
            </motion.div>
          </Link>
          <Link href="/coast" style={{ textDecoration: 'none' }}>
            <motion.div
              className="btn-secondary"
              whileHover={{ scale: 1.03, borderColor: 'rgba(201,168,76,0.6)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Explore Districts
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats with animated counting */}
        <motion.div
          {...fadeUp(1.0)}
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid rgba(201,168,76,0.15)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '10', label: 'Districts' },
            { num: '6+', label: 'Income Lanes' },
            { num: 'XAUUSD', label: 'Primary Market' },
            { num: '∞', label: 'Money Moves' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.8rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                {s.num}
              </motion.span>
              <span style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.4)',
                marginTop: 4,
                display: 'block',
                fontFamily: '"Space Mono", monospace',
              }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Candlestick SVG — right side (preserved from original) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          right: '6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 380,
        }}
        className="hidden xl:block"
      >
        <svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <filter id="glow-hero">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <line x1="0" y1="60" x2="380" y2="60" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
          <line x1="0" y1="120" x2="380" y2="120" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
          <line x1="0" y1="180" x2="380" y2="180" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
          <line x1="0" y1="240" x2="380" y2="240" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
          <text x="6" y="58" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="monospace">2380</text>
          <text x="6" y="118" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="monospace">2350</text>
          <text x="6" y="178" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="monospace">2320</text>
          <text x="6" y="238" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="monospace">2290</text>
          <line x1="48" y1="100" x2="48" y2="210" stroke="#c0392b" strokeWidth="1.5"/>
          <rect x="40" y="120" width="16" height="68" fill="#c0392b" opacity="0.85"/>
          <line x1="82" y1="115" x2="82" y2="215" stroke="#c0392b" strokeWidth="1.5"/>
          <rect x="74" y="130" width="16" height="60" fill="#c0392b" opacity="0.85"/>
          <line x1="30" y1="188" x2="200" y2="188" stroke="rgba(192,57,43,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
          <text x="34" y="183" fill="rgba(192,57,43,0.8)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">LIQUIDITY SWEEP</text>
          <line x1="116" y1="195" x2="116" y2="135" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-hero)"/>
          <rect x="108" y="145" width="16" height="40" fill="#c9a84c" opacity="0.9" filter="url(#glow-hero)"/>
          <line x1="150" y1="170" x2="150" y2="110" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-hero)"/>
          <rect x="142" y="118" width="16" height="44" fill="#c9a84c" filter="url(#glow-hero)"/>
          <line x1="184" y1="155" x2="184" y2="85" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-hero)"/>
          <rect x="176" y="92" width="16" height="56" fill="#c9a84c" filter="url(#glow-hero)"/>
          <line x1="218" y1="130" x2="218" y2="70" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-hero)"/>
          <rect x="210" y="78" width="16" height="46" fill="#c9a84c" filter="url(#glow-hero)"/>
          <line x1="252" y1="105" x2="252" y2="50" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-hero)"/>
          <rect x="244" y="58" width="16" height="42" fill="#c9a84c" filter="url(#glow-hero)"/>
          <rect x="108" y="108" width="80" height="32" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
          <text x="114" y="128" fill="rgba(201,168,76,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">FAIR VALUE GAP</text>
          <path d="M 280 180 L 360 60" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="6,4"/>
          <polygon points="357,50 365,68 350,62" fill="rgba(201,168,76,0.6)"/>
        </svg>
      </motion.div>
    </section>
  )
}
