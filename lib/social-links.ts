// Central social link registry — all pages pull from here.
// Unresolved links route to /follow-the-coast (Coming Soon).
// Update env vars in Vercel dashboard when real URLs are confirmed.

export const SOCIAL = {
  site:        'https://mystermyself.com',
  opportunityList: '/opportunity-list',
  beehiivPublication: process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com',

  // ── Social channels ────────────────────────────────────────────────────────
  youtube:     process.env.NEXT_PUBLIC_YOUTUBE_URL    ?? 'https://www.youtube.com/@mystermyself',
  tiktok:      process.env.NEXT_PUBLIC_TIKTOK_URL     ?? 'https://www.tiktok.com/@mystermyself',
  instagram:   process.env.NEXT_PUBLIC_INSTAGRAM_URL  ?? 'https://www.instagram.com/mystermyself',
  x:           process.env.NEXT_PUBLIC_X_URL          ?? 'https://x.com/mystermyself',
  rumble:      process.env.NEXT_PUBLIC_RUMBLE_URL      ?? 'https://rumble.com/c/Mystermyself',
  facebook:    process.env.NEXT_PUBLIC_FACEBOOK_URL   ?? 'https://www.facebook.com/MysterMyself/',
  email:       process.env.NEXT_PUBLIC_CONTACT_EMAIL  ?? 'mysterycartel@gmail.com',
} as const

// ── Breaded Or Not — Flavor District brand links ──────────────────────────
// Missing links route to /follow-the-coast until real URLs are provided.
export const BREADED = {
  instagram: process.env.NEXT_PUBLIC_BREADED_INSTAGRAM_URL ?? 'https://www.instagram.com/breaded_or_not/',
  tiktok:    process.env.NEXT_PUBLIC_BREADED_TIKTOK_URL    ?? 'https://www.tiktok.com/@breaded.or.not',
  facebook:  process.env.NEXT_PUBLIC_BREADED_FACEBOOK_URL  ?? '/follow-the-coast',
  orderUrl:  process.env.NEXT_PUBLIC_BREADED_ORDER_URL     ?? '/follow-the-coast',
} as const

// Returns true if a social URL is an external confirmed link (not a local fallback)
export function isRealUrl(url: string): boolean {
  return url.startsWith('http')
}

export type SocialKey = keyof typeof SOCIAL
