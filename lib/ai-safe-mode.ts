// ============================================================
// AI Safe Mode — OPS/003
// Central module for AI feature availability checks.
// When AI API keys are not configured, features degrade gracefully
// with "coming soon" messaging instead of errors or crashes.
// ============================================================

/**
 * Returns true if the AI Coach feature is enabled (API key configured).
 * Server-side only — checks process.env directly.
 */
export function isAICoachEnabled(): boolean {
  const provider = (process.env.NEXT_PUBLIC_AI_PROVIDER ?? '').toLowerCase().trim()

  if (!provider || provider === 'mock') return false

  if (provider === 'openai') {
    return Boolean(process.env.OPENAI_API_KEY)
  }

  if (provider === 'anthropic') {
    return Boolean(process.env.ANTHROPIC_API_KEY)
  }

  return false
}

/**
 * Returns the current AI Safe Mode status for API responses.
 * Used by API routes to return a structured "disabled" response
 * instead of exposing missing key errors.
 */
export function getAISafeModeResponse() {
  return {
    enabled: false,
    message: 'AI Coach is coming soon. This feature is currently in development.',
    status: 'safe_mode' as const,
  }
}

/**
 * User-facing message shown when AI features are in safe mode.
 */
export const AI_SAFE_MODE_MESSAGE =
  'AI Coach — coming soon. This feature is currently in development and will be activated once approved.'

/**
 * Short label for UI badges/chips.
 */
export const AI_SAFE_MODE_BADGE = 'Coming Soon'
