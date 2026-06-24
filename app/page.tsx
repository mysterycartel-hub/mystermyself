export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import HomeHero from '@/components/home/HomeHero'
import HomeRoadmap from '@/components/home/HomeRoadmap'
import CharacterSection from '@/components/home/CharacterSection'
import FlagshipVideos from '@/components/home/FlagshipVideos'
import ScottKingCoastMap from '@/components/map/ScottKingCoastMap'
import PassportPreview from '@/components/passport/PassportPreview'
import ProductPriority from '@/components/home/ProductPriority'
import CoastIntro from '@/components/home/CoastIntro'
import DistrictActionGrid from '@/components/home/DistrictActionGrid'
import CoastOpportunities from '@/components/home/CoastOpportunities'

/**
 * Homepage — Scott-King Coast Portal
 *
 * Flow:
 * 1. Hero — establishes MysterMyself + Scott-King Coast identity
 * 2. CoastIntro — explains what Scott-King Coast is and how it fits together
 * 3. EcosystemMarquee — visual brand movement
 * 4. DistrictActionGrid — real districts as destinations
 * 5. ProductPriority — featured live opportunity (Route Harbor)
 * 6. CharacterSection — TCU canon characters (Meet the Kitchen)
 * 7. FlagshipVideos — content proof
 * 8. ScottKingCoastMap — interactive world map
 * 9. CoastOpportunities — Coming Soon + Current Opportunities
 * 10. PassportPreview — passport/progress system
 * 11. HomeRoadmap — what is being built
 * 12. LeadMagnetForm — final capture
 */
export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeHero />
      <CoastIntro />
      <EcosystemMarquee />
      <DistrictActionGrid />
      <ProductPriority />
      <CharacterSection />
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
