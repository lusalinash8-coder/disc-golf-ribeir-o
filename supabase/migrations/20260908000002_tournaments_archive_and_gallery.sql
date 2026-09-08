-- Lets organisers archive a tournament manually before its date passes (e.g.
-- on cancellation) and attach a photo gallery once it's over, mirroring the
-- `photos` column past_tournaments already has.

begin;

alter table public.tournaments
  add column archived_at timestamptz,
  add column photos text[] not null default '{}';

commit;
