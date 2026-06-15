// ── Character Trigger Engine ──────────────────────────────────────────────────
// Event-driven interrupts for Melissa Mayhem, Melody Mayhem, and Burn Alarm.
// Characters do NOT appear on a schedule — they appear when behavior triggers them.
//
// Dispatch a trigger anywhere in the app:
//   window.dispatchEvent(new CustomEvent('tcu-trigger', { detail: triggerEvent }))
//
// CharacterInterrupt component listens globally and shows the overlay.

export type TriggerCharacter = 'melissa' | 'melody' | 'burn-alarm'
export type TriggerMode = 'interrupt' | 'warning' | 'alert'

export type TriggerEventType =
  | 'lesson-jumped'           // user tried to access a lesson above their level
  | 'practice-skipped'        // user navigated away without completing practice
  | 'journal-skipped'         // user navigated away without saving journal
  | 'step-skipped'            // user skipped a step in the recipe
  | 'timer-pressure'          // kitchen rush timer running out
  | 'risk-exceeded'           // risk % entered above 2%
  | 'burn-point-moved'        // burn point moved after entry
  | 'revenge-keyword'         // emotional keyword detected in journal/coach
  | 'fomo-keyword'            // FOMO keyword detected
  | 'hesitation-keyword'      // hesitation keyword detected
  | 'confidence-drop'         // self-assessed score dropped significantly
  | 'level-complete'          // level just completed — Melody celebrates
  | 'xp-milestone'            // XP milestone reached
  | 'journal-complete'        // reflection journal fully saved
  | 'practice-complete'       // practice marked complete

export interface TriggerEvent {
  type: TriggerEventType
  lessonId?: string
  level?: number
  xp?: number
  value?: string | number
  context?: string
}

export interface CharacterTrigger {
  character: TriggerCharacter
  mode: TriggerMode
  eventType: TriggerEventType
  title: string
  message: string
  quote: string
  trap?: string
  escape?: string
  cta?: string
  autoDismissMs?: number  // if set, auto-dismiss after this many ms
}

// ── Trigger Definitions ───────────────────────────────────────────────────────

