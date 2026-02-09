CREATE TABLE IF NOT EXISTS stamps (
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
    ON DELETE CASCADE,

  CONSTRAINT unique_user_landmark
    UNIQUE (user_id, landmark_id)
);

CREATE INDEX IF NOT EXISTS idx_stamps_user_id ON stamps(user_id);
CREATE INDEX IF NOT EXISTS idx_stamps_landmark_id ON stamps(landmark_id);
