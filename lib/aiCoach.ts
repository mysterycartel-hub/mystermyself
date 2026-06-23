// ============================================================
// AI Coach Module — TCU Market Kitchen Terminal
// Adapter pattern supporting multiple AI providers with mock fallback
// ============================================================

import { CandleData, SupportedSymbol, SupportedTimeframe } from './marketData'

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIProvider = 'openai' | 'anthropic' | 'mock'

export interface TCUCoachAnalysis {
  bias: string
  liquidityMap: string
  aoi: string
  setupQuality: string
  entryIdea: string            // "the pass" in TCU canon
  burnPoint: string            // stop loss in TCU canon
  tablesServed: string         // targets in TCU canon
  invalidation: string
  riskNote: string
  characterLesson: string
  journalSummary: string
}

// The 9 locked TCU characters
const TCU_CHARACTERS = [
  'Trading Chef',
  'Candle Kid',
  'Wickie',
  'Louie Liquidity',
  'Chef Goldie',
  'Grandma Market',
  'Nana Value',
  'Melissa Mayhem',
  'Melody Mayhem',
] as const

// ── Main Export ───────────────────────────────────────────────────────────────

/**
 * Analyzes chart data and returns a structured TCU coach analysis.
 * Uses adapter pattern - provider selected via NEXT_PUBLIC_AI_PROVIDER env var.
 * Returns mock/demo data when no API key is configured.
 */
export async function analyzeChart(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  candles: CandleData[]
): Promise<TCUCoachAnalysis> {
  const provider = getProvider()
  const apiKey = getApiKey(provider)

  // If no valid provider or API key, return mock analysis
  if (provider === 'mock' || !apiKey) {
    return getMockAnalysis(symbol, timeframe)
  }

  try {
    switch (provider) {
      case 'openai':
        return await analyzeWithOpenAI(symbol, timeframe, candles, apiKey)
      case 'anthropic':
        return await analyzeWithAnthropic(symbol, timeframe, candles, apiKey)
      default:
        return getMockAnalysis(symbol, timeframe)
    }
  } catch (error) {
    console.error('[aiCoach] Analysis error, returning mock data')
    return getMockAnalysis(symbol, timeframe)
  }
}

// ── Provider Detection ────────────────────────────────────────────────────────

function getProvider(): AIProvider {
  const envProvider = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_AI_PROVIDER
    : process.env.NEXT_PUBLIC_AI_PROVIDER

  if (!envProvider) return 'mock'

  const normalized = envProvider.toLowerCase().trim()
  if (normalized === 'openai') return 'openai'
  if (normalized === 'anthropic') return 'anthropic'
  return 'mock'
}

function getApiKey(provider: AIProvider): string | null {
  if (provider === 'mock') return null

  if (provider === 'openai') {
    return process.env.OPENAI_API_KEY ?? null
  }

  if (provider === 'anthropic') {
    return process.env.ANTHROPIC_API_KEY ?? null
  }

  return null
}

// ── Mock Response ─────────────────────────────────────────────────────────────

function getMockAnalysis(symbol: SupportedSymbol, timeframe: SupportedTimeframe): TCUCoachAnalysis {
  // Select a character deterministically based on symbol
  const charIndex = symbol.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % TCU_CHARACTERS.length
  const character = TCU_CHARACTERS[charIndex]

  return {
    bias: `Demo AI analysis. Connect API key for live coaching. Current demo bias for ${symbol} on ${timeframe}: Bullish delivery observed. Price is making higher highs and higher lows on this timeframe.`,
    liquidityMap: `Buy-side liquidity resting above recent equal highs. Sell-side liquidity below the session low. The kitchen has clear pools both above and below current price.`,
    aoi: `Premium supply zone identified above current price. A fresh leftover container (FVG) sits in the discount zone below, acting as a magnet for delivery.`,
    setupQuality: 'B+ setup - waiting for confirmation in the leftover container zone. Need a full course meal (big candle) to confirm the recipe.',
    entryIdea: `The pass sits at the fresh demand zone / leftover container confluence. Wait for the kitchen to open (session open) and watch for a Michelin Star move (institutional move) into the zone.`,
    burnPoint: `Burn point placed below the demand zone low. If this level breaks, the recipe is invalidated and we step out of the kitchen.`,
    tablesServed: `First table served at the equal highs above. Second table at the previous session high. Both represent clear buy-side liquidity pools.`,
    invalidation: `Recipe invalidated if price closes below the swing low on this timeframe, signaling a change of character (CHOCH) to bearish delivery.`,
    riskNote: `This is education and simulation only - not financial advice. Always practice proper risk management. Never risk more than you can afford to lose.`,
    characterLesson: generateCharacterLesson(character, symbol),
    journalSummary: `${symbol} ${timeframe} - Bullish bias. Watching leftover container zone for the pass. Burn point below demand. Tables served at equal highs. ${character} says: "Stay patient, let the recipe develop."`,
  }
}

