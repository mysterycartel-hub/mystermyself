// ── CharacterTriggerEngine ────────────────────────────────────────────────────
// All TCU characters are event-driven. They fire from behavioral states, not
// from lesson sections. No lesson owns a character. Characters observe the student
// and interrupt when they detect a behavioral pattern they specialize in.
//
// Usage anywhere in the app:
//   CharacterTriggerEngine.analyzeText('i missed the move', 'journal')
//   CharacterTriggerEngine.fire('lesson-jumped')
//   CharacterTriggerEngine.fireForCharacter('chef-goldie', 'lesson-complete', { lessonId })

import {
  TriggerEventType,
  TriggerEvent,
  CharacterTrigger,
  TriggerCharacter,
  dispatchTrigger,
  getTrigger,
  detectEmotionalKeywords,
} from './triggers'

// ── Extended character roster ─────────────────────────────────────────────────
// triggers.ts covers melissa | melody | burn-alarm
// CharacterTriggerEngine adds all coach characters as event sources

export type TCUCharacter =
  | TriggerCharacter        // melissa | melody | burn-alarm
  | 'trading-chef'
  | 'chef-goldie'
  | 'wickie'
  | 'louie-liquidity'
  | 'rico-rhythm'
  | 'penny-stacks'
  | 'mr-stocks'

// ── Behavioral state taxonomy ─────────────────────────────────────────────────

export type MelissaState =
  | 'fomo'            // chasing price, "missing it" language
  | 'overconfidence'  // "sure thing", oversizing, skipping steps
  | 'rule-breaking'   // accessing locked content, skipping Recipe steps
  | 'revenge'         // "make it back" language after a loss
  | 'emotional-entry' // entering without completing the Recipe

export type MelodyState =
  | 'fear'                // "scared", "what if I'm wrong"
  | 'hesitation'          // long pause, "maybe I should wait"
  | 'confidence-gap'      // defeat language after a loss
  | 'emotional-overwhelm' // "too much", "I don't understand", "give up"
  | 'early-exit'          // closing a winning trade before the target

export type BurnAlarmState =
  | 'no-burn-point'     // trade without defined stop
  | 'oversized-risk'    // position size > 2% of account
  | 'stop-manipulation' // moving stop against the trade
  | 'forced-entry'      // entering without completing Recipe steps

// ── Keyword libraries ─────────────────────────────────────────────────────────

const FOMO_KEYWORDS = [
  'missing', 'miss it', 'already moved', 'should have', 'shouldve', 'i was late',
  'late entry', 'catch it', 'catch up', "it's running", 'its running',
  'moving without me', 'just jumped', 'just broke', 'breaking out', 'fomo',
]

const REVENGE_KEYWORDS = [
  'get it back', 'make it back', 'recover', 'recoup', 'lost and', 'after the loss',
  'revenge', 'i need to win', 'need to make', 'bad trade', 'stupid trade',
  "shouldn't have", 'shouldnt have', 'i knew it', 'so angry', 'frustrated',
  'just one more', 'double down', 'average down',
]

const OVERCONFIDENCE_KEYWORDS = [
  'sure thing', 'guaranteed', 'definitely going to', 'always works', 'easy money',
  "can't lose", 'obvious trade', 'no way this fails', 'perfect setup', 'this is it',
]

const FEAR_KEYWORDS = [
  'scared', 'afraid', 'terrified', 'nervous', 'what if it falls', 'what if im wrong',
  'what if i\'m wrong', 'worried', 'anxious',
]

const HESITATION_KEYWORDS = [
  'not sure', 'not certain', "i don't know", 'maybe i should wait', 'one more candle',
  "what if i'm wrong", 'overthinking', 'second guess', 'doubt', 'hesitat',
  "can't pull", 'cannot pull', "didn't enter", 'didnt enter', 'missed because',
  'chickened',
]

const OVERWHELM_KEYWORDS = [
  'too much', 'too complex', "don't understand", 'confused', 'give up',
  'impossible', 'too hard', "can't do this", 'lost me', 'losing me',
]

const EARLY_EXIT_KEYWORDS = [
  'taking profit early', 'close now', 'get out now', 'exit early',
  'enough profit', 'scared of losing my profit', "don't want to lose",
  'move to break even', 'lock in', 'take it off',
]

// ── Behavioral state detectors ────────────────────────────────────────────────

function detectMelissaState(text: string): MelissaState | null {
  const l = text.toLowerCase()
  if (FOMO_KEYWORDS.some(k => l.includes(k)))         return 'fomo'
  if (REVENGE_KEYWORDS.some(k => l.includes(k)))      return 'revenge'
  if (OVERCONFIDENCE_KEYWORDS.some(k => l.includes(k))) return 'overconfidence'
  return null
}

function detectMelodyState(text: string): MelodyState | null {
  const l = text.toLowerCase()
  if (OVERWHELM_KEYWORDS.some(k => l.includes(k)))    return 'emotional-overwhelm'
  if (FEAR_KEYWORDS.some(k => l.includes(k)))         return 'fear'
  if (HESITATION_KEYWORDS.some(k => l.includes(k)))   return 'hesitation'
  if (EARLY_EXIT_KEYWORDS.some(k => l.includes(k)))   return 'early-exit'
  return null
}

