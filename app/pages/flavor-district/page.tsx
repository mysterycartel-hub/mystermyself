import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Flavor District | Scott-King Coast — MysterMyself',
  description: 'Breaded Or Not?!, food business, catering, ghost kitchens, and kitchen knowledge.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Flavor District"
      eyebrow="Breaded Or Not?!"
      headline="Food business knowledge from the kitchen to the brand."
      copy="Flavor District is the food business lane: Breaded Or Not?!, wings, catering, ghost kitchen ideas, menu strategy, and food entrepreneurship."
      accent="#F97316"
      primary="Follow Food Business Drops"
      bullets={[
        'Breaded Or Not?! story and food business lessons.',
        'Catering and ghost kitchen systems.',
        'Menu, pricing, and product ideas.',
        'Food content that connects to income paths.',
      ]}
    />
  )
}
