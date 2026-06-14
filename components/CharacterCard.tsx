'use client'

import { motion } from 'framer-motion'

interface CharacterCardProps {
  name: string
  tagline: string
  emoji: string
  role: string
  accent: string
  index?: number
}

const accentStyles: Record<string, { border: string; glow: string; badge: string; emoji_bg: string }> = {
  gold: {
    border: 'border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]',
    badge: 'bg-[rgba(212,175,55,0.1)] text-[#D4AF37]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(212,175,55,0.2)] to-[rgba(212,175,55,0.05)]',
  },
  red: {
    border: 'border-[rgba(239,68,68,0.25)] hover:border-[rgba(239,68,68,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]',
    badge: 'bg-[rgba(239,68,68,0.1)] text-[#EF4444]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(239,68,68,0.2)] to-[rgba(239,68,68,0.05)]',
  },
  blue: {
    border: 'border-[rgba(59,130,246,0.25)] hover:border-[rgba(59,130,246,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    badge: 'bg-[rgba(59,130,246,0.1)] text-[#3B82F6]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)]',
  },
  purple: {
    border: 'border-[rgba(168,85,247,0.25)] hover:border-[rgba(168,85,247,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    badge: 'bg-[rgba(168,85,247,0.1)] text-[#A855F7]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(168,85,247,0.2)] to-[rgba(168,85,247,0.05)]',
  },
  green: {
    border: 'border-[rgba(34,197,94,0.25)] hover:border-[rgba(34,197,94,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
    badge: 'bg-[rgba(34,197,94,0.1)] text-[#22C55E]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(34,197,94,0.2)] to-[rgba(34,197,94,0.05)]',
  },
  orange: {
    border: 'border-[rgba(249,115,22,0.25)] hover:border-[rgba(249,115,22,0.5)]',
    glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    badge: 'bg-[rgba(249,115,22,0.1)] text-[#F97316]',
    emoji_bg: 'bg-gradient-to-br from-[rgba(249,115,22,0.2)] to-[rgba(249,115,22,0.05)]',
  },
}

export default function CharacterCard({
  name,
  tagline,
  emoji,
  role,
  accent,
  index = 0,
}: CharacterCardProps) {
  const a = accentStyles[accent] ?? accentStyles.gold

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group glass rounded-2xl border p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 cursor-default ${a.border} ${a.glow}`}
    >
      {/* Emoji avatar container */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4 + index * 0.5, ease: 'easeInOut' }}
        className={`w-20 h-20 rounded-2xl ${a.emoji_bg} flex items-center justify-center text-4xl shadow-lg border border-white/5`}
      >
        {emoji}
      </motion.div>

      {/* Role badge */}
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${a.badge}`}>
        {role}
      </span>

      {/* Name */}
      <h3 className="text-lg font-black text-white">{name}</h3>

      {/* Tagline */}
      <p className="text-sm text-white/50 leading-relaxed">{tagline}</p>
    </motion.div>
  )
}
