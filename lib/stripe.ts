import Stripe from 'stripe'

// Server-side Stripe client — lazy singleton to avoid crash when env var is missing
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error(
        'Stripe not configured. Add STRIPE_SECRET_KEY to environment variables.'
      )
    }
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  }
  return _stripe
}

// Legacy named export for dynamic imports — delegates to lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

// Product price IDs — set these after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  GOLD_PLAYBOOK:       process.env.STRIPE_PRICE_GOLD_PLAYBOOK       ?? 'price_gold_playbook',
  TCU_MEMBERSHIP:      process.env.STRIPE_PRICE_TCU_MEMBERSHIP       ?? 'price_tcu_membership',
  COURIER_STARTER:     process.env.STRIPE_PRICE_COURIER_STARTER      ?? 'price_courier_starter',
  FOOD_POPUP_BLUEPRINT:process.env.STRIPE_PRICE_FOOD_POPUP           ?? 'price_food_popup',
  FANTASY_DRAFT_BIBLE: process.env.STRIPE_PRICE_FANTASY_DRAFT_BIBLE  ?? 'price_fantasy_draft',
  AI_OPERATOR_GUIDE:   process.env.STRIPE_PRICE_AI_OPERATOR          ?? 'price_ai_operator',
} as const
