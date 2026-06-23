// TCU Market Kitchen Terminal — Core Data & Types
// Trading Chef Universe terminal logic: session clock, FVG health, three-touch study

export type SessionName = 'asia' | 'london' | 'new-york' | 'closed'

export interface SessionInfo {
  name: SessionName
  label: string
  color: string
  icon: string
  startHour: number // UTC
  endHour: number   // UTC
  note: string
}

export const SESSIONS: SessionInfo[] = [
  { name: 'asia',     label: 'Asia Kitchen',    color: '#A855F7', icon: '🌙', startHour: 0,  endHour: 8,  note: 'Accumulation phase — range-building, liquidity traps' },
  { name: 'london',   label: 'London Kitchen',  color: '#3B82F6', icon: '🌅', startHour: 8,  endHour: 13, note: 'Expansion phase — breakouts, delivery begins' },
  { name: 'new-york', label: 'New York Kitchen', color: '#F59E0B', icon: '☀️', startHour: 13, endHour: 21, note: 'Distribution phase — continuation or reversal' },
  { name: 'closed',   label: 'Kitchen Closed',  color: '#6B7280', icon: '🌑', startHour: 21, endHour: 0,  note: 'Low volume — preparation time, journal review' },
]

export function getCurrentSession(): SessionInfo {
  const hour = new Date().getUTCHours()
  if (hour >= 0 && hour < 8) return SESSIONS[0]   // Asia
  if (hour >= 8 && hour < 13) return SESSIONS[1]  // London
  if (hour >= 13 && hour < 21) return SESSIONS[2] // New York
  return SESSIONS[3] // Closed
}

export function getSessionTimeRemaining(): string {
  const now = new Date()
  const hour = now.getUTCHours()
  const min = now.getUTCMinutes()
  let endHour: number

  if (hour >= 0 && hour < 8) endHour = 8
  else if (hour >= 8 && hour < 13) endHour = 13
  else if (hour >= 13 && hour < 21) endHour = 21
  else endHour = 24

  const remaining = (endHour - hour - 1) * 60 + (60 - min)
  const h = Math.floor(remaining / 60)
  const m = remaining % 60
  return `${h}h ${m}m`
}

// ── FVG Health Score ────────────────────────────────────────────────────────
export type FVGHealth = 'fresh' | 'tested' | 'mitigated' | 'invalidated'

export interface FVGZone {
  id: string
  label: string
  type: 'bullish' | 'bearish'
  health: FVGHealth
  highPrice: number
  lowPrice: number
  timeframe: string
  age: string // e.g. "2 candles ago"
  touchCount: number
}

export function getFVGHealthColor(health: FVGHealth): string {
  switch (health) {
    case 'fresh': return '#10B981'
    case 'tested': return '#F59E0B'
    case 'mitigated': return '#EF4444'
    case 'invalidated': return '#6B7280'
  }
}

