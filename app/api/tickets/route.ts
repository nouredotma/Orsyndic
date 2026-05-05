import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/tickets?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')
    const submittedById = searchParams.get('submitted_by_id')

    let query = supabaseAdmin.from('tickets').select('*')

    if (syndicId) {
      query = query.eq('syndic_id', syndicId)
    } else if (submittedById) {
      query = query.eq('submitted_by_id', submittedById)
    } else {
      return NextResponse.json({ error: 'syndic_id or submitted_by_id is required' }, { status: 400 })
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ tickets: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}

// POST /api/tickets
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, title, description, submitted_by_id, submitted_by_name, submitted_by_role, submitted_by_avatar, building_name, apartment_number, photos } = body

    if (!syndic_id || !title || !description || !submitted_by_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .insert({
        syndic_id, title, description,
        submitted_by_id: submitted_by_id || null,
        submitted_by_name,
        submitted_by_role: submitted_by_role || 'Owner',
        submitted_by_avatar: submitted_by_avatar || null,
        building_name: building_name || '',
        apartment_number: apartment_number || '',
        photos: photos || null,
        status: 'Open',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ ticket: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}

// PATCH /api/tickets — update status
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ ticket: data })
  } catch {
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
  }
}
