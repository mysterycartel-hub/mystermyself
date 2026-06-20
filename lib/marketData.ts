// ============================================================
// Market Data Adapter — TCU Market Kitchen Terminal
// Fetches OHLC candle data from configured provider or demo fallback
// ============================================================

export interface CandleData {
  time: number       // Unix timestamp in seconds
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

export type SupportedSymbol =
  | 'XAUUSD'
  | 'EURUSD'
  | 'GBPUSD'
  | 'USDJPY'
  | 'SPY'
  | 'QQQ'
  | 'BTCUSD'

export type SupportedTimeframe = '1m' | '5m' | '15m' | '30m' | '1H' | '4H' | '1D'

// Realistic base prices for demo candle generation
const BASE_PRICES: Record<SupportedSymbol, number> = {
  XAUUSD: 2350.00,
  EURUSD: 1.0850,
  GBPUSD: 1.2720,
  USDJPY: 154.50,
  SPY: 530.00,
  QQQ: 460.00,
  BTCUSD: 67500.00,
}

// Typical volatility (as percentage of price) per candle for demo data
const VOLATILITY: Record<SupportedSymbol, number> = {
  XAUUSD: 0.003,
  EURUSD: 0.001,
  GBPUSD: 0.0012,
  USDJPY: 0.001,
  SPY: 0.004,
  QQQ: 0.005,
  BTCUSD: 0.012,
}

// Timeframe durations in seconds
const TIMEFRAME_SECONDS: Record<SupportedTimeframe, number> = {
  '1m': 60,
  '5m': 300,
  '15m': 900,
  '30m': 1800,
  '1H': 3600,
  '4H': 14400,
  '1D': 86400,
}

/**
 * Seeded pseudo-random number generator for consistent demo candles.
 * Uses a simple mulberry32 algorithm.
 */
function seededRandom(seed: number): () => number {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Generates ~100 realistic OHLC demo candles for any supported symbol.
 * Uses seeded randomness so output is deterministic per symbol+timeframe.
 */
export function generateDemoCandles(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe
): CandleData[] {
  const basePrice = BASE_PRICES[symbol] ?? 100
  const volatility = VOLATILITY[symbol] ?? 0.005
  const intervalSeconds = TIMEFRAME_SECONDS[timeframe] ?? 3600
  const candleCount = 100

  // Seed based on symbol + timeframe string for deterministic output
  const seedStr = `${symbol}-${timeframe}`
  let seedNum = 0
  for (let i = 0; i < seedStr.length; i++) {
    seedNum = ((seedNum << 5) - seedNum + seedStr.charCodeAt(i)) | 0
  }
  const rand = seededRandom(Math.abs(seedNum))

  const candles: CandleData[] = []
  const now = Math.floor(Date.now() / 1000)
  const startTime = now - candleCount * intervalSeconds

  let currentPrice = basePrice

  for (let i = 0; i < candleCount; i++) {
    const time = startTime + i * intervalSeconds

    // Random walk with slight mean reversion
    const drift = (basePrice - currentPrice) * 0.01
    const change = (rand() - 0.5) * 2 * volatility * currentPrice + drift

    const open = currentPrice
    const close = open + change

    // High and low extend beyond open/close
    const range = Math.abs(change) + rand() * volatility * currentPrice * 0.5
    const high = Math.max(open, close) + rand() * range * 0.5
    const low = Math.min(open, close) - rand() * range * 0.5

    // Volume simulation (random, higher on bigger candles)
    const volume = Math.floor(1000 + rand() * 5000 * (1 + Math.abs(change) / currentPrice * 100))

    candles.push({
      time,
      open: parseFloat(open.toFixed(symbol === 'USDJPY' ? 3 : symbol === 'BTCUSD' || symbol === 'SPY' || symbol === 'QQQ' || symbol === 'XAUUSD' ? 2 : 5)),
      high: parseFloat(high.toFixed(symbol === 'USDJPY' ? 3 : symbol === 'BTCUSD' || symbol === 'SPY' || symbol === 'QQQ' || symbol === 'XAUUSD' ? 2 : 5)),
      low: parseFloat(low.toFixed(symbol === 'USDJPY' ? 3 : symbol === 'BTCUSD' || symbol === 'SPY' || symbol === 'QQQ' || symbol === 'XAUUSD' ? 2 : 5)),
      close: parseFloat(close.toFixed(symbol === 'USDJPY' ? 3 : symbol === 'BTCUSD' || symbol === 'SPY' || symbol === 'QQQ' || symbol === 'XAUUSD' ? 2 : 5)),
      volume,
    })

    currentPrice = close
  }

  return candles
}

/**
 * Fetches candle data from the configured market data provider.
 * Falls back to demo candles when no provider or API key is configured.
 */
export async function fetchCandles(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe
): Promise<CandleData[]> {
  const provider = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_MARKET_DATA_PROVIDER ?? '')
    : (process.env.NEXT_PUBLIC_MARKET_DATA_PROVIDER ?? '')

  const apiKey = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY ?? '')
    : (process.env.MARKET_DATA_API_KEY ?? process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY ?? '')

