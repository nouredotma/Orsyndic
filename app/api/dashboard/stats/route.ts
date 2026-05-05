import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/dashboard/stats?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')

    if (!syndicId) {
      return NextResponse.json({ error: 'syndic_id is required' }, { status: 400 })
    }

    // Total buildings
    const { count: totalBuildings } = await supabaseAdmin
      .from('buildings')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndicId)

    // Total apartments
    const { data: buildingsData } = await supabaseAdmin
      .from('buildings')
      .select('id')
      .eq('syndic_id', syndicId)
    const buildingIds = buildingsData?.map(b => b.id) || []

    let totalApartments = 0
    if (buildingIds.length > 0) {
      const { count } = await supabaseAdmin
        .from('apartments')
        .select('*', { count: 'exact', head: true })
        .in('building_id', buildingIds)
      totalApartments = count || 0
    }

    // Total users
    const { count: totalUsers } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndicId)

    // Active tickets
    const { count: activeTickets } = await supabaseAdmin
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndicId)
      .neq('status', 'Resolved')

    // Unpaid charges
    const { count: unpaidCharges } = await supabaseAdmin
      .from('charges')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndicId)
      .eq('status', 'Unpaid')

    // Total charge revenue (paid)
    const { data: paidCharges } = await supabaseAdmin
      .from('charges')
      .select('amount')
      .eq('syndic_id', syndicId)
      .eq('status', 'Paid')
    const totalRevenue = paidCharges?.reduce((sum, c) => sum + c.amount, 0) || 0

    // Collection rate
    const { count: totalCharges } = await supabaseAdmin
      .from('charges')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndicId)
    const paidCount = paidCharges?.length || 0
    const collectionRate = totalCharges ? Math.round((paidCount / totalCharges) * 100) : 0

    // Revenue by month (last 12 months)
    const { data: allCharges } = await supabaseAdmin
      .from('charges')
      .select('month, year, amount, status')
      .eq('syndic_id', syndicId)
      .eq('status', 'Paid')
      .order('year', { ascending: true })

    const revenueByMonth: Record<string, number> = {}
    allCharges?.forEach(c => {
      const key = `${c.month} ${c.year}`
      revenueByMonth[key] = (revenueByMonth[key] || 0) + c.amount
    })

    const revenueData = Object.entries(revenueByMonth).map(([name, revenue]) => ({
      name,
      revenue,
    }))

    return NextResponse.json({
      stats: {
        totalBuildings: totalBuildings || 0,
        totalApartments,
        totalUsers: totalUsers || 0,
        activeTickets: activeTickets || 0,
        unpaidCharges: unpaidCharges || 0,
        totalRevenue,
        collectionRate,
      },
      revenueData,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}
