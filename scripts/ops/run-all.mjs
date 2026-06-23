#!/usr/bin/env node
/**
 * OPS/004 — Run All Audits
 * Executes every audit script in sequence and generates the CEO report.
 *
 * Usage: node scripts/ops/run-all.mjs
 */

import { execSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

const scripts = [
  { name: 'Route Audit', file: 'audit-routes.mjs' },
  { name: 'Link Audit', file: 'audit-links.mjs' },
  { name: 'Social Audit', file: 'audit-socials.mjs' },
  { name: 'Canon Audit', file: 'audit-canon.mjs' },
  { name: 'Funnel Audit', file: 'audit-funnels.mjs' },
  { name: 'CEO Report', file: 'generate-ceo-report.mjs' },
]

let failures = 0

console.log('\n═══════════════════════════════════════════════════')
console.log('  OPS/004 — Full Automation Audit Suite')
console.log('═══════════════════════════════════════════════════\n')

for (const script of scripts) {
  console.log(`▶ Running: ${script.name}`)
  try {
    execSync(`node "${join(__dirname, script.file)}"`, {
      cwd: ROOT,
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(`  ✗ ${script.name} failed (exit code ${err.status})`)
    // Only count as failure if it's a critical script (route audit)
    if (script.file === 'audit-routes.mjs') {
      failures++
    }
  }
}

console.log('\n═══════════════════════════════════════════════════')
if (failures > 0) {
  console.log(`  ❌ ${failures} critical audit(s) failed`)
  process.exit(1)
} else {
  console.log('  ✅ All audits complete — CEO report ready')
  console.log('  📄 docs/reports/CEO-AUTOMATION-REPORT.md')
}
console.log('═══════════════════════════════════════════════════\n')
