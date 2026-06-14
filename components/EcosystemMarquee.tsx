'use client'

const items = [
  'TRADING CHEF', 'XAUUSD MASTERY', 'COURIER INCOME LAB',
  'BREADED OR NOT', 'MONEY MOVE PLAYBOOKS', 'FANTASY DRAFT BIBLE',
  'AI OPERATOR LAB', 'MARKET KITCHEN', 'SKILLS · PLAYS · FREEDOM',
  'TRADING CHEF', 'XAUUSD MASTERY', 'COURIER INCOME LAB',
  'BREADED OR NOT', 'MONEY MOVE PLAYBOOKS', 'FANTASY DRAFT BIBLE',
  'AI OPERATOR LAB', 'MARKET KITCHEN', 'SKILLS · PLAYS · FREEDOM',
]

interface Props {
  variant?: 'gold' | 'dark'
  speed?: number
  reverse?: boolean
}

export default function EcosystemMarquee({ variant = 'gold', speed = 22, reverse = false }: Props) {
  const isgold = variant === 'gold'

  return (
    <div
      style={{
        overflow: 'hidden',
        background: isgold ? '#c9a84c' : '#0d0d10',
        padding: '14px 0',
        borderTop: isgold ? '1px solid #7a6230' : '1px solid rgba(201,168,76,0.1)',
        borderBottom: isgold ? '1px solid #7a6230' : '1px solid rgba(201,168,76,0.1)',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          animation: `${reverse ? 'marqueeRev' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1rem',
              letterSpacing: '0.25em',
              color: isgold ? '#060608' : '#c9a84c',
              padding: '0 40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6, height: 6,
                background: isgold ? '#c0392b' : '#c0392b',
                borderRadius: '50%',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
