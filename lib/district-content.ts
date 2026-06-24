/**
 * OPS/005 — District-specific content for each coast district.
 * Each district has: purpose, audience, problem solved, live offers,
 * coming soon items, related products, and district-specific language.
 *
 * Source of truth: data/canon/scott-king-coast.json
 */

export interface DistrictContent {
  id: string
  name: string
  brand: string
  color: string
  purpose: string
  audience: string
  problemSolved: string
  liveOffers: string[]
  comingSoon: string[]
  relatedProducts: { name: string; type: string; href: string }[]
  districtLanguage: {
    greeting: string
    callToAction: string
    returnPrompt: string
  }
  opportunityLanePath: string
}

export const districtContent: Record<string, DistrictContent> = {
  'market-marina': {
    id: 'market-marina',
    name: 'Market Marina',
    brand: 'Trading Chef / Trading Chef University',
    color: '#0D9488',
    purpose: 'Gold trading education through the Trading Chef framework. XAUUSD market structure, liquidity concepts, and beginner-to-advanced curriculum.',
    audience: 'Beginners who want to understand gold and forex markets without signal groups or gambling.',
    problemSolved: 'Most trading education is scattered, expensive, or just signal-selling. TCU teaches you HOW to read a chart yourself.',
    liveOffers: [
      'TCU Academy — 13 free lessons',
      'Market Kitchen Terminal — live chart education',
      'Trade Journal — log your sessions',
      'TCU Gold Starter Guide — free download',
    ],
    comingSoon: [
      'TCU Gold Playbook — premium guide',
      'TCU Membership — community access',
      'Live chart review sessions',
    ],
    relatedProducts: [
      { name: 'TCU Gold Starter Guide', type: 'free', href: '/opportunity-list' },
      { name: 'TCU Gold Playbook', type: 'paid', href: '/pricing' },
      { name: 'TCU Membership', type: 'subscription', href: '/pricing' },
    ],
    districtLanguage: {
      greeting: 'Welcome to the kitchen.',
      callToAction: 'Start learning the market.',
      returnPrompt: 'Continue your TCU journey.',
    },
    opportunityLanePath: 'interest_trading_chef',
  },
  'route-harbor': {
    id: 'route-harbor',
    name: 'Route Harbor',
    brand: 'Knighten Route Transportation',
    color: '#0EA5E9',
    purpose: 'Medical courier income education. How to find pharmacy, lab, and contract delivery routes without relying on delivery apps.',
    audience: 'Anyone with a vehicle looking for real courier income — not DoorDash, not Uber.',
    problemSolved: 'People don\'t know medical courier work exists. Route Harbor shows you how to find it, price it, and build recurring income from it.',
    liveOffers: [
      'Medical Courier Insider Edge — $37 guide',
      'Free first chapter via Opportunity List',
      'Route acquisition math framework',
    ],
    comingSoon: [
      'Video route research walkthrough',
      'Contract pricing calculator',
      'Route Harbor community',
    ],
    relatedProducts: [
      { name: 'Medical Courier Insider Edge', type: 'paid', href: '/products/medical-courier-guide' },
    ],
    districtLanguage: {
      greeting: 'Every route is a revenue stream.',
      callToAction: 'Get the courier guide.',
      returnPrompt: 'Check your route progress.',
    },
    opportunityLanePath: 'interest_route_harbor',
  },
  'flavor-district': {
    id: 'flavor-district',
    name: 'Flavor District',
    brand: 'Breaded Or Not?!',
    color: '#F97316',
    purpose: 'Food business education. Pop-up systems, catering frameworks, menu development, and brand building for food entrepreneurs.',
    audience: 'People who can cook and want to turn that into a business — pop-ups, catering, ghost kitchens, food trucks.',
    problemSolved: 'Most people with cooking talent don\'t know how to turn it into a real business. Flavor District gives you the system.',
    liveOffers: [
      'Breaded Or Not?! brand content',
      'Food business framework overview',
    ],
    comingSoon: [
      'Food Pop-Up Blueprint — paid guide',
      'Catering business playbook',
      'Menu pricing calculator',
      'Pop-up operations checklist',
    ],
    relatedProducts: [
      { name: 'Food Pop-Up Blueprint', type: 'paid', href: '/pricing' },
    ],
    districtLanguage: {
      greeting: 'Recipes into revenue.',
      callToAction: 'Start your food business.',
      returnPrompt: 'Continue building your food brand.',
    },
    opportunityLanePath: 'interest_food',
  },
  'blueprint-bay': {
    id: 'blueprint-bay',
    name: 'Blueprint Bay',
    brand: 'AI Operator Lab',
    color: '#6366F1',
    purpose: 'AI automation tools and business operating systems. Agents, workflows, dashboards, and the infrastructure behind modern businesses.',
    audience: 'Builders and operators who want AI-powered systems instead of manual work.',
    problemSolved: 'AI tools exist but most people don\'t know how to wire them into a real business. Blueprint Bay is the operations layer.',
    liveOffers: [
      'AI Operator framework overview',
      'Tool recommendations and setup guides',
    ],
    comingSoon: [
      'AI Operator Starter Kit — paid guide',
      'Agent workflow templates',
      'Business OS dashboard',
      'Automation playbook series',
    ],
    relatedProducts: [
      { name: 'AI Operator Starter Kit', type: 'paid', href: '/pricing' },
    ],
    districtLanguage: {
      greeting: 'Systems over hustle.',
      callToAction: 'Build your AI business OS.',
      returnPrompt: 'Check your automation progress.',
    },
    opportunityLanePath: 'interest_ai_business',
  },
  'creator-pier': {
    id: 'creator-pier',
    name: 'Creator Pier',
    brand: 'Newsletter Ready Desk',
    color: '#A855F7',
    purpose: 'Content creation systems and creator income infrastructure. Newsletter, affiliate, YouTube, and monetization tools.',
    audience: 'Creators who want to build audience-powered income through content and affiliate systems.',
    problemSolved: 'Most creators post without systems. Creator Pier gives you the infrastructure to monetize consistently.',
    liveOffers: [
      'Newsletter system overview',
      'Creator workflow examples',
      'Affiliate strategy framework',
    ],
    comingSoon: [
      'Newsletter Ready Desk launch',
      'Affiliate income playbook',
      'Content calendar system',
      'YouTube growth framework',
    ],
    relatedProducts: [],
    districtLanguage: {
      greeting: 'Content is the currency.',
      callToAction: 'Build your creator system.',
      returnPrompt: 'Continue your content build.',
    },
    opportunityLanePath: 'interest_creator_tools',
  },
  'fantasy-island': {
    id: 'fantasy-island',
    name: 'Fantasy Island',
    brand: 'Fantasy Island',
    color: '#22C55E',
    purpose: 'Fantasy football intelligence and automation. Draft Bible, live rankings, injury alerts, and subscriber content drops.',
    audience: 'Competitive fantasy football players who want data-driven edges and automated updates.',
    problemSolved: 'Fantasy advice is everywhere but actionable intelligence with automation is rare. Fantasy Island delivers both.',
    liveOffers: [
      'Fantasy draft strategy content',
      'Seasonal ranking updates',
      'Injury and news alerts framework',
    ],
    comingSoon: [
      'Fantasy Draft Bible 2025 — paid guide',
      'Live automated rankings system',
      'Subscriber-only injury alerts',
      'XP rewards and unlocks',
    ],
    relatedProducts: [
      { name: 'Fantasy Draft Bible 2025', type: 'paid', href: '/pricing' },
    ],
    districtLanguage: {
      greeting: 'Draft smart. Stack the edge.',
      callToAction: 'Get fantasy intelligence.',
      returnPrompt: 'Check your fantasy updates.',
    },
    opportunityLanePath: 'interest_fantasy',
  },
  'legacy-point': {
    id: 'legacy-point',
    name: 'Legacy Point',
    brand: 'Scott-King Holdings',
    color: '#EC4899',
    purpose: 'Wealth and ownership education. Credit building, asset acquisition, business structure, and long-term generational wealth systems.',
    audience: 'Anyone thinking beyond income into actual ownership and generational wealth.',
    problemSolved: 'Income is step one. Legacy Point teaches you to convert income into assets that grow without your daily effort.',
    liveOffers: [
      'Wealth mindset framework',
      'Ownership path overview',
    ],
    comingSoon: [
      'Credit building playbook',
      'Asset acquisition framework',
      'Business structure guide',
      'Holdings portfolio system',
    ],
    relatedProducts: [],
    districtLanguage: {
      greeting: 'Own what you build.',
      callToAction: 'Start building your legacy.',
      returnPrompt: 'Continue your ownership path.',
    },
    opportunityLanePath: '',
  },
  'library-vault': {
    id: 'library-vault',
    name: 'Library Vault',
    brand: 'Library Vault',
    color: '#c9a84c',
    purpose: 'Free resources and starter guides across every income lane. No purchase required. Start here if you are not sure where to go.',
    audience: 'Everyone. Especially new visitors who want to explore before committing to a lane.',
    problemSolved: 'You shouldn\'t have to pay to start learning. Library Vault gives you the first steps for free.',
    liveOffers: [
      'Free content hub',
      'Starter frameworks across all lanes',
      'Resource library',
      'Downloadable guides',
    ],
    comingSoon: [
      'Expanded resource library',
      'District-specific starter kits',
      'Community resource contributions',
    ],
    relatedProducts: [],
    districtLanguage: {
      greeting: 'Free knowledge. Unrestricted access.',
      callToAction: 'Browse the vault.',
      returnPrompt: 'Continue exploring resources.',
    },
    opportunityLanePath: '',
  },
}

export function getDistrictContent(id: string): DistrictContent | undefined {
  return districtContent[id]
}
