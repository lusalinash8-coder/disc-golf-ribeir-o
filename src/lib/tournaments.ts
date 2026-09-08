// Data access for tournaments. Maps the snake_case Supabase rows onto the
// Tournament / PastTournament shapes the components already consume, so the
// card and detail components did not have to change when the data moved out
// of src/lib/site-data.ts.
import { supabase } from "@/integrations/supabase/client";
import type { PastTournament, Tournament, TournamentDivision } from "@/lib/site-data";

const TOURNAMENT_FIELDS = `
  slug, title, date, end_date, registration_deadline, registration_deadline_confirmed,
  location, description, image_url, status, prices_approximate, pdga_link,
  archived_at, photos,
  tournament_divisions ( name, spots, sort_order, division_prices ( label, price, sort_order ) )
`;

const PAST_TOURNAMENT_FIELDS = `
  slug, title, date, end_date, location, image_url, divisions, photos
`;

type DivisionPriceRow = { label: string; price: number; sort_order: number };

type DivisionRow = {
  name: string;
  spots: number | null;
  sort_order: number;
  division_prices: DivisionPriceRow[];
};

type TournamentRow = {
  slug: string;
  title: string;
  date: string;
  end_date: string | null;
  registration_deadline: string;
  registration_deadline_confirmed: boolean;
  location: string;
  description: string;
  image_url: string | null;
  status: string;
  prices_approximate: boolean;
  pdga_link: string | null;
  archived_at: string | null;
  photos: string[];
  tournament_divisions: DivisionRow[];
};

type PastTournamentRow = {
  slug: string;
  title: string;
  date: string;
  end_date: string | null;
  location: string;
  image_url: string | null;
  divisions: string[];
  photos: string[];
};

const STATUSES: readonly string[] = ["open", "closed", "waitlist"];

/** The column is a plain text check constraint, so narrow it before it reaches the UI. */
function toStatus(value: string): Tournament["status"] {
  return STATUSES.includes(value) ? (value as Tournament["status"]) : "closed";
}

const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }) =>
  a.sort_order - b.sort_order;

function toDivision(row: DivisionRow): TournamentDivision {
  const prices = [...row.division_prices].sort(bySortOrder).map((p) => ({
    label: p.label,
    // numeric(10,2) can arrive as a string depending on the driver.
    price: Number(p.price),
  }));
  return {
    name: row.name,
    prices,
    ...(row.spots !== null ? { spots: row.spots } : {}),
  };
}

// Optional keys are spread in conditionally: tsconfig sets
// exactOptionalPropertyTypes, so `endDate: undefined` is not assignable.
function toTournament(row: TournamentRow): Tournament {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    registrationDeadline: row.registration_deadline,
    registrationDeadlineConfirmed: row.registration_deadline_confirmed,
    location: row.location,
    description: row.description,
    image: row.image_url ?? "",
    divisions: [...row.tournament_divisions].sort(bySortOrder).map(toDivision),
    status: toStatus(row.status),
    ...(row.end_date ? { endDate: row.end_date } : {}),
    ...(row.prices_approximate ? { pricesApproximate: true } : {}),
    ...(row.pdga_link ? { pdgaLink: row.pdga_link } : {}),
    ...(row.archived_at ? { archivedAt: row.archived_at } : {}),
    ...(row.photos.length > 0 ? { photos: row.photos } : {}),
    // `sponsors` is deliberately omitted: partner logos are still bundled
    // assets, so the components fall back to TOURNAMENT_DEFAULT_SPONSORS.
  };
}

function toPastTournament(row: PastTournamentRow): PastTournament {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    location: row.location,
    image: row.image_url ?? "",
    ...(row.end_date ? { endDate: row.end_date } : {}),
    ...(row.divisions.length > 0 ? { divisions: row.divisions } : {}),
    ...(row.photos.length > 0 ? { photos: row.photos } : {}),
  };
}

function fail(what: string, message: string): never {
  throw new Error(`Não foi possível carregar ${what}: ${message}`);
}

export async function fetchTournaments(): Promise<Tournament[]> {
  const { data, error } = await supabase
    .from("tournaments")
    .select(TOURNAMENT_FIELDS)
    .order("date", { ascending: true });

  if (error) fail("os torneios", error.message);
  return (data as unknown as TournamentRow[]).map(toTournament);
}

export async function fetchTournamentBySlug(slug: string): Promise<Tournament | null> {
  const { data, error } = await supabase
    .from("tournaments")
    .select(TOURNAMENT_FIELDS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) fail("o torneio", error.message);
  return data ? toTournament(data as unknown as TournamentRow) : null;
}

/** The next tournament on or after today — used by the home page hero. */
export async function fetchNextTournament(): Promise<Tournament | null> {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("tournaments")
    .select(TOURNAMENT_FIELDS)
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) fail("o próximo torneio", error.message);
  return data ? toTournament(data as unknown as TournamentRow) : null;
}

