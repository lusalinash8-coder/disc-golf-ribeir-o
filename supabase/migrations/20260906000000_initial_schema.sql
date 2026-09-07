-- Initial schema for A Turma do Disc Golf
-- Mirrors the Tournament / TournamentDivision / DivisionPrice / PastTournament / Training
-- types in src/lib/site-data.ts, plus a seed matching the data currently hardcoded there.
--
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).

begin;

create extension if not exists pgcrypto;

-- Reusable trigger to keep updated_at current on every row update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- tournaments (upcoming / active)
-- ---------------------------------------------------------------------------
create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  date date not null,
  end_date date,
  registration_deadline date not null,
  registration_deadline_confirmed boolean not null default true,
  location text not null,
  description text not null,
  image_url text,
  status text not null default 'open' check (status in ('open', 'closed', 'waitlist')),
  prices_approximate boolean not null default false,
  pdga_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger tournaments_set_updated_at
  before update on public.tournaments
  for each row execute function public.set_updated_at();

-- Divisions within a tournament (e.g. MA1, MA40, FA1)
create table public.tournament_divisions (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  name text not null,
  spots integer check (spots is null or spots >= 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (tournament_id, name)
);

-- Price tiers per division (e.g. "Com disco" / "Sem disco")
create table public.division_prices (
  id uuid primary key default gen_random_uuid(),
  division_id uuid not null references public.tournament_divisions(id) on delete cascade,
  label text not null,
  price numeric(10,2) not null check (price >= 0),
  sort_order integer not null default 0
);

create index tournament_divisions_tournament_id_idx on public.tournament_divisions(tournament_id);
create index division_prices_division_id_idx on public.division_prices(division_id);

-- ---------------------------------------------------------------------------
-- past_tournaments (historical results / photo gallery)
-- ---------------------------------------------------------------------------
create table public.past_tournaments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  date date not null,
  end_date date,
  location text not null,
  image_url text,
  divisions text[] not null default '{}',
  photos text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger past_tournaments_set_updated_at
  before update on public.past_tournaments
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- trainings (recurring weekly sessions)
-- ---------------------------------------------------------------------------
create table public.trainings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  day text not null,
  time text not null,
  location text not null,
  level text not null,
  description text not null,
  status text not null default 'active' check (status in ('active', 'suspended')),
  confirmed boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trainings_set_updated_at
  before update on public.trainings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security: everyone can read (the site is public); only
-- authenticated users can write. NOTE: /auth currently allows open self
-- sign-up with no admin allowlist, so any stranger who registers gets write
-- access under this policy — disable public sign-up in the dashboard
-- (Authentication → Providers → Email → "Allow new users to sign up") or add
-- a role check before relying on this for real admin content.
-- ---------------------------------------------------------------------------
alter table public.tournaments enable row level security;
alter table public.tournament_divisions enable row level security;
alter table public.division_prices enable row level security;
alter table public.past_tournaments enable row level security;
alter table public.trainings enable row level security;

create policy "Public read tournaments" on public.tournaments
  for select using (true);
create policy "Public read tournament_divisions" on public.tournament_divisions
  for select using (true);
create policy "Public read division_prices" on public.division_prices
  for select using (true);
create policy "Public read past_tournaments" on public.past_tournaments
  for select using (true);
create policy "Public read trainings" on public.trainings
  for select using (true);

create policy "Authenticated write tournaments" on public.tournaments
  for all to authenticated using (true) with check (true);
create policy "Authenticated write tournament_divisions" on public.tournament_divisions
  for all to authenticated using (true) with check (true);
create policy "Authenticated write division_prices" on public.division_prices
  for all to authenticated using (true) with check (true);
create policy "Authenticated write past_tournaments" on public.past_tournaments
  for all to authenticated using (true) with check (true);
create policy "Authenticated write trainings" on public.trainings
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Seed: mirrors what's currently hardcoded in src/lib/site-data.ts.
-- image_url / photos are left blank — those assets are bundled locally today
-- (src/assets/...); upload them to Supabase Storage later and fill these in.
-- ---------------------------------------------------------------------------
with t as (
  insert into public.tournaments
    (slug, title, date, end_date, registration_deadline, registration_deadline_confirmed,
     location, description, status, prices_approximate)
  values (
    '2-torneio-disc-golf',
    '2º Ribeirão Preto Open Invocado por Shaman Disc Golf – Campeonato Nacional',
    '2026-10-10', '2026-10-11', '2026-10-05', false,
    'Campo USP Ribeirão Preto',
    'A segunda edição do nosso torneio chega com certificação PDGA! Dois dias de disputa no campo da USP, reunindo jogadores de todos os níveis nas divisões MA1, MA2, MA40 e FA1. Vagas limitadas — garanta a sua e venha fazer parte dessa edição.',
    'open', true
  )
  returning id
),
d as (
  insert into public.tournament_divisions (tournament_id, name, sort_order)
  select t.id, v.name, v.sort_order
  from t, (values ('MA1', 0), ('MA40', 1), ('MA2', 2), ('FA1', 3)) as v(name, sort_order)
  returning id, name
)
insert into public.division_prices (division_id, label, price, sort_order)
select d.id, v.label, v.price, v.sort_order
from d
join (
  values
    ('MA1', 'Com disco', 150, 0), ('MA1', 'Sem disco', 120, 1),
    ('MA40', 'Com disco', 150, 0), ('MA40', 'Sem disco', 120, 1),
    ('MA2', 'Com disco', 120, 0), ('MA2', 'Sem disco', 100, 1),
    ('FA1', 'Com disco', 120, 0), ('FA1', 'Sem disco', 100, 1)
) as v(division_name, label, price, sort_order) on v.division_name = d.name;

insert into public.past_tournaments (slug, title, date, end_date, location, divisions)
values (
  'ribeirao-preto-open-2025',
  'Ribeirão Preto Open Disc Golf 2025',
  '2025-11-29', '2025-11-30',
  'Ribeirão Preto, SP',
  array['Profissional', 'MP40', 'Amador', 'Feminino']
);

insert into public.trainings (slug, title, day, time, location, level, description, status, confirmed)
values (
  'treino-semanal',
  'Treino aberto semanal',
  'Quartas-feiras', '15:00',
  'Campo USP Ribeirão Preto',
  'Todos os níveis',
  'Encontro informal para treinar arremessos, conhecer a cesta e trocar experiências. Leve seu disco ou peça um emprestado com a gente.',
  'active', true
);

commit;
