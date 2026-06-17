import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Stripe sends raw body — must not parse as JSON before verifying signature
export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeKey || !webhookSecret) {
    console.warn('[stripe/webhook] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: import('stripe').Stripe.Event

  try {
    const rawBody = await req.text()
    const { stripe } = await import('@/lib/stripe')
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook signature verification failed'
    console.error('[stripe/webhook] Verification failed:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  // ── Event handlers ────────────────────────────────────────────────────────────

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as import('stripe').Stripe.Checkout.Session
        const email       = session.customer_email ?? session.customer_details?.email
        const productName = session.metadata?.productName ?? ''
        const priceId     = session.metadata?.priceId ?? ''
        const amountPaid  = session.amount_total ?? 0
        const mode        = session.mode // 'payment' | 'subscription'

        console.log('[stripe/webhook] checkout.session.completed', { email, productName, amountPaid })

        if (email && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { createServerClient } = await import('@/lib/supabase')
          const supabase = createServerClient()

          // Record the purchase
          await supabase.from('purchases').upsert({
            stripe_session_id: session.id,
            customer_email: email.toLowerCase(),
            product_name: productName,
            price_id: priceId,
            amount_cents: amountPaid,
            mode,
            status: 'complete',
          }, { onConflict: 'stripe_session_id', ignoreDuplicates: true })

          // Assign product access based on price ID / product name
          const accessTag = resolveAccessTag(productName, priceId)
          if (accessTag) {
            await supabase.from('product_access').upsert({
              customer_email: email.toLowerCase(),
              access_tag: accessTag,
              granted_via: session.id,
            }, { onConflict: 'customer_email,access_tag', ignoreDuplicates: true })

            // If user has a passport, award product badge + XP
            const { data: profile } = await supabase
              .from('passport_profiles')
              .select('user_id')
              .eq('user_id', (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id ?? '')
              .single()

            if (profile?.user_id) {
              const { awardXP, awardBadge } = await import('@/lib/passport-db')
              await awardXP(profile.user_id, 200, 'product_purchase', accessTag, `Purchased: ${productName}`)
              await awardBadge(profile.user_id, `product_${accessTag}`, `Owns: ${productName}`)
            }
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as import('stripe').Stripe.Subscription
        const customerId = sub.customer as string

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { createServerClient } = await import('@/lib/supabase')
          const supabase = createServerClient()
          // Mark subscription as cancelled — keep data, revoke access
          await supabase.from('purchases')
            .update({ status: 'cancelled' })
            .eq('stripe_session_id', customerId)
        }
        break
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as import('stripe').Stripe.Invoice
        console.warn('[stripe/webhook] Payment failed for customer:', inv.customer)
        break
      }

      default:
        // Unhandled event types are fine — Stripe sends many
        break
    }
  } catch (err) {
    console.error('[stripe/webhook] Handler error:', err)
    // Return 200 so Stripe doesn't retry — log the error
  }

  return NextResponse.json({ received: true })
}

// Maps product name / price ID to an internal access tag
function resolveAccessTag(productName: string, priceId: string): string | null {
  const name = productName.toLowerCase()
  if (name.includes('courier') || priceId.includes('courier')) return 'medical_courier_guide'
  if (name.includes('tcu') || name.includes('trading chef') || priceId.includes('tcu')) return 'tcu_membership'
  if (name.includes('gold') || name.includes('playbook') || priceId.includes('gold')) return 'gold_playbook'
  if (name.includes('fantasy') || name.includes('draft bible') || priceId.includes('fantasy')) return 'fantasy_draft_bible'
  if (name.includes('food') || name.includes('popup') || priceId.includes('food')) return 'food_popup_blueprint'
  if (name.includes('ai') || name.includes('operator') || priceId.includes('ai_operator')) return 'ai_operator_guide'
  if (name.includes('vault') || priceId.includes('vault')) return 'opportunity_vault'
  return null
}
