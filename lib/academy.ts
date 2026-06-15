// ── Trading Chef Universe Canon Terminology ───────────────────────────────────
// Bias → Liquidity (Flow) → AOI → Delivery → Confirmation → Pass → Tables Served → Management
// Liquidity = Flow | FVG = Leftover Container | Entry = The Pass
// Stop Loss = Burn Point | Targets = Tables Served | Setup = The Recipe
// Session Open = Kitchen Is Open
//
// LOCKED LEARNING ORDER:
// Level 0: Market Child
// Level 1: Candle Kitchen
// Level 2: Structure Kitchen
// Level 3: Flow Kitchen
// Level 4: AOI Kitchen
// Level 5: Delivery Kitchen
// Level 6: Confirmation Kitchen
// Level 7: The Pass
// Level 8: Tables Served
// Level 9: Head Chef

export interface Character {
  id: string
  name: string
  title: string
  emoji: string
  color: string
  role: 'coach' | 'warning' | 'alert'
  catchphrase: string
  teaches: string[]
}

export const CHARACTERS: Record<string, Character> = {
  // ── Master Mentor ──────────────────────────────────────────────────────────
  'trading-chef': {
    id: 'trading-chef',
    name: 'Trading Chef',
    title: 'Master Mentor · Head of the Kitchen',
    emoji: '👑',
    color: '#c9a84c',
    role: 'coach',
    catchphrase: "You do not earn a Michelin star in a week. You earn it by running the full Recipe — every time, under every condition, without shortcuts.",
    teaches: ['market-child', 'kitchen-rush'],
  },
  // ── Coaches ────────────────────────────────────────────────────────────────
  'chef-goldie': {
    id: 'chef-goldie',
    name: 'Chef Goldie',
    title: 'Gold Market Guide',
    emoji: '👨‍🍳',
    color: '#c9a84c',
    role: 'coach',
    catchphrase: "Every great dish starts with the right ingredients. Every great trade starts with structure.",
    teaches: ['bias', 'structure', 'pass'],
  },
  'candle-kid': {
    id: 'candle-kid',
    name: 'Candle Kid',
    title: 'Candle Anatomy Expert',
    emoji: '🕯️',
    color: '#22C55E',
    role: 'coach',
    catchphrase: "It is not where price goes — it is HOW it gets there. Read the candle first.",
    teaches: ['candles', 'delivery'],
  },
  'wickie': {
    id: 'wickie',
    name: 'Wickie',
    title: 'Wick & Manipulation Specialist',
    emoji: '📍',
    color: '#A855F7',
    role: 'coach',
    catchphrase: "A wick is a lie price tried to sell you. I read every single one.",
    teaches: ['wicks', 'confirmation'],
  },
  'louie-liquidity': {
    id: 'louie-liquidity',
    name: 'Louie Liquidity',
    title: 'Flow & Liquidity Expert',
    emoji: '🌊',
    color: '#3B82F6',
    role: 'coach',
    catchphrase: "Follow the flow. Smart money always needs a drink before it moves.",
    teaches: ['flow', 'tables-served'],
  },
  'rico-rhythm': {
    id: 'rico-rhythm',
    name: 'Rico Rhythm',
    title: 'Sessions & Timing Specialist',
    emoji: '⏰',
    color: '#8B5CF6',
    role: 'coach',
    catchphrase: "Every kitchen has a service window. Trade in the right session or stay out of the kitchen entirely.",
    teaches: ['flow', 'delivery'],
  },
  'grandma-market': {
    id: 'grandma-market',
    name: 'Grandma Market',
    title: 'Patience & Discipline Sage',
    emoji: '👵',
    color: '#c0392b',
    role: 'coach',
    catchphrase: "The market always tells you where it wants to go, baby. You just have to be patient enough to listen.",
    teaches: ['risk', 'management'],
  },
  'nana-value': {
    id: 'nana-value',
    name: 'Nana Value',
    title: 'Premium & Discount Teacher',
    emoji: '🏡',
    color: '#F97316',
    role: 'coach',
    catchphrase: "Never overpay for anything — not groceries, not houses, not trades.",
    teaches: ['aoi'],
  },
  'penny-stacks': {
    id: 'penny-stacks',
    name: 'Penny Stacks',
    title: 'Money Management · Position Sizing',
    emoji: '💰',
    color: '#10B981',
    role: 'coach',
    catchphrase: "It is not about how much you make. It is about how much you keep. Size your risk. Protect the account. Stack the pennies.",
    teaches: ['risk', 'management'],
  },
  'mr-stocks': {
    id: 'mr-stocks',
    name: 'Mr. Stocks',
    title: 'Ownership & Long-Term Thinking',
    emoji: '📈',
    color: '#0EA5E9',
    role: 'coach',
    catchphrase: "Every great trader eventually asks: why am I renting in a market I could own? The patient ones build wealth. The impatient ones build lessons.",
    teaches: ['bias', 'structure'],
  },
  // ── Core System Characters — Event-Driven ─────────────────────────────────
  'melissa-mayhem': {
    id: 'melissa-mayhem',
    name: 'Melissa Mayhem',
    title: 'FOMO · Overconfidence · Rule Breaking · Revenge · Emotional Entries',
    emoji: '⚡',
    color: '#EC4899',
    role: 'warning',
    catchphrase: "I am everywhere in this market. The FOMO, the chasing, the skipped steps — that is all me. The only way to beat me is to finish The Recipe before you touch anything.",
    teaches: ['wicks', 'flow', 'confirmation', 'pass'],
  },
  'melody-mayhem': {
    id: 'melody-mayhem',
    name: 'Melody Mayhem',
    title: 'Fear · Hesitation · Confidence Recovery · Discipline · Emotional Control',
    emoji: '🎭',
    color: '#F59E0B',
    role: 'warning',
    catchphrase: "Your emotions are my favorite trading partner. But name them — write them down — and I lose all my power. The journal is your weapon against me.",
    teaches: ['risk', 'management', 'aoi', 'tables-served'],
  },
  // ── Alert System ──────────────────────────────────────────────────────────
  'burn-alarm': {
    id: 'burn-alarm',
    name: 'Burn Alarm',
    title: 'Risk Guardian · Burn Point Enforcer',
    emoji: '🔔',
    color: '#EF4444',
    role: 'alert',
    catchphrase: "STOP. Check your Burn Point before anything else. No Burn Point — no trade.",
    teaches: ['risk'],
  },
}

export interface JournalPrompt {
  question: string
  type: 'observation' | 'invalidation' | 'emotion'
}

export interface PracticeTask {
  instruction: string
  hint: string
  successCriteria: string
}

