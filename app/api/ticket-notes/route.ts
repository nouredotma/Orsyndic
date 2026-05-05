import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/ticket-notes?ticket_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('ticket_id')

    if (!ticketId) {
      return NextResponse.json({ error: 'ticket_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('ticket_notes')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json({ notes: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// POST /api/ticket-notes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ticket_id, text, author } = body

    if (!ticket_id || !text || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('ticket_notes')
      .insert({ ticket_id, text, author })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ note: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
