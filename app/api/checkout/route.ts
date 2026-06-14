import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { priceId, productName, email } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Missing price ID' }, { status: 400 })
    }

    // ── Stripe Checkout Session ──────────────────────────────────────────
    // Uncomment when Stripe is configured:
    //
    // const { stripe } = await import('@/lib/stripe')
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',                     // use 'subscription' for TCU Membership
    //   payment_method_types: ['card'],
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/trading-chef-university#pricing`,
    //   customer_email: email || undefined,
    //   metadata: { productName: productName || '' },
    // })
    // return NextResponse.json({ url: session.url })
    // ────────────────────────────────────────────────────────────────────

    // Placeholder response for development
    return NextResponse.json({
      url: null,
      message: 'Stripe not yet configured. Add STRIPE_SECRET_KEY to .env.local and uncomment the Stripe code in /api/checkout/route.ts',
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
