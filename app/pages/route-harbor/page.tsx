import DistrictPage from '@/components/DistrictPage'
import { routes } from '@/lib/site'

export const metadata = {
  title: 'Route Harbor | Scott-King Coast — MysterMyself',
  description: 'Medical courier income, logistics lanes, contracts, and road-based opportunity research.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Route Harbor"
      eyebrow="Courier + Logistics"
      headline="Courier income without depending only on apps."
      copy="Route Harbor turns delivery experience into business systems: medical courier, legal courier, construction runner, pharmacy delivery, and contract research."
      accent="#0EA5E9"
      primary="Get Courier Drops"
      productHref={routes.medicalCourierGuide}
      productText="View Medical Courier Guide"
      bullets={[
        'Medical courier research and pharmacy outreach.',
        'Scripts for calling decision makers.',
        'Route acquisition and follow-up systems.',
        'Courier Income Lab lives inside Route Harbor.',
      ]}
    />
  )
}
