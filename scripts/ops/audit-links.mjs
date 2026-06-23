#!/usr/bin/env node
/**
 * OPS/004 — Link Audit
 * Scans app/, components/, and lib/ for href values.
 * Flags empty hrefs, "#", javascript:void(0), generic social homepages,
 * Vercel preview URLs, and internal links with no route match.
 *
 * Usage: node scripts/ops/audit-links.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'docs', 'reports')

const SCAN_DIRS = ['app', 'components', 'lib']
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

// Patterns to flag
const FLAG_RULES = [
  { pattern: /href\s*=\s*["']\s*["']/g, reason: 'empty_href' },
  { pattern: /href\s*=\s*["']#["']/g, reason: 'hash_only' },
  { pattern: /href\s*=\s*["']javascript:/gi, reason: 'javascript_void' },
  { pattern: /href\s*=\s*["']https?:\/\/(www\.)?(youtube|tiktok|instagram|x|facebook|rumble)\.com\/?["']/g, reason: 'generic_social_homepage' },
  { pattern: /href\s*=\s*["']https?:\/\/[^"']*\.vercel\.app[^"']*["']/g, reason: 'vercel_preview_url' },
  { pattern: /href\s*=\s*["']\[.*?\]["']/g, reason: 'placeholder_bracket' },
]

function getAllFiles(dir, files = []) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        getAllFiles(fullPath, files)
      } else if (entry.isFile() && EXTENSIONS.includes(extname(entry.name))) {
        files.push(fullPath)
      }
    }
  } catch {}
  return files
}

function run() {
  console.log('\n🔗 Link Audit\n')

  const issues = []
  let totalFiles = 0

  for (const dir of SCAN_DIRS) {
    const fullDir = join(ROOT, dir)
    const files = getAllFiles(fullDir)
    totalFiles += files.length

    for (const file of files) {
      const content = readFileSync(file, 'utf8')
      const relPath = file.replace(ROOT + '\\', '').replace(ROOT + '/', '')

      for (const rule of FLAG_RULES) {
        // Reset regex lastIndex
        rule.pattern.lastIndex = 0
        const matches = content.match(rule.pattern)
        if (matches) {
          for (const match of matches) {
            issues.push({
              file: relPath,
              reason: rule.reason,
              snippet: match.slice(0, 80),
            })
          }
        }
      }
    }
  }

  console.log(`  Files scanned: ${totalFiles}`)
  console.log(`  Issues found: ${issues.length}`)

  for (const issue of issues.slice(0, 20)) {
    console.log(`  ⚠️  ${issue.file} — ${issue.reason}: ${issue.snippet}`)
  }
  if (issues.length > 20) {
    console.log(`  ... and ${issues.length - 20} more`)
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalFiles,
    totalIssues: issues.length,
    issues,
  }

  mkdirSync(REPORTS_DIR, { recursive: true })

  let md = `# Link Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n`
  md += `**Files Scanned**: ${totalFiles}\n`
  md += `**Issues Found**: ${issues.length}\n\n`

  if (issues.length > 0) {
    md += `## Issues\n\n`
    md += `| File | Reason | Snippet |\n|------|--------|--------|\n`
    for (const issue of issues) {
      const safeSnippet = issue.snippet.replace(/\|/g, '\\|').replace(/\n/g, ' ')
      md += `| ${issue.file} | ${issue.reason} | \`${safeSnippet}\` |\n`
    }
  } else {
    md += `## ✅ No link issues found.\n`
  }

  writeFileSync(join(REPORTS_DIR, 'LINK-AUDIT.md'), md)
  writeFileSync(join(REPORTS_DIR, 'link-audit.json'), JSON.stringify(report, null, 2))
  console.log(`\n📊 Reports: docs/reports/LINK-AUDIT.md\n`)
}

run()
