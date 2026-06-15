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
}

function parseAnalysis(raw: string): Section[] {
  const sections: Section[] = []
  const lines = raw.split('\n')
  let current: Section | null = null

  for (const line of lines) {
    const header = line.match(/^\*\*([A-Z][A-Z\s()]+[A-Z):]?)\*\*/)
    if (header) {
      if (current) sections.push(current)
      current = { label: header[1].replace(/:$/, '').trim(), content: '' }
    } else if (current) {
      current.content += (current.content ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)

  return sections.filter(s => s.content.trim().length > 0)
}

const SECTION_COLORS: Record<string, string> = {
  'BIAS':            '#c9a84c',
  'FLOW':            '#3B82F6',
  'AOI':             '#F97316',
  'AOI (AREA OF INTEREST)': '#F97316',
  'DELIVERY':        '#22C55E',
  'CONFIRMATION':    '#A855F7',
  'THE PASS':        '#c9a84c',
  'THE PASS (ENTRY ZONE)': '#c9a84c',
  'TABLES SERVED':   '#22C55E',
  'TABLES SERVED (TARGETS)': '#22C55E',
  'MANAGEMENT':      '#EF4444',
}

export default function AICoach({ symbol, timeframe }: Props) {
  const [loading, setLoading]   = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [raw, setRaw]           = useState('')
  const [error, setError]       = useState('')
  const abortRef                = useRef<AbortController | null>(null)

  const analyze = async () => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setLoading(true)
    setError('')
    setRaw('')
    setSections([])

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbol.short, timeframe: timeframe.label }),
        signal: ctrl.signal,
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error ?? `Server error ${res.status}`)
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk
        setRaw(accumulated)
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

  // Auto-analyze when symbol or timeframe changes
  useEffect(() => {
    analyze()
    return () => abortRef.current?.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol.id, timeframe.value])

  const hasContent = sections.length > 0

  return (
    <div style={{
      width: 280,
      flexShrink: 0,
      background: 'rgba(6,6,8,0.95)',
      borderLeft: '1px solid rgba(201,168,76,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
          }}>
            AI Coach
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(245,240,232,0.6)',
            letterSpacing: '0.08em',
            marginTop: 2,
          }}>
            {symbol.short} · {timeframe.label}
          </div>
        </div>
        <button
          onClick={analyze}
          disabled={loading}
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#c9a84c',
            width: 32, height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            cursor: 'none',
            opacity: loading ? 0.5 : 1,
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          title="Refresh analysis"
        >
          {loading ? '⏳' : '↺'}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>

        {/* Loading state */}
        {loading && !hasContent && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            gap: 12,
          }}>
            <div style={{ fontSize: '1.5rem' }}>👨‍🍳</div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: 'rgba(201,168,76,0.5)',
              textAlign: 'center',
              lineHeight: 1.7,
            }}>
              Chef Goldie is<br />reading the chart...
            </div>
            {/* Loading dots */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 5, height: 5,
                    borderRadius: '50%',
                    background: '#c9a84c',
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{
            margin: '16px',
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.2)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            color: 'rgba(239,68,68,0.7)',
            lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: 6, color: '#EF4444' }}>Coach offline</div>
            {error.includes('ANTHROPIC') || error.includes('API')
              ? 'AI Coach requires ANTHROPIC_API_KEY. Add it to .env.local to activate.'
              : error}
          </div>
        )}

        {/* Streamed analysis sections */}
        {sections.map((s, i) => {
          const color = SECTION_COLORS[s.label.toUpperCase()] ?? '#c9a84c'
          return (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(245,240,232,0.04)',
                padding: '14px 16px',
              }}
            >
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color,
                marginBottom: 6,
              }}>
                {s.label}
              </div>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                lineHeight: 1.75,
                color: 'rgba(245,240,232,0.65)',
                margin: 0,
                whiteSpace: 'pre-line',
              }}>
                {s.content.trim()}
              </p>
            </div>
          )
        })}

        {/* Streaming cursor */}
        {loading && hasContent && (
          <div style={{
            padding: '8px 16px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            color: '#c9a84c',
            opacity: 0.6,
          }}>
            ▊
          </div>
        )}
      </div>

      {/* Disclaimer footer */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid rgba(245,240,232,0.04)',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.38rem',
        lineHeight: 1.6,
        color: 'rgba(245,240,232,0.15)',
        flexShrink: 0,
      }}>
        Education & simulation only. Not financial advice.
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