export const TRIGGERS: CharacterTrigger[] = [

  // ── Melissa Mayhem ────────────────────────────────────────────────────────

  {
    character: 'melissa',
    mode: 'interrupt',
    eventType: 'lesson-jumped',
    title: 'You tried to skip ahead.',
    message: "That's exactly what I do. I skip the boring parts. I rush to the trade. And then I blame the market when it doesn't work.",
    quote: "The kitchen has an order. You don't get to skip prep.",
    trap: "Every lesson you skip is a gap I live in.",
    escape: "Go back. Complete the level. Earn the next one.",
    cta: 'Return to Current Level',
  },

  {
    character: 'melissa',
    mode: 'warning',
    eventType: 'practice-skipped',
    title: "Practice? You're skipping practice.",
    message: "That's fine. I skipped practice too. Right up until my account was empty.",
    quote: "Skipping practice means you practiced nothing.",
    trap: "You'll feel ready when you're not. That's my favorite moment.",
    escape: "Complete the practice. One real action beats ten reads.",
    cta: 'Complete Practice',
  },

  {
    character: 'melissa',
    mode: 'warning',
    eventType: 'journal-skipped',
    title: 'You closed the journal.',
    message: "I never liked writing either. Feelings are uncomfortable. It's easier to just trade. Until it isn't.",
    quote: "The journal is where the lies you tell yourself live.",
    trap: "Skipping reflection means you carry the same pattern into every trade.",
    escape: "Save the journal. Name what happened. That's the work.",
    cta: 'Return to Journal',
  },

  {
    character: 'melissa',
    mode: 'interrupt',
    eventType: 'fomo-keyword',
    title: 'You said the word.',
    message: "I heard it. 'I'm missing this.' 'It's moving.' 'I should have been in.' That's me. I live in those sentences.",
    quote: "Every move you chase, you were late for.",
    trap: "FOMO entries are exits in disguise.",
    escape: "The Recipe doesn't require you to catch every move. It requires you to catch your moves.",
    cta: 'Read the Recipe',
  },

  {
    character: 'melissa',
    mode: 'interrupt',
    eventType: 'revenge-keyword',
    title: "Revenge trading. My specialty.",
    message: "You took a loss. Now you want it back. Faster. Bigger. Right now. I know exactly how this ends.",
    quote: "The market doesn't owe you your money back.",
    trap: "Revenge trades turn one loss into a session.",
    escape: "Close the chart. Step away. Come back tomorrow.",
    cta: 'Close the Kitchen',
  },

  {
    character: 'melissa',
    mode: 'warning',
    eventType: 'risk-exceeded',
    title: "That's too much risk.",
    message: "More risk means bigger wins though, right? That's what I thought too. Every time.",
    quote: "You can be right about the direction and still blow up.",
    trap: "Oversizing is just slow account destruction.",
    escape: "Risk 1% or less until you've completed The Pass. Non-negotiable.",
    cta: 'Adjust Risk',
  },

  {
    character: 'melissa',
    mode: 'warning',
    eventType: 'burn-point-moved',
    title: 'You moved your burn point.',
    message: "You moved the stop. 'Just a little. Just this once.' I say that every time.",
    quote: "A burn point that moves isn't a burn point. It's hope.",
    trap: "Moving stops turns defined risk into unlimited risk.",
    escape: "If you have to move the stop, the trade wasn't right. Exit. Reset.",
  },

  // ── Melody Mayhem ─────────────────────────────────────────────────────────

  {
    character: 'melody',
    mode: 'warning',
    eventType: 'hesitation-keyword',
    title: "You hesitated.",
    message: "I heard it in what you wrote. 'I'm not sure.' 'Maybe I should wait.' 'What if I'm wrong?' That's me. Every time the setup was perfect.",
    quote: "Confidence isn't certainty. It's preparation meeting action.",
    trap: "Hesitation at the moment of decision means you're trading your feelings, not your plan.",
    escape: "Go back to the Recipe. If every step checks out, the fear is the lie.",
    cta: 'Review Your Setup',
  },

  {
    character: 'melody',
    mode: 'warning',
    eventType: 'practice-skipped',
    title: "You didn't try.",
    message: "You read the lesson. You thought about it. But you didn't practice. That's where I live — in the gap between understanding and action.",
    quote: "Knowledge without practice is still just fear with better vocabulary.",
    escape: "You don't have to be good at the practice. You have to do it.",
    cta: 'Try the Practice',
  },

  {
    character: 'melody',
    mode: 'interrupt',
    eventType: 'confidence-drop',
    title: "Something shifted.",
    message: "I felt it. You were building confidence and now you're not. That's okay. This is exactly where most people quit — or pretend they don't feel it.",
    quote: "Naming the fear is the first move.",
    escape: "Go back one lesson. Review what you know. Confidence is rebuilt the same way it's built — one verified step at a time.",
    cta: 'Review Previous Lesson',
  },

  {
    character: 'melody',
    mode: 'interrupt',
    eventType: 'journal-skipped',
    title: "The journal is where I recovered.",
    message: "I know it feels like extra work. But every time I skipped the reflection, the same pattern came back. The journal is how you interrupt yourself before you interrupt your account.",
    quote: "You don't have to feel good about what you write. You have to be honest.",
    escape: "Save your reflection. Even three sentences. The act of naming it changes it.",
    cta: 'Return to Journal',
  },

  {
    character: 'melody',
    mode: 'warning',
    eventType: 'journal-complete',
    title: "You finished the reflection.",
    message: "I know that wasn't easy. It's the work most people skip. You didn't.",
    quote: "Discipline is just decision-making before the pressure arrives.",
    autoDismissMs: 4000,
  },

  {
    character: 'melody',
    mode: 'warning',
    eventType: 'level-complete',
    title: "You completed the level.",
    message: "This is the part I kept skipping to get to. You earned it. The next level is already different. Stay with the Recipe.",
    quote: "Progress is earned in this kitchen, not assumed.",
    autoDismissMs: 5000,
  },

  // ── Burn Alarm ────────────────────────────────────────────────────────────

  {
    character: 'burn-alarm',
    mode: 'alert',
    eventType: 'risk-exceeded',
    title: 'BURN POINT ALERT',
    message: 'Risk percentage is above the safe threshold. This is not a suggestion.',
    quote: "Risk management is the only edge that doesn't require a setup.",
    trap: "Accounts don't blow up on single bad trades. They blow up on repeated oversized trades.",
    escape: "Reduce position size to 1% or less. Save the trade for when you can size correctly.",
    cta: 'Fix Risk Size',
  },

  {
    character: 'burn-alarm',
    mode: 'alert',
    eventType: 'burn-point-moved',
    title: 'STOP MOVEMENT DETECTED',
    message: 'Your burn point has been moved after entry. This violates Kitchen Protocol.',
    quote: "The burn point is set before the trade. It does not move after.",
    trap: "Every moved stop is a trade that has left the Recipe.",
    escape: "If the original burn point was wrong, the entry was wrong. Exit and reset.",
    cta: 'Exit the Trade',
  },

  {
    character: 'burn-alarm',
    mode: 'alert',
    eventType: 'timer-pressure',
    title: 'PRESSURE DETECTED',
    message: 'Time pressure in the kitchen is a psychological variable, not a trading variable.',
    quote: "Urgency is Melissa's favorite environment. Do not trade in it.",
    escape: "If you feel rushed: stop. The market will have another setup.",
    cta: 'Pause the Rush',
  },

]

