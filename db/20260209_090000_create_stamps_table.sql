CREATE TABLE IF NOT EXISTS public.stamps (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  landmark_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT fk_stamps_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_stamps_landmark
    FOREIGN KEY (landmark_id)
    REFERENCES public.landmark(contentid)
    ON DELETE RESTRICT,

  CONSTRAINT unique_user_landmark
    UNIQUE (user_id, landmark_id)
);

CREATE INDEX IF NOT EXISTS idx_stamps_user_id
  ON public.stamps(user_id);

CREATE INDEX IF NOT EXISTS idx_stamps_landmark_id
  ON public.stamps(landmark_id);

ALTER TABLE public.stamps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS stamps_select_own ON public.stamps;
DROP POLICY IF EXISTS stamps_insert_own ON public.stamps;
DROP POLICY IF EXISTS stamps_delete_own ON public.stamps;

CREATE POLICY stamps_select_own
  ON public.stamps
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY stamps_insert_own
  ON public.stamps
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY stamps_delete_own
  ON public.stamps
  FOR DELETE
  USING (user_id = auth.uid());
