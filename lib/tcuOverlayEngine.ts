// ============================================================
// TCU Overlay Engine — Pure Computation Module
// Analyzes candle data and returns structured TCU market analysis
// No API calls, no side effects — deterministic analysis only
// ============================================================

import { CandleData } from './marketData'

// ── Types ─────────────────────────────────────────────────────────────────────

export type TrendState = 'bullish' | 'bearish' | 'ranging'
export type SetupQuality = 'A+' | 'A' | 'B' | 'C' | 'no-setup'

export interface SwingPoint {
  index: number
  time: number
  price: number
  type: 'high' | 'low'
}

export interface StructureBreak {
  index: number
  time: number
  price: number
  type: 'BOS' | 'CHOCH'  // Break of Structure | Change of Character
  direction: 'bullish' | 'bearish'
}

export interface MarketStructure {
  swingHighs: SwingPoint[]
  swingLows: SwingPoint[]
  structureBreaks: StructureBreak[]
  trend: TrendState
}

export interface LiquidityZone {
  price: number
  type: 'previous-high' | 'previous-low' | 'equal-highs' | 'equal-lows' | 'session-high' | 'session-low' | 'sweep'
  strength: number   // 1-3 scale (1=weak, 3=strong)
  time: number
}

export interface LiquidityMap {
  zones: LiquidityZone[]
  buySideTargets: number[]
  sellSideTargets: number[]
}

export interface AOIZone {
  type: 'supply' | 'demand' | 'leftover-container'  // leftover container = FVG in TCU canon
  high: number
  low: number
  startTime: number
  endTime: number
  isFresh: boolean   // Has price revisited this zone?
}

export interface AreaOfInterest {
  supplyZones: AOIZone[]
  demandZones: AOIZone[]
  leftovers: AOIZone[]   // FVG / leftover containers
}

export interface TradePlanSkeleton {
  bias: TrendState
  thePass: string              // Entry description (TCU: "the pass")
  burnPoint: string            // Stop loss description (TCU: "burn point")
  tablesServed: string[]       // Targets (TCU: "tables served")
  invalidation: string
  setupQuality: SetupQuality
  recipeSummary: string        // Setup summary (TCU: "the recipe")
}

export interface TCUAnalysis {
  structure: MarketStructure
  liquidity: LiquidityMap
  aoi: AreaOfInterest
  tradePlan: TradePlanSkeleton
}

// ── Core Analysis Function ────────────────────────────────────────────────────

/**
 * Analyzes candle data and returns a full TCU-structured overlay analysis.
 * Pure computation - no side effects, no API calls.
 */
export function analyzeStructure(candles: CandleData[]): TCUAnalysis {
  if (!candles || candles.length < 10) {
    return getEmptyAnalysis()
  }

  const structure = computeMarketStructure(candles)
  const liquidity = computeLiquidityMap(candles, structure)
  const aoi = computeAOI(candles, structure)
  const tradePlan = buildTradePlan(candles, structure, liquidity, aoi)

  return { structure, liquidity, aoi, tradePlan }
}

// ── Market Structure ──────────────────────────────────────────────────────────

function computeMarketStructure(candles: CandleData[]): MarketStructure {
  const swingHighs = findSwingHighs(candles)
  const swingLows = findSwingLows(candles)
  const structureBreaks = findStructureBreaks(swingHighs, swingLows)
  const trend = determineTrend(candles, structureBreaks)

  return { swingHighs, swingLows, structureBreaks, trend }
}

function findSwingHighs(candles: CandleData[], lookback: number = 3): SwingPoint[] {
  const swings: SwingPoint[] = []

  for (let i = lookback; i < candles.length - lookback; i++) {
    const current = candles[i].high
    let isSwing = true

    for (let j = 1; j <= lookback; j++) {
      if (candles[i - j].high >= current || candles[i + j].high >= current) {
        isSwing = false
        break
      }
    }

    if (isSwing) {
      swings.push({
        index: i,
        time: candles[i].time,
        price: current,
        type: 'high',
      })
    }
  }

  return swings
}

function findSwingLows(candles: CandleData[], lookback: number = 3): SwingPoint[] {
  const swings: SwingPoint[] = []

  for (let i = lookback; i < candles.length - lookback; i++) {
    const current = candles[i].low
    let isSwing = true

    for (let j = 1; j <= lookback; j++) {
      if (candles[i - j].low <= current || candles[i + j].low <= current) {
        isSwing = false
        break
      }
    }

    if (isSwing) {
      swings.push({
        index: i,
        time: candles[i].time,
        price: current,
        type: 'low',
      })
    }
  }

  return swings
}

