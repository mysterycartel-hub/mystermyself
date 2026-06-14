import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '').trim()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { districtId } = body
    if (!districtId) {
      return NextResponse.json({ error: 'districtId required' }, { status: 400 })
    }

    const { validateToken, collectStamp } = await import('@/lib/passport-db')
    const { districts } = await import('@/lib/districts')

    const userId = await validateToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const district = districts.find((d) => d.id === districtId)
    if (!district) {
      return NextResponse.json({ error: 'District not found' }, { status: 404 })
    }

    const result = await collectStamp(userId, district)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[passport/stamp]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
