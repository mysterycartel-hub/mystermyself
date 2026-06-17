import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Creator Pier | Scott-King Coast — MysterMyself',
  description: 'AI tools, affiliate systems, YouTube growth, and creator income infrastructure.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Creator Pier"
      eyebrow="AI + Affiliate + Content"
      headline="Turn tools into assets and content into income."
      copy="Creator Pier organizes AI tools, affiliate programs, YouTube growth, Beehiiv, Canva, and the tool vault into a practical creator income lane."
      accent="#A855F7"
      primary="Get AI + Affiliate Tools"
      bullets={[
        'AI Tool Vault for the tools used to build the Coast.',
        'Affiliate program research and placement.',
        'YouTube and short-form content systems.',
        'Beehiiv audience growth and newsletter drops.',
      ]}
    />
  )
}
