/**
 * lib/capture.ts — Shared capture logic for the Opportunity List funnel
 * 
 * All lead capture forms should go through this module.
 * It handles:
 * - Beehiiv newsletter subscription (primary channel)
 * - Supabase leads table (local backup)
 * - Lane/district tagging
 * - Graceful fallback when services are unavailable
 */

// Lane tag mapping — used by both OpportunitySignup and LeadMagnetForm
export const LANE_TAGS: Record<string, string> = {
  interest_trading_chef:  'interest_trading_chef',
  interest_route_harbor:  'interest_route_harbor',
  interest_creator_tools: 'interest_creator_tools',
  interest_fantasy:       'interest_fantasy',
  interest_ai_business:   'interest_ai_business',
  interest_food:          'interest_food',
  interest_fast_income:   'interest_fast_income',
  // LeadMagnetForm interest values → Beehiiv tags
  trading:  'interest_trading_chef',
  courier:  'interest_route_harbor',
  food:     'interest_food',
  playbooks:'interest_fast_income',
  fantasy:  'interest_fantasy',
  ai:       'interest_ai_business',
  all:      'interest_all',
}

// Division → lane tag mapping (for LeadMagnetForm which uses division names)
export const DIVISION_TO_LANE: Record<string, string> = {
  'trading-chef-university': 'interest_trading_chef',
  'trading-chef':            'interest_trading_chef',
  'courier-income-lab':      'interest_route_harbor',
  'breaded':                 'interest_food',
  'playbooks':               'interest_fast_income',
  'fantasy':                 'interest_fantasy',
  'ai-operator-lab':         'interest_ai_business',
  'community':               'interest_all',
  'about':                   'interest_all',
  'website':                 'interest_all',
}

export interface CapturePayload {
  email: string
  name?: string
  interest?: string
  division?: string
  source?: string
  selectedLane?: string
}

export interface CaptureResult {
  ok: boolean
  fallback?: boolean
  reason?: string
  id?: string
}

/**
 * Capture a lead through the unified funnel.
 * Calls /api/newsletter/subscribe (which handles Beehiiv + can be extended for Supabase).
 * Falls back gracefully on any failure.
 */
export async function captureSubscriber(payload: CapturePayload): Promise<CaptureResult> {
  const { email, name, interest, division, source = 'website' } = payload

  // Determine the lane tag from various input sources
  let selectedLane = payload.selectedLane
  if (!selectedLane && interest && LANE_TAGS[interest]) {
    selectedLane = interest
  }
  if (!selectedLane && division && DIVISION_TO_LANE[division]) {
    selectedLane = DIVISION_TO_LANE[division]
  }

  try {
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        name: name?.trim() || undefined,
        selectedLane,
        source: source || division || 'website',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { ok: false, reason: data.error ?? 'subscription_failed' }
    }

    return { ok: true, fallback: data.fallback, reason: data.reason, id: data.id }
  } catch {
    return { ok: false, reason: 'network_error' }
  }
}

/**
 * Also save to Supabase leads table via /api/leads.
 * This is a backup capture path — Beehiiv is primary.
 */
export async function captureLeadLocal(payload: CapturePayload): Promise<boolean> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name?.trim() || 'Subscriber',
        email: payload.email.toLowerCase().trim(),
        interest: payload.interest || payload.selectedLane || 'general',
        division: payload.division || 'website',
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

/**
 * Full capture — Beehiiv first, then Supabase backup.
 * Used by LeadMagnetForm to bridge both systems.
 */
export async function captureFullFunnel(payload: CapturePayload): Promise<CaptureResult> {
  // Fire both in parallel — don't block on Supabase
  const [beehiivResult] = await Promise.all([
    captureSubscriber(payload),
    captureLeadLocal(payload),
  ])

  return beehiivResult
}
