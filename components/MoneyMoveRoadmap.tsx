'use client'

import { motion } from 'framer-motion'
import { Youtube, FileDown, Users, DollarSign } from 'lucide-react'
import RoadmapStep from './RoadmapStep'

const steps = [
  {
    step: 1,
    title: 'Free Content',
    description:
      'Start with free YouTube videos, short-form content, and guides. Build the foundation without spending a dollar.',
    icon: Youtube,
    accent: 'gold' as const,
  },
  {
    step: 2,
    title: 'Downloadable Guides',
    description:
      'Grab targeted playbooks and templates for trading, courier income, food business, or digital products.',
    icon: FileDown,
    accent: 'gold' as const,
  },
  {
    step: 3,
    title: 'Community',
    description:
      'Join the inner circle. Connect with others building their money moves and get real-time insight.',
    icon: Users,
    accent: 'red' as const,
  },
  {
    step: 4,
    title: 'Monetization & Execution',
    description:
      'Launch, scale, and earn. Apply the skills, run the plays, and build income that works for you.',
    icon: DollarSign,
    accent: 'red' as const,
  },
]

export default function MoneyMoveRoadmap() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-radial from-[rgba(212,175,55,0.04)] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#EF4444] border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.05)] mb-4">
            The Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Your <span className="gold-text">Money Move</span> Roadmap
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Four steps from zero to execution. No fluff, just the path.
          </p>
        </motion.div>

        {/* Steps — horizontal desktop, stacked mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((s, i) => (
            <RoadmapStep key={s.step} {...s} isLast={i === steps.length - 1} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm">
            Ready to start?{' '}
            <a href="#lead-magnet" className="text-[#D4AF37] font-semibold hover:underline">
              Grab the free guide →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
