'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Stats {
  totalLeads: number
  leadsThisWeek: number
  activeSubscribers: number
  totalOrders: number
  totalRevenueCents: number
  revenueThisMonthCents: number
}

interface Lead {
  id: string
  name: string
  email: string
  interest: string
  division: string
  created_at: string
}

const statCards = (s: Stats) => [
  { label: 'Total Leads', value: s.totalLeads.toLocaleString(), sub: `+${s.leadsThisWeek} this week`, color: 'var(--gold)' },
  { label: 'Active Subscribers', value: s.activeSubscribers.toLocaleString(), sub: 'Paid members', color: '#22C55E' },
  { label: 'Total Orders', value: s.totalOrders.toLocaleString(), sub: 'All time', color: '#3B82F6' },
  { label: 'Revenue (Month)', value: `$${(s.revenueThisMonthCents / 100).toFixed(0)}`, sub: `$${(s.totalRevenueCents / 100).toFixed(0)} all time`, color: 'var(--red)' },
]

export default function AdminPage() {
  const [stats, setStats]   = useState<Stats | null>(null)
  const [leads, setLeads]   = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab]       = useState<'overview' | 'leads'>('overview')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()).catch(() => null),
      fetch('/api/admin/leads').then((r) => r.json()).catch(() => []),
    ]).then(([s, l]) => {
      setStats(s)
      setLeads(Array.isArray(l) ? l : [])
      setLoading(false)
    })
  }, [])

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--cream)' }}>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(6,6,8,0.96)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--gold)' }}>
            MysterMyself
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', marginLeft: 12, textTransform: 'uppercase' }}>
            Admin OS
          </span>
        </div>
        <Link href="/" style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: 'rgba(245,240,232,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>
          ← Back to Site
        </Link>
      </div>

      <div style={{ paddingTop: 80 }}>
        {/* Sidebar + content layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 80px)' }}>
          {/* Sidebar */}
          <div style={{
            background: 'var(--deep)',
            borderRight: '1px solid rgba(201,168,76,0.1)',
            padding: '32px 0',
          }}>
            <div style={{ padding: '0 24px', marginBottom: 32 }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)' }}>
                Navigation
              </span>
            </div>
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'leads', label: '📧 Leads' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as any)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  textAlign: 'left', padding: '12px 24px',
                  fontFamily: '"Space Mono", monospace', fontSize: '0.7rem',
                  color: tab === item.id ? 'var(--gold)' : 'rgba(245,240,232,0.45)',
                  borderLeft: tab === item.id ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'none', transition: 'all 0.2s',
                }}
              >
                {item.label}
              </button>
            ))}

            <div style={{ padding: '32px 24px 0', marginTop: 32, borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', display: 'block', marginBottom: 16 }}>
                Divisions
              </span>
              {[
                { label: 'Trading Chef', href: '/trading-chef' },
                { label: 'TCU', href: '/trading-chef-university' },
                { label: 'Courier Lab', href: '/courier-income-lab' },
                { label: 'Breaded', href: '/breaded' },
                { label: 'Playbooks', href: '/playbooks' },
                { label: 'Fantasy', href: '/fantasy' },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{
                  display: 'block', padding: '8px 0',
                  fontFamily: '"Space Mono", monospace', fontSize: '0.65rem',
                  color: 'rgba(245,240,232,0.4)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div style={{ padding: '40px 48px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.1em' }}>
                  Loading...
                </div>
              </div>
            ) : tab === 'overview' ? (
              <>
                <div style={{ marginBottom: 40 }}>
                  <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 8 }}>
                    DASHBOARD
                  </h1>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: 'rgba(245,240,232,0.4)' }}>
                    MysterMyself Ecosystem OS — Admin Overview
                  </p>
                </div>

                {/* Stat cards */}
                {stats && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, marginBottom: 48 }}>
                    {statCards(stats).map((card, i) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{ background: 'var(--deep)', padding: '32px 24px', border: '1px solid rgba(201,168,76,0.08)' }}
                      >
                        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', display: 'block', marginBottom: 12 }}>
                          {card.label}
                        </span>
                        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: card.color, lineHeight: 1, display: 'block', marginBottom: 8 }}>
                          {card.value}
                        </span>
                        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)' }}>
                          {card.sub}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* No data state */}
                {!stats && (
                  <div style={{ padding: '48px 32px', border: '1px solid rgba(201,168,76,0.1)', textAlign: 'center', marginBottom: 48 }}>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', marginBottom: 16 }}>
                      Connect Supabase to see live stats
                    </p>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)' }}>
                      Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local
                    </p>
                  </div>
                )}

                {/* Quick setup guide */}
                <div style={{ background: 'var(--deep)', padding: '32px', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 24 }}>
                    SETUP CHECKLIST
                  </h2>
                  {[
                    { done: false, label: 'Connect Supabase — add URL + keys to .env.local' },
                    { done: false, label: 'Run db/schema.sql in Supabase SQL editor' },
                    { done: false, label: 'Connect Stripe — add STRIPE_SECRET_KEY to .env.local' },
                    { done: false, label: 'Create products in Stripe Dashboard, update lib/stripe.ts' },
                    { done: false, label: 'Deploy to Vercel — push to GitHub, connect repo' },
                    { done: false, label: 'Add all env vars in Vercel Dashboard → Settings → Environment Variables' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 16,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}>
                      <span style={{ color: item.done ? '#22C55E' : 'rgba(201,168,76,0.3)', fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', flexShrink: 0 }}>
                        {item.done ? '✓' : '○'}
                      </span>
                      <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.68rem', color: item.done ? 'var(--cream)' : 'rgba(245,240,232,0.5)', lineHeight: 1.6 }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 40 }}>
                  <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--cream)', marginBottom: 8 }}>
                    LEADS
                  </h1>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: 'rgba(245,240,232,0.4)' }}>
                    {leads.length} total lead{leads.length !== 1 ? 's' : ''} captured
                  </p>
                </div>

                {leads.length === 0 ? (
                  <div style={{ padding: '48px 32px', border: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', marginBottom: 12 }}>
                      No leads yet — or Supabase isn't connected.
                    </p>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)' }}>
                      Lead capture forms are live on all pages. Connect Supabase to see them here.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Interest</th>
                          <th>Division</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td style={{ color: 'var(--gold)' }}>{lead.email}</td>
                            <td>{lead.interest}</td>
                            <td>
                              <span style={{
                                fontFamily: '"Space Mono", monospace',
                                fontSize: '0.55rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '3px 8px',
                                background: 'rgba(201,168,76,0.12)',
                                color: 'var(--gold)',
                              }}>
                                {lead.division || 'website'}
                              </span>
                            </td>
                            <td style={{ color: 'rgba(245,240,232,0.4)' }}>{fmtDate(lead.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
