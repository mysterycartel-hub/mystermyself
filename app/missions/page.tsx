import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MissionCard from '@/components/MissionCard'
import Link from 'next/link'

export const metadata = {
  title: 'Missions | Scott-King Coast',
  description: 'Complete missions across all districts to earn XP and unlock district access.',
}

const MISSIONS = {
  beginner: [
    { title: 'Subscribe to The Opportunity List', description: 'Join the free weekly newsletter to unlock the full ecosystem. Your first move.', xp: 50, district: 'All Districts', districtColor: '#c9a84c' },
    { title: 'Read the Market Marina Intro', description: 'Visit Market Marina and read the Trading Chef overview. Understand the system before you trade.', xp: 25, district: 'Market Marina', districtColor: '#c9a84c' },
    { title: 'Pick Your Primary Lane', description: 'Choose one district as your main focus. Income compounds when you commit to one lane first.', xp: 30, district: 'All Districts', districtColor: '#c9a84c' },
    { title: 'Log Your First Journal Entry', description: 'Open the Trade Journal and log one observation — real trade or demo only.', xp: 40, district: 'Market Marina', districtColor: '#c9a84c' },
    { title: 'Explore Route Harbor', description: 'Read the Medical Courier Insider Edge overview. Learn the courier income structure.', xp: 25, district: 'Route Harbor', districtColor: '#0EA5E9' },
    { title: 'Visit Creator Pier', description: 'Browse the Tool Vault in Creator Pier. Find at least one tool relevant to your goals.', xp: 25, district: 'Creator Pier', districtColor: '#A855F7' },
  ],
  intermediate: [
    { title: 'Complete the Market Structure Lesson', description: 'Finish the Market Child lesson in the Academy. Understand Higher High, Lower Low, and BOS.', xp: 100, district: 'Market Marina', districtColor: '#c9a84c' },
    { title: 'Identify a Liquidity Level', description: 'On any chart, mark a liquidity sweep and screenshot it. Not financial advice — this is education.', xp: 75, district: 'Market Marina', districtColor: '#c9a84c' },
    { title: 'Research a Courier Contract Opportunity', description: 'Find one medical, pharmacy, or lab courier opportunity in your area using the methods in Route Harbor.', xp: 100, district: 'Route Harbor', districtColor: '#0EA5E9' },
    { title: 'Set Up a Fantasy Draft Board', description: 'Build a top 20 rankings list using the Fantasy Island framework before your next draft.', xp: 75, district: 'Fantasy Island', districtColor: '#22C55E' },
    { title: 'Join 3 Affiliate Programs', description: 'Sign up for at least 3 affiliate programs from the Creator Pier research vault.', xp: 80, district: 'Creator Pier', districtColor: '#A855F7' },
    { title: 'Log 10 Journal Sessions', description: 'Consistency is the edge. Log 10 sessions — wins, losses, and observations all count.', xp: 150, district: 'Market Marina', districtColor: '#c9a84c' },
  ],
  advanced: [
    { title: 'Build a Weekly Opportunity Report', description: 'Compile one full week of opportunity intel across your primary lane using Opportunity List drops.', xp: 200, district: 'All Districts', districtColor: '#c9a84c' },
    { title: 'Execute a Courier Route Week', description: 'Complete 5 or more paid courier/delivery routes in one week using the Route Harbor playbook.', xp: 250, district: 'Route Harbor', districtColor: '#0EA5E9' },
    { title: 'Launch a Creator Asset', description: 'Publish one piece of content, affiliate link, or digital asset using Creator Pier systems.', xp: 300, district: 'Creator Pier', districtColor: '#A855F7' },
    { title: 'Win Your Fantasy League Week', description: 'Use the Fantasy Island system to outscore your weekly opponent. Document your lineup logic.', xp: 200, district: 'Fantasy Island', districtColor: '#22C55E' },
    { title: 'Demo-Trade 20 Sessions', description: 'Complete 20 demo sessions using the Trading Chef methodology. Log every one in your Journal.', xp: 400, district: 'Market Marina', districtColor: '#c9a84c' },
    { title: 'Refer 3 Coast Members', description: 'Share your referral link and bring 3 new subscribers to the Opportunity List.', xp: 300, district: 'All Districts', districtColor: '#c9a84c' },
  ],
}

const TIER_INFO = {
  beginner:     { label: 'Beginner',     color: '#22C55E', desc: 'Start here. These missions build the foundation.' },
  intermediate: { label: 'Intermediate', color: '#c9a84c', desc: 'Go deeper. Execution and consistency missions.' },
  advanced:     { label: 'Advanced',     color: '#c0392b', desc: 'Full commitment. Measurable real-world results.' },
}

export default function MissionsPage() {
  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Scott-King Coast · Progression System
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}>
              COAST <span style={{ color: 'var(--gold)' }}>MISSIONS</span>
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.8,
              maxWidth: 500,
              margin: '0 auto 24px',
            }}>
              Complete missions to earn XP, unlock districts, and build real skills. Pick your tier, pick your lane, execute.
            </p>
            <Link href="/passport" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <div style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '10px 24px',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
              }}>
                Track Progress → Passport
              </div>
            </Link>
          </div>

          {(Object.entries(MISSIONS) as [keyof typeof MISSIONS, typeof MISSIONS['beginner']][]).map(([tier, items]) => {
            const info = TIER_INFO[tier]
            return (
              <div key={tier} style={{ marginBottom: 64 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 24,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${info.color}20`,
                }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    background: `${info.color}15`,
                    color: info.color,
                    border: `1px solid ${info.color}30`,
                  }}>
                    {info.label}
                  </span>
                  <p style={{
                    fontSize: '0.68rem',
                    color: 'rgba(245,240,232,0.4)',
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    {info.desc}
                  </p>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 2,
                }}>
                  {items.map((mission, i) => (
                    <MissionCard
                      key={mission.title}
                      difficulty={tier}
                      index={i}
                      {...mission}
                    />
                  ))}
                </div>
              </div>
            )
          })}

        </div>
      </section>

      <Footer />
    </main>
  )
}
