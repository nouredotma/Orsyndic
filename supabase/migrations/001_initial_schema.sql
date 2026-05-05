-- =============================================
-- Orsyndic — Initial Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- ========================
-- 1. SYNDICS (Platform-level accounts)
-- ========================
CREATE TABLE IF NOT EXISTS syndics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'Pending Approval'
    CHECK (status IN ('Active', 'Pending', 'Pending Approval', 'Suspended')),
  buildings_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 2. BUILDINGS
-- ========================
CREATE TABLE IF NOT EXISTS buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  floors INT NOT NULL DEFAULT 1,
  apts_per_floor INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 3. PROFILES (Syndic-managed users: Admin, Owner, Tenant)
-- ========================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  username TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Owner', 'Tenant')),
  avatar_url TEXT,
  building_id UUID REFERENCES buildings(id) ON DELETE SET NULL,
  apartment_id UUID,  -- will reference apartments(id) after that table is created
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 4. APARTMENTS
-- ========================
CREATE TABLE IF NOT EXISTS apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  floor INT NOT NULL,
  number TEXT NOT NULL,
  tantiemes INT NOT NULL DEFAULT 100,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  owner_name TEXT,
  tenant_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  tenant_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(building_id, number)
);

-- Add foreign key from profiles.apartment_id to apartments.id
ALTER TABLE profiles
  ADD CONSTRAINT fk_profiles_apartment
  FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE SET NULL;

-- ========================
-- 5. CHARGES
-- ========================
CREATE TABLE IF NOT EXISTS charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  apartment_number TEXT NOT NULL,
  building_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_avatar TEXT,
  month TEXT NOT NULL,
  year INT NOT NULL,
  amount INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Unpaid'
    CHECK (status IN ('Paid', 'Unpaid', 'Partial')),
  paid_date DATE,
  validated_by_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 6. TICKETS
-- ========================
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  submitted_by_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  submitted_by_name TEXT NOT NULL,
  submitted_by_role TEXT NOT NULL CHECK (submitted_by_role IN ('Owner', 'Tenant')),
  submitted_by_avatar TEXT,
  building_name TEXT NOT NULL,
  apartment_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open'
    CHECK (status IN ('Open', 'In Progress', 'Resolved')),
  photos TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 7. TICKET NOTES
-- ========================
CREATE TABLE IF NOT EXISTS ticket_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 8. DOCUMENTS
-- ========================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('Assembly Minutes', 'Regulations', 'Financial Reports', 'Contracts', 'Other')),
  file_url TEXT,
  file_size TEXT,
  uploaded_by TEXT NOT NULL DEFAULT 'Admin',
  building_ids UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 9. ANNOUNCEMENTS
-- ========================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndic_id UUID NOT NULL REFERENCES syndics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  urgent BOOLEAN NOT NULL DEFAULT false,
  created_by TEXT NOT NULL DEFAULT 'Admin',
  audience TEXT NOT NULL DEFAULT 'Both'
    CHECK (audience IN ('Both', 'Owners', 'Tenants')),
  building_ids UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- 10. APP ADMINS (Super administrators)
-- ========================
CREATE TABLE IF NOT EXISTS app_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- INDEXES
-- ========================
CREATE INDEX IF NOT EXISTS idx_buildings_syndic ON buildings(syndic_id);
CREATE INDEX IF NOT EXISTS idx_profiles_syndic ON profiles(syndic_id);
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user ON profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_apartments_building ON apartments(building_id);
CREATE INDEX IF NOT EXISTS idx_apartments_owner ON apartments(owner_id);
CREATE INDEX IF NOT EXISTS idx_charges_syndic ON charges(syndic_id);
CREATE INDEX IF NOT EXISTS idx_charges_apartment ON charges(apartment_id);
CREATE INDEX IF NOT EXISTS idx_tickets_syndic ON tickets(syndic_id);
CREATE INDEX IF NOT EXISTS idx_ticket_notes_ticket ON ticket_notes(ticket_id);
CREATE INDEX IF NOT EXISTS idx_documents_syndic ON documents(syndic_id);
CREATE INDEX IF NOT EXISTS idx_announcements_syndic ON announcements(syndic_id);

-- ========================
-- ROW LEVEL SECURITY
-- ========================

-- Enable RLS on all tables
ALTER TABLE syndics ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_admins ENABLE ROW LEVEL SECURITY;

-- Allow service role to bypass RLS (API routes use service role key)
-- Individual user-facing policies will be added in a follow-up migration
-- once the auth flow is fully wired up.

-- For now, allow authenticated users to read their own syndic data
CREATE POLICY "Syndics can read own record"
  ON syndics FOR SELECT
  USING (auth_user_id = auth.uid());

CREATE POLICY "Buildings readable by syndic members"
  ON buildings FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Profiles readable by syndic members"
  ON profiles FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Apartments readable by syndic members"
  ON apartments FOR SELECT
  USING (
    building_id IN (
      SELECT b.id FROM buildings b
      WHERE b.syndic_id IN (
        SELECT id FROM syndics WHERE auth_user_id = auth.uid()
        UNION
        SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Charges readable by syndic members"
  ON charges FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Tickets readable by syndic members"
  ON tickets FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Ticket notes readable by syndic members"
  ON ticket_notes FOR SELECT
  USING (
    ticket_id IN (
      SELECT t.id FROM tickets t
      WHERE t.syndic_id IN (
        SELECT id FROM syndics WHERE auth_user_id = auth.uid()
        UNION
        SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Documents readable by syndic members"
  ON documents FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Announcements readable by syndic members"
  ON announcements FOR SELECT
  USING (
    syndic_id IN (
      SELECT id FROM syndics WHERE auth_user_id = auth.uid()
      UNION
      SELECT syndic_id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "App admins can read own record"
  ON app_admins FOR SELECT
  USING (auth_user_id = auth.uid());

-- ========================
-- UPDATED_AT TRIGGER
-- ========================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_syndics_updated_at BEFORE UPDATE ON syndics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_buildings_updated_at BEFORE UPDATE ON buildings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_apartments_updated_at BEFORE UPDATE ON apartments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_charges_updated_at BEFORE UPDATE ON charges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
