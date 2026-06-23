'use client'

import { useState } from 'react'
import Link from 'next/link'
import TCULogo from '@/components/tcu/TCULogo'
import { TradingChefIcon, LouieLiquidityIcon, WickieIcon, ChefGoldieIcon, CandleKidIcon, RicoRhythmIcon, PennyStacksIcon } from '@/components/tcu/CoachIcons'

// ── Strategy Roadmap Data ────────────────────────────────────────────────────
const STRATEGY_PHASES = [
  {
    id: 'foundation',
    phase: 1,
    name: 'Foundation',
    subtitle: 'Learn the Language of Price',
    color: '#94A3B8',
    icon: '👶',
    coach: 'Grandma Market',
    coachIcon: '👵🏾',
    levels: [0],
    skills: ['Market terminology', 'How candles form', 'What price represents'],
    mindset: 'You are a student. Observe. Do not trade.',
    bridge: 'Once you understand candles, you can read the kitchen menu.',
    academyLink: '/academy/market-child',
    kitchenAction: 'Watch price move. Name what you see. Do not act.',
  },
  {
    id: 'candle-reading',
    phase: 2,
    name: 'Candle Reading',
    subtitle: 'See What Price Is Telling You',
    color: '#C9A84C',
    icon: '🕯️',
    coach: 'Wickie',
    coachIcon: '📍',
    levels: [1],
    skills: ['Bullish vs bearish candles', 'Wick rejection', 'Body dominance', 'Engulfing patterns'],
    mindset: 'Every candle is a sentence. Learn to read before you speak.',
    bridge: 'Candles tell you WHO is in control. Structure tells you WHERE they are going.',
    academyLink: '/academy/candles',
    kitchenAction: 'Open the Kitchen. Identify 5 rejection wicks on the 15M chart.',
  },
  {
    id: 'structure',
    phase: 3,
    name: 'Structure',
    subtitle: 'Map the Battlefield',
    color: '#0EA5E9',
    icon: '🏗️',
    coach: 'Chef Goldie',
    coachIcon: '👨‍🍳',
    levels: [2],
    skills: ['Higher highs & higher lows', 'Lower highs & lower lows', 'BOS (Break of Structure)', 'CHOCH (Change of Character)'],
    mindset: 'Structure is the skeleton of every move. Without it, you are guessing.',
    bridge: 'Now you know the direction. Next: where is price being PULLED toward?',
    academyLink: '/academy/structure',
    kitchenAction: 'Mark the last 3 structural shifts on XAUUSD 4H. Label BOS or CHOCH.',
  },
  {
    id: 'bias-flow',
    phase: 4,
    name: 'Bias & Flow',
    subtitle: 'Know Where Liquidity Sits',
    color: '#3B82F6',
    icon: '🌊',
    coach: 'Louie Liquidity',
    coachIcon: '💧',
    levels: [3],
    skills: ['Directional bias', 'Liquidity pools (buy-side / sell-side)', 'Where stops rest', 'Flow direction'],
    mindset: 'Price is always going somewhere. Your job is to know where — not to chase it there.',
    bridge: 'You know the direction and the destination. Now find the discount zone to enter.',
    academyLink: '/academy/bias',
    kitchenAction: 'Identify the current bias on XAUUSD. Where is the nearest liquidity pool?',
  },
  {
    id: 'aoi',
    phase: 5,
    name: 'Area of Interest',
    subtitle: 'Find Your Entry Zone',
    color: '#A855F7',
    icon: '🎯',
    coach: 'Nana Value',
    coachIcon: '🧓🏾',
    levels: [4],
    skills: ['Premium vs discount', 'Supply & demand zones', 'Leftover containers (FVG)', 'Acceptance vs rejection'],
    mindset: 'You do not chase price. You wait where it is going and let it come to you.',
    bridge: 'You found the zone. Now you need to see HOW price arrives — is it ready?',
    academyLink: '/academy/aoi',
    kitchenAction: 'Draw 2 AOI zones on XAUUSD 1H. Label premium or discount.',
  },
  {
    id: 'delivery',
    phase: 6,
    name: 'Delivery',
    subtitle: 'Read How Price Moves',
    color: '#22C55E',
    icon: '🚚',
    coach: 'Chef Goldie',
    coachIcon: '👨‍🍳',
    levels: [5],
    skills: ['Impulsive delivery', 'Corrective delivery', 'Speed of move', 'Efficiency of delivery'],
    mindset: 'Fast moves leave imbalances. Slow moves fill them. Both tell you what comes next.',
    bridge: 'Price arrived at your AOI. Now wait for CONFIRMATION before taking the pass.',
    academyLink: '/academy/delivery',
    kitchenAction: 'Find a recent impulsive move on the 15M. Did it leave a leftover container?',
  },
  {
    id: 'confirmation',
    phase: 7,
    name: 'Confirmation',
    subtitle: 'Wait for the Signal',
    color: '#10B981',
    icon: '✅',
    coach: 'Candle Kid',
    coachIcon: '🕯️',
    levels: [6],
    skills: ['Micro BOS on LTF', 'Wick rejection at AOI', 'Engulfing at discount', 'Shift of momentum'],
    mindset: 'Patience is the strategy. The confirmation is your permission slip.',
    bridge: 'Confirmed. The recipe is complete. Now execute The Pass with precision.',
    academyLink: '/academy/confirmation',
    kitchenAction: 'Wait for price to tap your AOI. What confirmation do you see on 5M?',
  },
  {
    id: 'the-pass',
    phase: 8,
    name: 'The Pass & Risk',
    subtitle: 'Execute with Discipline',
    color: '#C9A84C',
    icon: '🎫',
    coach: 'Penny Stacks',
    coachIcon: '💰',
    levels: [7],
    skills: ['Entry execution', 'Burn point placement', 'Position sizing', 'Risk-to-reward calculation'],
    mindset: 'If you do not know the recipe, you do not take the pass. Period.',
    bridge: 'You are in the trade. Now manage it — and know when tables are served.',
    academyLink: '/academy/risk',
    kitchenAction: 'Calculate: 1% risk on a $10,000 account with 30 pip Burn Point. What is your lot size?',
  },
  {
    id: 'tables-served',
    phase: 9,
    name: 'Tables Served',
    subtitle: 'Take Profit with Logic',
    color: '#22C55E',
    icon: '💰',
    coach: 'Trading Chef',
    coachIcon: '👑',
    levels: [8],
    skills: ['Target identification', 'Partial profit', 'Trailing management', 'When to let it run vs close'],
    mindset: 'Profit is not greed. It is the kitchen serving the table. Take what is ready.',
    bridge: 'Full recipe mastered. Now you manage the entire kitchen.',
    academyLink: '/academy/tables-served',
    kitchenAction: 'Identify 2 logical target levels based on liquidity and structure.',
  },
  {
    id: 'head-chef',
    phase: 10,
    name: 'Head Chef',
    subtitle: 'Run the Entire Kitchen',
    color: '#C9A84C',
    icon: '👑',
    coach: 'The Trading Chef',
    coachIcon: '👑',
    levels: [9],
    skills: ['Full recipe execution', 'Multi-timeframe analysis', 'Session management', 'Psychology mastery', 'Teaching others'],
    mindset: 'A Head Chef does not chase. They plan, prepare, execute, and manage. Every single time.',
    bridge: 'You are the kitchen. Keep cooking. Keep journaling. Keep growing.',
    academyLink: '/academy/kitchen-rush',
    kitchenAction: 'Run a full Kitchen Rush scenario. Execute all 8 recipe steps in sequence.',
  },
]

