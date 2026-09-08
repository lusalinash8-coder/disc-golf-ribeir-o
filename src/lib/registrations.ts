// Data access for registrations. Same mapping approach as
// src/lib/tournaments.ts and src/lib/trainings.ts.
import { supabase } from "@/integrations/supabase/client";

export type RegistrationStatus = "pending" | "confirmed" | "cancelled" | "waitlist";

export type Registration = {
  id: string;
  tournamentId: string;
  tournamentSlug: string;
  tournamentTitle: string;
  divisionName: string;
  priceLabel: string;
  price: number;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  city: string;
  birthDate: string;
  pdgaNumber: string;
  status: RegistrationStatus;
  notes: string | null;
  createdAt: string;
};

const REGISTRATION_FIELDS = `
  id, tournament_id, division_name, price_label, price, full_name, email, phone,
  cpf, city, birth_date, pdga_number, status, notes, created_at,
  tournaments ( slug, title )
`;

type RegistrationRow = {
  id: string;
  tournament_id: string;
  division_name: string;
  price_label: string;
  price: number;
  full_name: string;
  email: string;
  phone: string;
  cpf: string;
  city: string;
  birth_date: string;
  pdga_number: string;
  status: string;
  notes: string | null;
  created_at: string;
  tournaments: { slug: string; title: string } | null;
};

const STATUSES: readonly string[] = ["pending", "confirmed", "cancelled", "waitlist"];

/** The column is a plain text check constraint, so narrow it before it reaches the UI. */
function toStatus(value: string): RegistrationStatus {
  return STATUSES.includes(value) ? (value as RegistrationStatus) : "pending";
}

function toRegistration(row: RegistrationRow): Registration {
  return {
    id: row.id,
    tournamentId: row.tournament_id,
    tournamentSlug: row.tournaments?.slug ?? "",
    tournamentTitle: row.tournaments?.title ?? "—",
    divisionName: row.division_name,
    priceLabel: row.price_label,
    // numeric(10,2) can arrive as a string depending on the driver.
    price: Number(row.price),
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    cpf: row.cpf,
    city: row.city,
    birthDate: row.birth_date,
    pdgaNumber: row.pdga_number,
    status: toStatus(row.status),
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function fail(what: string, message: string): never {
  throw new Error(`Não foi possível carregar ${what}: ${message}`);
}

export async function fetchRegistrations(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from("registrations")
    .select(REGISTRATION_FIELDS)
    .order("created_at", { ascending: false });

  if (error) fail("as inscrições", error.message);
  return (data as unknown as RegistrationRow[]).map(toRegistration);
}
