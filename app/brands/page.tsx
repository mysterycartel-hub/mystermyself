'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { TrendingUp, ChefHat, Truck, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const brands = [
  {
    id: 'trading-chef',
    icon: TrendingUp,
    name: 'The Trading Chef',
    tagline: 'Where charts meet culinary precision.',
    description:
      'The Trading Chef is Maurice Scott\'s trading education brand — breaking down charts, candlestick patterns, and market setups in a way that\'s approachable, real, and actionable. Whether you\'re just learning to read a chart or refining your edge, The Trading Chef serves up fresh market breakdowns and educational content designed for the everyday person trying to build a skill in trading.',
    features: [
      'Beginner-friendly chart breakdowns',
      'Candlestick pattern lessons',
      'Real market analysis',
      'Strategy walkthroughs',
      'YouTube content & shorts',
    ],
    accent: '#D4AF37',
    glow: 'rgba(212,175,55,0.15)',
    border: 'rgba(212,175,55,0.3)',
  },
  {
    id: 'breaded',
    icon: ChefHat,
    name: 'Breaded Or Not?!',
    tagline: 'Wings, flavor, and food business hustle.',
    description:
      'Breaded Or Not?! is the food brand — wings, sauces, catering, pop-ups, and the business of food entrepreneurship. This brand is for the food lovers, the home cooks who dream bigger, the catering entrepreneurs, and anyone who wants to turn flavor into income. It\'s about the culture, the craft, and the come-up.',
    features: [
      'Wing flavors & sauce concepts',
      'Food business strategies',
      'Pop-up & catering systems',
      'Brand building in the food space',
      'Recipe development & content',
    ],
    accent: '#EF4444',
    glow: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.3)',
  },
  {
    id: 'courier',
    icon: Truck,
    name: 'Courier Income Lab',
    tagline: 'Research, routes, and road-based income.',
    description:
      'Courier Income Lab is the research hub for delivery and courier-based income. Medical courier routes, contract delivery, route acquisition, and delivery business systems — all researched and distilled for the road-based entrepreneur. If you want to build income from your vehicle or scale a delivery operation, this is your lane.',
    features: [
      'Medical courier route research',
      'Contract delivery systems',
      'Route valuation & acquisition',
      'Income projection tools',
      'Business structure guides',
    ],
    accent: '#3B82F6',
    glow: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    id: 'playbooks',
    icon: BookOpen,
    name: 'Money-Making Playbooks',
    tagline: 'Step-by-step systems for your next move.',
    description:
      'The Playbooks brand is the digital product arm of the MysterMyself ecosystem. Templates, guides, income blueprints, and step-by-step systems for anyone ready to take action. Each playbook is built to give you a head start — not theory, but actual frameworks you can implement to start building income today.',
    features: [
      'Income idea playbooks',
      'Business launch templates',
      'Trading education guides',
      'Courier income blueprints',
      'Food business starter kits',
    ],
    accent: '#22C55E',
    glow: 'rgba(34,197,94,0.15)',
    border: 'rgba(34,197,94,0.3)',
  },
]

export default function BrandsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="chart-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] mb-5">
              The Ecosystem
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              The <span className="gold-text">Brands</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Four distinct lanes. One unified mission: give you the skills, plays, and systems to build income on your own terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand sections */}
      <section className="py-10 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              id={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass rounded-3xl border overflow-hidden"
              style={{ borderColor: brand.border }}
            >
              {/* Top color bar */}
              <div className="h-1" style={{ background: brand.accent }} />

              <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: info */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${brand.accent}20`, border: `1px solid ${brand.border}` }}
                  >
                    <brand.icon size={22} style={{ color: brand.accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: brand.accent }}>
                      Brand 0{i + 1}
                    </p>
                    <h2 className="text-3xl font-black text-white mb-1">{brand.name}</h2>
                    <p className="text-white/50 text-sm font-medium italic">{brand.tagline}</p>
                  </div>
                  <p className="text-white/60 leading-relaxed">{brand.description}</p>
                  <Link
                    href={i === 3 ? '/playbooks' : '#lead-magnet'}
                    className="btn-outline-gold w-fit text-sm mt-2"
                    style={{ color: brand.accent, borderColor: brand.border } as React.CSSProperties}
                  >
                    Explore {brand.name}
                    <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Right: features */}
                <div className="lg:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">What's Included</p>
                  <ul className="flex flex-col gap-3">
                    {brand.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black"
                          style={{ background: `${brand.accent}20`, color: brand.accent }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
