'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TCUCoachAnalysis } from '@/lib/aiCoach'

interface Props {
  symbol: string
  timeframe: string
  analysis: TCUCoachAnalysis | null
}

export default function SaveToJournal({ symbol, timeframe, analysis }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'info' | 'success' | 'warning'>('info')

  const handleSave = async () => {
    if (!analysis) {
      setMessage('Run an analysis first before saving.')
      setMessageType('warning')
      setTimeout(() => setMessage(null), 3000)
      return
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      setMessage('Journal save needs Supabase connection.')
      setMessageType('info')
      setTimeout(() => setMessage(null), 4000)
      return
    }

    // If Supabase is configured, try to save
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setMessage('sign-in-needed')
        setMessageType('warning')
        setTimeout(() => setMessage(null), 5000)
        return
      }

      const { error } = await supabase.from('chart_analyses').insert({
        user_id: user.id,
        symbol,
        timeframe,
        bias: analysis.bias,
        liquidity: analysis.liquidityMap,
        aoi: analysis.aoi,
        entry_area: analysis.entryIdea,
        burn_point: analysis.burnPoint,
        tables_served: analysis.tablesServed,
        invalidation: analysis.invalidation,
        ai_summary: analysis.journalSummary,
        character_lesson: analysis.characterLesson,
      })

      if (error) {
        setMessage('Save failed. Try again later.')
        setMessageType('warning')
      } else {
        setMessage('Saved to journal!')
        setMessageType('success')
      }
    } catch {
      setMessage('Journal save needs Supabase connection.')
      setMessageType('info')
    }

    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
      <motion.button
        onClick={handleSave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'transparent',
          border: '1px solid rgba(201,168,76,0.3)',
          color: '#c9a84c',
          padding: '8px 16px',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.48rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap',
        }}
      >
        📓 Save to Journal
      </motion.button>

      {/* Feedback message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            letterSpacing: '0.05em',
            color: messageType === 'success'
              ? '#22C55E'
              : messageType === 'warning'
              ? '#F97316'
              : 'rgba(245,240,232,0.5)',
          }}
        >
          {message === 'sign-in-needed' ? (
            <>
              Sign in to save to journal{' '}
              <Link
                href="/auth"
                style={{
                  color: '#c9a84c',
                  textDecoration: 'underline',
                }}
              >
                Sign In
              </Link>
            </>
          ) : (
            message
          )}
        </motion.div>
      )}
    </div>
  )
}
