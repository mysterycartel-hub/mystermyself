// ============================================================
// POST /api/email — Transactional email endpoint
// Sends welcome emails via Resend after newsletter signup
// Canon: @mysterycartel | noreply@mystermyself.com
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, name, lane, type } = body

    // Validate required fields
    if (!to || typeof to !== 'string') {
      return NextResponse.json(
        { error: 'Email address required' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Route by email type
    switch (type ?? 'welcome') {
      case 'welcome': {
        const result = await sendWelcomeEmail({ to, name, lane })

        if (!result.success) {
          console.error('[/api/email] Welcome email failed:', result.error)
          return NextResponse.json(
            { error: result.error ?? 'Failed to send email' },
            { status: 500 }
          )
        }

        return NextResponse.json({ success: true, id: result.id })
      }

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('[/api/email] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
