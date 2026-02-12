CREATE TABLE public.bookmark (
  id serial not null,
  userid uuid not null,
  contentid bigint not null,
  created_at timestamp with time zone null default now(),
  constraint bookmark_pkey primary key (id),
  constraint bookmark_user_content_unique unique (userid, contentid),
  constraint bookmark_landmark_fk foreign KEY (contentid) references landmark (contentid),
  constraint bookmark_userid_fkey foreign KEY (userid) references auth.users (id)
) TABLESPACE pg_default;
-- Enable Row Level Security
ALTER TABLE public.bookmark ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own bookmarks" 
  ON public.bookmark FOR SELECT 
  USING (auth.uid() = userid);

CREATE POLICY "Users can create own bookmarks" 
  ON public.bookmark FOR INSERT 
  WITH CHECK (auth.uid() = userid);

CREATE POLICY "Users can delete own bookmarks" 
  ON public.bookmark FOR DELETE 
  USING (auth.uid() = userid);
