import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Market Marina | Scott-King Coast — MysterMyself',
  description: 'Trading Chef Universe: market structure, liquidity, FVGs, and beginner trading lessons.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Market Marina"
      eyebrow="Trading Chef Universe"
      headline="Learn how markets really move."
      copy="Market Marina houses Trading Chef Universe: structure, liquidity, FVGs, session timing, risk, and the 8-step learning engine from Bias to Management."
      accent="#0D9488"
      primary="Get Trading Lessons"
      bullets={[
        'Beginner lessons start with candles and structure.',
        'TCU language turns trading into a kitchen system.',
        'Gold Kitchen and Forex Kitchen lanes.',
        'Chef Goldie, Wickie, Louie Liquidity, and Grandma Market guide lessons.',
      ]}
    />
  )
}
