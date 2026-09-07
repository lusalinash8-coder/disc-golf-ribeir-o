-- Closes out the "static content" cleanup:
--
-- - site_settings: contact info, name, tagline — fixed site chrome, stays
--   hardcoded in SITE (src/lib/site-data.ts), same call as faq/content_blocks.
--
-- - courses: nothing queries it — USP_COURSE is still fully hardcoded and
--   used as-is by /treinos and /torneios/$slug. Keeping it around meant
--   tournaments.course_id was the only link into it, coupling tournaments
--   and trainings through a table neither actually reads. Dropping it removes
--   that shared dependency outright instead of giving each table its own
--   course fields — there is no course data in the DB for either to diverge
--   over. tournaments.course_id goes with it (cascades automatically).

begin;

drop table if exists public.site_settings;
drop table if exists public.courses cascade;

-- DROP TABLE ... CASCADE removes the FK constraint but not the column itself.
alter table public.tournaments drop column if exists course_id;

commit;
