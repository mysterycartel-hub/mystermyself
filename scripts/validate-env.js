#!/usr/bin/env node

/**
 * MysterMyself — Build-Time Environment Variable Validator
 * Runs as "prebuild" script. Fails the build if required vars are missing or placeholders.
 *
 * Skip with: CI_SKIP_ENV_VALIDATE=true (only for CI test pipelines)
 */

if (process.env.CI_SKIP_ENV_VALIDATE === 'true') {
  console.log('⏭  ENV validation skipped (CI_SKIP_ENV_VALIDATE=true)')
  process.exit(0)
}

const required = {
  NEXT_PUBLIC_SUPABASE_URL: {
    validate: (v) => v.startsWith('https://') && v.includes('.supabase.co'),
    hint: 'Must be https://xxxx.supabase.co — find it in Supabase → Settings → API → Project URL',
    example: 'https://abcdefghijkl.supabase.co',
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    validate: (v) => v.length > 100 && v.startsWith('eyJ'),
    hint: 'Must be the anon/public JWT (200+ chars, starts with eyJ) — find it in Supabase → Settings → API',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    validate: (v) => v.length > 100 && v.startsWith('eyJ'),
    hint: 'Must be the service_role JWT (different from anon key) — find it in Supabase → Settings → API',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  BEEHIIV_API_KEY: {
    validate: (v) => v.length > 20 && v.toLowerCase() !== 'beehiiv_api_key',
    hint: 'Must be your Beehiiv API key (40+ chars) — find it in Beehiiv → Settings → Integrations → API Keys',
    example: 'bh_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  BEEHIIV_PUBLICATION_ID: {
    validate: (v) => v.startsWith('pub_'),
    hint: 'Must start with pub_ — find it in Beehiiv → Settings → scroll to Publication ID',
    example: 'pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7',
  },
}

const errors = []

for (const [key, config] of Object.entries(required)) {
  const value = process.env[key]

  if (!value || value.trim() === '') {
    errors.push({
      type: 'MISSING',
      key,
      hint: config.hint,
      example: config.example,
    })
    continue
  }

  // Check if value is literally the key name (placeholder)
  if (value.toLowerCase() === key.toLowerCase() || value.toLowerCase() === key.toLowerCase().replace(/_/g, '')) {
    errors.push({
      type: 'PLACEHOLDER DETECTED',
      key,
      hint: `Value is "${value}" which is just the variable name, not a real value`,
      example: config.example,
    })
    continue
  }

  // Check format
  if (!config.validate(value)) {
    errors.push({
      type: 'INVALID FORMAT',
      key,
      hint: config.hint,
      example: config.example,
    })
  }
}

if (errors.length > 0) {
  console.error('')
  console.error('╔══════════════════════════════════════════════════════════════════╗')
  console.error('║  ❌  ENV VAR VALIDATION FAILED — Build cannot continue          ║')
  console.error('╚══════════════════════════════════════════════════════════════════╝')
  console.error('')

  for (const err of errors) {
    console.error(`  [${err.type}] ${err.key}`)
    console.error(`    → ${err.hint}`)
    console.error(`    → Example: ${err.example}`)
    console.error('')
  }

  console.error('──────────────────────────────────────────────────────────────────')
  console.error('  Fix these in Vercel → Settings → Environment Variables')
  console.error('  Then redeploy. See ENV-SETUP.md for detailed instructions.')
  console.error('──────────────────────────────────────────────────────────────────')
  console.error('')

  process.exit(1)
}

console.log('✓ All environment variables validated — build continuing')
