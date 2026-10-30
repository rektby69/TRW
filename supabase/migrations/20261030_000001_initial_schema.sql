-- Yoga Córdoba (TRW) — Complete Database Schema & RLS Migration
-- Phase 1: Database Setup & All Tables

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'client', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'banned', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'attended', 'no_show', 'waitlisted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending_on_premise', 'paid_on_premise', 'waived', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE recurrence_type AS ENUM ('weekly', 'biweekly', 'custom_dates');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'user',
    status user_status NOT NULL DEFAULT 'active',
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    phone_prefix VARCHAR(10) DEFAULT '+34',
    phone_number TEXT,
    phone TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    post_code VARCHAR(20),
    city TEXT,
    county TEXT,
    country TEXT DEFAULT 'España',
    avatar_url TEXT,
    preferred_lang VARCHAR(5) DEFAULT 'es',
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    health_notes TEXT,
    notes TEXT,
    first_booking_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. INSTRUCTORS TABLE
CREATE TABLE IF NOT EXISTS public.instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    bio_es TEXT,
    bio_en TEXT,
    photo_url TEXT,
    specialties TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. SESSION TYPES TABLE (Dynamic categories, NOT hardcoded enum)
CREATE TABLE IF NOT EXISTS public.session_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_es TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    description_es TEXT,
    description_en TEXT,
    default_duration INTEGER NOT NULL DEFAULT 60,
    default_capacity INTEGER NOT NULL DEFAULT 12,
    intensity_level TEXT DEFAULT 'Multinivel',
    accent_color TEXT DEFAULT 'sage',
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. SESSION TEMPLATES TABLE (Recurring class schedule)
CREATE TABLE IF NOT EXISTS public.session_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_type_id UUID NOT NULL REFERENCES public.session_types(id) ON DELETE RESTRICT,
    instructor_id UUID NOT NULL REFERENCES public.instructors(id) ON DELETE RESTRICT,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    max_slots INTEGER NOT NULL DEFAULT 12,
    price DECIMAL(10,2) NOT NULL DEFAULT 12.00,
    is_ongoing BOOLEAN DEFAULT true,
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_until DATE,
    recurrence_rule JSONB DEFAULT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. CALENDAR EXCEPTIONS / AVAILABILITY OVERRIDES
CREATE TABLE IF NOT EXISTS public.calendar_exceptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_template_id UUID NOT NULL REFERENCES public.session_templates(id) ON DELETE CASCADE,
    exception_date DATE NOT NULL,
    is_cancelled BOOLEAN DEFAULT false,
    override_start_time TIME,
    override_instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
    override_max_slots INTEGER,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. SESSION INSTANCES TABLE (Concrete bookable sessions)
CREATE TABLE IF NOT EXISTS public.session_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_template_id UUID REFERENCES public.session_templates(id) ON DELETE SET NULL,
    session_type_id UUID NOT NULL REFERENCES public.session_types(id) ON DELETE RESTRICT,
    instructor_id UUID NOT NULL REFERENCES public.instructors(id) ON DELETE RESTRICT,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    max_slots INTEGER NOT NULL,
    booked_count INTEGER NOT NULL DEFAULT 0 CHECK (booked_count >= 0 AND booked_count <= max_slots),
    price DECIMAL(10,2) NOT NULL,
    status session_status NOT NULL DEFAULT 'scheduled',
    cancel_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. BOOKINGS TABLE (Individual client reservations)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(16) UNIQUE NOT NULL,
    session_instance_id UUID NOT NULL REFERENCES public.session_instances(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    booking_status booking_status NOT NULL DEFAULT 'confirmed',
    payment_status payment_status NOT NULL DEFAULT 'pending_on_premise',
    price_at_booking DECIMAL(10,2) NOT NULL,
    payment_notes TEXT,
    cancelled_at TIMESTAMPTZ,
    cancel_reason TEXT,
    cancelled_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    attended_at TIMESTAMPTZ,
    marked_attended_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. STUDIO SETTINGS TABLE (Global Configuration)
CREATE TABLE IF NOT EXISTS public.studio_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.studio_settings (key, value, description)
VALUES 
    ('booking_rules', '{"advance_booking_limit_days": 14, "cancellation_cutoff_hours": 2, "max_active_bookings_per_user": 5}'::jsonb, 'Studio booking constraints and advance limits'),
    ('studio_profile', '{"name": "Yoga Córdoba", "email": "info@yogacordoba.es", "phone": "+34 600 000 000", "currency": "EUR"}'::jsonb, 'General studio contact and branding')
ON CONFLICT (key) DO NOTHING;

-- 11. AUDIT & HISTORY TABLES
CREATE TABLE IF NOT EXISTS public.user_roles_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    old_role user_role,
    new_role user_role,
    old_status user_status,
    new_status user_status,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_login_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    logged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status VARCHAR(20) DEFAULT 'success'
);

