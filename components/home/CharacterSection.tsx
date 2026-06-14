'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const characters = [
  {
    name: 'Chef Goldie',
    emoji: '👨‍🍳',
    role: 'The Strategist',
    color: '#c9a84c',
    tagline: 'Cooking up golden setups and smart moves.',
    bio: 'Chef Goldie is the master of patience. He never chases a candle — he waits for the setup to come to him, then executes with precision. His kitchen runs on structure, liquidity, and discipline.',
    lessons: ['Wait for the setup', 'Read the structure first', 'Patience IS the edge', 'Every trade is a recipe'],
    cta: 'Learn The TCU Method',
    href: '/trading-chef-university',
  },
  {
    name: 'Penny The Saver',
    emoji: '💰',
    role: 'The Stacker',
    color: '#22C55E',
    tagline: 'She saves, she stacks, she builds wealth.',
    bio: 'Penny understands that wealth is built in the quiet moments — consistent deposits, compounding returns, and the discipline to not touch what\'s growing. She\'s not flashy, but she wins.',
    lessons: ['Automate the savings', 'Compound is the game', 'Discipline beats motivation', 'Stack before you spend'],
    cta: 'Get The Playbook',
    href: '/playbooks',
  },
  {
    name: 'Flip The Risk-Taker',
    emoji: '🎯',
    role: 'The Bold One',
    color: '#c0392b',
    tagline: 'Big dreams. Calculated risks. Bigger wins.',
    bio: 'Flip doesn\'t take blind risks — he takes educated ones. He\'s done the research, knows the downside, and commits fully. Most people see volatility; Flip sees opportunity.',
    lessons: ['Know your downside first', 'Size positions correctly', 'Conviction comes from research', 'Bold is not reckless'],
    cta: 'Find Your Play',
    href: '/#lead',
  },
  {
    name: 'Grandma Market',
    emoji: '🧓',
    role: 'The Elder',
    color: '#7a6230',
    tagline: 'Wisdom, patience, and generational knowledge.',
    bio: 'Grandma Market has seen every cycle — bear markets, crashes, euphoria, and everything between. She doesn\'t panic because she\'s been here before. Her perspective is the rarest edge in trading.',
    lessons: ['This has happened before', 'Markets always recover', 'Long-term thinking wins', 'Don\'t trade with emotion'],
    cta: 'Join The Community',
    href: '/community',
  },
  {
    name: 'Louie The Liquidity Chef',
    emoji: '🌊',
    role: 'The Flow King',
    color: '#3B82F6',
    tagline: 'Adds liquidity, stirs the market just right.',
    bio: 'Louie understands where the money is — literally. He tracks liquidity pools, understands institutional footprints, and knows where price needs to go before it gets there. He reads the flow.',
    lessons: ['Follow the liquidity', 'Institutions leave footprints', 'The wick tells the story', 'Smart money moves first'],
    cta: 'Learn Liquidity',
    href: '/trading-chef-university#curriculum',
  },
  {
    name: 'Candle Kid',
    emoji: '🕯️',
    role: 'The Reader',
    color: '#A855F7',
    tagline: 'Reads candles, tells the future — almost.',
    bio: 'Candle Kid is obsessed with price action. Every wick, every body, every gap tells a story — and Candle Kid reads all of it. Not a guesser, a reader. There\'s a difference.',
    lessons: ['Every candle has a story', 'The close matters most', 'Wicks hunt stops', 'Context makes patterns'],
    cta: 'Start Reading Charts',
    href: '/trading-chef',
  },
]

export default function CharacterSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const active = characters.find((c) => c.name === selected)

  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">The Characters</span>
        </div>
        <h2 className="section-title">
          MEET THE<br />
          <span style={{ color: 'var(--gold)' }}>CAST</span>
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 440, lineHeight: 1.8 }}>
          Each character represents a money mindset. Click to learn their lessons.
        </p>
      </motion.div>

      {/* Character grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 2,
        marginBottom: 2,
      }}>
        {characters.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => setSelected(selected === c.name ? null : c.name)}
            className="character-card"
            style={{
              borderColor: selected === c.name ? c.color : 'rgba(201,168,76,0.1)',
              boxShadow: selected === c.name ? `0 0 30px ${c.color}20` : 'none',
              cursor: 'none',
            }}
          >
            {/* Avatar */}
            <motion.div
              animate={{ y: selected === c.name ? -4 : 0 }}
              style={{
                fontSize: '3.5rem',
                marginBottom: 16,
                display: 'block',
                lineHeight: 1,
              }}
            >
              {c.emoji}
            </motion.div>

            {/* Role badge */}
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              background: `${c.color}20`,
              color: c.color,
              display: 'inline-block',
              marginBottom: 12,
            }}>
              {c.role}
            </span>

            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.3rem',
              letterSpacing: '0.05em',
              color: selected === c.name ? c.color : 'var(--cream)',
              marginBottom: 8,
            }}>
              {c.name}
            </h3>

            <p style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{c.tagline}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: 'rgba(6,6,8,0.9)',
              border: `1px solid ${active.color}25`,
              padding: '48px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 48,
            }}>
              {/* Bio */}
              <div>
                <div style={{ fontSize: '4rem', marginBottom: 16 }}>{active.emoji}</div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: active.color, letterSpacing: '0.05em', marginBottom: 8 }}>
                  {active.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.8 }}>
                  {active.bio}
                </p>
              </div>

              {/* Lessons */}
              <div>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: active.color, marginBottom: 24, fontFamily: '"Space Mono", monospace' }}>
                  Core Lessons
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {active.lessons.map((l, li) => (
                    <div key={l} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                    }}>
                      <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: `${active.color}40`, minWidth: 32 }}>
                        {String(li + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.7)' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20 }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.5)', fontStyle: 'italic', lineHeight: 1.7 }}>
                  Ready to think like {active.name.split(' ')[0]}?
                </p>
                <Link href={active.href} className="btn-primary">
                  <span>{active.cta} →</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
