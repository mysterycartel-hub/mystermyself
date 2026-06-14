import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '').trim()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { amount, eventType, eventRef, description } = body
    if (!amount || !eventType) {
      return NextResponse.json({ error: 'amount and eventType required' }, { status: 400 })
    }

    // Cap single XP grants from client at 200 to prevent abuse
    const safeAmount = Math.min(Number(amount), 200)

    const { validateToken, awardXP } = await import('@/lib/passport-db')
    const userId = await validateToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await awardXP(userId, safeAmount, eventType, eventRef ?? '', description ?? '')
    return NextResponse.json({ success: true, xpAwarded: safeAmount })
  } catch (err) {
    console.error('[passport/xp]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
