'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CHARACTERS } from '@/lib/academy'

// TCU canon framework — 8 steps of The Recipe
const RECIPE_STEPS = [
  {
    num: '01',
    label: 'Bias',
    tcuTerm: 'Bias',
    icon: '🧭',
    desc: 'Which direction is the market favoring right now? Bias is your orientation — the lens that filters every decision that follows.',
    topics: ['Bullish, bearish, or neutral read', 'Higher timeframe alignment', 'Macro context (DXY, sessions)', 'Daily, weekly trend direction'],
    color: '#c9a84c',
    character: 'chef-goldie',
  },
  {
    num: '02',
    label: 'Flow',
    tcuTerm: 'Liquidity / Flow',
    icon: '🌊',
    desc: 'Where is price drawing? Smart money needs to collect orders before it moves — it hunts liquidity pools above and below current price.',
    topics: ['Buy-side & sell-side pools', 'Flow identification', 'The stop hunt pattern', 'Displacement after the sweep'],
    color: '#3B82F6',
    character: 'louie-liquidity',
  },
  {
    num: '03',
    label: 'AOI',
    tcuTerm: 'Area of Interest',
    icon: '🎯',
    desc: 'Where will price react? Areas of Interest are zones — premium or discount — where institutional order flow historically enters.',
    topics: ['Premium vs. discount zones', 'Leftover Containers (imbalances)', 'Structural AOI vs. FVG', 'Multi-timeframe AOI alignment'],
    color: '#F97316',
    character: 'nana-value',
  },
  {
    num: '04',
    label: 'Delivery',
    tcuTerm: 'Delivery',
    icon: '📦',
    desc: 'How is price moving to your AOI? Impulsive delivery is fast and directional. Corrective delivery is slow, overlapping, and choppy.',
    topics: ['Impulsive vs. corrective moves', 'Candle anatomy in delivery', 'Body-to-wick ratios', 'Speed and displacement reads'],
    color: '#22C55E',
    character: 'candle-kid',
  },
  {
    num: '05',
    label: 'Confirmation',
    tcuTerm: 'Confirmation',
    icon: '✅',
    desc: 'What do you need to see before entering? Confirmation is the signal that validates The Recipe — never enter without it.',
    topics: ['Rejection wick confirmation', 'Engulfing candle signals', 'Break + retest pattern', 'Session timing alignment'],
    color: '#A855F7',
    character: 'wickie',
  },
  {
    num: '06',
    label: 'The Pass',
    tcuTerm: 'The Pass',
    icon: '🚪',
    desc: 'Where do you enter? The Pass is your entry point — not chased, not guessed. It comes after all prior steps align.',
    topics: ['Entry zone definition', 'Limit vs. market entry', '"Do not chase the candle"', 'Pass timing and patience'],
    color: '#c9a84c',
    character: 'chef-goldie',
  },
  {
    num: '07',
    label: 'Tables Served',
    tcuTerm: 'Tables Served',
    icon: '🍽️',
    desc: 'Where do you take profit? Tables Served are your target levels — defined before entry, never moved in the hope of more.',
    topics: ['Target level identification', 'Partial profit logic', 'AOI as target', 'Not getting greedy'],
    color: '#22C55E',
    character: 'louie-liquidity',
  },
  {
    num: '08',
    label: 'Management',
    tcuTerm: 'Management + Burn Point',
    icon: '🔥',
    desc: 'What is your Burn Point — the level that tells you the read was wrong? Management is not emotion. It is a pre-defined plan.',
    topics: ['Burn Point placement', 'Invalidation logic', 'Break-even management', 'Grandma Market patience'],
    color: '#EF4444',
    character: 'grandma-market',
  },
]

const featuredCharacters = ['chef-goldie', 'candle-kid', 'wickie', 'louie-liquidity', 'grandma-market']

