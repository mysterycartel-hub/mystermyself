// ── Mayhem Engine ────────────────────────────────────────────────────────────
// Melissa Mayhem and Melody Mayhem are core TCU system characters.
// They are not optional. They are not minor extras.
// Every lesson, every Kitchen session, every journal — they are present.
//
// MELISSA MAYHEM = chaos, traps, FOMO, impulsive entries, overconfidence,
//                  bad decisions, chasing price, entering without confirmation.
//
// MELODY MAYHEM  = fear, greed, hesitation, revenge trading, emotional
//                  hijack, discipline collapse, moving targets, early exits.

export type MayhemCharacterId = 'melissa-mayhem' | 'melody-mayhem'

export interface MayhemMoment {
  character: MayhemCharacterId
  lessonId: string
  trigger: string          // what behavior/thought pattern activates her
  warning: string          // what she says in the lesson context
  trap: string             // the specific mistake she causes
  escape: string           // how to neutralize her in this context
  quote: string            // a short in-character quote
}

export interface MayhemKitchenTrigger {
  character: MayhemCharacterId
  field: string            // BiasPanel field that triggers her
  triggerPattern: string   // what the user does that invites her
  warning: string          // what to display
  quote: string
}

export interface MayhemJournalNote {
  character: MayhemCharacterId
  promptType: 'emotion'
  intro: string            // what she says before the emotion prompt
}

// ── Melissa Mayhem — Per-Lesson Presence ─────────────────────────────────────

