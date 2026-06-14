'use client'

import { motion } from 'framer-motion'
import { ChefHat, Truck, BookOpen, TrendingUp } from 'lucide-react'
import BrandCard from './BrandCard'

const brands = [
  {
    title: 'The Trading Chef',
    description:
      'Trading education, chart breakdowns, beginner lessons, and real market talk. Learn to read the market like a menu.',
    icon: TrendingUp,
    accent: 'gold' as const,
    cta: 'Explore Brand',
    href: '/brands#trading-chef',
    tag: 'Education',
  },
  {
    title: 'Breaded Or Not?!',
    description:
      'Wings, flavor, hustle, catering, pop-ups, and food business. From the kitchen to the community.',
    icon: ChefHat,
    accent: 'red' as const,
    cta: 'Explore Brand',
    href: '/brands#breaded',
    tag: 'Food Biz',
  },
  {
    title: 'Courier Income Lab',
    description:
      'Courier research, medical courier routes, contract delivery, and business systems for the road-based entrepreneur.',
    icon: Truck,
    accent: 'blue' as const,
    cta: 'Explore Brand',
    href: '/brands#courier',
    tag: 'Side Hustle',
  },
  {
    title: 'Money-Making Playbooks',
    description:
      'Digital guides, templates, income blueprints, and step-by-step systems for your next money move.',
    icon: BookOpen,
    accent: 'green' as const,
    cta: 'Get a Playbook',
    href: '/playbooks',
    tag: 'Digital',
  },
]

export default function BrandCards() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* BG */}
      <div className="chart-bg absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] mb-4">
            The Brands
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Four Brands.{' '}
            <span className="gold-text">One Ecosystem.</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base sm:text-lg">
            Each brand is a lane. Every lane leads to income, knowledge, and freedom.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map((brand, i) => (
            <BrandCard key={brand.title} {...brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
