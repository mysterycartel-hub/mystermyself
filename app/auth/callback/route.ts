import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    } catch {
      // Supabase not configured or exchange failed - redirect to dashboard anyway
    }
  }

  // Fallback: redirect to dashboard even if code exchange fails
  const { origin: reqOrigin } = new URL(request.url)
  return NextResponse.redirect(`${reqOrigin}/dashboard`)
}
