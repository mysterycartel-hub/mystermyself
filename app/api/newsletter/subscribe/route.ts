import { NextRequest, NextResponse } from 'next/server'

const LANE_TAGS: Record<string, string> = {
  interest_trading_chef:  'interest_trading_chef',
  interest_route_harbor:  'interest_route_harbor',
  interest_creator_tools: 'interest_creator_tools',
  interest_fantasy:       'interest_fantasy',
  interest_ai_business:   'interest_ai_business',
  interest_food:          'interest_food',
  interest_fast_income:   'interest_fast_income',
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, selectedLane, source = 'website' } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const apiKey = process.env.BEEHIIV_API_KEY
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID

    // If Beehiiv credentials are not configured, return a graceful stub response
    if (!apiKey || !publicationId) {
      console.warn('[newsletter/subscribe] BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set — skipping API call')
      return NextResponse.json({
        ok: true,
        message: 'Subscribed (dev mode — Beehiiv not configured)',
        dev: true,
      })
    }

    const customFields: { name: string; value: string }[] = [
      { name: 'source', value: source },
      { name: 'signup_page', value: 'opportunity_list' },
      { name: 'brand', value: 'mystermyself' },
    ]

    if (name) {
      customFields.push({ name: 'first_name', value: name })
    }

    const tags: string[] = ['website_signup']
    if (selectedLane && LANE_TAGS[selectedLane]) {
      tags.push(LANE_TAGS[selectedLane])
    }
    if (source && source !== 'website') {
      tags.push(`utm_${source}`)
    }

    const payload = {
      email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: source,
      utm_medium: 'organic',
      utm_campaign: 'opportunity_list',
      referring_site: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mystermyself.com',
      custom_fields: customFields,
      tags,
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('[newsletter/subscribe] Beehiiv error:', err)
      return NextResponse.json(
        { error: 'Subscription service error. Please try again.' },
        { status: 502 }
      )
    }

    const data = await res.json()
    return NextResponse.json({ ok: true, id: data?.data?.id })
  } catch (err) {
    console.error('[newsletter/subscribe] Unexpected error:', err)
    return NextResponse.json({ error: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
