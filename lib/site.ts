export const BRAND_NAME   = 'MysterMyself'
export const WORLD_NAME   = 'Scott-King Coast'
export const SOCIAL_HANDLE = '@mystermyself'
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mysterycartel@gmail.com'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mystermyself.com'

export const BEEHIIV_PUBLICATION_URL =
  process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ||
  'https://maurices-newsletter-b7274b.beehiiv.com'

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const site = {
  name: BRAND_NAME,
  world: WORLD_NAME,
  headline: 'Build Your Life Like a Business.',
  subheadline: 'Skills become income. Income becomes assets. Assets create freedom.',
}

export const routes = {
  home: '/',
  subscribe:    '/opportunity-list',
  newsletter:   '/opportunity-list',
  join:         '/opportunity-list',
  publication:  BEEHIIV_PUBLICATION_URL,
  opportunityList: '/opportunity-list',
  medicalCourierGuide: '/products/medical-courier-guide',
  routeHarbor:  '/coast/route-harbor',
  fantasyIsland: '/coast/fantasy-island',
  creatorPier:  '/coast/creator-pier',
  marketMarina: '/coast/market-marina',
  flavorDistrict: '/coast/flavor-district',
  legacyPoint:  '/coast/legacy-point',
  libraryVault: '/coast/library-vault',
  blueprintBay: '/coast/blueprint-bay',
}

export const districts = [
  {
    name: 'Route Harbor',
    purpose: 'Courier income, logistics lanes, contracts, and medical delivery opportunities.',
    href: routes.routeHarbor,
    action: 'Get Courier Drops',
  },
  {
    name: 'Market Marina',
    purpose: 'Trading Chef Universe, market structure, liquidity, and beginner lessons.',
    href: routes.marketMarina,
    action: 'Get Trading Lessons',
  },
  {
    name: 'Fantasy Island',
    purpose: 'Fantasy football, live updates, rankings, alerts, XP, and game mechanics.',
    href: routes.fantasyIsland,
    action: 'Get Live Fantasy Drops',
  },
  {
    name: 'Creator Pier',
    purpose: 'AI tools, affiliate plays, YouTube growth, and creator income systems.',
    href: routes.creatorPier,
    action: 'Get AI + Affiliate Tools',
  },
  {
    name: 'Flavor District',
    purpose: 'Breaded Or Not?!, food business, catering, ghost kitchens, and kitchen knowledge.',
    href: routes.flavorDistrict,
    action: 'Follow Food Business Drops',
  },
  {
    name: 'Legacy Point',
    purpose: 'Ownership, business structure, credit, assets, and long-term wealth building.',
    href: routes.legacyPoint,
    action: 'Learn Ownership',
  },
  {
    name: 'Library Vault',
    purpose: 'Prompts, guides, playbooks, research, and resources turned into assets.',
    href: routes.libraryVault,
    action: 'View Resources',
  },
  {
    name: 'Blueprint Bay',
    purpose: 'Reserved for AI automation, agents, workflows, dashboards, and operating systems.',
    href: routes.blueprintBay,
    action: 'Coming Soon',
  },
]
