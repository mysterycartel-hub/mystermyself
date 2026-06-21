'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SubscribePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/opportunity-list')
  }, [router])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--black)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    }}>
      <div style={{ fontSize: '3rem' }}>⚓</div>
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.5)',
      }}>
        Taking you to The Opportunity List...
      </p>
    </main>
  )
}
