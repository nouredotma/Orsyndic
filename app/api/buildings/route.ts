import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/buildings?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')

    if (!syndicId) {
      return NextResponse.json({ error: 'syndic_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('buildings')
      .select('*')
      .eq('syndic_id', syndicId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json({ buildings: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch buildings' }, { status: 500 })
  }
}

// POST /api/buildings
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, name, address, floors, apts_per_floor } = body

    if (!syndic_id || !name || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('buildings')
      .insert({ syndic_id, name, address, floors: floors || 1, apts_per_floor: apts_per_floor || 1 })
      .select()
      .single()

    if (error) throw error

    // Update syndic buildings count
    const { count } = await supabaseAdmin
      .from('buildings')
      .select('*', { count: 'exact', head: true })
      .eq('syndic_id', syndic_id)

    await supabaseAdmin
      .from('syndics')
      .update({ buildings_count: count || 0 })
      .eq('id', syndic_id)

    return NextResponse.json({ building: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create building' }, { status: 500 })
  }
}
