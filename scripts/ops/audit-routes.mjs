#!/usr/bin/env node
/**
 * OPS/004 — Route Audit
 * Reads route-map.json and checks that each expected route has a matching
 * file in the app/ directory.
 *
 * Usage: node scripts/ops/audit-routes.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'docs', 'reports')
const APP_DIR = join(ROOT, 'app')

const routeMap = JSON.parse(readFileSync(join(ROOT, 'data', 'ops', 'route-map.json'), 'utf8'))

function checkRouteExists(route) {
  if (route === '/') {
    return existsSync(join(APP_DIR, 'page.tsx')) || existsSync(join(APP_DIR, 'page.jsx'))
  }

  const segment = route.replace(/^\//, '')
  const parts = segment.split('/')
  const exactDir = join(APP_DIR, ...parts)

  // Check exact page file
  if (existsSync(join(exactDir, 'page.tsx')) || existsSync(join(exactDir, 'page.jsx'))) {
    return true
  }

  // Check dynamic route: look for [param] directories in parent
  if (parts.length >= 2) {
    const parentParts = parts.slice(0, -1)
    const parentDir = join(APP_DIR, ...parentParts)
    if (existsSync(parentDir)) {
      try {
        const entries = readdirSync(parentDir, { withFileTypes: true })
        for (const entry of entries) {
          if (entry.isDirectory() && entry.name.startsWith('[') && entry.name.endsWith(']')) {
            const dynamicDir = join(parentDir, entry.name)
            if (existsSync(join(dynamicDir, 'page.tsx')) || existsSync(join(dynamicDir, 'page.jsx'))) {
              return true
            }
          }
        }
      } catch {}
    }
  }

  return false
}

function run() {
  console.log('\n📁 Route Audit\n')

  const results = []

  for (const entry of routeMap.routes) {
    const exists = checkRouteExists(entry.path)
    const result = { ...entry, fileExists: exists }
    const icon = exists ? '✅' : '❌'
    console.log(`  ${icon} ${entry.path} — ${entry.status}${exists ? '' : ' [FILE MISSING]'}`)
    results.push(result)
  }

  const existing = results.filter(r => r.fileExists)
  const missing = results.filter(r => !r.fileExists)

  const report = {
    timestamp: new Date().toISOString(),
    totalRoutes: results.length,
    existing: existing.length,
    missing: missing.length,
    results,
  }

  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'route-audit.json'), JSON.stringify(report, null, 2))

  let md = `# Route Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n`
  md += `**Total Expected Routes**: ${report.totalRoutes}\n`
  md += `**Existing**: ${existing.length} | **Missing**: ${missing.length}\n\n`

  if (missing.length > 0) {
    md += `## ❌ Missing Route Files\n\n`
    md += `| Route | Status | Notes |\n|-------|--------|-------|\n`
    for (const r of missing) {
      md += `| ${r.path} | ${r.status} | ${r.notes} |\n`
    }
    md += `\n`
  }

  md += `## ✅ Existing Routes\n\n`
  md += `| Route | Status | Notes |\n|-------|--------|-------|\n`
  for (const r of existing) {
    md += `| ${r.path} | ${r.status} | ${r.notes} |\n`
  }

  writeFileSync(join(REPORTS_DIR, 'ROUTE-AUDIT.md'), md)
  console.log(`\n📊 ${existing.length}/${results.length} routes have files`)
  console.log(`   Reports: docs/reports/route-audit.json + docs/reports/ROUTE-AUDIT.md\n`)
}

run()
