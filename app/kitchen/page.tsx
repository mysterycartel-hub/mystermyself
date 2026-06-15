'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ChartEmbed from '@/components/kitchen/ChartEmbed'
import Watchlist from '@/components/kitchen/Watchlist'
import AICoach from '@/components/kitchen/AICoach'
import BiasPanel from '@/components/kitchen/BiasPanel'
import { KitchenSymbol, Timeframe, DEFAULT_SYMBOL, DEFAULT_TIMEFRAME } from '@/lib/kitchen'

export default function KitchenPage() {
  const [symbol, setSymbol]         = useState<KitchenSymbol>(DEFAULT_SYMBOL)
  const [timeframe, setTimeframe]   = useState<Timeframe>(DEFAULT_TIMEFRAME)

  return (
    <main style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--black)',
      overflow: 'hidden',
    }}>
      <Navbar />

      {/* Kitchen header bar */}
      <div style={{
        height: 56,
        marginTop: 64, // below fixed navbar
        background: 'rgba(6,6,8,0.95)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 24,
        flexShrink: 0,
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.1rem',
          color: 'var(--gold)',
          letterSpacing: '0.1em',
        }}>
          Market Kitchen
        </div>
        <div style={{
          height: 20,
          width: 1,
          background: 'rgba(201,168,76,0.15)',
        }} />
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          letterSpacing: '0.15em',
          color: 'rgba(245,240,232,0.3)',
          textTransform: 'uppercase',
        }}>
          {symbol.short} · {timeframe.label} · {symbol.group === 'gold' ? 'Gold Kitchen' : 'Forex Kitchen'}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.4rem',
            color: 'rgba(245,240,232,0.15)',
            letterSpacing: '0.05em',
          }}>
            Education & simulation only — not financial advice
          </span>
        </div>
      </div>

      {/* Main trading layout */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        {/* Left: Watchlist */}
        <Watchlist
          activeSymbol={symbol}
          activeTimeframe={timeframe}
          onSymbolChange={setSymbol}
          onTimeframeChange={setTimeframe}
        />

        {/* Center: Chart + Bias Panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          {/* Chart */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChartEmbed symbol={symbol} timeframe={timeframe} />
          </div>

          {/* Bias panel */}
          <div style={{
            flexShrink: 0,
            maxHeight: 320,
            overflowY: 'auto',
          }}>
            <BiasPanel symbol={symbol} />
          </div>
        </div>

        {/* Right: AI Coach */}
        <AICoach symbol={symbol} timeframe={timeframe} />
      </div>
    </main>
  )
}
