-- Adds the personal/PDGA fields confirmed for the "Inscreva-se" form:
-- cidade, data de nascimento, número PDGA (accepts "NA") and CPF.
-- The table has never been written to (the form submit is still a TODO),
-- so it's safe to add these as not null with no backfill.

begin;

alter table public.registrations
  add column city text not null,
  add column birth_date date not null,
  add column pdga_number text not null,
  add column cpf text not null;

commit;
