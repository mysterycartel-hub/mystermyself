'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface BrandCardProps {
  title: string
  description: string
  icon: LucideIcon
  accent: 'gold' | 'red' | 'blue' | 'green'
  cta: string
  href: string
  tag?: string
  index?: number
}

const accentMap = {
  gold: {
    icon: 'bg-gradient-to-br from-[#D4AF37] to-[#B8960C] text-[#0A0A0A]',
    glow: '0 0 40px rgba(212,175,55,0.3)',
    border: 'rgba(212,175,55,0.3)',
    tag: 'bg-[rgba(212,175,55,0.15)] text-[#D4AF37]',
    btn: 'text-[#D4AF37] border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] hover:border-[#D4AF37]',
  },
  red: {
    icon: 'bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white',
    glow: '0 0 40px rgba(239,68,68,0.3)',
    border: 'rgba(239,68,68,0.3)',
    tag: 'bg-[rgba(239,68,68,0.15)] text-[#EF4444]',
    btn: 'text-[#EF4444] border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.1)] hover:border-[#EF4444]',
  },
  blue: {
    icon: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white',
    glow: '0 0 40px rgba(59,130,246,0.3)',
    border: 'rgba(59,130,246,0.3)',
    tag: 'bg-[rgba(59,130,246,0.15)] text-[#3B82F6]',
    btn: 'text-[#3B82F6] border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.1)] hover:border-[#3B82F6]',
  },
  green: {
    icon: 'bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white',
    glow: '0 0 40px rgba(34,197,94,0.3)',
    border: 'rgba(34,197,94,0.3)',
    tag: 'bg-[rgba(34,197,94,0.15)] text-[#22C55E]',
    btn: 'text-[#22C55E] border-[rgba(34,197,94,0.3)] hover:bg-[rgba(34,197,94,0.1)] hover:border-[#22C55E]',
  },
}

export default function BrandCard({
  title,
  description,
  icon: Icon,
  accent,
  cta,
  href,
  tag,
  index = 0,
}: BrandCardProps) {
  const a = accentMap[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(17,17,17,0.8)',
        backdropFilter: 'blur(16px)',
        border: `1px solid rgba(255,255,255,0.06)`,
        transition: 'all 0.35s ease',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.border = `1px solid ${a.border}`
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = a.glow
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.border = `1px solid rgba(255,255,255,0.06)`
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${a.border}, transparent)`,
        }}
      />

      <div className="p-6 sm:p-7 flex flex-col h-full gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.icon} shadow-lg`}>
            <Icon size={22} strokeWidth={2} />
          </div>
          {tag && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${a.tag}`}>
              {tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-white/95 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">{description}</p>
        </div>

        {/* CTA */}
        <Link
          href={href}
          className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all duration-200 w-fit ${a.btn}`}
        >
          {cta}
          <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