CREATE TABLE IF NOT EXISTS public.session_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_instance_id UUID NOT NULL REFERENCES public.session_instances(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.booking_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    old_booking_status booking_status,
    new_booking_status booking_status,
    old_payment_status payment_status,
    new_payment_status payment_status,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. HELPER FUNCTIONS & TRIGGERS

-- A. Auto-create Profile on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_first_name TEXT;
    v_last_name TEXT;
    v_full_name TEXT;
    v_phone TEXT;
BEGIN
    v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
    v_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', '');
    v_phone := COALESCE(NEW.raw_user_meta_data->>'phone_number', NEW.raw_user_meta_data->>'phone');
    v_full_name := TRIM(v_first_name || ' ' || v_last_name);
    IF v_full_name = '' THEN
        v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1));
    END IF;

    INSERT INTO public.profiles (
        id,
        role,
        status,
        first_name,
        last_name,
        full_name,
        phone_number,
        phone,
        preferred_lang,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        'user',
        'active',
        NULLIF(v_first_name, ''),
        NULLIF(v_last_name, ''),
        v_full_name,
        v_phone,
        v_phone,
        COALESCE(NEW.raw_user_meta_data->>'preferred_lang', 'es'),
        now(),
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        first_name = COALESCE(EXCLUDED.first_name, public.profiles.first_name),
        last_name = COALESCE(EXCLUDED.last_name, public.profiles.last_name),
        phone_number = COALESCE(EXCLUDED.phone_number, public.profiles.phone_number),
        updated_at = now();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- B. First Booking Auto-Promotion (user -> client)
CREATE OR REPLACE FUNCTION public.handle_first_booking_role_promotion()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT role FROM public.profiles WHERE id = NEW.user_id) = 'user' THEN
        UPDATE public.profiles
        SET role = 'client',
            first_booking_at = COALESCE(first_booking_at, now()),
            updated_at = now()
        WHERE id = NEW.user_id;

        INSERT INTO public.user_roles_history (user_id, changed_by, old_role, new_role, reason)
        VALUES (NEW.user_id, NULL, 'user', 'client', 'Automated promotion upon first confirmed booking');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_first_booking_promotion ON public.bookings;
CREATE TRIGGER tr_first_booking_promotion
    AFTER INSERT ON public.bookings
    FOR EACH ROW
    WHEN (NEW.booking_status = 'confirmed')
    EXECUTE FUNCTION public.handle_first_booking_role_promotion();

-- C. Booking Reference Generator Helper
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
    v_ref TEXT;
    v_exists BOOLEAN;
BEGIN
    LOOP
        v_ref := 'YC-' || TO_CHAR(now(), 'YYMM') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4));
        SELECT EXISTS(SELECT 1 FROM public.bookings WHERE booking_reference = v_ref) INTO v_exists;
        EXIT WHEN NOT v_exists;
    END LOOP;
    RETURN v_ref;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- D. Atomic Booking Creation Function (Capacity lock & advance booking limit)