  // If no provider or no API key, return demo candles
  if (!provider || !apiKey) {
    return generateDemoCandles(symbol, timeframe)
  }

  try {
    switch (provider.toLowerCase()) {
      case 'twelve_data':
        return await fetchFromTwelveData(symbol, timeframe, apiKey)
      case 'polygon':
        return await fetchFromPolygon(symbol, timeframe, apiKey)
      default:
        // Unknown provider - fallback to demo
        console.warn(`[marketData] Unknown provider "${provider}", using demo candles.`)
        return generateDemoCandles(symbol, timeframe)
    }
  } catch (error) {
    console.error('[marketData] Fetch error, falling back to demo candles:', error)
    return generateDemoCandles(symbol, timeframe)
  }
}

// ── Provider Implementations (stubs for future integration) ─────────────────

async function fetchFromTwelveData(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  apiKey: string
): Promise<CandleData[]> {
  const intervalMap: Record<SupportedTimeframe, string> = {
    '1m': '1min',
    '5m': '5min',
    '15m': '15min',
    '30m': '30min',
    '1H': '1h',
    '4H': '4h',
    '1D': '1day',
  }

  const interval = intervalMap[timeframe]
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=100&apikey=${apiKey}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Twelve Data API error: ${res.status}`)

  const data = await res.json()
  if (!data.values || !Array.isArray(data.values)) {
    throw new Error('Invalid Twelve Data response format')
  }

  return data.values
    .map((v: { datetime: string; open: string; high: string; low: string; close: string; volume?: string }) => ({
      time: Math.floor(new Date(v.datetime).getTime() / 1000),
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
      volume: v.volume ? parseInt(v.volume, 10) : undefined,
    }))
    .reverse()
}

async function fetchFromPolygon(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  apiKey: string
): Promise<CandleData[]> {
  const multiplierMap: Record<SupportedTimeframe, { multiplier: number; span: string }> = {
    '1m': { multiplier: 1, span: 'minute' },
    '5m': { multiplier: 5, span: 'minute' },
    '15m': { multiplier: 15, span: 'minute' },
    '30m': { multiplier: 30, span: 'minute' },
    '1H': { multiplier: 1, span: 'hour' },
    '4H': { multiplier: 4, span: 'hour' },
    '1D': { multiplier: 1, span: 'day' },
  }

  const { multiplier, span } = multiplierMap[timeframe]
  const to = new Date().toISOString().split('T')[0]
  const from = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${span}/${from}/${to}?adjusted=true&sort=asc&limit=100&apiKey=${apiKey}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Polygon API error: ${res.status}`)

  const data = await res.json()
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error('Invalid Polygon response format')
  }

  return data.results.map((r: { t: number; o: number; h: number; l: number; c: number; v: number }) => ({
    time: Math.floor(r.t / 1000),
    open: r.o,
    high: r.h,
    low: r.l,
    close: r.c,
    volume: r.v,
  }))
}
