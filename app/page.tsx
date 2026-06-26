export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import HomeHero from '@/components/home/HomeHero'
import HomeRoadmap from '@/components/home/HomeRoadmap'
import FlagshipVideos from '@/components/home/FlagshipVideos'
import ScottKingCoastMap from '@/components/map/ScottKingCoastMap'
import PassportPreview from '@/components/passport/PassportPreview'
import ProductPriority from '@/components/home/ProductPriority'
import CoastIntro from '@/components/home/CoastIntro'
import DistrictActionGrid from '@/components/home/DistrictActionGrid'
import CoastOpportunities from '@/components/home/CoastOpportunities'
import TradingChefSpotlight from '@/components/tcu/TradingChefSpotlight'
import TCUCharacterCanonStrip from '@/components/tcu/TCUCharacterCanonStrip'

/**
 * Homepage — Scott-King Coast Portal
 *
 * Flow:
 * 1. Hero — establishes MysterMyself + Scott-King Coast identity
 * 2. CoastIntro — explains what Scott-King Coast is and how it fits together
 * 3. EcosystemMarquee — visual brand movement
 * 4. DistrictActionGrid — real districts as destinations
 * 5. TradingChefSpotlight — TCU Road Map, lingo, golden rule
 * 6. TCUCharacterCanonStrip — 9 canon characters
 * 7. ProductPriority — featured live opportunity (Route Harbor)
 * 8. FlagshipVideos — content proof
 * 9. ScottKingCoastMap — interactive world map
 * 10. CoastOpportunities — Coming Soon + Current Opportunities
 * 11. PassportPreview — passport/progress system
 * 12. HomeRoadmap — what is being built
 * 13. LeadMagnetForm — final capture
 */
export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeHero />
      <CoastIntro />
      <EcosystemMarquee />
      <DistrictActionGrid />
      <TradingChefSpotlight />
      <TCUCharacterCanonStrip />
      <ProductPriority />
      <FlagshipVideos />
      <EcosystemMarquee variant="dark" reverse />
      <ScottKingCoastMap />
      <CoastOpportunities />
      <PassportPreview />
      <HomeRoadmap />
      <LeadMagnetForm />
      <Footer />
    </main>
  )
}
