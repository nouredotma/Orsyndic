import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/admin/syndics — list all syndics (App Admin only)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('syndics')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ syndics: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch syndics' }, { status: 500 })
  }
}

// PATCH /api/admin/syndics — update syndic status (approve, suspend)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
    }

    const validStatuses = ['Active', 'Pending', 'Pending Approval', 'Suspended']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('syndics')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ syndic: data })
  } catch {
    return NextResponse.json({ error: 'Failed to update syndic' }, { status: 500 })
  }
}