export const MELISSA_LESSONS: Record<string, MayhemMoment> = {
  'candles': {
    character: 'melissa-mayhem',
    lessonId: 'candles',
    trigger: 'You see a big green candle forming and feel the urge to buy immediately.',
    warning: "Melissa loves the look of a big impulsive candle. She will make you feel like you are missing something. You are not. Wait for it to close.",
    trap: 'Buying mid-candle on visual excitement — no wait for the close, no context, no structure.',
    escape: 'Wait for the candle to fully close before reading it. Never trade a candle that is still forming.',
    quote: "Ooh, look at that candle move! Don't you want some of that? Don't you feel late already?",
  },
  'wicks': {
    character: 'melissa-mayhem',
    lessonId: 'wicks',
    trigger: 'A long wick appears and you assume the direction is confirmed.',
    warning: "Melissa sets wick traps constantly. She runs price into a zone to knock your stop out, then reverses. The wick IS Melissa working. Do not trade the wick — trade what happens AFTER it.",
    trap: 'Entering in the direction of a wick before the next candle confirms reversal.',
    escape: 'Wait for the follow-through candle after the wick before any entry. The wick is the warning. The next candle is the verdict.',
    quote: "I made that wick happen. It was for you. Now are you going to take the bait or not?",
  },
  'bias': {
    character: 'melissa-mayhem',
    lessonId: 'bias',
    trigger: 'You set your bias and then refuse to update it when the chart changes.',
    warning: "Melissa turns Bias into overconfidence. You read bullish in the morning — price drops. Melissa keeps you holding the bullish bias even as the chart tells you otherwise. Bias is a living read. Update it.",
    trap: 'Locking bias in the morning and forcing all trades through it all day even as structure shifts.',
    escape: 'Re-read bias every 4 hours minimum. If structure shifts, your bias shifts. Melissa cannot trap a flexible reader.',
    quote: "You said bullish at 9AM. Why are you changing your mind? Just hold. It'll come back. Trust yourself.",
  },
  'flow': {
    character: 'melissa-mayhem',
    lessonId: 'flow',
    trigger: 'You see price moving fast toward a liquidity pool and FOMO fires.',
    warning: "Melissa makes Flow look obvious — right when it is about to reverse. She makes you chase a move that is nearly finished. Flow is not about getting in NOW. It is about positioning BEFORE the draw.",
    trap: 'Entering a trade after the majority of the Flow move has already happened.',
    escape: 'If you missed the Flow setup, you missed it. There is always another session. Melissa owns traders who chase.',
    quote: "Price is moving! RIGHT NOW! See that pool getting hit? Jump in! Jump in! You are already late!",
  },
  'delivery': {
    character: 'melissa-mayhem',
    lessonId: 'delivery',
    trigger: 'Impulsive delivery looks like a guaranteed move and you enter during it.',
    warning: "Melissa is the one who makes impulsive delivery look like a guaranteed entry. She wants you to buy the momentum, not the structure. Delivery tells you what happened — not where to enter. Wait for the pullback.",
    trap: 'Entering a buy during an impulsive bullish delivery instead of waiting for corrective retracement to AOI.',
    escape: 'Impulsive delivery = price has left. Wait for corrective delivery to bring price back to your AOI. That is The Pass.',
    quote: "It is moving! This is your chance! Everyone is getting in! Why are you still waiting?",
  },
  'confirmation': {
    character: 'melissa-mayhem',
    lessonId: 'confirmation',
    trigger: 'Price touches your AOI and you enter immediately — before confirmation forms.',
    warning: "This is Melissa's favorite lesson. Confirmation exists BECAUSE of her. She makes AOI touch feel like permission. It is not. Price touching your level is just arrival. Confirmation is the candle signal that says intention. Enter without confirmation = Melissa wins.",
    trap: 'Market order the moment price hits AOI, before a rejection wick, engulfing, or displacement forms.',
    escape: 'No confirmation = no entry. Period. Wait for the close of the confirmation candle. Melissa cannot survive patience.',
    quote: "Price just hit your level!! This is it!! This is THE setup!! Just click!! It won't come back!!",
  },
  'pass': {
    character: 'melissa-mayhem',
    lessonId: 'pass',
    trigger: 'The Pass already formed and closed. You missed it. You enter anyway.',
    warning: "Melissa LIVES in the space between a missed Pass and the entry you take anyway. She turns 'I missed it' into 'I'll just get in here.' That is how you enter at the worst possible time, right before a reversal.",
    trap: 'Entering a trade 5-10 candles after The Pass already formed because you did not want to miss the move.',
    escape: 'If The Pass closed, the recipe is done. Close the chart. Wait for the next setup. Melissa cannot hurt someone who walks away.',
    quote: "It only went up a little so far. You're not that late. Just get in. The big move hasn't happened yet. Probably.",
  },
  'kitchen-rush': {
    character: 'melissa-mayhem',
    lessonId: 'kitchen-rush',
    trigger: 'Timer pressure compresses decision-making into impulsive clicks.',
    warning: "Rush mode is Melissa's home environment. She knows that time pressure converts careful traders into impulsive ones. Every rushed entry, every skipped step in The Recipe — that is Melissa scoring. Your only defense: slow your read, ignore the clock, complete The Recipe.",
    trap: 'Skipping Confirmation, skipping AOI alignment, entering before Bias is confirmed — because the clock is running.',
    escape: 'Incomplete Recipe = no entry. Write DNT (Did Not Trade) and score 100 points for discipline. Melissa fears the trader who does nothing.',
    quote: "Tick tick tick. You're running out of time. Just enter. You can analyze after. Just click the button. Tick tick tick.",
  },
}

export const MELISSA_DEFAULT: Omit<MayhemMoment, 'lessonId'> = {
  character: 'melissa-mayhem',
  trigger: 'Price is moving and the urge to act immediately is rising.',
  warning: "Melissa Mayhem is in this lesson. She created the fakeout, the trap, the FOMO. She wants your entry before your analysis is done. The antidote is always the same: complete The Recipe before clicking anything.",
  trap: 'Entering without completing all steps of The Recipe.',
  escape: 'Finish The Recipe. If any step is unclear, the answer is wait.',
  quote: "Are you just going to sit there and watch? While everyone else is getting in? Really?",
}

// ── Melody Mayhem — Per-Lesson Presence ──────────────────────────────────────

