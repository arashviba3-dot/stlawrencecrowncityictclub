-- Premium membership + activation codes

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.activation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  duration_days INTEGER NOT NULL DEFAULT 30,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  redeemed_by UUID,
  redeemed_at TIMESTAMPTZ,
  note TEXT
);

ALTER TABLE public.activation_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage codes"
  ON public.activation_codes
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone authenticated can read a code to redeem"
  ON public.activation_codes
  FOR SELECT TO authenticated
  USING (true);

-- Redeem function: validates code, marks redeemed, sets premium on profile
CREATE OR REPLACE FUNCTION public.redeem_activation_code(_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row public.activation_codes;
  v_uid UUID := auth.uid();
  v_expires TIMESTAMPTZ;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  SELECT * INTO v_row FROM public.activation_codes WHERE upper(code) = upper(_code) LIMIT 1;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid activation code');
  END IF;
  IF v_row.redeemed_by IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Code already used');
  END IF;

  v_expires := now() + (v_row.duration_days || ' days')::interval;

  UPDATE public.activation_codes
    SET redeemed_by = v_uid, redeemed_at = now()
    WHERE id = v_row.id;

  UPDATE public.profiles
    SET is_premium = true, premium_expires_at = v_expires
    WHERE id = v_uid;

  RETURN jsonb_build_object('success', true, 'expires_at', v_expires);
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_activation_code(TEXT) TO authenticated;