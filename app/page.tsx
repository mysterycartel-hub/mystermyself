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
import FlagshipVideos from '@/components/home/FlagshipVideos'
import ScottKingCoastMap from '@/components/map/ScottKingCoastMap'
import PassportPreview from '@/components/passport/PassportPreview'
import ProductPriority from '@/components/home/ProductPriority'
import BeehiivSubscribe from '@/components/home/BeehiivSubscribe'
import CoastIntro from '@/components/home/CoastIntro'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeHero />
      <BeehiivSubscribe />
      <CoastIntro />
      <EcosystemMarquee />
      <ProductPriority />
      <FlagshipVideos />
      <EcosystemMarquee variant="dark" reverse />
      <ScottKingCoastMap />
      <EcosystemGrid />
      <WealthCity />
      <HomeRoadmap />
      <PassportPreview />
      <CharacterSection />
      <LeadMagnetForm />
      <Footer />
    </main>
  )
}