export function getFVGHealthScore(zones: FVGZone[]): number {
  if (zones.length === 0) return 0
  const scores: number[] = zones.map(z => {
    switch (z.health) {
      case 'fresh': return 100
      case 'tested': return 60
      case 'mitigated': return 25
      case 'invalidated': return 0
    }
  })
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

// ── Three-Touch Study ──────────────────────────────────────────────────────
export interface ThreeTouchLevel {
  id: string
  price: number
  label: string
  touches: number
  lastTouch: string
  type: 'support' | 'resistance'
  strength: 'weak' | 'moderate' | 'strong'
}

export function getTouchStrength(touches: number): ThreeTouchLevel['strength'] {
  if (touches >= 3) return 'strong'
  if (touches >= 2) return 'moderate'
  return 'weak'
}

export function getTouchColor(strength: ThreeTouchLevel['strength']): string {
  switch (strength) {
    case 'strong': return '#10B981'
    case 'moderate': return '#F59E0B'
    case 'weak': return '#EF4444'
  }
}

// ── TCU Lingo Sidebar ──────────────────────────────────────────────────────
export interface LingoTerm {
  tcu: string
  traditional: string
  icon: string
  color: string
  definition: string
}

export const TCU_LINGO: LingoTerm[] = [
  { tcu: 'Bias', traditional: 'Directional Read', icon: '🧭', color: '#F59E0B', definition: 'The directional read on the market — bullish, bearish, or neutral based on structure.' },
  { tcu: 'Flow', traditional: 'Liquidity', icon: '💧', color: '#3B82F6', definition: 'Where price is drawing to. Liquidity pools above/below that price hunts.' },
  { tcu: 'AOI', traditional: 'Support/Resistance', icon: '🎯', color: '#A855F7', definition: 'Area of Interest — a zone where price has unfinished business.' },
  { tcu: 'Delivery', traditional: 'Price Action', icon: '🚚', color: '#22C55E', definition: 'How price moves from one level to another — impulsive or corrective.' },
  { tcu: 'Confirmation', traditional: 'Entry Signal', icon: '✅', color: '#10B981', definition: 'The micro-structure or candle that validates the setup is active.' },
  { tcu: 'The Pass', traditional: 'Trade Entry', icon: '🎫', color: '#C9A84C', definition: 'The entry point — only given when all Recipe steps align.' },
  { tcu: 'Burn Point', traditional: 'Stop Loss', icon: '🔥', color: '#EF4444', definition: 'Where the trade idea is invalidated. Set before entry, never moved closer.' },
  { tcu: 'Tables Served', traditional: 'Take Profit', icon: '💰', color: '#F59E0B', definition: 'The target levels where profit is taken — where value is delivered.' },
  { tcu: 'Leftover Container', traditional: 'Fair Value Gap', icon: '📦', color: '#06B6D4', definition: 'An imbalance in price — a gap that price tends to revisit and fill.' },
  { tcu: 'Kitchen Is Open', traditional: 'Session Open', icon: '🔔', color: '#F59E0B', definition: 'When a trading session begins — time to read, not react.' },
  { tcu: 'The Recipe', traditional: 'Trade Setup', icon: '📋', color: '#C9A84C', definition: 'The complete 8-step framework for identifying and executing a trade.' },
  { tcu: 'BOS', traditional: 'Break of Structure', icon: '💥', color: '#EC4899', definition: 'When price breaks a significant swing high or low, confirming direction.' },
  { tcu: 'CHOCH', traditional: 'Change of Character', icon: '🎭', color: '#8B5CF6', definition: 'A structural shift signaling potential trend reversal.' },
]

// ── Chef Read Format (8-step analysis) ─────────────────────────────────────
export interface ChefRead {
  bias: string
  flow: string
  aoi: string
  delivery: string
  confirmation: string
  thePass: string
  tablesServed: string
  management: string
}

export const CHEF_READ_STEPS = [
  { key: 'bias',         label: 'BIAS',         icon: '🧭', color: '#F59E0B', question: 'What is the current directional read?' },
  { key: 'flow',         label: 'FLOW',         icon: '💧', color: '#3B82F6', question: 'Where is liquidity drawing price?' },
  { key: 'aoi',          label: 'AOI',          icon: '🎯', color: '#A855F7', question: 'Where is the Area of Interest?' },
  { key: 'delivery',     label: 'DELIVERY',     icon: '🚚', color: '#22C55E', question: 'How is price moving to reach the AOI?' },
  { key: 'confirmation', label: 'CONFIRMATION', icon: '✅', color: '#10B981', question: 'What signal validates the setup?' },
  { key: 'thePass',      label: 'THE PASS',     icon: '🎫', color: '#C9A84C', question: 'Where is the logical entry?' },
  { key: 'tablesServed', label: 'TABLES SERVED', icon: '💰', color: '#F59E0B', question: 'What are the target levels?' },
  { key: 'management',   label: 'MANAGEMENT',   icon: '🛡️', color: '#EF4444', question: 'Burn Point and invalidation?' },
] as const

// ── Demo Data for Terminal ─────────────────────────────────────────────────
export const DEMO_FVG_ZONES: FVGZone[] = [
  { id: 'fvg-1', label: '4H Bullish FVG', type: 'bullish', health: 'fresh', highPrice: 2342.50, lowPrice: 2338.20, timeframe: '4H', age: '3 candles ago', touchCount: 0 },
  { id: 'fvg-2', label: '1H Bearish FVG', type: 'bearish', health: 'tested', highPrice: 2355.80, lowPrice: 2352.10, timeframe: '1H', age: '8 candles ago', touchCount: 1 },
  { id: 'fvg-3', label: '15M Bullish FVG', type: 'bullish', health: 'fresh', highPrice: 2345.60, lowPrice: 2343.90, timeframe: '15M', age: '2 candles ago', touchCount: 0 },
  { id: 'fvg-4', label: '4H Bearish FVG', type: 'bearish', health: 'mitigated', highPrice: 2360.00, lowPrice: 2356.40, timeframe: '4H', age: '12 candles ago', touchCount: 2 },
  { id: 'fvg-5', label: '1H Bullish FVG', type: 'bullish', health: 'tested', highPrice: 2335.20, lowPrice: 2332.80, timeframe: '1H', age: '5 candles ago', touchCount: 1 },
]

export const DEMO_THREE_TOUCH_LEVELS: ThreeTouchLevel[] = [
  { id: 'ttl-1', price: 2350.00, label: 'Daily Resistance', touches: 3, lastTouch: '4h ago', type: 'resistance', strength: 'strong' },
  { id: 'ttl-2', price: 2342.50, label: '4H Support Zone', touches: 2, lastTouch: '12h ago', type: 'support', strength: 'moderate' },
  { id: 'ttl-3', price: 2360.80, label: 'Weekly High', touches: 3, lastTouch: '1d ago', type: 'resistance', strength: 'strong' },
  { id: 'ttl-4', price: 2330.00, label: 'Prev Day Low', touches: 1, lastTouch: '2d ago', type: 'support', strength: 'weak' },
  { id: 'ttl-5', price: 2345.60, label: 'Asian High', touches: 2, lastTouch: '6h ago', type: 'resistance', strength: 'moderate' },
]

export const DEMO_CHEF_READ: ChefRead = {
  bias: 'Bullish — Higher highs and higher lows on 4H. Structure intact above 2340.',
  flow: 'Price drawing toward previous weekly high at 2360. Sell-side liquidity resting below 2335.',
  aoi: 'Premium zone between 2350-2355. Discount zone at 2338-2342 (4H FVG).',
  delivery: 'Impulsive move up from 2330 to 2350. Currently in corrective pullback phase.',
  confirmation: 'Need bullish BOS on 15M after touching 4H FVG. Wick rejection or engulfing.',
  thePass: 'Entry at 2342 if 15M confirms. Requires AOI tap + confirmation candle close.',
  tablesServed: 'First target 2350 (previous resistance turned support test). Second: 2360 weekly high.',
  management: 'Burn Point below 2335 (below Asian session low). R:R minimum 1:2.5 required.',
}
