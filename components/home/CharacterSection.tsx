'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/**
 * TCU Canon Characters — locked. Do not invent new characters.
 * Source: data/canon/scott-king-coast.json
 */
const characters = [
  {
    name: 'The Trading Chef',
    emoji: '👨‍🍳',
    role: 'System Architect',
    color: '#c9a84c',
    tagline: 'The kitchen is open. The recipe is the framework.',
    bio: 'The Trading Chef built the entire system. Eight steps from chart to execution. He doesn\'t chase — he reads the structure, identifies the flow, and lets the recipe do the work. Education-first. Execution-second.',
    lessons: ['Read before you trade', 'The recipe IS the edge', 'Patience makes the profit', 'Structure over signals'],
    cta: 'Enter Market Marina',
    href: '/market-marina',
  },
  {
    name: 'Candle Kid',
    emoji: '🕯️',
    role: 'Pattern Reader',
    color: '#A855F7',
    tagline: 'Every candle tells a story. He reads all of them.',
    bio: 'Candle Kid is obsessed with price action. Every wick, every body, every gap tells a story — and Candle Kid reads all of it. Not a guesser, a reader. Session timing, candlestick patterns, and entries that make sense.',
    lessons: ['Every candle has a story', 'The close matters most', 'Wicks hunt stops', 'Context makes patterns'],
    cta: 'Learn Price Action',
    href: '/academy',
  },
  {
    name: 'Wickie',
    emoji: '🎯',
    role: 'Wick Hunter',
    color: '#EF4444',
    tagline: 'Wicks don\'t lie. They just move fast.',
    bio: 'Wickie understands stop hunts better than anyone on the coast. When price spikes through a level and reverses — that\'s his territory. He teaches you where stops get hit and why smart money needs your liquidity before the real move.',
    lessons: ['Stop hunts create entries', 'Wicks reveal intent', 'Patience past the spike', 'Smart money needs your stops'],
    cta: 'Study Wicks',
    href: '/academy',
  },
  {
    name: 'Louie Liquidity',
    emoji: '🌊',
    role: 'Flow King',
    color: '#3B82F6',
    tagline: 'Follow the liquidity. That\'s where price is going.',
    bio: 'Louie understands where the money is — literally. He tracks liquidity pools, understands institutional footprints, and knows where price needs to go before it gets there. He reads the order flow.',
    lessons: ['Follow the liquidity', 'Institutions leave footprints', 'The wick tells the story', 'Smart money moves first'],
    cta: 'Learn Order Flow',
    href: '/academy',
  },
  {
    name: 'Chef Goldie',
    emoji: '✨',
    role: 'Gold Specialist',
    color: '#c9a84c',
    tagline: 'XAUUSD is the main dish. He cooks it daily.',
    bio: 'Chef Goldie is the master of gold. XAUUSD is his market and his obsession. He never chases a candle — he waits for the setup to come to him, then executes with precision. His kitchen runs on structure, liquidity, and discipline.',
    lessons: ['Wait for the setup', 'Gold has rhythm', 'Patience IS the edge', 'Every trade is a recipe'],
    cta: 'Learn Gold Trading',
    href: '/market-marina',
  },
  {
    name: 'Grandma Market',
    emoji: '🧓',
    role: 'Structure Elder',
    color: '#7a6230',
    tagline: 'She\'s seen every cycle. She doesn\'t panic.',
    bio: 'Grandma Market has seen every cycle — bear markets, crashes, euphoria, and everything between. She doesn\'t panic because she\'s been here before. Her perspective is the rarest edge in trading. Higher timeframe wisdom.',
    lessons: ['This has happened before', 'Structure always wins', 'Long-term thinking wins', 'Don\'t trade with emotion'],
    cta: 'Learn Market Structure',
    href: '/academy',
  },
  {
    name: 'Nana Value',
    emoji: '💎',
    role: 'Gap Finder',
    color: '#22C55E',
    tagline: 'Fair value gaps are her love language.',
    bio: 'Nana Value finds where price left imbalances. Fair value gaps, discount zones, and premium levels — she maps them all. When price returns to fill an imbalance, she\'s already positioned. She doesn\'t chase. She waits at value.',
    lessons: ['Imbalances always fill', 'Buy at discount', 'Sell at premium', 'Fair value is the magnet'],
    cta: 'Study Fair Value',
    href: '/academy',
  },
  {
    name: 'Melissa Mayhem',
    emoji: '⚡',
    role: 'Volatility Expert',
    color: '#F97316',
    tagline: 'News hits. Volatility spikes. She\'s ready.',
    bio: 'Melissa Mayhem thrives in chaos. News events, NFP, FOMC, rate decisions — when volatility spikes and everyone panics, she\'s already reading the structure underneath. She doesn\'t avoid events. She trades the reaction.',
    lessons: ['Volatility is opportunity', 'Trade the reaction', 'News is noise without structure', 'Sessions have personality'],
    cta: 'Study News Trading',
    href: '/academy',
  },
  {
    name: 'Melody Mayhem',
    emoji: '🎵',
    role: 'Rhythm Trader',
    color: '#EC4899',
    tagline: 'Price has a rhythm. She hears it.',
    bio: 'Melody Mayhem feels the rhythm of price. Harmonic patterns, confluences, and flow states — she finds the music in the market. When price is in rhythm, the entries are clean and the flow is natural.',
    lessons: ['Price moves in rhythm', 'Confluences compound', 'Flow state is real', 'The pattern repeats'],
    cta: 'Learn Market Rhythm',
    href: '/academy',
  },
  {
    name: 'Rico Rhythm',
    emoji: '🎶',
    role: 'Momentum Trader',
    color: '#8B5CF6',
    tagline: 'Feel the momentum. Ride the rhythm.',
    bio: 'Rico Rhythm is the flow state master of Market Marina. When the market builds momentum, Rico is already positioned. He reads the tempo of price — knowing when to ride the wave and when to step off the floor. Momentum is the rhythm. Flow is the edge.',
    lessons: ['Momentum needs confirmation', 'Flow state is repeatable', 'Exit before the beat drops', 'Ride it — don\'t chase it'],
    cta: 'Learn Momentum',
    href: '/academy',
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
          <span className="section-label-text">Market Marina · TCU Canon</span>
        </div>
        <h2 className="section-title">
          MEET THE<br />
          <span style={{ color: 'var(--gold)' }}>TCU KITCHEN</span>
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', maxWidth: 500, lineHeight: 1.8 }}>
          Ten characters. One trading kitchen. Each one represents a trading concept inside Trading Chef University.
          Click to learn their lessons. These are the voices of Market Marina.
        </p>
      </motion.div>

      {/* Character grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 2,
        marginBottom: 2,
      }}>
        {characters.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            onClick={() => setSelected(selected === c.name ? null : c.name)}
            className="character-card"
            style={{
              borderColor: selected === c.name ? c.color : 'rgba(201,168,76,0.1)',
              boxShadow: selected === c.name ? `0 0 30px ${c.color}20` : 'none',
              cursor: 'pointer',
            }}
          >
            {/* Avatar */}
            <motion.div
              animate={{ y: selected === c.name ? -4 : 0 }}
              style={{
                fontSize: '3rem',
                marginBottom: 12,
                display: 'block',
                lineHeight: 1,
              }}
            >
              {c.emoji}
            </motion.div>

            {/* Role badge */}
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.45rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              background: `${c.color}20`,
              color: c.color,
              display: 'inline-block',
              marginBottom: 10,
            }}>
              {c.role}
            </span>

            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.15rem',
              letterSpacing: '0.05em',
              color: selected === c.name ? c.color : 'var(--cream)',
              marginBottom: 6,
            }}>
              {c.name}
            </h3>

            <p style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6, fontStyle: 'italic' }}>
              &ldquo;{c.tagline}&rdquo;
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                  Ready to think like {active.name.split(' ').pop()}?
                </p>
                <Link href={active.href} className="btn-primary">
                  <span>{active.cta} →</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <div style={{
        textAlign: 'center',
        padding: '48px 20px',
        borderTop: '1px solid rgba(201,168,76,0.06)',
      }}>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.4)',
          marginBottom: 16,
        }}>
          Trading Chef Universe · 10 Characters · Market Marina
        </p>
        <Link href="/market-marina" style={{ textDecoration: 'none' }}>
          <div className="btn-secondary">
            Enter Market Marina →
          </div>
        </Link>
      </div>
    </section>
  )
}