// ── Keyword Detection ─────────────────────────────────────────────────────────

const FOMO_KEYWORDS = [
  'missing', 'miss it', 'already moved', 'should have', 'shouldve', 'i was late',
  'late entry', 'catch it', 'catch up', 'it\'s running', 'its running',
  'moving without me', 'just jumped', 'just broke', 'breaking out',
]

const REVENGE_KEYWORDS = [
  'get it back', 'make it back', 'recover', 'recoup', 'lost and', 'after the loss',
  'revenge', 'i need to win', 'need to make', 'stupid trade', 'bad trade',
  'shouldn\'t have', 'shouldnt have', 'i knew it', 'so angry', 'frustrated',
  'just one more', 'double down',
]

const HESITATION_KEYWORDS = [
  'not sure', 'not certain', "i don't know", 'maybe i should wait',
  'what if i\'m wrong', 'what if it', 'scared', 'afraid', 'nervous',
  'overthinking', 'second guess', 'doubt', 'hesitat', 'can\'t pull',
  'cannot pull', 'pulled back', 'didn\'t enter', 'didnt enter',
  'missed because', 'chickened',
]

export function detectEmotionalKeywords(text: string): TriggerEventType | null {
  const lower = text.toLowerCase()
  if (REVENGE_KEYWORDS.some(k => lower.includes(k))) return 'revenge-keyword'
  if (FOMO_KEYWORDS.some(k => lower.includes(k)))    return 'fomo-keyword'
  if (HESITATION_KEYWORDS.some(k => lower.includes(k))) return 'hesitation-keyword'
  return null
}

// ── Trigger Lookup ────────────────────────────────────────────────────────────

export function getTrigger(eventType: TriggerEventType, character?: TriggerCharacter): CharacterTrigger | null {
  const matches = TRIGGERS.filter(t => t.eventType === eventType)
  if (!matches.length) return null
  if (character) return matches.find(t => t.character === character) ?? matches[0]
  return matches[0]
}

export function getTriggerForText(text: string): CharacterTrigger | null {
  const eventType = detectEmotionalKeywords(text)
  if (!eventType) return null
  return getTrigger(eventType) ?? null
}

// ── Event Dispatch Helper ─────────────────────────────────────────────────────

export function dispatchTrigger(event: TriggerEvent): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('tcu-trigger', { detail: event }))
}
