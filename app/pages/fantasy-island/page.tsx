import DistrictPage from '@/components/DistrictPage'

export const metadata = {
  title: 'Fantasy Island | Scott-King Coast — MysterMyself',
  description: 'Fantasy football, live updates, rankings, injury alerts, XP, rewards, and the Draft Bible.',
}

export default function Page() {
  return (
    <DistrictPage
      name="Fantasy Island"
      eyebrow="Game + Live Automation"
      headline="Draft smarter before your league does."
      copy="Fantasy Island is the game destination and live-update automation district: fantasy football, rankings, injury alerts, subscriber drops, XP, rewards, and seasonal products."
      accent="#22C55E"
      primary="Get Fantasy Island Live Drops"
      bullets={[
        'Fantasy Draft Bible and rankings hub.',
        'Live player updates, news, and injury alerts.',
        'Subscriber segments for draft, dynasty, and seasonal drops.',
        'Game mechanics, XP, rewards, and TCU simulation bridge.',
      ]}
    />
  )
}
