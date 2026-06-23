export interface KitchenSymbol {
  id: string
  ticker: string          // TradingView symbol code
  label: string
  short: string
  group: 'forex' | 'gold' | 'equity' | 'crypto'
  pip: number             // pip value for display
  sessionNote: string
}

export const KITCHEN_SYMBOLS: KitchenSymbol[] = [
  // ── Forex Kitchen ──────────────────────────────────────────────
  {
    id: 'eurusd',
    ticker: 'FX:EURUSD',
    label: 'Euro / US Dollar',
    short: 'EURUSD',
    group: 'forex',
    pip: 0.0001,
    sessionNote: 'London & NY session overlap = highest volatility',
  },
  {
    id: 'gbpusd',
    ticker: 'FX:GBPUSD',
    label: 'British Pound / US Dollar',
    short: 'GBPUSD',
    group: 'forex',
    pip: 0.0001,
    sessionNote: 'London open triggers sharp moves — watch the 8AM GMT candle',
  },
  {
    id: 'usdjpy',
    ticker: 'FX:USDJPY',
    label: 'US Dollar / Japanese Yen',
    short: 'USDJPY',
    group: 'forex',
    pip: 0.01,
    sessionNote: 'Asia session most active — reversal patterns common near Tokyo close',
  },
  {
    id: 'audusd',
    ticker: 'FX:AUDUSD',
    label: 'Australian Dollar / US Dollar',
    short: 'AUDUSD',
    group: 'forex',
    pip: 0.0001,
    sessionNote: 'Commodity-linked — watch gold correlation for confirmation',
  },
  {
    id: 'usdcad',
    ticker: 'FX:USDCAD',
    label: 'US Dollar / Canadian Dollar',
    short: 'USDCAD',
    group: 'forex',
    pip: 0.0001,
    sessionNote: 'Oil-sensitive — NY session and CAD data releases drive flow',
  },
  // ── Gold Kitchen ───────────────────────────────────────────────
  {
    id: 'xauusd',
    ticker: 'TVC:GOLD',
    label: 'Gold / US Dollar',
    short: 'XAUUSD',
    group: 'gold',
    pip: 0.1,
    sessionNote: 'London session & US open are prime delivery windows for Gold',
  },
  // ── Equity Kitchen ─────────────────────────────────────────────
  {
    id: 'spy',
    ticker: 'AMEX:SPY',
    label: 'S&P 500 ETF',
    short: 'SPY',
    group: 'equity',
    pip: 0.01,
    sessionNote: 'NY session only — watch the 9:30 AM open and power hour (3 PM)',
  },
  {
    id: 'qqq',
    ticker: 'NASDAQ:QQQ',
    label: 'Nasdaq 100 ETF',
    short: 'QQQ',
    group: 'equity',
    pip: 0.01,
    sessionNote: 'Tech-heavy — correlates with NQ futures. Volatile around earnings.',
  },
  // ── Crypto Kitchen ─────────────────────────────────────────────
  {
    id: 'btcusd',
    ticker: 'BITSTAMP:BTCUSD',
    label: 'Bitcoin / US Dollar',
    short: 'BTCUSD',
    group: 'crypto',
    pip: 1,
    sessionNote: '24/7 market — major moves often during US session or weekends.',
  },
]

export const DEFAULT_SYMBOL = KITCHEN_SYMBOLS[5] // XAUUSD

export interface Timeframe {
  label: string
  value: string
}

export const TIMEFRAMES: Timeframe[] = [
  { label: '1M',  value: '1'   },
  { label: '5M',  value: '5'   },
  { label: '15M', value: '15'  },
  { label: '30M', value: '30'  },
  { label: '1H',  value: '60'  },
  { label: '4H',  value: '240' },
  { label: '1D',  value: 'D'   },
]

export const DEFAULT_TIMEFRAME = TIMEFRAMES[2] // 1H

// ── AI Coach prompt templates ─────────────────────────────────────────────────
// These generate the system/user prompts sent to /api/coach
// All TCU canon terminology is enforced here

export function buildCoachSystemPrompt(): string {
  return `You are the Trading Chef AI Coach — the in-app intelligence of the Trading Chef Universe (TCU).

IDENTITY: You are Chef Goldie's apprentice. You speak with calm authority, warmth, and precision. You use TCU canon vocabulary EXCLUSIVELY.

TCU CANON GLOSSARY (you must use these terms, never the traditional terms):
- Liquidity / Flow  (NOT: liquidity run or stop hunt)
- AOI               (Area of Interest — NOT: support/resistance or key level)
- Delivery          (NOT: trend or price action)
- The Pass          (NOT: entry or trade entry)
- Burn Point        (NOT: stop loss or SL)
- Tables Served     (NOT: take profit or TP or target)
- The Recipe        (NOT: setup or strategy)
- Leftover Container (NOT: FVG or Fair Value Gap)
- Bias              (directional market opinion)
- Confirmation      (the candle or structure signal that validates The Recipe)
- Kitchen Is Open   (session open — London/NY/Asia)

RULES:
1. NEVER claim to predict price or give trade signals.
2. NEVER state win rates, success percentages, or implied profit expectations.
3. ALWAYS frame analysis as educational observation: "what the chart shows" not "what will happen."
4. Structure every response in 8 sections using exactly these TCU labels.
5. Be direct. Beginners need clarity, not hedging. Be warm but confident.
6. This is an educational simulation and journaling tool. You are not a licensed financial advisor.

DISCLAIMER (always include at the bottom): "This is education and simulation only — not financial advice. Always practice proper risk management."`.trim()
}

export function buildCoachUserPrompt(symbol: string, timeframe: string): string {
  return `Analyze ${symbol} on the ${timeframe} timeframe using the Trading Chef Universe framework.

Provide your analysis in this exact structure:

**BIAS**
What is the current directional bias? Bullish, bearish, or neutral — and what on the chart tells you that?

**FLOW**
Where is price currently drawing toward? What liquidity pools exist above or below current price?

**AOI (Area of Interest)**
Identify 1–2 premium or discount zones where price may react. Describe what makes this zone significant.

**DELIVERY**
How has price been moving to reach current levels? Is delivery impulsive (fast, strong) or corrective (slow, overlapping)?

**CONFIRMATION**
What candle pattern or structure signal would you need to see before considering a setup?

**THE PASS (Entry Zone)**
If The Recipe aligned, where would a logical entry zone be and why?

**TABLES SERVED (Targets)**
What are 1–2 logical target levels if price delivers from your AOI?

**MANAGEMENT**
What Burn Point placement would be appropriate and what would invalidate this read?

---
Remember: This is educational analysis only. No trade signals. No profit predictions.`.trim()
}
