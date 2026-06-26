/**
 * TCU Character Canon — Single Source of Truth
 *
 * LOCKED (10 characters). Do not add characters beyond these 10.
 * Do not rename. Do not modify canon data without CEO approval.
 * This file is the authoritative reference for all TCU character
 * rendering across the MysterMyself ecosystem.
 *
 * BANNED characters (never use as active characters): Penny, Burn Alarm, Profit Plate
 * TCMOS EXPANSION (allowed but marked as "coming soon"): Mr. Stocks, Dave Dollar, Crypto Carl
 *
 * TCU MASTER LAW: No Sweep. No Shift. No Trade.
 */

export interface TCUCharacter {
  id: string
  name: string
  role: string
  marketLesson: string
  chefMetaphor: string
  visualDescription: string
  color: string
  emoji: string
  shortQuote: string
  longQuote: string
  imagePath: string
  avatarImagePath: string
  usedOn: string[]
}

export const TCU_CHARACTERS: TCUCharacter[] = [
  {
    id: 'trading-chef',
    name: 'Trading Chef',
    role: 'Lead Mentor · Market Kitchen Guide',
    marketLesson: 'The 8-step TCU Road Map is the recipe. No setup, no serve.',
    chefMetaphor: 'The head chef runs the kitchen. Every trade is a meal.',
    visualDescription: 'Confident Black male chef-trader. Chef hat, white apron, gold chain, glasses. Urban cartoon style. Black/gold color base.',
    color: '#c9a84c',
    emoji: '👨‍🍳',
    shortQuote: '"The kitchen is open."',
    longQuote: '"Before you serve, you prep. Bias first. Liquidity second. Never rush the cook."',
    imagePath: '/characters/trading-chef.png',
    avatarImagePath: '/characters/trading-chef.png',
    usedOn: ['/', '/market-marina', '/coast/market-marina', '/opportunity-list', '/welcome', '/dashboard'],
  },
  {
    id: 'candle-kid',
    name: 'Candle Kid',
    role: 'Pattern Reader · Candle Analyst',
    marketLesson: 'Every candle tells a story. Body, wick, close — all clues.',
    chefMetaphor: "Candles are the ingredients. Learn to read them or you can't cook.",
    visualDescription: 'Energetic kid character with a candle-shaped head, curious wide eyes, backpack. Educational cartoon style.',
    color: '#A855F7',
    emoji: '🕯️',
    shortQuote: '"Every candle tells a story."',
    longQuote: '"Bullish engulfing? That\'s a full course meal. Doji? Chef\'s still deciding."',
    imagePath: '/characters/candle-kid.png',
    avatarImagePath: '/characters/candle-kid.png',
    usedOn: ['/', '/market-marina', '/coast/market-marina'],
  },
  {
    id: 'wickie',
    name: 'Wickie',
    role: 'Wick Hunter · Rejection Specialist',
    marketLesson: 'Long wicks mean rejection. Price tried, failed, got sent back.',
    chefMetaphor: "Sent back to the kitchen. The wick is proof the order didn't go through.",
    visualDescription: 'Sharp, precise character with a wick-like spike on their head. Alert eyes, quick stance. Cartoon style.',
    color: '#EF4444',
    emoji: '🎯',
    shortQuote: '"Wicks don\'t lie. They just move fast."',
    longQuote: '"See that upper wick? Price tried to go there. Got rejected. That\'s your tell."',
    imagePath: '/characters/wickie.png',
    avatarImagePath: '/characters/wickie.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'louie-liquidity',
    name: 'Louie Liquidity',
    role: 'Flow King · Sweep Master',
    marketLesson: 'Price moves to where liquidity pools. Follow the sweep.',
    chefMetaphor: 'Clearing the plates before the next course. The sweep happens first.',
    visualDescription: 'Flowing, wave-like character. Blue tones, smooth movement energy. Like water in motion. Cartoon style.',
    color: '#3B82F6',
    emoji: '🌊',
    shortQuote: '"Follow the liquidity. That\'s where price is going."',
    longQuote: '"They sweep the stops, clear the plates, then serve the real move. Watch Louie."',
    imagePath: '/characters/louie-liquidity.png',
    avatarImagePath: '/characters/louie-liquidity.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'chef-goldie',
    name: 'Chef Goldie',
    role: 'Gold Specialist · XAUUSD Expert',
    marketLesson: 'Gold has its own recipe. Sessions, cycles, and institutional bias.',
    chefMetaphor: 'XAUUSD is the signature dish. Goldie cooks it daily.',
    visualDescription: 'Gleaming gold-accented chef character. Shiny hat, gold chain, warm confident smile. Premium cartoon style.',
    color: '#c9a84c',
    emoji: '✨',
    shortQuote: '"XAUUSD is the main dish. He cooks it daily."',
    longQuote: '"Gold respects the daily, weekly, monthly. Know the bias before you plate."',
    imagePath: '/characters/chef-goldie.png',
    avatarImagePath: '/characters/chef-goldie.png',
    usedOn: ['/', '/market-marina', '/coast/market-marina'],
  },
  {
    id: 'grandma-market',
    name: 'Grandma Market',
    role: 'Structure Elder · Patience Teacher',
    marketLesson: "Market structure runs in cycles. She's seen them all. Patience wins.",
    chefMetaphor: "The slow cook. Good soup takes time. Don't rush Grandma.",
    visualDescription: 'Warm elderly woman character with glasses, silver hair, kind eyes. Rocking chair energy. Wise cartoon style.',
    color: '#7a6230',
    emoji: '🧓',
    shortQuote: '"She\'s seen every cycle. She doesn\'t panic."',
    longQuote: '"Baby, the market always comes to you. Sit down. Let the setup come."',
    imagePath: '/characters/grandma-market.png',
    avatarImagePath: '/characters/grandma-market.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'nana-value',
    name: 'Nana Value',
    role: 'Gap Finder · Value Zone Specialist',
    marketLesson: 'Fair value gaps are unfilled orders. Price returns to balance.',
    chefMetaphor: 'The leftover container. The FVG is the unfinished meal. Price comes back.',
    visualDescription: 'Detail-oriented character with magnifying glass. Sharp eyes, precise gestures. Librarian energy, cartoon style.',
    color: '#22C55E',
    emoji: '💎',
    shortQuote: '"Fair value gaps are her love language."',
    longQuote: '"That gap is a leftover container. Price will come back to fill it. Mark the zone."',
    imagePath: '/characters/nana-value.png',
    avatarImagePath: '/characters/nana-value.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'melissa-mayhem',
    name: 'Melissa Mayhem',
    role: 'Volatility Expert · Chaos Teacher',
    marketLesson: 'High-impact news creates chaos. She teaches you to read it, not fear it.',
    chefMetaphor: 'The kitchen when news hits — pots boiling over, fire alarm going. Melissa thrives.',
    visualDescription: 'Wild curly hair, big expressive eyes, energetic stance. Mischievous grin. High-energy cartoon style. Fire orange accents.',
    color: '#F97316',
    emoji: '⚡',
    shortQuote: '"News hits. Volatility spikes. She\'s ready."',
    longQuote: '"While everyone\'s panicking, Melissa already knows the move. She studied the menu."',
    imagePath: '/characters/melissa-mayhem.png',
    avatarImagePath: '/characters/melissa-mayhem.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'melody-mayhem',
    name: 'Melody Mayhem',
    role: 'Rhythm Trader · Session Timer',
    marketLesson: 'Markets have sessions. Asian \u2192 London \u2192 NY. Each has a rhythm.',
    chefMetaphor: "The kitchen has shifts. Melody runs the timing. Know which shift you're in.",
    visualDescription: 'Musical note energy, flowing movement, rhythm in pose. Pink accents. Similar look to Melissa but calmer energy. Cartoon style.',
    color: '#EC4899',
    emoji: '🎵',
    shortQuote: '"Price has a rhythm. She hears it."',
    longQuote: '"Asian sets the range. London breaks it. NY confirms. Melody hears all three."',
    imagePath: '/characters/melody-mayhem.png',
    avatarImagePath: '/characters/melody-mayhem.png',
    usedOn: ['/', '/market-marina'],
  },
  {
    id: 'rico-rhythm',
    name: 'Rico Rhythm',
    role: 'Momentum Trader · Flow State Master',
    marketLesson: 'Momentum is the rhythm of price. When it flows, ride it. When it stalls, step back.',
    chefMetaphor: 'The sous chef who keeps the kitchen moving. When orders are flowing, Rico keeps the pace.',
    visualDescription: 'Smooth, confident character with headphones and a beat-driven energy. Musical flow meets market momentum. Urban cartoon style.',
    color: '#8B5CF6',
    emoji: '🎶',
    shortQuote: '"Feel the momentum. Ride the rhythm."',
    longQuote: '"When the market has rhythm, you flow with it. When it breaks tempo, you step off the floor."',
    imagePath: '/characters/rico-rhythm.png',
    avatarImagePath: '/characters/rico-rhythm.png',
    usedOn: ['/', '/market-marina'],
  },
]

