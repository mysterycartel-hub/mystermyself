import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MarketMarinaHero from '@/components/market-marina/MarketMarinaHero'
import MarketMarinaCharacters from '@/components/market-marina/MarketMarinaCharacters'
import MarketMarinaAcademy from '@/components/market-marina/MarketMarinaAcademy'
import MarketMarinaKitchen from '@/components/market-marina/MarketMarinaKitchen'

export const metadata = {
  title: 'Market Marina | Trading Chef Universe — Scott-King Coast',
  description: 'The trading district of the Scott-King Coast. Learn gold, forex, and financial markets through the Trading Chef Universe framework.',
}

export default function MarketMarinaPage() {
  return (
    <main>
      <Navbar />
      <MarketMarinaHero />
      <MarketMarinaCharacters />
      <MarketMarinaAcademy />
      <MarketMarinaKitchen />
      <Footer />
    </main>
  )
}
