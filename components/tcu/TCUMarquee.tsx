'use client'

const items = [
  'XAUUSD MASTERY', 'LIQUIDITY SWEEPS', 'FAIR VALUE GAPS', 'NY SESSION SETUPS',
  '8AM SIGNATURE SETUP', 'MARKET STRUCTURE', 'SUPPLY & DEMAND', 'INSTITUTIONAL CONCEPTS',
  'XAUUSD MASTERY', 'LIQUIDITY SWEEPS', 'FAIR VALUE GAPS', 'NY SESSION SETUPS',
  '8AM SIGNATURE SETUP', 'MARKET STRUCTURE', 'SUPPLY & DEMAND', 'INSTITUTIONAL CONCEPTS',
]

export default function TCUMarquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