export const TRADING_CHEF_ROAD_MAP = [
  { step: 1, label: 'Bias', chefLabel: 'Read the Menu', desc: 'Is the market bullish or bearish? Daily/weekly/monthly bias sets the direction.' },
  { step: 2, label: 'Liquidity', chefLabel: 'Clear the Plates', desc: 'Where are the stop hunts? Price sweeps liquidity before the real move.' },
  { step: 3, label: 'AOI', chefLabel: 'Find the Station', desc: 'Area of Interest \u2014 where price is likely to react. Supply/demand zones.' },
  { step: 4, label: 'Delivery', chefLabel: 'Plate the Dish', desc: 'Price moves from liquidity to your AOI. Watch the delivery mechanism.' },
  { step: 5, label: 'Confirmation', chefLabel: 'Taste Before Serving', desc: "Wait for a lower timeframe entry confirmation. Don't guess the reversal." },
  { step: 6, label: 'Entry', chefLabel: 'The Pass', desc: 'Execute the trade at the confirmed entry. Disciplined, not emotional.' },
  { step: 7, label: 'Targets', chefLabel: 'Tables Served', desc: 'Set your take profit levels. Partial profits at liquidity pools above/below.' },
  { step: 8, label: 'Management', chefLabel: 'Clean the Kitchen', desc: "Manage the trade. Move SL to BE. Scale out. Let it work. Don't touch it." },
]

export const CHEF_LINGO: Record<string, string> = {
  'FVG': 'Leftover container',
  'Entry': 'The pass',
  'Stop Loss': 'Burn point',
  'Targets': 'Tables served',
  'Big candle': 'Full course meal',
  'Liquidity sweep': 'Clearing the plates',
  'Market structure break': 'Flip the menu',
  'Rejection': 'Sent back to the kitchen',
  'Institutional move': 'Michelin Star move',
  'Setup': 'The recipe',
  'Session open': 'Kitchen is open',
  'No trade': 'Kitchen is closed',
  'Overtrading': 'Burning the food',
  'Revenge trade': 'Ordering off-menu',
}

/** TCU MASTER LAW — Never remove from TCU content */
export const TCU_MASTER_LAW = 'No Sweep. No Shift. No Trade.'

/** Helper: get a character by ID */
export function getCharacter(id: string): TCUCharacter | undefined {
  return TCU_CHARACTERS.find((c) => c.id === id)
}

/** Helper: get the 3 educational characters (coach cards) */
export function getCoachTrio(): TCUCharacter[] {
  return TCU_CHARACTERS.filter((c) =>
    ['candle-kid', 'wickie', 'louie-liquidity'].includes(c.id)
  )
}
