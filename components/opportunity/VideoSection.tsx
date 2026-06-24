'use client'

export default function VideoSection() {
  return (
    <section style={{
      background: '#060608',
      padding: '80px 48px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          marginBottom: 16,
        }}>
          Watch
        </div>

        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '0.02em',
          color: '#F5F0E8',
          marginBottom: 32,
        }}>
          WHAT IS THE <span style={{ color: '#C9A84C' }}>OPPORTUNITY LIST</span>?
        </h2>

        {/* Video embed slot */}
        {/* CEO: paste YouTube/TikTok embed URL here when ready */}
        <div
          id="opportunity-video"
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', /* 16:9 */
            background: '#0A0A0C',
            border: '1px solid rgba(201,168,76,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Coming Soon overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}>
            {/* Gold play button */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
              <polygon points="26,20 48,32 26,44" fill="#C9A84C" opacity="0.7" />
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
