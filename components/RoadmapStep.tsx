'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface RoadmapStepProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
  accent: 'gold' | 'red' | 'white'
  isLast?: boolean
  index?: number
}

const accentColors = {
  gold: {
    step: 'bg-gradient-to-br from-[#D4AF37] to-[#B8960C] text-[#0A0A0A]',
    icon: 'text-[#D4AF37]',
    border: 'border-[rgba(212,175,55,0.3)]',
    glow: 'shadow-[0_0_20px_rgba(212,175,55,0.2)]',
    connector: 'from-[#D4AF37]/40',
  },
  red: {
    step: 'bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white',
    icon: 'text-[#EF4444]',
    border: 'border-[rgba(239,68,68,0.3)]',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    connector: 'from-[#EF4444]/40',
  },
  white: {
    step: 'bg-white/10 text-white',
    icon: 'text-white/60',
    border: 'border-white/10',
    glow: '',
    connector: 'from-white/20',
  },
}

export default function RoadmapStep({
  step,
  title,
  description,
  icon: Icon,
  accent,
  isLast,
  index = 0,
}: RoadmapStepProps) {
  const a = accentColors[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative flex flex-col"
    >
      {/* Desktop connector line (right side) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0">
          <div
            className={`h-px bg-gradient-to-r ${a.connector} to-transparent`}
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Mobile connector line (bottom) */}
      {!isLast && (
        <div className="lg:hidden absolute top-full left-8 w-px h-8 z-0">
          <div className={`w-px h-full bg-gradient-to-b ${a.connector} to-transparent`} />
        </div>
      )}

      <div
        className={`relative z-10 glass rounded-2xl p-6 border ${a.border} ${a.glow} hover:scale-[1.02] transition-transform duration-300`}
      >
        {/* Step badge */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-8 h-8 rounded-lg ${a.step} flex items-center justify-center text-sm font-black shrink-0`}
          >
            {step}
          </div>
          <Icon size={20} className={a.icon} />
        </div>

        {/* Text */}
        <h3 className="text-base font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
