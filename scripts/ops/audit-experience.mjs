#!/usr/bin/env node
/**
 * OPS/005 — Experience Audit
 * Validates that the Scott-King Coast website meets the finalization criteria.
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

let pass = 0
let fail = 0
const results = []

function check(desc, condition) {
  if (condition) {
    pass++
    results.push(`  ✓ ${desc}`)
  } else {
    fail++
    results.push(`  ✗ ${desc}`)
  }
}

function fileExists(path) {
  return existsSync(join(ROOT, path))
}

function fileContains(path, text) {
  if (!fileExists(path)) return false
  const content = readFileSync(join(ROOT, path), 'utf-8')
  return content.includes(text)
}

console.log('\n──────────────────────────────────────')
console.log('  OPS/005 — Experience Audit')
console.log('──────────────────────────────────────\n')

// Homepage checks
console.log('  HOMEPAGE:')
check('Homepage exists', fileExists('app/page.tsx'))
check('Homepage imports CoastIntro (Meet the Coast)', fileContains('app/page.tsx', 'CoastIntro'))
check('Homepage imports DistrictActionGrid (Enter a District)', fileContains('app/page.tsx', 'DistrictActionGrid'))
check('Homepage imports CharacterSection (Meet the Kitchen)', fileContains('app/page.tsx', 'CharacterSection'))
check('Homepage imports CoastOpportunities', fileContains('app/page.tsx', 'CoastOpportunities'))
check('Homepage imports PassportPreview', fileContains('app/page.tsx', 'PassportPreview'))
check('Homepage imports ScottKingCoastMap', fileContains('app/page.tsx', 'ScottKingCoastMap'))

// District checks
console.log('\n  DISTRICTS:')
check('Dynamic district page exists', fileExists('app/coast/[district]/page.tsx'))
check('Coast hub page exists', fileExists('app/coast/page.tsx'))
check('District content data exists', fileExists('lib/district-content.ts'))
const districtContent = fileExists('lib/district-content.ts')
  ? readFileSync(join(ROOT, 'lib/district-content.ts'), 'utf-8')
  : ''
check('Market Marina content defined', districtContent.includes("'market-marina'"))
check('Route Harbor content defined', districtContent.includes("'route-harbor'"))
check('Flavor District content defined', districtContent.includes("'flavor-district'"))
check('Blueprint Bay content defined', districtContent.includes("'blueprint-bay'"))
check('Creator Pier content defined', districtContent.includes("'creator-pier'"))
check('Fantasy Island content defined', districtContent.includes("'fantasy-island'"))
check('Legacy Point content defined', districtContent.includes("'legacy-point'"))
check('Library Vault content defined', districtContent.includes("'library-vault'"))

// Market Marina / TCU checks
console.log('\n  MARKET MARINA / TCU:')
check('Market Marina page exists', fileExists('app/market-marina/page.tsx'))
check('Market Marina has TCU characters component', fileContains('app/market-marina/page.tsx', 'MarketMarinaCharacters'))
check('Market Marina has Academy component', fileContains('app/market-marina/page.tsx', 'MarketMarinaAcademy'))
check('Market Marina has Kitchen Terminal', fileContains('app/market-marina/page.tsx', 'TCUMarketKitchenTerminal'))

// Character canon checks
console.log('\n  CANON CHARACTERS:')
const charSection = fileExists('components/home/CharacterSection.tsx')
  ? readFileSync(join(ROOT, 'components/home/CharacterSection.tsx'), 'utf-8')
  : ''
check('Trading Chef present', charSection.includes('The Trading Chef'))
check('Candle Kid present', charSection.includes('Candle Kid'))
check('Wickie present', charSection.includes('Wickie'))
check('Louie Liquidity present', charSection.includes('Louie Liquidity'))
check('Chef Goldie present', charSection.includes('Chef Goldie'))
check('Grandma Market present', charSection.includes('Grandma Market'))
check('Nana Value present', charSection.includes('Nana Value'))
check('Melissa Mayhem present', charSection.includes('Melissa Mayhem'))
check('Melody Mayhem present', charSection.includes('Melody Mayhem'))
check('No non-canon Penny The Saver', !charSection.includes('Penny The Saver'))
check('No non-canon Flip The Risk-Taker', !charSection.includes('Flip The Risk-Taker'))

// Dashboard checks
console.log('\n  DASHBOARD:')
check('Dashboard page exists', fileExists('app/dashboard/page.tsx'))
const dashboard = fileExists('app/dashboard/page.tsx')
  ? readFileSync(join(ROOT, 'app/dashboard/page.tsx'), 'utf-8')
  : ''
check('Dashboard has district navigation', dashboard.includes('Navigate Districts') || dashboard.includes('DISTRICT_LINKS'))
check('Dashboard has lane recommendation', dashboard.includes('LANE_RECOMMENDATIONS') || dashboard.includes('Recommended Next'))
check('Dashboard links to passport', dashboard.includes('/passport'))
check('Dashboard links back to coast', dashboard.includes('/coast'))

// Opportunity List checks
console.log('\n  OPPORTUNITY LIST:')
check('Opportunity List page exists', fileExists('app/opportunity-list/page.tsx'))
check('OpportunitySignup component exists', fileExists('components/OpportunitySignup.tsx'))
const oppSignup = fileExists('components/OpportunitySignup.tsx')
  ? readFileSync(join(ROOT, 'components/OpportunitySignup.tsx'), 'utf-8')
  : ''
check('Has trading chef lane', oppSignup.includes('interest_trading_chef'))
check('Has route harbor lane', oppSignup.includes('interest_route_harbor'))
check('Has food lane', oppSignup.includes('interest_food'))
check('Has AI lane', oppSignup.includes('interest_ai_business'))
check('Has fantasy lane', oppSignup.includes('interest_fantasy'))
check('Has creator lane', oppSignup.includes('interest_creator_tools'))

// No fake links
console.log('\n  LINK QUALITY:')
const pagesDir = join(ROOT, 'app')
check('No NEEDS_OWNER_URL in district page', !fileContains('app/coast/[district]/page.tsx', 'NEEDS OWNER URL'))
check('No placeholder # links in coast page', !fileContains('app/coast/page.tsx', 'href="#"'))

console.log('\n──────────────────────────────────────')
console.log(`  Results: ${pass} passed, ${fail} failed`)
console.log('──────────────────────────────────────\n')

if (fail > 0) {
  console.log('  Failed checks:')
  results.filter(r => r.includes('✗')).forEach(r => console.log(r))
  console.log('')
}

process.exit(fail > 0 ? 1 : 0)
