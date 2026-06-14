export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemMarquee from '@/components/EcosystemMarquee'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import TCUHero from '@/components/tcu/TCUHero'
import TCUMarquee from '@/components/tcu/TCUMarquee'
import TCUHook from '@/components/tcu/TCUHook'
import TCUCurriculum from '@/components/tcu/TCUCurriculum'
import TCUSessions from '@/components/tcu/TCUSessions'
import TCUForWho from '@/components/tcu/TCUForWho'
import TCUPricing from '@/components/tcu/TCUPricing'
import TCUTestimonials from '@/components/tcu/TCUTestimonials'
import TCUAbout from '@/components/tcu/TCUAbout'
import TCUFAQ from '@/components/tcu/TCUFAQ'
import TCUFinalCTA from '@/components/tcu/TCUFinalCTA'

export const metadata: Metadata = {
  title: 'Trading Chef University — Master Gold. Master Your Life.',
  description: 'Learn to read liquidity sweeps, institutional order flow, and market structure on XAUUSD. 6 modules. One system. The TCU method.',
}

export default function TCUPage() {
  return (
    <main>
      <Navbar />
      <TCUHero />
      <TCUMarquee />
      <TCUHook />
      <TCUCurriculum />
      <TCUSessions />
      <TCUForWho />
      <TCUPricing />
      <TCUTestimonials />
      <LeadMagnetForm
        division="trading-chef-university"
        heading={'GET THE FREE\nGOLD STARTER\nGUIDE'}
        subheading="Drop your info and we'll send you the TCU Gold Trading Starter Guide — sessions, setups, and the one chart pattern every gold trader needs to know before risking a dollar."
      />
      <TCUAbout />
      <TCUFAQ />
      <TCUFinalCTA />
      <Footer />
    </main>
  )
}
