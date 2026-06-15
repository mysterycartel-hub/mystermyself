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

// ── TCU CANON CHARACTER LOCK ──────────────────────────────────────────────────
// 10 canonical characters. Characters are behavioral systems — not curriculum topics.
// Coach characters appear in lessons. Warning/alert characters fire from behavior.
// Characters do NOT appear as standalone modules.
//
// Canon roles:
//   Trading Chef   = Master Mentor
//   Chef Goldie    = Execution
//   Wickie         = Candles
//   Louie          = Liquidity
//   Rico Rhythm    = Sessions
//   Penny Stacks   = Risk
//   Mr. Stocks     = Ownership
//   Burn Alarm     = Rule Violations (alert)
//   Melissa Mayhem = FOMO · Overconfidence · Rule Breaking · Revenge · Emotional Entries (warning)
//   Melody Mayhem  = Fear · Hesitation · Confidence Recovery · Discipline · Emotional Control (warning)

export const CHARACTERS: Record<string, Character> = {

  // ── Master Mentor ─────────────────────────────────────────────────────────
  'trading-chef': {
    id: 'trading-chef',
    name: 'Trading Chef',
    title: 'Master Mentor',
    emoji: '👑',
    color: '#c9a84c',
    role: 'coach',
    catchphrase: "You do not earn a Michelin star in a week. You earn it by running the full Recipe — every time, under every condition, without shortcuts.",
    teaches: ['master-mentor'],
  },

  // ── Execution ─────────────────────────────────────────────────────────────
  'chef-goldie': {
    id: 'chef-goldie',
    name: 'Chef Goldie',
    title: 'Execution',
    emoji: '👨‍🍳',
    color: '#c9a84c',
    role: 'coach',
    catchphrase: "Every great dish starts with the right ingredients. Every great trade starts with structure. Execution is what separates understanding from results.",
    teaches: ['execution'],
  },

  // ── Candles ───────────────────────────────────────────────────────────────
  'wickie': {
    id: 'wickie',
    name: 'Wickie',
    title: 'Candles',
    emoji: '📍',
    color: '#A855F7',
    role: 'coach',
    catchphrase: "A wick is a lie price tried to sell you. Every candle tells a story. I read every single word.",
    teaches: ['candles'],
  },

  // ── Liquidity ─────────────────────────────────────────────────────────────
  'louie-liquidity': {
    id: 'louie-liquidity',
    name: 'Louie Liquidity',
    title: 'Liquidity',
    emoji: '🌊',
    color: '#3B82F6',
    role: 'coach',
    catchphrase: "Follow the flow. Smart money always needs a drink before it moves. The pools are the map.",
    teaches: ['liquidity'],
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  'rico-rhythm': {
    id: 'rico-rhythm',
    name: 'Rico Rhythm',
    title: 'Sessions',
    emoji: '⏰',
    color: '#8B5CF6',
    role: 'coach',
    catchphrase: "Every kitchen has a service window. Trade in the right session or stay out of the kitchen entirely.",
    teaches: ['sessions'],
  },

  // ── Risk ──────────────────────────────────────────────────────────────────
  'penny-stacks': {
    id: 'penny-stacks',
    name: 'Penny Stacks',
    title: 'Risk',
    emoji: '💰',
    color: '#10B981',
    role: 'coach',
    catchphrase: "It is not about how much you make. It is about how much you keep. Size the risk. Protect the account. The math is the plan.",
    teaches: ['risk'],
  },

  // ── Ownership ─────────────────────────────────────────────────────────────
  'mr-stocks': {
    id: 'mr-stocks',
    name: 'Mr. Stocks',
    title: 'Ownership',
    emoji: '📈',
    color: '#0EA5E9',
    role: 'coach',
    catchphrase: "Why are you renting a market you could own? The patient ones build wealth. The impatient ones build lessons.",
    teaches: ['ownership'],
  },

  // ── Behavioral Warning System ─────────────────────────────────────────────
  // These characters are trigger systems. They fire from behavior, not from lessons.

  'melissa-mayhem': {
    id: 'melissa-mayhem',
    name: 'Melissa Mayhem',
    title: 'FOMO · Overconfidence · Rule Breaking · Revenge · Emotional Entries',
    emoji: '⚡',
    color: '#EC4899',
    role: 'warning',
    catchphrase: "I am everywhere in this market. The FOMO, the chasing, the skipped steps — that is all me. The only way to beat me is to finish The Recipe before you touch anything.",
    teaches: ['fomo', 'overconfidence', 'rule-breaking', 'revenge', 'emotional-entries'],
  },

  'melody-mayhem': {
    id: 'melody-mayhem',
    name: 'Melody Mayhem',
    title: 'Fear · Hesitation · Confidence Recovery · Discipline · Emotional Control',
    emoji: '🎭',
    color: '#F59E0B',
    role: 'warning',
    catchphrase: "Your emotions are my favorite trading partner. But name them — write them down — and I lose all my power. The journal is your weapon against me.",
    teaches: ['fear', 'hesitation', 'confidence-recovery', 'discipline', 'emotional-control'],
  },

  // ── Rule Violation Alert ──────────────────────────────────────────────────
  'burn-alarm': {
    id: 'burn-alarm',
    name: 'Burn Alarm',
    title: 'Rule Violations',
    emoji: '🔔',
    color: '#EF4444',
    role: 'alert',
    catchphrase: "STOP. Check your Burn Point before anything else. No Burn Point — no trade.",
    teaches: ['rule-violations'],
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

export interface GuidedExample {
  scenario: string
  question: string
  answer: string
  trap?: string
  whyItMatters: string
}

// ── TCU CURRICULUM LOCK — Lesson data interfaces ─────────────────────────────
// Characters (Melissa, Melody, Burn Alarm) are ENGINE-DRIVEN — not lesson sections.
// They fire from student behavior events via CharacterTriggerEngine.
// Lessons contain only the curriculum data. Engines handle the rest.

export interface LessonConcept {
  definition: string      // plain language — assumes zero prior knowledge
  kitchenAnalogy: string  // TCU kitchen metaphor mapping
  marketMeaning: string   // XAUUSD-specific application
}

export interface LessonExample {
  scenario: string        // specific XAUUSD price situation with real numbers
  walkthrough: string     // step-by-step read through the scenario
  keyTakeaway: string     // one sentence — the thing that must stick
}

export interface LessonTrap {
  mistake: string         // the specific wrong move students make
  whyItHappens: string    // psychology / gap behind it
  consequence: string     // what it costs them
}

export interface GuidedPractice {
  scenario: string        // the practice situation
  steps: string[]         // numbered steps to work through
  answer: string          // full correct answer revealed after student attempts
  whyItMatters: string    // Recipe connection
}

export interface KitchenRushPrompt {
  scenario: string    // what to look at
  task: string        // what to identify or decide
  answer: string      // correct answer — revealed after attempt
  timeTarget: number  // seconds — how fast a Head Chef executes this
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
  tradingChefIntro?: string  // TC narrates context before lesson begins
  hook: string
  kitchenStory: string
  marketTranslation: string
  visualGuide: string
  guidedExample?: GuidedExample  // legacy — use guidedPractice for new lessons
  characterCoaching: string
  practice: PracticeTask
  xpReward: number
  journalPrompts: JournalPrompt[]
  psychologyNote?: string
  riskWarning?: string
  nextLesson: string | null
  prevLesson: string | null
  // ── TCU Curriculum Lock — engine-fed data fields ──────────────────────────
  // Each field present on a lesson = one additional rendered step in LessonTemplate.
  // Characters (Melissa, Melody, Burn Alarm) fire from CharacterTriggerEngine —
  // not from per-lesson configuration. Adding a field here adds a step. That is all.
  concept?: LessonConcept
  example?: LessonExample
  commonTrap?: LessonTrap
  guidedPractice?: GuidedPractice
  kitchenRush?: KitchenRushPrompt
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
    tradingChefIntro: "Welcome. You are not a trader yet — and that is exactly right. Every person who has ever blown an account started by thinking they already knew enough. They did not come here first. You did. That decision — to start at zero — is the most important trade you will ever make.",
    hook: "Before a chef can cook, they have to understand why the kitchen exists. Before a trader can trade, they have to understand what trading actually is. You are a Market Child right now — and that is not an insult. It is the beginning. Every Head Chef started exactly here.",
    kitchenStory: "The first day in a professional kitchen, you do not cook. You learn the layout. You learn the equipment. You learn who runs what section. You learn the rules. The kitchen has rules for a reason: without them, people get burned. The Trading Chef University kitchen has the same rules. Your job today is to understand the kitchen before you touch anything.",
    marketTranslation: "The market is not a slot machine. It is not a game. It is a professional environment where money moves based on decisions made by banks, institutions, and retail traders — in that order. You are currently retail. Your job is to learn to read what institutions are doing and move with them, not against them. That is the only edge that lasts. TCU teaches you to develop it.",
    guidedExample: {
      scenario: "A student opens the Academy and immediately tries to click Level 5 (Delivery Kitchen) on their first day.",
      question: "What happens when they try to access Level 5?",
      answer: "The level is locked. They are redirected to Level 0. The system requires completion of each level in sequence — viewed, practiced, reflected — before the next unlocks.",
      trap: "Many students assume they can skip to the 'interesting' material. The Kitchen does not allow it — and neither does the market.",
      whyItMatters: "The gating is not a limitation. It is the Recipe in action. Every step you skip is a gap you will pay for later — in real money.",
    },
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
    concept: {
      definition: "Trading is speculating on whether the price of an asset will rise or fall. In TCU we trade XAUUSD — gold priced in US dollars. Every trade is a claim backed by evidence. The Recipe is how you build that evidence before clicking anything.",
      kitchenAnalogy: "The kitchen does not run itself. Before the chef cooks, someone built the kitchen, stocked the ingredients, and wrote the menu. Before you trade, you need to understand the full operation you are walking into — what each station does and in what order service runs.",
      marketMeaning: "Markets move because institutions — banks, hedge funds, central banks — execute large orders that push price toward liquidity. Retail traders follow those moves. TCU teaches you to read institutional intent and move with it, never against it.",
    },
    example: {
      scenario: "Day 1. XAUUSD is at 2,340. A friend texts: 'gold going up today, buy it.' No chart open. No structure checked. No plan. You buy.",
      walkthrough: "No Daily structure assessed. No liquidity identified. No AOI marked. No delivery read. No confirmation. By Wednesday the position is -$400. You are holding, hoping it returns. This is not a trade — it is a guess with leverage attached.",
      keyTakeaway: "Every unplanned entry is a donation to prepared traders. The Recipe exists so every entry has evidence — not just feeling.",
    },
    commonTrap: {
      mistake: "Believing you can skip foundational levels because you have watched trading content online.",
      whyItHappens: "YouTube shows wins. It rarely shows the 6 months of Level 0-3 work that preceded those wins. The barrier to entry feels low.",
      consequence: "You place trades before understanding structure, AOI, or confirmation. The market charges tuition. You pay it before you know what you are being taught.",
    },
    guidedPractice: {
      scenario: "You open a chart and see a large green candle forming. Your instinct says buy. What do you do?",
      steps: [
        "Close the order window immediately.",
        "Open the Academy. Identify which level you have completed.",
        "Name the 8 steps of The Recipe from memory.",
        "Ask: have I completed all 8 steps for this setup?",
        "If any step is missing — close the platform. Come back tomorrow.",
      ],
      answer: "The correct answer is always: complete The Recipe first. One large green candle is not a trade signal. It is one data point in a market that has context you have not yet read. Market Child discipline means knowing you do not have enough information yet — and being comfortable with that.",
      whyItMatters: "The Recipe is the only structure standing between you and an impulsive loss. You learn it here, at Level 0, so it is automatic by Level 9.",
    },
    kitchenRush: {
      scenario: "Name the 10 TCU Academy levels in order.",
      task: "Write them from memory — no looking — as fast as you can.",
      answer: "Market Child → Candle Kitchen → Structure Kitchen → Flow Kitchen → AOI Kitchen → Delivery Kitchen → Confirmation Kitchen → The Pass → Tables Served → Head Chef",
      timeTarget: 30,
    },
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
    character: 'wickie',
    color: '#22C55E',
    icon: '🕯️',
    tradingChefIntro: "Wickie has spent more hours reading candles than anyone else in this kitchen. Before you touch a single strategy, you need to speak his language. Candles are how the market communicates — and Wickie reads every word.",
    hook: "Before you can read a chart, you have to learn the alphabet. Candles are the letters. Every price story is written in candles — and you cannot understand the story if you cannot read the letters.",
    kitchenStory: "Think of a candle like a cooking timer. The open is when the timer starts. The close is when the timer ends. The high and low are how far the temperature swung in between. A big body means strong heat. A small body means the temperature barely moved.",
    marketTranslation: "Every candle has four data points: Open (where price started), Close (where price ended), High (highest point reached), Low (lowest point reached). The body is the space between open and close. The wicks are the thin lines above and below. A bullish candle closes higher than it opened. A bearish candle closes lower.",
    guidedExample: {
      scenario: "Candle A: Opens at 2,300. Closes at 2,318. High: 2,321. Low: 2,297.",
      question: "What type of candle is this? What does the body tell you? What do the wicks tell you?",
      answer: "Bullish candle — closed higher than it opened. Body: 18 points of buying pressure (2300→2318). Upper wick: 3 points — buyers reached 2,321 but slight rejection. Lower wick: 3 points — price briefly dropped to 2,297 but buyers recovered quickly. Net read: buyers controlled this period with moderate conviction.",
      trap: "Seeing a bullish candle and thinking 'buy now.' One candle is not a signal. It is one data point.",
      whyItMatters: "If you cannot read a single candle, you cannot read three. And three candles in sequence form the first chapter of every trade story.",
    },
    visualGuide: "On any chart, zoom into a single daily candle. Find the body — the thick part. Notice the wicks above and below. A long body with short wicks = strong conviction. A small body with long wicks = indecision or rejection.",
    characterCoaching: "Wickie says: 'One candle tells you one story. Three candles in a row tell you a chapter. I never look at just one — I always read the sequence. Three big bullish bodies in a row? That is momentum. That is delivery with intent.'",
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
    psychologyNote: "New traders often feel compelled to trade every candle. This is called overtrading. Most of trading is watching. Less than 10% is actually clicking. The best traders are patient observers first.",
    concept: {
      definition: "A candlestick shows four data points for one time period: Open (where price started), High (highest reached), Low (lowest reached), Close (where price ended). The body is the space between open and close. The wicks are the thin lines above and below.",
      kitchenAnalogy: "A cooking timer tells you when service started, how hot things got, how cold they dipped, and where temperature settled when the bell rang. A candle is the market's cooking timer — same four readings, applied to price instead of heat.",
      marketMeaning: "A bullish candle on XAUUSD closes above its open — buyers controlled that period. A bearish candle closes below its open — sellers controlled it. Body size = conviction. Large body with short wicks = strong directional move. Small body with long wicks = indecision or rejection.",
    },
    example: {
      scenario: "XAUUSD 1H candle: Open 2,310. High 2,318. Low 2,306. Close 2,315.",
      walkthrough: "Body: 2,315 − 2,310 = 5 points. Bullish (closed above open). Upper wick: 2,318 − 2,315 = 3 points — minor rejection at the high. Lower wick: 2,310 − 2,306 = 4 points — price dipped below the open but buyers recovered. Read: mild bullish conviction. Buyers in control but with resistance at the top and a brief dip below open. Not a high-conviction candle — watch what follows.",
      keyTakeaway: "Every candle tells a story. The body is the ending. The wicks are the attempts that failed. Read both, always.",
    },
    commonTrap: {
      mistake: "Reading only the color (green/red) and ignoring body size and wick length.",
      whyItHappens: "Color is the fastest visual cue — it feels like enough information in the moment.",
      consequence: "A tiny green candle with a massive upper wick tells a completely different story than a large green candle with no wicks. Ignoring body and wicks produces misread sequences and wrong bias.",
    },
    guidedPractice: {
      scenario: "XAUUSD 4H. Three consecutive candles: C1: O=2,280 H=2,295 L=2,278 C=2,292. C2: O=2,292 H=2,303 L=2,289 C=2,300. C3: O=2,300 H=2,302 L=2,278 C=2,281.",
      steps: [
        "For each candle: calculate body size (|close − open|).",
        "For each candle: calculate upper wick (high − max(open,close)) and lower wick (min(open,close) − low).",
        "Determine direction: bullish or bearish.",
        "Read the sequence: what story do these three candles tell together?",
        "Write one sentence describing what the market did during this 12-hour period.",
      ],
      answer: "C1: Bullish, 12pt body, 3pt upper wick, 2pt lower wick — strong buying. C2: Bullish, 8pt body, 3pt upper/lower wicks — continued buying, slight resistance at highs. C3: Bearish, 19pt body, 2pt upper wick, 22pt lower wick — sellers pushed hard to 2,278 but buyers defended and closed at 2,281. Read: two candles of bullish progress followed by a contested reversal candle at the highs. The 22-point lower wick on C3 shows buyers defending — but the close is weak. This market is at a decision point.",
      whyItMatters: "Reading three candles in sequence is the foundation of delivery reading, confirmation, and structure. Every advanced skill starts with reading individual candles accurately.",
    },
    kitchenRush: {
      scenario: "Candle: Open 2,350. High 2,365. Low 2,345. Close 2,348.",
      task: "State in 20 seconds: direction, body size, upper wick, lower wick, one-word conviction read.",
      answer: "Bearish. Body: 2pt (2,350→2,348). Upper wick: 15pt (2,365−2,350). Lower wick: 3pt (2,348−2,345). Conviction: REJECTION — massive upper wick means sellers overwhelmed buyers at the highs.",
      timeTarget: 20,
    },
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
    tradingChefIntro: "Now that you can read a candle body, Wickie is going to teach you the part most traders ignore. The wicks. They look like noise until you understand what they are: evidence. Rejection. The market's way of saying 'we tried that price and refused it.' Wickie has made an entire career reading that refusal.",
    hook: "A wick is not just extra chart noise. It is evidence. Evidence of rejection, of manipulation, of smart money pushing price somewhere — then pulling it back. If you ignore wicks, you are ignoring the most honest part of the chart.",
    kitchenStory: "Imagine you are shopping and the store briefly puts an item on sale for a price that seems wrong — way too cheap or way too expensive. People rush in. Then the store pulls it back. That price spike that got rejected? That is a wick. The market tried that price and the market said: no.",
    marketTranslation: "A long upper wick means price tried to go higher but got rejected back down. Sellers overpowered buyers at that high. A long lower wick means price tried to go lower but got rejected up. Buyers stepped in at that low. Wicks at key levels are where the real money decisions happen.",
    guidedExample: {
      scenario: "A 4H candle on XAUUSD: Opens at 2,350. High: 2,389. Low: 2,348. Close: 2,352.",
      question: "What does this wick tell you? What happened in this 4-hour period?",
      answer: "This candle has a massive upper wick (37 points: 2,352 to 2,389) and virtually no body (2 points: 2,350 to 2,352). Price shot up to 2,389 — but sellers rejected it hard. By the close, all of that move was given back. The buyers tried. The sellers won. This is a bearish rejection wick at highs.",
      trap: "Seeing the wick and thinking 'this means price is going down NOW.' A wick is evidence of rejection — not an immediate entry signal. You still need structure, AOI, and confirmation.",
      whyItMatters: "Wicks at key levels are where institutional rejection happens. When Wickie sees a wick at a level that has been tested twice before — he knows something real is happening there.",
    },
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
    concept: {
      definition: "A wick is the thin line above or below a candle body representing price that was temporarily reached but rejected before the candle closed. Long wicks at key levels are evidence of institutional order flow — a real decision was made at that price.",
      kitchenAnalogy: "A store briefly marks down a product to see if customers bite. They rush in — then the price goes back up. The brief excursion was the wick. The market tested that price, found real opposition, and pulled back. The wick is the receipt.",
      marketMeaning: "Upper wick on XAUUSD: buyers pushed to that high but sellers overwhelmed them before the close — that high is a rejection level. Lower wick: sellers pushed down but buyers defended — that low is a supported level. Wicks at previously-tested levels carry the most weight.",
    },
    example: {
      scenario: "XAUUSD Daily candle at the top of a 3-week rally: O=2,410, H=2,447, L=2,408, C=2,413.",
      walkthrough: "Body: 3 points bullish (2,410→2,413). Upper wick: 34 points (2,413 to 2,447) — 11× the body size. Price reached 2,447, likely sweeping stop losses placed by short sellers above the prior high, then collapsed back to 2,413. Sellers dominated completely after the initial push. This is a classic liquidity sweep wick at a major high — the kind Wickie watches for before any short consideration.",
      keyTakeaway: "When the wick is multiple times the body size at a known level, the market is printing a rejection signal in large font. That price will be referenced again.",
    },
    commonTrap: {
      mistake: "Entering a trade immediately after a long wick candle closes, without waiting for confirmation.",
      whyItHappens: "The wick looks like obvious reversal evidence. It feels like an entry signal on its own.",
      consequence: "A wick is evidence of rejection — not a confirmed entry. Price can extend further in the wick direction before reversing. Entering on the wick alone means entering before the structure shift is confirmed, leading to premature entries and wide stops.",
    },
    guidedPractice: {
      scenario: "XAUUSD 4H. Price at 2,380. Candle forms: O=2,378, H=2,394, L=2,376, C=2,380. The level 2,390 was a prior high tested twice in the previous week.",
      steps: [
        "Calculate the upper wick size.",
        "Did the wick sweep the prior high at 2,390? By how much?",
        "What does the body tell you about conviction at the close?",
        "What does this wick tell you about institutional intent above 2,390?",
        "Is this wick alone sufficient to enter a short trade? What do you need to see next?",
      ],
      answer: "Upper wick: 2,394 − 2,380 = 14 points. Yes — swept the prior high at 2,390 by 4 points (stop hunt). Body: 2pt neutral/bullish — the close is near the open, sellers did not follow through strongly. Institutional intent: sellers rejected the area above 2,390, clearing retail stop losses before the close pulled back. The wick alone is NOT sufficient to short. You need: on 15M, a wick rejection candle followed by a candle closing below the nearest short-term swing low (micro-BOS bearish). The wick is the context. Confirmation is the entry.",
      whyItMatters: "Stop-hunt wicks at prior highs and lows are among the most reliable XAUUSD patterns. Learning to identify them — and wait for confirmation — separates traders who profit from them from traders who become the stop being swept.",
    },
    kitchenRush: {
      scenario: "4H candle: O=2,300, H=2,301, L=2,268, C=2,296.",
      task: "State: wick direction, wick size, what it means, what you wait for next. 25 seconds.",
      answer: "Lower wick. Size: 28pt (2,296−2,268) vs 4pt body. Means: sellers pushed hard below 2,300 — buyers stepped in at 2,268 and reclaimed. If bias is bullish: watch 15M for wick rejection + micro-BOS upward inside the AOI zone for long entry.",
      timeTarget: 25,
    },
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
    tradingChefIntro: "You can read candles. You can read wicks. Now Chef Goldie will teach you the most important skill in the kitchen: reading where you are in the story. Structure tells you if the market is going up, down, or sideways. Without that knowledge, every candle you read is meaningless context.",
    hook: "Market structure is the blueprint of every price move that has ever happened. Every trend, every reversal, every range — all of it is built from the same materials. Once you learn to read structure, every chart tells you exactly what it is doing and where it is likely going.",
    kitchenStory: "A building does not fall up — it follows gravity. A market follows structure. When a building is under construction, you can see the scaffold going up, floor by floor. When structure breaks — when a major beam collapses — the whole direction changes. Break of Structure (BOS) is when the market confirms it is continuing. Change of Character (CHOCH) is when the scaffold comes down and rebuilding starts in the other direction.",
    marketTranslation: "In an uptrend: price makes higher highs (HH) and higher lows (HL). A Break of Structure (BOS) to the upside confirms the trend continues. A Change of Character (CHOCH) — a break below the most recent higher low — signals potential reversal. Ranges form when price stops making progress in either direction. Expansion is when price breaks from a range with momentum.",
    guidedExample: {
      scenario: "XAUUSD Daily over 8 candles: Lows at 2,200 → 2,220 → 2,245. Highs at 2,290 → 2,310 → 2,335. Then the next low forms at 2,210 — below the previous low of 2,220.",
      question: "What was the structure before the final low? What changed when 2,210 formed?",
      answer: "Before 2,210: Bullish structure. Higher highs (2,290→2,310→2,335) AND higher lows (2,200→2,220→2,245). After 2,210: the most recent higher low (2,220) is broken. This is a Change of Character (CHOCH). The bullish sequence is broken. Bias shifts to neutral or bearish pending further confirmation.",
      trap: "Calling the CHOCH immediately as a sell signal. One lower low does not make a bearish structure. It breaks bullish structure. You wait for the sequence to confirm: a lower high must form before selling.",
      whyItMatters: "Structure is the only thing that tells you where you are in the market story. Without it, you are trading blindfolded.",
    },
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
    concept: {
      definition: "Market structure is the sequence of swing highs and swing lows that defines trend direction. Higher highs and higher lows (HH/HL) = bullish structure. Lower highs and lower lows (LH/LL) = bearish. A Break of Structure (BOS) confirms the trend continues. A Change of Character (CHOCH) signals the trend may be ending.",
      kitchenAnalogy: "Before planning the menu, the head chef checks the walk-in cooler: what is available, what is running low, what has turned? You cannot build the menu without that assessment. Structure is the walk-in check. Every timeframe, every session — read the cooler before you cook.",
      marketMeaning: "On the XAUUSD Daily: identify the last three swing highs and the last three swing lows. If each new high is higher than the previous and each new low is higher than the previous — bullish structure, bullish bias. If either the highs or lows break sequence — a CHOCH is forming. Both broke = new structure in the opposite direction.",
    },
    example: {
      scenario: "XAUUSD Daily over 6 weeks. Lows: 2,180 → 2,205 → 2,230. Highs: 2,260 → 2,290 → 2,320. Then a new low forms at 2,195 — below the prior HL of 2,205.",
      walkthrough: "Weeks 1–5: HH/HL confirmed — lows stepping up (2,180→2,205→2,230), highs stepping up (2,260→2,290→2,320). Bullish structure. Week 6: new low 2,195 breaks below the last HL of 2,205. This is a CHOCH. The bullish sequence is broken. Bias shifts to neutral immediately. Next confirmation needed: does a lower high (LH) form below 2,320? If yes — bearish structure begins.",
      keyTakeaway: "Structure does not care about your opinion. When structure changes, bias changes — immediately, no arguing with the chart.",
    },
    commonTrap: {
      mistake: "Calling a CHOCH immediately as a sell signal and entering short on the first lower low.",
      whyItHappens: "Breaking below the prior low looks and feels like a reversal. The impulse is to sell immediately.",
      consequence: "One lower low breaks bullish structure but does not confirm bearish structure. Price can form the lower low, then immediately reverse. Entering on CHOCH alone means entering before the new trend direction is confirmed. You need a subsequent lower high before selling structure.",
    },
    guidedPractice: {
      scenario: "XAUUSD 4H. Sequence (oldest to newest): Low 2,308, High 2,340, Low 2,330, High 2,362, Low 2,318, High 2,345. Current price 2,322.",
      steps: [
        "List the highs in order: 2,340 → 2,362 → 2,345.",
        "List the lows in order: 2,308 → 2,330 → 2,318.",
        "Are the highs trending up or down?",
        "Are the lows trending up or down?",
        "State the current structure and the CHOCH level.",
      ],
      answer: "Highs: 2,340 → 2,362 → 2,345. Last high (2,345) is below the prior high (2,362) — lower high. Lows: 2,308 → 2,330 → 2,318. Last low (2,318) is below the prior low (2,330) — lower low. Structure: LH + LL = bearish CHOCH. Prior bullish sequence broken. Bias shifts neutral-to-bearish. CHOCH level: 2,330 (prior HL that was broken). For full bearish confirmation: need price to form a second LH below 2,362 and break below 2,308 (BOS bearish).",
      whyItMatters: "Two-timeframe structure alignment — Daily and 4H both bearish — dramatically increases the probability of a short trade working. One timeframe alone is context. Two aligned = conviction.",
    },
    kitchenRush: {
      scenario: "Sequence: Low 2,200 → High 2,250 → Low 2,215 → High 2,270 → Low 2,230 → High 2,260. Current: 2,240.",
      task: "Bullish, bearish, or CHOCH? State in 15 seconds.",
      answer: "Highs: 2,250 → 2,270 → 2,260 (last high is lower — LH forming). Lows: 2,200 → 2,215 → 2,230 (all higher — HL intact). Mixed: higher lows but last high is lower. CHOCH warning — bullish structure weakening. Bias: neutral. Wait for next swing to confirm.",
      timeTarget: 15,
    },
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
    tradingChefIntro: "You learned structure. Now Chef Goldie teaches you what to do with it. Bias is the decision that structure produces. It is the single question you must answer before everything else: which direction is this kitchen cooking today? The entire Recipe depends on getting this right.",
    hook: "Every chef knows what they are cooking before they touch the stove. You need to know your directional bias before you look at a single lower-timeframe candle. Get this wrong and everything else is wasted effort.",
    kitchenStory: "Before a restaurant opens for the day, the chef decides: tonight we serve fish or tonight we serve steak. That decision — made before service begins — is bias. You do not walk in at 6PM and say 'what do I feel like cooking tonight?' You decide in the morning, based on what is fresh and what the customers want. The Daily chart is your morning decision.",
    marketTranslation: "Bias is your directional read on a market based on the higher timeframe (Daily, then 4H). Bullish bias: price is making higher highs and higher lows — you look for buys only. Bearish bias: lower highs and lower lows — sells only. Neutral: price is chopping in a range — you sit out. If bias is unclear, that IS your bias: no trade.",
    guidedExample: {
      scenario: "XAUUSD Daily. Last 6 swing highs: 2,280, 2,305, 2,330, 2,350, 2,370, 2,395. Last 5 swing lows between them: 2,260, 2,285, 2,310, 2,330, 2,348.",
      question: "What is the bias and why? State it in one sentence.",
      answer: "Bullish bias. Swing highs are sequentially higher (2,280→2,395) and swing lows are also sequentially higher (2,260→2,348). Both conditions confirmed — bullish structure = bullish bias. I look only for buy setups until structure changes.",
      trap: "Looking for sells because 'it has gone up too much' or 'it is overbought.' Bias is structure, not intuition.",
      whyItMatters: "A clear bias eliminates half of all trade decisions instantly. You only look for setups in one direction. This alone cuts poor trades by 40-60%.",
    },
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
    concept: {
      definition: "Bias is your directional decision for the session, derived from higher-timeframe structure. It answers one question before anything else: is this market going up, down, or nowhere? Bias is set on the Daily chart. It does not change because of a single lower-timeframe candle.",
      kitchenAnalogy: "Every morning before service, the chef decides: tonight we serve fish or steak. That decision — made before opening — is bias. You do not arrive at the stove at 6PM and improvise. You decide at home, based on what is available and what is in season. The Daily chart is your home kitchen decision.",
      marketMeaning: "Bullish bias: Daily HH/HL sequence confirmed — look for long setups only. Bearish bias: Daily LH/LL sequence confirmed — short setups only. Neutral: price in a range, structure unclear, or a CHOCH just formed — no trades. If you cannot state your bias clearly in 30 seconds from the Daily chart, your bias is neutral. Neutral means watch. Not trade.",
    },
    example: {
      scenario: "XAUUSD Weekly shows 3 consecutive HH/HL. Daily shows current pullback toward the last HL zone. 4H shows 5 corrective candles moving lower.",
      walkthrough: "Weekly: bullish (strongest read). Daily: bullish, currently in pullback within the trend. 4H: corrective delivery downward — delivering price toward a potential AOI at the Daily HL zone. Bias: BULLISH. The 4H move lower is not a reversal — it is an opportunity. You look for buys only. You wait for price to arrive at the AOI and produce a confirmation. You do not sell the pullback.",
      keyTakeaway: "Bias is top-down. Weekly informs Daily, Daily informs 4H, 4H informs 1H and 15M. Never work bottom-up. Never let a 15M candle change your Daily bias.",
    },
    commonTrap: {
      mistake: "Flipping Daily bias to bearish because of a strong 1H or 4H move against the trend.",
      whyItHappens: "The lower-timeframe counter-move feels significant. It looks like the trend is ending.",
      consequence: "You enter a counter-trend short inside a Daily bullish structure. The Daily trend resumes. You are stopped out at the exact low where the setup should have been a long entry. This is Melissa Mayhem's favorite environment.",
    },
    guidedPractice: {
      scenario: "XAUUSD Daily for 3 weeks. Week 1: H=2,300, L=2,250. Week 2: H=2,340, L=2,270. Week 3: H=2,365, L=2,295. Monday morning price: 2,305 (pulling back from Week 3 high).",
      steps: [
        "List the three swing highs in sequence.",
        "List the three swing lows in sequence.",
        "Are both sequences trending in the same direction?",
        "State your bias for the week and the structural reason.",
        "State the one price level that would force your bias to neutral.",
      ],
      answer: "Highs: 2,300 → 2,340 → 2,365 — each higher. HH sequence. Lows: 2,250 → 2,270 → 2,295 — each higher. HL sequence. Both trending up. Bias: BULLISH. Look for long setups only. Structural reason: confirmed HH/HL on the Daily. Invalidation price: 2,295 (most recent HL). If Daily closes below 2,295 — CHOCH. Bias shifts to neutral immediately and the long bias is abandoned.",
      whyItMatters: "Setting bias before the week starts means you are not making decisions under market pressure. You know what you are looking for before the market opens Monday.",
    },
    kitchenRush: {
      scenario: "Daily shows: HH at 2,380, HH at 2,410. HL at 2,340, HL at 2,370. Current price 2,375 pulling back.",
      task: "State bias and the one price that cancels it. 10 seconds.",
      answer: "Bias: BULLISH (HH/HL confirmed). Cancellation: 2,370 — if Daily closes below the most recent HL, CHOCH forms, bias goes neutral.",
      timeTarget: 10,
    },
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
    tradingChefIntro: "Bias tells you what direction to cook. Flow — what Louie calls liquidity — tells you where the kitchen is heading next and why. Louie has one of the most valuable skills in this building: he can see where price is drawn before it gets there. That is what this lesson teaches.",
    hook: "Markets do not move randomly. They move with purpose — toward liquidity. Old highs, old lows, equal levels. Once you see liquidity pools, you cannot unsee them. And once you track the flow, you move with the smart money instead of against it.",
    kitchenStory: "Water always flows downhill to the lowest point. In a city, water is collected in reservoirs. In markets, liquidity is collected at price levels where lots of people placed stop losses or pending orders. The market — like water — flows toward those collection points. Louie's job is to spot the reservoir before the water reaches it.",
    marketTranslation: "Liquidity pools form wherever retail traders predictably place their stop losses: above the previous day's high (PDH), below the previous day's low (PDL), above equal highs, below equal lows. Smart money sweeps these levels to fill their own large orders, then reverses. The sweep is the flow. After the sweep comes the real move.",
    guidedExample: {
      scenario: "XAUUSD 4H. Previous Day High (PDH): 2,380. Previous Day Low (PDL): 2,340. There are two equal highs at 2,375 and two equal lows at 2,343. Current price: 2,358 (in the middle).",
      question: "Where is more liquidity — above or below price? Where is price likely drawn first?",
      answer: "Above: PDH at 2,380 AND equal highs at 2,375 — two pools above. Below: PDL at 2,340 AND equal lows at 2,343 — two pools below. Both sides have equal liquidity. Without a clear bias lean, this is a wait-and-see situation. If bias is bullish → price likely sweeps the lows first to collect that liquidity before pushing to new highs.",
      trap: "Assuming price goes straight to the highest liquidity pool. Price often sweeps the nearest pool first (fakeout) before the real move.",
      whyItMatters: "Knowing where liquidity sits tells you where smart money is likely going to move price BEFORE it gets there. That is the edge.",
    },
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
    concept: {
      definition: "Liquidity pools are price levels where retail traders predictably cluster their stop losses and pending orders — above old highs, below old lows, at equal highs and equal lows. Institutions move price to these pools to fill their large orders, then reverse. Following the flow means knowing where those pools are before price arrives.",
      kitchenAnalogy: "Louie knows where every restaurant stores its walk-in cooler. Smart suppliers do not cold-call randomly — they go where the inventory is concentrated. Liquidity pools are the market's walk-in coolers. Price flows toward them because that is where the large orders are waiting to be filled.",
      marketMeaning: "On XAUUSD 4H: Previous Day High (PDH) and Previous Day Low (PDL) are the most reliable daily pools. Equal highs (two candle highs at the same level) and equal lows (two troughs at the same level) are secondary pools. A sweep — a wick that pierces the pool level and closes back — followed by reversal is one of the most reliable patterns on XAUUSD.",
    },
    example: {
      scenario: "XAUUSD 4H. PDH: 2,385. PDL: 2,345. Equal highs at 2,380 (two prior peaks). Equal lows at 2,348 (two prior troughs). Current price: 2,362. Bias: bullish.",
      walkthrough: "Above: dense pool zone 2,380–2,385 (equal highs + PDH stacked). Below: dense pool zone 2,345–2,348 (PDL + equal lows stacked). Both sides have similar pool density. With bullish bias: smart money is more likely to sweep the lows first — taking out retail longs' stops at 2,345–2,348 — before pushing toward the highs at 2,380–2,385. Flow: expect price to move toward 2,345–2,348 first. That sweep is not a sell. It is the setup for the long.",
      keyTakeaway: "When bias is bullish, a sweep of lows is a gift — it clears the liquidity needed to fuel the real move up. Do not sell the sweep. Prepare to buy after the sweep reverses.",
    },
    commonTrap: {
      mistake: "Selling when price sweeps equal lows because the move looks like bearish momentum.",
      whyItHappens: "The downside move feels real. Retail instinct is to follow the candle direction.",
      consequence: "You sell the sweep. Institutions collect your short order at the low. Price reverses upward within 1–2 candles. You are now short in a bullish market, stopped out at the very high where the next leg up begins.",
    },
    guidedPractice: {
      scenario: "XAUUSD 4H. Bullish bias. Pools identified: Equal highs 2,400 (three prior peaks). PDH 2,395. Equal lows 2,368 (two prior troughs). PDL 2,365. Current price: 2,380.",
      steps: [
        "Mark each pool and its distance from current price (2,380).",
        "Which side has more pool density — above or below?",
        "With bullish bias, which direction does Louie say price sweeps first?",
        "Describe the sweep scenario: where does price go, what happens at that level, where does it reverse?",
        "Where do you watch for the reversal confirmation?",
      ],
      answer: "Above: 2,395 (+15pt) and 2,400 (+20pt) — dense zone 2,395–2,400. Below: 2,365 (−15pt) and 2,368 (−12pt) — dense zone 2,365–2,368. Both sides similar density, below is slightly closer. With bullish bias: sweep lows first. Scenario: price drops from 2,380 into 2,363–2,368, creates long lower wicks sweeping equal lows and PDL, then reverses. Watch: as price enters 2,365–2,368 zone, drop to 15M and wait for wick rejection + micro-BOS upward. That is the long trigger.",
      whyItMatters: "Understanding that a bearish sweep of lows inside a bullish bias is the setup — not the trade — changes everything. You are positioned for the real move before it happens instead of chasing it after.",
    },
    kitchenRush: {
      scenario: "Bullish bias. PDH 2,350, PDL 2,310. Equal highs 2,348. Equal lows 2,312. Price at 2,330.",
      task: "Name both pool zones and which direction price sweeps first. 20 seconds.",
      answer: "Above pools: 2,348–2,350 zone. Below pools: 2,310–2,312 zone. With bullish bias: price sweeps the lows first (2,310–2,312). Watch for 15M wick rejection + micro-BOS upward at that zone for long entry.",
      timeTarget: 20,
    },
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
    character: 'chef-goldie',
    color: '#F97316',
    icon: '🏡',
    tradingChefIntro: "You have your bias. You can read the flow. Now Chef Goldie teaches you the most important discipline in the kitchen: patience. An AOI is not where price is right now. It is where price needs to come for the trade to make sense. You mark it. You wait. You do not chase.",
    hook: "The most common mistake new traders make is buying in the wrong zone. Chef Goldie has one rule: never overpay. In trading, the zone you enter from determines everything — your risk, your reward, your probability.",
    kitchenStory: "A great chef does not buy ingredients at peak price when they know the market will discount them later. She visits early, before the rush, and pays for value — not urgency. Your Area of Interest is the trading equivalent of that early morning visit: the zone where price is at a discount, where the value is real, where the trade makes sense.",
    marketTranslation: "An AOI is a price zone where multiple confluences stack: a Discount zone (below the 50% midpoint of a range), a Leftover Container (FVG — an unfilled gap from a fast move), and previous structure support. One factor is a guess. Three factors is a zone worth waiting for. The AOI is where you set your limit orders and walk away from the screen.",
    guidedExample: {
      scenario: "XAUUSD 4H. Bullish bias. Current swing range: Low at 2,300, High at 2,400. There is a Leftover Container (FVG) between 2,325 and 2,333 from a fast impulse up candle 3 days ago.",
      question: "Where is the AOI? What makes it valid?",
      answer: "Discount zone: 50% midpoint of 2,300-2,400 range = 2,350. Everything below 2,350 is discount. AOI: the Leftover Container at 2,325-2,333 sits within the discount zone. Two confluences stack here: (1) Discount zone, (2) Leftover Container. This qualifies as a valid AOI. Mark 2,325-2,333 as the zone to watch for price to return to.",
      trap: "Marking the current price level as the AOI because 'it looks like support.' An AOI requires stacking confluences — not intuition.",
      whyItMatters: "Entering from a qualified AOI vs. entering at market price can be the difference between a 1:2 and a 1:4 risk/reward on the same trade.",
    },
    visualGuide: "On XAUUSD 4H: (1) Identify the current swing range (last significant high to last significant low). (2) Find the 50% midpoint — price below this is Discount on a bullish bias. (3) Look for any Leftover Containers (gaps between candle bodies) in the Discount zone. Where the gap and the 50% level overlap — that is your AOI.",
    characterCoaching: "Chef Goldie says: 'I wait for the discount. I mark my AOI on Sunday night and I do not move it no matter what the market does Monday morning. If price comes to my zone — I evaluate my confirmation. If price does not come — I did not miss anything. I saved my execution for the right opportunity. There is always another setup next week.'",
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
    psychologyNote: "Moving your AOI to chase price is the same as paying full price because you missed the discount window. The value is gone. Wait for the next setup.",
    riskWarning: "BURN ALARM: An AOI with only one reason (e.g., 'it looks like support') is not an AOI — it is a guess. Require minimum two stacking confluences before calling something an AOI.",
    concept: {
      definition: "An Area of Interest (AOI) is a price zone — not a line — where multiple confluences stack to create a high-probability trade location. The AOI is where you want price to arrive. You mark it before the session. You wait for price to come to you. You do not chase price to it.",
      kitchenAnalogy: "Chef Goldie does not cook anywhere in the kitchen at any time. She picks the exact station, the right prep window, the correct ingredient combination. An AOI is that intersection — where the discount zone, the leftover container, and prior structure all occupy the same 10–15 point range. She sets up there and waits. Everywhere else is the wrong spot.",
      marketMeaning: "A valid AOI on XAUUSD requires minimum two stacking confluences: (1) Discount zone — below the 50% midpoint of the current swing range (for buys), (2) Leftover Container — an unfilled price gap from a fast impulse move, (3) Prior structure — a swing low or support zone. One reason = a location. Two or more reasons = an AOI worth waiting for.",
    },
    example: {
      scenario: "XAUUSD 4H. Bullish bias. Swing low: 2,280. Swing high: 2,380. Midpoint: 2,330. Leftover Container (FVG): 2,318–2,326 from a fast upside impulse 4 days ago. Prior swing low at 2,320 (from 2 weeks ago).",
      walkthrough: "Discount zone: everything below 2,330. LFC at 2,318–2,326: fully inside discount zone ✓. Prior swing low at 2,320: sits inside the LFC range ✓. Three confluences in the same 8-point zone. Mark AOI as 2,316–2,326 (add small buffer below LFC low). Set a price alert at 2,332 (approaching from above). Close the platform. Do not watch.",
      keyTakeaway: "Three confluences stacked in the same zone is exceptional. Mark it, set the alert, close the chart. The AOI does the work while you are away.",
    },
    commonTrap: {
      mistake: "Marking a single 'prior support' level as an AOI because price bounced there before.",
      whyItHappens: "Prior bounces make a level feel significant. It looks clean and obvious.",
      consequence: "A single bounce is one data point. Without additional confluence it holds approximately 50% of the time — which is not an edge. Real AOIs have stacked reasons. Single-reason levels are guesses with good-looking names.",
    },
    guidedPractice: {
      scenario: "XAUUSD 4H. Bullish bias. Swing low: 2,340. Swing high: 2,420. You identify: FVG at 2,368–2,374 from a fast upside candle 3 days ago. Prior swing low from last week at 2,370.",
      steps: [
        "Calculate the 50% midpoint of the 2,340–2,420 range.",
        "Is the FVG (2,368–2,374) in the discount zone?",
        "Is the prior swing low (2,370) in the discount zone?",
        "How many confluences stack in the 2,368–2,374 zone?",
        "Define the AOI boundaries. State what you do after marking it.",
      ],
      answer: "Midpoint: (2,340 + 2,420) ÷ 2 = 2,380. Discount zone: below 2,380. FVG 2,368–2,374: YES, in discount ✓. Prior swing low 2,370: inside FVG range and in discount ✓. Confluences: 3 (discount zone + FVG + prior structure). AOI: 2,365–2,374 (3pt buffer below FVG low). After marking: set price alert at 2,378 (approaching from above), close the platform, prepare confirmation criteria. Do NOT watch the chart approach.",
      whyItMatters: "Closing the platform after marking the AOI is professional discipline. The watch game erodes judgment. Alerts do the watching. You make the decision only when price is in the zone and confirmation is forming.",
    },
    kitchenRush: {
      scenario: "Range: low 2,300, high 2,400. Midpoint 2,350. FVG at 2,328–2,335. Prior swing low at 2,332.",
      task: "Valid AOI? How many confluences? AOI boundaries? Alert level? 15 seconds.",
      answer: "Valid — 3 confluences: discount (below 2,350) + FVG (2,328–2,335) + prior structure (2,332). AOI: 2,325–2,335. Alert: set at 2,342.",
      timeTarget: 15,
    },
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
    character: 'wickie',
    color: '#22C55E',
    icon: '📦',
    tradingChefIntro: "AOI is marked. Now Wickie returns with something new: how does price arrive at your zone? Not all deliveries are the same. A rushed, choppy delivery is suspicious. A clean, impulsive delivery heading toward your AOI — that is a kitchen in motion. Wickie reads the packaging before he touches anything.",
    hook: "Two trades. Same direction. Same level. One makes money, one loses. The difference? Delivery. How price arrives at your AOI tells you everything about whether the move is real or a trap. Candle Kid reads delivery like a weather report — and it never lies.",
    kitchenStory: "When the restaurant receives a delivery, the quality is in the packaging. Fresh ingredients arrive in clean, intact boxes — impulsive delivery. Old or questionable ingredients arrive crushed and slow — corrective delivery. You can tell from the box whether what is inside is worth using. The candles are the boxes.",
    marketTranslation: "Impulsive delivery: strong, consecutive candles closing near their highs (bullish) or lows (bearish), with momentum and purpose. This shows institutional intent. Corrective delivery: overlapping, choppy candles that barely move net-net. This is either accumulation or distribution — wait, do not trade. Session opens (The Kitchen Is Open) produce the cleanest impulsive delivery.",
    guidedExample: {
      scenario: "Scenario A: 5 candles approach your AOI. Each closes within 2-3 points of its open. Bodies overlap with the previous candle. 3 green, 2 red mixed in. Scenario B: 4 candles approach your AOI. Each one closes near its high, body covers 8-12 points. All 4 are green. Minimal overlap.",
      question: "Which is impulsive delivery? Which is corrective? What do you do with each?",
      answer: "Scenario A is corrective: overlapping candles, mixed direction, small bodies = indecision or distribution. Do NOT enter from corrective delivery — wait for it to resolve. Scenario B is impulsive: large bodies, one direction, strong closes = institutional intent. Delivery to your AOI with this quality = high-probability setup to watch for confirmation.",
      trap: "Entering on corrective delivery because price is 'near your AOI.' The zone means nothing if the delivery says uncertainty.",
      whyItMatters: "Impulsive delivery into an AOI tells you institutions are moving price with intent. Corrective delivery says they are not ready yet — or they are distributing to trap retail.",
    },
    visualGuide: "On XAUUSD 1H, look at the last major move to a key level. Count the candles involved. Are most of them closing in the direction of the move with large bodies and short wicks? Or are the candles small-bodied, alternating direction, overlapping? The first is impulsive. The second is corrective.",
    characterCoaching: "Wickie says: 'I never enter into corrective delivery. If the candles are choppy and overlapping — Melissa Mayhem is cooking. She wants you to guess direction in the chop. I wait for impulsive candles, clean moves, purpose. When three or four big bodies appear in a row heading toward my AOI — that is my signal to get ready. The delivery has arrived.'",
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
    concept: {
      definition: "Delivery is the quality of price movement — how price travels to and from key levels. Impulsive delivery: large consecutive candles closing in one direction with minimal overlap — institutional intent. Corrective delivery: small overlapping alternating candles — consolidation, indecision, or distribution. The delivery tells you whether the move is real before you engage.",
      kitchenAnalogy: "A restaurant receives daily deliveries. Fresh ingredients arrive in sealed intact boxes — impulsive. Day-old stock arrives crumpled, mixed, falling apart — corrective. You can read the packaging before opening it. The candles are the packaging. Wickie reads every candle like a shipping label.",
      marketMeaning: "Impulsive delivery into your AOI on XAUUSD 1H: large bodies, one direction, closes near the high or low of each candle, minimal body overlap. This shows institutional order flow pushing price toward your zone. Corrective delivery: overlapping small-body candles alternating color. This is chop — do not trade it. Wait for it to resolve impulsively.",
    },
    example: {
      scenario: "AOI at 2,340–2,348. Over 8 hours: Hours 1–4: candles 3–4pt average, alternating green/red, heavy overlap. Hours 5–8: four consecutive bearish candles, 12–15pt bodies each, closes near lows, no overlap.",
      walkthrough: "Hours 1–4: corrective. Small bodies, alternating direction, overlapping — not institutional. No trade consideration. Hours 5–8: impulsive. Large bodies, one direction (bearish), closes near lows — institutional selling delivering price toward the AOI. This is the 'truck departing the warehouse' phase. With bullish bias, this impulsive bearish delivery is not the trade direction — it is price being delivered to the buy zone. Prepare: when price enters 2,340–2,348, switch to 15M for confirmation.",
      keyTakeaway: "Impulsive delivery in the opposite direction of your bias means price is being delivered to your AOI with conviction. Do not trade the delivery. Wait for arrival and confirmation.",
    },
    commonTrap: {
      mistake: "Selling when large bearish candles appear delivering price toward a bullish AOI.",
      whyItHappens: "Large red candles feel like a reversal. The momentum is bearish. It appears obvious to sell.",
      consequence: "You sell the delivery. Institutions buy at your AOI. You are stopped out at the exact level where the long setup begins. This is the most common Melissa Mayhem trap in this lesson.",
    },
    guidedPractice: {
      scenario: "Bullish bias. AOI: 2,360–2,368. Price at 2,395. Six 1H candles approach: C1 bearish 14pt body, C2 bearish 11pt body, C3 bearish 9pt body, C4 bearish 16pt body — all closing near their lows, no overlap. C5: bearish 3pt body, overlapping wicks. C6: bullish 2pt body, overlapping wicks.",
      steps: [
        "Assess C1–C4 delivery type.",
        "Assess C5–C6 delivery type.",
        "What changed between C4 and C5?",
        "What does the delivery shift tell you about price relative to your AOI?",
        "What do you do now — enter, wait, or mark a level?",
      ],
      answer: "C1–C4: IMPULSIVE — large bodies, same direction, no overlap. Institutional selling delivering price toward AOI. C5–C6: CORRECTIVE — small mixed bodies, overlapping. Delivery ended. Momentum slowed. The shift C4→C5: impulsive delivery is ending — price is approaching or entering the AOI zone (2,360–2,368) and decelerating. Do now: do NOT enter. Switch to 15M. Watch for price to enter the AOI zone and form a wick rejection candle followed by a micro-BOS upward. That is the confirmation. This is Step 5.",
      whyItMatters: "Corrective delivery after impulsive delivery is the market pausing at a key level. That pause is where the confirmation play sets up. Recognizing the delivery shift is the difference between entering at the right time and entering into ongoing chop.",
    },
    kitchenRush: {
      scenario: "5 consecutive candles: all bearish, bodies 8–14pt, closes near lows, zero body overlap.",
      task: "One word: impulsive or corrective? What does this tell you? 10 seconds.",
      answer: "IMPULSIVE. Institutional intent — either trend continuation or delivery toward a key zone. Do not trade against it without a valid AOI and confirmation on lower timeframe.",
      timeTarget: 10,
    },
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
    tradingChefIntro: "Bias. Flow. AOI. Delivery. Four steps completed. Wickie now teaches you the final gatekeeping step before action. Confirmation. Without it, you are anticipating — not trading. Wickie has saved more accounts by waiting for two things than any other lesson in this kitchen will.",
    hook: "This is where most traders fail. They get the bias right. They find the AOI. They watch the delivery arrive. And then they jump in one candle too early — before confirmation. Wickie has one rule: if you did not see the confirmation, you did not see the entry. Period.",
    kitchenStory: "A chef does not serve a dish until they taste it. The AOI gets you to the tasting stage. Confirmation is the taste. It tells you: yes, this is ready to serve. Without that taste — the dish might still be raw. You might be serving something that is not ready. Confirmation is the quality check before service.",
    marketTranslation: "Confirmation is a micro-structure shift on a lower timeframe (15M or 5M) after price reaches your AOI. A bullish confirmation: price hits your AOI, creates a wick rejection, then breaks above the nearest short-term swing high. Bearish: price hits AOI, wick rejection, breaks below nearest short-term swing low. One wick alone is not confirmation. One micro-BOS alone is not confirmation. Both together — that is confirmation.",
    guidedExample: {
      scenario: "15M chart. Price enters your AOI at 2,330-2,333. Candle 1: opens at 2,332, drops to 2,329 (below your AOI), closes at 2,334 — creating a 5-point lower wick. Candle 2: opens at 2,334, closes at 2,337 (above Candle 1's high of 2,336).",
      question: "Do you have confirmation? Which elements are present?",
      answer: "YES — confirmation is valid. Element 1 (wick rejection): Candle 1 created a long lower wick, reaching below the AOI to 2,329 and closing back inside at 2,334 — rejection confirmed. Element 2 (micro-BOS): Candle 2 closed at 2,337, above Candle 1's high of 2,336 — micro structure broken to the upside. Entry is valid at the close of Candle 2 (2,337). Burn Point sits below the wick low: 2,328.",
      trap: "Entering at the wick alone (after Candle 1 closes). The wick is not confirmation — it is signal that confirmation is possible. Wait for the micro-BOS.",
      whyItMatters: "The micro-BOS after the wick rejection is what separates a qualified entry from a guess. Wickie has missed many trades waiting for it. He has also avoided far more bad ones.",
    },
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
    concept: {
      definition: "Confirmation is a two-part micro-structure signal on a lower timeframe (15M) that proves price has rejected the AOI and is beginning to reverse. Part 1: a wick rejection candle — price wicks below the AOI boundary and closes back inside. Part 2: a micro-BOS — the next candle closes above the high of the wick rejection candle. Both together = confirmation. One alone = wait.",
      kitchenAnalogy: "The AOI gets you to the tasting stage. Confirmation is the taste. The chef does not serve a dish until they taste it — even when the timer says it is ready and the aroma smells right. The taste is the final check. Without confirmation, the trade might still be raw.",
      marketMeaning: "On XAUUSD 15M for a bullish setup: price enters AOI, forms a candle with a lower wick that penetrates below the AOI low and closes back inside, then the next candle closes above the first candle's high. Entry is at the close of the second candle. Burn Point sits 2pt below the wick low. This two-candle sequence is the only entry trigger.",
    },
    example: {
      scenario: "AOI: 2,330–2,338. C1 (15M): O=2,332 H=2,335 L=2,327 C=2,334. C2 (15M): O=2,334 H=2,339 L=2,332 C=2,338.",
      walkthrough: "C1 wick rejection: opens inside AOI at 2,332, wicks to 2,327 (below the 2,330 AOI boundary), closes back inside at 2,334. Part 1 CONFIRMED — AOI held, buyers defended. C2 micro-BOS: opens at 2,334, closes at 2,338 — above C1's high of 2,335. Part 2 CONFIRMED — micro-structure broken upward. Entry: 2,338 (close of C2). Burn Point: 2,327 − 2 = 2,325. Both parts confirmed in two candles. The pass is now valid.",
      keyTakeaway: "Entry is at the close of the micro-BOS candle. Never the open. The close confirms the break. The open is a prediction.",
    },
    commonTrap: {
      mistake: "Entering at the close of the wick rejection candle (C1), before the micro-BOS forms.",
      whyItHappens: "The wick rejection looks like the reversal signal. Waiting one more candle feels like missing the entry.",
      consequence: "C1 closes and price continues lower. A second wick forms. Then a third. You averaged down on a position that never had confirmation. Your Burn Point is hit before the actual micro-BOS ever forms.",
    },
    guidedPractice: {
      scenario: "AOI: 2,378–2,386. Price arrives. C-A (15M): O=2,381 H=2,383 L=2,374 C=2,380. C-B (15M): O=2,380 H=2,382 L=2,378 C=2,381. C-C (15M): O=2,381 H=2,388 L=2,379 C=2,387.",
      steps: [
        "Does C-A qualify as a wick rejection? Check: (1) did it wick below the AOI low of 2,378? (2) did it close back inside?",
        "Does C-B qualify as a micro-BOS? It must close ABOVE C-A's HIGH of 2,383.",
        "Does C-C qualify as a micro-BOS? Check C-C close vs C-A high.",
        "Which candle is the entry candle and what is the entry price?",
        "Place the Burn Point.",
      ],
      answer: "C-A wick rejection: wicked to 2,374 (below 2,378 boundary) ✓, closed back inside at 2,380 ✓. Part 1 CONFIRMED. C-B micro-BOS: closes at 2,381 — C-A's high was 2,383. 2,381 < 2,383. FAILS. C-B is not a valid BOS. C-C micro-BOS: closes at 2,387 — above C-A's high of 2,383 ✓. Part 2 CONFIRMED on C-C. Entry: 2,387 (close of C-C). Burn Point: 2,374 − 2 = 2,372.",
      whyItMatters: "The micro-BOS must clear the wick candle's HIGH — not just its open or close. This precise rule filters out dozens of false entries per month that look like confirmations but are not.",
    },
    kitchenRush: {
      scenario: "AOI: 2,340–2,348. C1: O=2,344 H=2,347 L=2,337 C=2,345. C2: O=2,345 H=2,350 L=2,343 C=2,349.",
      task: "Confirmation present? Entry price? Burn Point? 20 seconds.",
      answer: "C1 wick rejection: wicked to 2,337 (below 2,340) ✓, closed inside at 2,345 ✓. C2 micro-BOS: closed 2,349 above C1 high of 2,347 ✓. CONFIRMED. Entry: 2,349. BP: 2,337 − 2 = 2,335.",
      timeTarget: 20,
    },
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
    character: 'penny-stacks',
    warningCharacter: 'burn-alarm',
    color: '#c0392b',
    icon: '🔔',
    tradingChefIntro: "You have your entry setup. Before you place one single trade, Penny Stacks requires you to pass through this lesson first. Risk is not a suggestion. It is the foundation that keeps the kitchen open. She has watched more talented traders than you blow their accounts by skipping what you are about to learn.",
    hook: "Risk management is not optional. It is the only reason any trader survives long enough to become profitable. Penny Stacks has one rule she never breaks: it is not about how much you make — it is about how much you keep. The traders who blow accounts are almost never wrong about direction. They are wrong about size.",
    kitchenStory: "A restaurant that burns through its entire budget on one dish service is not a restaurant for long. Penny Stacks runs her kitchen like a business. She never bets the whole kitchen on one plate. She risks a small, controlled portion of her resources each service — enough to grow over time, small enough that one bad night does not close the restaurant.",
    marketTranslation: "The Burn Point (stop loss) is placed at the level that, if hit, proves the trade was wrong. Not just uncomfortable — wrong. For a bullish trade from an AOI, the Burn Point sits below the AOI. For a bearish trade, above. Risk no more than 1-2% of account balance on any single pass. Position size is calculated backward from your Burn Point — not from how many contracts feel right.",
    guidedExample: {
      scenario: "Account: $5,000. Maximum risk per trade: 1% = $50. XAUUSD entry: 2,340. Burn Point: 2,330 (10-point stop). XAUUSD pip value: approximately $1 per pip per 0.01 lot (micro lot).",
      question: "What is the correct position size? Show the math.",
      answer: "Step 1: Risk amount = $5,000 × 1% = $50. Step 2: Distance to Burn Point = 2,340 - 2,330 = 10 points. Step 3: Position size = $50 ÷ $10 (value per point per 0.01 lot × 10 points) = 5 micro lots (0.05 lots). If the trade hits the Burn Point, you lose $50 — exactly 1% of account. If it hits 2R target at 2,360, you gain $100.",
      trap: "Choosing position size based on 'how confident I feel.' Confidence is Melissa Mayhem's favorite variable. The math is always the answer.",
      whyItMatters: "Position sizing from the Burn Point is the only approach that keeps your risk consistent regardless of how big or small the setup looks.",
    },
    visualGuide: "Before placing any trade: (1) Identify your entry (The Pass). (2) Identify your Burn Point — below the lowest point of your AOI for buys, above the highest point for sells. (3) Calculate the distance in pips/points. (4) Calculate the position size so that hitting the Burn Point costs no more than 1-2% of your total account.",
    characterCoaching: "Penny Stacks says: 'I have seen traders with a 70% win rate go broke. You know how? They risk 10% on the losers and 1% on the winners. The math destroys them. I risk the same percentage on every single trade. Always. No exceptions. Not when I am confident. Not when I am on a winning streak. Always the same. That is discipline. That is what keeps the kitchen open.'",
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
    concept: {
      definition: "Risk management determines how much of your account you are willing to lose on a single trade, then calculates position size backward from your Burn Point to match that exact dollar amount. It is not optional. It is the operating system that keeps you trading after losses.",
      kitchenAnalogy: "Penny Stacks never bets the whole kitchen on one service. She reserves the budget. She never orders more inventory than a week can sell. The kitchen stays open even after a bad night because the math was right before service started. Risk management is kitchen budgeting — calculated, consistent, zero emotion.",
      marketMeaning: "Formula: (1) Risk amount = account × 1–2%. (2) Distance = entry − Burn Point in points. (3) Dollar risk per micro lot = distance × pip value. (4) Lot size = risk amount ÷ dollar risk per micro lot (round DOWN). Every trade uses this formula. Confidence in the setup never changes the percentage.",
    },
    example: {
      scenario: "Account $8,000. Max risk 1% = $80. Entry: 2,340. Burn Point: 2,326 (14 points below). XAUUSD pip value: $1 per 0.01 lot per point.",
      walkthrough: "Risk amount: $8,000 × 1% = $80. Distance: 2,340 − 2,326 = 14pt. Dollar risk per micro lot: 14 × $1 = $14. Lot size: $80 ÷ $14 = 5.71 → round down to 5 micro lots (0.05 lots). Verify: 5 × $14 = $70 actual risk — within 1% ✓. If Burn Point hit: lose $70. If 2R target (2,368) hit: gain $140. The account survives either outcome.",
      keyTakeaway: "Always round DOWN on lot size. Never round up. The market does not owe you the extra size, and the extra size is the difference between a controlled loss and an oversized one.",
    },
    commonTrap: {
      mistake: "Increasing position size on setups that 'look really good' or after a winning streak.",
      whyItHappens: "High confidence feels like it deserves more size. A winning streak feels like a signal to scale up.",
      consequence: "No setup is guaranteed. Oversizing a high-confidence setup and losing converts a 1% loss into a 5% loss. Consecutive oversized losses after winning streaks are the most common account-destruction pattern.",
    },
    guidedPractice: {
      scenario: "Account $12,000. Max risk 1%. Entry: 2,285. Burn Point: 2,270. Pip value $1/0.01 lot/pt. First Tables Served: 2,315.",
      steps: [
        "Calculate the dollar risk amount.",
        "Calculate distance from entry to Burn Point in points.",
        "Calculate dollar risk per micro lot.",
        "Calculate lot size and round down.",
        "Verify: loss if Burn Point hit. Gain if 2R (2,315) hit.",
      ],
      answer: "Risk amount: $12,000 × 1% = $120. Distance: 2,285 − 2,270 = 15pt. Per micro lot: 15 × $1 = $15. Lot size: $120 ÷ $15 = 8 micro lots (0.08 lots). BP loss: 8 × $15 = $120 ✓ (exactly 1%). 2R gain: (2,315 − 2,285) = 30pt. 8 × 30 × $1 = $240. R:R = 1:2 ✓.",
      whyItMatters: "Running this math before every trade builds the habit that keeps you alive through losing streaks. Five losses at 1% leaves 95% of the account intact. Five losses at 5% leaves 77%. That difference compounds — in both directions.",
    },
    kitchenRush: {
      scenario: "Account $5,000. 1% risk. Entry 2,310. Burn Point 2,298. Pip value $1/0.01 lot/pt.",
      task: "Lot size in 15 seconds.",
      answer: "Risk: $50. Distance: 12pt. Per micro lot: $12. Lot size: $50 ÷ $12 = 4.16 → 4 micro lots (0.04 lots).",
      timeTarget: 15,
    },
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
    tradingChefIntro: "Risk is calculated. Burn Point is set. Now Chef Goldie completes the pre-entry sequence with The Pass itself — how to enter with precision, not emotion. The Pass is a reward for completing the Recipe. Every step before this was preparation. This step is execution.",
    hook: "The Pass is not an impulse. It is the result of a complete Recipe. You have done the work: Bias set, Flow mapped, AOI marked, Delivery read, Confirmation received. The Pass is the reward for all of that patience. Chef Goldie says: make it count.",
    kitchenStory: "After hours of prep — mise en place, temperatures calibrated, timing lined up — the chef finally calls the pass. Every element is ready. The dish goes out. The Pass in trading is that moment. Everything is prepared. You execute. Not before. Not after. Exactly at the moment the system says: now.",
    marketTranslation: "The Pass (entry) is placed at the first candle close above the micro-BOS after confirmation, or via limit order at the top of the AOI zone. Your Burn Point goes below the wick low that produced your confirmation. Risk-to-reward minimum 1:2. Calculate your position size from the Burn Point first. Then place the trade. In that order.",
    guidedExample: {
      scenario: "From the previous lesson: AOI at 2,330-2,333. Confirmation: wick to 2,329, closed back at 2,334 (Candle 1). Micro-BOS candle closes at 2,337 (Candle 2). Account $5,000. Max risk 1% = $50.",
      question: "Write out the complete pass: Entry, Burn Point, Risk in points, Risk in dollars, First Tables Served.",
      answer: "Entry (The Pass): 2,337 (close of confirmation candle, micro-BOS). Burn Point: 2,328 (below the wick low of 2,329, minus 1 point buffer). Risk: 2,337 - 2,328 = 9 points. Position size: $50 ÷ $9 ≈ 5.5 micro lots → round to 5 micro lots ($45 risk). First Tables Served: 2,337 + (9 × 2) = 2,355 (2R). Second Tables Served: next liquidity pool (e.g., previous high at 2,370).",
      trap: "Entering at the open of Candle 2 instead of the close. Entry at candle close ensures the micro-BOS is confirmed, not just attempted.",
      whyItMatters: "The Pass executed at the right price with the right size is what separates a professional kitchen from an amateur one. Every variable is pre-calculated. Nothing is improvised.",
    },
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
    concept: {
      definition: "The Pass is the execution moment — placing the entry order after all preceding Recipe steps are complete. It is not an impulse. It is the output of a complete system. By the time you place The Pass, every variable is already decided: entry price, Burn Point, lot size, and Tables Served levels.",
      kitchenAnalogy: "After hours of prep — mise en place, temperatures calibrated, timing locked — the head chef calls the pass. The dish is ready. You execute. Not before the prep is done. Not after the window closes. Exactly at the moment the system says: now. The Pass is the one moment where preparation becomes action.",
      marketMeaning: "On XAUUSD: entry (The Pass) is placed at the close of the micro-BOS confirmation candle. Limit or market order at that close price. Burn Point is already set. Tables Served levels are already marked. Lot size is already calculated. The Pass is Step 6 — not Step 1.",
    },
    example: {
      scenario: "Complete Recipe: Daily bullish. 4H: equal lows at 2,360. AOI: 2,358–2,366 (FVG in discount). 1H: impulsive bearish delivery into AOI. 15M: wick to 2,355, micro-BOS close at 2,369. Account $6,000, 1% = $60. BP: 2,353.",
      walkthrough: "The Pass: 2,369 (micro-BOS close). BP: 2,353. Risk: 2,369 − 2,353 = 16pt. Lot size: $60 ÷ $16 = 3.75 → 3 micro lots. First TS: 2,369 + (16 × 2) = 2,401 (2R). Second TS: next liquidity pool (equal highs at 2,415). Order placed: 3 micro lots long at 2,369. Stop at 2,353. Partial TP at 2,401. Plan documented. Trade active.",
      keyTakeaway: "If you cannot write out the full trade plan in 60 seconds before placing the order, you are not ready. Speed in execution comes from preparation, not impulse.",
    },
    commonTrap: {
      mistake: "Entering at the OPEN of the micro-BOS candle instead of waiting for its close.",
      whyItHappens: "The candle is forming and moving in your direction. Waiting for the close feels like leaving money on the table.",
      consequence: "The candle reverses before closing. It becomes a wick, not a BOS. You entered a setup that never confirmed. Your Burn Point is hit before the actual confirmation candle forms.",
    },
    guidedPractice: {
      scenario: "From confirmation lesson: AOI 2,378–2,386. Wick candle C-A: H=2,383, L=2,374, C=2,380. BOS candle C-C: C=2,387. Account $10,000. Risk 1%. BP: 2,372.",
      steps: [
        "State The Pass price.",
        "Calculate risk in points.",
        "Calculate lot size (pip value $1/0.01/pt). Round down.",
        "Calculate First Tables Served at 2R.",
        "Write the full trade plan as a single block.",
      ],
      answer: "The Pass: 2,387. Risk: 2,387 − 2,372 = 15pt. Lot size: $100 ÷ $15 = 6.66 → 6 micro lots (0.06). Actual risk: $90. First TS: 2,387 + (15 × 2) = 2,417. Full plan — Symbol: XAUUSD | Bias: BULLISH | Pass: 2,387 | BP: 2,372 | Size: 0.06 lots | TS1: 2,417 (2R — close 60%) | TS2: next pool | Management: BP to break even at TS1, trail to TS2.",
      whyItMatters: "Writing the complete plan before executing forces you to catch errors before they cost money. Every professional trader runs a pre-trade checklist. This is yours.",
    },
    kitchenRush: {
      scenario: "Micro-BOS close: 2,342. Wick low: 2,331. BP: 2,329. Account $4,000. Risk 1%.",
      task: "Entry, lot size, First TS (2R). 20 seconds.",
      answer: "Entry: 2,342. Risk: 13pt. Lot size: $40 ÷ $13 = 3.07 → 3 micro lots. First TS: 2,342 + 26 = 2,368.",
      timeTarget: 20,
    },
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
    tradingChefIntro: "You are in the trade. Now Louie comes back to teach you the second half of his skill set: where does the trade end? Not randomly. Not at 'whatever feels right.' Tables Served are the liquidity pools in the direction of your trade — the places price is drawn toward. You mapped them before The Pass. Now you understand why.",
    hook: "Your targets are not random price levels. They are the next liquidity pools in the direction of your trade — the places where price is flowing. Louie Liquidity mapped them for you in Level 3. Now you use that map to decide where the profit gets locked in.",
    kitchenStory: "After the chef calls the pass and the dish goes out, the servers know exactly which tables need to be served first and which can wait. First Tables Served: the couple in the corner who ordered first. Second Tables Served: the larger group who can wait a moment. The restaurant serves in sequence — and so does a trade.",
    marketTranslation: "First Tables Served: the nearest liquidity pool in your bias direction — a previous high (bullish) or previous low (bearish). This is your minimum 2R target. Take 50-70% of your position here and move Burn Point to break even. Second Tables Served: the next significant liquidity pool. Let the remaining position run. If there is a Leftover Container or major structure between entry and target — shorten the target or skip the trade.",
    guidedExample: {
      scenario: "Bullish trade. Entry: 2,337. Burn Point: 2,328. Risk: 9 points. Scanning right of entry: Equal highs cluster at 2,355 (two prior peaks). Previous swing high at 2,378. One Leftover Container gap between 2,360-2,364.",
      question: "Identify First Tables Served, R-multiple, path clearance, and Second Tables Served.",
      answer: "First Tables Served: equal highs at 2,355. R-multiple: (2,355-2,337) ÷ 9 = 18 ÷ 9 = 2R. Path check: Leftover Container at 2,360-2,364 is ABOVE First Tables Served (2,355) — path to First Tables is clear. Second Tables Served: previous swing high at 2,378. R-multiple: (2,378-2,337) ÷ 9 = 41 ÷ 9 = ~4.5R. Full plan: take 60% at 2,355 (2R), trail remainder to 2,378 (4.5R).",
      trap: "Setting First Tables Served at the Leftover Container (2,360-2,364) instead of the equal highs (2,355). Equal highs are a stronger magnet than an FVG alone.",
      whyItMatters: "Tables Served at liquidity pools means price has a structural reason to reach your target. You are not guessing a number — you are reading where the market is drawn.",
    },
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
    concept: {
      definition: "Tables Served are your profit targets — the price levels where you exit part or all of your position and lock in gains. They are not arbitrary numbers. They are the next liquidity pools in the direction of your trade: where price is structurally drawn, where orders cluster, where the move has a logical endpoint.",
      kitchenAnalogy: "The servers know which tables ordered first and when each dish needs to go out. Nobody guesses. The order sheet was written before service. Tables Served in trading is that sheet — written before you enter the trade. First table gets served first. Second table gets the trailing profit.",
      marketMeaning: "On XAUUSD: First Tables Served = nearest liquidity pool in bias direction at minimum 2R from entry. Prior swing high for buys, prior swing low for sells, or equal level clusters. Take 50–70% of position there and move Burn Point to break even. Second Tables Served = next significant liquidity pool. Run remaining position with trailing stop.",
    },
    example: {
      scenario: "Bullish trade. Entry: 2,342. BP: 2,329. Risk: 13pt. Pools ahead: equal highs at 2,355 (13pt away), FVG at 2,362–2,368, prior swing high at 2,378.",
      walkthrough: "Equal highs 2,355: (2,355 − 2,342) ÷ 13 = 1.0R — below 2R minimum, skip as First TS. FVG 2,362: (2,362 − 2,342) ÷ 13 = 1.5R — still below 2R, skip. Prior swing high 2,378: (2,378 − 2,342) ÷ 13 = 2.77R ✓. First TS = 2,378 (2.77R). Path check: equal highs at 2,355 and FVG at 2,362 sit between entry and 2,378 — potential slowing zones but not blockers (both are below First TS). Second TS: next pool above 2,378. At 2,378: close 60%, move BP to 2,342 (break even), run 40% to Second TS.",
      keyTakeaway: "First Tables Served must be 2R minimum. The nearest level is not automatically the first target — it must clear the R threshold.",
    },
    commonTrap: {
      mistake: "Setting First Tables Served at the nearest level regardless of R-multiple.",
      whyItHappens: "'Getting something off the table' feels conservative. The nearest level looks clean and real.",
      consequence: "A sub-2R first target means your wins do not mathematically compensate for standard losses. Even at a 50% win rate, a 1R first target loses money over time. 2R minimum is not preference — it is the math floor for profitability.",
    },
    guidedPractice: {
      scenario: "Bullish trade. Entry: 2,295. BP: 2,282. Risk: 13pt. Pools: PDH 2,305 (10pt), equal highs 2,316 (21pt), prior swing high 2,328 (33pt), weekly high 2,345 (50pt).",
      steps: [
        "Calculate R-multiple for each level.",
        "Which levels meet the 2R minimum?",
        "Select First TS and state the R-multiple.",
        "Select Second TS.",
        "Write the exit plan: % to close at First TS and where BP moves.",
      ],
      answer: "PDH 2,305: 10 ÷ 13 = 0.77R ✗. Equal highs 2,316: 21 ÷ 13 = 1.6R ✗. Swing high 2,328: 33 ÷ 13 = 2.5R ✓. Weekly high 2,345: 50 ÷ 13 = 3.8R ✓. First TS: 2,328 at 2.5R. Second TS: 2,345 at 3.8R. Exit plan: at 2,328 close 60%, move BP from 2,282 to 2,295 (break even). Remaining 40% trails to 2,345 — trail below each new higher low formed after First TS.",
      whyItMatters: "Consistent 2R+ first targets with 1% risk means you need fewer than 35% win rate to be profitable over time. That margin is survivable even during poor stretches.",
    },
    kitchenRush: {
      scenario: "Entry 2,380. BP 2,368. Risk: 12pt. Pools: 2,386 (6pt), 2,394 (14pt), 2,404 (24pt), 2,415 (35pt).",
      task: "First valid TS and its R-multiple. 15 seconds.",
      answer: "2,386: 0.5R ✗. 2,394: 1.17R ✗. 2,404: 24 ÷ 12 = 2.0R ✓. First TS = 2,404 at exactly 2R. Second TS = 2,415 at 2.9R.",
      timeTarget: 15,
    },
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
    character: 'penny-stacks',
    warningCharacter: 'melody-mayhem',
    color: '#c0392b',
    icon: '⚙️',
    tradingChefIntro: "The Pass is placed. Tables Served are marked. Now Penny Stacks teaches you the hardest skill in the kitchen: leaving the trade alone. Management is not about watching charts all day. It is about trusting the plan you built before you entered and executing it exactly. This is where Head Chefs are separated from everyone else.",
    hook: "Getting in is only the beginning. The traders who consistently grow accounts are the ones who manage their trades with discipline after entry. Penny Stacks has a simple rule: once you are in, the plan runs the trade. Your emotions do not.",
    kitchenStory: "A great restaurant does not panic when a dish takes longer than expected. The chef set the timers. The chef built the system. Once service starts, the system runs itself. Penny Stacks runs her trades the same way. The plan was built before entry. Management just follows the plan — adjusting the math, not rebuilding the recipe from scratch.",
    marketTranslation: "Phase 1 — Entry to First Tables Served: leave the trade alone. Do not move your Burn Point. Do not add size. Let the plan work. Phase 2 — At First Tables Served: take 50-70% partial, move Burn Point to break even (entry price). The trade is now risk-free. Phase 3 — From break even to Second Tables Served: trail Burn Point below each new higher low (bullish) or above each new lower high (bearish). Phase 4 — Exit at Second Tables Served or when trailing stop is hit.",
    guidedExample: {
      scenario: "Trade open. Entry: 2,337. Burn Point: 2,328. First Tables Served: 2,355. Second Tables Served: 2,378. 60% close at First Tables Served. Price reaches 2,345 and you feel the urge to exit early because a large red candle appeared.",
      question: "Walk through all four management phases. What do you do when that red candle appears?",
      answer: "Phase 1 (entry to 2,355): You do nothing. Burn Point stays at 2,328. You do not touch the trade. The red candle at 2,345 is noise — price has not hit your Burn Point. Phase 2 (2,355 hit): Close 60% of position, lock in ~2R profit. Move Burn Point to 2,337 (entry/break even). Remaining 40% now has zero risk. Phase 3 (2,355 to 2,378): Trail Burn Point below each new higher low. Phase 4 (2,378 or trail hit): Close remaining position. Trade complete.",
      trap: "Exiting at 2,345 during the red candle because 'it might reverse.' Your Burn Point is the decision-maker, not the red candle.",
      whyItMatters: "Management discipline is the only thing that preserves the risk/reward you calculated before entry. Without it, even a winning strategy becomes a losing one.",
    },
    visualGuide: "After entry: draw a horizontal line at your Burn Point (do not move it until First Tables Served is hit). Draw a line at First Tables Served. Draw a line at Second Tables Served. Add a line at break even (your entry). This is your entire management plan visible on the chart before price moves.",
    characterCoaching: "Penny Stacks says: 'The biggest lie trading teaches you is that active management means better trades. It does not. Better management means building the plan, placing the levels, and then not touching anything. The trade either works or it does not. My job after entry is to observe, not interfere. I watch. I trust the math. I trust the Recipe. Most of the time — it works. When it does not — the Burn Point protects me. That is all.'",
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
    concept: {
      definition: "Trade management is executing your pre-built plan after entry — and nothing else. Four phases: Phase 1 (entry to First TS): leave it alone. Phase 2 (First TS hit): take partial, move BP to break even. Phase 3 (First TS to Second TS): trail BP below each new higher low. Phase 4 (Second TS or trail hit): exit, document, review.",
      kitchenAnalogy: "Penny Stacks does not rebuild the recipe after the dish is in the oven. She set the temperature. She set the timer. She trusts the system. Management is not 'watch and react.' Management is 'set and observe.' The plan is the chef. You are the witness.",
      marketMeaning: "The two most destructive XAUUSD management errors: (1) moving the Burn Point against the trade when price pulls back in Phase 1, (2) exiting at 1R because of a red candle before First TS. Both destroy the math that makes the strategy work. The plan built before entry is the only plan. Your Burn Point handles all noise-exit decisions automatically.",
    },
    example: {
      scenario: "Entry: 2,337. BP: 2,328. First TS: 2,355 (2R). Second TS: 2,378. At +4 hours, price reaches 2,348 and forms a large red candle dropping to 2,341. Strong psychological pressure to exit.",
      walkthrough: "Check plan: Phase 1 (entry to First TS at 2,355). Price at 2,348 — moving toward First TS, has NOT hit BP of 2,328. Red candle to 2,341: still 13pt above BP. Phase 1 rule: no exit except BP hit. Action: close the chart. Come back in 2 hours. The red candle is noise. The Burn Point already has the answer built in. If the trade was wrong — 2,328 says so. Not the red candle.",
      keyTakeaway: "In Phase 1 there is exactly one valid exit condition: price hits the Burn Point. No red candle, no news event, no 'feeling' is a valid Phase 1 exit.",
    },
    commonTrap: {
      mistake: "Moving the Burn Point lower (for longs) when a red candle makes the trade feel uncomfortable.",
      whyItHappens: "Fear of losing the trade outweighs fear of losing money. Widening the stop feels like 'giving it room.'",
      consequence: "A widened stop is a larger loss when hit. A stop without a logical invalidation level always gets hit eventually. Moving stops against the trade consistently converts disciplined 1R losses into catastrophic 3–5R losses.",
    },
    guidedPractice: {
      scenario: "Long trade: Entry 2,295. BP 2,282. First TS 2,321. Second TS 2,340. Timeline: +1hr: 2,305. +3hr: 2,315. +5hr: 2,321 (First TS hit). +6hr: 2,314 (pullback after partial close). +10hr: 2,340 (Second TS hit).",
      steps: [
        "At +5hr (First TS): what % do you close and where does BP move?",
        "At +6hr (2,314 pullback): are you stopped? What is your current BP?",
        "At +10hr (Second TS): close remaining position and calculate total outcome.",
        "If BP (2,282) had been hit at +2hr instead: what is the loss?",
        "Name the emotion you expect at the +6hr pullback and your correct response.",
      ],
      answer: "+5hr: Close 60% at 2,321. Move BP from 2,282 → 2,295 (break even). +6hr: NOT stopped. BP is 2,295. Price at 2,314 is above 2,295. Remain in trade. +10hr: Close remaining 40% at 2,340. 60% earned 2R (26pt). 40% earned 3.46R (45pt). Blended: excellent outcome. BP loss at 2,282: exactly 1% of account ($13pt on original size). Emotion at +6hr: anxiety, fear of losing open profit. Correct response: check the BP (2,295), confirm price is above it, close the chart.",
      whyItMatters: "The pullback at +6hr is where most traders exit early or widen their stop. The plan already handled it — the BP answered the question before the question was asked. Writing this walkthrough before the trade builds the trust that sustains the plan during the real trade.",
    },
    kitchenRush: {
      scenario: "Long trade. Entry 2,350. BP 2,338. First TS 2,374 — not yet hit. Price just pulled to 2,343. Your cursor is on the close button.",
      task: "Stay or exit? Name the rule. 5 seconds.",
      answer: "STAY. Price (2,343) is above BP (2,338). Phase 1 exit condition is BP hit only. 2,343 > 2,338. The plan says: do nothing. Close the chart.",
      timeTarget: 5,
    },
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
    tradingChefIntro: "This is the final lesson. Not because the learning stops — Head Chefs learn every day. But because this is where everything you have built becomes automatic. The Kitchen Rush is your first real test under the full pressure of a live chart, a moving market, and a complete Recipe. Melissa Mayhem will be here. Melody Mayhem will be here. The Recipe is your only defense.",
    hook: "You have learned every step of The Recipe. Now it is time to run the kitchen under pressure. The Kitchen Rush is where everything you have learned gets applied in sequence on a live chart. Melissa Mayhem will try to distract you. Trading Chef will guide you. Your job: run the full Recipe from start to finish without skipping a step.",
    kitchenStory: "During a dinner rush, a great chef does not slow down. They execute the same Recipe they practiced a hundred times. No shortcuts. No new experiments. The system carries them through. Your Kitchen Rush works the same way — practice running the Recipe until it becomes automatic, even when the charts are moving fast.",
    marketTranslation: "The full Recipe in sequence: Step 1: Set your Bias (Daily chart). Step 2: Map the Liquidity Flow (4H chart, PDH/PDL, equal levels). Step 3: Mark your AOI (4H discount zone + Leftover Container). Step 4: Read the Delivery (1H, impulsive vs corrective?). Step 5: Wait for Confirmation (15M wick rejection + micro-BOS). Step 6: Place The Pass (entry at micro-BOS break). Step 7: Set Tables Served (First 2R, Second open). Step 8: Run Management (break even at First, trail to Second).",
    guidedExample: {
      scenario: "It is Monday morning. XAUUSD Daily shows 5 consecutive higher highs and higher lows. 4H shows price pulling back. Current price is in the 50% discount zone. There is a Leftover Container at the current level. 1H candles approaching the level are large-bodied and one-directional (bullish). You are waiting on 15M.",
      question: "How far through the Recipe are you? What are you waiting for now?",
      answer: "Step 1 complete: Bullish bias (Daily HH/HL sequence). Step 2 complete: Flow mapped — pullback on 4H in progress. Step 3 complete: AOI identified (discount zone + Leftover Container). Step 4 complete: Delivery is impulsive (large-bodied bullish candles on 1H). Step 5: WAITING. You need the 15M confirmation — wick rejection in AOI + micro-BOS. Steps 6-8 come after confirmation appears. You do not enter. You wait.",
      trap: "Entering at Step 4 because 'everything looks good.' Looking good is not The Recipe. The Recipe requires confirmation.",
      whyItMatters: "Every step that holds protects you from the ones where the setup fails. A market that passes all 5 steps before entry has already filtered out the majority of bad trades.",
    },
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
    psychologyNote: "The days you do not trade are not wasted days. They are the days you proved you have discipline. The market is open 250 days a year. You only need 30-40 great setups. Everything else is patience. Everything else is protecting your account for the next real Recipe.",
    riskWarning: "BURN ALARM: Never force a trade to end the Kitchen Rush with a win. A forced trade is not a trade — it is a bet. The Kitchen Rush is complete the moment you run all 8 steps, regardless of whether a trade exists.",
    concept: {
      definition: "Kitchen Rush is the full 8-step Recipe executed in real time on a live chart. Every skill from every level is called simultaneously. You run the Recipe in sequence without skipping steps. If any step fails — no trade. 'No Setup Today' is a successful Kitchen Rush. It means the Recipe protected you.",
      kitchenAnalogy: "Dinner service at a full restaurant. Every table ordered at once. The timer is counting. The head chef does not invent new recipes mid-service. They execute the same prep they ran a hundred times in training. The Kitchen Rush is your first real service — and every service after it.",
      marketMeaning: "The Kitchen Rush outcome has two valid results: (1) All 8 steps passed — full trade plan written and executed. (2) A step failed — 'No Setup Today' documented in the journal. Both are wins. The third outcome — forcing a trade when a step failed — is the only loss.",
    },
    example: {
      scenario: "Monday 8AM. XAUUSD moving. Large news candle just formed. Trading room buzzing with alerts. Everyone entering positions.",
      walkthrough: "Step 1 — Bias (Daily): if you cannot confirm HH/HL or LH/LL in 30 seconds → stop, no trade. Step 2 — Flow (4H): mark PDH, PDL, equal levels — do not enter while doing this. Step 3 — AOI (4H): discount zone + FVG — if no valid AOI → stop. Step 4 — Delivery (1H): impulsive or corrective approaching AOI? Corrective → wait. Step 5 — Confirmation (15M): wick rejection + micro-BOS? Both required. Step 6 — The Pass: all 5 complete — calculate and execute. Step 7 — Tables Served: mark both levels. Step 8 — Management: set alerts, close platform. Kitchen Rush complete whether or not a trade was placed.",
      keyTakeaway: "The Kitchen Rush is complete at Step 8 regardless of outcome. A completed Recipe with no trade is a professional session.",
    },
    commonTrap: {
      mistake: "Forcing a trade at the end of the Kitchen Rush because completing all 8 steps without trading feels like wasted effort.",
      whyItHappens: "The effort invested in running the Recipe creates psychological pressure to 'get something' from the session.",
      consequence: "Forced trades skip whatever step was missing — almost always confirmation. Price reverses at the first available wick. The Recipe told you: no setup. You overruled it. The loss is the price of overruling the system.",
    },
    guidedPractice: {
      scenario: "Run The Full Recipe on XAUUSD right now — live or most recent session. No shortcuts.",
      steps: [
        "Step 1 (Daily): State your bias and the two structural reasons for it.",
        "Step 2 (4H): Mark PDH, PDL, and any equal levels. Which side has more liquidity?",
        "Step 3 (4H): Identify discount zone and any FVG. State your AOI or write 'No valid AOI.'",
        "Step 4 (1H): If price is approaching the AOI — impulsive or corrective delivery?",
        "Step 5 (15M): If in AOI — wick rejection present? Micro-BOS formed? Both required.",
        "Step 6: If Step 5 complete — write the full trade plan. If not — write 'No Setup Today' and stop.",
        "Step 7: If trade placed — mark both Tables Served levels on chart.",
        "Step 8: Close the platform. Document which step failed if no trade was taken.",
      ],
      answer: "No single correct answer. A successful Kitchen Rush is one where all 8 steps were executed in sequence, every step result was documented, and no step was skipped or fabricated. Both outcomes — trade taken and no trade — are valid wins. The only failure is skipping steps or forcing a trade past a failed step.",
      whyItMatters: "Running the Kitchen Rush 5 days per week for 90 days installs the Recipe as automatic behavior. That is how Head Chefs are made — not by being right more often, but by never skipping a step.",
    },
    kitchenRush: {
      scenario: "The market is live. You have 5 minutes.",
      task: "State your Daily bias, the highest-priority liquidity pool, and whether price is near a valid AOI. Three answers. Five minutes.",
      answer: "This is a live exercise. Your journal entry for this session covering all three answers IS the Kitchen Rush completion. A documented 'No Setup Today' with the step that failed is as valid as a documented trade plan.",
      timeTarget: 300,
    },
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
