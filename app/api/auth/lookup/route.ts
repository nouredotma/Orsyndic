import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// POST /api/auth/lookup
// Looks up a user's email by username or phone (for Owner/Tenant login)
export async function POST(request: Request) {
  try {
    const { type, value } = await request.json()

    if (!type || !value) {
      return NextResponse.json({ error: 'Missing type or value' }, { status: 400 })
    }

    let query = supabaseAdmin.from('profiles').select('email, auth_user_id')

    if (type === 'username') {
      query = query.eq('username', value).eq('role', 'Owner')
    } else if (type === 'phone') {
      query = query.eq('phone', value).eq('role', 'Tenant')
    } else {
      return NextResponse.json({ error: 'Invalid lookup type' }, { status: 400 })
    }

    const { data, error } = await query.single()

    if (error || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!data.auth_user_id) {
      return NextResponse.json({ error: 'User account not linked' }, { status: 404 })
    }

    // Get the email from auth.users via admin API
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(data.auth_user_id)

    if (authError || !authUser?.user?.email) {
      return NextResponse.json({ error: 'Auth account not found' }, { status: 404 })
    }

    return NextResponse.json({ email: authUser.user.email })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