// ── State → TriggerEventType mapping ─────────────────────────────────────────

const MELISSA_STATE_MAP: Record<MelissaState, TriggerEventType> = {
  'fomo':            'fomo-keyword',
  'overconfidence':  'risk-exceeded',
  'rule-breaking':   'lesson-jumped',
  'revenge':         'revenge-keyword',
  'emotional-entry': 'practice-skipped',
}

const MELODY_STATE_MAP: Record<MelodyState, TriggerEventType> = {
  'fear':                'hesitation-keyword',
  'hesitation':          'hesitation-keyword',
  'confidence-gap':      'confidence-drop',
  'emotional-overwhelm': 'hesitation-keyword',
  'early-exit':          'burn-point-moved',
}

const BURN_ALARM_STATE_MAP: Record<BurnAlarmState, TriggerEventType> = {
  'no-burn-point':      'burn-point-moved',
  'oversized-risk':     'risk-exceeded',
  'stop-manipulation':  'burn-point-moved',
  'forced-entry':       'step-skipped',
}

// ── Coach character coaching responses ───────────────────────────────────────
// Coach characters fire on positive lifecycle events, not behavioral violations.
// They appear briefly with encouragement + next direction.

export interface CoachCue {
  character: TCUCharacter
  message: string
  quote: string
  autoDismissMs: number
}

const COACH_CUES: Record<string, CoachCue[]> = {
  'lesson-complete': [
    {
      character: 'trading-chef',
      message: "Lesson complete. You earned it — but earning is not knowing. Knowing comes from the next step.",
      quote: "A Head Chef reads the same recipe twice. Once to understand. Once to execute.",
      autoDismissMs: 5000,
    },
  ],
  'level-complete': [
    {
      character: 'trading-chef',
      message: "Level complete. The kitchen gets harder from here. That means you are ready.",
      quote: "The Recipe does not get shorter. You get faster.",
      autoDismissMs: 6000,
    },
  ],
  'practice-complete': [
    {
      character: 'penny-stacks',
      message: "You practiced. That is more than most students do. Write what you noticed before the feeling fades.",
      quote: "Practice without reflection is just repetition. Reflection makes it skill.",
      autoDismissMs: 5000,
    },
  ],
  'journal-complete': [
    {
      character: 'trading-chef',
      message: "The journal is saved. That reflection is worth more than the XP.",
      quote: "Patterns in your trading journal are patterns in your account. Read both.",
      autoDismissMs: 4000,
    },
  ],
}

// ── CharacterTriggerEngine public API ─────────────────────────────────────────

export const CharacterTriggerEngine = {

  // Fire a specific trigger event (wraps dispatchTrigger)
  fire(eventType: TriggerEventType, extra?: Partial<TriggerEvent>): void {
    dispatchTrigger({ type: eventType, ...extra })
  },

  // Fire a trigger scoped to a specific character
  fireForCharacter(character: TriggerCharacter, eventType: TriggerEventType, extra?: Partial<TriggerEvent>): void {
    dispatchTrigger({ type: eventType, ...extra })
  },

  // Analyze free text and fire the most relevant character interrupt
  analyzeText(text: string, context: 'practice' | 'journal' | 'coach-chat'): void {
    if (!text || text.trim().length < 10) return

    const melissaState = detectMelissaState(text)
    if (melissaState) {
      dispatchTrigger({
        type: MELISSA_STATE_MAP[melissaState],
        context: `${context}:melissa:${melissaState}`,
      })
      return
    }

    const melodyState = detectMelodyState(text)
    if (melodyState) {
      dispatchTrigger({
        type: MELODY_STATE_MAP[melodyState],
        context: `${context}:melody:${melodyState}`,
      })
    }
  },

  // Fire a burn alarm state
  fireBurnAlarm(state: BurnAlarmState, extra?: Partial<TriggerEvent>): void {
    dispatchTrigger({
      type: BURN_ALARM_STATE_MAP[state],
      ...extra,
    })
  },

  // Fire a coach cue on a positive lifecycle event
  fireCoachCue(event: 'lesson-complete' | 'level-complete' | 'practice-complete' | 'journal-complete'): void {
    const cues = COACH_CUES[event]
    if (!cues?.length) return
    const cue = cues[0]
    // Coach cues dispatch as a special mode — auto-dismiss, no queue
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('tcu-coach-cue', { detail: cue }))
  },

  // Melissa behavioral states
  fireMelissaState(state: MelissaState, extra?: Partial<TriggerEvent>): void {
    dispatchTrigger({ type: MELISSA_STATE_MAP[state], ...extra })
  },

  // Melody behavioral states
  fireMelodyState(state: MelodyState, extra?: Partial<TriggerEvent>): void {
    dispatchTrigger({ type: MELODY_STATE_MAP[state], ...extra })
  },
}
