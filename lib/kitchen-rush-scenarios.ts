// ── Kitchen Rush Simulator Scenarios ─────────────────────────────────────────
// Scenarios are tied to levels. Each level tests only concepts taught at or below that level.
// Scenarios are self-assessed (user reports their own answer), then shown the correct approach.
// No win rates. No profit promises. No signals.

export type ScenarioType = 'identify' | 'decision' | 'journal' | 'risk-check'

export interface ScenarioChoice {
  id: string
  label: string
  isTrap: boolean        // Melissa's trap answers
  isHesitation?: boolean // Melody's hesitation answers
  feedback: string
}

export interface RushScenario {
  id: string
  level: number
  type: ScenarioType
  timeLimitSeconds: number
  setup: string          // the scenario context
  question: string
  choices?: ScenarioChoice[]  // for identify/decision types
  journalPrompt?: string      // for journal type
  riskPrompt?: { entryPrice: number; stopPrice: number; accountSize: number; suggestedRisk: number } // for risk-check
  correctAnswer?: string      // for journal/risk types
  explanation: string        // shown after answer
  xpReward: number
  characterNote?: {
    character: 'melissa' | 'melody' | 'burn-alarm'
    note: string
  }
}

export const KITCHEN_RUSH_SCENARIOS: RushScenario[] = [

  // ── Level 0: Market Child ─────────────────────────────────────────────────

  {
    id: 'l0-what-is-market',
    level: 0,
    type: 'identify',
    timeLimitSeconds: 30,
    setup: "You're a Market Child. You just entered the kitchen for the first time.",
    question: "What does 'the market is a professional kitchen' mean?",
    choices: [
      { id: 'a', label: 'The market has rules, roles, and a Recipe — not random chaos.', isTrap: false, feedback: "Correct. The kitchen is structured. So is the market — when you know what to look for." },
      { id: 'b', label: 'Trading is just like cooking. Fast, fun, and creative.', isTrap: true, feedback: "That's Melissa talking. The kitchen is disciplined, not creative freestyle." },
      { id: 'c', label: 'Markets are unpredictable so you need to adapt on the fly.', isTrap: true, feedback: "Adaptation without a Recipe is just guessing. The Recipe gives you a framework." },
    ],
    explanation: "The kitchen metaphor exists because kitchens have structure: prep, timing, execution, plating. So does The Recipe. Markets feel chaotic until you see the structure underneath.",
    xpReward: 25,
  },

  {
    id: 'l0-who-are-you',
    level: 0,
    type: 'identify',
    timeLimitSeconds: 30,
    setup: "Your first day in the kitchen.",
    question: "What is a Market Child?",
    choices: [
      { id: 'a', label: 'A beginner who is learning the Recipe before touching the stove.', isTrap: false, feedback: "Correct. Market Children don't trade yet. They learn the kitchen first." },
      { id: 'b', label: 'Someone who trades small to learn by doing.', isTrap: true, feedback: "Learning by doing without the Recipe is how accounts get burned. Know the kitchen first." },
      { id: 'c', label: 'A trader who is not ready for big positions yet.', isTrap: true, feedback: "It's not about position size. Market Children are still learning what positions are." },
    ],
    explanation: "A Market Child earns the right to cook. You cannot skip to Level 9 because you watched one video. The Recipe requires understanding each step before the next opens.",
    xpReward: 25,
  },

  // ── Level 1: Candle Kitchen ───────────────────────────────────────────────

  {
    id: 'l1-candle-body',
    level: 1,
    type: 'identify',
    timeLimitSeconds: 45,
    setup: "You're looking at a candle. It opened at 100, closed at 107.",
    question: "What does this candle tell you about this period?",
    choices: [
      { id: 'a', label: 'Buyers were in control. Price moved from 100 to 107 and closed there.', isTrap: false, feedback: "Correct. The body tells you where price started and finished — who controlled the period." },
      { id: 'b', label: 'The market is going up. Buy here.', isTrap: true, feedback: "That's Melissa. One candle is not a signal. It's one data point on a chart that needs context." },
      { id: 'c', label: "Nothing. Candles can reverse anytime.", isTrap: false, isHesitation: true, feedback: "That's Melody's hesitation. Candles do carry information — the body is the story of who won that period." },
    ],
    explanation: "Candle bodies show conviction. A full green body means buyers controlled open to close. A full red body means sellers did. This is information — not a signal.",
    xpReward: 35,
    characterNote: { character: 'melissa', note: "I love when people buy because one candle went green. That's not a reason. That's hope." },
  },

  {
    id: 'l1-wick-meaning',
    level: 1,
    type: 'identify',
    timeLimitSeconds: 45,
    setup: "A candle has a long lower wick. It went down hard and then closed near the top.",
    question: "What does the long lower wick indicate?",
    choices: [
      { id: 'a', label: 'Price was rejected lower. Buyers came in and pushed price back up.', isTrap: false, feedback: "Correct. Wicks show rejection — where price went but wasn't accepted." },
      { id: 'b', label: 'Sellers are strong. The price went down.', isTrap: true, feedback: "The wick went down but price CLOSED back up. The close is what matters, not the journey." },
      { id: 'c', label: 'This is a buy signal.', isTrap: true, feedback: "Still Melissa. A wick by itself is not a signal — it requires Recipe context." },
    ],
    explanation: "Wicks are Wickie's language. Long lower wicks mean price visited lower levels but was rejected — buyers stepped in. Long upper wicks mean sellers rejected higher prices. Context determines what to do with that information.",
    xpReward: 35,
    characterNote: { character: 'melody', note: "I used to ignore wicks because they confused me. That was the wrong call. Wicks are the most honest part of a candle." },
  },

  // ── Level 2: Structure Kitchen ────────────────────────────────────────────

  {
    id: 'l2-structure-break',
    level: 2,
    type: 'identify',
    timeLimitSeconds: 60,
    setup: "Price has been making higher highs and higher lows for 6 candles. Then price makes a lower low.",
    question: "What just happened to market structure?",
    choices: [
      { id: 'a', label: 'Structure shifted. The bullish sequence broke. The trend may be changing.', isTrap: false, feedback: "Correct. A lower low in a bullish sequence is a structural shift — it's not a buy dip yet." },
      { id: 'b', label: "It's a dip. Buy it.", isTrap: true, feedback: "Melissa loves this answer. Not every pullback is a dip. A lower low means structure changed — wait for the Recipe." },
      { id: 'c', label: 'Structure means nothing. Price can do anything.', isTrap: false, isHesitation: true, feedback: "Melody's doubt. Structure is one of the most reliable reads in the Recipe. A break has meaning." },
    ],
    explanation: "Structure is the backbone of The Recipe. Bullish: higher highs + higher lows. Bearish: lower highs + lower lows. When that sequence breaks, the market is communicating a shift. Chef Goldie teaches structure before bias because you cannot read bias without it.",
    xpReward: 40,
  },

  {
    id: 'l2-levels',
    level: 2,
    type: 'decision',
    timeLimitSeconds: 60,
    setup: "Price broke above a previous high that had been resistance for 3 weeks. Price is now pulling back toward that old resistance level.",
    question: "What do you do with this information?",
    choices: [
      { id: 'a', label: 'Note it as a potential support area. Old resistance can become support after a break.', isTrap: false, feedback: "Correct. This is a structural concept — broken resistance becomes support. Mark it. Watch it in context." },
      { id: 'b', label: 'Sell. Price is pulling back.', isTrap: true, feedback: "Selling a pullback after a breakout above key resistance — without Recipe context — is a Melissa move." },
      { id: 'c', label: 'Wait for more candles before deciding anything.', isTrap: false, isHesitation: true, feedback: "Waiting for clarity is good, but you already have information. Mark the level. The Recipe tells you what to do next when bias and AOI confirm." },
    ],
    explanation: "Structure levels are memory. The market remembers where it reversed, where it broke, where it was accepted. These levels matter — but they require the rest of the Recipe to become action.",
    xpReward: 40,
  },

  // ── Level 3: Flow Kitchen ─────────────────────────────────────────────────

  {
    id: 'l3-bias',
    level: 3,
    type: 'identify',
    timeLimitSeconds: 60,
    setup: "On the daily chart, price is making higher highs and higher lows. On the 1-hour chart, price is making lower highs and lower lows.",
    question: "What is your bias and why?",
    choices: [
      { id: 'a', label: 'Bullish bias from the daily. The 1-hour pullback is likely inside the larger trend.', isTrap: false, feedback: "Correct. Higher timeframe structure sets bias. Lower timeframe movement is the pullback inside that bias — where AOI lives." },
      { id: 'b', label: 'Bearish. The 1-hour is going down. Trade with it.', isTrap: true, feedback: "Counter-trend trading without higher timeframe alignment is Melissa's favorite setup. Most losses live there." },
      { id: 'c', label: "Conflicting signals. Can't trade this.", isTrap: false, isHesitation: true, feedback: "They're not conflicting — they're nested. Daily is direction. 1-hour is entry timing. The Recipe uses both." },
    ],
    explanation: "Bias is the answer to: 'Which side of the market am I on?' It comes from the higher timeframe structure. The lower timeframe shows you where to wait for entry — that's AOI and Flow working together.",
    xpReward: 45,
    characterNote: { character: 'melissa', note: "I don't use bias. I just trade whatever's moving right now. And that's why I keep giving money to the market." },
  },

  {
    id: 'l3-flow',
    level: 3,
    type: 'identify',
    timeLimitSeconds: 60,
    setup: "Bullish bias on daily. Price on the 4H is pulling back inside the structure and approaching a level.",
    question: "What does 'flow' mean in this context?",
    choices: [
      { id: 'a', label: "The rhythm of price — how it moves toward and away from your area of interest.", isTrap: false, feedback: "Correct. Flow is the movement pattern — how price is approaching your level. Fast? Slow? With pauses? Flow tells you if it's natural or forced." },
      { id: 'b', label: 'Liquidity. Smart money is in control of price flow.', isTrap: true, feedback: "Liquidity is not a TCU term. Flow in The Recipe refers to the rhythm and direction of price movement, not a manipulation theory." },
      { id: 'c', label: 'I need to see more data before knowing what flow is.', isTrap: false, isHesitation: true, feedback: "Flow is observable right now. You can see how price is moving. That's the data." },
    ],
    explanation: "Flow is Rico Rhythm's territory. It's how price moves — impulsive vs. corrective, extended vs. compressed. Clean flow into an AOI is one of the key reads before you look for delivery.",
    xpReward: 45,
  },

  // ── Level 4: AOI Kitchen ──────────────────────────────────────────────────

  {
    id: 'l4-aoi-definition',
    level: 4,
    type: 'identify',
    timeLimitSeconds: 60,
    setup: "Price has a bullish bias. Structure shows price pulled back and found support twice at the same area.",
    question: "What qualifies this area as an Area of Interest (AOI)?",
    choices: [
      { id: 'a', label: "It's a structural level where price reacted previously — twice. It has memory.", isTrap: false, feedback: "Correct. An AOI has prior reaction. Price respected it before. That makes it a candidate for future reaction." },
      { id: 'b', label: 'Any round number is an AOI.', isTrap: true, feedback: "Round numbers are common amateur reference points. AOIs are structural — earned from how price actually reacted, not from mathematics." },
      { id: 'c', label: 'I need to wait and see if price reaches it again.', isTrap: false, isHesitation: true, feedback: "You don't wait to identify the AOI. You mark it now. Then you wait for price to reach it." },
    ],
    explanation: "An AOI is a place on the chart where you'd want to see something happen. It's defined in advance — before price arrives — based on structure, reaction, and Recipe context. Nana Value marks where value was found before.",
    xpReward: 50,
    characterNote: { character: 'melody', note: "I used to enter before price reached my AOI because I was afraid I'd miss it. Every time. I missed nothing except good entries." },
  },

  // ── Level 5: Delivery Kitchen ─────────────────────────────────────────────

  {
    id: 'l5-delivery',
    level: 5,
    type: 'identify',
    timeLimitSeconds: 60,
    setup: "Price reached your AOI. You see a strong, sharp move in the direction of your bias after touching the level.",
    question: "What is 'delivery' in The Recipe?",
    choices: [
      { id: 'a', label: "Price moving away from the AOI in the direction of bias with momentum and conviction.", isTrap: false, feedback: "Correct. Delivery is not the setup — it's what happens after the setup. Strong delivery means the level was real." },
      { id: 'b', label: 'The candle that enters at your AOI.', isTrap: true, feedback: "That's an entry. Delivery is the move that follows — the proof that the AOI was respected by the market." },
      { id: 'c', label: 'I need confirmation before calling it delivery.', isTrap: false, feedback: "Correct instinct — this is partially right. Delivery and confirmation work together. But delivery is the move, confirmation is the signal to act." },
    ],
    explanation: "Delivery is The Recipe's proof-of-concept moment. The market hits your AOI and delivers price in the direction of bias. Without delivery, the AOI might not be holding. Delivery is observed, not predicted.",
    xpReward: 50,
  },

  // ── Level 6: Confirmation Kitchen ────────────────────────────────────────

  {
    id: 'l6-confirmation',
    level: 6,
    type: 'decision',
    timeLimitSeconds: 75,
    setup: "Bullish bias. Price reached your AOI. You see delivery — a sharp move up. Price is now pulling back slightly inside that delivery.",
    question: "What are you waiting for before entry?",
    choices: [
      { id: 'a', label: 'A confirmation signal on the lower timeframe — structure shift, candle pattern, or momentum signal aligned with my bias.', isTrap: false, feedback: "Correct. Confirmation is the final step before action. It closes the Recipe loop: Bias → Flow → AOI → Delivery → Confirmation." },
      { id: 'b', label: 'Nothing. The setup is clear. Enter now.', isTrap: true, feedback: "Melissa moves without confirmation. Confirmation is the step that separates observations from entries." },
      { id: 'c', label: 'Wait for another delivery to confirm the confirmation.', isTrap: false, isHesitation: true, feedback: "Stacking confirmation on confirmation is Melody's paralysis. One valid confirmation signal is enough. Act on it." },
    ],
    explanation: "Confirmation is the final gatekeeping step. It answers: has the market given me a reason to act right now? Not 'does the setup look good' — you already answered that. Has the market confirmed it?",
    xpReward: 55,
    characterNote: { character: 'melissa', note: "I enter at delivery. I don't wait for confirmation. And half the time I'm right! ...The other half is just embarrassing." },
  },

  // ── Level 7: The Pass ─────────────────────────────────────────────────────

  {
    id: 'l7-risk',
    level: 7,
    type: 'risk-check',
    timeLimitSeconds: 90,
    setup: "You have a $10,000 account. Your entry is $105. Your burn point (stop) is $102.",
    question: "How many shares/units can you buy if you risk 1% of your account?",
    riskPrompt: {
      entryPrice: 105,
      stopPrice: 102,
      accountSize: 10000,
      suggestedRisk: 1,
    },
    correctAnswer: '33',
    explanation: "1% of $10,000 = $100 risk. Distance to stop: $105 - $102 = $3. Position size: $100 ÷ $3 = 33.3 units. The math defines your size — not how good the setup looks, not how confident you feel.",
    xpReward: 60,
    characterNote: { character: 'burn-alarm', note: "Risk management is the only edge that never changes. The Recipe can be right and the trade can lose. Your survival depends on the math, not the setup." },
  },

  {
    id: 'l7-burn-point',
    level: 7,
    type: 'decision',
    timeLimitSeconds: 75,
    setup: "You entered a trade at $100. Your burn point is $97. Price drops to $98.50 and pauses. You feel like it might bounce.",
    question: "What do you do?",
    choices: [
      { id: 'a', label: 'Hold the trade. My burn point is $97. Price has not reached my invalidation yet.', isTrap: false, feedback: "Correct. The burn point was defined before entry. A pause at $98.50 is not a reason to move it." },
      { id: 'b', label: 'Move my stop to $97.50 to reduce risk.', isTrap: true, feedback: "Moving the stop closer because you're nervous is emotional management, not risk management. Let price reach the defined invalidation point." },
      { id: 'c', label: "Exit early. The trade is uncomfortable.", isTrap: false, isHesitation: true, feedback: "Discomfort is not invalidation. If price hasn't reached your burn point, the trade is still within plan. Melody exits early from fear. That's not the Recipe." },
    ],
    explanation: "The burn point is set before entry based on where the trade idea is wrong. It doesn't change because of discomfort. It only changes if the market gives new structural information that invalidates the original read.",
    xpReward: 60,
    characterNote: { character: 'melissa', note: "I move my stops all the time. Tighter, then looser, then off. And somehow it's always the market's fault when I lose." },
  },

  // ── Level 8: Tables Served ────────────────────────────────────────────────

  {
    id: 'l8-management',
    level: 8,
    type: 'decision',
    timeLimitSeconds: 90,
    setup: "Trade entered at $100, stop at $97, target at $109 (1:3 risk/reward). Price hits $106 (roughly halfway to target).",
    question: "You have options. What does the Recipe say?",
    choices: [
      { id: 'a', label: 'Manage based on your pre-defined plan. Move stop to breakeven if that was the plan. Take partial if that was the plan. No improvising.', isTrap: false, feedback: "Correct. Management should be decided before entry, not during. In-trade decision-making is where Melissa lives." },
      { id: 'b', label: 'Take profits now. A bird in the hand is worth two in the bush.', isTrap: true, feedback: "Early exits feel safe but cut your winners short. If the target is $109 and you exit at $106, your R is less than planned. Over time, this destroys positive expectancy." },
      { id: 'c', label: 'Let it run with no stop — it might keep going.', isTrap: true, feedback: "Removing your stop because the trade is winning is how winners become losers. The stop evolves with the trade, it doesn't disappear." },
    ],
    explanation: "Tables Served is about completing the Recipe: getting your trade from entry to target with discipline. Management is pre-planned. The two variables: stop movement rules and partial exit rules. Decide these before you're in the trade.",
    xpReward: 65,
  },

  // ── Level 9: Head Chef ────────────────────────────────────────────────────

  {
    id: 'l9-full-recipe',
    level: 9,
    type: 'decision',
    timeLimitSeconds: 120,
    setup: "Bearish daily structure. 4H making lower highs and lower lows. Price pulled back to a previous break level and is showing delivery down. 15-minute shows a lower high formed with a bearish close below structure.",
    question: "Walk through the Recipe. What do you have?",
    choices: [
      { id: 'a', label: "Bias: Bearish (daily + 4H structure). Flow: Corrective pullback, now resuming. AOI: Previous break level. Delivery: Moving down from the level. Confirmation: 15-min lower high + close below structure. Recipe is complete.", isTrap: false, feedback: "Correct. This is what a complete Recipe read looks like. Every step has an answer. This is a valid setup to evaluate against your risk rules." },
      { id: 'b', label: 'Price is going down. Short it.', isTrap: true, feedback: "Same trade, wrong process. The outcome might be the same, but the Recipe is what separates a system from gambling." },
      { id: 'c', label: "I don't see enough confirmation. Too many moving parts.", isTrap: false, isHesitation: true, feedback: "Melody sees complexity as a blocker. The Recipe IS the framework that organizes complexity. Each step answers one question. When all questions have answers, you have a setup." },
    ],
    explanation: "This is Head Chef work. You are not looking for signals. You are executing The Recipe. Bias, Flow, AOI, Delivery, Confirmation. When all five steps check out, you have a qualified setup. You still need your risk math before The Pass.",
    xpReward: 75,
    characterNote: { character: 'melody', note: "When I finally stopped looking for certainty and started looking for Recipe completion, everything changed. The Recipe is as certain as trading gets." },
  },

  {
    id: 'l9-journal-reflection',
    level: 9,
    type: 'journal',
    timeLimitSeconds: 180,
    setup: "You just completed a full trade — from identifying bias to Tables Served.",
    question: "Write your Kitchen Debrief.",
    journalPrompt: "Describe: (1) What was your bias and why? (2) Where was your AOI? (3) What was your confirmation? (4) Did you follow your burn point? (5) What would you do differently?",
    explanation: "Kitchen Debriefs are not about whether you won or lost. They are about whether you followed The Recipe. A Recipe-perfect trade that lost is better than a recipe-violation trade that won. The debrief is where Head Chefs are built.",
    xpReward: 75,
    characterNote: { character: 'melody', note: "I hated journaling until I realized it was the only thing that actually changed my behavior. Write it down. Every time." },
  },

]

// ── Level Scenario Lookup ─────────────────────────────────────────────────────

export function getScenariosForLevel(level: number): RushScenario[] {
  return KITCHEN_RUSH_SCENARIOS.filter(s => s.level === level)
}

export function getScenarioById(id: string): RushScenario | undefined {
  return KITCHEN_RUSH_SCENARIOS.find(s => s.id === id)
}

export function getAvailableScenarios(unlockedLevels: number[]): RushScenario[] {
  return KITCHEN_RUSH_SCENARIOS.filter(s => unlockedLevels.includes(s.level))
}

export const TOTAL_RUSH_XP = KITCHEN_RUSH_SCENARIOS.reduce((sum, s) => sum + s.xpReward, 0)
