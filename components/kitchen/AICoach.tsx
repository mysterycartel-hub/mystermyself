'use client'

import { useEffect, useRef, useState } from 'react'
import { KitchenSymbol, Timeframe } from '@/lib/kitchen'

interface Props {
  symbol: KitchenSymbol
  timeframe: Timeframe
}

interface Section {
  label: string
  content: string
  color: string
  icon: string
}

// Map section headers to TCU colors and icons
const SECTION_MAP: Record<string, { color: string; icon: string }> = {
  'BIAS':                    { color: '#c9a84c', icon: '🧭' },
  'FLOW':                    { color: '#3B82F6', icon: '🌊' },
  'AOI':                     { color: '#F97316', icon: '🎯' },
  'AOI (AREA OF INTEREST)':  { color: '#F97316', icon: '🎯' },
  'DELIVERY':                { color: '#22C55E', icon: '📦' },
  'CONFIRMATION':            { color: '#A855F7', icon: '✅' },
  'THE PASS':                { color: '#c9a84c', icon: '🚪' },
  'THE PASS (ENTRY ZONE)':   { color: '#c9a84c', icon: '🚪' },
  'TABLES SERVED':           { color: '#22C55E', icon: '🍽️' },
  'TABLES SERVED (TARGETS)': { color: '#22C55E', icon: '🍽️' },
  'MANAGEMENT':              { color: '#EF4444', icon: '🔥' },
}

function getSection(rawLabel: string): { color: string; icon: string } {
  const key = rawLabel.toUpperCase().replace(/:$/, '').trim()
  return SECTION_MAP[key] ?? { color: '#c9a84c', icon: '📊' }
}

function parseAnalysis(raw: string): Section[] {
  const sections: Section[] = []
  const lines = raw.split('\n')
  let current: { label: string; content: string } | null = null

  for (const line of lines) {
    const m = line.match(/^\*\*([^*]+)\*\*/)
    if (m) {
      if (current) sections.push({ ...current, ...getSection(current.label) })
      current = { label: m[1].replace(/:$/, '').trim(), content: '' }
    } else if (current) {
      current.content += (current.content ? '\n' : '') + line
    }
  }
  if (current) sections.push({ ...current, ...getSection(current.label) })

  return sections.filter(s => s.content.trim().length > 0)
}

export default function AICoach({ symbol, timeframe }: Props) {
  const [loading, setLoading]   = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [error, setError]       = useState('')
  const [lastRun, setLastRun]   = useState('')
  const abortRef                = useRef<AbortController | null>(null)

  const analyze = async () => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setLoading(true)
    setError('')
    setSections([])
    setLastRun(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbol.short, timeframe: timeframe.label }),
        signal: ctrl.signal,
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error ?? `Error ${res.status}`)
      }

      if (!res.body) throw new Error('No stream')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setSections(parseAnalysis(accumulated))
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    analyze()
    return () => abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol.id, timeframe.value])

  const hasContent = sections.length > 0

  return (
    <div style={{
      width: 296,
      flexShrink: 0,
      background: 'rgba(4,4,6,0.97)',
      borderLeft: '1px solid rgba(201,168,76,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* Coach header */}
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: '1rem' }}>👨‍🍳</span>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '0.85rem',
                color: '#c9a84c',
                letterSpacing: '0.08em',
              }}>
                Chef Goldie · AI Coach
              </span>
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.4rem',
              letterSpacing: '0.12em',
              color: 'rgba(245,240,232,0.2)',
              textTransform: 'uppercase',
            }}>
              {symbol.short} · {timeframe.label}
              {lastRun && ` · ${lastRun}`}
            </div>
          </div>
          <button
            onClick={analyze}
            disabled={loading}
            title="Re-run analysis"
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.2)',
              color: loading ? 'rgba(201,168,76,0.3)' : '#c9a84c',
              width: 28, height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              cursor: 'none',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            {loading ? '·' : '↺'}
          </button>
        </div>

        {/* Loading bar */}
        {loading && (
          <div style={{
            marginTop: 8,
            height: 2,
            background: 'rgba(201,168,76,0.08)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: '40%',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              animation: 'slide 1.5s ease-in-out infinite',
            }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin' }}>

        {/* Loading empty state */}
        {loading && !hasContent && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 24px',
            gap: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem' }}>🍳</div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              color: 'rgba(201,168,76,0.5)',
              lineHeight: 1.7,
            }}>
              Reading the {symbol.short}<br />
              {timeframe.label} chart...
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.44rem',
              color: 'rgba(245,240,232,0.15)',
              lineHeight: 1.7,
              maxWidth: 180,
            }}>
              Checking Bias → Flow → AOI → Delivery → Confirmation → The Pass → Tables Served → Management
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div style={{
            margin: 12,
            padding: '14px 16px',
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.18)',
            borderLeft: '3px solid #EF4444',
          }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.44rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#EF4444',
              marginBottom: 6,
            }}>
              Coach Offline
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              lineHeight: 1.7,
              color: 'rgba(245,240,232,0.4)',
              margin: 0,
            }}>
              {error.includes('ANTHROPIC') || error.includes('503')
                ? 'Add ANTHROPIC_API_KEY to .env.local to activate the AI Coach.'
                : error}
            </p>
          </div>
        )}

        {/* Analysis sections */}
        {sections.map((s, i) => (
          <div
            key={i}
            style={{
              borderBottom: '1px solid rgba(245,240,232,0.04)',
              padding: '12px 16px',
            }}
          >
            {/* Section label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 7,
            }}>
              <span style={{ fontSize: '0.75rem', lineHeight: 1 }}>{s.icon}</span>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.4rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: s.color,
              }}>
                {s.label}
              </span>
            </div>

            {/* Content */}
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.54rem',
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.62)',
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {s.content.trim()}
            </p>
          </div>
        ))}

        {/* Streaming cursor */}
        {loading && hasContent && (
          <div style={{
            padding: '6px 16px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: '#c9a84c',
            opacity: 0.5,
          }}>
            ▊
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid rgba(245,240,232,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.36rem',
          color: 'rgba(245,240,232,0.12)',
          letterSpacing: '0.05em',
          lineHeight: 1.5,
        }}>
          Education only<br />Not financial advice
        </span>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.36rem',
          color: 'rgba(245,240,232,0.1)',
        }}>
          TCU Canon
        </span>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  )
}