function findStructureBreaks(swingHighs: SwingPoint[], swingLows: SwingPoint[]): StructureBreak[] {
  const breaks: StructureBreak[] = []

  // BOS: price breaks above a previous swing high (bullish) or below a swing low (bearish)
  // CHOCH: price breaks structure in the opposite direction of the prevailing trend

  const allSwings = [...swingHighs, ...swingLows].sort((a, b) => a.index - b.index)

  let lastHigh: SwingPoint | null = null
  let lastLow: SwingPoint | null = null
  let currentBias: 'bullish' | 'bearish' | null = null

  for (const swing of allSwings) {
    if (swing.type === 'high') {
      if (lastHigh && swing.price > lastHigh.price) {
        const breakType = currentBias === 'bearish' ? 'CHOCH' : 'BOS'
        breaks.push({
          index: swing.index,
          time: swing.time,
          price: swing.price,
          type: breakType,
          direction: 'bullish',
        })
        currentBias = 'bullish'
      }
      lastHigh = swing
    } else {
      if (lastLow && swing.price < lastLow.price) {
        const breakType = currentBias === 'bullish' ? 'CHOCH' : 'BOS'
        breaks.push({
          index: swing.index,
          time: swing.time,
          price: swing.price,
          type: breakType,
          direction: 'bearish',
        })
        currentBias = 'bearish'
      }
      lastLow = swing
    }
  }

  return breaks
}

function determineTrend(candles: CandleData[], breaks: StructureBreak[]): TrendState {
  // Use the most recent structure breaks to determine trend
  const recentBreaks = breaks.slice(-3)

  if (recentBreaks.length === 0) {
    // No structure breaks - compare first and last candle
    const first = candles[0]
    const last = candles[candles.length - 1]
    if (last.close > first.close * 1.002) return 'bullish'
    if (last.close < first.close * 0.998) return 'bearish'
    return 'ranging'
  }

  const bullishBreaks = recentBreaks.filter(b => b.direction === 'bullish').length
  const bearishBreaks = recentBreaks.filter(b => b.direction === 'bearish').length

  if (bullishBreaks > bearishBreaks) return 'bullish'
  if (bearishBreaks > bullishBreaks) return 'bearish'
  return 'ranging'
}

// ── Liquidity Map ─────────────────────────────────────────────────────────────

function computeLiquidityMap(candles: CandleData[], structure: MarketStructure): LiquidityMap {
  const zones: LiquidityZone[] = []
  const currentPrice = candles[candles.length - 1].close

  // Previous highs and lows as liquidity targets
  for (const sh of structure.swingHighs.slice(-5)) {
    zones.push({
      price: sh.price,
      type: 'previous-high',
      strength: 2,
      time: sh.time,
    })
  }

  for (const sl of structure.swingLows.slice(-5)) {
    zones.push({
      price: sl.price,
      type: 'previous-low',
      strength: 2,
      time: sl.time,
    })
  }

  // Find equal highs/lows (within 0.1% tolerance)
  const equalHighs = findEqualLevels(structure.swingHighs)
  for (const eh of equalHighs) {
    zones.push({
      price: eh.price,
      type: 'equal-highs',
      strength: 3,
      time: eh.time,
    })
  }

  const equalLows = findEqualLevels(structure.swingLows)
  for (const el of equalLows) {
    zones.push({
      price: el.price,
      type: 'equal-lows',
      strength: 3,
      time: el.time,
    })
  }

  // Session highs and lows (use last 20 candles as "session")
  const sessionCandles = candles.slice(-20)
  const sessionHigh = Math.max(...sessionCandles.map(c => c.high))
  const sessionLow = Math.min(...sessionCandles.map(c => c.low))

  zones.push({
    price: sessionHigh,
    type: 'session-high',
    strength: 2,
    time: sessionCandles[sessionCandles.length - 1].time,
  })

  zones.push({
    price: sessionLow,
    type: 'session-low',
    strength: 2,
    time: sessionCandles[sessionCandles.length - 1].time,
  })

  // Categorize targets
  const buySideTargets = zones
    .filter(z => z.price > currentPrice)
    .sort((a, b) => a.price - b.price)
    .map(z => z.price)

  const sellSideTargets = zones
    .filter(z => z.price < currentPrice)
    .sort((a, b) => b.price - a.price)
    .map(z => z.price)

  return { zones, buySideTargets, sellSideTargets }
}

