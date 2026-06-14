'use client'

import { motion } from 'framer-motion'
import CharacterCard from './CharacterCard'

const characters = [
  {
    name: 'Chef Goldie',
    tagline: 'Cooking up golden setups and smart moves. Every trade plated to perfection.',
    emoji: '👨‍🍳',
    role: 'The Strategist',
    accent: 'gold',
  },
  {
    name: 'Penny The Saver',
    tagline: 'She saves, she stacks, she builds wealth. Penny knows compounding is the real recipe.',
    emoji: '💰',
    role: 'The Saver',
    accent: 'green',
  },
  {
    name: 'Flip The Risk-Taker',
    tagline: 'Big dreams. Calculated risks. Bigger wins. Flip goes where others are afraid to look.',
    emoji: '🎯',
    role: 'The Bold One',
    accent: 'red',
  },
  {
    name: 'Grandma Market',
    tagline: 'Wisdom, patience, and generational knowledge. She\'s seen every cycle — twice.',
    emoji: '🧓',
    role: 'The Elder',
    accent: 'purple',
  },
  {
    name: 'Louie The Liquidity Chef',
    tagline: 'Adds liquidity, stirs the market just right. If it\'s flowing, Louie made it happen.',
    emoji: '🌊',
    role: 'The Flow King',
    accent: 'blue',
  },
  {
    name: 'Candle Kid',
    tagline: 'Reads candles, tells the future — almost. Candle Kid sees what others miss.',
    emoji: '🕯️',
    role: 'The Reader',
    accent: 'orange',
  },
]

export default function MeetTheCharacters() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0B0A] to-[#0A0A0A]" />
      <div className="chart-bg absolute inset-0 opacity-30" />

      {/* Gold glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gradient-radial from-[rgba(212,175,55,0.04)] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] mb-4">
            The Cast
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Meet The <span className="gold-text">Characters</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Each character represents a money mindset. Which one are you?
          </p>
        </motion.div>

        {/* Characters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.map((char, i) => (
            <CharacterCard key={char.name} {...char} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
