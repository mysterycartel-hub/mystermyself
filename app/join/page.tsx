'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function JoinRedirect() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const returnPath = params.get('return')
    const source     = params.get('source') ?? params.get('utm_source') ?? 'website'

    if (returnPath) {
      try { localStorage.setItem('skc_return_path', returnPath) } catch { /* noop */ }
    }
    try { localStorage.setItem('skc_join_source', source) } catch { /* noop */ }

    router.replace('/opportunity-list')
  }, [params, router])

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

export default function JoinPage() {
  return (
    <Suspense fallback={
      <main style={{
        minHeight: '100vh',
        background: 'var(--black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(201,168,76,0.4)',
        }}>
          Loading...
        </span>
      </main>
    }>
      <JoinRedirect />
    </Suspense>
  )
}
