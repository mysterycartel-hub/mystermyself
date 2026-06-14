import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // ── Live stats from Supabase ─────────────────────────────────────────
    // Uncomment when Supabase is configured:
    //
    // const { createServerClient } = await import('@/lib/supabase')
    // const supabase = createServerClient()
    // const { data, error } = await supabase.from('admin_stats').select('*').single()
    // if (error) throw error
    // return NextResponse.json({
    //   totalLeads:            data.total_leads ?? 0,
    //   leadsThisWeek:         data.leads_this_week ?? 0,
    //   activeSubscribers:     data.active_subscribers ?? 0,
    //   totalOrders:           data.total_orders ?? 0,
    //   totalRevenueCents:     data.total_revenue_cents ?? 0,
    //   revenueThisMonthCents: data.revenue_this_month_cents ?? 0,
    // })
    // ────────────────────────────────────────────────────────────────────

    // Demo data for development
    return NextResponse.json({
      totalLeads:            0,
      leadsThisWeek:         0,
      activeSubscribers:     0,
      totalOrders:           0,
      totalRevenueCents:     0,
      revenueThisMonthCents: 0,
    })
  } catch (err) {
    console.error('Stats API error:', err)
    return NextResponse.json(null, { status: 500 })
  }
}
