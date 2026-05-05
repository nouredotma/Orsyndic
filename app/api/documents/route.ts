import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/documents?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')

    if (!syndicId) {
      return NextResponse.json({ error: 'syndic_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('documents')
      .select('*')
      .eq('syndic_id', syndicId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ documents: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

// POST /api/documents
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, name, category, file_url, file_size, uploaded_by, building_ids } = body

    if (!syndic_id || !name || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('documents')
      .insert({
        syndic_id, name, category,
        file_url: file_url || null,
        file_size: file_size || null,
        uploaded_by: uploaded_by || 'Admin',
        building_ids: building_ids || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ document: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}

// DELETE /api/documents
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
  }
}
