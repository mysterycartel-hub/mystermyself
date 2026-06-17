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

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createServerClient } = await import('@/lib/supabase')
      const supabase = createServerClient()
      const { error } = await supabase.from('leads').upsert(
        { name: name.trim(), email: email.toLowerCase().trim(), interest, division, source: 'website' },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      if (error) {
        console.error('Supabase lead insert error:', error)
        // Do not block — log and continue
      }
    } else {
      console.log('[LEAD CAPTURED — no Supabase]', {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        interest,
        division,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, message: 'Lead captured' }, { status: 201 })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
