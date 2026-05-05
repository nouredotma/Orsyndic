import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/charges?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')
    const apartmentId = searchParams.get('apartment_id')

    let query = supabaseAdmin.from('charges').select('*')

    if (syndicId) {
      query = query.eq('syndic_id', syndicId)
    } else if (apartmentId) {
      query = query.eq('apartment_id', apartmentId)
    } else {
      return NextResponse.json({ error: 'syndic_id or apartment_id is required' }, { status: 400 })
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ charges: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch charges' }, { status: 500 })
  }
}

// POST /api/charges
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, apartment_id, apartment_number, building_name, owner_name, owner_avatar, month, year, amount, status } = body

    if (!syndic_id || !apartment_id || !month || !year || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('charges')
      .insert({
        syndic_id, apartment_id,
        apartment_number: apartment_number || '',
        building_name: building_name || '',
        owner_name: owner_name || '',
        owner_avatar: owner_avatar || null,
        month, year, amount,
        status: status || 'Unpaid',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ charge: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create charge' }, { status: 500 })
  }
}

// PATCH /api/charges — batch update (for status changes, admin validation)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('charges')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ charge: data })
  } catch {
    return NextResponse.json({ error: 'Failed to update charge' }, { status: 500 })
  }
}
