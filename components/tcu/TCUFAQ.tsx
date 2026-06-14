'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Do I need trading experience to start?',
    a: "No. Module 1 starts from the absolute beginning — what a candle means, what market structure is, and how to orient yourself on a chart. If you can read a basic chart, you're ready. If you can't yet, the Starter Guide will get you there before you even open Module 1.",
  },
  {
    q: 'Why only gold (XAUUSD)?',
    a: 'Because mastering one market deeply beats jumping between five. Gold is liquid, active during all three sessions, and extremely responsive to institutional concepts like liquidity sweeps and fair value gaps. Once you truly understand how gold moves, everything else gets easier.',
  },
  {
    q: "What's the 8AM setup exactly?",
    a: "It's the TCU signature play — a recurring price action pattern that appears on gold at or around the New York open (8AM EST). It involves a liquidity grab followed by a structural confirmation. Full breakdown is inside Module 4 of the curriculum and covered extensively in the Gold Playbook.",
  },
  {
    q: 'Is this signals-based or education-based?',
    a: "Education. We are not a signals service. We don't tell you what to buy. We teach you how to read the chart yourself so you can find your own setups, execute your own plan, and develop real confidence. The goal is to make you independent — not dependent on us.",
  },
  {
    q: 'Can I cancel the membership anytime?',
    a: "Yes. No contracts, no tricks. Cancel before your next billing date and you won't be charged. We want people here because the value keeps them, not because the exit is hard to find.",
  },
  {
    q: 'What broker or platform do I need?',
    a: 'Any platform that lets you trade XAUUSD with a proper charting interface. TradingView for charts is what we use in all examples. Broker recommendations are included inside the membership based on your location and account size.',
  },
]

export default function TCUFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <div className="section-label-line" />
          <span className="section-label-text">FAQ</span>
          <div className="section-label-line" />
        </div>
        <h2 className="section-title">
          REAL QUESTIONS,<br />
          <span style={{ color: 'var(--gold)' }}>REAL ANSWERS</span>
        </h2>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: open === i ? 'var(--gold)' : 'var(--cream)',
                textAlign: 'left',
                padding: '24px 0',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                cursor: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
                transition: 'color 0.2s',
              }}
            >
              {faq.q}
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.4rem',
                  color: 'var(--gold)',
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    paddingBottom: 24,
                    fontSize: '0.78rem',
                    lineHeight: 1.8,
                    color: 'rgba(245,240,232,0.55)',
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