CREATE OR REPLACE FUNCTION public.create_booking_atomic(
    p_session_id UUID,
    p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_session public.session_instances%ROWTYPE;
    v_user public.profiles%ROWTYPE;
    v_advance_limit_days INTEGER := 14;
    v_existing_booking_id UUID;
    v_booking_ref TEXT;
    v_new_booking_id UUID;
BEGIN
    -- 1. Check user status
    SELECT * INTO v_user FROM public.profiles WHERE id = p_user_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'USER_NOT_FOUND: User profile does not exist';
    END IF;

    IF v_user.status = 'banned' OR v_user.status = 'rejected' THEN
        RAISE EXCEPTION 'USER_NOT_ACTIVE: Account is % and cannot create reservations', v_user.status;
    END IF;

    -- 2. Lock session row for update
    SELECT * INTO v_session FROM public.session_instances WHERE id = p_session_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'SESSION_NOT_FOUND: Session does not exist';
    END IF;

    IF v_session.status != 'scheduled' THEN
        RAISE EXCEPTION 'SESSION_NOT_AVAILABLE: Session is % and cannot be booked', v_session.status;
    END IF;

    -- 3. Validate Advance Booking Limit
    SELECT COALESCE((value->>'advance_booking_limit_days')::integer, 14)
    INTO v_advance_limit_days
    FROM public.studio_settings
    WHERE key = 'booking_rules';

    IF v_session.session_date > (CURRENT_DATE + v_advance_limit_days) THEN
        RAISE EXCEPTION 'BOOKING_TOO_EARLY: Bookings open % days before class (available on %)',
            v_advance_limit_days, (v_session.session_date - v_advance_limit_days);
    END IF;

    -- 4. Check if user already has an active booking for this session
    SELECT id INTO v_existing_booking_id
    FROM public.bookings
    WHERE session_instance_id = p_session_id
      AND user_id = p_user_id
      AND booking_status = 'confirmed'
    LIMIT 1;

    IF v_existing_booking_id IS NOT NULL THEN
        RAISE EXCEPTION 'ALREADY_BOOKED: You already have a confirmed booking for this session';
    END IF;

    -- 5. Capacity Check
    IF v_session.booked_count >= v_session.max_slots THEN
        RAISE EXCEPTION 'CLASS_FULL: No slots available for this session';
    END IF;

    -- 6. Increment booked count
    UPDATE public.session_instances
    SET booked_count = booked_count + 1,
        updated_at = now()
    WHERE id = p_session_id;

    -- 7. Insert booking
    v_booking_ref := public.generate_booking_reference();
    INSERT INTO public.bookings (
        booking_reference,
        session_instance_id,
        user_id,
        booking_status,
        payment_status,
        price_at_booking,
        created_at,
        updated_at
    ) VALUES (
        v_booking_ref,
        p_session_id,
        p_user_id,
        'confirmed',
        'pending_on_premise',
        v_session.price,
        now(),
        now()
    ) RETURNING id INTO v_new_booking_id;

    RETURN jsonb_build_object(
        'success', true,
        'booking_id', v_new_booking_id,
        'booking_reference', v_booking_ref,
        'session_id', p_session_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Users can update own details" ON public.profiles;
CREATE POLICY "Users can update own details"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admin full control on profiles" ON public.profiles;
CREATE POLICY "Admin full control on profiles"
    ON public.profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Instructors Policies (Public view, Admin manage)
DROP POLICY IF EXISTS "Public read instructors" ON public.instructors;
CREATE POLICY "Public read instructors"
    ON public.instructors FOR SELECT
    USING (is_active = true OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Admin manage instructors" ON public.instructors;
CREATE POLICY "Admin manage instructors"
    ON public.instructors FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Session Types Policies (Public view, Admin manage)
DROP POLICY IF EXISTS "Public read active session types" ON public.session_types;
CREATE POLICY "Public read active session types"
    ON public.session_types FOR SELECT
    USING (is_active = true OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Admin manage session types" ON public.session_types;
CREATE POLICY "Admin manage session types"
    ON public.session_types FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Session Templates & Exceptions Policies
DROP POLICY IF EXISTS "Admin manage session templates" ON public.session_templates;
CREATE POLICY "Admin manage session templates"
    ON public.session_templates FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Admin manage calendar exceptions" ON public.calendar_exceptions;
CREATE POLICY "Admin manage calendar exceptions"
    ON public.calendar_exceptions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Session Instances Policies (Public view scheduled, Admin manage)
DROP POLICY IF EXISTS "Public read scheduled sessions" ON public.session_instances;
CREATE POLICY "Public read scheduled sessions"
    ON public.session_instances FOR SELECT
    USING (status != 'cancelled' OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Admin manage session instances" ON public.session_instances;
CREATE POLICY "Admin manage session instances"
    ON public.session_instances FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Bookings Policies
DROP POLICY IF EXISTS "Users can read own bookings" ON public.bookings;
CREATE POLICY "Users can read own bookings"
    ON public.bookings FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Users can cancel own booking" ON public.bookings;
CREATE POLICY "Users can cancel own booking"
    ON public.bookings FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin manage all bookings" ON public.bookings;
CREATE POLICY "Admin manage all bookings"
    ON public.bookings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Studio Settings Policies (Public read, Admin update)
DROP POLICY IF EXISTS "Public read studio settings" ON public.studio_settings;
CREATE POLICY "Public read studio settings"
    ON public.studio_settings FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin manage studio settings" ON public.studio_settings;
CREATE POLICY "Admin manage studio settings"
    ON public.studio_settings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- History & Audit Policies (Admin read, system write)
DROP POLICY IF EXISTS "Admin read user_roles_history" ON public.user_roles_history;
CREATE POLICY "Admin read user_roles_history"
    ON public.user_roles_history FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Users read own login history" ON public.user_login_history;
CREATE POLICY "Users read own login history"
    ON public.user_login_history FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

DROP POLICY IF EXISTS "Admin read audit logs" ON public.audit_logs;
CREATE POLICY "Admin read audit logs"
    ON public.audit_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

