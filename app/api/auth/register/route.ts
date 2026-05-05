import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// POST /api/auth/register
// Creates a syndic record after Supabase Auth signup
export async function POST(request: Request) {
  try {
    const { authUserId, fullName, email, phone, companyName, address } = await request.json()

    if (!authUserId || !fullName || !email || !companyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create syndic record
    const { data: syndic, error } = await supabaseAdmin
      .from('syndics')
      .insert({
        auth_user_id: authUserId,
        full_name: fullName,
        email,
        phone: phone || null,
        company_name: companyName,
        address: address || null,
        status: 'Pending Approval',
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create syndic:', error)
      return NextResponse.json({ error: 'Failed to create syndic account' }, { status: 500 })
    }

    // Also create an Admin profile for this syndic
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        auth_user_id: authUserId,
        syndic_id: syndic.id,
        full_name: fullName,
        email,
        phone: phone || null,
        role: 'Admin',
        status: 'Active',
      })

    if (profileError) {
      console.error('Failed to create admin profile:', profileError)
    }

    return NextResponse.json({ syndic })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
