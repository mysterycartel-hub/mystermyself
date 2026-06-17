import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Founder Island | Scott-King Coast — MysterMyself',
  description: 'The origin story, brand mission, and blueprint of the MysterMyself ecosystem.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Founder Island"
      eyebrow="Command Center"
      headline="The Coast starts with the founder and the mission."
      copy="Founder Island explains MysterMyself, Maurice Scott, the MS Crown, and the reason every skill in the ecosystem gets turned into a lane, product, or asset."
      accent="#6B21A8"
      primary="Join The Opportunity List"
      bullets={[
        'MysterMyself brand origin and mission.',
        'Scott-King Coast world map.',
        'Founder story and active build notes.',
        'Start here before choosing a district.',
      ]}
    />
  )
}
