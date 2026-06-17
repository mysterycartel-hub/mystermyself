import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Library Vault | Scott-King Coast — MysterMyself',
  description: 'Prompts, guides, playbooks, research, and resources turned into assets.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Library Vault"
      eyebrow="Knowledge OS"
      headline="Nothing is lost. Everything becomes an asset."
      copy="Library Vault captures prompts, research, guides, product ideas, playbooks, and opportunity notes so the ecosystem keeps compounding instead of restarting."
      accent="#6366F1"
      primary="View Resource Drops"
      bullets={[
        'Prompt Bible and Execution Bible.',
        'Opportunity research and product maps.',
        'Affiliate and startup credit vaults.',
        'Guides, playbooks, and reusable systems.',
      ]}
    />
  )
}
