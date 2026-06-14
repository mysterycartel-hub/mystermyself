'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

export default function TCUHero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 48px 80px',
    }}>
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-slash" />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.2)} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Space Mono", monospace' }}>
            Gold Trading Education — XAUUSD Mastery
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 {...fadeUp(0.4)} style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(5rem, 11vw, 9.5rem)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          marginBottom: 32,
        }}>
          MASTER<br />
          <span style={{ color: 'var(--gold)' }}>THE GOLD</span><br />
          <span style={{ WebkitTextStroke: '1px rgba(201,168,76,0.5)', color: 'transparent' }}>MARKET</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.6)} style={{
          fontSize: '0.85rem',
          lineHeight: 1.8,
          color: 'rgba(245,240,232,0.65)',
          maxWidth: 520,
          marginBottom: 48,
          fontFamily: '"Space Mono", monospace',
        }}>
          The Trading Chef University teaches you how to read liquidity sweeps, institutional order flow, and market structure on gold — so you stop guessing and start executing with precision.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.8)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/trading-chef-university#pricing" className="btn-primary">
            <span>Start For Free →</span>
          </Link>
          <Link href="/trading-chef-university#curriculum" className="btn-secondary">
            See The Curriculum
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(1.0)} style={{
          display: 'flex',
          gap: 48,
          marginTop: 64,
          paddingTop: 40,
          borderTop: '1px solid rgba(201,168,76,0.15)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '6', label: 'Core Modules' },
            { num: '3', label: 'Session Setups' },
            { num: 'XAUUSD', label: 'Primary Market' },
            { num: '8AM', label: 'Signature Setup' },
          ].map((s) => (
            <div key={s.label}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.8rem', color: 'var(--gold)', lineHeight: 1, display: 'block' }}>
                {s.num}
              </span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginTop: 4, display: 'block', fontFamily: '"Space Mono", monospace' }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Candlestick chart SVG */}
      <div style={{
        position: 'absolute',
        right: '6%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 380,
        opacity: 0.9,
      }}
        className="hidden xl:block"
      >
        <svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <filter id="glow-tcu">
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
          <line x1="116" y1="195" x2="116" y2="135" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-tcu)"/>
          <rect x="108" y="145" width="16" height="40" fill="#c9a84c" opacity="0.9" filter="url(#glow-tcu)"/>
          <line x1="150" y1="170" x2="150" y2="110" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-tcu)"/>
          <rect x="142" y="118" width="16" height="44" fill="#c9a84c" filter="url(#glow-tcu)"/>
          <line x1="184" y1="155" x2="184" y2="85" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-tcu)"/>
          <rect x="176" y="92" width="16" height="56" fill="#c9a84c" filter="url(#glow-tcu)"/>
          <line x1="218" y1="130" x2="218" y2="70" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-tcu)"/>
          <rect x="210" y="78" width="16" height="46" fill="#c9a84c" filter="url(#glow-tcu)"/>
          <line x1="252" y1="105" x2="252" y2="50" stroke="#c9a84c" strokeWidth="1.5" filter="url(#glow-tcu)"/>
          <rect x="244" y="58" width="16" height="42" fill="#c9a84c" filter="url(#glow-tcu)"/>
          <rect x="108" y="108" width="80" height="32" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
          <text x="114" y="128" fill="rgba(201,168,76,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">FAIR VALUE GAP</text>
          <path d="M 280 180 L 360 60" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="6,4"/>
          <polygon points="357,50 365,68 350,62" fill="rgba(201,168,76,0.6)"/>
        </svg>
      </div>
    </section>
  )
}
