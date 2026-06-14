'use client'

import { motion } from 'framer-motion'

const modules = [
  {
    num: '01',
    icon: '📐',
    name: 'Market Structure Foundations',
    desc: 'Learn how gold actually moves. Identify highs, lows, break of structure, and the difference between continuation and reversal.',
    topics: ['Higher highs / lower lows framework', 'Break of structure (BOS) signals', 'Change of character (CHoCH)', 'Daily, weekly, monthly alignment'],
  },
  {
    num: '02',
    icon: '💧',
    name: 'Liquidity & The Sweep',
    desc: "Where does gold go to hunt stops before reversing? You'll see this pattern repeat every week once you know what to look for.",
    topics: ['Sell-side & buy-side liquidity pools', 'Stop hunts & trap identification', 'Sweep + displacement entries', 'Reading the wick game'],
  },
  {
    num: '03',
    icon: '📦',
    name: 'Supply, Demand & Fair Value Gaps',
    desc: 'Institutional imbalance zones are where price returns. FVGs, OBs, and supply/demand blocks become your entry triggers.',
    topics: ['Fair value gap (FVG) identification', 'Inverted FVG setups', 'Order blocks vs supply/demand', 'Premium vs discount zones'],
  },
  {
    num: '04',
    icon: '🕐',
    name: 'Session Mastery',
    desc: 'Asian, London, and New York sessions each have a unique personality. The 8AM setup is your edge — most traders miss it entirely.',
    topics: ['Asian range building', 'London killzone entries', 'NY open & 8AM signature play', 'Session overlap dynamics'],
  },
  {
    num: '05',
    icon: '🎯',
    name: 'Entry, Execution & Risk',
    desc: 'The setup means nothing without a clean entry protocol. We cover confirmation, placement, stop sizing, and target logic — every time.',
    topics: ['Entry confirmation checklist', 'Stop loss placement rules', 'R:R ratio framework', '"Don\'t chase the candle" discipline'],
  },
  {
    num: '06',
    icon: '🧠',
    name: 'Psychology & The Chef Mindset',
    desc: "A good cook doesn't rush the recipe. Trading discipline, journaling systems, and how to handle losses without blowing your account.",
    topics: ['Emotion vs. execution separation', 'Trade journal protocol', 'Revenge trading triggers', 'The "missing the trade" mindset reset'],
  },
]

export default function TCUCurriculum() {
  return (
    <section id="curriculum" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 64,
        flexWrap: 'wrap',
        gap: 24,
      }}>
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Curriculum</span>
          </div>
          <h2 className="section-title">
            6 MODULES.<br />
            <span style={{ color: 'var(--gold)' }}>ONE SYSTEM.</span>
          </h2>
        </div>
        <p style={{ maxWidth: 400, fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', fontFamily: '"Space Mono", monospace' }}>
          Each module builds on the last — from reading a chart to executing a live trade with precision. This isn't theory. This is a repeatable framework for gold.
        </p>
      </div>

      {/* Module grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 2,
      }}>
        {modules.map((m, i) => (
          <motion.div
            key={m.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="module-card"
          >
            {/* Ghost number */}
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: 'rgba(201,168,76,0.1)', lineHeight: 1, marginBottom: 16 }}>
              {m.num}
            </div>

            <span style={{ fontSize: '1.5rem', marginBottom: 16, display: 'block' }}>{m.icon}</span>

            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 12, lineHeight: 1.1 }}>
              {m.name}
            </div>

            <p style={{ fontSize: '0.72rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', marginBottom: 20 }}>
              {m.desc}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {m.topics.map((t) => (
                <li key={t} style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
