import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Legacy Point | Scott-King Coast — MysterMyself',
  description: 'Ownership, business structure, credit, assets, and long-term wealth building.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Legacy Point"
      eyebrow="Ownership + Assets"
      headline="Income is not the finish line. Ownership is."
      copy="Legacy Point organizes business structure, credit, assets, holdings, and long-term moves under the Scott-King wealth-building lane."
      accent="#C9A84C"
      primary="Learn Ownership"
      bullets={[
        'Business structure and ownership thinking.',
        'Credit, assets, and long-term planning.',
        'Scott-King Holdings logic.',
        'Turning skills and products into owned systems.',
      ]}
    />
  )
}
