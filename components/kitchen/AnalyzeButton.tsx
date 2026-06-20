'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { analyzeChart, TCUCoachAnalysis } from '@/lib/aiCoach'
import { fetchCandles, SupportedSymbol, SupportedTimeframe } from '@/lib/marketData'

interface Props {
  symbol: string
  timeframe: string
  onAnalysisComplete: (analysis: TCUCoachAnalysis) => void
}

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

export default function AnalyzeButton({ symbol, timeframe, onAnalysisComplete }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const tf = mapTimeframe(timeframe)
      const candles = await fetchCandles(symbol as SupportedSymbol, tf)
      const analysis = await analyzeChart(symbol as SupportedSymbol, tf, candles)
      onAnalysisComplete(analysis)
    } catch (err) {
      console.error('[AnalyzeButton] Error:', err)
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <motion.button
        onClick={handleAnalyze}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
        style={{
          background: loading ? 'rgba(201,168,76,0.15)' : error ? 'rgba(192,57,43,0.15)' : '#c9a84c',
          border: error ? '1px solid rgba(192,57,43,0.4)' : 'none',
          color: loading ? '#c9a84c' : error ? '#c0392b' : '#060608',
          padding: '8px 20px',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
        }}
      >
        {loading ? (
          <>
            <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>🍳</span>
            Reading the chart...
          </>
        ) : error ? (
          <>
            ⚠️ Retry Analysis
          </>
        ) : (
          <>
            📊 Analyze Chart
          </>
        )}
      </motion.button>
      {error && (
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          color: '#c0392b',
          letterSpacing: '0.06em',
          lineHeight: 1.4,
          padding: '4px 0',
        }}>
          {error}
        </div>
      )}
    </div>
  )
}
