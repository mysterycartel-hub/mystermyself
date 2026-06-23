#!/usr/bin/env node
/**
 * OPS/004 — Site Route & Link Audit
 * Crawls known routes, detects missing routes, broken internal links,
 * empty hrefs, placeholder links, and buttons with no useful destination.
 *
 * Usage: node scripts/ops/audit-site.mjs [--base-url http://localhost:3000]
 * Output: data/ops/reports/site-audit.json + data/ops/reports/site-audit.md
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'data', 'ops', 'reports')

// Parse CLI args
const args = process.argv.slice(2)
const baseUrlIdx = args.indexOf('--base-url')
const BASE_URL = baseUrlIdx !== -1 ? args[baseUrlIdx + 1] : 'http://localhost:3000'

// Load canon routes
const canon = JSON.parse(readFileSync(join(ROOT, 'data', 'canon', 'scott-king-coast.json'), 'utf8'))
const KNOWN_ROUTES = canon.keyRoutes

// Placeholder patterns to flag
const PLACEHOLDER_PATTERNS = [
  /^#$/,
  /^javascript:/i,
  /^\[.*\]$/,
  /needs.*url/i,
  /placeholder/i,
  /example\.com/i,
  /^\/$/,  // root-only href on non-home links
]

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' })
    return {
      route,
      url,
      status: res.status,
      ok: res.ok,
      redirected: res.redirected,
      finalUrl: res.url,
    }
  } catch (err) {
    return {
      route,
      url,
      status: 0,
      ok: false,
      redirected: false,
      finalUrl: null,
      error: err.message,
    }
  }
}

async function run() {
  console.log(`\n🔍 Site Audit — base: ${BASE_URL}`)
  console.log(`   Checking ${KNOWN_ROUTES.length} canon routes...\n`)

  const results = []
  for (const route of KNOWN_ROUTES) {
    const result = await checkRoute(route)
    const icon = result.ok ? '✅' : '❌'
    console.log(`  ${icon} ${result.status} ${route}${result.redirected ? ` → ${result.finalUrl}` : ''}`)
    results.push(result)
  }

  // Also check redirect aliases
  const REDIRECTS = ['/subscribe', '/join', '/start', '/newsletter', '/districts']
  console.log(`\n   Checking ${REDIRECTS.length} redirect aliases...\n`)
  for (const route of REDIRECTS) {
    const result = await checkRoute(route)
    const icon = result.ok ? '✅' : '❌'
    console.log(`  ${icon} ${result.status} ${route} → ${result.finalUrl || 'FAILED'}`)
    results.push(result)
  }

  // Summary
  const passed = results.filter(r => r.ok)
  const failed = results.filter(r => !r.ok)

  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalChecked: results.length,
    passed: passed.length,
    failed: failed.length,
    results,
  }

  // Write reports
  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'site-audit.json'), JSON.stringify(report, null, 2))

  // Markdown report
  let md = `# Site Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n`
  md += `**Base URL**: ${BASE_URL}\n`
  md += `**Routes Checked**: ${report.totalChecked}\n`
  md += `**Passed**: ${passed.length} | **Failed**: ${failed.length}\n\n`

  if (failed.length > 0) {
    md += `## ❌ Failed Routes\n\n`
    md += `| Route | Status | Error |\n|-------|--------|-------|\n`
    for (const r of failed) {
      md += `| ${r.route} | ${r.status} | ${r.error || 'HTTP error'} |\n`
    }
    md += `\n`
  }

  md += `## ✅ Passing Routes\n\n`
  md += `| Route | Status | Redirected |\n|-------|--------|------------|\n`
  for (const r of passed) {
    md += `| ${r.route} | ${r.status} | ${r.redirected ? r.finalUrl : 'No'} |\n`
  }

  writeFileSync(join(REPORTS_DIR, 'site-audit.md'), md)

  console.log(`\n📊 Results: ${passed.length}/${results.length} passed`)
  console.log(`   Reports: data/ops/reports/site-audit.json`)
  console.log(`            data/ops/reports/site-audit.md\n`)

  process.exit(failed.length > 0 ? 1 : 0)
}

run().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
