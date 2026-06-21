'use client'

import { useState, useEffect } from 'react'
import {
  getCurrentSession,
  getSessionTimeRemaining,
  SESSIONS,
  getFVGHealthColor,
  getFVGHealthScore,
  getTouchColor,
  TCU_LINGO,
  CHEF_READ_STEPS,
  DEMO_FVG_ZONES,
  DEMO_THREE_TOUCH_LEVELS,
  DEMO_CHEF_READ,
} from '@/lib/tcu-terminal'
import type { SessionInfo, FVGZone, ThreeTouchLevel } from '@/lib/tcu-terminal'

// ── Session Clock Widget ─────────────────────────────────────────────────────
function SessionClock() {
  const [session, setSession] = useState<SessionInfo>(getCurrentSession())
  const [remaining, setRemaining] = useState(getSessionTimeRemaining())
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      setSession(getCurrentSession())
      setRemaining(getSessionTimeRemaining())
      setTime(new Date().toUTCString().slice(17, 25))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: `1px solid ${session.color}30`,
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{session.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: session.color, letterSpacing: '0.08em' }}>
              {session.label}
            </div>
            <div style={{ fontSize: 10, opacity: 0.4, marginTop: 2 }}>
              {remaining} remaining
            </div>
          </div>
        </div>
        <div style={{ fontSize: 14, fontFamily: '"Space Mono", monospace', color: session.color, fontWeight: 700 }}>
          {time} UTC
        </div>
      </div>
      <div style={{ fontSize: 10, opacity: 0.5, lineHeight: 1.6, fontStyle: 'italic' }}>
        {session.note}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
        {SESSIONS.filter(s => s.name !== 'closed').map(s => (
          <div key={s.name} style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: s.name === session.name ? s.color : `${s.color}20`,
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}

// ── FVG Health Score Panel ────────────────────────────────────────────────────
function FVGHealthPanel({ zones }: { zones: FVGZone[] }) {
  const score = getFVGHealthScore(zones)
  const scoreColor = score >= 70 ? '#10B981' : score >= 40 ? '#F59E0B' : '#EF4444'

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.12em' }}>
          📦 FVG HEALTH SCORE
        </div>
        <div style={{
          fontSize: 20,
          fontWeight: 900,
          color: scoreColor,
          fontFamily: '"Space Mono", monospace',
        }}>
          {score}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {zones.map(z => (
          <div key={z.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 8,
            background: `${getFVGHealthColor(z.health)}08`,
            border: `1px solid ${getFVGHealthColor(z.health)}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: getFVGHealthColor(z.health),
                boxShadow: `0 0 6px ${getFVGHealthColor(z.health)}50`,
              }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: z.type === 'bullish' ? '#10B981' : '#EF4444' }}>
                  {z.label}
                </div>
                <div style={{ fontSize: 9, opacity: 0.4, marginTop: 1 }}>
                  {z.timeframe} · {z.age}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: getFVGHealthColor(z.health), textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {z.health}
              </div>
              <div style={{ fontSize: 9, opacity: 0.35, marginTop: 1 }}>
                {z.touchCount} touch{z.touchCount !== 1 ? 'es' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Three-Touch Study Panel ──────────────────────────────────────────────────
function ThreeTouchPanel({ levels }: { levels: ThreeTouchLevel[] }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.12em', marginBottom: 14 }}>
        👆 THREE-TOUCH STUDY
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {levels.map(l => (
          <div key={l.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${getTouchColor(l.strength)}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                display: 'flex', gap: 2,
              }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: i <= l.touches ? getTouchColor(l.strength) : 'rgba(255,255,255,0.08)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: l.type === 'support' ? '#10B981' : '#EF4444' }}>
                  {l.label}
                </div>
                <div style={{ fontSize: 9, opacity: 0.4, marginTop: 1 }}>
                  Last touch: {l.lastTouch}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, fontFamily: '"Space Mono", monospace', color: getTouchColor(l.strength) }}>
                {l.price.toFixed(2)}
              </div>
              <div style={{ fontSize: 9, opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {l.strength}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Lingo Sidebar ────────────────────────────────────────────────────────────
function LingoSidebar() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.12em', marginBottom: 14 }}>
        📖 TCU LINGO
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {TCU_LINGO.map(term => (
          <div key={term.tcu}
            onClick={() => setExpanded(expanded === term.tcu ? null : term.tcu)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: expanded === term.tcu ? `${term.color}10` : 'transparent',
              border: `1px solid ${expanded === term.tcu ? `${term.color}30` : 'transparent'}`,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12 }}>{term.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: term.color }}>{term.tcu}</span>
              </div>
              <span style={{ fontSize: 9, opacity: 0.3, fontFamily: '"Space Mono", monospace' }}>
                {term.traditional}
              </span>
            </div>
            {expanded === term.tcu && (
              <div style={{ fontSize: 10, opacity: 0.6, lineHeight: 1.7, marginTop: 8, paddingLeft: 20 }}>
                {term.definition}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Chef Read Format Panel ───────────────────────────────────────────────────
function ChefReadPanel() {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.12em' }}>
          👨‍🍳 CHEF READ — XAUUSD 15M
        </div>
        <div style={{ fontSize: 9, padding: '3px 10px', borderRadius: 12, background: 'rgba(16,185,129,0.15)', color: '#10B981', fontWeight: 700 }}>
          DEMO
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHEF_READ_STEPS.map(step => (
          <div key={step.key} style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: `${step.color}06`,
            border: `1px solid ${step.color}18`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12 }}>{step.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: step.color, letterSpacing: '0.1em' }}>{step.label}</span>
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.7, paddingLeft: 20 }}>
              {DEMO_CHEF_READ[step.key as keyof typeof DEMO_CHEF_READ]}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 14,
        padding: '10px 14px',
        borderRadius: 8,
        background: 'rgba(239,68,68,0.05)',
        border: '1px solid rgba(239,68,68,0.15)',
        fontSize: 9,
        opacity: 0.6,
        lineHeight: 1.7,
        textAlign: 'center',
      }}>
        🔔 Educational only. No signals. No financial advice. Train first. Trade later.
      </div>
    </div>
  )
}

// ── Main Terminal Component ───────────────────────────────────────────────────
type TerminalTab = 'overview' | 'fvg' | 'three-touch' | 'lingo' | 'chef-read'

export default function TCUMarketKitchenTerminal() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('overview')

  const tabs: { id: TerminalTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Terminal', icon: '🖥️' },
    { id: 'fvg', label: 'FVG Health', icon: '📦' },
    { id: 'three-touch', label: 'Three-Touch', icon: '👆' },
    { id: 'lingo', label: 'Lingo', icon: '📖' },
    { id: 'chef-read', label: 'Chef Read', icon: '👨‍🍳' },
  ]

  return (
    <div style={{
      background: 'linear-gradient(180deg, #060608 0%, #0A0500 50%, #060608 100%)',
      borderRadius: 16,
      border: '1px solid rgba(201,168,76,0.15)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(201,168,76,0.05)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24, filter: 'drop-shadow(0 0 8px #F59E0B)' }}>🍳</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.08em' }}>
              TCU MARKET KITCHEN TERMINAL
            </div>
            <div style={{ fontSize: 9, opacity: 0.4, letterSpacing: '0.12em', marginTop: 2 }}>
              TRAINING KITCHEN · NOT A SIGNAL BOARD · EDUCATION ONLY
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.5)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 9, color: '#10B981', fontWeight: 600, letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: 2,
        padding: '0 16px',
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        overflowX: 'auto',
      }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === t.id ? '2px solid #C9A84C' : '2px solid transparent',
              color: activeTab === t.id ? '#C9A84C' : 'rgba(245,240,232,0.35)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}
          >
            {t.icon} {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Positioning Statement */}
      <div style={{
        padding: '14px 24px',
        background: 'rgba(201,168,76,0.04)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        <p style={{ fontSize: 10, lineHeight: 1.8, color: 'rgba(245,240,232,0.5)', margin: 0, maxWidth: 720 }}>
          Market Kitchen is not a signal board. It is a training kitchen. You are here to learn how price cooks, where liquidity sits, when the kitchen is open, and when the recipe is not ready yet.
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SessionClock />
              <FVGHealthPanel zones={DEMO_FVG_ZONES.slice(0, 3)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ThreeTouchPanel levels={DEMO_THREE_TOUCH_LEVELS.slice(0, 3)} />
              <ChefReadPanel />
            </div>
          </div>
        )}

        {activeTab === 'fvg' && <FVGHealthPanel zones={DEMO_FVG_ZONES} />}
        {activeTab === 'three-touch' && <ThreeTouchPanel levels={DEMO_THREE_TOUCH_LEVELS} />}
        {activeTab === 'lingo' && <LingoSidebar />}
        {activeTab === 'chef-read' && <ChefReadPanel />}

        {/* Terminal Footer — Education Emphasis */}
        <div style={{
          marginTop: 20,
          padding: '16px 20px',
          borderRadius: 10,
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.12)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 8 }}>
            👨‍🍳 CHEF&apos;S GOLDEN RULE
          </div>
          <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7, margin: '0 0 10px', fontStyle: 'italic' }}>
            If you do not know the recipe, you do not take the pass.
          </p>
          <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)', lineHeight: 1.7, margin: '0 0 10px' }}>
            The goal is not to predict every move. The goal is to sharpen your eye, understand the story of price, and wait for the recipe.
          </p>
          <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)', lineHeight: 1.7, margin: '0 0 10px' }}>
            TCU teaches market cycle, structure, and trading psychology through kitchen language. Leftover containers, the pass, burn points, and tables served help students slow down and read the market instead of chasing candles.
          </p>
          <div style={{
            marginTop: 12,
            padding: '8px 14px',
            borderRadius: 6,
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.12)',
            fontSize: 9,
            color: 'rgba(245,240,232,0.45)',
            letterSpacing: '0.06em',
            textAlign: 'center',
          }}>
            🔔 Educational only. No signals. No financial advice. Train first. Trade later.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
