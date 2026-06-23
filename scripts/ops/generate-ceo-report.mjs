#!/usr/bin/env node
/**
 * OPS/004 — CEO Report Generator
 * Combines all audit reports into a plain-English CEO summary.
 *
 * Usage: node scripts/ops/generate-ceo-report.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'docs', 'reports')

function loadJson(filename) {
  const path = join(REPORTS_DIR, filename)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8'))
}

function run() {
  console.log('\n📋 Generating CEO Report...\n')

  const routeAudit = loadJson('route-audit.json')
  const linkAudit = loadJson('link-audit.json')
  const socialAudit = loadJson('social-audit.json')
  const canonAudit = loadJson('canon-audit.json')
  const funnelAudit = loadJson('funnel-audit.json')

  let md = `# CEO Automation Report — MysterMyself / Scott-King Coast\n\n`
  md += `**Generated**: ${new Date().toISOString()}\n`
  md += `**Domain**: mystermyself.com\n`
  md += `**Repo**: mysterycartel-hub/mystermyself\n\n`
  md += `---\n\n`

  // WHAT WORKS
  md += `## ✅ What Works\n\n`
  const working = []
  if (routeAudit) working.push(`${routeAudit.existing}/${routeAudit.totalRoutes} expected routes have files`)
  if (socialAudit) working.push(`${socialAudit.confirmed}/${socialAudit.totalLinks} social links confirmed`)
  if (canonAudit) {
    working.push(`${canonAudit.districts.present}/${canonAudit.districts.total} districts referenced in code`)
    working.push(`${canonAudit.characters.present}/${canonAudit.characters.total} TCU characters referenced`)
  }
  if (funnelAudit) working.push(`${funnelAudit.clean}/${funnelAudit.totalPages} funnel pages are clean`)
  for (const w of working) md += `- ${w}\n`

  // WHAT IS BROKEN
  md += `\n## ❌ What Is Broken or Missing\n\n`
  const broken = []
  if (routeAudit && routeAudit.missing > 0) {
    const missingRoutes = routeAudit.results.filter(r => !r.fileExists).map(r => r.path)
    broken.push(`Missing route files: ${missingRoutes.join(', ')}`)
  }
  if (linkAudit && linkAudit.totalIssues > 0) broken.push(`${linkAudit.totalIssues} link issues (empty hrefs, placeholders, generic URLs)`)
  if (socialAudit && socialAudit.problems > 0) broken.push(`${socialAudit.problems} social links need attention`)
  if (canonAudit) {
    if (canonAudit.characters.missing > 0) broken.push(`${canonAudit.characters.missing} TCU characters not referenced visually`)
    if (canonAudit.keyTerms.missing > 0) {
      const terms = canonAudit.keyTerms.details.filter(t => !t.found).map(t => t.term)
      broken.push(`Missing key terms: ${terms.join(', ')}`)
    }
  }
  if (funnelAudit && funnelAudit.flagged > 0) broken.push(`${funnelAudit.flagged} pages have funnel issues`)
  if (broken.length === 0) broken.push('No critical issues detected')
  for (const b of broken) md += `- ${b}\n`

  // WHAT IS SAFE TO BUILD NEXT
  md += `\n## 🔨 Safe To Build Next\n\n`
  md += `1. **OPS/004A** — Link/button/social cleanup (fix broken hrefs and placeholders)\n`
  md += `2. **OPS/004B** — Opportunity List capture engine (ensure form works end-to-end)\n`
  md += `3. **OPS/004C** — Scott-King Coast interactive district selector\n`
  md += `4. **OPS/004D** — TCU canon visual layer (character cards, district branding)\n`
  md += `5. **OPS/004E** — Product funnel cleanup (pricing → checkout → access)\n`
  md += `6. **OPS/004F** — Dashboard/passport/progress system\n`

  // NEEDS APPROVAL
  md += `\n## 🔴 Needs Maurice Approval\n\n`
  md += `- Any git push to main\n`
  md += `- Any Vercel production deploy\n`
  md += `- Any Stripe product/price changes\n`
  md += `- Any Beehiiv live API changes\n`
  md += `- Any Supabase schema migrations\n`
  md += `- Any new paid service activation\n`
  md += `- Any canon changes (new brands, districts, characters)\n`

  // RECOMMENDED NEXT PHASE
  md += `\n## 📍 Recommended Next Phase\n\n`
  md += `**OPS/004A — Link and Social Cleanup**\n`
  md += `- Fix all placeholder links\n`
  md += `- Replace generic social homepages with real profile URLs\n`
  md += `- Remove or fix javascript:void(0) and empty href values\n`
  md += `- Ensure all nav items lead somewhere useful\n`
  md += `- No new features, just cleanup\n`

  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'CEO-AUTOMATION-REPORT.md'), md)
  console.log('  ✅ CEO report generated: docs/reports/CEO-AUTOMATION-REPORT.md\n')
}

run()