export interface Lesson {
  id: string
  slug: string
  step: number       // sequential UI order (1–14)
  level: number      // canonical level (0–9)
  levelName: string  // e.g., 'Candle Kitchen'
  title: string
  tcuTerm: string
  subtitle: string
  character: string
  warningCharacter?: string
  color: string
  icon: string
  hook: string
  kitchenStory: string
  marketTranslation: string
  visualGuide: string
  characterCoaching: string
  practice: PracticeTask
  xpReward: number
  journalPrompts: JournalPrompt[]
  psychologyNote?: string
  riskWarning?: string
  nextLesson: string | null
  prevLesson: string | null
}

export const LESSONS: Lesson[] = [

  // ── LEVEL 0: MARKET CHILD ─────────────────────────────────────────────────
  {
    id: 'market-child',
    slug: 'market-child',
    step: 1,
    level: 0,
    levelName: 'Market Child',
    title: 'Welcome to the Kitchen',
    tcuTerm: 'The Kitchen',
    subtitle: 'You Are a Market Child. That Changes Today.',
    character: 'trading-chef',
    color: '#c9a84c',
    icon: '👶',
    hook: "Before a chef can cook, they have to understand why the kitchen exists. Before a trader can trade, they have to understand what trading actually is. You are a Market Child right now — and that is not an insult. It is the beginning. Every Head Chef started exactly here.",
    kitchenStory: "The first day in a professional kitchen, you do not cook. You learn the layout. You learn the equipment. You learn who runs what section. You learn the rules. The kitchen has rules for a reason: without them, people get burned. The Trading Chef University kitchen has the same rules. Your job today is to understand the kitchen before you touch anything.",
    marketTranslation: "The market is not a slot machine. It is not a game. It is a professional environment where money moves based on decisions made by banks, institutions, and retail traders — in that order. You are currently retail. Your job is to learn to read what institutions are doing and move with them, not against them. That is the only edge that lasts. TCU teaches you to develop it.",
    visualGuide: "You do not need a chart today. Open the Coast Map. Read every district name. Understand that each district represents a different income path. Trading is one of them. Your journey starts at Market Marina and progresses to Legacy Point (TCU). The Passport records every level you earn. Look at the 10 Academy levels on this page. Understand the road before you start walking it.",
    characterCoaching: "Trading Chef says: 'I have trained hundreds of students in this kitchen. The ones who become Head Chefs all have one thing in common: they stayed. They did not chase shortcuts. They completed every level before moving to the next. They earned the right to trade. That is what TCU is about. You earn it. You do not buy it. You do not fake it. You earn it — one level at a time.'",
    practice: {
      instruction: "Complete all three before marking this done: (1) Visit your Passport page and check your current XP level. (2) Navigate to Market Marina and read the full district description. (3) Return to the Academy and read every Level name from Level 0 to Level 9. Do not click any lesson yet. Understand the full road before taking the first step.",
      hint: "The 10 levels are: Market Child → Candle Kitchen → Structure Kitchen → Flow Kitchen → AOI Kitchen → Delivery Kitchen → Confirmation Kitchen → The Pass → Tables Served → Head Chef. Each level builds directly on the last. There are no shortcuts.",
      successCriteria: "You understand the 10-level progression, the Kitchen metaphor, and what it means to earn the right to trade before placing one.",
    },
    xpReward: 25,
    journalPrompts: [
      { question: "Why are you here? Write your honest reason for wanting to learn trading — not the social media answer, your real reason.", type: 'observation' },
      { question: "Which of the 10 levels sounds hardest to you right now? Why does that level feel intimidating?", type: 'invalidation' },
      { question: "How does it feel knowing you must complete 10 levels before calling yourself a Head Chef? Honest reaction — motivating or discouraging?", type: 'emotion' },
    ],
    psychologyNote: "Every Market Child thinks they are the exception. That they can learn faster. That they already understand the basics from YouTube. They are almost always wrong — and the market charges tuition. The kitchen does not care about your confidence. It rewards preparation. Start from Level 0. Stay humble. That IS the recipe for Level 9.",
    nextLesson: 'candles',
    prevLesson: null,
  },

  // ── LEVEL 1: CANDLE KITCHEN ───────────────────────────────────────────────
  {
    id: 'candles',
    slug: 'candles',
    step: 2,
    level: 1,
    levelName: 'Candle Kitchen',
    title: 'Candle Anatomy',
    tcuTerm: 'The Candle',
    subtitle: 'The Language of Price',
    character: 'candle-kid',
    color: '#22C55E',
    icon: '🕯️',
    hook: "Before you can read a chart, you have to learn the alphabet. Candles are the letters. Every price story is written in candles — and you cannot understand the story if you cannot read the letters.",
    kitchenStory: "Think of a candle like a cooking timer. The open is when the timer starts. The close is when the timer ends. The high and low are how far the temperature swung in between. A big body means strong heat. A small body means the temperature barely moved.",
    marketTranslation: "Every candle has four data points: Open (where price started), Close (where price ended), High (highest point reached), Low (lowest point reached). The body is the space between open and close. The wicks are the thin lines above and below. A bullish candle closes higher than it opened. A bearish candle closes lower.",
    visualGuide: "On any chart, zoom into a single daily candle. Find the body — the thick part. Notice the wicks above and below. A long body with short wicks = strong conviction. A small body with long wicks = indecision or rejection.",
    characterCoaching: "Candle Kid says: 'One candle tells you one story. Three candles in a row tell you a chapter. I never look at just one — I always read the sequence. Three big bullish bodies in a row? That is momentum. That is delivery with intent.'",
    practice: {
      instruction: "Open the Kitchen and select XAUUSD on the 1H timeframe. Find one bullish candle and one bearish candle. For each, identify: body size (large/medium/small), wick length (long/medium/short).",
      hint: "A bullish candle has its close above its open — usually green or white. A bearish candle has its close below its open — red or black.",
      successCriteria: "You can correctly identify bullish vs. bearish candles and describe their body-to-wick ratio.",
    },
    xpReward: 50,
    journalPrompts: [
      { question: "What did the last 3 candles on XAUUSD 1H tell you about market direction?", type: 'observation' },
      { question: "What would need to happen on the next candle to change that story?", type: 'invalidation' },
      { question: "Did you feel rushed to find a trade while looking at the chart? If yes — that is Melody Mayhem. Breathe.", type: 'emotion' },
    ],
    psychologyNote: "New traders often feel compelled to trade every candle. This is called overtrading. Grandma Market says: most of trading is watching. Less than 10% is actually clicking. The best traders are patient observers first.",
    nextLesson: 'wicks',
    prevLesson: 'market-child',
  },

  {
    id: 'wicks',
    slug: 'wicks',
    step: 3,
    level: 1,
    levelName: 'Candle Kitchen',
    title: 'Wicks',
    tcuTerm: 'Rejection Wicks',
    subtitle: 'The Lies Price Tries to Sell You',
    character: 'wickie',
    warningCharacter: 'melissa-mayhem',
    color: '#A855F7',
    icon: '📌',
    hook: "A wick is not just extra chart noise. It is evidence. Evidence of rejection, of manipulation, of smart money pushing price somewhere — then pulling it back. If you ignore wicks, you are ignoring the most honest part of the chart.",
    kitchenStory: "Imagine you are shopping and the store briefly puts an item on sale for a price that seems wrong — way too cheap or way too expensive. People rush in. Then the store pulls it back. That price spike that got rejected? That is a wick. The market tried that price and the market said: no.",
    marketTranslation: "A long upper wick means price tried to go higher but got rejected back down. Sellers overpowered buyers at that high. A long lower wick means price tried to go lower but got rejected up. Buyers stepped in at that low. Wicks at key levels are where the real money decisions happen.",
    visualGuide: "On any chart, zoom out to see 20+ candles. Look for candles with wicks at least twice the size of the body. These are rejection wicks. Now ask: are they rejecting from a level that has been tested before? Repeated rejection from the same level = strong signal.",
    characterCoaching: "Wickie says: 'I study wicks like a detective. A single long wick at a new high right before a massive drop — that is Melissa Mayhem setting a trap. She creates a fakeout to run your stop. I watch for the wick, then I watch for what happens next. The wick is the clue. The next candle is the verdict.'",
    practice: {
      instruction: "On XAUUSD 4H, find three long wicks that appear at what look like turning points. Note whether each wick is upper (rejection of highs) or lower (rejection of lows). Which direction did price move after each wick?",
      hint: "Long wicks at the top of a move often signal a reversal downward. Long wicks at the bottom often signal reversal upward. Look for wicks that stand out from surrounding candles.",
      successCriteria: "You can identify 3 meaningful wicks and describe what happened after each one.",
    },
    xpReward: 75,
    journalPrompts: [
      { question: "Describe one wick you found. Where was it? What happened after?", type: 'observation' },
      { question: "If the wick was the market testing a level — what would it mean if that level broke on the next attempt?", type: 'invalidation' },
      { question: "Did you feel like the market was 'out to get you' when looking at fakeout wicks? That feeling is normal. Name it and move past it.", type: 'emotion' },
    ],
    psychologyNote: "Revenge trading often starts with a wick. Price hits your stop, reverses, and you feel cheated. Melissa Mayhem wins when you revenge trade. The proper response: note the wick in your journal, wait for the next setup, never add to a losing position.",
    nextLesson: 'structure',
    prevLesson: 'candles',
  },

  // ── LEVEL 2: STRUCTURE KITCHEN ────────────────────────────────────────────
  {
    id: 'structure',
    slug: 'structure',
    step: 4,
    level: 2,
    levelName: 'Structure Kitchen',
    title: 'Market Structure',
    tcuTerm: 'Market Cycle',
    subtitle: "Reading the Market's Blueprint",
    character: 'chef-goldie',
    color: '#c9a84c',
    icon: '🏗️',
    hook: "Market structure is the blueprint of every price move that has ever happened. Every trend, every reversal, every range — all of it is built from the same materials. Once you learn to read structure, every chart tells you exactly what it is doing and where it is likely going.",
    kitchenStory: "A building does not fall up — it follows gravity. A market follows structure. When a building is under construction, you can see the scaffold going up, floor by floor. When structure breaks — when a major beam collapses — the whole direction changes. Break of Structure (BOS) is when the market confirms it is continuing. Change of Character (CHOCH) is when the scaffold comes down and rebuilding starts in the other direction.",
    marketTranslation: "In an uptrend: price makes higher highs (HH) and higher lows (HL). A Break of Structure (BOS) to the upside confirms the trend continues. A Change of Character (CHOCH) — a break below the most recent higher low — signals potential reversal. Ranges form when price stops making progress in either direction. Expansion is when price breaks from a range with momentum.",
    visualGuide: "On XAUUSD Daily, identify the most recent swing high and swing low. Label them. Then identify the one before each. Are the highs getting higher? Are the lows getting higher too? If yes — bullish structure. If the most recent low breaks below the previous low — that is a CHOCH. The structure has changed.",
    characterCoaching: "Chef Goldie says: 'I do not guess which way a market is going. I read what it already told me. Three higher lows in a row with three higher highs — that is the market speaking bullish. A single lower low does not erase that conversation. But two lower lows with a lower high in between? The recipe has changed. I close my bullish position and wait.'",
    practice: {
      instruction: "On XAUUSD Daily, identify: (1) The most recent BOS — the candle that broke above a prior swing high (bullish) or below a prior swing low (bearish). (2) The most recent CHOCH — the first time a key structure level broke in the opposing direction. Write the approximate price and date of each.",
      hint: "BOS: look for a candle that decisively closes beyond a prior swing point in the direction of the trend. CHOCH: the first candle that breaks the most recent opposing swing point.",
      successCriteria: "You can identify and label one BOS and one CHOCH on the Daily chart.",
    },
    xpReward: 100,
    journalPrompts: [
      { question: "Describe the current market structure on XAUUSD Daily in one sentence (e.g., 'Price is in a bullish structure with higher highs and higher lows since [date]').", type: 'observation' },
      { question: "What price level, if broken, would constitute a CHOCH and invalidate the current structure?", type: 'invalidation' },
      { question: "Did you notice an urge to predict where structure would go rather than observe where it already is? Prediction is gambling. Observation is trading.", type: 'emotion' },
    ],
    psychologyNote: "Needing to be right about structure is one of trading's most dangerous traps. Structure does not care about your opinion. When structure changes — your bias changes. Immediately. No arguing with the chart.",
    nextLesson: 'bias',
    prevLesson: 'wicks',
  },

  // ── LEVEL 3: FLOW KITCHEN ─────────────────────────────────────────────────
  {
    id: 'bias',
    slug: 'bias',
    step: 5,
    level: 3,
    levelName: 'Flow Kitchen',
    title: 'Bias',
    tcuTerm: 'Bias',
    subtitle: 'Which Way Is the Kitchen Cooking?',
    character: 'chef-goldie',
    color: '#c9a84c',
    icon: '🧭',
    hook: "Every chef knows what they are cooking before they touch the stove. You need to know your directional bias before you look at a single lower-timeframe candle. Get this wrong and everything else is wasted effort.",
    kitchenStory: "Before a restaurant opens for the day, the chef decides: tonight we serve fish or tonight we serve steak. That decision — made before service begins — is bias. You do not walk in at 6PM and say 'what do I feel like cooking tonight?' You decide in the morning, based on what is fresh and what the customers want. The Daily chart is your morning decision.",
    marketTranslation: "Bias is your directional read on a market based on the higher timeframe (Daily, then 4H). Bullish bias: price is making higher highs and higher lows — you look for buys only. Bearish bias: lower highs and lower lows — sells only. Neutral: price is chopping in a range — you sit out. If bias is unclear, that IS your bias: no trade.",
    visualGuide: "Open XAUUSD on the Daily chart. Look at the last 10-15 candles. Are the swing highs getting higher? Are the swing lows getting higher too? That is a bullish structure. Now ask: has there been any structural break (a swing low broken) that would shift this? That break changes your bias.",
    characterCoaching: "Chef Goldie says: 'I set my bias every Sunday night. I look at the Daily. I look at the Weekly. I ask one question: is this market making progress upward or downward, or is it spinning in place? If I cannot answer that question clearly in 30 seconds, my bias is neutral. Neutral means I watch. Not trade.'",
    practice: {
      instruction: "Open the Kitchen, select XAUUSD on Daily. Look at the last 15 candles. Write down: (1) Are the swing highs trending higher, lower, or sideways? (2) Are the swing lows trending higher, lower, or sideways? (3) Based on those two answers alone — what is your bias?",
      hint: "Swing highs = local peaks where price turned down. Swing lows = local troughs where price turned up. Both trending up = bullish. Both trending down = bearish. Mixed or flat = neutral.",
      successCriteria: "You can state a clear Bullish, Bearish, or Neutral bias with at least two structural reasons.",
    },
    xpReward: 75,
    journalPrompts: [
      { question: "What is your bias on XAUUSD today, and what two structures support it?", type: 'observation' },
      { question: "What would need to happen to completely flip your bias to the opposite direction?", type: 'invalidation' },
      { question: "Did you feel tempted to trade against your bias because of a strong-looking candle? That temptation — name it, then ignore it.", type: 'emotion' },
    ],
    psychologyNote: "Entering without bias is the most common beginner mistake. Melody Mayhem thrives when you have no plan. If you cannot state your bias before the chart is fully loaded — do not trade today. No setup, no trade. This is the rule.",
    riskWarning: "BURN ALARM: If you find yourself saying 'I think both directions could work' — you do not have a bias. Neutral is a valid bias. Act accordingly. Watch. Wait.",
    nextLesson: 'flow',
    prevLesson: 'structure',
  },

  {
    id: 'flow',
    slug: 'flow',
    step: 6,
    level: 3,
    levelName: 'Flow Kitchen',
    title: 'Liquidity (Flow)',
    tcuTerm: 'Liquidity = Flow',
    subtitle: 'Where Is the Water Flowing?',
    character: 'louie-liquidity',
    warningCharacter: 'melissa-mayhem',
    color: '#3B82F6',
    icon: '🌊',
    hook: "Markets do not move randomly. They move with purpose — toward liquidity. Old highs, old lows, equal levels. Once you see liquidity pools, you cannot unsee them. And once you track the flow, you move with the smart money instead of against it.",
    kitchenStory: "Water always flows downhill to the lowest point. In a city, water is collected in reservoirs. In markets, liquidity is collected at price levels where lots of people placed stop losses or pending orders. The market — like water — flows toward those collection points. Louie's job is to spot the reservoir before the water reaches it.",
    marketTranslation: "Liquidity pools form wherever retail traders predictably place their stop losses: above the previous day's high (PDH), below the previous day's low (PDL), above equal highs, below equal lows. Smart money sweeps these levels to fill their own large orders, then reverses. The sweep is the flow. After the sweep comes the real move.",
    visualGuide: "On XAUUSD 4H, mark the Previous Day High and Previous Day Low. Mark any equal highs (two peaks at the same level) or equal lows (two troughs at the same level). These are your liquidity pools. Now ask: which direction has more pools nearby — above or below? That is the likely short-term flow direction.",
    characterCoaching: "Louie Liquidity says: 'I look for equal highs first. Two highs sitting at the same level — every retail trader who bought the first high put their stop above the second. That is a pool. When price sweeps above those equal highs and then closes back below — that sweep is the signal. The move is about to happen in the opposite direction. Melissa Mayhem set the trap. I was waiting for it.'",
    practice: {
      instruction: "On XAUUSD 4H, identify: (1) Yesterday's High (PDH) and Low (PDL), (2) One set of equal highs above price, (3) One set of equal lows below price. Label each. Which direction has more liquidity pools — above or below current price?",
      hint: "Equal highs: two candle highs that reached approximately the same price level. Equal lows: same concept for lows. These are magnets for price.",
      successCriteria: "You can identify at least three liquidity pools and state which direction has more draw.",
    },
    xpReward: 100,
    journalPrompts: [
      { question: "List the three liquidity pools you found and their approximate price levels.", type: 'observation' },
      { question: "If price sweeps the nearest pool and reverses — at what level would that reversal be invalidated?", type: 'invalidation' },
      { question: "Did you feel FOMO watching price move toward a liquidity pool without you? That feeling is valid. Write it down. Then build a plan for next time instead of chasing.", type: 'emotion' },
    ],
    psychologyNote: "Chasing candles is how traders lose. When you see price sweeping a liquidity pool, the instinct is to jump in immediately. This is Melissa Mayhem in action. The proper move: mark the pool in advance, set a limit order, and walk away. Either it fills or it does not. No chasing.",
    nextLesson: 'aoi',
    prevLesson: 'bias',
  },

  // ── LEVEL 4: AOI KITCHEN ─────────────────────────────────────────────────
  {
    id: 'aoi',
    slug: 'aoi',
    step: 7,
    level: 4,
    levelName: 'AOI Kitchen',
    title: 'Area of Interest',
    tcuTerm: 'AOI',
    subtitle: 'Where Do You Want Price to Come To?',
    character: 'nana-value',
    color: '#F97316',
    icon: '🏡',
    hook: "The most common mistake new traders make is buying in the wrong zone. Nana Value has one rule she has lived by for forty years: never overpay. In trading, the zone you enter from determines everything — your risk, your reward, your probability.",
    kitchenStory: "Nana Value goes to the market every Saturday morning at 7AM, not at noon. Why? Because prices are better early. She never buys the steak at full price when she knows it will be reduced in an hour. Your Area of Interest is the trading equivalent of Nana's 7AM market visit — it is the zone where price is at a discount, where the value is real, where the trade makes sense.",
    marketTranslation: "An AOI is a price zone where multiple confluences stack: a Discount zone (below the 50% midpoint of a range), a Leftover Container (FVG — an unfilled gap from a fast move), and previous structure support. One factor is a guess. Three factors is a zone worth waiting for. The AOI is where you set your limit orders and walk away from the screen.",
    visualGuide: "On XAUUSD 4H: (1) Identify the current swing range (last significant high to last significant low). (2) Find the 50% midpoint — price below this is Discount on a bullish bias. (3) Look for any Leftover Containers (gaps between candle bodies) in the Discount zone. Where the gap and the 50% level overlap — that is your AOI.",
    characterCoaching: "Nana Value says: 'I wait for the sale. I mark my AOI on Sunday night and I do not move it no matter what the market does Monday morning. If price comes to my zone — I evaluate my confirmation. If price does not come — I did not miss anything. I saved my money for the right opportunity. There is always another sale next week, baby.'",
    practice: {
      instruction: "On XAUUSD 4H: identify the most recent swing range (high and low). Calculate the 50% midpoint. Mark the discount zone (lower 50%). Find one Leftover Container (FVG) within that zone. That is your AOI. Mark it on the chart.",
      hint: "A Leftover Container appears as a gap between the body of one candle and the body of the candle two bars later — usually created during a fast impulse move. Price often returns to fill it.",
      successCriteria: "You have a marked AOI that includes both a discount zone and at least one Leftover Container.",
    },
    xpReward: 100,
    journalPrompts: [
      { question: "Describe your marked AOI — what price levels define its boundaries and what confluences sit within it?", type: 'observation' },
      { question: "If price blows through your AOI without reacting — at what level would you say the AOI is invalidated and the structure has changed?", type: 'invalidation' },
      { question: "Was it difficult to mark a zone and then wait? The urge to chase is Melissa Mayhem. Write down what you will do instead of chasing if price moves without you.", type: 'emotion' },
    ],
    psychologyNote: "Moving your AOI to chase price is the same as moving to the expensive grocery store because you missed Nana's 7AM sale. The value is gone. Wait for the next sale.",
    riskWarning: "BURN ALARM: An AOI with only one reason (e.g., 'it looks like support') is not an AOI — it is a guess. Require minimum two stacking confluences before calling something an AOI.",
    nextLesson: 'delivery',
    prevLesson: 'flow',
  },

  // ── LEVEL 5: DELIVERY KITCHEN ────────────────────────────────────────────
  {
    id: 'delivery',
    slug: 'delivery',
    step: 8,
    level: 5,
    levelName: 'Delivery Kitchen',
    title: 'Delivery',
    tcuTerm: 'Delivery',
    subtitle: 'How Price Gets Where It Is Going',
    character: 'candle-kid',
    color: '#22C55E',
    icon: '📦',
    hook: "Two trades. Same direction. Same level. One makes money, one loses. The difference? Delivery. How price arrives at your AOI tells you everything about whether the move is real or a trap. Candle Kid reads delivery like a weather report — and it never lies.",
    kitchenStory: "When the restaurant receives a delivery, the quality is in the packaging. Fresh ingredients arrive in clean, intact boxes — impulsive delivery. Old or questionable ingredients arrive crushed and slow — corrective delivery. You can tell from the box whether what is inside is worth using. The candles are the boxes.",
    marketTranslation: "Impulsive delivery: strong, consecutive candles closing near their highs (bullish) or lows (bearish), with momentum and purpose. This shows institutional intent. Corrective delivery: overlapping, choppy candles that barely move net-net. This is either accumulation or distribution — wait, do not trade. Session opens (The Kitchen Is Open) produce the cleanest impulsive delivery.",
    visualGuide: "On XAUUSD 1H, look at the last major move to a key level. Count the candles involved. Are most of them closing in the direction of the move with large bodies and short wicks? Or are the candles small-bodied, alternating direction, overlapping? The first is impulsive. The second is corrective.",
    characterCoaching: "Candle Kid says: 'I never enter into corrective delivery. If the candles are choppy and overlapping — Melissa Mayhem is cooking. She wants you to guess direction in the chop. I wait for impulsive candles, clean moves, purpose. When three or four big bodies appear in a row heading toward my AOI — that is my signal to get ready. The delivery has arrived.'",
    practice: {
      instruction: "On XAUUSD 1H, find one example of impulsive delivery (3+ consecutive candles closing strongly in one direction with minimal overlap) and one example of corrective delivery (choppy, overlapping candles). Note the time/price range of each.",
      hint: "For impulsive: look near major news events or session opens (New York 8AM ET, London 2AM ET). For corrective: look during mid-session lulls or late Asian session.",
      successCriteria: "You can identify and distinguish impulsive vs. corrective delivery sequences on the chart.",
    },
    xpReward: 100,
    journalPrompts: [
      { question: "Describe the delivery style of the last major move on XAUUSD: impulsive or corrective? What specific candle characteristics told you that?", type: 'observation' },
      { question: "If delivery toward your AOI is corrective and price still reaches your zone — does that change your confidence in the setup? Should it?", type: 'invalidation' },
      { question: "Did you feel impatient watching corrective candles? Impatience is Melody Mayhem's invitation. Write the plan for when you feel that impatience next time.", type: 'emotion' },
    ],
    psychologyNote: "Trading during chop is one of the most common account killers. Melissa Mayhem lives in corrective price action. The most profitable traders do almost nothing during chop. They have coffee. They wait. When delivery becomes impulsive — then they move.",
    nextLesson: 'confirmation',
    prevLesson: 'aoi',
  },

  // ── LEVEL 6: CONFIRMATION KITCHEN ────────────────────────────────────────
  {
    id: 'confirmation',
    slug: 'confirmation',
    step: 9,
    level: 6,
    levelName: 'Confirmation Kitchen',
    title: 'Confirmation',
    tcuTerm: 'Confirmation',
    subtitle: 'What Tells You Price Is Ready?',
    character: 'wickie',
    warningCharacter: 'melody-mayhem',
    color: '#A855F7',
    icon: '✅',
    hook: "This is where most traders fail. They get the bias right. They find the AOI. They watch the delivery arrive. And then they jump in one candle too early — before confirmation. Wickie has one rule: if you did not see the confirmation, you did not see the entry. Period.",
    kitchenStory: "A chef does not serve a dish until they taste it. The AOI gets you to the tasting stage. Confirmation is the taste. It tells you: yes, this is ready to serve. Without that taste — the dish might still be raw. You might be serving something that is not ready. Confirmation is the quality check before service.",
    marketTranslation: "Confirmation is a micro-structure shift on a lower timeframe (15M or 5M) after price reaches your AOI. A bullish confirmation: price hits your AOI, creates a wick rejection, then breaks above the nearest short-term swing high. Bearish: price hits AOI, wick rejection, breaks below nearest short-term swing low. One wick alone is not confirmation. One micro-BOS alone is not confirmation. Both together — that is confirmation.",
    visualGuide: "On XAUUSD 15M, after price enters your AOI: (1) Watch for a long wick candle rejecting the lower boundary of your AOI. (2) Wait for the next candle to close above the high of that wick candle. That close above is the micro-BOS. That combination is your confirmation.",
    characterCoaching: "Wickie says: 'Melody Mayhem loves the first wick. She creates it to make you jump in. You see the rejection, you feel the fear of missing out, you buy — and then she reverses it again. I wait for two things: the wick AND the structural break. Two things. If I only see one, I close the platform and come back. I have missed many good trades waiting for confirmation. I have also saved myself from far more bad ones.'",
    practice: {
      instruction: "On XAUUSD 15M from the last 5 trading days, find one instance where: (1) price entered what looks like a key support zone, (2) formed a wick rejection, (3) then broke above the nearest swing high on 15M. That is a confirmed entry signal. Note the date, the zone, and the approximate entry price.",
      hint: "Start with a 4H or 1H chart to identify a key level. Then drop to 15M and look at the price action when that level was reached. You are looking for the wick rejection + micro-BOS pattern.",
      successCriteria: "You can identify one historical confirmation signal with the two required elements: wick rejection + micro-BOS.",
    },
    xpReward: 125,
    journalPrompts: [
      { question: "Describe the confirmation signal you found — what did the wick look like and what broke where?", type: 'observation' },
      { question: "After the micro-BOS confirmation, what price level would invalidate this entry — i.e., where would you know the confirmation was wrong?", type: 'invalidation' },
      { question: "Recall a time you entered without confirmation. What happened? What were you feeling at the moment of entry?", type: 'emotion' },
    ],
    psychologyNote: "The pressure to enter before confirmation is one of Melody Mayhem's specialties. She makes you feel like waiting will cost you the whole move. Reality: entries with confirmation have better risk/reward because you can place a tighter Burn Point below the wick low. Patience creates better entries.",
    nextLesson: 'risk',
    prevLesson: 'delivery',
  },

  // ── LEVEL 7: THE PASS ─────────────────────────────────────────────────────
  {
    id: 'risk',
    slug: 'risk',
    step: 10,
    level: 7,
    levelName: 'The Pass',
    title: 'Risk Management',
    tcuTerm: 'Burn Point',
    subtitle: 'How to Stay in the Game',
    character: 'grandma-market',
    warningCharacter: 'burn-alarm',
    color: '#c0392b',
    icon: '🔔',
    hook: "Risk management is not optional. It is the only reason any trader survives long enough to become profitable. Grandma Market has been in this kitchen since before most students were born. She will tell you: the traders who blow accounts are almost never wrong about direction. They are wrong about size.",
    kitchenStory: "A restaurant that burns through its entire budget on one dish service is not a restaurant for long. Grandma Market runs her kitchen like a business. She never bets the whole kitchen on one plate. She risks a small, controlled portion of her resources each service — enough to grow over time, small enough that one bad night does not close the restaurant.",
    marketTranslation: "The Burn Point (stop loss) is placed at the level that, if hit, proves the trade was wrong. Not just uncomfortable — wrong. For a bullish trade from an AOI, the Burn Point sits below the AOI. For a bearish trade, above. Risk no more than 1-2% of account balance on any single pass. Position size is calculated backward from your Burn Point — not from how many contracts feel right.",
    visualGuide: "Before placing any trade: (1) Identify your entry (The Pass). (2) Identify your Burn Point — below the lowest point of your AOI for buys, above the highest point for sells. (3) Calculate the distance in pips/points. (4) Calculate the position size so that hitting the Burn Point costs no more than 1-2% of your total account.",
    characterCoaching: "Grandma Market says: 'I have seen traders with a 70% win rate go broke. You know how? They risk 10% on the losers and 1% on the winners. The math destroys them. I risk the same percentage on every single trade. Always. No exceptions. Not when I am confident. Not when I am on a winning streak. Always the same. That is discipline. That is what keeps the kitchen open.'",
    practice: {
      instruction: "Calculate a sample trade: Account size = $10,000. Max risk per trade = 1% = $100. Your AOI is at 2,300. Your Burn Point is at 2,290 (10 points below). If XAUUSD is priced at $1 per 0.01 lot per point — how many 0.01 lots can you trade to keep risk at $100?",
      hint: "Distance to Burn Point = 10 points. $100 risk ÷ $10 per point (for 1 standard lot) = 0.10 lots. Or in micro lots: 10 micro lots (0.01 × 10). Check your broker's pip value for exact calculation.",
      successCriteria: "You can calculate position size backward from a Burn Point for any account size and risk percentage.",
    },
    xpReward: 125,
    journalPrompts: [
      { question: "What is 1% of your current trading account or paper trading balance? Write it down — this is your maximum risk per trade.", type: 'observation' },
      { question: "If you hit 5 consecutive losses at 1% risk — how much of your account remains? (~95%.) How does that change your psychology versus hitting 5 losses at 5% risk?", type: 'invalidation' },
      { question: "Have you ever moved a stop loss to avoid being stopped out? Write what happened. Grandma Market says: moving your stop is trading like a gambler, not a professional.", type: 'emotion' },
    ],
    psychologyNote: "Moving the stop loss is the single most dangerous habit in trading. It is Melody Mayhem's favorite trick. The moment your finger hovers over that stop — close the platform. Walk away. Come back in 15 minutes. The urge will pass. The trade will resolve. Your account will thank you.",
    riskWarning: "BURN ALARM: Never risk more than 2% of account on a single trade. Never add to a losing position. Never remove a stop loss once placed. These are the three unbreakable rules.",
    nextLesson: 'pass',
    prevLesson: 'confirmation',
  },

  {
    id: 'pass',
    slug: 'pass',
    step: 11,
    level: 7,
    levelName: 'The Pass',
    title: 'The Pass (Entry)',
    tcuTerm: 'Entry = The Pass',
    subtitle: 'The Moment You Enter the Trade',
    character: 'chef-goldie',
    color: '#c9a84c',
    icon: '🎯',
    hook: "The Pass is not an impulse. It is the result of a complete Recipe. You have done the work: Bias set, Flow mapped, AOI marked, Delivery read, Confirmation received. The Pass is the reward for all of that patience. Chef Goldie says: make it count.",
    kitchenStory: "After hours of prep — mise en place, temperatures calibrated, timing lined up — the chef finally calls the pass. Every element is ready. The dish goes out. The Pass in trading is that moment. Everything is prepared. You execute. Not before. Not after. Exactly at the moment the system says: now.",
    marketTranslation: "The Pass (entry) is placed at the first candle close above the micro-BOS after confirmation, or via limit order at the top of the AOI zone. Your Burn Point goes below the wick low that produced your confirmation. Risk-to-reward minimum 1:2. Calculate your position size from the Burn Point first. Then place the trade. In that order.",
    visualGuide: "Your entry is the candle that closes above the micro-BOS swing high (for bullish). Place a market or limit order at the close of that candle. Your Burn Point is 3-5 pips below the wick low that formed in your AOI. Measure from entry to Burn Point = your risk. Multiply by 2 to find minimum First Tables Served. Confirm the path to target has no major blockers.",
    characterCoaching: "Chef Goldie says: 'I place my Burn Point first. Then I calculate my size. Then I set my targets. By the time I actually enter, the trade is already planned in its entirety. I am not deciding anything new in the moment. I am executing a plan I already built. Execution without a plan is gambling. Execution of a plan is the craft.'",
    practice: {
      instruction: "Using your previously marked AOI and the confirmation signal you found in the last lesson: (1) Identify where The Pass (entry) would be. (2) Place your Burn Point below the wick low. (3) Calculate risk in pips. (4) Calculate First Tables Served at 2R. Write all four values.",
      hint: "Entry = close of first candle above micro-BOS. Burn Point = 3-5 pips below the wick low in AOI. Risk = entry minus Burn Point in pips. First Tables Served = entry + (risk × 2) for buys.",
      successCriteria: "You have a complete trade plan with Entry, Burn Point, risk in pips, and First Tables Served level — all calculated before the trade is placed.",
    },
    xpReward: 150,
    journalPrompts: [
      { question: "Write your full trade plan: Symbol | Bias | Entry (The Pass) | Burn Point | Tables Served 1 | Tables Served 2 | Risk %", type: 'observation' },
      { question: "At what price level is this trade definitively wrong — your Burn Point? Are you comfortable with that outcome?", type: 'invalidation' },
      { question: "How did it feel to plan the full trade before entering rather than entering first and planning later? Note the difference in your emotional state.", type: 'emotion' },
    ],
    riskWarning: "BURN ALARM: If you cannot state your Burn Point before you place the trade — you are gambling, not trading. Close the order window. Build the plan. Then execute.",
    nextLesson: 'tables-served',
    prevLesson: 'risk',
  },

  // ── LEVEL 8: TABLES SERVED ────────────────────────────────────────────────
  {
    id: 'tables-served',
    slug: 'tables-served',
    step: 12,
    level: 8,
    levelName: 'Tables Served',
    title: 'Tables Served (Targets)',
    tcuTerm: 'Targets = Tables Served',
    subtitle: 'Where the Profit Lands',
    character: 'louie-liquidity',
    color: '#3B82F6',
    icon: '🍽️',
    hook: "Your targets are not random price levels. They are the next liquidity pools in the direction of your trade — the places where price is flowing. Louie Liquidity mapped them for you in Level 3. Now you use that map to decide where the profit gets locked in.",
    kitchenStory: "After the chef calls the pass and the dish goes out, the servers know exactly which tables need to be served first and which can wait. First Tables Served: the couple in the corner who ordered first. Second Tables Served: the larger group who can wait a moment. The restaurant serves in sequence — and so does a trade.",
    marketTranslation: "First Tables Served: the nearest liquidity pool in your bias direction — a previous high (bullish) or previous low (bearish). This is your minimum 2R target. Take 50-70% of your position here and move Burn Point to break even. Second Tables Served: the next significant liquidity pool. Let the remaining position run. If there is a Leftover Container or major structure between entry and target — shorten the target or skip the trade.",
    visualGuide: "After marking your entry, identify: (1) The nearest old high or equal high cluster above price (bullish). That is First Tables Served. (2) The next old high cluster beyond that. Second Tables Served. Mark both levels before placing the trade.",
    characterCoaching: "Louie Liquidity says: 'First table pays the session. Second table builds the week. I always know both levels before I enter. And I have one rule: I never let a 2R trade become a 1R trade by staying too long. When First Tables Served is hit, I take money. Every time. No exceptions. The only way to grow an account is to consistently take profit.'",
    practice: {
      instruction: "On your marked trade plan from the last lesson: scroll right from your entry. Identify First Tables Served (nearest liquidity pool). Calculate R-multiple (e.g., if risk is 20 pips and target is 40 pips — that is 2R). Identify Second Tables Served. Note if any Leftover Containers exist between entry and First Tables Served.",
      hint: "R-multiple = profit target in pips ÷ risk in pips. 2R minimum required. Clear the path — no major structure blocker should sit between entry and First Tables Served.",
      successCriteria: "You have both table levels marked with R-multiples calculated and path-to-target assessed.",
    },
    xpReward: 125,
    journalPrompts: [
      { question: "What are your First and Second Tables Served levels? What R-multiples do they represent?", type: 'observation' },
      { question: "Is there any structure or Leftover Container between your entry and First Tables Served that could stall price? How does that affect your plan?", type: 'invalidation' },
      { question: "Do you feel the urge to exit early before your First Tables Served target? Write what emotion is driving that urge.", type: 'emotion' },
    ],
    psychologyNote: "Exiting too early is Melody Mayhem's second-favorite move (after moving the stop). She creates fear of losing the profit you already have. The plan is the plan. If you planned First Tables Served at 2R — let it arrive. Trust the work you did before the trade was placed.",
    nextLesson: 'management',
    prevLesson: 'pass',
  },

  // ── LEVEL 9: HEAD CHEF ────────────────────────────────────────────────────
  {
    id: 'management',
    slug: 'management',
    step: 13,
    level: 9,
    levelName: 'Head Chef',
    title: 'Management',
    tcuTerm: 'Management',
    subtitle: 'How You Run the Trade Once In',
    character: 'grandma-market',
    warningCharacter: 'melody-mayhem',
    color: '#c0392b',
    icon: '⚙️',
    hook: "Getting in is only the beginning. The traders who consistently grow accounts are the ones who manage their trades with discipline after entry. Grandma Market has a simple rule: once you are in, the plan runs the trade. Your emotions do not.",
    kitchenStory: "A great restaurant does not panic when a dish takes longer than expected. The chef set the timers. The chef built the system. Once service starts, the system runs itself. Grandma Market runs her trades the same way. The plan was built before entry. Management just follows the plan — adjusting temperatures, not rebuilding the recipe from scratch.",
    marketTranslation: "Phase 1 — Entry to First Tables Served: leave the trade alone. Do not move your Burn Point. Do not add size. Let the plan work. Phase 2 — At First Tables Served: take 50-70% partial, move Burn Point to break even (entry price). The trade is now risk-free. Phase 3 — From break even to Second Tables Served: trail Burn Point below each new higher low (bullish) or above each new lower high (bearish). Phase 4 — Exit at Second Tables Served or when trailing stop is hit.",
    visualGuide: "After entry: draw a horizontal line at your Burn Point (do not move it until First Tables Served is hit). Draw a line at First Tables Served. Draw a line at Second Tables Served. Add a line at break even (your entry). This is your entire management plan visible on the chart before price moves.",
    characterCoaching: "Grandma Market says: 'The biggest lie trading teaches you is that active management means better trades. It does not. Better management means building the plan, placing the levels, and then not touching anything. The trade either works or it does not. My job after entry is to observe, not interfere. I watch. I sip my tea. I trust the Recipe. Most of the time — it works. When it does not — the Burn Point protects me. That is all.'",
    practice: {
      instruction: "Complete The Full Recipe: Using a real or paper trade, write out the complete management plan: (1) Burn Point price, (2) First Tables Served — price and % to close, (3) Burn Point move after First Tables Served (break even = entry), (4) Second Tables Served — price, (5) Trailing stop rule for the remainder. Execute or simulate it.",
      hint: "The management plan should be written before you enter. Not after. Write it, then trade it. The order matters.",
      successCriteria: "You have a documented management plan for a complete trade covering all four phases.",
    },
    xpReward: 200,
    journalPrompts: [
      { question: "Write the complete management plan for your most recent or simulated trade — all four phases.", type: 'observation' },
      { question: "What external event (news, large candle, price gap) would make you exit this trade before the Burn Point is hit? Is that reason worth breaking the plan for?", type: 'invalidation' },
      { question: "After a trade — whether it won or lost — what emotion are you feeling right now? Write it honestly. Patterns in your emotions are the most important data you will ever collect.", type: 'emotion' },
    ],
    psychologyNote: "Every time you deviate from the management plan — for any reason — write it down. Date, trade, deviation, outcome. After 30 deviations, read them back. You will see the pattern. You will see Melody Mayhem. And you will stop listening to her.",
    riskWarning: "BURN ALARM: Never move your Burn Point against the trade. Only move it in the direction of profit (to break even, then to trail). Moving a stop loss against the trade is the fastest way to turn a small loss into a catastrophic one.",
    nextLesson: 'kitchen-rush',
    prevLesson: 'tables-served',
  },

  {
    id: 'kitchen-rush',
    slug: 'kitchen-rush',
    step: 14,
    level: 9,
    levelName: 'Head Chef',
    title: 'Kitchen Rush',
    tcuTerm: 'The Recipe',
    subtitle: 'Put the Full Recipe Together',
    character: 'trading-chef',
    warningCharacter: 'melissa-mayhem',
    color: '#c9a84c',
    icon: '⏱️',
    hook: "You have learned every step of The Recipe. Now it is time to run the kitchen under pressure. The Kitchen Rush is where everything you have learned gets applied in sequence on a live chart. Melissa Mayhem will try to distract you. Trading Chef will guide you. Your job: run the full Recipe from start to finish without skipping a step.",
    kitchenStory: "During a dinner rush, a great chef does not slow down. They execute the same Recipe they practiced a hundred times. No shortcuts. No new experiments. The system carries them through. Your Kitchen Rush works the same way — practice running the Recipe until it becomes automatic, even when the charts are moving fast.",
    marketTranslation: "The full Recipe in sequence: Step 1: Set your Bias (Daily chart). Step 2: Map the Liquidity Flow (4H chart, PDH/PDL, equal levels). Step 3: Mark your AOI (4H discount zone + Leftover Container). Step 4: Read the Delivery (1H, impulsive vs corrective?). Step 5: Wait for Confirmation (15M wick rejection + micro-BOS). Step 6: Place The Pass (entry at micro-BOS break). Step 7: Set Tables Served (First 2R, Second open). Step 8: Run Management (break even at First, trail to Second).",
    visualGuide: "Open the Kitchen. Select XAUUSD. Work through every step of The Recipe in order. Do not skip any step. If you cannot complete a step — the trade does not exist. Journal every step you complete and every step where the setup breaks down.",
    characterCoaching: "Trading Chef says: 'Every new trader wants to skip steps. They want to get to The Pass quickly. But the fastest way to a great trade is running the full Recipe slowly. Every step that fails is a trade you saved. Every step that succeeds is a setup worth watching. You are a Head Chef now. Run the Recipe. Every time. Without exception. Welcome to the kitchen.'",
    practice: {
      instruction: "Run The Full Recipe on XAUUSD right now: (1) Open Kitchen → XAUUSD Daily → State your bias. (2) Drop to 4H → Map 3 liquidity pools. (3) Mark your AOI with two stacking confluences. (4) Drop to 1H → Assess current delivery type. (5) Wait on 15M for confirmation setup. (6) If confirmation appears → write full trade plan. If not → write 'No Setup Today' and close the platform.",
      hint: "A 'No Setup Today' outcome is a perfect outcome. It means the Recipe protected you from a bad trade. Celebrate it the same way you celebrate a winning trade.",
      successCriteria: "You complete all 8 steps in sequence on a live chart, either finding a full setup or correctly identifying that no setup exists.",
    },
    xpReward: 250,
    journalPrompts: [
      { question: "Walk through each of the 8 Recipe steps and note what you found at each one. Which step was hardest?", type: 'observation' },
      { question: "If you found no valid setup today — what was missing? Which step broke down and why?", type: 'invalidation' },
      { question: "How did it feel to run the full Recipe knowing Melissa Mayhem and Melody Mayhem were watching? What mental state were you in by Step 6?", type: 'emotion' },
    ],
    psychologyNote: "Grandma Market's final lesson: the days you do not trade are not wasted days. They are the days you proved you have discipline. The market is open 250 days a year. You only need 30-40 great setups. Everything else is patience. Everything else is protecting your account for the next real Recipe.",
    riskWarning: "BURN ALARM: Never force a trade to end the Kitchen Rush with a win. A forced trade is not a trade — it is a bet. The Kitchen Rush is complete the moment you run all 8 steps, regardless of whether a trade exists.",
    nextLesson: null,
    prevLesson: 'management',
  },
]

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug)
}

