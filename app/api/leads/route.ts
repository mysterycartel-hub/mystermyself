import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, interest, division = 'website' } = body

    // Validate
    if (!name?.trim() || !email?.trim() || !interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // ── Supabase insert ──────────────────────────────────────────────────
    // Uncomment when Supabase is configured:
    //
    // const { createServerClient } = await import('@/lib/supabase')
    // const supabase = createServerClient()
    // const { error } = await supabase.from('leads').upsert(
    //   { name: name.trim(), email: email.toLowerCase().trim(), interest, division, source: 'website' },
    //   { onConflict: 'email', ignoreDuplicates: false }
    // )
    // if (error) {
    //   console.error('Supabase lead insert error:', error)
    //   return NextResponse.json({ error: 'Database error' }, { status: 500 })
    // }
    // ────────────────────────────────────────────────────────────────────

    // Local fallback — log to console in dev
    console.log('[LEAD CAPTURED]', {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      interest,
      division,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: 'Lead captured' }, { status: 201 })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
