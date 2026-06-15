'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ChartEmbed from '@/components/kitchen/ChartEmbed'
import Watchlist from '@/components/kitchen/Watchlist'
import AICoach from '@/components/kitchen/AICoach'
import BiasPanel from '@/components/kitchen/BiasPanel'
import { KitchenSymbol, Timeframe, DEFAULT_SYMBOL, DEFAULT_TIMEFRAME } from '@/lib/kitchen'
import Link from 'next/link'

export default function KitchenPage() {
  const [symbol, setSymbol]       = useState<KitchenSymbol>(DEFAULT_SYMBOL)
  const [timeframe, setTimeframe] = useState<Timeframe>(DEFAULT_TIMEFRAME)
  const [biasPanelOpen, setBiasPanelOpen] = useState(true)

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: '#060608',
      overflow: 'hidden',
    }}>
      {/* Navbar — fixed, takes no flow space */}
      <Navbar />

      {/* Kitchen chrome — sits directly under fixed navbar */}
      <div style={{
        position: 'fixed',
        top: 64,          // height of Navbar (padding 16px top+bottom + ~32px content)
        left: 0, right: 0,
        height: 44,
        background: 'rgba(6,6,8,0.98)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 20,
        zIndex: 400,
        backdropFilter: 'blur(12px)',
      }}>
        {/* Brand */}
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1rem',
          color: 'var(--gold)',
          letterSpacing: '0.12em',
          flexShrink: 0,
        }}>
          Market Kitchen
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(201,168,76,0.2)', flexShrink: 0 }} />

        {/* Active context */}
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.46rem',
          letterSpacing: '0.12em',
          color: 'rgba(245,240,232,0.35)',
          textTransform: 'uppercase',
          flex: 1,
        }}>
          {symbol.short} · {timeframe.label} · {symbol.group === 'gold' ? 'Gold Kitchen' : 'Forex Kitchen'}
        </div>

        {/* Bias toggle */}
        <button
          onClick={() => setBiasPanelOpen(o => !o)}
          style={{
            background: biasPanelOpen ? 'rgba(201,168,76,0.12)' : 'transparent',
            border: `1px solid ${biasPanelOpen ? 'rgba(201,168,76,0.3)' : 'rgba(245,240,232,0.08)'}`,
            color: biasPanelOpen ? '#c9a84c' : 'rgba(245,240,232,0.25)',
            padding: '4px 14px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          📋 Recipe Journal
        </button>

        <Link href="/academy" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.2)',
            padding: '4px 12px',
            border: '1px solid rgba(245,240,232,0.06)',
          }}>
            Academy
          </div>
        </Link>

        {/* Disclaimer */}
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.36rem',
          color: 'rgba(245,240,232,0.12)',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          Education only · Not financial advice
        </div>
      </div>

      {/* Main content — pushed below Navbar (64px) + chrome bar (44px) */}
      <div style={{
        position: 'fixed',
        top: 108,   // 64 + 44
        bottom: 0,
        left: 0, right: 0,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Left: Watchlist */}
        <Watchlist
          activeSymbol={symbol}
          activeTimeframe={timeframe}
          onSymbolChange={setSymbol}
          onTimeframeChange={setTimeframe}
        />

        {/* Center: Chart + optional Bias Panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          {/* Chart area */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChartEmbed symbol={symbol} timeframe={timeframe} />
          </div>

          {/* Bias Panel — collapsible */}
          {biasPanelOpen && (
            <div style={{
              flexShrink: 0,
              maxHeight: 340,
              overflowY: 'auto',
              borderTop: '1px solid rgba(201,168,76,0.08)',
            }}>
              <BiasPanel symbol={symbol} />
            </div>
          )}
        </div>

        {/* Right: AI Coach */}
        <AICoach symbol={symbol} timeframe={timeframe} />
      </div>
    </div>
  )
}
