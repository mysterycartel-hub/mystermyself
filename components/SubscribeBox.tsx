import Link from 'next/link'

interface SubscribeBoxProps {
  headline?: string
  sub?: string
  ctaLabel?: string
  accentColor?: string
}

export default function SubscribeBox({
  headline = 'Join The Opportunity List',
  sub = 'Get district drops, free resources, and opportunity intel delivered.',
  ctaLabel = 'Enter The Coast →',
  accentColor = 'var(--gold)',
}: SubscribeBoxProps) {
  return (
    <div style={{
      background: 'var(--deep)',
      border: `1px solid ${accentColor}20`,
      padding: '40px 36px',
      maxWidth: 520,
    }}>
      <div style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: accentColor,
        marginBottom: 12,
      }}>
        Free · No Card Required
      </div>
      <h3 style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '2rem',
        color: 'var(--cream)',
        letterSpacing: '0.03em',
        lineHeight: 1.05,
        marginBottom: 10,
      }}>
        {headline}
      </h3>
      <p style={{
        fontSize: '0.72rem',
        color: 'rgba(245,240,232,0.5)',
        lineHeight: 1.75,
        marginBottom: 24,
      }}>
        {sub}
      </p>
      <Link href="/opportunity-list" style={{ textDecoration: 'none', display: 'inline-block' }}>
        <div style={{
          padding: '14px 28px',
          background: accentColor,
          color: '#060608',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {ctaLabel}
        </div>
      </Link>
    </div>
  )
}
