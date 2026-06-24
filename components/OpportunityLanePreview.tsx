'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LaneInfo {
  value: string
  label: string
  emoji: string
  district: string
  color: string
  preview: string
  features: string[]
}

const LANE_PREVIEWS: LaneInfo[] = [
  {
    value: 'interest_trading_chef',
    label: 'Trading Chef / Market Marina',
    emoji: '⚓',
    district: 'Market Marina',
    color: '#0D9488',
    preview: 'Gold trading education through the TCU framework. Learn market structure, liquidity, and the 8-step recipe.',
    features: ['XAUUSD Analysis', 'Chart Kitchen Terminal', 'TCU Academy (13 lessons)', 'AI Coach'],
  },
  {
    value: 'interest_route_harbor',
    label: 'Courier Money / Route Harbor',
    emoji: '🚢',
    district: 'Route Harbor',
    color: '#0EA5E9',
    preview: 'Medical courier income without job boards. Pharmacy, lab, and contract delivery routes.',
    features: ['Medical Courier Insider Edge ($37)', 'Route Acquisition Math', 'Contract Templates', 'Vehicle Strategy'],
  },
  {
    value: 'interest_creator_tools',
    label: 'Creator Tools / Creator Pier',
    emoji: '🎬',
    district: 'Creator Pier',
    color: '#A855F7',
    preview: 'Content systems, affiliate income, and newsletter monetization tools.',
    features: ['Newsletter Ready Desk', 'Affiliate Research', 'Content Systems', 'YouTube Growth'],
  },
  {
    value: 'interest_fantasy',
    label: 'Fantasy Island',
    emoji: '🏈',
    district: 'Fantasy Island',
    color: '#22C55E',
    preview: 'Fantasy football intelligence. Rankings, live alerts, and draft strategy.',
    features: ['Fantasy Draft Bible', 'Live Injury Alerts', 'ADP Analysis', 'Weekly Rankings'],
  },
  {
    value: 'interest_ai_business',
    label: 'AI Business / Blueprint Bay',
    emoji: '📐',
    district: 'Blueprint Bay',
    color: '#6366F1',
    preview: 'AI automation, agents, workflows, and business operating systems.',
    features: ['AI Operator Starter Kit', 'Agent Workflows', 'Automation Templates', 'Business OS'],
  },
  {
    value: 'interest_food',
    label: 'Food Business / Breaded Or Not',
    emoji: '🍗',
    district: 'Flavor District',
    color: '#F97316',
    preview: 'Food pop-ups, catering systems, menu development, and brand building.',
    features: ['Food Pop-Up Blueprint', 'Menu Systems', 'Catering Framework', 'Brand Building'],
  },
  {
    value: 'interest_fast_income',
    label: 'Jobs & Fast Income',
    emoji: '⚡',
    district: 'All Districts',
    color: '#c9a84c',
    preview: 'Quick income plays across all lanes. Start earning while you learn.',
    features: ['Money Move Playbooks', 'Fast Income Routes', 'Starter Frameworks', 'Free Resources'],
  },
]

interface Props {
  selectedLane: string
}

export default function OpportunityLanePreview({ selectedLane }: Props) {
  const lane = LANE_PREVIEWS.find(l => l.value === selectedLane)

  return (
    <AnimatePresence mode="wait">
      {lane && (
        <motion.div
          key={lane.value}
          initial={{ opacity: 0, y: 12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{
            background: `${lane.color}08`,
            border: `1px solid ${lane.color}25`,
            padding: '20px 24px',
            marginTop: 8,
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '1.6rem' }}>{lane.emoji}</span>
              <div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  color: lane.color,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}>
                  {lane.district}
                </div>
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.45rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: `${lane.color}80`,
                }}>
                  Your lane after signup
                </span>
              </div>
            </div>

            {/* Preview text */}
            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(245,240,232,0.55)',
              lineHeight: 1.7,
              marginBottom: 14,
            }}>
              {lane.preview}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {lane.features.map(f => (
                <span key={f} style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  background: `${lane.color}12`,
                  color: lane.color,
                  border: `1px solid ${lane.color}20`,
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
