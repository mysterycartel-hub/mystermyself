import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StrategyRoadmap from '@/components/tcu/StrategyRoadmap'

export const metadata = {
  title: 'Strategy Roadmap | Trading Chef University',
  description: 'Your guided path from Market Child to Head Chef. Learn market cycle, structure, bias, liquidity, and psychology through the TCU framework — then practice in the Market Kitchen.',
}

export default function StrategyRoadmapPage() {
  return (
    <main style={{ background: '#060608', minHeight: '100vh' }}>
      <Navbar />
      <StrategyRoadmap />
      <Footer />
    </main>
  )
}