export async function fetchPastTournaments(): Promise<PastTournament[]> {
  const { data, error } = await supabase
    .from("past_tournaments")
    .select(PAST_TOURNAMENT_FIELDS)
    .order("date", { ascending: false });

  if (error) fail("os torneios realizados", error.message);
  return (data as unknown as PastTournamentRow[]).map(toPastTournament);
}

// ---------------------------------------------------------------------------
// Admin CRUD — general tournament fields only. Divisions/prices are still
// managed directly in Supabase until that editor is built.
// ---------------------------------------------------------------------------

export type TournamentGeneralInput = {
  title: string;
  date: string;
  endDate?: string;
  registrationDeadline: string;
  registrationDeadlineConfirmed: boolean;
  location: string;
  description: string;
  imageUrl?: string;
  status: Tournament["status"];
  pricesApproximate?: boolean;
  pdgaLink?: string;
};

function toTournamentRow(input: TournamentGeneralInput) {
  return {
    title: input.title,
    date: input.date,
    end_date: input.endDate ?? null,
    registration_deadline: input.registrationDeadline,
    registration_deadline_confirmed: input.registrationDeadlineConfirmed,
    location: input.location,
    description: input.description,
    image_url: input.imageUrl ?? null,
    status: input.status,
    prices_approximate: input.pricesApproximate ?? false,
    pdga_link: input.pdgaLink ?? null,
  };
}

/** ascii-fold + kebab-case; the admin form pre-fills this from the title but lets it be edited before creating. */
export function slugifyTournamentTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createTournament(
  slug: string,
  input: TournamentGeneralInput,
): Promise<Tournament> {
  const { error } = await supabase.from("tournaments").insert({ slug, ...toTournamentRow(input) });
  if (error) fail("o torneio", error.message);
  const created = await fetchTournamentBySlug(slug);
  if (!created) fail("o torneio", "não encontrado depois de criado");
  return created;
}

export async function updateTournament(
  slug: string,
  input: TournamentGeneralInput,
): Promise<Tournament> {
  const { error } = await supabase
    .from("tournaments")
    .update(toTournamentRow(input))
    .eq("slug", slug);
  if (error) fail("o torneio", error.message);
  const updated = await fetchTournamentBySlug(slug);
  if (!updated) fail("o torneio", "não encontrado depois de atualizado");
  return updated;
}

/** Cascades: deletes the tournament's divisions, prices AND registrations (on delete cascade). */
export async function deleteTournament(slug: string): Promise<void> {
  const { error } = await supabase.from("tournaments").delete().eq("slug", slug);
  if (error) fail("o torneio", error.message);
}

export async function setTournamentArchived(slug: string, archived: boolean): Promise<void> {
  const { error } = await supabase
    .from("tournaments")
    .update({ archived_at: archived ? new Date().toISOString() : null })
    .eq("slug", slug);
  if (error) fail("o torneio", error.message);
}

// ---------------------------------------------------------------------------
// Storage — tournament logo + photo gallery, both in the shared `media` bucket
// (public, 10 MB/file cap enforced server-side — see the storage migration).
// ---------------------------------------------------------------------------

export const MAX_TOURNAMENT_IMAGE_BYTES = 10 * 1024 * 1024;

function fileExtension(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return file.type.split("/").pop() ?? "jpg";
}

async function uploadTournamentMedia(slug: string, file: File, folder: string): Promise<string> {
  if (file.size > MAX_TOURNAMENT_IMAGE_BYTES) {
    throw new Error(`A imagem "${file.name}" passa de 10 MB.`);
  }
  const path = `tournaments/${slug}/${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExtension(file)}`;
  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) fail("a imagem", error.message);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export async function uploadTournamentLogo(slug: string, file: File): Promise<string> {
  return uploadTournamentMedia(slug, file, "logo");
}

export async function addTournamentPhotos(slug: string, files: File[]): Promise<string[]> {
  const uploaded = await Promise.all(
    files.map((file) => uploadTournamentMedia(slug, file, "gallery")),
  );
  const current = await fetchTournamentBySlug(slug);
  const photos = [...(current?.photos ?? []), ...uploaded];
  const { error } = await supabase.from("tournaments").update({ photos }).eq("slug", slug);
  if (error) fail("a galeria", error.message);
  return photos;
}

export async function removeTournamentPhoto(slug: string, photoUrl: string): Promise<string[]> {
  const current = await fetchTournamentBySlug(slug);
  const photos = (current?.photos ?? []).filter((p) => p !== photoUrl);
  const { error } = await supabase.from("tournaments").update({ photos }).eq("slug", slug);
  if (error) fail("a galeria", error.message);

  const marker = "/object/public/media/";
  const markerIndex = photoUrl.indexOf(marker);
  if (markerIndex !== -1) {
    await supabase.storage.from("media").remove([photoUrl.slice(markerIndex + marker.length)]);
  }
  return photos;
}
