'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const videos = [
  {
    id: 'trading-chef-universe',
    title: 'Trading Chef Universe',
    subtitle: 'Gold. Market Structure. The Recipe.',
    description: 'The flagship Trading Chef content universe — XAUUSD mastery, liquidity theory, and the complete system for reading gold like a professional.',
    youtubeId: 'dQw4w9WgXcQ',
    tag: 'Trading',
    color: '#c9a84c',
    emoji: '📊',
    accent: 'Market Marina',
  },
  {
    id: 'scott-king-coast',
    title: 'Scott-King Coast',
    subtitle: 'The Universe. The Coast. The Map.',
    description: 'The full Scott-King Coast universe tour — nine districts, nine income lanes, one unified ecosystem built by Maurice Scott.',
    youtubeId: 'dQw4w9WgXcQ',
    tag: 'Universe',
    color: '#c9a84c',
    emoji: '🗺️',
    accent: 'Founder Island',
  },
  {
    id: 'mystermyself-ecosystem',
    title: 'MysterMyself Ecosystem',
    subtitle: 'Skills. Plays. Freedom.',
    description: 'The complete MysterMyself Ecosystem OS breakdown — every division, every income lane, and the complete framework for financial freedom.',
    youtubeId: 'dQw4w9WgXcQ',
    tag: 'Ecosystem',
    color: '#c9a84c',
    emoji: '⚜️',
    accent: 'Legacy Point',
  },
]

export default function FlagshipVideos() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = videos[active]

  return (
    <section style={{ background: 'var(--black)', padding: '120px 48px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">The Universe · In Motion</span>
        </div>
        <h2 className="section-title">
          ENTER THE<br />
          <span style={{ color: 'var(--gold)' }}>UNIVERSE</span>
        </h2>
        <p style={{
          fontSize: '0.82rem',
          color: 'rgba(245,240,232,0.5)',
          maxWidth: 480,
          lineHeight: 1.8,
          fontFamily: '"Space Mono", monospace',
        }}>
          Three flagship videos from the MysterMyself universe. Trading, the coast, and the full ecosystem — watch first, then navigate.
        </p>
      </motion.div>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 2, maxWidth: 1400 }}>
        {/* Video player */}
        <div>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', background: '#000', aspectRatio: '16/9' }}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={current.title}
              />
            ) : (
              <div
                onClick={() => setPlaying(true)}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, var(--deep) 0%, var(--black) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 24,
                  cursor: 'none',
                  overflow: 'hidden',
                }}
              >
                {/* Grid bg */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }} />

                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  color: 'rgba(201,168,76,0.06)',
                  position: 'absolute',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}>
                  {current.title.toUpperCase()}
                </div>

                <span style={{ fontSize: '4rem', position: 'relative', zIndex: 1 }}>{current.emoji}</span>

                {/* Play button */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 80, height: 80,
                  background: 'var(--gold)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(201,168,76,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderStyle: 'solid',
                    borderWidth: '12px 0 12px 22px',
                    borderColor: 'transparent transparent transparent #060608',
                    marginLeft: 5,
                  }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.4rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.06em',
                    marginBottom: 4,
                  }}>
                    {current.title}
                  </div>
                  <div style={{
                    fontSize: '0.6rem',
                    color: 'rgba(245,240,232,0.4)',
                    fontFamily: '"Space Mono", monospace',
                    letterSpacing: '0.1em',
                  }}>
                    {current.subtitle}
                  </div>
                </div>

                {/* Gold frame border */}
                <div style={{
                  position: 'absolute',
                  inset: 12,
                  border: '1px solid rgba(201,168,76,0.15)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  top: 12, left: 12, width: 20, height: 20,
                  borderTop: '2px solid var(--gold)',
                  borderLeft: '2px solid var(--gold)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 12, right: 12, width: 20, height: 20,
                  borderBottom: '2px solid var(--gold)',
                  borderRight: '2px solid var(--gold)',
                }} />
              </div>
            )}

            {/* Tag */}
            <div style={{
              position: 'absolute',
              top: 16, left: 16,
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              background: 'var(--gold)',
              color: 'var(--black)',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              {current.tag}
            </div>
          </motion.div>

          {/* Video info bar */}
          <div style={{
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderTop: 'none',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
          }}>
            <div>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.4rem',
                color: 'var(--gold)',
                letterSpacing: '0.04em',
                marginBottom: 4,
              }}>
                {current.title}
              </h3>
              <p style={{
                fontSize: '0.68rem',
                color: 'rgba(245,240,232,0.5)',
                lineHeight: 1.7,
                maxWidth: 480,
              }}>
                {current.description}
              </p>
            </div>
            <div style={{
              flexShrink: 0,
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              color: 'rgba(201,168,76,0.4)',
              letterSpacing: '0.15em',
              textAlign: 'right',
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: 4 }}>{current.accent}</div>
              <div>Scott-King Coast</div>
            </div>
          </div>
        </div>

        {/* Video selector */}
        <div style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(201,168,76,0.08)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
          }}>
            Flagship Videos · 3 of 3
          </div>

          {videos.map((v, i) => (
            <div
              key={v.id}
              onClick={() => { setActive(i); setPlaying(false) }}
              style={{
                padding: '28px 24px',
                borderBottom: '1px solid rgba(201,168,76,0.06)',
                cursor: 'none',
                background: active === i ? 'rgba(201,168,76,0.06)' : 'transparent',
                borderLeft: `3px solid ${active === i ? 'var(--gold)' : 'transparent'}`,
                transition: 'all 0.25s',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              {/* Thumbnail placeholder */}
              <div style={{
                width: 72,
                height: 44,
                background: active === i ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.06)',
                border: `1px solid ${active === i ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '1.1rem',
                transition: 'all 0.25s',
              }}>
                {active === i ? '▶' : v.emoji}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                  color: active === i ? 'var(--gold)' : 'var(--cream)',
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}>
                  {v.title}
                </div>
                <div style={{
                  fontSize: '0.58rem',
                  color: 'rgba(245,240,232,0.35)',
                  fontFamily: '"Space Mono", monospace',
                  lineHeight: 1.5,
                }}>
                  {v.subtitle}
                </div>
              </div>
            </div>
          ))}

          <div style={{ flex: 1 }} />
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}>
            <a
              href="https://www.youtube.com/@mystermyself"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--gold)',
                padding: '14px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              Full YouTube Channel →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
