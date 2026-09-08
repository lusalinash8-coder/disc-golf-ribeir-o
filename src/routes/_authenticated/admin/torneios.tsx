import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { parseLocalDate } from "@/lib/site-data";
import { fetchTournaments } from "@/lib/tournaments";

const STATUS_LABEL: Record<string, string> = {
  open: "Aberto",
  closed: "Fechado",
  waitlist: "Lista de espera",
};

export const Route = createFileRoute("/_authenticated/admin/torneios")({
  head: () => ({
    meta: [{ title: "Torneios — Painel Administrativo" }],
  }),
  loader: async () => ({
    tournaments: await fetchTournaments(),
  }),
  component: AdminTorneios,
});

function AdminTorneios() {
  const { tournaments } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Torneios</h1>
        <p className="text-muted-foreground">Torneios cadastrados, divisões e vagas.</p>
      </div>

      <div className="space-y-4">
        {tournaments.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="p-5 text-sm text-muted-foreground">
              Nenhum torneio cadastrado.
            </CardContent>
          </Card>
        )}
        {tournaments.map((t) => (
          <Card key={t.slug} className="border-border bg-card">
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{t.title}</p>
                    <Badge
                      variant={t.status === "open" ? "default" : "secondary"}
                      className={t.status === "open" ? "bg-acid text-background" : ""}
                    >
                      {STATUS_LABEL[t.status] ?? t.status}
                    </Badge>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{" "}
                      {parseLocalDate(t.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.location}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-border bg-background"
                  >
                    <Link to="/admin/inscricoes" search={{ torneio: t.slug }}>
                      <Users className="mr-1 h-3 w-3" /> Ver inscritos
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-acid text-acid hover:bg-acid/10"
                  >
                    <Link to="/torneios/$slug" params={{ slug: t.slug }}>
                      Ver no site <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {t.divisions.map((div) => (
                  <div
                    key={div.name}
                    className="rounded-lg border border-border bg-background p-3 text-sm"
                  >
                    <p className="font-medium">{div.name}</p>
                    <p className="text-xs text-muted-foreground">{div.spots ?? "—"} vagas</p>
                    <p className="text-xs text-muted-foreground">
                      {div.prices.map((p) => `${p.label}: R$ ${p.price}`).join(" · ") ||
                        "Sem preço cadastrado"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
