export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import InteractiveCoastHero from '@/components/home/InteractiveCoastHero'
import HomeRoadmap from '@/components/home/HomeRoadmap'
import CharacterSection from '@/components/home/CharacterSection'
import FlagshipVideos from '@/components/home/FlagshipVideos'
import ScottKingCoastMap from '@/components/map/ScottKingCoastMap'
import ProductPriority from '@/components/home/ProductPriority'
import CoastIntro from '@/components/home/CoastIntro'
import DistrictActionGrid from '@/components/home/DistrictActionGrid'
import CoastOpportunities from '@/components/home/CoastOpportunities'
import CoastPassportProgress from '@/components/home/CoastPassportProgress'

/**
 * Homepage — Scott-King Coast Portal
 *
 * Flow:
 * 1. InteractiveCoastHero — living, breathing entry with particle canvas + pulsing districts
 * 2. CoastIntro — explains what Scott-King Coast is and how it fits together
 * 3. EcosystemMarquee — visual brand movement
 * 4. DistrictActionGrid — real districts as destinations (hover-reactive)
 * 5. ProductPriority — featured live opportunity (Route Harbor)
 * 6. CharacterSection — TCU canon characters (Meet the Kitchen)
 * 7. FlagshipVideos — content proof
 * 8. ScottKingCoastMap — interactive world map (ambient auto-cycle)
 * 9. CoastOpportunities — Coming Soon + Current Opportunities
 * 10. CoastPassportProgress — passport XP teaser + 3 next actions
 * 11. HomeRoadmap — what is being built
 * 12. LeadMagnetForm — final capture
 */
export default function Home() {
  return (
    <main>
      <Navbar />
      <InteractiveCoastHero />
      <CoastIntro />
      <EcosystemMarquee />
      <DistrictActionGrid />
      <ProductPriority />
      <CharacterSection />
      <FlagshipVideos />
      <EcosystemMarquee variant="dark" reverse />
      <ScottKingCoastMap />
      <CoastOpportunities />
      <CoastPassportProgress />
      <HomeRoadmap />
      <LeadMagnetForm />
      <Footer />
    </main>
  )
}