function findEqualLevels(swings: SwingPoint[]): SwingPoint[] {
  const equals: SwingPoint[] = []
  const tolerance = 0.001 // 0.1% tolerance

  for (let i = 0; i < swings.length; i++) {
    for (let j = i + 1; j < swings.length; j++) {
      const diff = Math.abs(swings[i].price - swings[j].price) / swings[i].price
      if (diff < tolerance) {
        equals.push(swings[j])
        break
      }
    }
  }

  return equals
}

// ── Area of Interest (AOI) ────────────────────────────────────────────────────

function computeAOI(candles: CandleData[], structure: MarketStructure): AreaOfInterest {
  const supplyZones = findSupplyZones(candles, structure)
  const demandZones = findDemandZones(candles, structure)
  const leftovers = findLeftoverContainers(candles)

  return { supplyZones, demandZones, leftovers }
}

function findSupplyZones(candles: CandleData[], structure: MarketStructure): AOIZone[] {
  const zones: AOIZone[] = []
  const currentPrice = candles[candles.length - 1].close

  // Supply zones form at swing highs where price dropped sharply after
  for (const sh of structure.swingHighs.slice(-4)) {
    const idx = sh.index
    if (idx + 2 >= candles.length) continue

    const dropCandle = candles[idx + 1]
    const dropPercent = (candles[idx].high - dropCandle.close) / candles[idx].high

    if (dropPercent > 0.001) {
      const zoneHigh = candles[idx].high
      const zoneLow = Math.max(candles[idx].open, candles[idx].close)
      const isFresh = currentPrice < zoneLow

      zones.push({
        type: 'supply',
        high: zoneHigh,
        low: zoneLow,
        startTime: candles[idx].time,
        endTime: candles[Math.min(idx + 1, candles.length - 1)].time,
        isFresh,
      })
    }
  }

  return zones.slice(-3)
}

function findDemandZones(candles: CandleData[], structure: MarketStructure): AOIZone[] {
  const zones: AOIZone[] = []
  const currentPrice = candles[candles.length - 1].close

  // Demand zones form at swing lows where price rallied sharply after
  for (const sl of structure.swingLows.slice(-4)) {
    const idx = sl.index
    if (idx + 2 >= candles.length) continue

    const rallyCandle = candles[idx + 1]
    const rallyPercent = (rallyCandle.close - candles[idx].low) / candles[idx].low

    if (rallyPercent > 0.001) {
      const zoneLow = candles[idx].low
      const zoneHigh = Math.min(candles[idx].open, candles[idx].close)

      const isFresh = currentPrice > zoneHigh

      zones.push({
        type: 'demand',
        high: zoneHigh,
        low: zoneLow,
        startTime: candles[idx].time,
        endTime: candles[Math.min(idx + 1, candles.length - 1)].time,
        isFresh,
      })
    }
  }

  return zones.slice(-3)
}

function findLeftoverContainers(candles: CandleData[]): AOIZone[] {
  // Leftover container = FVG (Fair Value Gap) in TCU canon
  // A gap between candle[i-1].low/high and candle[i+1].high/low with candle[i] body not filling it
  const leftovers: AOIZone[] = []
  const currentPrice = candles[candles.length - 1].close

  for (let i = 1; i < candles.length - 1; i++) {
    const prev = candles[i - 1]
    const curr = candles[i]
    const next = candles[i + 1]

    // Bullish leftover container: gap between prev.low and next.high
    // Actually: prev candle high < next candle low (bullish FVG)
    if (prev.high < next.low) {
      const isFresh = currentPrice > prev.high // Price hasn't returned to fill it from above
      leftovers.push({
        type: 'leftover-container',
        high: next.low,
        low: prev.high,
        startTime: curr.time,
        endTime: next.time,
        isFresh: isFresh && currentPrice > next.low,
      })
    }

    // Bearish leftover container: prev candle low > next candle high (bearish FVG)
    if (prev.low > next.high) {
      const isFresh = currentPrice < prev.low
      leftovers.push({
        type: 'leftover-container',
        high: prev.low,
        low: next.high,
        startTime: curr.time,
        endTime: next.time,
        isFresh: isFresh && currentPrice < next.high,
      })
    }
  }

  // Return only the most recent fresh ones
  return leftovers.filter(l => l.isFresh).slice(-5)
}

// ── Trade Plan ────────────────────────────────────────────────────────────────

