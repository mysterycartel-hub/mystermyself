'use client'

import { useEffect, useRef } from 'react'
import { KitchenSymbol, Timeframe } from '@/lib/kitchen'

interface Props {
  symbol: KitchenSymbol
  timeframe: Timeframe
}

export default function ChartEmbed({ symbol, timeframe }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef    = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Remove old widget
    containerRef.current.innerHTML = ''
    if (scriptRef.current) {
      scriptRef.current.remove()
      scriptRef.current = null
    }

    const config = {
      autosize: true,
      symbol: symbol.ticker,
      interval: timeframe.value,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(6, 6, 8, 1)',
      gridColor: 'rgba(201, 168, 76, 0.05)',
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
    }

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify(config)
    containerRef.current.appendChild(script)
    scriptRef.current = script

    return () => {
      script.remove()
    }
  }, [symbol.ticker, timeframe.value])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#060608',
      position: 'relative',
    }}>
      {/* TradingView watermark cover */}
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ width: '100%', height: '100%' }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: 'calc(100% - 32px)', width: '100%' }}
        />
      </div>

      {/* Session overlay badge */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 12,
        background: 'rgba(6,6,8,0.85)',
        border: '1px solid rgba(201,168,76,0.15)',
        padding: '6px 12px',
        backdropFilter: 'blur(8px)',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.45rem',
          letterSpacing: '0.15em',
          color: 'rgba(201,168,76,0.6)',
          textTransform: 'uppercase',
        }}>
          {symbol.sessionNote}
        </div>
      </div>
    </div>
  )
}
