'use client'

/**
 * Video embed section for The Opportunity List page.
 * Currently shows a placeholder. CEO will provide YouTube/TikTok URL when ready.
 */
export default function OpportunityVideo() {
  return (
    <section style={{
      background: 'var(--black)',
      padding: '80px 48px',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          display: 'block',
          marginBottom: 16,
        }}>
          Watch
        </span>
        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '0.02em',
          marginBottom: 32,
        }}>
          WHAT IS THE <span style={{ color: 'var(--gold)' }}>OPPORTUNITY LIST</span>?
        </h2>

        {/* Video embed placeholder */}
        {/* CEO: paste YouTube/TikTok embed URL here when ready */}
        <div
          id="opportunity-video"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--deep)',
            border: '1px solid rgba(201,168,76,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Coming Soon overlay */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}>
            {/* Gold play button */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="rgba(201,168,76,0.4)" strokeWidth="2" />
              <polygon points="26,20 26,44 48,32" fill="rgba(201,168,76,0.6)" />
            </svg>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
            }}>
              Video Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
