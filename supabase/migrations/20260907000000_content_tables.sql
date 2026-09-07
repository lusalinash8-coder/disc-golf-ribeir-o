-- Content tables for everything still hardcoded in src/lib/site-data.ts and in
-- the page components, plus the registrations table the /torneios form needs.
--
-- Scope decision: structured, repeating content (partners, FAQ, disc types,
-- value props, course data, contact info) becomes data. One-off page copy
-- (hero headings, "Nossa história" paragraphs) stays in the components — it is
-- layout, not managed content.

begin;

-- ---------------------------------------------------------------------------
-- site_settings — singleton row mirroring the SITE object
-- ---------------------------------------------------------------------------
create table public.site_settings (
  -- boolean PK with a check constraint enforces exactly one row.
  id boolean primary key default true check (id),
  name text not null,
  tagline text not null,
  description text not null,
  email text not null,
  instagram text,
  whatsapp text,
  city text not null,
  director text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- courses — the USP course (and any future course)
-- ---------------------------------------------------------------------------
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  full_name text not null,
  holes integer check (holes is null or holes > 0),
  par integer check (par is null or par > 0),
  lat double precision,
  lng double precision,
  udisc_url text,
  map_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- partners — logos on /sobre and the sponsor row on tournament pages.
-- Two flags because they are different lists: the club's own logo is a default
-- sponsor but is not shown in the /sobre partners grid.
-- ---------------------------------------------------------------------------
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  full_name text not null,
  logo_url text,
  is_partner boolean not null default true,
  is_default_sponsor boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger partners_set_updated_at
  before update on public.partners
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- content_blocks — ordered title/body lists that repeat across pages:
-- WHAT_IS_DISC_GOLF, DISC_TYPES, the "Nossos valores" list and the
-- "Como começar agora" steps. One table instead of four near-identical ones.
-- ---------------------------------------------------------------------------
create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  body text not null,
  icon text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index content_blocks_section_idx on public.content_blocks(section, sort_order);

create trigger content_blocks_set_updated_at
  before update on public.content_blocks
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- faq
-- ---------------------------------------------------------------------------
create table public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger faq_set_updated_at
  before update on public.faq
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- New columns on the tournament tables
-- ---------------------------------------------------------------------------
-- Optional sponsor override; null/empty means "use the default sponsor list".
-- Stored as an id array rather than a join table: the override is per-tournament
-- display metadata over a 5-row partners table, never queried relationally.
alter table public.tournaments add column sponsor_partner_ids uuid[];
alter table public.past_tournaments add column sponsor_partner_ids uuid[];

-- Replaces the `tournament.location === USP_COURSE.name` string match in
-- src/routes/torneios_.$slug.tsx with a real reference.
alter table public.tournaments
  add column course_id uuid references public.courses(id) on delete set null;

-- ---------------------------------------------------------------------------
-- registrations — the /torneios form currently discards every submission
-- (see the TODO in src/components/TournamentRegisterForm.tsx).
-- Division/price are snapshotted so a later price change cannot rewrite what
-- somebody already signed up for.
-- ---------------------------------------------------------------------------
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  division_id uuid references public.tournament_divisions(id) on delete set null,
  division_name text not null,
  price_label text not null,
  price numeric(10,2) not null check (price >= 0),
  full_name text not null,
  email text not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'waitlist')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index registrations_tournament_id_idx on public.registrations(tournament_id);

create trigger registrations_set_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS — public read + authenticated write, same as the first migration.
-- registrations is the exception: it holds personal data, so anonymous
-- visitors may INSERT their own sign-up but may never read the table back.
-- ---------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.courses enable row level security;
alter table public.partners enable row level security;
alter table public.content_blocks enable row level security;
alter table public.faq enable row level security;
alter table public.registrations enable row level security;

create policy "Public read site_settings" on public.site_settings
  for select using (true);
create policy "Public read courses" on public.courses
  for select using (true);
create policy "Public read partners" on public.partners
  for select using (true);
create policy "Public read content_blocks" on public.content_blocks
  for select using (true);
create policy "Public read faq" on public.faq
  for select using (true);

create policy "Authenticated write site_settings" on public.site_settings
  for all to authenticated using (true) with check (true);
create policy "Authenticated write courses" on public.courses
  for all to authenticated using (true) with check (true);
create policy "Authenticated write partners" on public.partners
  for all to authenticated using (true) with check (true);
create policy "Authenticated write content_blocks" on public.content_blocks
  for all to authenticated using (true) with check (true);
create policy "Authenticated write faq" on public.faq
  for all to authenticated using (true) with check (true);

-- Anyone can submit a registration; only signed-in organisers can read or edit.
create policy "Anyone can register" on public.registrations
  for insert to anon, authenticated with check (true);
create policy "Authenticated read registrations" on public.registrations
  for select to authenticated using (true);
create policy "Authenticated update registrations" on public.registrations
  for update to authenticated using (true) with check (true);
create policy "Authenticated delete registrations" on public.registrations
  for delete to authenticated using (true);

commit;
