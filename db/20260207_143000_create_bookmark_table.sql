create table public.bookmark (
  id serial not null,
  user_id uuid not null,
  content_id bigint not null,
  created_at timestamp with time zone null default now(),
  constraint bookmark_pkey primary key (id),
  constraint bookmark_user_content_unique unique (user_id, content_id),
  constraint bookmark_landmark_fk foreign KEY (content_id) references landmark (contentid),
  constraint bookmark_user_fk foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;

-- Enable Row Level Security
ALTER TABLE public.bookmark ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own bookmarks" 
  ON public.bookmark FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks" 
  ON public.bookmark FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" 
  ON public.bookmark FOR DELETE 
  USING (auth.uid() = user_id);