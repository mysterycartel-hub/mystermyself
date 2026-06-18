// Central social link registry — all pages pull from here.
// Replace [NEEDS OWNER URL] values in the Vercel dashboard env vars
// or directly in this file once the real URLs are confirmed.

export const SOCIAL = {
  site:        'https://mystermyself.com',
  opportunityList: '/opportunity-list',
  beehiivPublication: process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com',

  // ── Social channels ────────────────────────────────────────────────────────
  youtube:     process.env.NEXT_PUBLIC_YOUTUBE_URL    ?? 'https://www.youtube.com/@mystermyself',
  tiktok:      process.env.NEXT_PUBLIC_TIKTOK_URL     ?? 'https://www.tiktok.com/@mystermyself',
  instagram:   process.env.NEXT_PUBLIC_INSTAGRAM_URL  ?? 'https://www.instagram.com/mystermyself',
  x:           process.env.NEXT_PUBLIC_X_URL          ?? 'https://x.com/mystermyself',
  rumble:      process.env.NEXT_PUBLIC_RUMBLE_URL      ?? '[NEEDS OWNER URL]',
  facebook:    process.env.NEXT_PUBLIC_FACEBOOK_URL   ?? '[NEEDS OWNER URL]',
  email:       process.env.NEXT_PUBLIC_CONTACT_EMAIL  ?? 'mysterycartel@gmail.com',
} as const

// Returns true if a social URL is real (not a placeholder)
export function isRealUrl(url: string): boolean {
  return url !== '[NEEDS OWNER URL]' && url.startsWith('http')
}

export type SocialKey = keyof typeof SOCIAL
