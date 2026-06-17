// ── Member Access Tiers ────────────────────────────────────────────────────────
// Four tiers:
//   guest        — no auth, no subscription
//   subscriber   — Beehiiv subscriber (tracked via cookie/localStorage)
//   member       — Supabase auth user with passport profile
//   product_owner — has purchased a specific product (recorded via Stripe webhook)
//
// Access checks are used in API routes (server) and client components.
// For server: use checkProductAccess(email, tag) against Supabase.
// For client: use AccessTier type and the helper hooks.

export type AccessTier = 'guest' | 'subscriber' | 'member' | 'product_owner'

export type ProductTag =
  | 'medical_courier_guide'
  | 'tcu_membership'
  | 'gold_playbook'
  | 'fantasy_draft_bible'
  | 'food_popup_blueprint'
  | 'ai_operator_guide'
  | 'opportunity_vault'

// ── Server-side product access check ──────────────────────────────────────────
// Call from API routes or server components. Requires Supabase service role.

export async function checkProductAccess(
  customerEmail: string,
  tag: ProductTag
): Promise<boolean> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return false
  }
  try {
    const { createServerClient } = await import('./supabase')
    const supabase = createServerClient()
    const { data } = await supabase
      .from('product_access')
      .select('access_tag')
      .eq('customer_email', customerEmail.toLowerCase())
      .eq('access_tag', tag)
      .single()
    return !!data
  } catch {
    return false
  }
}

// ── Server-side all-access list for a user ────────────────────────────────────
export async function getUserAccessTags(customerEmail: string): Promise<ProductTag[]> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return []
  }
  try {
    const { createServerClient } = await import('./supabase')
    const supabase = createServerClient()
    const { data } = await supabase
      .from('product_access')
      .select('access_tag')
      .eq('customer_email', customerEmail.toLowerCase())
    return (data ?? []).map((r: { access_tag: string }) => r.access_tag as ProductTag)
  } catch {
    return []
  }
}

// ── Client-side tier detection ────────────────────────────────────────────────
// Checks localStorage for signals set during the join/auth flow.
// This is soft-trust — server routes must re-verify for any gated content.

export function getClientTier(): AccessTier {
  if (typeof window === 'undefined') return 'guest'
  try {
    const hasPassport = !!localStorage.getItem('skc_passport_user_id')
    if (hasPassport) return 'member'
    const hasSubscribed = !!localStorage.getItem('skc_join_source')
    if (hasSubscribed) return 'subscriber'
  } catch { /* noop */ }
  return 'guest'
}

// ── Tier display labels ────────────────────────────────────────────────────────
export const TIER_LABELS: Record<AccessTier, string> = {
  guest:        'Guest',
  subscriber:   'Opportunity List Subscriber',
  member:       'Coast Member',
  product_owner:'Product Owner',
}
