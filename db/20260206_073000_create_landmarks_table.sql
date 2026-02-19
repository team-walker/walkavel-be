-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.landmark_combined (
  contentid bigint NOT NULL,
  contenttypeid integer,
  title text NOT NULL,
  addr1 text,
  addr2 text,
  zipcode character varying,
  tel text,
  areacode integer,
  sigungucode integer,
  cat1 character varying,
  cat2 character varying,
  cat3 character varying,
  mapx double precision,
  mapy double precision,
  mlevel integer,
  firstimage text,
  firstimage2 text,
  cpyrhtdivcd character varying,
  createdtime timestamp without time zone,
  modifiedtime timestamp without time zone,
  ldongregncd integer,
  ldongsigngucd integer,
  lclssystm1 character varying,
  lclssystm2 character varying,
  lclssystm3 character varying,
  homepage text,
  overview text,
  CONSTRAINT landmark_combined_pkey PRIMARY KEY (contentid)
);
create table public.landmark_image (
  id serial not null,
  contentid bigint not null,
  originimgurl text not null,
  imgname text not null,
  smallimageurl text null,
  cpyrhtdivcd character varying null,
  serialnum character varying(20) null,
  constraint landmark_image_pkey primary key (id),
  constraint landmark_image_contentid_serialnum_unique unique (contentid, serialnum),
  constraint landmark_image_contentid_fk foreign KEY (contentid) references landmark_combined (contentid) on delete CASCADE
) TABLESPACE pg_default;
create table public.landmark_intro (
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
  constraint landmark_intro_contentid_fk foreign KEY (contentid) references landmark_combined (contentid) on delete CASCADE
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