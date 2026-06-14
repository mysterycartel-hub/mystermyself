import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '').trim()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { validateToken, getFullPassport } = await import('@/lib/passport-db')
    const userId = await validateToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const passport = await getFullPassport(userId)
    if (!passport) {
      return NextResponse.json({ error: 'Passport not found' }, { status: 404 })
    }

    return NextResponse.json(passport)
  } catch (err) {
    console.error('[passport/status]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