export const MELODY_LESSONS: Record<string, MayhemMoment> = {
  'candles': {
    character: 'melody-mayhem',
    lessonId: 'candles',
    trigger: 'You look at candles for a few minutes and feel overwhelmed, confused, or behind.',
    warning: "Melody Mayhem activates in this lesson as beginner anxiety. She makes learning feel like failing. Looking at a chart for the first time and feeling lost is not failure — it is the beginning. Melody wants you to quit before you start.",
    trap: 'Closing the chart because it feels too complex, then shame-spiraling about not understanding.',
    escape: 'One candle. Just one. Read one candle — body, wick, direction. Melody cannot survive this pace.',
    quote: "Everyone else already knows this. You are so far behind. This is too complicated for you. Maybe trading is not for you.",
  },
  'aoi': {
    character: 'melody-mayhem',
    lessonId: 'aoi',
    trigger: 'You identify an AOI but hesitate to commit to it because you doubt yourself.',
    warning: "Melody makes AOI feel like a test you can fail. She makes you second-guess every zone: 'Is that really an AOI? What if I am wrong?' You are not trying to be right. You are trying to identify probability. Doubt is Melody talking.",
    trap: 'Drawing 7 different AOIs because you cannot commit to one. Analysis paralysis.',
    escape: 'Pick the clearest AOI. Not the perfect one. The clearest one. Commit to it. Learn from the result.',
    quote: "But what if that AOI is wrong? What if you misread the level? Maybe you should mark more just to be safe. What if—",
  },
  'structure': {
    character: 'melody-mayhem',
    lessonId: 'structure',
    trigger: 'You see a structure break but freeze because you are afraid it is a fake-out.',
    warning: "Melody turns structure reading into fear. She reminds you of every time you read a break wrong. But structure is not about being right every time — it is about reading what IS, not what might happen. Melody freezes the reader. The reader who does not freeze learns.",
    trap: 'Never taking a position on structure because the last read was wrong.',
    escape: 'Read structure. Note it. If wrong, note why. This is how the skill is built. Melody cannot beat the journaling trader.',
    quote: "Remember the last time you thought you saw a break? You were wrong then. What makes you think you are right now?",
  },
  'risk': {
    character: 'melody-mayhem',
    lessonId: 'risk',
    trigger: 'You just took a loss and are calculating how to make it back immediately.',
    warning: "Melody Mayhem designed revenge trading. After a loss, she makes recovery feel urgent. She reframes the next trade as 'getting it back' instead of 'finding the next valid setup.' Revenge is not a strategy. It is Melody with your login credentials.",
    trap: 'Taking a second trade immediately after a stop-out to recover the loss — without waiting for a new valid setup.',
    escape: 'After a loss: log it, close the chart for 30 minutes, then come back and read the chart fresh. The market does not owe you recovery.',
    quote: "You just lost money. But the market still owes you. One more trade. Just get it back. You know what happened — do the opposite.",
  },
  'tables-served': {
    character: 'melody-mayhem',
    lessonId: 'tables-served',
    trigger: 'Price is approaching your Tables Served level and you move it higher to capture more.',
    warning: "Melody turns Tables Served into greed. She whispers 'just let it run a bit more' right before price reverses. Tables Served are defined BEFORE entry. Moving them after entry is Melody rearranging the kitchen after the dish is already plated.",
    trap: 'Moving target levels mid-trade because price is moving well and you want more.',
    escape: 'Tables Served are fixed at entry. Take profit at the defined level. Reset. Melody cannot beat the trader who sticks to the plan.',
    quote: "Look how good this is going. Why take profit here? It is clearly going much further. Just move the target up a little. Just a little.",
  },
  'management': {
    character: 'melody-mayhem',
    lessonId: 'management',
    trigger: 'Price is near your Burn Point and you move it further away to avoid the loss.',
    warning: "This is Melody's most dangerous appearance. Moving a Burn Point to avoid a loss is the single most common way traders destroy accounts. The Burn Point is not a suggestion. It is the line where The Recipe was wrong. Melody makes you move it. Do not.",
    trap: 'Moving the Burn Point further away as price approaches it because you cannot accept being wrong.',
    escape: 'Burn Point does not move against you. Ever. If price hits your Burn Point, the trade was wrong. Exit. Journal. Move on.',
    quote: "But if you just move the stop a little further, it will come back. You know it will. It always comes back. Just give it room. Just a little more room.",
  },
  'kitchen-rush': {
    character: 'melody-mayhem',
    lessonId: 'kitchen-rush',
    trigger: 'A loss in Rush mode triggers emotional shutdown or panic entries.',
    warning: "In Rush mode, Melody waits for your first loss — then she convinces you to abandon The Recipe entirely. She makes the loss feel catastrophic. Then she convinces you to over-trade to recover. Two Melody appearances in one session can erase every point earned.",
    trap: 'After a Rush mode loss: abandoning structure, doubling down on the next entry, or quitting the session.',
    escape: 'One loss in Rush is expected. Reset, take a breath, read the next setup from step one of The Recipe.',
    quote: "You lost that one. Now you are behind. You need to make it up fast. Skip the checklist. You already know the setup. Just go.",
  },
}

