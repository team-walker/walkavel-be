ALTER TABLE public.bookmark
  DROP CONSTRAINT IF EXISTS bookmark_landmark_fk;

ALTER TABLE public.bookmark
  ADD CONSTRAINT bookmark_landmark_fk
  FOREIGN KEY (contentid)
  REFERENCES public.landmark_combined (contentid)
  NOT VALID;
