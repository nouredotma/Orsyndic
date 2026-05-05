import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// GET /api/profiles?syndic_id=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const syndicId = searchParams.get('syndic_id')

    if (!syndicId) {
      return NextResponse.json({ error: 'syndic_id is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('syndic_id', syndicId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json({ profiles: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
  }
}

// POST /api/profiles — create a new managed user (Owner/Tenant)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { syndic_id, full_name, email, username, phone, role, building_id, apartment_id, password } = body

    if (!syndic_id || !full_name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create auth user if email and password provided
    let authUserId: string | null = null
    if (email && password) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, role },
      })
      if (authError) throw authError
      authUserId = authData.user.id
    }

    // Create profile
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        auth_user_id: authUserId,
        syndic_id,
        full_name,
        email: email || null,
        username: username || null,
        phone: phone || null,
        role,
        building_id: building_id || null,
        apartment_id: apartment_id || null,
        status: 'Active',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ profile: data }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create profile'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
