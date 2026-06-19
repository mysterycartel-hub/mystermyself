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

function logFallbackSubscriber(data: {
  email: string
  name?: string
  selectedLane?: string
  source: string
  reason: string
}) {
  console.warn('[newsletter/subscribe] FALLBACK SUBSCRIBER — requires manual Beehiiv import:')
  console.warn(JSON.stringify(data))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, selectedLane, source = 'website' } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const apiKey         = process.env.BEEHIIV_API_KEY
    const publicationId  = process.env.BEEHIIV_PUBLICATION_ID

    // Missing env vars — log fallback, still redirect user
    if (!apiKey || !publicationId) {
      console.warn(
        '[newsletter/subscribe] BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set in Vercel env vars.'
      )
      logFallbackSubscriber({ email, name, selectedLane, source, reason: 'missing_env_vars' })
      return NextResponse.json({ ok: true, fallback: true, reason: 'missing_env_vars' })
    }

    const customFields: { name: string; value: string }[] = [
      { name: 'source',       value: source },
      { name: 'signup_page',  value: 'opportunity_list' },
      { name: 'brand',        value: 'mystermyself' },
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
      send_welcome_email:  true,
      utm_source:          source,
      utm_medium:          'organic',
      utm_campaign:        'opportunity_list',
      referring_site:      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mystermyself.com',
      custom_fields:       customFields,
      tags,
    }

    let beehiivRes: Response
    try {
      beehiivRes = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        }
      )
    } catch (fetchErr) {
      // Network error / timeout — log fallback, do not block user
      console.error('[newsletter/subscribe] Beehiiv network error:', fetchErr)
      logFallbackSubscriber({ email, name, selectedLane, source, reason: 'network_error' })
      return NextResponse.json({ ok: true, fallback: true, reason: 'network_error' })
    }

    if (!beehiivRes.ok) {
      const errBody = await beehiivRes.text()
      console.error(
        `[newsletter/subscribe] Beehiiv API error ${beehiivRes.status}:`, errBody
      )
      if (beehiivRes.status === 401 || beehiivRes.status === 403) {
        console.error(
          '[newsletter/subscribe] BEEHIIV_API_KEY is invalid or expired. ' +
          'Rotate the key in Beehiiv dashboard and update BEEHIIV_API_KEY in Vercel env vars.'
        )
      }
      logFallbackSubscriber({ email, name, selectedLane, source, reason: `beehiiv_${beehiivRes.status}` })
      // Fallback — still redirect user, do not surface third-party error
      return NextResponse.json({ ok: true, fallback: true, reason: `beehiiv_${beehiivRes.status}` })
    }

    const data = await beehiivRes.json()
    return NextResponse.json({ ok: true, id: data?.data?.id })

  } catch (err) {
    console.error('[newsletter/subscribe] Unexpected error:', err)
    // Even on unexpected errors, log and redirect rather than breaking the form
    return NextResponse.json({ ok: true, fallback: true, reason: 'unexpected_error' })
  }
}
