#!/usr/bin/env node
/**
 * OPS/004 — Funnel Audit
 * Reads funnel-map.json and inspects pages for capture paths and next actions.
 * Flags incomplete funnels, missing CTAs, and pages without clear destinations.
 *
 * Usage: node scripts/ops/audit-funnels.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'docs', 'reports')
const APP_DIR = join(ROOT, 'app')

const funnelMap = JSON.parse(readFileSync(join(ROOT, 'data', 'ops', 'funnel-map.json'), 'utf8'))

function getPageContent(route) {
  if (route === '/') {
    const p = join(APP_DIR, 'page.tsx')
    return existsSync(p) ? readFileSync(p, 'utf8') : null
  }
  const segment = route.replace(/^\//, '')
  const p1 = join(APP_DIR, segment, 'page.tsx')
  const p2 = join(APP_DIR, segment, 'page.jsx')
  if (existsSync(p1)) return readFileSync(p1, 'utf8')
  if (existsSync(p2)) return readFileSync(p2, 'utf8')
  return null
}

function run() {
  console.log('\n🎯 Funnel Audit\n')

  const results = []

  for (const page of funnelMap.pages) {
    const content = getPageContent(page.route)
    const entry = {
      ...page,
      pageExists: !!content,
      issues: [],
    }

    if (!content) {
      entry.issues.push('page_file_missing')
    } else {
      // Check for capture CTA presence
      if (page.capturePath && !content.includes('opportunity-list') && !content.includes('newsletter') && !content.includes('subscribe') && !content.includes('OpportunitySignup') && !content.includes('LeadMagnet') && !content.includes('SubscribeBox')) {
        entry.issues.push('no_capture_cta_found')
      }

      // Check for product link if product path defined
      if (page.productPath && !content.includes('pricing') && !content.includes('checkout') && !content.includes('product') && !content.includes('Stripe')) {
        entry.issues.push('no_product_link_found')
      }

      // Count signup/CTA buttons
      const ctaCount = (content.match(/OpportunitySignup|LeadMagnet|SubscribeBox|subscribe|Enter The Coast/gi) || []).length
      if (ctaCount > 4) {
        entry.issues.push(`too_many_ctas_${ctaCount}`)
      }
    }

    const icon = entry.issues.length === 0 ? '✅' : '⚠️'
    console.log(`  ${icon} ${page.route} — ${entry.issues.length === 0 ? 'OK' : entry.issues.join(', ')}`)
    results.push(entry)
  }

  const clean = results.filter(r => r.issues.length === 0)
  const flagged = results.filter(r => r.issues.length > 0)

  const report = {
    timestamp: new Date().toISOString(),
    totalPages: results.length,
    clean: clean.length,
    flagged: flagged.length,
    results,
  }

  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'funnel-audit.json'), JSON.stringify(report, null, 2))

  let md = `# Funnel Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n`
  md += `**Pages Audited**: ${report.totalPages}\n`
  md += `**Clean**: ${clean.length} | **Flagged**: ${flagged.length}\n\n`

  if (flagged.length > 0) {
    md += `## ⚠️ Funnel Issues\n\n`
    md += `| Route | Audience | Issues |\n|-------|----------|--------|\n`
    for (const r of flagged) {
      md += `| ${r.route} | ${r.audience} | ${r.issues.join(', ')} |\n`
    }
    md += `\n`
  }

  md += `## ✅ Clean Funnels\n\n`
  md += `| Route | Audience | Next Action |\n|-------|----------|-------------|\n`
  for (const r of clean) {
    md += `| ${r.route} | ${r.audience} | ${r.nextAction} |\n`
  }

  writeFileSync(join(REPORTS_DIR, 'FUNNEL-AUDIT.md'), md)
  console.log(`\n📊 ${clean.length}/${results.length} funnels clean`)
  console.log(`   Reports: docs/reports/FUNNEL-AUDIT.md\n`)
}

run()
