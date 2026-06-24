'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const CURRENT = [
  { label: 'TCU Academy — 13 free lessons', district: 'Market Marina', color: '#0D9488', href: '/academy' },
  { label: 'Medical Courier Insider Edge — $37', district: 'Route Harbor', color: '#0EA5E9', href: '/products/medical-courier-guide' },
  { label: 'Market Kitchen Terminal — live charts', district: 'Market Marina', color: '#0D9488', href: '/chart-kitchen' },
  { label: 'Free Content Hub — guides & resources', district: 'Library Vault', color: '#c9a84c', href: '/free-content' },
  { label: 'Trade Journal — log sessions', district: 'Market Marina', color: '#0D9488', href: '/journal' },
  { label: 'Coast Passport — collect stamps', district: 'All Districts', color: '#c9a84c', href: '/passport' },
]

const COMING_SOON = [
  { label: 'TCU Gold Playbook — premium guide', district: 'Market Marina', color: '#0D9488' },
  { label: 'Fantasy Draft Bible 2025', district: 'Fantasy Island', color: '#22C55E' },
  { label: 'Food Pop-Up Blueprint', district: 'Flavor District', color: '#F97316' },
  { label: 'AI Operator Starter Kit', district: 'Blueprint Bay', color: '#6366F1' },
  { label: 'Newsletter Ready Desk launch', district: 'Creator Pier', color: '#A855F7' },
  { label: 'TCU Membership — community access', district: 'Market Marina', color: '#0D9488' },
]

export default function CoastOpportunities() {
  return (
    <section style={{
      background: 'var(--deep)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Current Opportunities</span>
          </div>
          <h2 className="section-title">
            WHAT&apos;S LIVE ON<br />
            <span style={{ color: 'var(--gold)' }}>THE COAST</span>
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(245,240,232,0.45)',
            maxWidth: 480,
            lineHeight: 1.8,
          }}>
            Real resources. Real products. Available now or coming soon.
            No fake links. No placeholder pages.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
        }}>
          {/* Current / Live */}
          <div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#22C55E',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ width: 8, height: 8, background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 6px rgba(34,197,94,0.4)' }} />
              Live Now
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CURRENT.map((item, i) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}
                  >
                    <div style={{ width: 4, height: 28, background: item.color, borderRadius: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.4 }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.42rem',
                        color: item.color,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 3,
                      }}>
                        {item.district}
                      </div>
                    </div>
                    <span style={{ color: item.color, fontSize: '0.7rem' }}>&rarr;</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ width: 8, height: 8, background: 'rgba(245,240,232,0.2)', borderRadius: '50%' }} />
              Coming Soon on the Coast
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {COMING_SOON.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(201,168,76,0.04)',
                  }}
                >
                  <div style={{ width: 4, height: 28, background: 'rgba(245,240,232,0.08)', borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.4 }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.42rem',
                      color: `${item.color}80`,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: 3,
                    }}>
                      {item.district}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.4rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.2)',
                    border: '1px solid rgba(245,240,232,0.1)',
                    padding: '3px 8px',
                  }}>
                    SOON
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/opportunity-list" style={{ textDecoration: 'none' }}>
            <div className="btn-primary">
              <span>Join The Opportunity List &rarr;</span>
            </div>
          </Link>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.5rem',
            color: 'rgba(245,240,232,0.25)',
            marginTop: 12,
          }}>
            Get updates from every district. Free. No card.
          </p>
        </div>
      </div>
    </section>
  )
}