function generateCharacterLesson(character: string, symbol: string): string {
  const lessons: Record<string, string> = {
    'Trading Chef': `Trading Chef says: "Every recipe needs the right ingredients. For ${symbol}, we need structure, a leftover container, and patience. The kitchen does not rush a great dish."`,
    'Candle Kid': `Candle Kid says: "Look at the candles telling their story! Each one is a clue. The big ones (full course meals) show where the real moves happen. Watch for them at your AOI!"`,
    'Wickie': `Wickie says: "The wicks tell the truth the bodies try to hide. On ${symbol}, watch those long wicks at key levels - they are sweeping liquidity before the real move starts."`,
    'Louie Liquidity': `Louie Liquidity says: "Follow the money, chef! Liquidity pools are where the smart money hunts. Those equal highs? That is a buffet waiting to be served."`,
    'Chef Goldie': `Chef Goldie says: "Gold does not lie, and neither does structure. Trust the recipe: identify the AOI, wait for the pass, set your burn point, and let the tables get served."`,
    'Grandma Market': `Grandma Market says: "I have seen markets come and go, child. The ones who survive are patient. Wait for YOUR setup. The kitchen will always be open tomorrow."`,
    'Nana Value': `Nana Value says: "Value is found in the discount zone, never at premium. On ${symbol}, look for price to retrace into demand before you take the pass."`,
    'Melissa Mayhem': `Melissa Mayhem says: "Sometimes the market goes wild! When ${symbol} moves fast, do not chase. Let the mayhem settle, then look for the leftover containers it leaves behind."`,
    'Melody Mayhem': `Melody Mayhem says: "The rhythm of the market has a beat. ${symbol} is playing its tune - listen for the crescendo at the liquidity zones, then ride the melody to your tables."`,
  }

  return lessons[character] ?? lessons['Trading Chef']
}

// ── OpenAI Provider ───────────────────────────────────────────────────────────

async function analyzeWithOpenAI(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  candles: CandleData[],
  apiKey: string
): Promise<TCUCoachAnalysis> {
  const prompt = buildAnalysisPrompt(symbol, timeframe, candles)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: getSystemPrompt() },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Empty response from OpenAI')
  }

  return parseAIResponse(content, symbol, timeframe)
}

// ── Anthropic Provider ────────────────────────────────────────────────────────

async function analyzeWithAnthropic(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  candles: CandleData[],
  apiKey: string
): Promise<TCUCoachAnalysis> {
  const prompt = buildAnalysisPrompt(symbol, timeframe, candles)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: getSystemPrompt(),
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  const content = data.content?.[0]?.text

  if (!content) {
    throw new Error('Empty response from Anthropic')
  }

  return parseAIResponse(content, symbol, timeframe)
}

// ── Shared Prompt Building ────────────────────────────────────────────────────

function getSystemPrompt(): string {
  return `You are the Trading Chef AI Coach from the Trading Chef Universe (TCU).
You analyze charts using TCU canon vocabulary ONLY:
- FVG = leftover container
- Entry = the pass
- SL = burn point
- Targets = tables served
- Big candle = full course meal
- Institutional move = Michelin Star move
- Setup = the recipe
- Session open = kitchen is open

You must respond in JSON format with these exact fields:
bias, liquidityMap, aoi, setupQuality, entryIdea, burnPoint, tablesServed, invalidation, riskNote, characterLesson, journalSummary

Characters you may reference (pick ONE for the lesson): Trading Chef, Candle Kid, Wickie, Louie Liquidity, Chef Goldie, Grandma Market, Nana Value, Melissa Mayhem, Melody Mayhem.

IMPORTANT: This is educational analysis only. Never predict price. Never give trade signals. Always include risk disclaimer.`
}

function buildAnalysisPrompt(
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe,
  candles: CandleData[]
): string {
  // Send last 20 candles as context (enough for analysis, not too verbose)
  const recentCandles = candles.slice(-20)
  const candleSummary = recentCandles.map(c =>
    `T:${c.time} O:${c.open} H:${c.high} L:${c.low} C:${c.close}`
  ).join('\n')

  const lastCandle = candles[candles.length - 1]

  return `Analyze ${symbol} on the ${timeframe} timeframe using TCU methodology.

Current price: ${lastCandle.close}
Recent candle data (last 20):
${candleSummary}

Provide your TCU analysis as a JSON object with all required fields. Use kitchen/chef metaphors and TCU canon vocabulary throughout.`
}

function parseAIResponse(
  content: string,
  symbol: SupportedSymbol,
  timeframe: SupportedTimeframe
): TCUCoachAnalysis {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        bias: parsed.bias ?? '',
        liquidityMap: parsed.liquidityMap ?? '',
        aoi: parsed.aoi ?? '',
        setupQuality: parsed.setupQuality ?? '',
        entryIdea: parsed.entryIdea ?? '',
        burnPoint: parsed.burnPoint ?? '',
        tablesServed: parsed.tablesServed ?? '',
        invalidation: parsed.invalidation ?? '',
        riskNote: parsed.riskNote ?? 'This is education and simulation only - not financial advice.',
        characterLesson: parsed.characterLesson ?? '',
        journalSummary: parsed.journalSummary ?? '',
      }
    }
  } catch {
    // JSON parsing failed - fall back to mock
  }

  // If parsing fails, return mock with a note
  console.warn('[aiCoach] Could not parse AI response, returning mock data')
  return getMockAnalysis(symbol, timeframe)
}
