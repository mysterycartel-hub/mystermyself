export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import HomeHero from '@/components/home/HomeHero'
import EcosystemGrid from '@/components/home/EcosystemGrid'
import WealthCity from '@/components/home/WealthCity'
import HomeRoadmap from '@/components/home/HomeRoadmap'
import CharacterSection from '@/components/home/CharacterSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeHero />
      <EcosystemMarquee />
      <EcosystemGrid />
      <EcosystemMarquee variant="dark" reverse />
      <WealthCity />
      <HomeRoadmap />
      <CharacterSection />
      <LeadMagnetForm />
      <Footer />
    </main>
  )
}