export const MELODY_DEFAULT: Omit<MayhemMoment, 'lessonId'> = {
  character: 'melody-mayhem',
  trigger: 'Emotional pressure — fear, greed, anxiety, or frustration — is present.',
  warning: "Melody Mayhem is in this lesson. She is the voice that makes fear louder than logic. Every hesitation, every revenge move, every 'just a little more' — that is Melody. The only thing that neutralizes her is the journal. Write what you feel. Name it. That is her power removed.",
  trap: 'Making any trading decision from an emotional state instead of from The Recipe.',
  escape: 'Before any entry: name your current emotional state out loud or in writing. If the state is not neutral, do not trade.',
  quote: "You know what you want to do. You can feel it. Just trust your gut this time. The Recipe takes too long. Your gut is right. Trust it.",
}

// ── Lesson Mayhem Mapping ─────────────────────────────────────────────────────
// Each lesson may have Melissa, Melody, or both.
// Most lessons have at least one.

export const LESSON_MAYHEM: Record<string, {
  melissa?: MayhemMoment
  melody?: MayhemMoment
  primary: MayhemCharacterId
}> = {
  candles:      { melissa: MELISSA_LESSONS.candles,      melody: MELODY_LESSONS.candles,      primary: 'melody-mayhem' },
  wicks:        { melissa: MELISSA_LESSONS.wicks,                                              primary: 'melissa-mayhem' },
  bias:         { melissa: MELISSA_LESSONS.bias,                                               primary: 'melissa-mayhem' },
  flow:         { melissa: MELISSA_LESSONS.flow,                                               primary: 'melissa-mayhem' },
  structure:    {                                         melody: MELODY_LESSONS.structure,    primary: 'melody-mayhem' },
  aoi:          { melissa: MELISSA_LESSONS.confirmation, melody: MELODY_LESSONS.aoi,          primary: 'melody-mayhem' },
  risk:         {                                         melody: MELODY_LESSONS.risk,         primary: 'melody-mayhem' },
  delivery:     { melissa: MELISSA_LESSONS.delivery,                                           primary: 'melissa-mayhem' },
  confirmation: { melissa: MELISSA_LESSONS.confirmation,                                       primary: 'melissa-mayhem' },
  pass:         { melissa: MELISSA_LESSONS.pass,                                               primary: 'melissa-mayhem' },
  'tables-served': {                                      melody: MELODY_LESSONS['tables-served'], primary: 'melody-mayhem' },
  management:   {                                         melody: MELODY_LESSONS.management,  primary: 'melody-mayhem' },
  'kitchen-rush': { melissa: MELISSA_LESSONS['kitchen-rush'], melody: MELODY_LESSONS['kitchen-rush'], primary: 'melissa-mayhem' },
}

export function getLessonMayhem(lessonId: string) {
  return LESSON_MAYHEM[lessonId] ?? null
}

// ── Kitchen Triggers ──────────────────────────────────────────────────────────
// These fire in the BiasPanel based on what the user writes or selects

export const MELISSA_KITCHEN_TRIGGERS: MayhemKitchenTrigger[] = [
  {
    character: 'melissa-mayhem',
    field: 'pass',
    triggerPattern: 'market order|entering now|already moving|jump in|just buy',
    warning: "That sounds like chasing. Melissa is here. Is The Pass actually defined by structure — or by urgency?",
    quote: "Just enter. You're overthinking it.",
  },
  {
    character: 'melissa-mayhem',
    field: 'confirmation',
    triggerPattern: 'skip|assuming|probably|looks like|should be|feels like',
    warning: "Confirmation is not optional. Melissa wins the moment you assume instead of confirm.",
    quote: "It touched your level. That's good enough. Just go.",
  },
  {
    character: 'melissa-mayhem',
    field: 'flow',
    triggerPattern: 'chasing|already ran|late|missed it|catching up',
    warning: "If you missed the Flow setup, you missed it. Wait for the next session. Melissa traps chasers.",
    quote: "The move is happening RIGHT NOW. Get in. Get in. GET IN.",
  },
]

