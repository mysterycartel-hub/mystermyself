'use client'

import { motion } from 'framer-motion'
import { Play, ChevronRight, BookOpen, TrendingUp, ArrowDown } from 'lucide-react'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

// Animated candlestick chart decoration
function CandlestickDecoration() {
  const candles = [
    { x: 20, high: 60, low: 160, open: 100, close: 80, bull: true },
    { x: 60, high: 40, low: 150, open: 120, close: 60, bull: true },
    { x: 100, high: 50, low: 140, open: 90, close: 110, bull: false },
    { x: 140, high: 30, low: 130, open: 80, close: 50, bull: true },
    { x: 180, high: 20, low: 120, open: 100, close: 40, bull: true },
    { x: 220, high: 40, low: 140, open: 90, close: 120, bull: false },
    { x: 260, high: 10, low: 110, open: 70, close: 30, bull: true },
    { x: 300, high: 25, low: 115, open: 80, close: 50, bull: true },
  ]

  return (
    <svg
      viewBox="0 0 340 180"
      className="absolute inset-0 w-full h-full opacity-20"
      preserveAspectRatio="xMidYMid slice"
    >
      {candles.map((c, i) => (
        <g key={i}>
          {/* Wick */}
          <line
            x1={c.x}
            y1={c.high}
            x2={c.x}
            y2={c.low}
            stroke={c.bull ? '#D4AF37' : '#EF4444'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Body */}
          <rect
            x={c.x - 8}
            y={c.bull ? c.close : c.open}
            width="16"
            height={Math.abs(c.open - c.close)}
            rx="2"
            fill={c.bull ? '#D4AF37' : '#EF4444'}
            fillOpacity="0.8"
          />
        </g>
      ))}
      {/* Trend line */}
      <polyline
        points="20,80 60,60 100,110 140,50 180,40 220,120 260,30 300,50"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.5"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden candlestick-bg">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="chart-bg absolute inset-0" />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[rgba(212,175,55,0.06)] via-transparent to-transparent pointer-events-none" />

      {/* Red energy glow top-right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[rgba(239,68,68,0.08)] via-transparent to-transparent pointer-events-none" />

      {/* Bottom-left glow */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-radial from-[rgba(212,175,55,0.05)] via-transparent to-transparent pointer-events-none" />

      {/* Candlestick chart visual (background card) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[60%] hidden lg:block">
        <div className="relative w-full h-full rounded-l-3xl glass border border-r-0 border-[rgba(212,175,55,0.12)] overflow-hidden">
          <CandlestickDecoration />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="text-xs text-[#D4AF37]/60 font-mono">CHEF/USD</span>
            <span className="text-sm font-bold text-[#4CAF50]">+12.4%</span>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
            <span className="text-[10px] text-white/30 font-mono">LIVE</span>
            <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-0">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[rgba(212,175,55,0.3)] text-xs font-medium text-[#D4AF37] mb-6"
          >
            <TrendingUp size={12} />
            <span>The MysterMyself Ecosystem</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-6"
          >
            <span className="block text-white">Learn Skills.</span>
            <span className="block gold-text">Find Income</span>
            <span className="block text-white">
              Plays.{' '}
              <span className="relative inline-block">
                <span className="red-glow-text">Build</span>
              </span>
            </span>
            <span className="block text-white/90 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Your Next
            </span>
            <span className="block gold-text">Money Move.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-10 font-light"
          >
            Trading education, money-making ideas, courier &amp; business research, and food brand
            entrepreneurship — all in one powerful ecosystem.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3 items-center mb-12"
          >
            <Link href="#lead-magnet" className="btn-gold text-sm sm:text-base">
              Start Here
              <ChevronRight size={18} />
            </Link>

            <a
              href="https://www.youtube.com/@mystermyself"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm sm:text-base"
            >
              <Play size={16} fill="currentColor" />
              Watch on YouTube
            </a>

            <Link href="#lead-magnet" className="btn-red text-sm sm:text-base">
              <BookOpen size={16} />
              Get the Free Guide
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-6 items-center"
          >
            {[
              { label: 'Brand Verticals', value: '4+' },
              { label: 'Free Resources', value: '100+' },
              { label: 'Income Plays', value: '∞' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black gold-text">{stat.value}</span>
                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[#D4AF37]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
