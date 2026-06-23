'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries } from 'lightweight-charts'
import { fetchCandles, CandleData, SupportedSymbol, SupportedTimeframe } from '@/lib/marketData'

interface Props {
  symbol: string
  timeframe: string
}

// Map kitchen timeframe values to SupportedTimeframe
function mapTimeframe(value: string): SupportedTimeframe {
  const map: Record<string, SupportedTimeframe> = {
    '1': '1m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1H',
    '240': '4H',
    'D': '1D',
  }
  return map[value] ?? '1H'
}

export default function CandlestickChart({ symbol, timeframe }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [latestPrice, setLatestPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const candles = await fetchCandles(
        symbol as SupportedSymbol,
        mapTimeframe(timeframe)
      )

      if (seriesRef.current && candles.length > 0) {
        const chartData: CandlestickData<Time>[] = candles.map((c: CandleData) => ({
          time: c.time as Time,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        }))
        seriesRef.current.setData(chartData)
        setLatestPrice(candles[candles.length - 1].close)

        // Fit content
        if (chartRef.current) {
          chartRef.current.timeScale().fitContent()
        }
      }
    } catch (err) {
      console.error('[CandlestickChart] Error loading candles:', err)
    } finally {
      setLoading(false)
    }
  }, [symbol, timeframe])

  // Create chart on mount
  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { color: '#060608' },
        textColor: 'rgba(245,240,232,0.5)',
        fontFamily: '"Space Mono", monospace',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(201,168,76,0.04)' },
        horzLines: { color: 'rgba(201,168,76,0.04)' },
      },
      crosshair: {
        vertLine: { color: 'rgba(201,168,76,0.4)', width: 1, style: 2 },
        horzLine: { color: 'rgba(201,168,76,0.4)', width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: 'rgba(201,168,76,0.1)',
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: 'rgba(201,168,76,0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderUpColor: '#22C55E',
      borderDownColor: '#EF4444',
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    })

    chartRef.current = chart
    seriesRef.current = series

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [])

  // Load data on symbol/timeframe change
  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Latest price overlay */}
      {latestPrice !== null && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 12,
          zIndex: 10,
          background: 'rgba(6,6,8,0.85)',
          border: '1px solid rgba(201,168,76,0.15)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.42rem',
            color: 'rgba(245,240,232,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Last
          </span>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1rem',
            color: '#c9a84c',
            letterSpacing: '0.02em',
          }}>
            {latestPrice.toFixed(symbol === 'USDJPY' ? 3 : symbol === 'BTCUSD' || symbol === 'SPY' || symbol === 'QQQ' || symbol === 'XAUUSD' ? 2 : 5)}
          </span>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.5rem',
          color: 'rgba(201,168,76,0.5)',
          letterSpacing: '0.15em',
        }}>
          Loading candles...
        </div>
      )}

      {/* Chart container */}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
