#!/usr/bin/env node
/**
 * OPS/004 — Canon Audit
 * Reads scott-king-coast.json and scans public pages for canon term representation.
 * Reports missing district/canon/TCU/character visual references.
 *
 * Usage: node scripts/ops/audit-canon.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const REPORTS_DIR = join(ROOT, 'docs', 'reports')

const canon = JSON.parse(readFileSync(join(ROOT, 'data', 'canon', 'scott-king-coast.json'), 'utf8'))

const SCAN_DIRS = ['app', 'components', 'lib']
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

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

function searchCorpus(corpus, term) {
  const lower = term.toLowerCase()
  return corpus.toLowerCase().includes(lower)
}

function run() {
  console.log('\n📜 Canon Audit\n')

  // Build corpus from all source files
  let corpus = ''
  for (const dir of SCAN_DIRS) {
    const files = getAllFiles(join(ROOT, dir))
    for (const file of files) {
      corpus += readFileSync(file, 'utf8') + '\n'
    }
  }

  const districtResults = []
  for (const district of canon.districts) {
    const found = searchCorpus(corpus, district.name)
    districtResults.push({ name: district.name, id: district.id, found })
    const icon = found ? '✅' : '❌'
    console.log(`  ${icon} District: ${district.name}`)
  }

  const characterResults = []
  for (const char of canon.characters) {
    const found = searchCorpus(corpus, char.name)
    characterResults.push({ name: char.name, role: char.role, found })
    const icon = found ? '✅' : '❌'
    console.log(`  ${icon} Character: ${char.name}`)
  }

  const productResults = []
  for (const product of canon.products) {
    const found = searchCorpus(corpus, product.name)
    productResults.push({ name: product.name, division: product.division, found })
  }

  // Check key terms
  const keyTerms = [
    'Scott-King Coast', 'MysterMyself', 'Opportunity List',
    'MS Crown', 'Trading Chef Universe', 'TCU',
    'Breaded Or Not', 'Knighten Route', 'Newsletter Ready Desk',
  ]
  const termResults = []
  for (const term of keyTerms) {
    const found = searchCorpus(corpus, term)
    termResults.push({ term, found })
  }

  const missingDistricts = districtResults.filter(d => !d.found)
  const missingCharacters = characterResults.filter(c => !c.found)
  const missingProducts = productResults.filter(p => !p.found)
  const missingTerms = termResults.filter(t => !t.found)

  const report = {
    timestamp: new Date().toISOString(),
    districts: { total: districtResults.length, present: districtResults.filter(d => d.found).length, missing: missingDistricts.length, details: districtResults },
    characters: { total: characterResults.length, present: characterResults.filter(c => c.found).length, missing: missingCharacters.length, details: characterResults },
    products: { total: productResults.length, present: productResults.filter(p => p.found).length, missing: missingProducts.length, details: productResults },
    keyTerms: { total: termResults.length, present: termResults.filter(t => t.found).length, missing: missingTerms.length, details: termResults },
  }

  mkdirSync(REPORTS_DIR, { recursive: true })
  writeFileSync(join(REPORTS_DIR, 'canon-audit.json'), JSON.stringify(report, null, 2))

  let md = `# Canon Audit Report\n\n`
  md += `**Date**: ${report.timestamp}\n\n`
  md += `## Districts (${report.districts.present}/${report.districts.total} present)\n\n`
  for (const d of districtResults) {
    md += `- ${d.found ? '✅' : '❌'} ${d.name}\n`
  }

  md += `\n## Characters (${report.characters.present}/${report.characters.total} present)\n\n`
  for (const c of characterResults) {
    md += `- ${c.found ? '✅' : '❌'} ${c.name} — ${c.role}\n`
  }

  md += `\n## Products (${report.products.present}/${report.products.total} present)\n\n`
  for (const p of productResults) {
    md += `- ${p.found ? '✅' : '❌'} ${p.name} (${p.division})\n`
  }

  md += `\n## Key Terms (${report.keyTerms.present}/${report.keyTerms.total} present)\n\n`
  for (const t of termResults) {
    md += `- ${t.found ? '✅' : '❌'} ${t.term}\n`
  }

  if (missingDistricts.length > 0 || missingCharacters.length > 0 || missingTerms.length > 0) {
    md += `\n## ⚠️ Canon Gaps\n\n`
    if (missingDistricts.length > 0) md += `**Missing districts**: ${missingDistricts.map(d => d.name).join(', ')}\n`
    if (missingCharacters.length > 0) md += `**Missing characters**: ${missingCharacters.map(c => c.name).join(', ')}\n`
    if (missingTerms.length > 0) md += `**Missing terms**: ${missingTerms.map(t => t.term).join(', ')}\n`
  }

  writeFileSync(join(REPORTS_DIR, 'CANON-AUDIT.md'), md)
  console.log(`\n📊 Reports: docs/reports/CANON-AUDIT.md\n`)
}

run()
