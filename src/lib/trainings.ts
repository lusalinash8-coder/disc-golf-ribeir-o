// Data access for trainings. Same approach as src/lib/tournaments.ts: map the
// Supabase rows onto the Training shape the pages already consume, so the
// markup did not have to change when the data left src/lib/site-data.ts.
import { supabase } from "@/integrations/supabase/client";
import type { Training } from "@/lib/site-data";

const TRAINING_FIELDS = `slug, title, day, time, location, level, description, status, confirmed`;

type TrainingRow = {
  slug: string;
  title: string;
  day: string;
  time: string;
  location: string;
  level: string;
  description: string;
  status: string;
  confirmed: boolean;
};

const STATUSES: readonly string[] = ["active", "suspended"];

/** The column is plain text behind a check constraint, so narrow it here. */
function toStatus(value: string): Training["status"] {
  return STATUSES.includes(value) ? (value as Training["status"]) : "suspended";
}

function toTraining(row: TrainingRow): Training {
  return {
    // The hardcoded data used the slug ("treino-semanal") as `id`, and the
    // pages use it as the React key, so keep that mapping.
    id: row.slug,
    title: row.title,
    day: row.day,
    time: row.time,
    location: row.location,
    level: row.level,
    description: row.description,
    status: toStatus(row.status),
    confirmed: row.confirmed,
  };
}

function fail(what: string, message: string): never {
  throw new Error(`Não foi possível carregar ${what}: ${message}`);
}

export async function fetchTrainings(): Promise<Training[]> {
  // No sort_order column yet — creation order is stable and there is one row.
  const { data, error } = await supabase
    .from("trainings")
    .select(TRAINING_FIELDS)
    .order("created_at", { ascending: true });

  if (error) fail("os treinos", error.message);
  return (data as unknown as TrainingRow[]).map(toTraining);
}

/** The first active training — used by the home page schedule callout. */
export async function fetchOpenTraining(): Promise<Training | null> {
  const { data, error } = await supabase
    .from("trainings")
    .select(TRAINING_FIELDS)
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) fail("o treino aberto", error.message);
  return data ? toTraining(data as unknown as TrainingRow) : null;
}