// ── Phase Card Component ─────────────────────────────────────────────────────
function PhaseCard({ phase, isActive, onClick }: {
  phase: typeof STRATEGY_PHASES[0]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? `${phase.color}10` : 'rgba(0,0,0,0.3)',
        border: `1px solid ${isActive ? `${phase.color}40` : 'rgba(201,168,76,0.08)'}`,
        borderLeft: `3px solid ${phase.color}`,
        borderRadius: 12,
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'all 0.25s',
        transform: isActive ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      {/* Phase header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: `${phase.color}18`,
            border: `1px solid ${phase.color}35`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            {phase.icon}
          </div>
          <div>
            <div style={{ fontSize: 9, color: phase.color, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.7 }}>
              PHASE {phase.phase}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: phase.color, letterSpacing: '0.04em' }}>
              {phase.name}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 9, opacity: 0.3, fontFamily: '"Space Mono", monospace' }}>
          Level {phase.levels[0]}
        </div>
      </div>

      <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic', marginBottom: 8 }}>
        {phase.subtitle}
      </div>

      {/* Coach */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>{phase.coachIcon}</span>
        <span style={{ fontSize: 10, opacity: 0.4 }}>Coach: {phase.coach}</span>
      </div>

      {/* Expanded content */}
      {isActive && (
        <div style={{ marginTop: 14, borderTop: `1px solid ${phase.color}20`, paddingTop: 14 }}>
          {/* Skills */}
          <div style={{ fontSize: 10, fontWeight: 700, color: phase.color, letterSpacing: '0.1em', marginBottom: 8 }}>
            SKILLS YOU DEVELOP
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {phase.skills.map(s => (
              <span key={s} style={{
                fontSize: 9,
                padding: '3px 10px',
                borderRadius: 12,
                background: `${phase.color}12`,
                border: `1px solid ${phase.color}25`,
                color: phase.color,
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Mindset */}
          <div style={{ fontSize: 10, fontWeight: 700, color: phase.color, letterSpacing: '0.1em', marginBottom: 6 }}>
            MINDSET
          </div>
          <p style={{ fontSize: 11, opacity: 0.6, lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic' }}>
            &ldquo;{phase.mindset}&rdquo;
          </p>

          {/* Kitchen Action */}
          <div style={{ fontSize: 10, fontWeight: 700, color: phase.color, letterSpacing: '0.1em', marginBottom: 6 }}>
            🍳 KITCHEN ACTION
          </div>
          <p style={{ fontSize: 11, opacity: 0.55, lineHeight: 1.7, margin: '0 0 14px' }}>
            {phase.kitchenAction}
          </p>

          {/* Bridge */}
          <div style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: `${phase.color}08`,
            border: `1px solid ${phase.color}18`,
            fontSize: 10,
            opacity: 0.7,
            lineHeight: 1.7,
          }}>
            <strong style={{ color: phase.color }}>→ BRIDGE:</strong> {phase.bridge}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Link href={phase.academyLink} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '8px 16px',
                background: `${phase.color}15`,
                border: `1px solid ${phase.color}30`,
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
                color: phase.color,
                letterSpacing: '0.06em',
              }}>
                Start Lesson →
              </div>
            </Link>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(245,240,232,0.03)',
                border: '1px solid rgba(245,240,232,0.08)',
                borderRadius: 6,
                fontSize: 10,
                color: 'rgba(245,240,232,0.5)',
                letterSpacing: '0.06em',
              }}>
                Practice in Kitchen
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Strategy Roadmap Component ──────────────────────────────────────────
export default function StrategyRoadmap() {
  const [activePhase, setActivePhase] = useState<string | null>('foundation')

  return (
    <div style={{ minHeight: '100vh', background: '#060608', color: '#E8D5A3' }}>

      {/* Hero */}
      <section style={{
        padding: '130px 48px 60px',
        background: 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <TCULogo size={48} />
            <div>
              <div style={{
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 6,
                fontFamily: '"Space Mono", monospace',
              }}>
                TRADING CHEF UNIVERSITY · STRATEGY ROADMAP
              </div>
              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
                color: 'var(--cream)',
              }}>
                FROM MARKET CHILD TO{' '}
                <span style={{ color: 'var(--gold)' }}>HEAD CHEF</span>
              </h1>
            </div>
          </div>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.4)',
            maxWidth: 600,
            marginBottom: 16,
          }}>
            This is your guided strategy path. Each phase teaches one skill, assigns one coach, gives you one kitchen action, and bridges you to the next step. No shortcuts. No skipping. The recipe is the roadmap.
          </p>

          <div style={{
            padding: '12px 18px',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.12)',
            borderRadius: 8,
            fontSize: 11,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.5)',
            maxWidth: 640,
          }}>
            <strong style={{ color: '#C9A84C' }}>How it works:</strong> Learn in the Academy → Practice in the Market Kitchen → Follow the roadmap phase by phase. Each character guides you through their specialty. When you complete a phase, the bridge takes you to the next.
          </div>
        </div>
      </section>

      {/* Roadmap Phases */}
      <section style={{ padding: '48px 24px 80px', maxWidth: 900, margin: '0 auto' }}>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          gap: 4,
          marginBottom: 32,
          padding: '0 8px',
        }}>
          {STRATEGY_PHASES.map(p => (
            <div key={p.id} style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: activePhase === p.id ? p.color : `${p.color}25`,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
              onClick={() => setActivePhase(p.id)}
            />
          ))}
        </div>

        {/* Phase cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {STRATEGY_PHASES.map(phase => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              isActive={activePhase === phase.id}
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 40,
          padding: '24px 28px',
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 10 }}>
            👨‍🍳 THE COMPLETE RECIPE
          </div>
          <p style={{ fontSize: 12, opacity: 0.5, lineHeight: 1.8, margin: '0 0 8px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Bias → Flow → AOI → Delivery → Confirmation → The Pass → Tables Served → Management
          </p>
          <p style={{ fontSize: 10, opacity: 0.35, lineHeight: 1.7, margin: '0 0 16px' }}>
            Every phase on this roadmap teaches one step of The Recipe. Master all 10 and you run the kitchen.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/academy" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '10px 24px',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 6,
                color: '#C9A84C',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
              }}>
                Start Academy →
              </div>
            </Link>
            <Link href="/kitchen" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '10px 24px',
                background: 'rgba(245,240,232,0.03)',
                border: '1px solid rgba(245,240,232,0.08)',
                borderRadius: 6,
                color: 'rgba(245,240,232,0.5)',
                fontSize: 11,
                letterSpacing: '0.08em',
              }}>
                Open Kitchen
              </div>
            </Link>
            <Link href="/market-marina/tcu-terminal" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '10px 24px',
                background: 'rgba(245,240,232,0.03)',
                border: '1px solid rgba(245,240,232,0.08)',
                borderRadius: 6,
                color: 'rgba(245,240,232,0.5)',
                fontSize: 11,
                letterSpacing: '0.08em',
              }}>
                TCU Terminal
              </div>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 20,
          padding: '10px 16px',
          borderRadius: 8,
          background: 'rgba(239,68,68,0.04)',
          border: '1px solid rgba(239,68,68,0.1)',
          fontSize: 9,
          opacity: 0.5,
          lineHeight: 1.7,
          textAlign: 'center',
        }}>
          🔔 Educational only. No signals. No financial advice. Train first. Trade later.
        </div>
      </section>
    </div>
  )
}
