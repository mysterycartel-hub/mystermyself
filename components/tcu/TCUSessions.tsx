'use client'

import { motion } from 'framer-motion'

const sessions = [
  {
    time: '8:00 PM – 4:00 AM',
    name: 'Asian Session',
    desc: 'Range-building phase. Price establishes liquidity levels on both sides. Your job: identify the range, not trade it.',
    tag: null,
    featured: false,
  },
  {
    time: '3:00 AM – 8:00 AM',
    name: 'London Session',
    desc: 'Where the real moves begin. London often sweeps Asian highs or lows before reversing. The killzone is your prime window.',
    tag: null,
    featured: false,
  },
  {
    time: '8:00 AM – 12:00 PM',
    name: 'New York Session',
    desc: 'NY open brings the biggest volume. Continuation or reversal of London moves. Where most institutional executions happen.',
    tag: 'Highest Volume',
    featured: false,
  },
  {
    time: '8:00 AM EST',
    name: "The Chef's Setup",
    desc: 'The 8AM setup is the TCU signature entry — a recurring pattern on gold that shows up at NY open consistently. This alone is worth the tuition.',
    tag: 'Signature Play',
    featured: true,
  },
]

export default function TCUSessions() {
  return (
    <section style={{ background: 'var(--black)' }}>
      <div className="section-label">
        <div className="section-label-line" />
        <span className="section-label-text">Trading Windows</span>
      </div>
      <h2 className="section-title">
        KNOW <span style={{ color: 'var(--gold)' }}>WHEN</span><br />
        TO COOK
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, marginTop: 64 }}>
        {sessions.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="session-card"
            style={{
              borderTopColor: s.featured ? 'var(--gold)' : 'transparent',
            }}
          >
            {s.tag && (
              <span style={{
                display: 'inline-block',
                background: s.featured ? 'var(--gold)' : 'var(--red)',
                color: s.featured ? 'var(--black)' : 'var(--cream)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                marginBottom: 12,
                fontFamily: '"Space Mono", monospace',
              }}>
                {s.tag}
              </span>
            )}
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: 4 }}>
              {s.time}
            </div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--cream)', textTransform: 'uppercase', marginBottom: 16 }}>
              {s.name}
            </div>
            <p style={{ fontSize: '0.7rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.45)' }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
