import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // ── Leads from Supabase ──────────────────────────────────────────────
    // Uncomment when Supabase is configured:
    //
    // const { createServerClient } = await import('@/lib/supabase')
    // const supabase = createServerClient()
    // const { data, error } = await supabase
    //   .from('leads')
    //   .select('id, name, email, interest, division, created_at')
    //   .order('created_at', { ascending: false })
    //   .limit(100)
    // if (error) throw error
    // return NextResponse.json(data)
    // ────────────────────────────────────────────────────────────────────

    return NextResponse.json([])
  } catch (err) {
    console.error('Leads API error:', err)
    return NextResponse.json([], { status: 500 })
  }
}
