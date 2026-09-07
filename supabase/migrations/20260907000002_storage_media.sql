-- Storage for the images that organisers will replace from the admin panel:
-- tournament logos/galleries and (later) training photos. Everything else —
-- site logos, partner logos, the /sobre gallery, videos, page heroes — stays
-- bundled in src/assets: it is fixed site chrome, and keeping it out of
-- Storage leaves the free 1 GB quota for tournament uploads.

begin;

-- Trainings had no image column at all; organisers need one per training.
alter table public.trainings add column image_url text;

-- Public bucket: images are shown on the public site, so they are served
-- straight from the public object URL with no signing.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true,
  10485760,  -- 10 MB per file
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Reads come through the public URL, so only writes need policies.
-- Uploading stays with signed-in organisers (and the service role).
create policy "Authenticated upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "Authenticated update media" on storage.objects
  for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
create policy "Authenticated delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

commit;
