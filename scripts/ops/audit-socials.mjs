#!/usr/bin/env node
/**
 * OPS/004 — Social Links Audit
 * Scans the repo for social URLs, flags fake/missing/placeholder/generic links.
 * Never invents URLs — only validates what exists.
 *
 * Usage: node scripts/ops/audit-socials.mjs
 * Output: data/ops/reports/social-audit.json + data/ops/reports/social-audit.md
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'data', 'ops', 'reports')

// Load confirmed social links
const socialData = JSON.parse(readFileSync(join(ROOT, 'data', 'ops', 'social-links.json'), 'utf8'))

// Load the social-links.ts source to compare
const socialSource = readFileSync(join(ROOT, 'lib', 'social-links.ts'), 'utf8')

// Patterns that indicate bad links
const BAD_PATTERNS = [
  { pattern: /\[NEEDS OWNER URL\]/g, reason: 'placeholder_needs_url' },
  { pattern: /example\.com/g, reason: 'example_domain' },
  { pattern: /placeholder/gi, reason: 'placeholder_text' },
  { pattern: /https?:\/\/(www\.)?(youtube|tiktok|instagram|x|facebook|rumble)\.com\/?$/g, reason: 'generic_platform_homepage' },
]

function auditBrand(brandName, links) {
  const results = []

  for (const [platform, data] of Object.entries(links)) {
    const entry = {
      brand: brandName,
      platform,
      url: data.url,
      declaredStatus: data.status,
      issues: [],
    }

    if (!data.url && data.status !== 'missing' && data.status !== 'coming_soon') {
      entry.issues.push('null_url_without_status')
    }

    if (data.url) {
      // Check for generic platform homepages
      const genericPatterns = [
        /^https?:\/\/(www\.)?youtube\.com\/?$/,
        /^https?:\/\/(www\.)?tiktok\.com\/?$/,
        /^https?:\/\/(www\.)?instagram\.com\/?$/,
        /^https?:\/\/(www\.)?x\.com\/?$/,
        /^https?:\/\/(www\.)?facebook\.com\/?$/,
        /^https?:\/\/(www\.)?rumble\.com\/?$/,
      ]
      for (const gp of genericPatterns) {
        if (gp.test(data.url)) {
          entry.issues.push('generic_platform_homepage')
        }
      }

      // Check for placeholder text in URL
      if (data.url.includes('[') || data.url.includes('placeholder') || data.url.includes('example.com')) {
        entry.issues.push('placeholder_url')
      }
    }

    entry.valid = entry.issues.length === 0 && data.status === 'confirmed' && !!data.url
    results.push(entry)
  }

  return results
}

function checkSourceFile() {
  const issues = []
  for (const { pattern, reason } of BAD_PATTERNS) {
    const matches = socialSource.match(pattern)
    if (matches) {
      issues.push({ reason, count: matches.length })
    }
  }
  return issues
}

function run() {
  console.log('\n🔗 Social Links Audit\n')

  const allResults = []
  for (const [brand, links] of Object.entries(socialData)) {
    const brandResults = auditBrand(brand, links)
    allResults.push(...brandResults)
  }

  const sourceIssues = checkSourceFile()

  // Summary
  const confirmed = allResults.filter(r => r.valid)
  const problems = allResults.filter(r => !r.valid)

  console.log(`  Brands scanned: ${Object.keys(socialData).length}`)
  console.log(`  Links checked: ${allResults.length}`)
  console.log(`  ✅ Confirmed: ${confirmed.length}`)
  console.log(`  ⚠️  Issues: ${problems.length}`)

  if (sourceIssues.length > 0) {
    console.log(`\n  Source file issues (lib/social-links.ts):`)
    for (const issue of sourceIssues) {
      console.log(`    ❌ ${issue.reason} (${issue.count} occurrences)`)
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalLinks: allResults.length,
    confirmed: confirmed.length,
    problems: problems.length,
    sourceFileIssues: sourceIssues,
    results: allResults,
  }

  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'social-audit.json'), JSON.stringify(report, null, 2))

  // Markdown
  let md = `# Social Links Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n`
  md += `**Total Links**: ${report.totalLinks}\n`
  md += `**Confirmed**: ${confirmed.length} | **Issues**: ${problems.length}\n\n`

  if (problems.length > 0) {
    md += `## ⚠️ Links With Issues\n\n`
    md += `| Brand | Platform | URL | Status | Issues |\n|-------|----------|-----|--------|--------|\n`
    for (const r of problems) {
      md += `| ${r.brand} | ${r.platform} | ${r.url || 'null'} | ${r.declaredStatus} | ${r.issues.join(', ')} |\n`
    }
    md += `\n`
  }

  md += `## ✅ Confirmed Links\n\n`
  md += `| Brand | Platform | URL |\n|-------|----------|-----|\n`
  for (const r of confirmed) {
    md += `| ${r.brand} | ${r.platform} | ${r.url} |\n`
  }

  if (sourceIssues.length > 0) {
    md += `\n## Source File Issues (lib/social-links.ts)\n\n`
    for (const issue of sourceIssues) {
      md += `- ❌ \`${issue.reason}\` — ${issue.count} occurrences\n`
    }
  }

  writeFileSync(join(REPORTS_DIR, 'social-audit.md'), md)
  console.log(`\n📊 Reports: data/ops/reports/social-audit.json`)
  console.log(`            data/ops/reports/social-audit.md\n`)
}

run()
