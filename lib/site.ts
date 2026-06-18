export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mystermyself.com'

export const BEEHIIV_PUBLICATION_URL =
  process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ||
  'https://maurices-newsletter-b7274b.beehiiv.com'

export const site = {
  name: 'MysterMyself',
  world: 'Scott-King Coast',
  headline: 'Build Your Life Like a Business.',
  subheadline: 'Skills become income. Income becomes assets. Assets create freedom.',
}

export const routes = {
  home: '/',
  subscribe: '/opportunity-list',
  publication: BEEHIIV_PUBLICATION_URL,
  medicalCourierGuide: '/products/medical-courier-guide',
  routeHarbor: '/pages/route-harbor',
  fantasyIsland: '/pages/fantasy-island',
  creatorPier: '/pages/creator-pier',
  marketMarina: '/pages/market-marina',
  flavorDistrict: '/pages/flavor-district',
  legacyPoint: '/pages/legacy-point',
  libraryVault: '/pages/library-vault',
  founderIsland: '/pages/founder-island',
  blueprintBay: '/pages/blueprint-bay',
  opportunityList: '/opportunity-list',
}

export const districts = [
  {
    name: 'Founder Island',
    purpose: 'Start here: the mission, founder story, and map of the Coast.',
    href: routes.founderIsland,
    action: 'Start Here',
  },
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
