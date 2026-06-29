/**
 * Homepage Video Configuration
 * 
 * TO UPDATE VIDEOS: Change the youtubeId field for any entry.
 * YouTube ID = the part after "watch?v=" in a YouTube URL.
 * Example: https://www.youtube.com/watch?v=ABC123 → youtubeId: "ABC123"
 * 
 * To use a Rumble embed instead, replace the youtubeId with rumbleId
 * and update the embed URL pattern in the homepage component.
 */

export const heroVideo = {
  youtubeId: 'dQw4w9WgXcQ', // REPLACE with real intro video
  title: 'Welcome to Scott-King Coast',
  description: 'One ecosystem. Five businesses. Nine districts. Built by Maurice Scott.',
}

export const districtVideos = [
  {
    id: 'market-marina',
    district: 'Market Marina',
    title: 'Trading Chef Universe',
    description: 'XAUUSD education through kitchen metaphors. The Recipe. The Setup. The Profit Plate.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with TCU intro video
    cta: 'Learn the Recipe',
    href: '/market-marina',
    emoji: '📊',
  },
  {
    id: 'route-harbor',
    district: 'Route Harbor',
    title: 'Courier Income Lab',
    description: 'Medical courier operations in Florida. Real routes. Real income. Real logistics.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with courier video
    cta: 'See the Routes',
    href: '/route-harbor',
    emoji: '🚗',
  },
  {
    id: 'flavor-district',
    district: 'Flavor District',
    title: 'Breaded Or Not?!',
    description: 'Wings, catering, ghost kitchen ops. Feeding the World, One Wing at a Time.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with food video
    cta: 'Taste the Menu',
    href: '/flavor-district',
    emoji: '🍗',
  },
  {
    id: 'creator-pier',
    district: 'Creator Pier',
    title: 'Content Engine',
    description: 'YouTube, Rumble, ebooks, funnels, email sequences. Content that converts.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with content video
    cta: 'Watch the Process',
    href: '/creator-pier',
    emoji: '🎬',
  },
  {
    id: 'blueprint-bay',
    district: 'Blueprint Bay',
    title: 'AI Tools & Automation',
    description: 'Multi-agent systems, relay architecture, canon anchors. AI that actually works.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with AI tools video
    cta: 'See the System',
    href: '/blueprint-bay',
    emoji: '🤖',
  },
  {
    id: 'legacy-point',
    district: 'Legacy Point',
    title: 'Ownership & Wealth',
    description: 'LLCs, IP protection, trust structures. Build something that lasts.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with legacy video
    cta: 'Build Legacy',
    href: '/legacy-point',
    emoji: '👑',
  },
  {
    id: 'fantasy-island',
    district: 'Fantasy Island',
    title: 'Fantasy Updates',
    description: 'Fantasy football picks, season updates, and community plays.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with fantasy video
    cta: 'Check the Picks',
    href: '/fantasy-island',
    emoji: '🏈',
  },
]

export const socialProofMessages = [
  'Someone joined the Coast',
  'New lesson watched',
  'Courier guide downloaded',
  'Fantasy update opened',
  'Trading Chef recipe viewed',
  'Opportunity List signup',
  'Ebook chapter unlocked',
]
