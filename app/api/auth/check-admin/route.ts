import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// POST /api/auth/check-admin
// Checks if the authenticated user is an app admin
export async function POST(request: Request) {
  try {
    const { authUserId } = await request.json()

    if (!authUserId) {
      return NextResponse.json({ error: 'Missing authUserId' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('app_admins')
      .select('id, email')
      .eq('auth_user_id', authUserId)
      .single()

    if (error || !data) {
      return NextResponse.json({ isAdmin: false })
    }

    return NextResponse.json({ isAdmin: true, admin: data })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