function buildTradePlan(
  candles: CandleData[],
  structure: MarketStructure,
  liquidity: LiquidityMap,
  aoi: AreaOfInterest
): TradePlanSkeleton {
  const bias = structure.trend
  const currentPrice = candles[candles.length - 1].close

  // Determine setup quality based on confluence
  const hasLeftover = aoi.leftovers.length > 0
  const hasZone = bias === 'bullish' ? aoi.demandZones.length > 0 : aoi.supplyZones.length > 0
  const hasTarget = bias === 'bullish' ? liquidity.buySideTargets.length > 0 : liquidity.sellSideTargets.length > 0
  const hasCHOCH = structure.structureBreaks.some(b => b.type === 'CHOCH')

  let setupQuality: SetupQuality = 'no-setup'
  const confluenceCount = [hasLeftover, hasZone, hasTarget, !hasCHOCH].filter(Boolean).length

  if (confluenceCount >= 4) setupQuality = 'A+'
  else if (confluenceCount >= 3) setupQuality = 'A'
  else if (confluenceCount >= 2) setupQuality = 'B'
  else if (confluenceCount >= 1) setupQuality = 'C'

  // Build the pass (entry area)
  let thePass = 'No clear entry zone identified'
  if (bias === 'bullish' && aoi.demandZones.length > 0) {
    const zone = aoi.demandZones[aoi.demandZones.length - 1]
    thePass = `Demand zone between ${zone.low.toFixed(4)} and ${zone.high.toFixed(4)}`
  } else if (bias === 'bearish' && aoi.supplyZones.length > 0) {
    const zone = aoi.supplyZones[aoi.supplyZones.length - 1]
    thePass = `Supply zone between ${zone.low.toFixed(4)} and ${zone.high.toFixed(4)}`
  }

  // Burn point (stop loss)
  let burnPoint = 'Below/above the identified AOI zone'
  if (bias === 'bullish' && aoi.demandZones.length > 0) {
    const zone = aoi.demandZones[aoi.demandZones.length - 1]
    burnPoint = `Below demand zone at ${(zone.low * 0.999).toFixed(4)}`
  } else if (bias === 'bearish' && aoi.supplyZones.length > 0) {
    const zone = aoi.supplyZones[aoi.supplyZones.length - 1]
    burnPoint = `Above supply zone at ${(zone.high * 1.001).toFixed(4)}`
  }

  // Tables served (targets)
  const tablesServed: string[] = []
  if (bias === 'bullish' && liquidity.buySideTargets.length > 0) {
    tablesServed.push(`First table: ${liquidity.buySideTargets[0].toFixed(4)}`)
    if (liquidity.buySideTargets.length > 1) {
      tablesServed.push(`Second table: ${liquidity.buySideTargets[1].toFixed(4)}`)
    }
  } else if (bias === 'bearish' && liquidity.sellSideTargets.length > 0) {
    tablesServed.push(`First table: ${liquidity.sellSideTargets[0].toFixed(4)}`)
    if (liquidity.sellSideTargets.length > 1) {
      tablesServed.push(`Second table: ${liquidity.sellSideTargets[1].toFixed(4)}`)
    }
  }
  if (tablesServed.length === 0) {
    tablesServed.push('No clear liquidity targets identified')
  }

  // Invalidation
  let invalidation = 'Setup invalidated if price breaks structure in opposite direction'
  if (hasCHOCH) {
    const lastChoch = structure.structureBreaks.filter(b => b.type === 'CHOCH').pop()
    if (lastChoch) {
      invalidation = `CHOCH detected at ${lastChoch.price.toFixed(4)} - bias may be shifting`
    }
  }

  // Recipe summary
  const recipeSummary = bias === 'ranging'
    ? 'Market is ranging - no clear recipe. Wait for structure break.'
    : `${bias === 'bullish' ? 'Bullish' : 'Bearish'} bias with ${setupQuality} setup quality. ` +
      `Look for ${bias === 'bullish' ? 'demand' : 'supply'} zone reaction with leftover container confluence.`

  return {
    bias,
    thePass,
    burnPoint,
    tablesServed,
    invalidation,
    setupQuality,
    recipeSummary,
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getEmptyAnalysis(): TCUAnalysis {
  return {
    structure: {
      swingHighs: [],
      swingLows: [],
      structureBreaks: [],
      trend: 'ranging',
    },
    liquidity: {
      zones: [],
      buySideTargets: [],
      sellSideTargets: [],
    },
    aoi: {
      supplyZones: [],
      demandZones: [],
      leftovers: [],
    },
    tradePlan: {
      bias: 'ranging',
      thePass: 'Insufficient data for analysis',
      burnPoint: 'N/A',
      tablesServed: ['N/A'],
      invalidation: 'N/A',
      setupQuality: 'no-setup',
      recipeSummary: 'Need at least 10 candles for TCU analysis.',
    },
  }
}
