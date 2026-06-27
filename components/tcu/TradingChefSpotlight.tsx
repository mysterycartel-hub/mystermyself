'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getCharacter, TRADING_CHEF_ROAD_MAP, CHEF_LINGO } from '@/data/tcu-character-canon'
import TCUAvatarPlaceholder from './TCUAvatarPlaceholder'

/**
 * TradingChefSpotlight — The Trading Chef's full showcase.
 *
 * Sections:
 * 1. Hero intro — "The Kitchen Is Open" + Trading Chef visual
 * 2. TCU Road Map — 8 interactive steps with chef metaphors
 * 3. Chef Lingo Decoder — trading term → kitchen equivalent
 * 4. Golden Rule footer
 * 5. CTAs
 *
 * Asset slot: When /public/characters/trading-chef-hero.png exists,
 * the TCUAvatarPlaceholder auto-swaps to real art.
 */

export default function TradingChefSpotlight() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const tradingChef = getCharacter('trading-chef')!

  return (
    <section
      id="trading-chef-spotlight"
      style={{
        background: 'var(--black)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — Hero Intro
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: 'clamp(64px, 8vw, 100px)',
        }}>
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ marginBottom: 20 }}>
              <div className="section-label-line" />
              <span className="section-label-text">Market Marina · Trading Chef University</span>
            </div>

            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: 20,
            }}>
              THE KITCHEN<br />
              IS <span style={{ color: 'var(--gold)' }}>OPEN.</span>
            </h2>

            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.9,
              marginBottom: 16,
              maxWidth: 440,
            }}>
              Trading Chef University teaches market structure, liquidity, risk, and patience through a kitchen system.
              Every setup has a recipe. Every trade must follow the road map.
            </p>

            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(245,240,232,0.4)',
              fontFamily: '"Space Mono", monospace',
              fontStyle: 'italic',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              {tradingChef.longQuote}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/market-marina" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(201,168,76,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--gold)',
                    color: '#060608',
                    padding: '14px 28px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Enter the Kitchen →
                </motion.div>
              </Link>
              <Link href="/opportunity-list?lane=interest_trading_chef" style={{ textDecoration: 'none' }}>
                <div style={{
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: 'var(--gold)',
                  padding: '14px 28px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Join TCU Updates →
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right: Trading Chef avatar (hero size) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* TODO: Replace with final Trading Chef hero art
                Expected: /public/characters/trading-chef-hero.png
                Dimensions: 800x600 minimum, transparent background preferred */}
            <TCUAvatarPlaceholder character={tradingChef} size="hero" />
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — TCU Road Map (8 steps)
            ═══════════════════════════════════════════════════════════════════ */}
        <div id="road-map" style={{ marginBottom: 'clamp(64px, 8vw, 100px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 40 }}
          >
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">The Recipe · 8 Steps</span>
            </div>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}>
              TCU <span style={{ color: 'var(--gold)' }}>ROAD MAP</span>
            </h3>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TRADING_CHEF_ROAD_MAP.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                style={{
                  background: expandedStep === step.step ? 'rgba(201,168,76,0.04)' : 'var(--deep)',
                  border: `1px solid ${expandedStep === step.step ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.06)'}`,
                  padding: 'clamp(16px, 3vw, 24px) clamp(20px, 3vw, 32px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background step number */}
                <span style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  color: expandedStep === step.step ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  transition: 'color 0.3s',
                }}>
                  {String(step.step).padStart(2, '0')}
                </span>

                {/* Main row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.4rem',
                    color: 'var(--gold)',
                    minWidth: 32,
                    lineHeight: 1,
                  }}>
                    {step.step}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.3rem',
                        color: 'var(--cream)',
                        letterSpacing: '0.04em',
                      }}>
                        {step.label}
                      </span>
                      <span style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.5rem',
                        color: 'rgba(201,168,76,0.6)',
                        letterSpacing: '0.1em',
                      }}>
                        {step.chefLabel}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.7rem',
                    color: 'rgba(201,168,76,0.4)',
                    transform: expandedStep === step.step ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}>
                    →
                  </span>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expandedStep === step.step && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        paddingTop: 16,
                        paddingLeft: 48,
                        borderTop: '1px solid rgba(201,168,76,0.08)',
                        marginTop: 12,
                      }}>
                        <p style={{
                          fontSize: '0.78rem',
                          color: 'rgba(245,240,232,0.6)',
                          lineHeight: 1.8,
                          marginBottom: 8,
                        }}>
                          {step.desc}
                        </p>
                        <p style={{
                          fontSize: '0.65rem',
                          color: 'rgba(201,168,76,0.5)',
                          fontFamily: '"Space Mono", monospace',
                          fontStyle: 'italic',
                        }}>
                          Kitchen: &quot;{step.chefLabel}&quot;
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — Chef Lingo Decoder
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 'clamp(64px, 8vw, 100px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 32 }}
          >
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Speak the Language</span>
            </div>
            <h3 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 0.95,
            }}>
              CHEF LINGO <span style={{ color: 'var(--gold)' }}>DECODER</span>
            </h3>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2,
          }}>
            {Object.entries(CHEF_LINGO).map(([term, kitchen], i) => (
              <motion.div
                key={term}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 4) * 0.04 }}
                style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.06)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  color: 'rgba(245,240,232,0.6)',
                }}>
                  {term}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--gold)',
                  opacity: 0.3,
                }}>
                  →
                </span>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'var(--gold)',
                  textAlign: 'right',
                  fontStyle: 'italic',
                }}>
                  {kitchen}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — Golden Rule
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px)',
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gold accent lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          }} />

          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            display: 'block',
            marginBottom: 20,
          }}>
            Chef&apos;s Golden Rule
          </span>

          <motion.h3
            animate={{
              textShadow: [
                '0 0 20px rgba(201,168,76,0.2)',
                '0 0 40px rgba(201,168,76,0.4)',
                '0 0 20px rgba(201,168,76,0.2)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--gold)',
              letterSpacing: '0.06em',
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            NO SETUP, NO SERVE.
          </motion.h3>

          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(245,240,232,0.4)',
            fontFamily: '"Space Mono", monospace',
            maxWidth: 500,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            If the recipe isn&apos;t there, the kitchen stays closed.
            Patience is the edge. Discipline is the system.
          </p>

          {/* CTA */}
          <Link href="/market-marina" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--gold)',
                color: '#060608',
                padding: '16px 36px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Enter the Kitchen →
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
