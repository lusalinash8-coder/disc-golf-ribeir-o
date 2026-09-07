-- Drops the tables that held fixed site copy. FAQ, "o que é Disc Golf", the
-- disc types, the values list and the "como começar" steps are part of the web
-- app itself, not content organisers will edit from the panel, so they stay
-- hardcoded in src/lib/site-data.ts and in the page components.
--
-- Reversible: 20260907000000_content_tables.sql recreates the tables and
-- 20260907000001_content_seed.sql refills them, if this is ever revisited.

begin;

drop table if exists public.faq;
drop table if exists public.content_blocks;

commit;