export const LESSON_SLUGS = LESSONS.map((l) => l.slug)

export const TOTAL_ACADEMY_XP = LESSONS.reduce((sum, l) => sum + l.xpReward, 0)

export const ACADEMY_MODULES = [
  {
    id: 'level-0',
    level: 0,
    name: 'Market Child',
    description: 'Understand the kitchen before you touch anything. Every Head Chef started exactly here.',
    lessonIds: ['market-child'],
  },
  {
    id: 'level-1',
    level: 1,
    name: 'Candle Kitchen',
    description: 'Learn the alphabet of price. Candles and wicks are the language of every chart.',
    lessonIds: ['candles', 'wicks'],
  },
  {
    id: 'level-2',
    level: 2,
    name: 'Structure Kitchen',
    description: 'Read the blueprint of the market. Structure tells you where you are before you decide where to go.',
    lessonIds: ['structure'],
  },
  {
    id: 'level-3',
    level: 3,
    name: 'Flow Kitchen',
    description: 'Understand directional bias and where liquidity draws price. Move with the market, not against it.',
    lessonIds: ['bias', 'flow'],
  },
  {
    id: 'level-4',
    level: 4,
    name: 'AOI Kitchen',
    description: 'Identify the zones where the trade makes sense. Never overpay — wait for the discount.',
    lessonIds: ['aoi'],
  },
  {
    id: 'level-5',
    level: 5,
    name: 'Delivery Kitchen',
    description: 'Read how price arrives at your zone. Impulsive or corrective — the packaging tells you everything.',
    lessonIds: ['delivery'],
  },
  {
    id: 'level-6',
    level: 6,
    name: 'Confirmation Kitchen',
    description: 'Wait for the signal that price is ready. The touch is arrival. Confirmation is the green light.',
    lessonIds: ['confirmation'],
  },
  {
    id: 'level-7',
    level: 7,
    name: 'The Pass',
    description: 'Define your Burn Point, calculate your risk, and execute the trade with a complete plan.',
    lessonIds: ['risk', 'pass'],
  },
  {
    id: 'level-8',
    level: 8,
    name: 'Tables Served',
    description: 'Map your targets to the next liquidity pools. Know where the profit lands before you enter.',
    lessonIds: ['tables-served'],
  },
  {
    id: 'level-9',
    level: 9,
    name: 'Head Chef',
    description: 'Master trade management and Kitchen Rush. This is where the Recipe becomes automatic.',
    lessonIds: ['management', 'kitchen-rush'],
  },
]
