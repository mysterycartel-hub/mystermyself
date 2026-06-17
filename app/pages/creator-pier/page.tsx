import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Creator Pier | Scott-King Coast — MysterMyself',
  description: 'AI Tool Vault, Affiliate Tool Vault, YouTube growth, and creator income infrastructure.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Creator Pier"
      eyebrow="AI Tool Vault · Affiliate Picks · Creator Systems"
      headline="The tools that run the Coast — and how to monetize them."
      copy="Creator Pier is the AI Tool Vault and Affiliate Tool Vault for the MysterMyself ecosystem. Every tool used to build, grow, and monetize is documented here with affiliate links, use-case guides, and income plays."
      accent="#A855F7"
      primary="Get AI + Affiliate Tool Drops"
      bullets={[
        'AI Tool Vault: the exact tools used to build Scott-King Coast.',
        'Affiliate Picks: vetted tools with earning potential for creators.',
        'YouTube and short-form content systems for audience growth.',
        'Beehiiv audience growth and newsletter monetization guides.',
        'Canva, Claude, and automation stacks broken down step by step.',
        'Affiliate disclosure on every recommendation — no hidden deals.',
      ]}
    />
  )
}
