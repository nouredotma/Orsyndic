import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/admin/stats — platform-wide statistics for App Admin dashboard
export async function GET() {
  try {
    // Total syndics
    const { count: totalSyndics } = await supabaseAdmin
      .from('syndics')
      .select('*', { count: 'exact', head: true })

    // Active syndics
    const { count: activeSyndics } = await supabaseAdmin
      .from('syndics')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Active')

    // Pending syndics
    const { count: pendingSyndics } = await supabaseAdmin
      .from('syndics')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending Approval')

    // Total buildings
    const { count: totalBuildings } = await supabaseAdmin
      .from('buildings')
      .select('*', { count: 'exact', head: true })

    // Total apartments
    const { count: totalApartments } = await supabaseAdmin
      .from('apartments')
      .select('*', { count: 'exact', head: true })

    // Total users (profiles)
    const { count: totalUsers } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Recent syndics (last 10)
    const { data: recentSyndics } = await supabaseAdmin
      .from('syndics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      stats: {
        totalSyndics: totalSyndics || 0,
        activeSyndics: activeSyndics || 0,
        pendingSyndics: pendingSyndics || 0,
        totalBuildings: totalBuildings || 0,
        totalApartments: totalApartments || 0,
        totalUsers: totalUsers || 0,
      },
      recentSyndics: recentSyndics || [],
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
