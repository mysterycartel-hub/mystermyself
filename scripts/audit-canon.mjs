#!/usr/bin/env node

/**
 * TCU Canon Audit Script
 *
 * Checks:
 * 1. No non-canon character names in component files
 * 2. CharacterSection imports from data/tcu-character-canon.ts (or uses TCU_CHARACTERS)
 * 3. Market Marina page includes TradingChefSpotlight or TCUCharacterCanonStrip
 * 4. Opportunity List form has Trading Chef–specific language for TCU lane
 * 5. /public/characters/ directory exists (warn if no PNGs)
 *
 * Exit 0 = pass, Exit 1 = fail
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const BANNED_CHARACTERS = ['penny', 'rico rhythm', 'burn alarm', 'profit plate']

let errors = 0
let warnings = 0
let passes = 0

function fail(msg) {
  console.error(`  ❌ FAIL: ${msg}`)
  errors++
}

function warn(msg) {
  console.warn(`  ⚠️  WARN: ${msg}`)
  warnings++
}

function pass(msg) {
  console.log(`  ✅ PASS: ${msg}`)
  passes++
}

console.log('')
console.log('═══════════════════════════════════════════════════')
console.log('  TCU CANON AUDIT')
console.log('═══════════════════════════════════════════════════')
console.log('')

// ─── Check 1: No banned character names in component files ───────────────────

console.log('[1/5] Checking for non-canon character names...')

const SCAN_DIRS = ['components', 'app', 'data']
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

function scanDir(dir) {
  if (!existsSync(dir)) return []
  const files = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '.next') {
      files.push(...scanDir(full))
    } else if (entry.isFile() && SCAN_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      files.push(full)
    }
  }
  return files
}

// Files that are NEW in OPS/008B — these MUST be clean
const NEW_FILES = [
  'data/tcu-character-canon.ts',
  'components/tcu/TCUAvatarPlaceholder.tsx',
  'components/tcu/TCUCharacterCanonStrip.tsx',
  'components/tcu/TradingChefSpotlight.tsx',
  'components/tcu/CharacterCoachCards.tsx',
]

let bannedFound = false
for (const dir of SCAN_DIRS) {
  const files = scanDir(join(ROOT, dir))
  for (const file of files) {
    const content = readFileSync(file, 'utf-8')
    const relPath = file.replace(ROOT + '/', '')
    const lines = content.split('\n')
    const isNewFile = NEW_FILES.some(p => relPath.endsWith(p))
    
    for (const banned of BANNED_CHARACTERS) {
      for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum].toLowerCase()
        if (!line.includes(banned)) continue
        
        // Skip if line is a comment, a BANNED declaration, or documentation
        const trimmed = lines[lineNum].trim()
        if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue
        if (line.includes('banned') || line.includes('do not') || line.includes('never use')) continue
        
        if (isNewFile) {
          // New files MUST NOT have banned names in active code
          fail(`Banned character "${banned}" in NEW file: ${relPath}:${lineNum + 1}`)
          bannedFound = true
        } else {
          // Legacy files get a warning only (tech debt — not blocking this PR)
          warn(`Banned character "${banned}" in LEGACY file: ${relPath}:${lineNum + 1} (refactor later)`)
          break // One warning per file per character is enough
        }
      }
    }
  }
}
if (!bannedFound) {
  pass('No banned character names found in new OPS/008B files')
}

// ─── Check 2: CharacterSection uses canon data ───────────────────────────────

console.log('')
console.log('[2/5] Checking CharacterSection imports...')

const charSectionPath = join(ROOT, 'components/home/CharacterSection.tsx')
if (existsSync(charSectionPath)) {
  const content = readFileSync(charSectionPath, 'utf-8')
  if (content.includes('tcu-character-canon') || content.includes('TCU_CHARACTERS')) {
    pass('CharacterSection imports from tcu-character-canon.ts')
  } else {
    warn('CharacterSection does NOT import from tcu-character-canon.ts (uses hardcoded data — refactor recommended)')
  }
} else {
  warn('CharacterSection.tsx not found (may have been removed or renamed)')
}

// ─── Check 3: Market Marina includes TCU components ──────────────────────────

console.log('')
console.log('[3/5] Checking Market Marina page...')

const marketMarinaPath = join(ROOT, 'app/market-marina/page.tsx')
if (existsSync(marketMarinaPath)) {
  const content = readFileSync(marketMarinaPath, 'utf-8')
  const hasSpotlight = content.includes('TradingChefSpotlight')
  const hasStrip = content.includes('TCUCharacterCanonStrip')
  const hasCoach = content.includes('CharacterCoachCards')

  if (hasSpotlight) pass('Market Marina includes TradingChefSpotlight')
  else fail('Market Marina missing TradingChefSpotlight')

  if (hasStrip) pass('Market Marina includes TCUCharacterCanonStrip')
  else fail('Market Marina missing TCUCharacterCanonStrip')

  if (hasCoach) pass('Market Marina includes CharacterCoachCards')
  else warn('Market Marina missing CharacterCoachCards (optional)')
} else {
  fail('app/market-marina/page.tsx not found')
}

// ─── Check 4: Opportunity List has TCU-specific language ─────────────────────

console.log('')
console.log('[4/5] Checking Opportunity List for TCU lane language...')

const oppListPath = join(ROOT, 'app/opportunity-list/page.tsx')
if (existsSync(oppListPath)) {
  const content = readFileSync(oppListPath, 'utf-8')
  if (content.includes('TCUCharacterCanonStrip') || content.includes('tcu-character-canon')) {
    pass('Opportunity List uses TCU canon component')
  } else if (content.includes('Trading Chef') || content.includes('trading_chef')) {
    pass('Opportunity List has Trading Chef–specific language')
  } else {
    warn('Opportunity List has no TCU-specific language for trading lane')
  }
} else {
  fail('app/opportunity-list/page.tsx not found')
}

// ─── Check 5: /public/characters/ directory exists ───────────────────────────

console.log('')
console.log('[5/5] Checking /public/characters/ directory...')

const charsDir = join(ROOT, 'public/characters')
if (existsSync(charsDir)) {
  const files = readdirSync(charsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'))
  if (files.length > 0) {
    pass(`/public/characters/ exists with ${files.length} image(s): ${files.join(', ')}`)
  } else {
    warn('/public/characters/ exists but has no image files yet (placeholders active)')
  }
  pass('/public/characters/ directory exists')
} else {
  warn('/public/characters/ directory does not exist (will be created on first asset drop)')
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('')
console.log('═══════════════════════════════════════════════════')
console.log(`  RESULTS: ${passes} passed, ${warnings} warnings, ${errors} failed`)
console.log('═══════════════════════════════════════════════════')
console.log('')

if (errors > 0) {
  console.error('  ❌ CANON AUDIT FAILED — fix errors above before merging')
  process.exit(1)
} else {
  console.log('  ✅ CANON AUDIT PASSED')
  process.exit(0)
}