export default function TradingChefPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '140px 48px 80px',
        background: 'var(--black)',
      }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-slash" />

        {/* Ghost text */}
        <div style={{
          position: 'absolute',
          right: -30, bottom: -60,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(12rem, 24vw, 22rem)',
          color: 'rgba(201,168,76,0.025)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '0.02em',
        }}>
          TCU
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: '"Space Mono", monospace',
            }}>
              Scott-King Coast · Market Marina · Trading Chef Universe
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(4rem, 9vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 32,
            }}
          >
            THE<br />
            <span style={{ color: 'var(--gold)' }}>TRADING</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(201,168,76,0.5)', color: 'transparent' }}>CHEF</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              borderLeft: '3px solid var(--gold)',
              paddingLeft: 20,
              marginBottom: 40,
            }}
          >
            <p style={{
              fontSize: '0.85rem',
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.65)',
              maxWidth: 520,
              margin: 0,
              fontFamily: '"Space Mono", monospace',
            }}>
              Read the market like a menu. Eight steps — Bias, Flow, AOI, Delivery, Confirmation, The Pass, Tables Served, Management. One framework. Built for people who want to understand, not just copy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Link href="/academy" style={{ textDecoration: 'none' }}>
              <div className="btn-primary"><span>Enter the Academy →</span></div>
            </Link>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Open Market Kitchen</div>
            </Link>
            <Link href="/trading-chef-university" style={{ textDecoration: 'none' }}>
              <div className="btn-secondary">Join TCU</div>
            </Link>
          </motion.div>
        </div>
      </section>

      <EcosystemMarquee />

      {/* The Recipe — 8 Steps */}
      <section style={{ background: 'var(--black)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The TCU Framework</span>
          </div>
          <h2 className="section-title">
            THE<br />
            <span style={{ color: 'var(--gold)' }}>RECIPE</span>
          </h2>
          <p style={{
            fontSize: '0.82rem',
            color: 'rgba(245,240,232,0.5)',
            maxWidth: 520,
            lineHeight: 1.8,
            fontFamily: '"Space Mono", monospace',
          }}>
            Eight steps from blank chart to executed decision. Every Trade Chef Universe lesson teaches one step of The Recipe — in sequence, in depth, with a character to guide you through it.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {RECIPE_STEPS.map((step, i) => {
            const char = CHARACTERS[step.character]
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                style={{
                  background: 'rgba(245,240,232,0.015)',
                  border: '1px solid rgba(245,240,232,0.07)',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Top color line */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${step.color}, transparent)`,
                }} />

                {/* Ghost step number */}
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '4rem',
                  color: `${step.color}10`,
                  lineHeight: 1,
                  marginBottom: 12,
                }}>
                  {step.num}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.3rem',
                      color: step.color,
                      letterSpacing: '0.05em',
                      lineHeight: 1,
                    }}>
                      {step.label}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.44rem',
                      color: `${step.color}60`,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginTop: 2,
                    }}>
                      {step.tcuTerm}
                    </div>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.68rem',
                  lineHeight: 1.8,
                  color: 'rgba(245,240,232,0.55)',
                  marginBottom: 20,
                  fontFamily: '"Space Mono", monospace',
                }}>
                  {step.desc}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                  {step.topics.map((t) => (
                    <li key={t} style={{
                      fontSize: '0.6rem',
                      color: 'rgba(245,240,232,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: '"Space Mono", monospace',
                    }}>
                      <span style={{
                        width: 4, height: 4,
                        background: step.color,
                        borderRadius: '50%',
                        flexShrink: 0,
                        opacity: 0.7,
                      }} />
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Character badge */}
                {char && (
                  <div style={{
                    borderTop: '1px solid rgba(245,240,232,0.05)',
                    paddingTop: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>{char.emoji}</span>
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.44rem',
                      color: `${step.color}70`,
                      letterSpacing: '0.08em',
                    }}>
                      {char.name}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Characters preview */}
      <section style={{
        background: 'var(--deep)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div className="section-label" style={{ marginBottom: 32 }}>
          <div className="section-label-line" />
          <span className="section-label-text">Your Instructors</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          MEET THE<br />
          <span style={{ color: 'var(--gold)' }}>CHARACTERS</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
          marginBottom: 40,
        }}>
          {featuredCharacters.map((id) => {
            const c = CHARACTERS[id]
            if (!c) return null
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(245,240,232,0.015)',
                  border: '1px solid rgba(245,240,232,0.07)',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{c.emoji}</div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  color: c.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  color: 'rgba(245,240,232,0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: 12,
                }}>
                  {c.title}
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.35)',
                  fontStyle: 'italic',
                }}>
                  &ldquo;{c.catchphrase.split('—')[0].split('.')[0].trim()}&rdquo;
                </div>
              </motion.div>
            )
          })}
        </div>

        <Link href="/market-marina" style={{ textDecoration: 'none' }}>
          <div className="btn-secondary" style={{ display: 'inline-flex' }}>
            Meet All 9 Characters →
          </div>
        </Link>
      </section>

      {/* Three paths CTA */}
      <section style={{ background: 'var(--black)', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {[
            {
              icon: '📚',
              title: 'The Academy',
              desc: '13 structured lessons. Show → Explain → Ask → Practice → Review. Start at candle anatomy. Earn XP with every lesson.',
              cta: 'Start Lesson 1 →',
              href: '/academy/candles',
              color: '#c9a84c',
            },
            {
              icon: '🍳',
              title: 'Market Kitchen',
              desc: 'Live TradingView charts, AI Coach in full TCU canon, and your own Recipe journal. Apply everything you learn.',
              cta: 'Open the Kitchen →',
              href: '/kitchen',
              color: '#22C55E',
            },
            {
              icon: '🎓',
              title: 'Trading Chef University',
              desc: 'The full TCU curriculum — 6 modules, live sessions, community. The academy is the foundation. TCU is the mastery.',
              cta: 'Enter TCU →',
              href: '/trading-chef-university',
              color: '#3B82F6',
            },
          ].map((p) => (
            <Link key={p.title} href={p.href} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: `${p.color}40` }}
                style={{
                  background: `${p.color}05`,
                  border: `1px solid ${p.color}15`,
                  padding: '40px 32px',
                  height: '100%',
                  cursor: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{p.icon}</div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.6rem',
                  color: p.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: 16,
                }}>
                  {p.title}
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  lineHeight: 1.8,
                  color: 'rgba(245,240,232,0.45)',
                  marginBottom: 28,
                }}>
                  {p.desc}
                </p>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: p.color,
                }}>
                  {p.cta}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <LeadMagnetForm
        division="trading-chef"
        heading={'GET THE FREE\nGOLD STARTER\nGUIDE'}
        subheading="Sessions, setups, and the one chart pattern every gold trader needs to know before risking a dollar. Free. Instant delivery."
      />
      <Footer />
    </main>
  )
}