export const MELODY_KITCHEN_TRIGGERS: MayhemKitchenTrigger[] = [
  {
    character: 'melody-mayhem',
    field: 'management',
    triggerPattern: 'maybe move|just in case|give it room|move stop|adjust burn',
    warning: "Melody is asking you to move your Burn Point. Do not. The recipe was wrong if price hits it.",
    quote: "It's just a little further. Move it. You'll feel better.",
  },
  {
    character: 'melody-mayhem',
    field: 'tables',
    triggerPattern: 'move target|let it run|further|more profit|greedy|maybe more',
    warning: "Melody is moving your Tables Served. Fixed targets. Close the dish when it is done.",
    quote: "Look how good it's going. Why would you close now? Let it run. Just a little more.",
  },
]

// ── Journal Integration ───────────────────────────────────────────────────────

export const MELODY_JOURNAL_INTRO = "Melody Mayhem reads every emotion prompt. Write honestly — naming her gives you power over her."

export const MELISSA_JOURNAL_NOTE = "Check yourself before answering: Was Melissa in this session? Did you enter without confirmation, chase a move, or override your plan?"

// ── Quote Libraries ───────────────────────────────────────────────────────────

export const MELISSA_QUOTES = [
  "Are you just going to sit there?",
  "Everyone else is already in.",
  "You're going to miss the move.",
  "Just this once. Quick entry. It's obvious.",
  "Confirmation takes too long. You already know.",
  "The candle is forming RIGHT NOW.",
  "You said bullish. Just buy.",
  "It touched the level. That's your signal.",
  "You can journal about it after. Just click.",
  "Your gut is telling you something. Listen to it.",
  "Are you a trader or not?",
]

export const MELODY_QUOTES = [
  "You're not good enough at this yet.",
  "Remember the last time you got this wrong?",
  "You're going to lose it all.",
  "Just hold. It has to come back.",
  "Move the stop. Just this once.",
  "You're too emotional to trade today anyway.",
  "What's the point? You'll just lose again.",
  "Your fear is logical. The market is dangerous.",
  "You should quit before you lose more.",
  "Everyone else knows what they're doing. You don't.",
  "The trade you're hesitating on is the one you'll regret.",
]

// ── Passport Badges ───────────────────────────────────────────────────────────

export const MAYHEM_BADGES = [
  {
    id: 'melissa-survivor',
    name: 'Melissa Survivor',
    description: 'Completed a lesson where Melissa Mayhem appeared — and did not take the bait.',
    icon: '⚡',
    color: '#EC4899',
    xpRequired: 0,
  },
  {
    id: 'melody-named',
    name: 'Name the Feeling',
    description: "Completed Melody Mayhem's emotion journal prompt honestly in 3 lessons.",
    icon: '🎭',
    color: '#F59E0B',
    xpRequired: 0,
  },
  {
    id: 'discipline-holds',
    name: 'Discipline Holds',
    description: 'Wrote DNT (Did Not Trade) in the Recipe Journal during a Kitchen session.',
    icon: '🔒',
    color: '#c9a84c',
    xpRequired: 250,
  },
  {
    id: 'no-revenge',
    name: 'No Revenge',
    description: 'Logged a loss in the journal without taking a recovery trade immediately after.',
    icon: '🧘',
    color: '#A855F7',
    xpRequired: 500,
  },
  {
    id: 'burn-point-held',
    name: 'Burn Point Held',
    description: 'Completed the Management lesson without adjusting the Burn Point example.',
    icon: '🔥',
    color: '#EF4444',
    xpRequired: 750,
  },
  {
    id: 'mayhem-master',
    name: 'Mayhem Master',
    description: 'Completed all Melissa and Melody lessons without skipping the character coaching step.',
    icon: '👑',
    color: '#c9a84c',
    xpRequired: 1500,
  },
]
