'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const BEEHIIV_URL = process.env.NEXT_PUBLIC_BEEHIIV_SIGNUP_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com/subscribe'

function JoinRedirect() {
  const params = useSearchParams()

  useEffect(() => {
    const returnPath = params.get('return')
    const source     = params.get('source') ?? params.get('utm_source') ?? 'website'

    if (returnPath) {
      try { localStorage.setItem('skc_return_path', returnPath) } catch { /* noop */ }
    }
    try { localStorage.setItem('skc_join_source', source) } catch { /* noop */ }

    const url = new URL(BEEHIIV_URL)
    if (source && source !== 'website') {
      url.searchParams.set('utm_source', source)
      url.searchParams.set('utm_medium', 'organic')
      url.searchParams.set('utm_campaign', 'opportunity_list')
    }

    window.location.href = url.toString()
  }, [params])

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
