-- Migration: 20261030_000003_avatars_bucket
-- Creates the 'avatars' storage bucket and applies RLS policies so that:
--   - Any authenticated user can upload/update/delete their own avatar (path must start with their user ID)
--   - Any authenticated user can read their own avatar
--   - Admins (via is_admin()) can read ALL avatars
--   - Public (unauthenticated) access is DENIED

-- ─── 1. Create the storage bucket ───────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  false,            -- NOT public — RLS controls access
  2097152,          -- 2 MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ─── 2. Storage RLS policies ─────────────────────────────────────────────────
-- Supabase Storage RLS policies apply to the `storage.objects` table.
-- The file path convention is: avatars/<user_id>/<filename>
-- We use (storage.foldername(name))[1] to extract the user_id folder.

-- Allow authenticated users to upload/overwrite their own avatar
CREATE POLICY "Users can upload own avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to update (replace) their own avatar
CREATE POLICY "Users can update own avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to delete their own avatar
CREATE POLICY "Users can delete own avatar"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to read their own avatar; admins can read all
CREATE POLICY "Users read own avatar, admins read all"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR public.is_admin()
    )
  );

