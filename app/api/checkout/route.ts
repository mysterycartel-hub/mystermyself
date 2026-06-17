import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { priceId, productName, email } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Missing price ID' }, { status: 400 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({
        url: null,
        message: 'Stripe not yet configured — add STRIPE_SECRET_KEY to Vercel environment variables.',
      })
    }

    const { stripe } = await import('@/lib/stripe')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mystermyself.com'

    // Determine checkout mode from price ID prefix convention
    // price IDs starting with 'price_tcu' use subscription mode
    const mode = priceId.includes('membership') || priceId.includes('vault') ? 'subscription' : 'payment'

    const session = await stripe.checkout.sessions.create({
      mode: mode as 'payment' | 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/welcome?purchase=success&product=${encodeURIComponent(productName || '')}`,
      cancel_url: `${siteUrl}/pricing`,
      customer_email: email || undefined,
      metadata: {
        productName: productName || '',
        priceId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
