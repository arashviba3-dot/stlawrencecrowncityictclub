
-- 1. Restrict profiles SELECT to owner or admin; expose safe fields via view
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users view own profile or admins view all"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'::app_role));

-- Safe directory view (no email, no class, no bio) for cross-member lookups
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = on) AS
SELECT id, full_name, avatar_url
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO authenticated, anon;

-- Allow the view itself to bypass the new restrictive policy by adding a
-- permissive SELECT policy limited to the safe columns through a SECURITY DEFINER function
CREATE OR REPLACE FUNCTION public.list_member_directory()
RETURNS TABLE (id uuid, full_name text, avatar_url text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id, full_name, avatar_url FROM public.profiles;
$$;
REVOKE ALL ON FUNCTION public.list_member_directory() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_member_directory() TO authenticated;

-- 2. Storage: add DELETE policy on avatars for owners only
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND (auth.uid())::text = (storage.foldername(name))[1]);

-- 3. Drop public SELECT listing policy on avatars (public URLs still work via /object/public/)
DROP POLICY IF EXISTS "Avatars readable when path is known" ON storage.objects;

-- 4. Payments: DB-level integrity backstop for fee amounts
ALTER TABLE public.payments
  ADD CONSTRAINT payments_fee_amounts_check
  CHECK (
    base_fee = 5000
    AND late_fee IN (0, 5000)
    AND total = base_fee + late_fee
    AND status IN ('pending','approved','rejected')
  );

-- 5. Lock down SECURITY DEFINER helpers — only used inside RLS, not by clients
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_conversation_member(uuid, uuid) FROM PUBLIC, anon, authenticated;
