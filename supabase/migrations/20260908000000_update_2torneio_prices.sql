-- Official prices confirmed for the 2º Ribeirão Preto Open (2026-10-10/11).
-- Renames "Com disco" / "Sem disco" to the official "Kit Disco" / "Kit Basico"
-- labels and updates the values accordingly.

begin;

update public.division_prices dp
set
  label = case dp.label
    when 'Com disco' then 'Kit Disco'
    when 'Sem disco' then 'Kit Basico'
    else dp.label
  end,
  price = case
    when d.name in ('MA1', 'MA40') and dp.label = 'Com disco' then 140.00
    when d.name in ('MA1', 'MA40') and dp.label = 'Sem disco' then 70.00
    when d.name in ('MA2', 'FA1') and dp.label = 'Com disco' then 110.00
    when d.name in ('MA2', 'FA1') and dp.label = 'Sem disco' then 50.00
    else dp.price
  end
from public.tournament_divisions d
join public.tournaments t on t.id = d.tournament_id
where dp.division_id = d.id
  and t.slug = '2-torneio-disc-golf'
  and d.name in ('MA1', 'MA40', 'MA2', 'FA1');

-- Prices are now official, not estimates.
update public.tournaments
set prices_approximate = false
where slug = '2-torneio-disc-golf';

commit;
