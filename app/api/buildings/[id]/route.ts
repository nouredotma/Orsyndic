import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/buildings/[id]
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('buildings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return NextResponse.json({ building: data })
  } catch {
    return NextResponse.json({ error: 'Building not found' }, { status: 404 })
  }
}

// PUT /api/buildings/[id]
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from('buildings')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ building: data })
  } catch {
    return NextResponse.json({ error: 'Failed to update building' }, { status: 500 })
  }
}

// DELETE /api/buildings/[id]
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin
      .from('buildings')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete building' }, { status: 500 })
  }
}
