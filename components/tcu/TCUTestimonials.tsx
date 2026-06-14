'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    initials: 'DM',
    name: 'Darius M.',
    handle: 'Gold Playbook Student',
    quote: '"I spent 6 months watching random YouTube channels getting nowhere. The TCU liquidity sweep module alone changed everything for me. I finally understand why price moves before I try to catch it."',
  },
  {
    initials: 'TL',
    name: 'Tamara L.',
    handle: 'TCU Member — 3 months',
    quote: '"The 8AM setup is no joke. Once I started only trading that window with the structure TCU taught me, my win rate went from random to consistent. The discipline framework is real."',
  },
  {
    initials: 'KR',
    name: 'Kevin R.',
    handle: 'Starter Guide → Member Upgrade',
    quote: '"I used to trade every session and burn myself out. TCU helped me narrow in on what actually matters — the right session, the right structure, the right patience. Game changer."',
  },
]

export default function TCUTestimonials() {
  return (
    <section style={{ background: 'var(--deep)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <div className="section-label-line" />
          <span className="section-label-text">Student Results</span>
          <div className="section-label-line" />
        </div>
        <h2 className="section-title">
          FROM THE<br />
          <span style={{ color: 'var(--gold)' }}>KITCHEN TABLE</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="testimonial-card"
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, si) => (
                <span key={si} style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'var(--cream)',
              marginBottom: 24,
            }}>
              {t.quote}
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.1rem',
                color: 'var(--black)',
                flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cream)', display: 'block', fontFamily: '"Space Mono", monospace' }}>
                  {t.name}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--gold)', marginTop: 2, display: 'block', fontFamily: '"Space Mono", monospace' }}>
                  {t.handle}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
