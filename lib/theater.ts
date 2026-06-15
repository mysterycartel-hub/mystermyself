// ── TCU Theater ───────────────────────────────────────────────────────────────
// The 3 flagship videos are NOT marketing assets.
// They are lesson assets.
//
// Watching a video:
//  → unlocks lessons
//  → unlocks missions
//  → awards XP
//  → unlocks character dialogue

export interface TheaterVideo {
  id: string
  slug: string
  order: number
  title: string
  subtitle: string
  description: string
  duration: string          // e.g., '14:32'
  youtubeId: string | null  // null = coming soon
  character: string         // character who introduces it
  characterLine: string     // what they say before the video
  xpAward: number
  unlocksLessons: string[]  // lesson IDs this video unlocks
  unlocksMissions: string[] // mission IDs this video unlocks
  unlocksCharacterDialogue: string[] // character IDs whose dialogue is unlocked
  prerequisiteVideoId: string | null // must watch this video first
  badgeAward?: {
    id: string
    name: string
    icon: string
    color: string
    description: string
  }
}

export const THEATER_VIDEOS: TheaterVideo[] = [
  {
    id: 'tcu-origin',
    slug: 'tcu-origin',
    order: 1,
    title: 'Welcome to the Scott-King Coast',
    subtitle: 'The Trading Chef Universe — Origin',
    description: "The market is a professional kitchen. You are a Market Child. This video is where your journey begins. Learn what the Trading Chef Universe is, who the characters are, and why the kitchen metaphor changes everything about how you think about trading.",
    duration: '12:00',
    youtubeId: null,
    character: 'trading-chef',
    characterLine: "This is the video that started everything. Watch it first. Understand the kitchen before you touch anything in it.",
    xpAward: 100,
    unlocksLessons: ['market-child', 'candles'],
    unlocksMissions: ['visit-market-marina', 'visit-legacy-point'],
    unlocksCharacterDialogue: ['trading-chef', 'chef-goldie'],
    prerequisiteVideoId: null,
    badgeAward: {
      id: 'kitchen-initiate',
      name: 'Kitchen Initiate',
      icon: '🎬',
      color: '#c9a84c',
      description: 'Watched the TCU Origin video and entered the kitchen.',
    },
  },
  {
    id: 'the-recipe',
    slug: 'the-recipe',
    order: 2,
    title: 'The Recipe',
    subtitle: 'Bias · Flow · AOI · Delivery · Confirmation · The Pass · Tables Served',
    description: "The full 7-step TCU framework from start to finish. This is the methodology behind every trade — explained through the kitchen metaphor in a way no textbook ever could. Watch this before you touch the Market Kitchen.",
    duration: '22:00',
    youtubeId: null,
    character: 'chef-goldie',
    characterLine: "The Recipe is the system. Not the candles. Not the patterns. The Recipe. Watch this and you will understand what every lesson is building toward.",
    xpAward: 150,
    unlocksLessons: ['wicks', 'structure', 'bias', 'flow', 'aoi', 'delivery', 'confirmation'],
    unlocksMissions: ['complete-coast-tour'],
    unlocksCharacterDialogue: ['candle-kid', 'wickie', 'louie-liquidity', 'nana-value', 'rico-rhythm'],
    prerequisiteVideoId: 'tcu-origin',
    badgeAward: {
      id: 'recipe-reader',
      name: 'Recipe Reader',
      icon: '📋',
      color: '#22C55E',
      description: 'Watched The Recipe video and unlocked the full framework.',
    },
  },
  {
    id: 'mayhem-vs-recipe',
    slug: 'mayhem-vs-recipe',
    order: 3,
    title: 'Mayhem vs. The Recipe',
    subtitle: 'Melissa · Melody · The Psychology of Trading',
    description: "Melissa Mayhem and Melody Mayhem are not optional characters. They are the forces that destroy accounts. This video introduces both, explains how they operate in real trading situations, and shows how The Recipe defeats them. This video is required before you touch The Pass or Management.",
    duration: '18:00',
    youtubeId: null,
    character: 'melissa-mayhem',
    characterLine: "Oh good, you made it this far. This is the video about me. And Melody. Don't think watching it will make you immune. It just means you know my name.",
    xpAward: 200,
    unlocksLessons: ['risk', 'pass', 'tables-served', 'management', 'kitchen-rush'],
    unlocksMissions: ['unlock-tcu'],
    unlocksCharacterDialogue: ['melissa-mayhem', 'melody-mayhem', 'burn-alarm', 'grandma-market', 'penny-stacks'],
    prerequisiteVideoId: 'the-recipe',
    badgeAward: {
      id: 'mayhem-aware',
      name: 'Mayhem Aware',
      icon: '⚡',
      color: '#EC4899',
      description: 'Watched Mayhem vs. The Recipe and unlocked the full psychological framework.',
    },
  },
]

export function getVideo(slug: string): TheaterVideo | undefined {
  return THEATER_VIDEOS.find(v => v.slug === slug)
}

export function getVideoById(id: string): TheaterVideo | undefined {
  return THEATER_VIDEOS.find(v => v.id === id)
}

export const TOTAL_THEATER_XP = THEATER_VIDEOS.reduce((sum, v) => sum + v.xpAward, 0)
