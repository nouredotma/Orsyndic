import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/announcements?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')

    if (!syndicId) {
      return NextResponse.json({ error: 'syndic_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .eq('syndic_id', syndicId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ announcements: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
  }
}

// POST /api/announcements
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, title, content, urgent, created_by, audience, building_ids } = body

    if (!syndic_id || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('announcements')
      .insert({
        syndic_id, title, content,
        urgent: urgent || false,
        created_by: created_by || 'Admin',
        audience: audience || 'Both',
        building_ids: building_ids || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ announcement: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}

// DELETE /api/announcements
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('announcements')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
}
