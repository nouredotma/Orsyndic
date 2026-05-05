import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/apartments?building_id=xxx OR ?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const buildingId = searchParams.get('building_id')
    const syndicId = searchParams.get('syndic_id')

    let query = supabaseAdmin.from('apartments').select('*')

    if (buildingId) {
      query = query.eq('building_id', buildingId)
    } else if (syndicId) {
      // Get all apartments for all buildings belonging to this syndic
      const { data: buildings } = await supabaseAdmin
        .from('buildings')
        .select('id')
        .eq('syndic_id', syndicId)

      const buildingIds = buildings?.map(b => b.id) || []
      if (buildingIds.length === 0) {
        return NextResponse.json({ apartments: [] })
      }
      query = query.in('building_id', buildingIds)
    } else {
      return NextResponse.json({ error: 'building_id or syndic_id is required' }, { status: 400 })
    }

    const { data, error } = await query.order('floor', { ascending: true })
    if (error) throw error
    return NextResponse.json({ apartments: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch apartments' }, { status: 500 })
  }
}

// POST /api/apartments
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { building_id, floor, number, tantiemes, owner_id, owner_name, tenant_id, tenant_name } = body

    if (!building_id || floor === undefined || !number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('apartments')
      .insert({
        building_id, floor, number,
        tantiemes: tantiemes || 100,
        owner_id: owner_id || null,
        owner_name: owner_name || null,
        tenant_id: tenant_id || null,
        tenant_name: tenant_name || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ apartment: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create apartment' }, { status: 500 })
  }
}
