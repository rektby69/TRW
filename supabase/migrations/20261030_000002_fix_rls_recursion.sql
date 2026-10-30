-- ====================================================================
-- FIX: Infinite recursion on public.profiles RLS
-- ====================================================================

-- 1. Helper function with SECURITY DEFINER to check admin without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = p_user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Drop recursive policies on profiles
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin full control on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own details" ON public.profiles;

-- 3. Re-create clean non-recursive policies on profiles
CREATE POLICY "Users can read own profile or admin reads all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin full manage profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- 4. Update the other table policies to use public.is_admin() for maximum performance & cleanliness
DROP POLICY IF EXISTS "Public read instructors" ON public.instructors;
CREATE POLICY "Public read instructors"
    ON public.instructors FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage instructors" ON public.instructors;
CREATE POLICY "Admin manage instructors"
    ON public.instructors FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Public read active session types" ON public.session_types;
CREATE POLICY "Public read active session types"
    ON public.session_types FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage session types" ON public.session_types;
CREATE POLICY "Admin manage session types"
    ON public.session_types FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage session templates" ON public.session_templates;
CREATE POLICY "Admin manage session templates"
    ON public.session_templates FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage calendar exceptions" ON public.calendar_exceptions;
CREATE POLICY "Admin manage calendar exceptions"
    ON public.calendar_exceptions FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Public read scheduled sessions" ON public.session_instances;
CREATE POLICY "Public read scheduled sessions"
    ON public.session_instances FOR SELECT
    USING (status != 'cancelled' OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage session instances" ON public.session_instances;
CREATE POLICY "Admin manage session instances"
    ON public.session_instances FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Users can read own bookings" ON public.bookings;
CREATE POLICY "Users can read own bookings"
    ON public.bookings FOR SELECT
    USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage all bookings" ON public.bookings;
CREATE POLICY "Admin manage all bookings"
    ON public.bookings FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage studio settings" ON public.studio_settings;
CREATE POLICY "Admin manage studio settings"
    ON public.studio_settings FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin read user_roles_history" ON public.user_roles_history;
CREATE POLICY "Admin read user_roles_history"
    ON public.user_roles_history FOR SELECT
    USING (public.is_admin());

DROP POLICY IF EXISTS "Users read own login history" ON public.user_login_history;
CREATE POLICY "Users read own login history"
    ON public.user_login_history FOR SELECT
    USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admin read audit logs" ON public.audit_logs;
CREATE POLICY "Admin read audit logs"
    ON public.audit_logs FOR SELECT
    USING (public.is_admin());

