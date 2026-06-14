import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '').trim()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { validateToken, getOrCreatePassport } = await import('@/lib/passport-db')
    const { createServerClient } = await import('@/lib/supabase')

    const userId = await validateToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser(token)
    const email = user?.email ?? `user_${userId}@coast.ms`

    const profile = await getOrCreatePassport(userId, email)
    return NextResponse.json({ profile })
  } catch (err) {
    console.error('[passport/register]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
