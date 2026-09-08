import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTournaments } from "@/lib/tournaments";
import { fetchRegistrations } from "@/lib/registrations";

export const Route = createFileRoute("/_authenticated/admin/financeiro")({
  head: () => ({
    meta: [{ title: "Financeiro — Painel Administrativo" }],
  }),
  loader: async () => ({
    tournaments: await fetchTournaments(),
    registrations: await fetchRegistrations(),
  }),
  component: AdminFinanceiro,
});

function AdminFinanceiro() {
  const { tournaments, registrations } = Route.useLoaderData();

  const rows = tournaments.map((t) => {
    const potential = t.divisions.reduce(
      (acc, div) => acc + (div.prices[0]?.price ?? 0) * (div.spots ?? 0),
      0,
    );
    const tournamentRegistrations = registrations.filter((r) => r.tournamentSlug === t.slug);
    const confirmed = tournamentRegistrations
      .filter((r) => r.status === "confirmed")
      .reduce((acc, r) => acc + r.price, 0);
    const pending = tournamentRegistrations
      .filter((r) => r.status === "pending" || r.status === "waitlist")
      .reduce((acc, r) => acc + r.price, 0);
    return { slug: t.slug, title: t.title, potential, confirmed, pending };
  });

  const totals = rows.reduce(
    (acc, r) => ({
      potential: acc.potential + r.potential,
      confirmed: acc.confirmed + r.confirmed,
      pending: acc.pending + r.pending,
    }),
    { potential: 0, confirmed: 0, pending: 0 },
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Financeiro</h1>
        <p className="text-muted-foreground">
          Receita por torneio, com base nas inscrições registradas. Relatório provisório até a
          integração com Stripe.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Receita potencial</p>
            <p className="text-2xl font-bold">R$ {totals.potential}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Confirmada</p>
            <p className="text-2xl font-bold text-acid">R$ {totals.confirmed}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Pendente / lista de espera</p>
            <p className="text-2xl font-bold">R$ {totals.pending}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">Nenhum torneio cadastrado.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Torneio</TableHead>
                  <TableHead>Potencial</TableHead>
                  <TableHead>Confirmada</TableHead>
                  <TableHead>Pendente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.slug}>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell>R$ {r.potential}</TableCell>
                    <TableCell className="text-acid">R$ {r.confirmed}</TableCell>
                    <TableCell>R$ {r.pending}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
