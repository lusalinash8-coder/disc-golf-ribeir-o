// Data access for tournaments. Maps the snake_case Supabase rows onto the
// Tournament / PastTournament shapes the components already consume, so the
// card and detail components did not have to change when the data moved out
// of src/lib/site-data.ts.
import { supabase } from "@/integrations/supabase/client";
import type { PastTournament, Tournament, TournamentDivision } from "@/lib/site-data";

const TOURNAMENT_FIELDS = `
  slug, title, date, end_date, registration_deadline, registration_deadline_confirmed,
  location, description, image_url, status, prices_approximate, pdga_link,
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

const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order;

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
