-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.landmark (
  contentid bigint not null,
  contenttypeid integer null,
  title text not null,
  addr1 text null,
  addr2 text null,
  zipcode character varying(10) null,
  tel text null,
  areacode integer null,
  sigungucode integer null,
  cat1 character varying(10) null,
  cat2 character varying(10) null,
  cat3 character varying(20) null,
  mapx double precision null,
  mapy double precision null,
  mlevel integer null,
  firstimage text null,
  firstimage2 text null,
  cpyrhtdivcd character varying(10) null,
  createdtime timestamp without time zone null,
  modifiedtime timestamp without time zone null,
  ldongregncd integer null,
  ldongsigngucd integer null,
  lclssystm1 character varying(10) null,
  lclssystm2 character varying(10) null,
  lclssystm3 character varying(20) null,
  constraint landmark_pkey primary key (contentid)
) TABLESPACE pg_default;

CREATE TABLE public.landmark_detail (
  contentid bigint not null,
  contenttypeid integer null,
  title text not null,
  addr1 text null,
  addr2 text null,
  zipcode character varying(10) null,
  tel text null,
  areacode integer null,
  sigungucode integer null,
  cat1 character varying(10) null,
  cat2 character varying(10) null,
  cat3 character varying(10) null,
  mapx double precision null,
  mapy double precision null,
  mlevel integer null,
  firstimage text null,
  firstimage2 text null,
  cpyrhtdivcd character varying(10) null,
  createdtime timestamp without time zone null,
  modifiedtime timestamp without time zone null,
  ldongregncd integer null,
  ldongsigngucd integer null,
  lclssystm1 character varying(10) null,
  lclssystm2 character varying(10) null,
  lclssystm3 character varying(10) null,
  homepage text null,
  overview text null,
  constraint landmark_detail_pkey primary key (contentid),
  constraint landmark_detail_contentid_fk foreign KEY (contentid) references landmark (contentid) on delete CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.landmark_image (
  id serial not null,
  contentid bigint not null,
  originimgurl text not null,
  imgname text not null,
  smallimageurl text null,
  cpyrhtdivcd character varying null,
  serialnum character varying(20) null,
  constraint landmark_image_pkey primary key (id),
  constraint landmark_image_contentid_serialnum_unique unique (contentid, serialnum),
  constraint landmark_image_contentid_fk foreign KEY (contentid) references landmark (contentid) on delete CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.landmark_intro (
  contentid bigint not null,
  contenttypeid integer not null,
  heritage1 boolean null default false,
  heritage2 boolean null default false,
  heritage3 boolean null default false,
  infocenter text null,
  opendate text null,
  restdate text null,
  expguide text null,
  expagerange text null,
  accomcount text null,
  useseason text null,
  usetime text null,
  parking text null,
  chkbabycarriage boolean null default false,
  chkpet boolean null default false,
  chkcreditcard boolean null default false,
  constraint landmark_intro_pkey primary key (contentid),
  constraint landmark_intro_contentid_fk foreign KEY (contentid) references landmark (contentid) on delete CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.region_sigungu_map (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  area_code integer NOT NULL,
  sigungu_code integer NOT NULL,
  sigungu_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  sido_name text NOT NULL DEFAULT ''::text,
  CONSTRAINT region_sigungu_map_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  email text,
  nickname text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);